import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

// API Route 用 service role key（不能给前端）
export const supabaseServer: SupabaseClient = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SECRET_KEY as string
);
