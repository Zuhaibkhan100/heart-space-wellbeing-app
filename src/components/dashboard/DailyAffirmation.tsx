
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, RefreshCw } from "lucide-react";

const affirmations = [
  "I am enough, exactly as I am.",
  "I embrace the journey of growth and healing.",
  "I deserve peace, joy, and all good things.",
  "My potential to succeed is infinite.",
  "I am in charge of how I feel and today I choose happiness.",
  "I release all worry and trust the process of life.",
  "I am resilient, strong, and brave.",
  "My body is healthy; my mind is brilliant; my soul is tranquil."
];

export const DailyAffirmation = () => {
  const [currentAffirmation, setCurrentAffirmation] = useState(() => {
    // Get random affirmation on initial load
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    return affirmations[randomIndex];
  });
  
  const [isFavorited, setIsFavorited] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  const refreshAffirmation = () => {
    setIsRefreshing(true);
    
    // Filter out current affirmation to avoid repeats
    const filteredAffirmations = affirmations.filter(a => a !== currentAffirmation);
    const randomIndex = Math.floor(Math.random() * filteredAffirmations.length);
    
    setTimeout(() => {
      setCurrentAffirmation(filteredAffirmations[randomIndex]);
      setIsFavorited(false);
      setIsRefreshing(false);
    }, 500);
  };

  return (
    <Card className="shadow-md card-glow">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Daily Affirmation</CardTitle>
        <CardDescription>Nurture your mind with positive thoughts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="bg-mint-sky p-6 rounded-lg mb-4 min-h-[120px] flex items-center justify-center text-center">
          <p className="text-lg font-medium italic">"{currentAffirmation}"</p>
        </div>
        
        <div className="flex justify-between">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFavorited(!isFavorited)}
            className={isFavorited ? "text-red-500" : ""}
          >
            <Heart className="h-5 w-5" />
          </Button>
          
          <Button
            variant="outline"
            onClick={refreshAffirmation}
            disabled={isRefreshing}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
            <span>New Affirmation</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
