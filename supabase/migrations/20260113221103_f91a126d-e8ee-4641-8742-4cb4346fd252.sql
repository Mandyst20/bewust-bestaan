-- Enable realtime for dm_messages table
ALTER PUBLICATION supabase_realtime ADD TABLE public.dm_messages;

-- Add UPDATE policy for dm_threads so last_message_at can be updated
CREATE POLICY "Thread participants can update thread"
ON public.dm_threads
FOR UPDATE
USING ((auth.uid() = user_a) OR (auth.uid() = user_b))
WITH CHECK ((auth.uid() = user_a) OR (auth.uid() = user_b));