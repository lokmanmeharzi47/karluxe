import { createServerClient as createSupabaseServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { Database } from '@/types/database.types';

export async function createServerClient() {
  const cookieStore = await cookies();

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sspqegfafhdzcxaggbei.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcHFlZ2ZhZmhkemN4YWdnYmVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NjQ0NTQsImV4cCI6MjEwMDU0MDQ1NH0._-VXwLgRiPBPc8lFBKRRR16Z72f7BjC8TztwS_U41IE';

  return createSupabaseServerClient<Database>(
    url,
    key,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
          }
        },
      },
    }
  );
}

/**
 * Read-only client for public pages (home, fleet, product, collection).
 *
 * Deliberately does NOT touch cookies: calling `cookies()` marks a route as
 * dynamic, so every visitor would re-run the page's queries instead of being
 * served the prerendered ISR copy. Use this whenever the data is the same for
 * every visitor; use `createServerClient()` only when the request's session
 * actually matters.
 */
export function createStaticClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sspqegfafhdzcxaggbei.supabase.co';
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcHFlZ2ZhZmhkemN4YWdnYmVpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NjQ0NTQsImV4cCI6MjEwMDU0MDQ1NH0._-VXwLgRiPBPc8lFBKRRR16Z72f7BjC8TztwS_U41IE';

  return createSupabaseClient<Database>(
    url,
    key,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}

export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://sspqegfafhdzcxaggbei.supabase.co';
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzcHFlZ2ZhZmhkemN4YWdnYmVpIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDk2NDQ1NCwiZXhwIjoyMTAwNTQwNDU0fQ.BWFj2vymd7dJVfo3VWr8sRJZboIYpY280IyQcGej-6E';

  return createSupabaseClient<Database>(
    url,
    key,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );
}
