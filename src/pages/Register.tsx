import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import { registerFormSchema } from "@/lib/validations";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedGuidelines, setAcceptedGuidelines] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { signUp, user } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate("/community");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    // Validate with zod
    const result = registerFormSchema.safeParse({
      username,
      email,
      password,
      confirmPassword,
      acceptedGuidelines,
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
    
    const { error } = await signUp(email, password, username);

    if (error) {
      const message = error.message.includes("already registered")
        ? "Dit e-mailadres is al in gebruik"
        : error.message;
      toast({
        title: "Registratie mislukt",
        description: message,
        variant: "destructive",
      });
    } else {
      toast({
        title: "Account aangemaakt!",
        description: "Je kunt nu inloggen.",
      });
      navigate("/community");
    }
    
    setIsLoading(false);
  };

  return (
    <Layout showNav={false} showFooter={false}>
      <div className="flex min-h-screen">
        {/* Left side - Visual */}
        <div className="hidden bg-gradient-hero lg:flex lg:flex-1 lg:flex-col lg:items-center lg:justify-center lg:p-12">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 animate-float">
              <Heart className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Begin je reis
            </h2>
            <p className="mt-4 text-muted-foreground">
              Sluit je aan bij een community waar je echt jezelf mag zijn. 
              Zonder oordeel, met warmte en begrip.
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="flex flex-1 flex-col justify-center px-8 py-12 lg:px-12">
          <div className="mx-auto w-full max-w-md">
            <Link to="/" className="mb-12 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Heart className="h-5 w-5 text-primary" />
              </div>
              <span className="font-display text-xl font-semibold">
                Bewust Bestaan
              </span>
            </Link>

            <div className="animate-fade-in">
              <h1 className="font-display text-3xl font-bold text-foreground">
                Account aanmaken
              </h1>
              <p className="mt-2 text-muted-foreground">
                Maak een gratis account aan om te beginnen
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="username">Gebruikersnaam</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="jouw_naam"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.username && (
                    <p className="text-sm text-destructive">{errors.username}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mailadres</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="jouw@email.nl"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Wachtwoord</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimaal 8 karakters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-destructive">{errors.password}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Bevestig wachtwoord</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      placeholder="Herhaal je wachtwoord"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10"
                      required
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                  )}
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-muted/50 p-4">
                  <Checkbox
                    id="guidelines"
                    checked={acceptedGuidelines}
                    onCheckedChange={(checked) => setAcceptedGuidelines(checked as boolean)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="guidelines" className="text-sm leading-relaxed text-muted-foreground">
                    Ik ga akkoord met de{" "}
                    <Link to="/richtlijnen" className="font-medium text-primary hover:underline">
                      communityrichtlijnen
                    </Link>
                    . Ik begrijp dat dit een veilige plek is voor iedereen.
                  </Label>
                </div>
                {errors.acceptedGuidelines && (
                  <p className="text-sm text-destructive">{errors.acceptedGuidelines}</p>
                )}

                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? "Account aanmaken..." : "Account aanmaken"}
                </Button>
              </form>

              <p className="mt-8 text-center text-sm text-muted-foreground">
                Heb je al een account?{" "}
                <Link to="/login" className="font-medium text-primary hover:underline">
                  Log hier in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
