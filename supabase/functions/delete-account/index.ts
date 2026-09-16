import {deleteOwnAccount} from './handler.js';

function defaultKey(name: string, legacy: string) {
  try { return JSON.parse(Deno.env.get(name) || '{}').default || Deno.env.get(legacy) || ''; }
  catch { return Deno.env.get(legacy) || ''; }
}

Deno.serve((req: Request) => deleteOwnAccount(req, {
  url: Deno.env.get('SUPABASE_URL'),
  publicKey: defaultKey('SUPABASE_PUBLISHABLE_KEYS', 'SUPABASE_ANON_KEY'),
  secretKey: defaultKey('SUPABASE_SECRET_KEYS', 'SUPABASE_SERVICE_ROLE_KEY')
}));
