import { useParams, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { ChevronLeft } from "lucide-react";

const sampleBlog = {
  slug: "de-kracht-van-stilte",
  title: "De kracht van stilte in een drukke wereld",
  body: `In onze moderne wereld zijn we constant verbonden. Notificaties, berichten, nieuws — de stroom van informatie stopt nooit. Maar te midden van al dit lawaai zijn we iets kostbaars kwijtgeraakt: stilte.

## Waarom stilte belangrijk is

Stilte is niet alleen de afwezigheid van geluid. Het is een ruimte waarin we kunnen zijn, zonder de druk om te presteren of te reageren. In die ruimte vinden we onszelf terug.

Onderzoek toont aan dat regelmatige momenten van stilte:
- Stress verminderen
- Creativiteit stimuleren
- Emotionele verwerking mogelijk maken
- Diepere verbinding met onszelf creëren

## Hoe vind je stilte?

Het hoeft niet ingewikkeld te zijn. Begin klein:

**1. Maak een ritueel**
Reserveer elke dag vijf minuten voor stilte. Geen telefoon, geen muziek, geen afleiding. Gewoon zijn.

**2. Zoek de natuur op**
Zelfs een korte wandeling in het park kan je helpen om de constante ruis van het dagelijks leven los te laten.

**3. Creëer een rustige hoek**
Maak een plek in je huis die gewijd is aan rust. Een comfortabele stoel, misschien een plant, een plek waar je even kunt ademen.

## De uitdaging

Het moeilijkste aan stilte is dat het ons confronteert met onszelf. Zonder afleiding komen onze gedachten en gevoelens naar boven. Dat kan ongemakkelijk zijn.

Maar juist in dat ongemak ligt groei. Door onszelf te leren verdragen in stilte, leren we onszelf kennen. En in die kennis vinden we rust.

## Begin vandaag

Je hoeft niet te wachten op het perfecte moment. Sluit nu even je ogen. Adem drie keer diep in en uit. Voel hoe het is om er gewoon te zijn.

Dat is genoeg. Dat is het begin.

---

*Met warmte geschreven door het Bewust Bestaan team*`,
  coverUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
  date: "15 december 2024",
  readTime: "5 min leestijd",
};

const BlogDetail = () => {
  const { slug } = useParams();

  return (
    <Layout isLoggedIn={true}>
      <article className="py-8 md:py-12">
        <div className="container max-w-3xl">
          <Link
            to="/blogs"
            className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-foreground"
          >
            <ChevronLeft className="h-4 w-4" />
            Terug naar blogs
          </Link>

          <header>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <span>{sampleBlog.date}</span>
              <span>•</span>
              <span>{sampleBlog.readTime}</span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-bold text-foreground md:text-4xl lg:text-5xl">
              {sampleBlog.title}
            </h1>
          </header>

          {sampleBlog.coverUrl && (
            <div className="mt-8 overflow-hidden rounded-2xl">
              <img
                src={sampleBlog.coverUrl}
                alt={sampleBlog.title}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          <div className="prose prose-lg mt-8 max-w-none">
            {sampleBlog.body.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="mt-10 font-display text-2xl font-semibold text-foreground">
                    {paragraph.replace('## ', '')}
                  </h2>
                );
              }
              if (paragraph.startsWith('**')) {
                return (
                  <p key={index} className="mt-6 font-semibold text-foreground">
                    {paragraph.replace(/\*\*/g, '')}
                  </p>
                );
              }
              if (paragraph.startsWith('- ')) {
                const items = paragraph.split('\n');
                return (
                  <ul key={index} className="mt-4 space-y-2">
                    {items.map((item, i) => (
                      <li key={i} className="text-muted-foreground">
                        {item.replace('- ', '')}
                      </li>
                    ))}
                  </ul>
                );
              }
              if (paragraph.startsWith('---')) {
                return <hr key={index} className="my-8 border-border" />;
              }
              if (paragraph.startsWith('*') && paragraph.endsWith('*')) {
                return (
                  <p key={index} className="mt-6 italic text-muted-foreground">
                    {paragraph.replace(/\*/g, '')}
                  </p>
                );
              }
              return (
                <p key={index} className="mt-6 text-foreground leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default BlogDetail;
