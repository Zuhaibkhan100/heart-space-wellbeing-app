import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthForm } from "@/components/auth/AuthForm";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { MoodTracker } from "@/components/dashboard/MoodTracker";
import { HabitTracker } from "@/components/dashboard/HabitTracker";
import { DailyAffirmation } from "@/components/dashboard/DailyAffirmation";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Link, useNavigate } from "react-router-dom";
import { Logo } from "@/components/layout/Logo";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // For demo purposes, we'll include a way to toggle between logged in and out
  const handleAuthToggle = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-lavender-blush flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8 animate-slide-up">
          <Logo className="mx-auto mb-4" />
          <h1 className="text-3xl font-heading font-bold gradient-text mb-2">Welcome to Lovable</h1>
          <p className="text-muted-foreground">Your journey to mindfulness starts here.</p>
        </div>
        
        <div className="w-full max-w-md">
          <div className="flex flex-col space-y-4">
            <Button 
              size="lg" 
              className="w-full"
              onClick={() => navigate('/auth')}
            >
              Sign in with Email
            </Button>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-lavender-blush px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              {["Google", "Apple", "Facebook"].map((provider) => (
                <Button key={provider} variant="outline" className="bg-white/50 hover:bg-white">
                  {provider}
                </Button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Demo toggle button */}
        <div className="mt-8">
          <Button variant="ghost" onClick={handleAuthToggle}>
            Demo: Skip to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-heading font-bold">Welcome back, Sarah</h1>
            <p className="text-muted-foreground">
              {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <MoodTracker />
            </div>
            
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <DailyAffirmation />
            </div>
            
            <div className="lg:col-span-3 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <HabitTracker />
            </div>
          </div>
          
          {/* Demo toggle button */}
          <div className="mt-8">
            <Button variant="outline" onClick={handleAuthToggle}>
              Demo: Return to Login
            </Button>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Index;
