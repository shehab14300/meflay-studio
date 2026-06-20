window.MEFLAY_SUPABASE_URL = "https://xctjmfytozadwkrpjbhu.supabase.co";
window.MEFLAY_SUPABASE_KEY = "sb_publishable_fAAZzE3ZKop6lpMZyOhmIA_1-2Ceo37";
window.meflaySupabase = window.supabase.createClient(
  window.MEFLAY_SUPABASE_URL,
  window.MEFLAY_SUPABASE_KEY,
  { auth: { persistSession: true, autoRefreshToken: true } }
);
