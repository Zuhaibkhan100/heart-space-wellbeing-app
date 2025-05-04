
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { DailyAffirmation } from "@/components/dashboard/DailyAffirmation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

const AffirmationsPage = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-heading font-bold">Affirmations</h1>
            <p className="text-muted-foreground">Nurture your mind with positive thoughts</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <DailyAffirmation />
            </div>
            
            <div>
              <Card className="shadow-md card-glow">
                <CardHeader>
                  <CardTitle className="text-xl">Favorite Affirmations</CardTitle>
                  <CardDescription>Your personal collection</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {["My potential to succeed is infinite.", "I am resilient, strong, and brave."].map((affirmation, index) => (
                      <div key={index} className="p-3 border rounded-lg flex justify-between items-center">
                        <p className="text-sm italic">"{affirmation}"</p>
                        <Button variant="ghost" size="icon" className="text-red-500">
                          <Heart className="h-4 w-4 fill-current" />
                        </Button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="pt-2">
                    <p className="text-sm text-muted-foreground">
                      Favorite affirmations by clicking the heart icon.
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

export default AffirmationsPage;
