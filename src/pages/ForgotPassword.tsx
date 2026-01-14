import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Heart, Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "E-mailadres vereist",
        description: "Vul je e-mailadres in om je wachtwoord te resetten.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      toast({
        title: "Er is iets misgegaan",
        description: error.message,
        variant: "destructive",
      });
    } else {
      setIsSubmitted(true);
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
              {isSubmitted ? (
                <div className="text-center">
                  <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h1 className="font-display text-3xl font-bold text-foreground">
                    Check je e-mail
                  </h1>
                  <p className="mt-4 text-muted-foreground">
                    We hebben een e-mail gestuurd naar <strong>{email}</strong> met
                    een link om je wachtwoord te resetten.
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Geen e-mail ontvangen? Check je spam folder.
                  </p>
                  <Link to="/login">
                    <Button variant="outline" className="mt-8">
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Terug naar inloggen
                    </Button>
                  </Link>
                </div>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Terug naar inloggen
                  </Link>

                  <h1 className="font-display text-3xl font-bold text-foreground">
                    Wachtwoord vergeten?
                  </h1>
                  <p className="mt-2 text-muted-foreground">
                    Geen probleem! Vul je e-mailadres in en we sturen je een link
                    om je wachtwoord te resetten.
                  </p>

                  <form onSubmit={handleSubmit} className="mt-8 space-y-5">
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

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isLoading}
                    >
                      {isLoading ? "Even geduld..." : "Reset link versturen"}
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
              Geen zorgen
            </h2>
            <p className="mt-4 text-muted-foreground">
              Iedereen vergeet wel eens een wachtwoord. We helpen je snel weer
              op weg.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
