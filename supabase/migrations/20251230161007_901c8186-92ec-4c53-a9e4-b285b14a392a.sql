-- Add RLS policy for safety_alerts (admin only via security definer function)
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admin-only policy for safety_alerts
CREATE POLICY "Admins can view safety alerts" ON public.safety_alerts 
FOR SELECT TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage safety alerts" ON public.safety_alerts 
FOR ALL TO authenticated 
USING (public.has_role(auth.uid(), 'admin'));