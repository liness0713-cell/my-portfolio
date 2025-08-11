// lib/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl: string = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabasePublishableKey: string = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string;

export const supabase: SupabaseClient = createClient<Database>(supabaseUrl, supabasePublishableKey);
