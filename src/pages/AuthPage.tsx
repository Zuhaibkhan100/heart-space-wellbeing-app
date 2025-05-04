
import { useState } from "react";
import { AuthForm } from "@/components/auth/AuthForm";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/Logo";
import { MobileTourCard } from "@/components/onboarding/MobileTourCard";

const AuthPage = () => {
  const [showTour, setShowTour] = useState(false);
  
  return (
    <div className="min-h-screen bg-lavender-blush flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="text-center lg:text-left animate-slide-up lg:pl-8">
          <Logo className="mx-auto lg:mx-0 mb-6" />
          <h1 className="text-4xl font-heading font-bold gradient-text mb-3 tracking-tight">Your mindfulness journey begins here</h1>
          <p className="text-lg text-muted-foreground max-w-md mx-auto lg:mx-0">
            Track your mood, build healthy habits, and nurture your mind with daily affirmations.
          </p>
          
          <div className="mt-8 hidden lg:block">
            <Button 
              variant="outline"
              className="gap-2"
              onClick={() => setShowTour(!showTour)}
            >
              {showTour ? "Hide Tour" : "Take a Quick Tour"}
            </Button>
          </div>
          
          {showTour && (
            <div className="mt-6 hidden lg:block">
              <MobileTourCard />
            </div>
          )}
        </div>
        
        <div>
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
