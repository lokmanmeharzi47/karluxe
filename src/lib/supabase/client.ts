import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database.types';

export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hbfeclrmacaxgssfrfxj.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.e30.placeholder';

  return createSupabaseBrowserClient<Database>(
    url,
    key
  );
}
