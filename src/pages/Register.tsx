import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Heart, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [acceptedGuidelines, setAcceptedGuidelines] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: "Wachtwoorden komen niet overeen",
        description: "Controleer je wachtwoorden en probeer opnieuw.",
        variant: "destructive",
      });
      return;
    }

    if (!acceptedGuidelines) {
      toast({
        title: "Richtlijnen niet geaccepteerd",
        description: "Je moet akkoord gaan met de communityrichtlijnen.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // TODO: Implement actual registration with Supabase
    setTimeout(() => {
      toast({
        title: "Registratie functionaliteit",
        description: "De backend wordt binnenkort gekoppeld.",
      });
      setIsLoading(false);
    }, 1000);
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
                      minLength={8}
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
