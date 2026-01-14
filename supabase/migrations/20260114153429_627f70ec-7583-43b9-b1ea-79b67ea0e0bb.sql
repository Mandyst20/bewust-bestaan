-- Secure user_roles table against privilege escalation

-- Remove any existing policies that might allow modifications
DROP POLICY IF EXISTS "Users can insert roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can update roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can delete roles" ON public.user_roles;

-- Deny all INSERT/UPDATE/DELETE for regular users - only admins via service role can modify
CREATE POLICY "Only admins can insert roles" 
ON public.user_roles 
FOR INSERT 
TO authenticated
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can update roles" 
ON public.user_roles 
FOR UPDATE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Only admins can delete roles" 
ON public.user_roles 
FOR DELETE 
TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));

-- Also add DELETE policies for user-generated content for better user control

-- Users can delete their own topics
CREATE POLICY "Users can delete own topics" 
ON public.topics 
FOR DELETE 
TO authenticated
USING (auth.uid() = author_id);

-- Users can delete their own replies
CREATE POLICY "Users can delete own replies" 
ON public.topic_replies 
FOR DELETE 
TO authenticated
USING (auth.uid() = author_id);

-- Users can update their own replies
CREATE POLICY "Users can update own replies" 
ON public.topic_replies 
FOR UPDATE 
TO authenticated
USING (auth.uid() = author_id)
WITH CHECK (auth.uid() = author_id);

-- Thread participants can delete threads they're part of
CREATE POLICY "Thread participants can delete threads" 
ON public.dm_threads 
FOR DELETE 
TO authenticated
USING ((auth.uid() = user_a) OR (auth.uid() = user_b));

-- Users can delete their own messages
CREATE POLICY "Users can delete own messages" 
ON public.dm_messages 
FOR DELETE 
TO authenticated
USING (auth.uid() = sender_id);