
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const moods = [
  { emoji: "😢", label: "Sad", color: "bg-blue-100 dark:bg-blue-900" },
  { emoji: "😟", label: "Anxious", color: "bg-purple-100 dark:bg-purple-900" },
  { emoji: "😐", label: "Neutral", color: "bg-gray-100 dark:bg-gray-800" },
  { emoji: "😊", label: "Happy", color: "bg-yellow-100 dark:bg-yellow-900" },
  { emoji: "😄", label: "Excited", color: "bg-orange-100 dark:bg-orange-900" },
];

export const MoodTracker = () => {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [journalEntry, setJournalEntry] = useState("");
  
  const handleSubmit = () => {
    if (selectedMood === null) return;
    
    console.log("Mood submitted:", {
      mood: moods[selectedMood].label,
      journal: journalEntry,
      date: new Date()
    });
    
    // Clear form or show confirmation
    setTimeout(() => {
      setJournalEntry("");
    }, 500);
  };

  return (
    <Card className="shadow-md card-glow">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">How are you feeling today?</CardTitle>
        <CardDescription>Track your mood to build self-awareness</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-6">
          {moods.map((mood, index) => (
            <button
              key={mood.label}
              onClick={() => setSelectedMood(index)}
              className={cn(
                "mood-emoji flex flex-col items-center p-3 rounded-lg w-16",
                selectedMood === index && mood.color
              )}
            >
              <span className="text-2xl mb-1">{mood.emoji}</span>
              <span className="text-xs">{mood.label}</span>
            </button>
          ))}
        </div>
        
        <div className="space-y-4">
          <div>
            <label htmlFor="journal" className="block text-sm font-medium mb-1">
              Journal Entry (optional)
            </label>
            <textarea
              id="journal"
              value={journalEntry}
              onChange={(e) => setJournalEntry(e.target.value)}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[100px] focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Write about your day..."
            />
          </div>
          
          <button
            onClick={handleSubmit}
            disabled={selectedMood === null}
            className={cn(
              "w-full py-2 rounded-md transition-all",
              selectedMood !== null
                ? "bg-primary text-white hover:bg-primary/90"
                : "bg-muted text-muted-foreground cursor-not-allowed"
            )}
          >
            Save Mood
          </button>
        </div>
      </CardContent>
    </Card>
  );
};
