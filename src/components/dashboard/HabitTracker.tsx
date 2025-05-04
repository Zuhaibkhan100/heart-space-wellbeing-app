
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Habit = {
  id: string;
  name: string;
  completed: boolean;
  streak: number;
};

export const HabitTracker = () => {
  const [habits, setHabits] = useState<Habit[]>([
    { id: "1", name: "Meditate", completed: false, streak: 4 },
    { id: "2", name: "Exercise", completed: false, streak: 2 },
    { id: "3", name: "Journal", completed: true, streak: 7 },
  ]);
  
  const [newHabitName, setNewHabitName] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  
  const toggleHabit = (id: string) => {
    setHabits(habits.map(habit => 
      habit.id === id 
        ? { ...habit, completed: !habit.completed } 
        : habit
    ));
  };
  
  const addHabit = () => {
    if (newHabitName.trim() === "") return;
    
    const newHabit: Habit = {
      id: Date.now().toString(),
      name: newHabitName,
      completed: false,
      streak: 0,
    };
    
    setHabits([...habits, newHabit]);
    setNewHabitName("");
    setIsAdding(false);
  };

  return (
    <Card className="shadow-md card-glow">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl">Daily Habits</CardTitle>
        <CardDescription>Build consistency with daily actions</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-3">
          {habits.map((habit) => (
            <li 
              key={habit.id}
              className="flex items-center justify-between p-3 rounded-lg border"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={cn(
                    "h-6 w-6 rounded-full flex items-center justify-center border transition-colors",
                    habit.completed 
                      ? "bg-primary border-primary text-white" 
                      : "border-muted-foreground hover:border-primary"
                  )}
                >
                  {habit.completed && <Check className="h-4 w-4" />}
                </button>
                <span className={cn(
                  habit.completed && "line-through text-muted-foreground"
                )}>
                  {habit.name}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-muted">
                  {habit.streak} day{habit.streak !== 1 ? "s" : ""}
                </span>
              </div>
            </li>
          ))}
        </ul>
        
        {isAdding ? (
          <div className="mt-4 flex items-center gap-2">
            <input
              type="text"
              value={newHabitName}
              onChange={(e) => setNewHabitName(e.target.value)}
              className="flex-1 rounded-md border border-input px-3 py-2 text-sm"
              placeholder="New habit name..."
              autoFocus
            />
            <button
              onClick={addHabit}
              className="px-3 py-2 rounded-md bg-primary text-white hover:bg-primary/90"
            >
              Add
            </button>
            <button
              onClick={() => setIsAdding(false)}
              className="px-3 py-2 rounded-md bg-muted text-muted-foreground hover:bg-muted/90"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsAdding(true)}
            className="mt-4 w-full py-2 border border-dashed rounded-md flex items-center justify-center gap-2 text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span>Add new habit</span>
          </button>
        )}
      </CardContent>
    </Card>
  );
};
