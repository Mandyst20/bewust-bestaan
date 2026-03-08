import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { PageBlock } from "@/lib/pageBlockTypes";
import { BlockRenderer } from "@/components/editor/BlockRenderer";
import { Layout } from "@/components/Layout";

export default function SitePage() {
  const { slug } = useParams<{ slug: string }>();
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [seoTitle, setSeoTitle] = useState("");

  useEffect(() => {
    async function load() {
      const { data } = await supabase
        .from('site_pages')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (data) {
        setBlocks(data.blocks as unknown as PageBlock[]);
        setSeoTitle(data.seo_title || data.title);
        if (data.seo_title) document.title = data.seo_title;
      } else {
        setNotFound(true);
      }
      setLoading(false);
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </Layout>
    );
  }

  if (notFound) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] flex-col items-center justify-center">
          <h1 className="font-display text-3xl font-bold text-foreground">Pagina niet gevonden</h1>
          <p className="mt-2 text-muted-foreground">Deze pagina bestaat niet of is niet gepubliceerd.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout showAIChat={false}>
      {blocks.map(block => <BlockRenderer key={block.id} block={block} />)}
    </Layout>
  );
}
