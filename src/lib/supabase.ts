import { createClient } from "@supabase/supabase-js";

if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error("VITE_SUPABASE_ANON_KEY is required");
}
if (!import.meta.env.VITE_SUPABASE_URL) {
  throw new Error("VITE_SUPABASE_URL is required");
}

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
);

export default supabase;
