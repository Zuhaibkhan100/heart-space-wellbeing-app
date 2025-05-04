
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Check, Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const AuthForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [email, setEmail] = useState("");
  const [showEmailSent, setShowEmailSent] = useState(false);
  const { toast } = useToast();

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Simple password strength calculator
    let strength = 0;
    if (value.length > 0) strength += 20;
    if (value.length > 7) strength += 20;
    if (/[A-Z]/.test(value)) strength += 20;
    if (/[0-9]/.test(value)) strength += 20;
    if (/[^A-Za-z0-9]/.test(value)) strength += 20;
    
    setPasswordStrength(strength);
  };
  
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setShowEmailSent(true);
      toast({
        title: "Check your inbox",
        description: "We've sent a login link to your email address.",
      });
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Success!",
        description: "Welcome to Lovable.",
      });
    }, 1000);
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-xl animate-fade-in bg-white/80 backdrop-blur-sm border-white/50">
      <Tabs defaultValue="login">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-heading gradient-text">Welcome</CardTitle>
            <TabsList className="grid grid-cols-2 h-9">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign up</TabsTrigger>
            </TabsList>
          </div>
          <CardDescription>
            Your journey to mindfulness starts here
          </CardDescription>
        </CardHeader>
        
        <CardContent>
          <TabsContent value="login" className="mt-0 space-y-4">
            <form onSubmit={handleEmailSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="hello@example.com" 
                    className="input-focus-glow" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required 
                  />
                </div>
                
                <Button 
                  className="w-full" 
                  type="submit" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="flex items-center gap-2">
                      <span className="h-4 w-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
                      Sending link...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Send me a login link
                    </span>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {["Google", "Apple", "Facebook"].map((provider) => (
                <Button key={provider} variant="outline" className="bg-white/50 hover:bg-white">
                  {provider}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="signup" className="mt-0">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input id="signup-name" placeholder="John Doe" className="input-focus-glow" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input id="signup-email" type="email" placeholder="hello@example.com" className="input-focus-glow" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <div className="relative">
                    <Input 
                      id="signup-password" 
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••" 
                      className="input-focus-glow"
                      minLength={8}
                      onChange={handlePasswordChange}
                      required 
                    />
                    <button 
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                  <div className="mt-1">
                    <Progress value={passwordStrength} className="h-1" />
                  </div>
                  <span className="text-xs text-muted-foreground">
                    Password strength: {passwordStrength < 40 ? "Weak" : passwordStrength < 80 ? "Good" : "Strong"}
                  </span>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" className="input-focus-glow" required />
                </div>
              </div>
              <Button className="w-full mt-6" type="submit" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-4">
                By signing up, you agree to our <a href="#" className="text-primary hover:underline">Terms</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>.
              </p>
            </form>
          </TabsContent>
        </CardContent>
      </Tabs>
      
      <Dialog open={showEmailSent} onOpenChange={setShowEmailSent}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-center">Check your email</DialogTitle>
            <DialogDescription className="text-center">
              We've sent a login link to <strong>{email}</strong>
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center py-6 space-y-3">
            <div className="bg-primary/10 rounded-full p-3">
              <Check className="h-8 w-8 text-primary" />
            </div>
            <p className="text-sm text-center">
              Click the link in your email to sign in. If you don't see it, check your spam folder.
            </p>
          </div>
          <Button className="w-full" onClick={() => setShowEmailSent(false)}>
            Back to login
          </Button>
        </DialogContent>
      </Dialog>
    </Card>
  );
};
