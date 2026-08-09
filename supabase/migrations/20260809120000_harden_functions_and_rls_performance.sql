-- Harden SECURITY DEFINER functions (pin search_path, revoke direct RPC execution)
-- and fix RLS policies that re-evaluate auth.uid() per row instead of once per query.

-- 1. Pin search_path on trigger functions to prevent search_path hijacking
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path = ''
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = ''
AS $function$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'role', 'customer')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$function$;

-- 2. These are trigger / event-trigger functions only meant to fire via their
-- triggers, not to be called directly over RPC. Trigger invocation does not
-- require EXECUTE privilege, so revoking it here only removes the public
-- /rest/v1/rpc/... surface without affecting the triggers themselves.
-- anon/authenticated inherit EXECUTE from the implicit PUBLIC grant that
-- Postgres adds by default on function creation, so PUBLIC must be revoked
-- too, not just the two named roles.
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.rls_auto_enable() FROM PUBLIC, anon, authenticated;

-- 3. Wrap auth.uid() in a subselect so it's evaluated once per query instead
-- of once per row (Supabase "auth_rls_initplan" performance lint).
DROP POLICY IF EXISTS "Users view own profile" ON public.profiles;
CREATE POLICY "Users view own profile" ON public.profiles
  FOR SELECT
  USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users update own profile" ON public.profiles;
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE
  USING ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users insert own profile" ON public.profiles;
CREATE POLICY "Users insert own profile" ON public.profiles
  FOR INSERT
  WITH CHECK ((select auth.uid()) = id);

DROP POLICY IF EXISTS "Users view own bookings" ON public.bookings;
CREATE POLICY "Users view own bookings" ON public.bookings
  FOR SELECT
  USING (((select auth.uid()) = user_id) OR (user_id IS NULL));

DROP POLICY IF EXISTS "Users manage own favorites" ON public.favorites;
CREATE POLICY "Users manage own favorites" ON public.favorites
  FOR ALL
  USING ((select auth.uid()) = user_id);

DROP POLICY IF EXISTS "Users view own notifications" ON public.notifications;
CREATE POLICY "Users view own notifications" ON public.notifications
  FOR SELECT
  USING ((select auth.uid()) = user_id);
