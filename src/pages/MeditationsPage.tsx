
import { useState, useEffect, useRef } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Timer, Play, Pause, SkipBack, Volume2 } from "lucide-react";

// Meditation session data
const meditationSessions = [
  { 
    id: "morning-calm", 
    title: "Morning Calm", 
    description: "Start your day with a peaceful meditation", 
    duration: 5,
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500"
  },
  { 
    id: "stress-relief", 
    title: "Stress Relief", 
    description: "Release tension and find your center", 
    duration: 10,
    image: "https://images.unsplash.com/photo-1474418397713-003ec9d0479e?w=500" 
  },
  { 
    id: "evening-unwind", 
    title: "Evening Unwind", 
    description: "Prepare for restful sleep", 
    duration: 8,
    image: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=500" 
  },
  { 
    id: "quick-reset", 
    title: "Quick Reset", 
    description: "A brief meditation for busy moments", 
    duration: 3,
    image: "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=500"
  },
];

// Breathing exercise types
const breathingExercises = [
  { 
    id: "box-breathing",
    name: "Box Breathing", 
    description: "Inhale for 4, hold for 4, exhale for 4, hold for 4",
    inhale: 4,
    inHold: 4, 
    exhale: 4, 
    exHold: 4 
  },
  { 
    id: "4-7-8",
    name: "4-7-8 Technique", 
    description: "Inhale for 4, hold for 7, exhale for 8",
    inhale: 4, 
    inHold: 7, 
    exhale: 8, 
    exHold: 0 
  },
  { 
    id: "deep-calm",
    name: "Deep Calm", 
    description: "Inhale for 5, hold for 2, exhale for 7",
    inhale: 5, 
    inHold: 2, 
    exhale: 7, 
    exHold: 0 
  },
];

