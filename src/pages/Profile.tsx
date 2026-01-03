import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { Camera } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { profileUpdateSchema } from "@/lib/validations";

const Profile = () => {
  const { toast } = useToast();
  const { user, isAdmin } = useAuth();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [allowDm, setAllowDm] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      loadProfile();
    }
  }, [user]);

  const loadProfile = async () => {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, bio, allow_dm')
      .eq('user_id', user!.id)
      .single();
    
    if (data) {
      setUsername(data.username);
      setBio(data.bio || "");
      setAllowDm(data.allow_dm ?? true);
    }
  };

  const handleSave = async () => {
    setErrors({});
    
    // Validate with zod
    const result = profileUpdateSchema.safeParse({
      username,
      bio: bio || undefined,
      allowDm,
    });
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    
    const { error } = await supabase
      .from('profiles')
      .update({
        username,
        bio: bio || null,
        allow_dm: allowDm,
      })
      .eq('user_id', user!.id);

    if (error) {
      toast({
        title: "Fout bij opslaan",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Profiel bijgewerkt",
        description: "Je wijzigingen zijn opgeslagen.",
      });
    }
    
    setIsLoading(false);
  };

  return (
    <Layout isLoggedIn={true} isAdmin={isAdmin}>
      <div className="container max-w-2xl py-8 md:py-12">
        <PageHeader
          title="Mijn Profiel"
          description="Beheer je profielinstellingen en privacy"
        />

        <div className="mt-8 space-y-8">
          {/* Avatar */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Profielfoto
            </h2>
            <div className="mt-4 flex items-center gap-6">
              <div className="relative">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-semibold text-primary">
                  {username ? username.charAt(0).toUpperCase() : "?"}
                </div>
                <button className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-medium transition-smooth hover:bg-primary/90">
                  <Camera className="h-4 w-4" />
                </button>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  Upload een foto om je profiel persoonlijker te maken.
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  JPG, PNG of GIF. Max 2MB.
                </p>
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Basisinformatie
            </h2>
            <div className="mt-4 space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Gebruikersnaam</Label>
                <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="jouw_naam"
                  maxLength={30}
                />
                {errors.username && (
                  <p className="text-sm text-destructive">{errors.username}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Dit is hoe anderen je zien in de community. (3-30 karakters, alleen letters, cijfers en _)
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Vertel iets over jezelf..."
                  className="min-h-24"
                  maxLength={500}
                />
                {errors.bio && (
                  <p className="text-sm text-destructive">{errors.bio}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Optioneel. Dit wordt getoond op je profiel. ({bio.length}/500 karakters)
                </p>
              </div>
            </div>
          </div>

          {/* Privacy */}
          <div className="rounded-2xl border border-border/50 bg-card p-6 shadow-soft">
            <h2 className="font-display text-lg font-semibold text-foreground">
              Privacy
            </h2>
            <div className="mt-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">
                    Sta privéberichten toe
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Wanneer uitgeschakeld, kunnen anderen je geen privéberichten sturen.
                  </p>
                </div>
                <Switch
                  checked={allowDm}
                  onCheckedChange={setAllowDm}
                />
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isLoading} size="lg">
              {isLoading ? "Opslaan..." : "Wijzigingen opslaan"}
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
