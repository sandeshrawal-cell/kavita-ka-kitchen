export function browserSafeKey(key) {
  if (typeof key !== 'string') return false;
  if (key.startsWith('sb_publishable_')) return true;
  if (key.startsWith('sb_secret_')) return false;
  try { return JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString()).role === 'anon'; } catch { return false; }
}
export default function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !/^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(url) || !browserSafeKey(key)) {
    return res.status(503).json({
      configured: false,
      message: 'Supabase is not configured. Add SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in Vercel Environment Variables, then redeploy.'
    });
  }
  return res.status(200).json({ configured: true, url, key, accountDeletion: !!process.env.APP_ORIGIN && (process.env.ACCOUNT_DELETION_BACKEND === 'supabase' || !!process.env.SUPABASE_SERVICE_ROLE_KEY), ai: !!(process.env.OPENAI_API_KEY && process.env.OPENAI_MODEL) });
};
