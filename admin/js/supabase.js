const SUPABASE_URL = "https://xctjmfytozadwkrpjbhu.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_fAAZzE3ZKop6lpMZyOhmIA_1-2Ceo37";

window.MEFLAY_SUPABASE = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true
    }
  }
);
