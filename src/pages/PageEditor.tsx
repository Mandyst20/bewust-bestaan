import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { supabase } from "@/integrations/supabase/client";
import { PageBlock, BlockType, defaultBlockData, blockLabels } from "@/lib/pageBlockTypes";
import { SortableBlock } from "@/components/editor/SortableBlock";
import { BlockPropertyPanel } from "@/components/editor/BlockPropertyPanel";
import { BlockRenderer } from "@/components/editor/BlockRenderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { 
  Save, Eye, EyeOff, ArrowLeft, Plus, LayoutTemplate, Type, Image, 
  MousePointer, Quote, ArrowUpDown, Undo2, Globe 
} from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const blockIcons: Record<BlockType, React.ReactNode> = {
  hero: <LayoutTemplate className="h-5 w-5" />,
  text: <Type className="h-5 w-5" />,
  image: <Image className="h-5 w-5" />,
  cta: <MousePointer className="h-5 w-5" />,
  testimonials: <Quote className="h-5 w-5" />,
  spacer: <ArrowUpDown className="h-5 w-5" />,
};

export default function PageEditor() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [pageId, setPageId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [pageSlug, setPageSlug] = useState(slug || "");
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [versions, setVersions] = useState<any[]>([]);
  const [addBlockOpen, setAddBlockOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  // Load page
  useEffect(() => {
    async function loadPage() {
      if (!slug || slug === 'nieuw') {
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('site_pages')
        .select('*')
        .eq('slug', slug)
        .maybeSingle();

      if (data) {
        setPageId(data.id);
        setTitle(data.title);
        setPageSlug(data.slug);
        setBlocks((data.draft_blocks || data.blocks) as unknown as PageBlock[]);
        setIsPublished(data.published);
        setSeoTitle(data.seo_title || '');
        setSeoDescription(data.seo_description || '');
        loadVersions(data.id);
      }
      setLoading(false);
    }
    loadPage();
  }, [slug]);

  const loadVersions = async (pid: string) => {
    const { data } = await supabase
      .from('page_versions')
      .select('*')
      .eq('page_id', pid)
      .order('created_at', { ascending: false })
      .limit(5);
    if (data) setVersions(data);
  };

  const generateId = () => crypto.randomUUID();

  const addBlock = (type: BlockType) => {
    const newBlock: PageBlock = {
      id: generateId(),
      type,
      data: { ...defaultBlockData[type] },
    };
    setBlocks(prev => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
    setAddBlockOpen(false);
  };

  const updateBlock = useCallback((updated: PageBlock) => {
    setBlocks(prev => prev.map(b => b.id === updated.id ? updated : b));
  }, []);

  const deleteBlock = (id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks(prev => {
        const oldIndex = prev.findIndex(b => b.id === active.id);
        const newIndex = prev.findIndex(b => b.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const savePage = async (publish?: boolean) => {
    setSaving(true);
    try {
      const shouldPublish = publish !== undefined ? publish : isPublished;
      const pageData = {
        title,
        slug: pageSlug,
        blocks: shouldPublish ? blocks : (blocks as any),
        draft_blocks: shouldPublish ? null : (blocks as any),
        published: shouldPublish,
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
        updated_at: new Date().toISOString(),
      };

      if (pageId) {
        // Save version before updating
        const { data: currentPage } = await supabase
          .from('site_pages')
          .select('blocks')
          .eq('id', pageId)
          .single();

        if (currentPage) {
          await supabase.from('page_versions').insert({
            page_id: pageId,
            blocks: currentPage.blocks,
          });
          // Keep only last 5 versions
          const { data: allVersions } = await supabase
            .from('page_versions')
            .select('id')
            .eq('page_id', pageId)
            .order('created_at', { ascending: false });
          if (allVersions && allVersions.length > 5) {
            const toDelete = allVersions.slice(5).map(v => v.id);
            await supabase.from('page_versions').delete().in('id', toDelete);
          }
        }

        await supabase.from('site_pages').update(pageData).eq('id', pageId);
        loadVersions(pageId);
      } else {
        const { data, error } = await supabase
          .from('site_pages')
          .insert({ ...pageData, blocks: blocks as any })
          .select()
          .single();
        if (error) throw error;
        if (data) {
          setPageId(data.id);
          navigate(`/admin/editor/${data.slug}`, { replace: true });
        }
      }

      setIsPublished(shouldPublish);
      toast({ title: shouldPublish ? "Gepubliceerd!" : "Opgeslagen als concept" });
    } catch (e: any) {
      toast({ title: "Fout bij opslaan", description: e.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const restoreVersion = async (version: any) => {
    setBlocks(version.blocks as unknown as PageBlock[]);
    toast({ title: "Versie hersteld", description: "Klik op opslaan om de wijzigingen te bewaren" });
  };

  const selectedBlock = blocks.find(b => b.id === selectedBlockId);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Preview mode
  if (previewMode) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-card px-4 py-2">
          <span className="text-sm font-medium text-muted-foreground">Preview modus</span>
          <Button size="sm" onClick={() => setPreviewMode(false)}>
            <EyeOff className="mr-1 h-4 w-4" />Terug naar editor
          </Button>
        </div>
        {blocks.map(block => <BlockRenderer key={block.id} block={block} />)}
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-border bg-card px-4 py-2">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Paginanaam..."
            className="h-8 w-48 border-none bg-transparent text-sm font-semibold shadow-none focus-visible:ring-0"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setPreviewMode(true)}>
            <Eye className="mr-1 h-4 w-4" />Preview
          </Button>
          <Button variant="outline" size="sm" onClick={() => savePage(false)} disabled={saving}>
            <Save className="mr-1 h-4 w-4" />{saving ? 'Opslaan...' : 'Concept'}
          </Button>
          <Button size="sm" onClick={() => savePage(true)} disabled={saving}>
            <Globe className="mr-1 h-4 w-4" />Publiceren
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Canvas */}
        <div className="flex-1 overflow-y-auto bg-muted/30 p-6">
          <div className="mx-auto max-w-5xl rounded-xl border border-border bg-background shadow-medium">
            {blocks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
                <LayoutTemplate className="mb-4 h-12 w-12 opacity-30" />
                <p className="text-lg font-medium">Lege pagina</p>
                <p className="text-sm">Voeg blokken toe via de + knop</p>
              </div>
            ) : (
              <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={blocks.map(b => b.id)} strategy={verticalListSortingStrategy}>
                  <div className="space-y-0 pt-8">
                    {blocks.map(block => (
                      <SortableBlock
                        key={block.id}
                        block={block}
                        isSelected={block.id === selectedBlockId}
                        onSelect={() => setSelectedBlockId(block.id)}
                        onDelete={() => deleteBlock(block.id)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}

            {/* Add block button */}
            <div className="flex justify-center py-6">
              <Dialog open={addBlockOpen} onOpenChange={setAddBlockOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Plus className="h-4 w-4" />Blok toevoegen
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>Blok toevoegen</DialogTitle></DialogHeader>
                  <div className="grid grid-cols-2 gap-3">
                    {(Object.keys(blockLabels) as BlockType[]).map(type => (
                      <button
                        key={type}
                        onClick={() => addBlock(type)}
                        className="flex flex-col items-center gap-2 rounded-xl border border-border p-6 transition-smooth hover:border-primary hover:bg-primary/5"
                      >
                        {blockIcons[type]}
                        <span className="text-sm font-medium">{blockLabels[type]}</span>
                      </button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="w-80 border-l border-border bg-card">
          <Tabs defaultValue="properties">
            <TabsList className="w-full rounded-none border-b">
              <TabsTrigger value="properties" className="flex-1 text-xs">Eigenschappen</TabsTrigger>
              <TabsTrigger value="page" className="flex-1 text-xs">Pagina</TabsTrigger>
              <TabsTrigger value="versions" className="flex-1 text-xs">Versies</TabsTrigger>
            </TabsList>

            <TabsContent value="properties" className="m-0">
              {selectedBlock ? (
                <BlockPropertyPanel block={selectedBlock} onChange={updateBlock} />
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
                  <p className="text-sm">Selecteer een blok om te bewerken</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="page" className="m-0">
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="space-y-4 p-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">Pagina slug</Label>
                    <Input value={pageSlug} onChange={e => setPageSlug(e.target.value)} placeholder="pagina-naam" />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">SEO Titel</Label>
                    <Input value={seoTitle} onChange={e => setSeoTitle(e.target.value)} placeholder="Paginatitel voor zoekmachines" />
                    <p className="text-[10px] text-muted-foreground">{seoTitle.length}/60 tekens</p>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs text-muted-foreground">SEO Beschrijving</Label>
                    <Input value={seoDescription} onChange={e => setSeoDescription(e.target.value)} placeholder="Beschrijving voor zoekmachines" />
                    <p className="text-[10px] text-muted-foreground">{seoDescription.length}/160 tekens</p>
                  </div>
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="versions" className="m-0">
              <ScrollArea className="h-[calc(100vh-8rem)]">
                <div className="space-y-2 p-4">
                  {versions.length === 0 ? (
                    <p className="text-center text-sm text-muted-foreground py-8">Nog geen versies opgeslagen</p>
                  ) : (
                    versions.map((v, i) => (
                      <div key={v.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                        <div>
                          <p className="text-xs font-medium">Versie {versions.length - i}</p>
                          <p className="text-[10px] text-muted-foreground">
                            {new Date(v.created_at).toLocaleString('nl-NL')}
                          </p>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => restoreVersion(v)}>
                          <Undo2 className="mr-1 h-3 w-3" />Herstel
                        </Button>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
