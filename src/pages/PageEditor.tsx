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
  MousePointer, Quote, ArrowUpDown, Undo2, Globe, PanelRightClose, PanelRight, X
} from "lucide-react";
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
  const [pageSlug, setPageSlug] = useState(slug === "nieuw" ? "" : slug || "");
  const [blocks, setBlocks] = useState<PageBlock[]>([]);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [versions, setVersions] = useState<any[]>([]);
  const [showAddBlock, setShowAddBlock] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("properties");

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  useEffect(() => {
    async function loadPage() {
      if (!slug || slug === "nieuw") {
        setLoading(false);
        return;
      }
      const { data } = await supabase
        .from("site_pages")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();

      if (data) {
        setPageId(data.id);
        setTitle(data.title);
        setPageSlug(data.slug);
        const loadedBlocks = (data.draft_blocks || data.blocks) as unknown as PageBlock[];
        setBlocks(Array.isArray(loadedBlocks) ? loadedBlocks : []);
        setIsPublished(data.published);
        setSeoTitle(data.seo_title || "");
        setSeoDescription(data.seo_description || "");
        loadVersions(data.id);
      }
      setLoading(false);
    }
    loadPage();
  }, [slug]);

  const loadVersions = async (pid: string) => {
    const { data } = await supabase
      .from("page_versions")
      .select("*")
      .eq("page_id", pid)
      .order("created_at", { ascending: false })
      .limit(5);
    if (data) setVersions(data);
  };

  const addBlock = (type: BlockType) => {
    const newBlock: PageBlock = {
      id: crypto.randomUUID(),
      type,
      data: { ...defaultBlockData[type] },
    };
    setBlocks((prev) => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
    setShowAddBlock(false);
    setActiveTab("properties");
  };

  const duplicateBlock = (id: string) => {
    const block = blocks.find((b) => b.id === id);
    if (!block) return;
    const newBlock: PageBlock = {
      id: crypto.randomUUID(),
      type: block.type,
      data: JSON.parse(JSON.stringify(block.data)),
    };
    const index = blocks.findIndex((b) => b.id === id);
    setBlocks((prev) => [...prev.slice(0, index + 1), newBlock, ...prev.slice(index + 1)]);
    setSelectedBlockId(newBlock.id);
  };

  const updateBlock = useCallback((updated: PageBlock) => {
    setBlocks((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }, []);

  const deleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    setBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === id);
      if (direction === "up" && idx > 0) return arrayMove(prev, idx, idx - 1);
      if (direction === "down" && idx < prev.length - 1) return arrayMove(prev, idx, idx + 1);
      return prev;
    });
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setBlocks((prev) => {
        const oldIndex = prev.findIndex((b) => b.id === active.id);
        const newIndex = prev.findIndex((b) => b.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const savePage = async (publish?: boolean) => {
    if (!title.trim()) {
      toast({ title: "Geef de pagina een titel", variant: "destructive" });
      return;
    }
    if (!pageSlug.trim()) {
      toast({ title: "Geef de pagina een slug", variant: "destructive" });
      return;
    }
    setSaving(true);
    try {
      const shouldPublish = publish !== undefined ? publish : isPublished;
      const pageData = {
        title,
        slug: pageSlug,
        blocks: shouldPublish ? (blocks as any) : undefined,
        draft_blocks: shouldPublish ? null : (blocks as any),
        published: shouldPublish,
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
        updated_at: new Date().toISOString(),
      };

      // Remove undefined keys
      const cleanData = Object.fromEntries(Object.entries(pageData).filter(([_, v]) => v !== undefined));

      if (pageId) {
        // Save version before updating
        const { data: currentPage } = await supabase
          .from("site_pages")
          .select("blocks")
          .eq("id", pageId)
          .single();

        if (currentPage?.blocks) {
          await supabase.from("page_versions").insert({
            page_id: pageId,
            blocks: currentPage.blocks,
          });
          const { data: allVersions } = await supabase
            .from("page_versions")
            .select("id")
            .eq("page_id", pageId)
            .order("created_at", { ascending: false });
          if (allVersions && allVersions.length > 5) {
            const toDelete = allVersions.slice(5).map((v) => v.id);
            await supabase.from("page_versions").delete().in("id", toDelete);
          }
        }

        // When publishing, also set blocks
        if (shouldPublish) {
          await supabase.from("site_pages").update({ ...cleanData, blocks: blocks as any }).eq("id", pageId);
        } else {
          await supabase.from("site_pages").update(cleanData).eq("id", pageId);
        }
        loadVersions(pageId);
      } else {
        const { data, error } = await supabase
          .from("site_pages")
          .insert({ ...cleanData, blocks: blocks as any })
          .select()
          .single();
        if (error) throw error;
        if (data) {
          setPageId(data.id);
          navigate(`/admin/editor/${data.slug}`, { replace: true });
        }
      }

      setIsPublished(shouldPublish);
      toast({
        title: shouldPublish ? "✅ Gepubliceerd!" : "💾 Concept opgeslagen",
        description: shouldPublish ? `Bekijk op /p/${pageSlug}` : "Wijzigingen zijn opgeslagen als concept",
      });
    } catch (e: any) {
      toast({ title: "Fout bij opslaan", description: e.message, variant: "destructive" });
    }
    setSaving(false);
  };

  const restoreVersion = async (version: any) => {
    setBlocks(version.blocks as unknown as PageBlock[]);
    toast({ title: "Versie hersteld", description: "Klik op opslaan om de wijzigingen te bewaren" });
  };

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Full-screen preview
  if (previewMode) {
    return (
      <div className="min-h-screen bg-background">
        <div className="sticky top-0 z-50 flex items-center justify-between border-b border-border bg-card/95 backdrop-blur px-4 py-2">
          <span className="text-sm font-medium text-muted-foreground">
            Preview — {title || "Naamloos"}
          </span>
          <Button size="sm" variant="outline" onClick={() => setPreviewMode(false)}>
            <EyeOff className="mr-1.5 h-4 w-4" />
            Terug naar editor
          </Button>
        </div>
        <div>
          {blocks.length === 0 ? (
            <div className="flex items-center justify-center py-32 text-muted-foreground">
              <p>Geen blokken om weer te geven</p>
            </div>
          ) : (
            blocks.map((block) => <BlockRenderer key={block.id} block={block} />)
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col bg-muted/30">
      {/* ─── Top toolbar ─── */}
      <div className="flex items-center justify-between border-b border-border bg-card px-3 py-2 shadow-sm">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => navigate("/admin")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="h-5 w-px bg-border" />
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Paginanaam..."
            className="h-8 w-44 border-none bg-transparent text-sm font-semibold shadow-none focus-visible:ring-1"
          />
        </div>

        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" className="text-xs" onClick={() => setPreviewMode(true)}>
            <Eye className="mr-1 h-3.5 w-3.5" />
            Preview
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <PanelRightClose className="h-4 w-4" /> : <PanelRight className="h-4 w-4" />}
          </Button>
          <div className="h-5 w-px bg-border" />
          <Button variant="outline" size="sm" className="text-xs" onClick={() => savePage(false)} disabled={saving}>
            <Save className="mr-1 h-3.5 w-3.5" />
            {saving ? "Opslaan..." : "Concept"}
          </Button>
          <Button size="sm" className="text-xs" onClick={() => savePage(true)} disabled={saving}>
            <Globe className="mr-1 h-3.5 w-3.5" />
            Publiceren
          </Button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* ─── Live canvas ─── */}
        <div
          className="flex-1 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedBlockId(null);
          }}
        >
          <div className="mx-auto max-w-5xl py-4 px-4">
            <div className="rounded-xl border border-border bg-background shadow-lg overflow-hidden min-h-[60vh]">
              {blocks.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-32 text-muted-foreground">
                  <LayoutTemplate className="mb-4 h-16 w-16 opacity-20" />
                  <p className="text-lg font-medium">Begin met bouwen</p>
                  <p className="mt-1 text-sm opacity-70">Klik hieronder om je eerste blok toe te voegen</p>
                  <Button
                    variant="outline"
                    className="mt-6 gap-2"
                    onClick={() => setShowAddBlock(true)}
                  >
                    <Plus className="h-4 w-4" />
                    Blok toevoegen
                  </Button>
                </div>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                    {blocks.map((block, index) => (
                      <SortableBlock
                        key={block.id}
                        block={block}
                        isSelected={block.id === selectedBlockId}
                        onSelect={() => {
                          setSelectedBlockId(block.id);
                          setActiveTab("properties");
                        }}
                        onDelete={() => deleteBlock(block.id)}
                        onDuplicate={() => duplicateBlock(block.id)}
                        onMoveUp={index > 0 ? () => moveBlock(block.id, "up") : undefined}
                        onMoveDown={index < blocks.length - 1 ? () => moveBlock(block.id, "down") : undefined}
                      />
                    ))}
                  </SortableContext>
                </DndContext>
              )}

              {/* Add block between/after */}
              {blocks.length > 0 && (
                <div className="flex justify-center py-6 border-t border-dashed border-border/50">
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 text-xs"
                    onClick={() => setShowAddBlock(true)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                    Blok toevoegen
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ─── Right sidebar ─── */}
        {sidebarOpen && (
          <div className="w-80 border-l border-border bg-card flex flex-col shrink-0">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="flex flex-col flex-1">
              <TabsList className="w-full rounded-none border-b shrink-0 h-10">
                <TabsTrigger value="properties" className="flex-1 text-[11px]">Eigenschappen</TabsTrigger>
                <TabsTrigger value="page" className="flex-1 text-[11px]">Pagina</TabsTrigger>
                <TabsTrigger value="versions" className="flex-1 text-[11px]">Versies</TabsTrigger>
              </TabsList>

              <TabsContent value="properties" className="m-0 flex-1 overflow-hidden">
                {selectedBlock ? (
                  <BlockPropertyPanel block={selectedBlock} onChange={updateBlock} />
                ) : (
                  <div className="flex flex-col items-center justify-center py-16 px-6 text-center text-muted-foreground">
                    <MousePointer className="mb-3 h-8 w-8 opacity-30" />
                    <p className="text-sm font-medium">Selecteer een blok</p>
                    <p className="mt-1 text-xs opacity-70">Klik op een blok in het canvas om de eigenschappen te bewerken</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="page" className="m-0 flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="space-y-4 p-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Pagina slug</Label>
                      <Input
                        value={pageSlug}
                        onChange={(e) => setPageSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ""))}
                        placeholder="pagina-naam"
                      />
                      <p className="text-[10px] text-muted-foreground">URL: /p/{pageSlug || "..."}</p>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">SEO Titel</Label>
                      <Input value={seoTitle} onChange={(e) => setSeoTitle(e.target.value)} placeholder="Paginatitel voor zoekmachines" />
                      <p className="text-[10px] text-muted-foreground">{seoTitle.length}/60 tekens</p>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">SEO Beschrijving</Label>
                      <Input value={seoDescription} onChange={(e) => setSeoDescription(e.target.value)} placeholder="Beschrijving voor zoekmachines" />
                      <p className="text-[10px] text-muted-foreground">{seoDescription.length}/160 tekens</p>
                    </div>
                    <div className="rounded-lg border border-border bg-muted/50 p-3">
                      <p className="text-[11px] font-medium text-muted-foreground mb-1">Status</p>
                      <p className="text-sm font-medium">
                        {isPublished ? (
                          <span className="text-secondary">● Gepubliceerd</span>
                        ) : (
                          <span className="text-muted-foreground">○ Concept</span>
                        )}
                      </p>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="versions" className="m-0 flex-1 overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="space-y-2 p-4">
                    {versions.length === 0 ? (
                      <div className="flex flex-col items-center py-12 text-muted-foreground">
                        <Undo2 className="mb-3 h-8 w-8 opacity-30" />
                        <p className="text-sm">Nog geen versies</p>
                        <p className="mt-1 text-xs opacity-70">Versies worden aangemaakt bij opslaan</p>
                      </div>
                    ) : (
                      versions.map((v, i) => (
                        <div key={v.id} className="flex items-center justify-between rounded-lg border border-border p-3">
                          <div>
                            <p className="text-xs font-medium">Versie {versions.length - i}</p>
                            <p className="text-[10px] text-muted-foreground">
                              {new Date(v.created_at).toLocaleString("nl-NL")}
                            </p>
                          </div>
                          <Button variant="outline" size="sm" className="text-xs" onClick={() => restoreVersion(v)}>
                            <Undo2 className="mr-1 h-3 w-3" />
                            Herstel
                          </Button>
                        </div>
                      ))
                    )}
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </div>

      {/* ─── Add block overlay ─── */}
      {showAddBlock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={() => setShowAddBlock(false)}>
          <div className="w-[420px] rounded-2xl border border-border bg-card p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-semibold text-foreground">Blok toevoegen</h3>
              <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowAddBlock(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {(Object.keys(blockLabels) as BlockType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => addBlock(type)}
                  className="flex flex-col items-center gap-2.5 rounded-xl border border-border p-5 transition-all hover:border-primary hover:bg-primary/5 hover:shadow-md active:scale-95"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-foreground">
                    {blockIcons[type]}
                  </div>
                  <span className="text-xs font-medium">{blockLabels[type]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
