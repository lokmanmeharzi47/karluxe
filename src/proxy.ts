import { updateSession } from '@/utils/supabase/middleware'
import { type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Only the admin area is auth-gated, so the session refresh only needs to run
     * there. Matching every route made `supabase.auth.getUser()` — a network call
     * to the Supabase auth server — block the render of every public page, and
     * opted those pages out of static caching.
     */
    '/admin/:path*',
    '/dashboard/:path*',
  ],
}
