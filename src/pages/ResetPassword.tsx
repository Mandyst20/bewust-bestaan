import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a valid session from the reset link
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Ongeldige of verlopen link",
          description: "Vraag een nieuwe wachtwoord reset link aan.",
          variant: "destructive",
        });
        navigate("/forgot-password");
      }
    };
    checkSession();
  }, [navigate, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    if (password.length < 6) {
      setErrors({ password: "Wachtwoord moet minimaal 6 tekens bevatten" });
      return;
    }

    if (password !== confirmPassword) {
      setErrors({ confirmPassword: "Wachtwoorden komen niet overeen" });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.updateUser({
      password: password,
    });

    if (error) {
      toast({
        title: "Er is iets misgegaan",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setIsSuccess(true);
      // Sign out to clear the recovery session
      await supabase.auth.signOut();
    }

    setIsLoading(false);
  };

  return (
    <Layout showNav={false} showFooter={false}>
      <div className="flex min-h-screen">
        {/* Left side - Form */}
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
              {isSuccess ? (
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h1 className="font-display text-3xl font-bold text-foreground">
                    Wachtwoord gewijzigd!
                  </h1>
                  <p className="mt-4 text-muted-foreground">
                    Je wachtwoord is succesvol gewijzigd. Je kunt nu inloggen met
                    je nieuwe wachtwoord.
                  </p>
                  <Link to="/login">
                    <Button className="mt-8">Naar inloggen</Button>
                  </Link>
                </div>
              ) : (
                <>
                  <h1 className="font-display text-3xl font-bold text-foreground">
                    Nieuw wachtwoord instellen
                  </h1>
                  <p className="mt-2 text-muted-foreground">
                    Kies een sterk wachtwoord voor je account.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="password">Nieuw wachtwoord</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="••••••••"
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
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.password && (
                        <p className="text-sm text-destructive">
                          {errors.password}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">
                        Bevestig wachtwoord
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          id="confirmPassword"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="••••••••"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="pl-10 pr-10"
                          required
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      {errors.confirmPassword && (
                        <p className="text-sm text-destructive">
                          {errors.confirmPassword}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Even geduld..." : "Wachtwoord wijzigen"}
                    </Button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right side - Visual */}
        <div className="hidden bg-gradient-hero lg:flex lg:flex-1 lg:flex-col lg:items-center lg:justify-center lg:p-12">
          <div className="max-w-md text-center">
            <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 animate-float">
              <Heart className="h-10 w-10 text-primary" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground">
              Bijna klaar!
            </h2>
            <p className="mt-4 text-muted-foreground">
              Nog even een nieuw wachtwoord instellen en je bent weer helemaal
              klaar.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ResetPassword;