const MeditationsPage = () => {
  const [selectedMeditation, setSelectedMeditation] = useState<string | null>(null);
  const [selectedBreathing, setSelectedBreathing] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [volume, setVolume] = useState([70]);
  const [breathingPhase, setBreathingPhase] = useState("ready");
  const [breathingCount, setBreathingCount] = useState(0);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const breathingTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Start/stop meditation timer
  useEffect(() => {
    if (isPlaying && timeRemaining > 0) {
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            setIsPlaying(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isPlaying && timerRef.current) {
      clearInterval(timerRef.current);
    }
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, timeRemaining]);
  
  // Handle selecting a meditation
  const handleSelectMeditation = (id: string) => {
    const meditation = meditationSessions.find(m => m.id === id);
    if (meditation) {
      setSelectedMeditation(id);
      setTimeRemaining(meditation.duration * 60);
      setIsPlaying(false);
    }
  };
  
  // Handle breathing exercise
  const startBreathingExercise = (id: string) => {
    const exercise = breathingExercises.find(b => b.id === id);
    if (!exercise) return;
    
    setSelectedBreathing(id);
    setBreathingPhase("ready");
    
    if (breathingTimerRef.current) {
      clearTimeout(breathingTimerRef.current);
    }
    
    // Start the breathing cycle
    let totalTime = 0;
    breathingTimerRef.current = setTimeout(() => {
      setBreathingPhase("inhale");
      setBreathingCount(exercise.inhale);
      
      // Inhale phase
      let breathingInterval = setInterval(() => {
        setBreathingCount(prev => {
          if (prev <= 1) {
            clearInterval(breathingInterval);
            
            // In-hold phase if applicable
            if (exercise.inHold > 0) {
              setBreathingPhase("hold");
              setBreathingCount(exercise.inHold);
              
              breathingInterval = setInterval(() => {
                setBreathingCount(prev => {
                  if (prev <= 1) {
                    clearInterval(breathingInterval);
                    
                    // Exhale phase
                    setBreathingPhase("exhale");
                    setBreathingCount(exercise.exhale);
                    
                    breathingInterval = setInterval(() => {
                      setBreathingCount(prev => {
                        if (prev <= 1) {
                          clearInterval(breathingInterval);
                          
                          // Ex-hold phase if applicable
                          if (exercise.exHold > 0) {
                            setBreathingPhase("ex-hold");
                            setBreathingCount(exercise.exHold);
                            
                            breathingInterval = setInterval(() => {
                              setBreathingCount(prev => {
                                if (prev <= 1) {
                                  clearInterval(breathingInterval);
                                  // Repeat cycle
                                  startBreathingExercise(id);
                                  return exercise.exHold;
                                }
                                return prev - 1;
                              });
                            }, 1000);
                          } else {
                            // No ex-hold, repeat cycle
                            startBreathingExercise(id);
                          }
                          return exercise.exhale;
                        }
                        return prev - 1;
                      });
                    }, 1000);
                    
                    return exercise.inHold;
                  }
                  return prev - 1;
                });
              }, 1000);
            } else {
              // No in-hold, go directly to exhale
              setBreathingPhase("exhale");
              setBreathingCount(exercise.exhale);
              
              breathingInterval = setInterval(() => {
                setBreathingCount(prev => {
                  if (prev <= 1) {
                    clearInterval(breathingInterval);
                    
                    // Ex-hold phase if applicable
                    if (exercise.exHold > 0) {
                      setBreathingPhase("ex-hold");
                      setBreathingCount(exercise.exHold);
                      
                      breathingInterval = setInterval(() => {
                        setBreathingCount(prev => {
                          if (prev <= 1) {
                            clearInterval(breathingInterval);
                            // Repeat cycle
                            startBreathingExercise(id);
                            return exercise.exHold;
                          }
                          return prev - 1;
                        });
                      }, 1000);
                    } else {
                      // No ex-hold, repeat cycle
                      startBreathingExercise(id);
                    }
                    return exercise.exhale;
                  }
                  return prev - 1;
                });
              }, 1000);
            }
            
            return exercise.inhale;
          }
          return prev - 1;
        });
      }, 1000);
      
    }, 2000); // Short delay before starting
  };
  
  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  // Breathing animation size
  const getBreathingSize = () => {
    switch (breathingPhase) {
      case "inhale": return "scale-110";
      case "hold": case "ex-hold": return "scale-100";
      case "exhale": return "scale-90";
      default: return "scale-100";
    }
  };
  
  // Breathing instruction text
  const getBreathingText = () => {
    switch (breathingPhase) {
      case "ready": return "Get ready...";
      case "inhale": return "Inhale...";
      case "hold": return "Hold...";
      case "exhale": return "Exhale...";
      case "ex-hold": return "Hold...";
      default: return "";
    }
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-heading font-bold">Meditation & Breathing</h1>
            <p className="text-muted-foreground">
              Take a moment for mindfulness
            </p>
          </div>
          
          <Tabs defaultValue="meditations" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="meditations">Guided Meditations</TabsTrigger>
              <TabsTrigger value="breathing">Breathing Exercises</TabsTrigger>
            </TabsList>
            
            {/* Meditations Tab */}
            <TabsContent value="meditations" className="space-y-6">
              {selectedMeditation ? (
                <div className="max-w-3xl mx-auto">
                  <Card className="shadow-lg overflow-hidden">
                    <div className="h-48 md:h-64 bg-cover bg-center" style={{
                      backgroundImage: `url(${meditationSessions.find(m => m.id === selectedMeditation)?.image})`
                    }} />
                    <CardHeader>
                      <CardTitle>{meditationSessions.find(m => m.id === selectedMeditation)?.title}</CardTitle>
                      <CardDescription>
                        {meditationSessions.find(m => m.id === selectedMeditation)?.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-col items-center justify-center">
                        <div className="text-4xl font-mono my-4">
                          {formatTime(timeRemaining)}
                        </div>
                        
                        <div className="flex gap-4 my-4">
                          <Button 
                            size="icon" 
                            variant="outline"
                            onClick={() => {
                              const meditation = meditationSessions.find(m => m.id === selectedMeditation);
                              if (meditation) {
                                setTimeRemaining(meditation.duration * 60);
                                setIsPlaying(false);
                              }
                            }}
                          >
                            <SkipBack className="h-5 w-5" />
                          </Button>
                          <Button 
                            size="icon" 
                            onClick={() => setIsPlaying(!isPlaying)}
                            variant={isPlaying ? "destructive" : "default"}
                          >
                            {isPlaying ? (
                              <Pause className="h-5 w-5" />
                            ) : (
                              <Play className="h-5 w-5" />
                            )}
                          </Button>
                        </div>
                        
                        <div className="flex items-center gap-4 w-full max-w-xs mt-6">
                          <Volume2 className="h-5 w-5 text-muted-foreground" />
                          <Slider
                            value={volume}
                            max={100}
                            onValueChange={setVolume}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => setSelectedMeditation(null)}
                        className="w-full"
                      >
                        Back to Meditation List
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {meditationSessions.map((meditation) => (
                    <Card 
                      key={meditation.id}
                      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleSelectMeditation(meditation.id)}
                    >
                      <div 
                        className="h-40 bg-cover bg-center" 
                        style={{ backgroundImage: `url(${meditation.image})` }}
                      />
                      <CardContent className="p-4">
                        <h3 className="text-lg font-medium mb-1">{meditation.title}</h3>
                        <div className="flex justify-between text-sm">
                          <p className="text-muted-foreground">{meditation.description}</p>
                          <p className="text-primary">{meditation.duration} min</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
            
            {/* Breathing Tab */}
            <TabsContent value="breathing" className="space-y-6">
              {selectedBreathing ? (
                <div className="max-w-xl mx-auto">
                  <Card className="shadow-lg">
                    <CardHeader className="text-center">
                      <CardTitle>
                        {breathingExercises.find(b => b.id === selectedBreathing)?.name}
                      </CardTitle>
                      <CardDescription>
                        {breathingExercises.find(b => b.id === selectedBreathing)?.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center p-8">
                      <div 
                        className={`h-48 w-48 rounded-full bg-primary/20 flex items-center justify-center transition-transform duration-1000 ${getBreathingSize()}`}
                      >
                        <div className="h-36 w-36 rounded-full bg-primary/30 flex items-center justify-center">
                          <div className="h-24 w-24 rounded-full bg-primary/40 flex items-center justify-center">
                            <div className="text-2xl font-medium">
                              {breathingCount}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-8 text-xl font-medium">
                        {getBreathingText()}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSelectedBreathing(null);
                          if (breathingTimerRef.current) {
                            clearTimeout(breathingTimerRef.current);
                          }
                        }}
                        className="w-full"
                      >
                        Back to Breathing Exercises
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {breathingExercises.map((exercise) => (
                    <Card 
                      key={exercise.id}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => startBreathingExercise(exercise.id)}
                    >
                      <CardHeader>
                        <CardTitle>{exercise.name}</CardTitle>
                        <CardDescription>{exercise.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm">
                          <div className="px-3 py-1.5 bg-primary/10 rounded-md">
                            <span className="font-medium">Inhale:</span> {exercise.inhale}s
                          </div>
                          {exercise.inHold > 0 && (
                            <div className="px-3 py-1.5 bg-secondary/10 rounded-md">
                              <span className="font-medium">Hold:</span> {exercise.inHold}s
                            </div>
                          )}
                          <div className="px-3 py-1.5 bg-primary/10 rounded-md">
                            <span className="font-medium">Exhale:</span> {exercise.exhale}s
                          </div>
                          {exercise.exHold > 0 && (
                            <div className="px-3 py-1.5 bg-secondary/10 rounded-md">
                              <span className="font-medium">Hold:</span> {exercise.exHold}s
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          Start Exercise
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MeditationsPage;
