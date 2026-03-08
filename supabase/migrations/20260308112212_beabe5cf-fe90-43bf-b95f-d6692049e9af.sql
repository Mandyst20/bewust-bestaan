
-- Site pages table for the website editor
CREATE TABLE public.site_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text NOT NULL UNIQUE,
  title text NOT NULL,
  blocks jsonb NOT NULL DEFAULT '[]'::jsonb,
  draft_blocks jsonb DEFAULT NULL,
  seo_title text DEFAULT NULL,
  seo_description text DEFAULT NULL,
  published boolean NOT NULL DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Page versions for rollback (last 5)
CREATE TABLE public.page_versions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_id uuid REFERENCES public.site_pages(id) ON DELETE CASCADE NOT NULL,
  blocks jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE public.site_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.page_versions ENABLE ROW LEVEL SECURITY;

-- Public can read published pages
CREATE POLICY "Published pages visible to all" ON public.site_pages
  FOR SELECT USING (published = true);

-- Admins can do everything with pages
CREATE POLICY "Admins can manage pages" ON public.site_pages
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can manage versions
CREATE POLICY "Admins can manage versions" ON public.page_versions
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Admins can read versions
CREATE POLICY "Admins can view versions" ON public.page_versions
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));
