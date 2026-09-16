const ORIGIN = 'https://kavita-kitchen-v2.vercel.app';
const reply = (status, body) => Response.json(body, {status, headers: {'Cache-Control': 'no-store'}});

// Inspect claims only after Supabase Auth has verified this exact token.
export function recentlyAuthenticated(token, userId, now = Date.now()) {
  try {
    const part = token.split('.')[1].replaceAll('-', '+').replaceAll('_', '/');
    const claims = JSON.parse(atob(part));
    return claims.sub === userId && claims.role === 'authenticated' && claims.is_anonymous !== true &&
      Array.isArray(claims.amr) && claims.amr.some(method =>
        ['password', 'otp', 'oauth', 'magiclink', 'sso/saml'].includes(method.method) &&
        Number.isFinite(method.timestamp) && now / 1000 - method.timestamp >= -30 &&
        now / 1000 - method.timestamp <= 600);
  } catch { return false; }
}

export async function deleteOwnAccount(req, env, request = fetch) {
  if (req.method !== 'POST') return reply(405, {error: 'POST required.'});
  if (req.headers.get('Origin') !== ORIGIN) return reply(403, {error: 'Request origin is not allowed.'});
  if (!req.headers.get('Content-Type')?.startsWith('application/json')) return reply(400, {error: 'Type DELETE to confirm.'});
  let body;
  try {
    const text = await req.text();
    if (text.length > 2048) return reply(413, {error: 'Request too large.'});
    body = JSON.parse(text);
  } catch { return reply(400, {error: 'Type DELETE to confirm.'}); }
  if (body?.confirmation !== 'DELETE') return reply(400, {error: 'Type DELETE to confirm.'});
  const authorization = req.headers.get('Authorization') || '';
  if (!/^Bearer [A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+$/.test(authorization)) {
    return reply(401, {error: 'Sign in again to delete your account.'});
  }
  const {url, publicKey, secretKey} = env;
  if (!url || !publicKey || !secretKey) return reply(503, {error: 'Account deletion is temporarily unavailable.'});
  try {
    const headers = {apikey: publicKey, Authorization: authorization};
    // Authoritative verification supports both legacy and asymmetric signing keys.
    const check = await request(url + '/auth/v1/user', {headers, signal: AbortSignal.timeout(10000)});
    if (!check.ok) return reply(401, {error: 'Sign in again to delete your account.'});
    const user = await check.json();
    if (!user.id || !recentlyAuthenticated(authorization.slice(7), user.id)) {
      return reply(401, {error: 'Sign out and sign in again, then retry deletion within 10 minutes.'});
    }
    const logout = await request(url + '/auth/v1/logout?scope=global', {
      method: 'POST', headers, signal: AbortSignal.timeout(10000)
    });
    if (!logout.ok) return reply(503, {error: 'Could not revoke sessions. Your account was not deleted.'});
    // No user ID from the request is used. The administrative key stays in Supabase.
    const adminHeaders = {apikey: secretKey, 'Content-Type': 'application/json'};
    if (!secretKey.startsWith('sb_secret_')) adminHeaders.Authorization = 'Bearer ' + secretKey;
    const deletion = await request(url + '/auth/v1/admin/users/' + encodeURIComponent(user.id), {
      method: 'DELETE', headers: adminHeaders, body: JSON.stringify({should_soft_delete: false}),
      signal: AbortSignal.timeout(15000)
    });
    if (!deletion.ok) return reply(502, {error: 'Deletion could not be completed. Sign in again before retrying.'});
    return reply(200, {deleted: true});
  } catch { return reply(503, {error: 'Deletion service unavailable. Sign in to check your account before retrying.'}); }
}
