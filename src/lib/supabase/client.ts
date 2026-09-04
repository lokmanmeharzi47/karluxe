import { createBrowserClient as createSupabaseBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/database.types';

export function createBrowserClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sspqegfafhdzcxaggbei.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcHFlZ2ZhZmhkemN4YWdnYmVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NjQ0NTQsImV4cCI6MjEwMDU0MDQ1NH0._-VXwLgRiPBPc8lFBKRRR16Z72f7BjC8TztwS_U41IE';

  return createSupabaseBrowserClient<Database>(
    url,
    key
  );
}
