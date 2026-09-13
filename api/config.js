module.exports = function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store, max-age=0');
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_PUBLISHABLE_KEY || process.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    return res.status(503).json({
      configured: false,
      message: 'Supabase is not configured. Add SUPABASE_URL and SUPABASE_PUBLISHABLE_KEY in Vercel Environment Variables, then redeploy.'
    });
  }
  return res.status(200).json({ configured: true, url, key });
};
