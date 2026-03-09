
-- Create storage bucket for page editor uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('page-assets', 'page-assets', true);

-- Allow admins to upload files
CREATE POLICY "Admins can upload page assets"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'page-assets' AND
  public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow admins to update files
CREATE POLICY "Admins can update page assets"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'page-assets' AND
  public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Allow admins to delete files
CREATE POLICY "Admins can delete page assets"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'page-assets' AND
  public.has_role(auth.uid(), 'admin'::public.app_role)
);

-- Public read access for page assets
CREATE POLICY "Public can view page assets"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'page-assets');
