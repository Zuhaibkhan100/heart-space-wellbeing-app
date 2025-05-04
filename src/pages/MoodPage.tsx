
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { MoodTracker } from "@/components/dashboard/MoodTracker";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const MoodPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-heading font-bold">Mood Diary</h1>
            <p className="text-muted-foreground">Track and understand your emotional patterns</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <MoodTracker />
            </div>
            
            <div>
              <Card className="shadow-md card-glow">
                <CardHeader>
                  <CardTitle className="text-xl">Mood History</CardTitle>
                  <CardDescription>Your recent emotional journey</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="h-48 flex items-center justify-center border rounded-md bg-muted/30">
                    <p className="text-muted-foreground">Mood trends visualization coming soon</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="font-medium">This Week's Overview</h3>
                    <p className="text-sm text-muted-foreground">
                      Track your daily moods to see patterns emerge here.
                    </p>
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

export default MoodPage;
