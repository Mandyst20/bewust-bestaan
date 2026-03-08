import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { SectionHeader } from "@/components/PageHeader";
import { ContentCard } from "@/components/Cards";
import { Plus, Edit, Globe, GlobeLock, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SitePage {
  id: string;
  slug: string;
  title: string;
  published: boolean;
  updated_at: string | null;
}

export function AdminPages() {
  const [pages, setPages] = useState<SitePage[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    const { data } = await supabase
      .from('site_pages')
      .select('id, slug, title, published, updated_at')
      .order('updated_at', { ascending: false });
    if (data) setPages(data);
  };

  const deletePage = async (id: string) => {
    await supabase.from('site_pages').delete().eq('id', id);
    setPages(prev => prev.filter(p => p.id !== id));
    toast({ title: "Pagina verwijderd" });
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <SectionHeader title="Website Pagina's" description="Beheer je publieke pagina's" />
        <Button onClick={() => navigate('/admin/editor/nieuw')}>
          <Plus className="mr-1 h-4 w-4" />Nieuwe pagina
        </Button>
      </div>
      <div className="mt-6 space-y-3">
        {pages.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">Nog geen pagina's aangemaakt</p>
        ) : (
          pages.map(page => (
            <ContentCard key={page.id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {page.published ? (
                  <Globe className="h-4 w-4 text-secondary" />
                ) : (
                  <GlobeLock className="h-4 w-4 text-muted-foreground" />
                )}
                <div>
                  <p className="font-medium text-foreground">{page.title || 'Naamloos'}</p>
                  <p className="text-xs text-muted-foreground">/{page.slug}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={() => navigate(`/admin/editor/${page.slug}`)}>
                  <Edit className="mr-1 h-3 w-3" />Bewerken
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => deletePage(page.id)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </ContentCard>
          ))
        )}
      </div>
    </div>
  );
}
