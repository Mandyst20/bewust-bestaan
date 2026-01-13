import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { ExerciseCard } from "@/components/Cards";

const sampleExercises = [
  {
    slug: "ademhalingsoefening-rust",
    title: "4-7-8 Ademhalingsoefening",
    description: "Een kalmerende ademhalingstechniek die helpt bij stress en het in slaap vallen. Perfect voor elk moment van de dag.",
    duration: "5 minuten",
    hasAudio: true,
  },
  {
    slug: "body-scan-meditatie",
    title: "Body Scan Meditatie",
    description: "Breng aandacht naar elk deel van je lichaam en ontdek waar je spanning vasthoudt. Leer los te laten.",
    duration: "15 minuten",
    hasAudio: true,
  },
  {
    slug: "dankbaarheid-reflectie",
    title: "Dankbaarheid Reflectie",
    description: "Een eenvoudige maar krachtige oefening om je focus te verleggen naar wat goed gaat in je leven.",
    duration: "10 minuten",
    hasAudio: false,
  },
  {
    slug: "grounding-oefening",
    title: "5-4-3-2-1 Grounding",
    description: "Kom terug in het moment met deze zintuiglijke oefening. Ideaal bij overweldigende gedachten of angst.",
    duration: "5 minuten",
    hasAudio: false,
  },
];

const Exercises = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      <div className="container py-8 md:py-12">
        <PageHeader
          title="Oefeningen"
          description="Praktische oefeningen voor rust, mindfulness en persoonlijke groei. Neem de tijd voor jezelf."
        />

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {sampleExercises.map((exercise) => (
            <ExerciseCard
              key={exercise.slug}
              title={exercise.title}
              description={exercise.description}
              duration={exercise.duration}
              hasAudio={exercise.hasAudio}
              onClick={() => navigate(`/oefeningen/${exercise.slug}`)}
            />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Exercises;
