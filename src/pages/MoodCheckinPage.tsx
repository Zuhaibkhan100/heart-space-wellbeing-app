
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";

// Mood emoji and descriptions
const moodOptions = [
  { emoji: "😔", label: "Sad", value: 2 },
  { emoji: "😕", label: "Down", value: 4 },
  { emoji: "😐", label: "Okay", value: 6 },
  { emoji: "🙂", label: "Good", value: 8 },
  { emoji: "😄", label: "Great", value: 10 },
];

// Activity tags for mood tracking
const activityTags = [
  "Exercise", "Work", "Family", "Friends", "Sleep", 
  "Meditation", "Reading", "Travel", "Outdoors", "Food",
  "Creative", "Learning", "Self-care", "Resting"
];

const MoodCheckinPage = () => {
  const navigate = useNavigate();
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodLevel, setMoodLevel] = useState([6]);
  const [notes, setNotes] = useState("");
  const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
  
  // Handle activity tag selection
  const toggleActivity = (activity: string) => {
    if (selectedActivities.includes(activity)) {
      setSelectedActivities(prev => prev.filter(a => a !== activity));
    } else {
      setSelectedActivities(prev => [...prev, activity]);
    }
  };
  
  // Handle mood submission
  const handleSubmit = () => {
    // Here you would normally save this data to your backend
    console.log({
      mood: moodLevel[0],
      moodEmoji: moodOptions.find(m => m.value === selectedMood)?.emoji || "😐",
      notes,
      activities: selectedActivities,
      date: new Date()
    });
    
    // Show success UI
    navigate("/mood/analytics");
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-heading font-bold">Daily Check-In</h1>
            <p className="text-muted-foreground">
              How are you feeling today?
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <Card className="shadow-lg border-2 animate-fade-in">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">Track Your Mood</CardTitle>
                <CardDescription>
                  Select an emoji that best describes how you're feeling right now
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Mood Emoji Selection */}
                <div className="flex justify-between items-center mb-8">
                  {moodOptions.map((mood, index) => (
                    <div 
                      key={index}
                      onClick={() => {
                        setSelectedMood(mood.value);
                        setMoodLevel([mood.value]);
                      }}
                      className={`flex flex-col items-center cursor-pointer transition-all duration-200 p-3 rounded-full ${
                        selectedMood === mood.value 
                          ? "bg-primary/20 scale-110" 
                          : "hover:bg-muted"
                      }`}
                    >
                      <span className="text-4xl mb-2">{mood.emoji}</span>
                      <span className="text-sm font-medium">{mood.label}</span>
                    </div>
                  ))}
                </div>
                
                {/* Mood Slider */}
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2 text-center">
                    Fine-tune your mood level (1-10)
                  </label>
                  <Slider
                    value={moodLevel}
                    max={10}
                    min={1}
                    step={1}
                    onValueChange={setMoodLevel}
                    className="w-full"
                  />
                  <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                    <span>Not good</span>
                    <span>Neutral</span>
                    <span>Amazing</span>
                  </div>
                </div>
                
                {/* Activity Tags */}
                <div className="mb-8">
                  <label className="block text-sm font-medium mb-2">
                    What activities have you done today? (optional)
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {activityTags.map(activity => (
                      <button
                        key={activity}
                        onClick={() => toggleActivity(activity)}
                        className={`px-3 py-1 text-sm rounded-full transition-colors ${
                          selectedActivities.includes(activity)
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted hover:bg-muted/80"
                        }`}
                      >
                        {activity}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Add some notes about your day (optional)
                  </label>
                  <Textarea
                    placeholder="What's on your mind today?"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={() => navigate("/mood")}>
                  Cancel
                </Button>
                <Button onClick={handleSubmit}>
                  Save Entry
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MoodCheckinPage;
