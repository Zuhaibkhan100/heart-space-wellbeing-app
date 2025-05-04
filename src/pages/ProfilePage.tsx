
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Settings, Bell, Shield, Database } from "lucide-react";

const ProfilePage = () => {
  const [avatarUrl, setAvatarUrl] = useState("/placeholder.svg");
  const [name, setName] = useState("Sarah Johnson");
  const [email, setEmail] = useState("sarah@example.com");
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-heading font-bold">Profile</h1>
            <p className="text-muted-foreground">Manage your account and preferences</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <Card className="shadow-md">
                <CardContent className="pt-6 flex flex-col items-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={avatarUrl} alt="Profile" />
                    <AvatarFallback>SJ</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-medium">{name}</h2>
                  <p className="text-muted-foreground">{email}</p>
                  
                  <div className="w-full mt-6 space-y-2">
                    <Button variant="outline" className="w-full flex justify-start">
                      <User className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full flex justify-start">
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                    <Button variant="outline" className="w-full flex justify-start">
                      <Shield className="mr-2 h-4 w-4" />
                      Privacy
                    </Button>
                    <Button variant="outline" className="w-full flex justify-start">
                      <Database className="mr-2 h-4 w-4" />
                      Data & Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Tabs defaultValue="profile">
                <TabsList className="grid grid-cols-3 mb-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="preferences">Preferences</TabsTrigger>
                  <TabsTrigger value="privacy">Privacy</TabsTrigger>
                </TabsList>
                
                <TabsContent value="profile" className="space-y-4">
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-xl">Personal Information</CardTitle>
                      <CardDescription>Update your personal details</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" value={name} onChange={e => setName(e.target.value)} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" value={email} onChange={e => setEmail(e.target.value)} />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="dob">Date of Birth</Label>
                        <Input id="dob" type="date" defaultValue="1995-07-15" />
                      </div>
                      
                      <div className="pt-2">
                        <Button>Save Changes</Button>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-xl">Account Security</CardTitle>
                      <CardDescription>Manage your password and security options</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input id="current-password" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input id="new-password" type="password" />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input id="confirm-password" type="password" />
                      </div>
                      
                      <div className="pt-2">
                        <Button>Update Password</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="preferences" className="space-y-4">
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-xl">Theme & Display</CardTitle>
                      <CardDescription>Customize your app experience</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="theme-mode">Dark Mode</Label>
                          <p className="text-sm text-muted-foreground">
                            Toggle between light and dark theme
                          </p>
                        </div>
                        <Switch id="theme-mode" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="animations">Animations</Label>
                          <p className="text-sm text-muted-foreground">
                            Enable or disable UI animations
                          </p>
                        </div>
                        <Switch id="animations" defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-xl">Notifications</CardTitle>
                      <CardDescription>Manage your notification preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="mood-reminder">Mood Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive reminders to log your daily mood
                          </p>
                        </div>
                        <Switch id="mood-reminder" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="habit-notifications">Habit Reminders</Label>
                          <p className="text-sm text-muted-foreground">
                            Get notified about your daily habits
                          </p>
                        </div>
                        <Switch id="habit-notifications" defaultChecked />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="privacy" className="space-y-4">
                  <Card className="shadow-md">
                    <CardHeader>
                      <CardTitle className="text-xl">Privacy Settings</CardTitle>
                      <CardDescription>Control your data and privacy options</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="data-collection">Data Collection</Label>
                          <p className="text-sm text-muted-foreground">
                            Allow anonymous usage data to improve the app
                          </p>
                        </div>
                        <Switch id="data-collection" defaultChecked />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="personalized-content">Personalized Content</Label>
                          <p className="text-sm text-muted-foreground">
                            Receive content tailored to your mood patterns
                          </p>
                        </div>
                        <Switch id="personalized-content" defaultChecked />
                      </div>
                      
                      <div className="pt-4">
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ProfilePage;
