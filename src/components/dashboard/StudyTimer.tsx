
import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Square, RefreshCw } from "lucide-react";

export function StudyTimer() {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Timer logic
  useEffect(() => {
    if (isRunning) {
      timerRef.current = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 59) {
            setMinutes(prevMinutes => {
              if (prevMinutes === 59) {
                setHours(prevHours => prevHours + 1);
                return 0;
              }
              return prevMinutes + 1;
            });
            return 0;
          }
          return prevSeconds + 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isRunning]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setMinutes(0);
    setHours(0);
  };

  // Format time with leading zeros
  const formatTime = (value: number) => {
    return value.toString().padStart(2, '0');
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Study Timer</CardTitle>
        <CardDescription>Track your focus sessions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="w-full flex items-center justify-center p-6">
          <div className="flex items-center space-x-1">
            {/* Hours */}
            <div className="relative">
              <div className="clock-card transition-transform duration-500 rounded-md bg-background border border-border shadow-md p-4 w-16 h-20 flex items-center justify-center">
                <span className="text-3xl font-mono font-bold">{formatTime(hours)}</span>
              </div>
            </div>
            <span className="text-3xl font-bold">:</span>
            {/* Minutes */}
            <div className="relative">
              <div className={`clock-card transition-transform duration-500 rounded-md bg-background border border-border shadow-md p-4 w-16 h-20 flex items-center justify-center ${seconds === 0 && minutes % 1 === 0 ? 'animate-flip' : ''}`}>
                <span className="text-3xl font-mono font-bold">{formatTime(minutes)}</span>
              </div>
            </div>
            <span className="text-3xl font-bold">:</span>
            {/* Seconds */}
            <div className="relative">
              <div className={`clock-card transition-transform duration-500 rounded-md bg-background border border-border shadow-md p-4 w-16 h-20 flex items-center justify-center ${seconds % 1 === 0 ? 'animate-flip' : ''}`}>
                <span className="text-3xl font-mono font-bold">{formatTime(seconds)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-2">
        {!isRunning ? (
          <Button onClick={handleStart} className="w-24">
            <Play className="mr-2" />
            Start
          </Button>
        ) : (
          <Button onClick={handleStop} className="w-24" variant="destructive">
            <Square className="mr-2" />
            Stop
          </Button>
        )}
        <Button onClick={handleReset} variant="outline" className="w-24">
          <RefreshCw className="mr-2" />
          Reset
        </Button>
      </CardFooter>
    </Card>
  );
}
