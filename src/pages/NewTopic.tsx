import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { topicTitleSchema, topicBodySchema } from "@/lib/validations";
import { useCategories, useCreateTopic } from "@/hooks/useCommunity";

const NewTopic = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [tags, setTags] = useState("");
  const [errors, setErrors] = useState<{ title?: string; body?: string; category?: string }>({});

  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const createTopic = useCreateTopic();

  // Pre-select category from URL param
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categories) {
      const exists = categories.some((c) => c.id === categoryParam);
      if (exists) {
        setCategoryId(categoryParam);
      }
    }
  }, [searchParams, categories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate
    const titleResult = topicTitleSchema.safeParse(title);
    const bodyResult = topicBodySchema.safeParse(body);
    
    const newErrors: typeof errors = {};
    
    if (!titleResult.success) {
      newErrors.title = titleResult.error.errors[0]?.message;
    }
    if (!bodyResult.success) {
      newErrors.body = bodyResult.error.errors[0]?.message;
    }
    if (!categoryId) {
      newErrors.category = "Kies een categorie";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const parsedTags = tags
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0)
        .slice(0, 5); // Max 5 tags

      const newTopic = await createTopic.mutateAsync({
        title,
        body,
        categoryId,
        tags: parsedTags,
      });

      toast({
        title: "Topic aangemaakt",
        description: "Je topic is succesvol geplaatst.",
      });

      navigate(`/community/topic/${newTopic.id}`);
    } catch (error: any) {
      toast({
        title: "Fout",
        description: error.message || "Kon topic niet aanmaken",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout>
      <div className="container max-w-2xl py-8 md:py-12">
        <Link
          to="/community"
          className="mb-6 inline-flex items-center gap-1 text-sm text-muted-foreground transition-smooth hover:text-foreground"
        >
          <ChevronLeft className="h-4 w-4" />
          Terug naar community
        </Link>

        <PageHeader
          title="Nieuw topic"
          description="Start een nieuwe discussie met de community"
        />

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Categorie *</Label>
            <Select value={categoryId} onValueChange={setCategoryId}>
              <SelectTrigger id="category" className={errors.category ? "border-destructive" : ""}>
                <SelectValue placeholder="Kies een categorie" />
              </SelectTrigger>
              <SelectContent>
                {categoriesLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 className="h-4 w-4 animate-spin" />
                  </div>
                ) : (
                  categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
            {errors.category && (
              <p className="text-sm text-destructive">{errors.category}</p>
            )}
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Titel *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Een duidelijke, beschrijvende titel"
              maxLength={200}
              className={errors.title ? "border-destructive" : ""}
            />
            <div className="flex items-center justify-between">
              {errors.title ? (
                <p className="text-sm text-destructive">{errors.title}</p>
              ) : (
                <span />
              )}
              <span className="text-xs text-muted-foreground">{title.length}/200</span>
            </div>
          </div>

          {/* Body */}
          <div className="space-y-2">
            <Label htmlFor="body">Bericht *</Label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Deel je gedachten, vraag of ervaring..."
              rows={8}
              maxLength={10000}
              className={errors.body ? "border-destructive" : ""}
            />
            <div className="flex items-center justify-between">
              {errors.body ? (
                <p className="text-sm text-destructive">{errors.body}</p>
              ) : (
                <span />
              )}
              <span className="text-xs text-muted-foreground">{body.length}/10.000</span>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <Label htmlFor="tags">Tags (optioneel)</Label>
            <Input
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Bijv: angst, meditatie, tips (gescheiden door komma's)"
            />
            <p className="text-xs text-muted-foreground">
              Maximaal 5 tags, gescheiden door komma's
            </p>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate(-1)}
            >
              Annuleren
            </Button>
            <Button type="submit" disabled={createTopic.isPending}>
              {createTopic.isPending && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Topic plaatsen
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default NewTopic;