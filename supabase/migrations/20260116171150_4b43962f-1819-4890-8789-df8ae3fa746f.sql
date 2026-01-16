-- Fix: Change has_role function from SECURITY DEFINER to SECURITY INVOKER
-- This follows the principle of least privilege and prevents potential RLS bypass

-- First, drop and recreate the function with SECURITY INVOKER
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Add a SELECT policy on user_roles so the function can work with SECURITY INVOKER
-- This allows authenticated users to check roles (needed for RLS policy checks)
CREATE POLICY "Authenticated users can view roles for policy checks"
ON public.user_roles 
FOR SELECT
TO authenticated
USING (true);