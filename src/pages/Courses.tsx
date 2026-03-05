import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ContentCard } from "@/components/Cards";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { BookOpen, Clock, Lock, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface Course {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  cover_url: string | null;
  drip_interval_days: number;
}

interface Enrollment {
  course_id: string;
  enrolled_at: string;
}

const Courses = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const { data: coursesData } = await supabase
        .from("courses")
        .select("id, title, slug, description, cover_url, drip_interval_days")
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (coursesData) setCourses(coursesData);

      if (user) {
        const { data: enrollData } = await supabase
          .from("course_enrollments")
          .select("course_id, enrolled_at")
          .eq("user_id", user.id);
        if (enrollData) setEnrollments(enrollData);
      }

      setLoading(false);
    };
    fetchData();
  }, [user]);

  const isEnrolled = (courseId: string) =>
    enrollments.some((e) => e.course_id === courseId);

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <PageHeader
          title="Cursussen"
          description="Verdiep je kennis met onze stapsgewijze cursussen"
        />

        {loading ? (
          <div className="mt-8 flex justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
          </div>
        ) : courses.length === 0 ? (
          <div className="mt-12 text-center">
            <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-4 text-muted-foreground">
              Er zijn nog geen cursussen beschikbaar.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => {
              const enrolled = isEnrolled(course.id);
              return (
                <Link key={course.id} to={`/cursussen/${course.slug}`}>
                  <ContentCard className="group h-full transition-shadow hover:shadow-md">
                    {course.cover_url && (
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <img
                          src={course.cover_url}
                          alt={course.title}
                          className="h-40 w-full object-cover transition-transform group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-display text-lg font-semibold text-foreground">
                        {course.title}
                      </h3>
                      {enrolled ? (
                        <Badge variant="secondary" className="shrink-0">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Ingeschreven
                        </Badge>
                      ) : (
                        <Lock className="h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                    </div>
                    {course.description && (
                      <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                        {course.description}
                      </p>
                    )}
                    <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>Elke {course.drip_interval_days} dagen een nieuwe module</span>
                    </div>
                  </ContentCard>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Courses;
