import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { ContentCard } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import {
  Plus, Trash2, GripVertical, ChevronDown, ChevronRight, Save,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_url: string | null;
  published: boolean;
  drip_interval_days: number;
}

interface Module {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  sort_order: number;
  content_text: string | null;
  video_url: string | null;
  audio_url: string | null;
  download_url: string | null;
}

export function AdminCourses() {
  const { toast } = useToast();
  const [courses, setCourses] = useState<Course[]>([]);
  const [modules, setModules] = useState<Record<string, Module[]>>({});
  const [expandedCourse, setExpandedCourse] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // New course form
  const [newTitle, setNewTitle] = useState("");
  const [newSlug, setNewSlug] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDrip, setNewDrip] = useState(7);
  const [showNewForm, setShowNewForm] = useState(false);

  // New module form
  const [newModuleCourseId, setNewModuleCourseId] = useState<string | null>(null);
  const [newModuleTitle, setNewModuleTitle] = useState("");
  const [newModuleDesc, setNewModuleDesc] = useState("");
  const [newModuleText, setNewModuleText] = useState("");
  const [newModuleVideo, setNewModuleVideo] = useState("");
  const [newModuleAudio, setNewModuleAudio] = useState("");
  const [newModuleDownload, setNewModuleDownload] = useState("");

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    const { data } = await supabase
      .from("courses")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setCourses(data);
    setLoading(false);
  };

  const fetchModules = async (courseId: string) => {
    const { data } = await supabase
      .from("course_modules")
      .select("*")
      .eq("course_id", courseId)
      .order("sort_order", { ascending: true });
    if (data) setModules((prev) => ({ ...prev, [courseId]: data }));
  };

  const toggleExpand = (courseId: string) => {
    if (expandedCourse === courseId) {
      setExpandedCourse(null);
    } else {
      setExpandedCourse(courseId);
      if (!modules[courseId]) fetchModules(courseId);
    }
  };

  const createCourse = async () => {
    if (!newTitle.trim() || !newSlug.trim()) return;
    const { error } = await supabase.from("courses").insert({
      title: newTitle.trim(),
      slug: newSlug.trim().toLowerCase().replace(/\s+/g, "-"),
      description: newDesc.trim() || null,
      drip_interval_days: newDrip,
    });
    if (error) {
      toast({ title: "Fout", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Cursus aangemaakt" });
      setNewTitle("");
      setNewSlug("");
      setNewDesc("");
      setNewDrip(7);
      setShowNewForm(false);
      fetchCourses();
    }
  };

  const togglePublished = async (course: Course) => {
    const { error } = await supabase
      .from("courses")
      .update({ published: !course.published })
      .eq("id", course.id);
    if (!error) {
      setCourses((prev) =>
        prev.map((c) => (c.id === course.id ? { ...c, published: !c.published } : c))
      );
    }
  };

  const deleteCourse = async (id: string) => {
    if (!confirm("Weet je zeker dat je deze cursus wilt verwijderen?")) return;
    const { error } = await supabase.from("courses").delete().eq("id", id);
    if (!error) {
      setCourses((prev) => prev.filter((c) => c.id !== id));
      toast({ title: "Cursus verwijderd" });
    }
  };

  const addModule = async (courseId: string) => {
    if (!newModuleTitle.trim()) return;
    const currentModules = modules[courseId] || [];
    const sortOrder = currentModules.length;

    const { error } = await supabase.from("course_modules").insert({
      course_id: courseId,
      title: newModuleTitle.trim(),
      description: newModuleDesc.trim() || null,
      content_text: newModuleText.trim() || null,
      video_url: newModuleVideo.trim() || null,
      audio_url: newModuleAudio.trim() || null,
      download_url: newModuleDownload.trim() || null,
      sort_order: sortOrder,
    });

    if (error) {
      toast({ title: "Fout", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Module toegevoegd" });
      setNewModuleCourseId(null);
      setNewModuleTitle("");
      setNewModuleDesc("");
      setNewModuleText("");
      setNewModuleVideo("");
      setNewModuleAudio("");
      setNewModuleDownload("");
      fetchModules(courseId);
    }
  };

  const deleteModule = async (moduleId: string, courseId: string) => {
    if (!confirm("Module verwijderen?")) return;
    const { error } = await supabase.from("course_modules").delete().eq("id", moduleId);
    if (!error) fetchModules(courseId);
  };

  if (loading) {
    return <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-xl font-semibold text-foreground">Cursussen</h2>
        <Button onClick={() => setShowNewForm(!showNewForm)} size="sm">
          <Plus className="mr-1 h-4 w-4" />
          Nieuwe cursus
        </Button>
      </div>

      {/* New Course Form */}
      {showNewForm && (
        <ContentCard className="space-y-4">
          <h3 className="font-medium text-foreground">Nieuwe cursus</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label>Titel</Label>
              <Input value={newTitle} onChange={(e) => { setNewTitle(e.target.value); setNewSlug(e.target.value.toLowerCase().replace(/\s+/g, "-")); }} placeholder="Cursustitel" />
            </div>
            <div>
              <Label>Slug</Label>
              <Input value={newSlug} onChange={(e) => setNewSlug(e.target.value)} placeholder="cursus-slug" />
            </div>
          </div>
          <div>
            <Label>Beschrijving</Label>
            <Textarea value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Korte beschrijving..." />
          </div>
          <div className="max-w-xs">
            <Label>Drip interval (dagen)</Label>
            <Input type="number" min={1} value={newDrip} onChange={(e) => setNewDrip(Number(e.target.value))} />
          </div>
          <div className="flex gap-2">
            <Button onClick={createCourse}>
              <Save className="mr-1 h-4 w-4" />
              Aanmaken
            </Button>
            <Button variant="outline" onClick={() => setShowNewForm(false)}>
              Annuleren
            </Button>
          </div>
        </ContentCard>
      )}

      {/* Course List */}
      {courses.length === 0 ? (
        <p className="text-muted-foreground">Nog geen cursussen.</p>
      ) : (
        <div className="space-y-3">
          {courses.map((course) => (
            <ContentCard key={course.id}>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => toggleExpand(course.id)}
                  className="flex items-center gap-3 text-left"
                >
                  {expandedCourse === course.id ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                  <div>
                    <p className="font-medium text-foreground">{course.title}</p>
                    <p className="text-xs text-muted-foreground">
                      /{course.slug} · Drip: {course.drip_interval_days} dagen
                    </p>
                  </div>
                </button>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <Label className="text-xs">Gepubliceerd</Label>
                    <Switch
                      checked={course.published ?? false}
                      onCheckedChange={() => togglePublished(course)}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>

              {/* Modules */}
              {expandedCourse === course.id && (
                <div className="mt-4 ml-7 space-y-2 border-l-2 border-border pl-4">
                  {(modules[course.id] || []).map((mod, idx) => (
                    <div
                      key={mod.id}
                      className="flex items-center justify-between rounded-lg bg-muted/50 px-3 py-2"
                    >
                      <div className="flex items-center gap-2">
                        <GripVertical className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium text-foreground">
                          {idx + 1}. {mod.title}
                        </span>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteModule(mod.id, course.id)}
                      >
                        <Trash2 className="h-3 w-3 text-destructive" />
                      </Button>
                    </div>
                  ))}

                  {/* Add Module */}
                  {newModuleCourseId === course.id ? (
                    <div className="mt-3 space-y-3 rounded-lg border border-border bg-card p-4">
                      <div>
                        <Label>Module titel</Label>
                        <Input value={newModuleTitle} onChange={(e) => setNewModuleTitle(e.target.value)} />
                      </div>
                      <div>
                        <Label>Beschrijving</Label>
                        <Input value={newModuleDesc} onChange={(e) => setNewModuleDesc(e.target.value)} />
                      </div>
                      <div>
                        <Label>Tekstinhoud</Label>
                        <Textarea value={newModuleText} onChange={(e) => setNewModuleText(e.target.value)} rows={4} />
                      </div>
                      <div className="grid gap-3 sm:grid-cols-3">
                        <div>
                          <Label>Video URL</Label>
                          <Input value={newModuleVideo} onChange={(e) => setNewModuleVideo(e.target.value)} placeholder="https://..." />
                        </div>
                        <div>
                          <Label>Audio URL</Label>
                          <Input value={newModuleAudio} onChange={(e) => setNewModuleAudio(e.target.value)} placeholder="https://..." />
                        </div>
                        <div>
                          <Label>Download URL</Label>
                          <Input value={newModuleDownload} onChange={(e) => setNewModuleDownload(e.target.value)} placeholder="https://..." />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => addModule(course.id)}>
                          <Save className="mr-1 h-4 w-4" />
                          Toevoegen
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => setNewModuleCourseId(null)}>
                          Annuleren
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2"
                      onClick={() => setNewModuleCourseId(course.id)}
                    >
                      <Plus className="mr-1 h-4 w-4" />
                      Module toevoegen
                    </Button>
                  )}
                </div>
              )}
            </ContentCard>
          ))}
        </div>
      )}
    </div>
  );
}
