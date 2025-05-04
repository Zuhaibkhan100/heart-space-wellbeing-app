
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { HabitTracker } from "@/components/dashboard/HabitTracker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const HabitsPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-heading font-bold">Habit Tracker</h1>
            <p className="text-muted-foreground">Build consistency with daily actions</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <HabitTracker />
            </div>
            
            <div>
              <Card className="shadow-md card-glow">
                <CardHeader>
                  <CardTitle className="text-xl">Habit Insights</CardTitle>
                  <CardDescription>Your consistency patterns</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-48 flex items-center justify-center border rounded-md bg-muted/30">
                    <p className="text-muted-foreground">Habit completion chart coming soon</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">Current Streak</h3>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 rounded-lg bg-lavender/10">
                        <p className="text-lg font-semibold">4</p>
                        <p className="text-xs text-muted-foreground">Meditate</p>
                      </div>
                      <div className="p-3 rounded-lg bg-blush/10">
                        <p className="text-lg font-semibold">2</p>
                        <p className="text-xs text-muted-foreground">Exercise</p>
                      </div>
                      <div className="p-3 rounded-lg bg-mint/10">
                        <p className="text-lg font-semibold">7</p>
                        <p className="text-xs text-muted-foreground">Journal</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default HabitsPage;
