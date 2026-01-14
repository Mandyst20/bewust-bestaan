-- Fix RLS policies: require authentication for viewing community content

-- Update profiles policy to require authentication
DROP POLICY IF EXISTS "Users can view all profiles" ON public.profiles;
CREATE POLICY "Authenticated users can view profiles" 
ON public.profiles 
FOR SELECT 
TO authenticated
USING (true);

-- Update topics policy to actually require authentication
DROP POLICY IF EXISTS "Authenticated users can view topics" ON public.topics;
CREATE POLICY "Authenticated users can view topics" 
ON public.topics 
FOR SELECT 
TO authenticated
USING (true);

-- Update topic_replies policy to actually require authentication
DROP POLICY IF EXISTS "Authenticated users can view replies" ON public.topic_replies;
CREATE POLICY "Authenticated users can view replies" 
ON public.topic_replies 
FOR SELECT 
TO authenticated
USING (true);