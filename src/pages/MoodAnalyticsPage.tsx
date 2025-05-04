
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Line, LineChart, Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// Mock data for mood analytics
const moodData = [
  { day: "Mon", date: "05/01", value: 8, emoji: "😊", note: "Great start to the week!" },
  { day: "Tue", date: "05/02", value: 7, emoji: "🙂", note: "Productive day" },
  { day: "Wed", date: "05/03", value: 5, emoji: "😐", note: "Feeling a bit stressed" },
  { day: "Thu", date: "05/04", value: 4, emoji: "😔", note: "Difficult meeting" },
  { day: "Fri", date: "05/05", value: 6, emoji: "🙂", note: "Looking forward to weekend" },
  { day: "Sat", date: "05/06", value: 8, emoji: "😊", note: "Relaxing day" },
  { day: "Sun", date: "05/07", value: 9, emoji: "😄", note: "Great weekend!" },
];

const weeklyMoodData = [
  { week: "Week 1", average: 6.5 },
  { week: "Week 2", average: 7.2 },
  { week: "Week 3", average: 5.8 },
  { week: "Week 4", average: 8.1 },
];

// Color mapping for mood values
const getMoodColor = (value: number) => {
  if (value >= 8) return "#22c55e"; // Green
  if (value >= 6) return "#3b82f6"; // Blue
  if (value >= 4) return "#f59e0b"; // Amber
  return "#ef4444"; // Red
};

const MoodAnalyticsPage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeframe, setTimeframe] = useState("week");
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-heading font-bold">Mood Analytics</h1>
            <p className="text-muted-foreground">
              Track and analyze your mood patterns
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1">
              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle>Mood Calendar</CardTitle>
                  <CardDescription>
                    View your daily mood entries
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border p-3 pointer-events-auto"
                    modifiers={{
                      mood: new Date(),
                    }}
                    modifiersStyles={{
                      mood: {
                        fontWeight: "bold",
                        backgroundColor: "#e9d5ff",
                        color: "#6b21a8"
                      }
                    }}
                  />
                  
                  <div className="mt-4 p-3 bg-muted rounded-md">
                    <div className="font-medium">May 4, 2025</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xl">😊</span>
                      <span className="font-medium">Happy</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      Started my day with meditation and felt great throughout!
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-2">
              <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Mood Trends</CardTitle>
                    <CardDescription>
                      Track how your mood changes over time
                    </CardDescription>
                  </div>
                  <Select value={timeframe} onValueChange={setTimeframe}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select timeframe" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Past Week</SelectItem>
                      <SelectItem value="month">Past Month</SelectItem>
                      <SelectItem value="year">Past Year</SelectItem>
                    </SelectContent>
                  </Select>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="line">
                    <TabsList className="grid w-full grid-cols-2 mb-4">
                      <TabsTrigger value="line">Line Chart</TabsTrigger>
                      <TabsTrigger value="bar">Bar Chart</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="line">
                      <ChartContainer config={{}} className="h-[300px]">
                        <LineChart data={moodData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                          <XAxis dataKey="day" />
                          <YAxis domain={[0, 10]} />
                          <CartesianGrid strokeDasharray="3 3" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line 
                            type="monotone" 
                            dataKey="value" 
                            stroke="#8884d8" 
                            strokeWidth={2}
                            dot={{ fill: "#8884d8", strokeWidth: 2, r: 6 }}
                            activeDot={{ r: 8 }}
                          />
                        </LineChart>
                      </ChartContainer>
                    </TabsContent>
                    
                    <TabsContent value="bar">
                      <ChartContainer config={{}} className="h-[300px]">
                        <BarChart data={moodData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                          <XAxis dataKey="day" />
                          <YAxis domain={[0, 10]} />
                          <CartesianGrid strokeDasharray="3 3" />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar 
                            dataKey="value" 
                            fill="#8884d8"
                            maxBarSize={50}
                          />
                        </BarChart>
                      </ChartContainer>
                    </TabsContent>
                  </Tabs>
                  
                  <div className="mt-6">
                    <h3 className="font-medium mb-2">Mood Insights</h3>
                    <p className="text-sm text-muted-foreground">
                      Your mood has been generally positive this week, with a slight dip on Thursday.
                      Try identifying patterns that might affect your mood.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md mt-6">
                <CardHeader>
                  <CardTitle>Weekly Averages</CardTitle>
                  <CardDescription>
                    Compare your mood across weeks
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={weeklyMoodData}>
                        <XAxis dataKey="week" />
                        <YAxis domain={[0, 10]} />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Tooltip />
                        <Bar 
                          dataKey="average" 
                          fill="#9333ea" 
                          maxBarSize={60}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <div className="mt-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Daily Mood Log</CardTitle>
                <CardDescription>
                  View your recent mood entries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {moodData.map((mood, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 rounded-md border flex items-center gap-4 hover:bg-muted transition-colors cursor-pointer"
                    >
                      <div 
                        className="h-12 w-12 rounded-full flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${getMoodColor(mood.value)}20` }}
                      >
                        {mood.emoji}
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div className="font-medium">{mood.day}, May {mood.date.split('/')[1]}</div>
                          <div className="text-sm text-muted-foreground">
                            Mood: {mood.value}/10
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{mood.note}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M9 18l6-6-6-6" />
                        </svg>
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MoodAnalyticsPage;
