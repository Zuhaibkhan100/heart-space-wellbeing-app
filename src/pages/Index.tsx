
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AuthForm } from "@/components/auth/AuthForm";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { MoodTracker } from "@/components/dashboard/MoodTracker";
import { HabitTracker } from "@/components/dashboard/HabitTracker";
import { DailyAffirmation } from "@/components/dashboard/DailyAffirmation";
import { SidebarProvider } from "@/components/ui/sidebar";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // For demo purposes, we'll include a way to toggle between logged in and out
  const handleAuthToggle = () => {
    setIsAuthenticated(!isAuthenticated);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-lavender-blush flex flex-col items-center justify-center p-4">
        <div className="text-center mb-8 animate-slide-up">
          <div className="flex justify-center mb-2">
            <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center shadow-md">
              <svg className="h-6 w-6 text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
          </div>
          <h1 className="text-3xl font-heading font-bold gradient-text mb-2">Welcome to Lovable</h1>
          <p className="text-muted-foreground">Your journey to mindfulness starts here.</p>
        </div>
        
        <AuthForm />
        
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
