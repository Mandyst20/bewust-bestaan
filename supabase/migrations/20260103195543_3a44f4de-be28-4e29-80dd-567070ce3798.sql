-- Add admin write policies for blog_posts
CREATE POLICY "Admins can create blog posts" 
  ON public.blog_posts FOR INSERT TO authenticated 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update blog posts" 
  ON public.blog_posts FOR UPDATE TO authenticated 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete blog posts" 
  ON public.blog_posts FOR DELETE TO authenticated 
  USING (public.has_role(auth.uid(), 'admin'));

-- Add admin write policies for exercises
CREATE POLICY "Admins can create exercises" 
  ON public.exercises FOR INSERT TO authenticated 
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update exercises" 
  ON public.exercises FOR UPDATE TO authenticated 
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete exercises" 
  ON public.exercises FOR DELETE TO authenticated 
  USING (public.has_role(auth.uid(), 'admin'));