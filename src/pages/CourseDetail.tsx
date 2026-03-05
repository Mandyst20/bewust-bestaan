import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ContentCard } from "@/components/Cards";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  BookOpen, Lock, CheckCircle, Play, Music, FileDown, FileText, ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_url: string | null;
  drip_interval_days: number;
}

interface Module {
  id: string;
  title: string;
  description: string | null;
  sort_order: number;
  content_text: string | null;
  video_url: string | null;
  audio_url: string | null;
  download_url: string | null;
}

const CourseDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const { user } = useAuth();
  const { toast } = useToast();
  const [course, setCourse] = useState<Course | null>(null);
  const [modules, setModules] = useState<Module[]>([]);
  const [enrollment, setEnrollment] = useState<{ enrolled_at: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data: courseData } = await supabase
        .from("courses")
        .select("*")
        .eq("slug", slug)
        .single();

      if (!courseData) {
        setLoading(false);
        return;
      }
      setCourse(courseData);

      const { data: modulesData } = await supabase
        .from("course_modules")
        .select("*")
        .eq("course_id", courseData.id)
        .order("sort_order", { ascending: true });

      if (modulesData) setModules(modulesData);

      if (user) {
        const { data: enrollData } = await supabase
          .from("course_enrollments")
          .select("enrolled_at")
          .eq("user_id", user.id)
          .eq("course_id", courseData.id)
          .maybeSingle();
        if (enrollData) setEnrollment(enrollData);
      }

      setLoading(false);
    };
    fetch();
  }, [slug, user]);

  const handleEnroll = async () => {
    if (!user || !course) return;
    setEnrolling(true);
    const { error } = await supabase.from("course_enrollments").insert({
      user_id: user.id,
      course_id: course.id,
    });
    if (error) {
      toast({ title: "Fout", description: "Kon niet inschrijven.", variant: "destructive" });
    } else {
      setEnrollment({ enrolled_at: new Date().toISOString() });
      toast({ title: "Ingeschreven!", description: "Je hebt nu toegang tot deze cursus." });
    }
    setEnrolling(false);
  };

  const isModuleAvailable = (index: number): boolean => {
    if (!enrollment || !course) return false;
    const enrolledDate = new Date(enrollment.enrolled_at);
    const daysNeeded = index * course.drip_interval_days;
    const availableDate = new Date(enrolledDate);
    availableDate.setDate(availableDate.getDate() + daysNeeded);
    return new Date() >= availableDate;
  };

  const getModuleAvailableDate = (index: number): string | null => {
    if (!enrollment || !course) return null;
    const enrolledDate = new Date(enrollment.enrolled_at);
    const daysNeeded = index * course.drip_interval_days;
    const availableDate = new Date(enrolledDate);
    availableDate.setDate(availableDate.getDate() + daysNeeded);
    if (new Date() >= availableDate) return null;
    return availableDate.toLocaleDateString("nl-NL", {
      day: "numeric",
      month: "long",
    });
  };

  const activeModule = modules.find((m) => m.id === activeModuleId);

  if (loading) {
    return (
      <Layout>
        <div className="flex min-h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </Layout>
    );
  }

  if (!course) {
    return (
      <Layout>
        <div className="container py-12 text-center">
          <p className="text-muted-foreground">Cursus niet gevonden.</p>
          <Link to="/cursussen" className="mt-4 inline-block text-primary hover:underline">
            ← Terug naar cursussen
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <Link
          to="/cursussen"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Alle cursussen
        </Link>

        {/* Course Header */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h1 className="font-display text-3xl font-bold text-foreground md:text-4xl">
              {course.title}
            </h1>
            {course.description && (
              <p className="mt-4 text-lg text-muted-foreground">{course.description}</p>
            )}

            {/* Active Module Content */}
            {activeModule && enrollment && (
              <ContentCard className="mt-8">
                <button
                  onClick={() => setActiveModuleId(null)}
                  className="mb-4 text-sm text-primary hover:underline"
                >
                  ← Terug naar overzicht
                </button>
                <h2 className="font-display text-2xl font-semibold text-foreground">
                  {activeModule.title}
                </h2>

                {activeModule.video_url && (
                  <div className="mt-4 overflow-hidden rounded-lg bg-muted">
                    <video
                      src={activeModule.video_url}
                      controls
                      className="w-full"
                    />
                  </div>
                )}

                {activeModule.audio_url && (
                  <div className="mt-4">
                    <p className="mb-2 flex items-center gap-2 text-sm font-medium text-foreground">
                      <Music className="h-4 w-4" /> Audio
                    </p>
                    <audio src={activeModule.audio_url} controls className="w-full" />
                  </div>
                )}

                {activeModule.content_text && (
                  <div className="mt-6 prose prose-neutral max-w-none text-foreground">
                    <p className="whitespace-pre-wrap">{activeModule.content_text}</p>
                  </div>
                )}

                {activeModule.download_url && (
                  <a
                    href={activeModule.download_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    <FileDown className="h-4 w-4" />
                    Download materiaal
                  </a>
                )}
              </ContentCard>
            )}
          </div>

          {/* Sidebar */}
          <div>
            {course.cover_url && (
              <img
                src={course.cover_url}
                alt={course.title}
                className="mb-6 w-full rounded-xl object-cover"
              />
            )}

            {!enrollment ? (
              <ContentCard className="text-center">
                <BookOpen className="mx-auto h-10 w-10 text-primary" />
                <p className="mt-3 font-display text-lg font-semibold">
                  {modules.length} modules
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Elke {course.drip_interval_days} dagen een nieuwe module
                </p>
                <Button
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="mt-4 w-full"
                  size="lg"
                >
                  {enrolling ? "Bezig..." : "Schrijf je in"}
                </Button>
              </ContentCard>
            ) : (
              <ContentCard>
                <div className="flex items-center gap-2 text-sm text-secondary">
                  <CheckCircle className="h-4 w-4" />
                  Ingeschreven
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  Sinds{" "}
                  {new Date(enrollment.enrolled_at).toLocaleDateString("nl-NL", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </ContentCard>
            )}
          </div>
        </div>

        {/* Module List */}
        {!activeModuleId && (
          <div className="mt-10">
            <h2 className="font-display text-xl font-semibold text-foreground">
              Modules
            </h2>
            <div className="mt-4 space-y-3">
              {modules.map((mod, index) => {
                const available = isModuleAvailable(index);
                const availDate = getModuleAvailableDate(index);
                const hasContent =
                  mod.video_url || mod.audio_url || mod.content_text || mod.download_url;

                return (
                  <div
                    key={mod.id}
                    onClick={() => {
                      if (enrollment && available && hasContent) {
                        setActiveModuleId(mod.id);
                      }
                    }}
                  >
                  <ContentCard
                    className={`flex items-center justify-between ${
                      enrollment && available
                        ? "cursor-pointer hover:shadow-sm"
                        : "opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          enrollment && available
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{mod.title}</p>
                        {mod.description && (
                          <p className="text-sm text-muted-foreground">{mod.description}</p>
                        )}
                        {availDate && (
                          <p className="mt-1 text-xs text-muted-foreground">
                            Beschikbaar op {availDate}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {mod.video_url && <Play className="h-4 w-4 text-muted-foreground" />}
                      {mod.audio_url && <Music className="h-4 w-4 text-muted-foreground" />}
                      {mod.download_url && <FileDown className="h-4 w-4 text-muted-foreground" />}
                      {mod.content_text && <FileText className="h-4 w-4 text-muted-foreground" />}
                      {enrollment && available ? (
                        <CheckCircle className="h-5 w-5 text-secondary" />
                      ) : (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      )}
                    </div>
                  </ContentCard>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default CourseDetail;
