import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { BlogCard } from "@/components/Cards";

const sampleBlogs = [
  {
    slug: "de-kracht-van-stilte",
    title: "De kracht van stilte in een drukke wereld",
    excerpt: "In onze altijd verbonden wereld is stilte zeldzaam geworden. Ontdek waarom momenten van rust essentieel zijn voor je welzijn.",
    coverUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop",
    date: "15 december 2024",
    readTime: "5 min leestijd",
  },
  {
    slug: "omgaan-met-verandering",
    title: "Omgaan met verandering: een zachte benadering",
    excerpt: "Verandering is onvermijdelijk, maar hoe we ermee omgaan is een keuze. Leer hoe je verandering kunt omarmen met compassie voor jezelf.",
    coverUrl: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=450&fit=crop",
    date: "10 december 2024",
    readTime: "7 min leestijd",
  },
  {
    slug: "grenzen-stellen-liefdevol",
    title: "Grenzen stellen met liefde",
    excerpt: "Het stellen van grenzen is geen afwijzing van anderen, maar een daad van zelfliefde. Ontdek hoe je dit op een warme manier kunt doen.",
    coverUrl: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=450&fit=crop",
    date: "5 december 2024",
    readTime: "6 min leestijd",
  },
];

const Blogs = () => {
  const navigate = useNavigate();

  return (
    <Layout isLoggedIn={true}>
      <div className="container py-8 md:py-12">
        <PageHeader
          title="Blogs"
          description="Inspirerende artikelen over bewust leven, persoonlijke groei en innerlijke rust."
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sampleBlogs.map((blog) => (
            <BlogCard
              key={blog.slug}
              title={blog.title}
              excerpt={blog.excerpt}
              coverUrl={blog.coverUrl}
              date={blog.date}
              readTime={blog.readTime}
              onClick={() => navigate(`/blogs/${blog.slug}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Blogs;
