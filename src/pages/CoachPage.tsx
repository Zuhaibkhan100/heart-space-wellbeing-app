
import { useState, useRef, useEffect } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SendIcon, Mic, PauseCircle, Heart, ThumbsUp, ThumbsDown } from "lucide-react";

// Example coaching prompts
const coachingPrompts = [
  "How are you feeling today?",
  "What's one thing you're grateful for?",
  "What's causing you stress right now?",
  "Tell me about a recent win or achievement",
  "What's one small step you can take today for your wellbeing?"
];

// Sample AI responses for demo
const aiResponses: Record<string, string> = {
  "hello": "Hi there! How are you feeling today? I'm here to support your mental wellness journey.",
  "how are you": "I'm here and ready to help you! How about you tell me how you're doing today?",
  "i'm feeling stressed": "I'm sorry to hear you're feeling stressed. That's really challenging. Would you like to talk about what's causing it, or perhaps try a quick breathing exercise to help you center yourself?",
  "i'm feeling anxious": "Anxiety can be really difficult to deal with. Remember that your feelings are valid. Would it help to identify what might be triggering these feelings right now?",
  "i'm feeling good": "That's wonderful to hear! What's something that contributed to your positive mood today? Recognizing these patterns can help build more good moments.",
  "help": "I'm here to support you on your wellness journey. You can talk about your feelings, ask for mindfulness exercises, get tips for better sleep, or just chat about your day. What would be most helpful right now?"
};

interface Message {
  id: string;
  content: string;
  sender: "user" | "ai";
  timestamp: Date;
  liked?: boolean;
}

const CoachPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi, I'm your Lovable wellness coach. How can I support you today?",
      sender: "ai",
      timestamp: new Date()
    }
  ]);
  const [isRecording, setIsRecording] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  
  // Simulate AI typing response
  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 1500);
  };
  
  // Handle message submission
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: `user-${Date.now()}`,
      content: input,
      sender: "user",
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    simulateTyping();
    
    // Simulate AI response
    setTimeout(() => {
      let response = "I'm not sure how to respond to that. Could you try phrasing it differently?";
      
      // Check for matching responses
      for (const [key, value] of Object.entries(aiResponses)) {
        if (input.toLowerCase().includes(key)) {
          response = value;
          break;
        }
      }
      
      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        content: response,
        sender: "ai",
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiMessage]);
    }, 2000);
  };
  
  // Handle voice toggle
  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // This would normally connect to a voice API
    if (!isRecording) {
      // Starting recording
      setTimeout(() => {
        setIsRecording(false);
        setInput("I'm feeling a bit overwhelmed today");
      }, 3000);
    }
  };
  
  // Handle prompt click
  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };
  
  // Handle like/dislike
  const handleMessageReaction = (id: string, liked: boolean) => {
    setMessages(prev => 
      prev.map(msg => 
        msg.id === id ? { ...msg, liked } : msg
      )
    );
  };
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-heading font-bold">Wellness Coach</h1>
            <p className="text-muted-foreground">
              Chat with your AI wellness companion
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-3">
              <Card className="shadow-md">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-primary/20">
                        <Heart className="h-5 w-5 text-primary" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>Lovable Coach</CardTitle>
                      <CardDescription>AI wellness companion</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[500px] px-6 py-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`flex mb-6 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                      >
                        <div className="flex gap-3 max-w-[80%]">
                          {message.sender === "ai" && (
                            <Avatar className="h-8 w-8">
                              <AvatarImage src="/placeholder.svg" />
                              <AvatarFallback className="bg-primary/20">
                                <Heart className="h-4 w-4 text-primary" />
                              </AvatarFallback>
                            </Avatar>
                          )}
                          
                          <div className={`p-3 rounded-lg ${
                            message.sender === "user" 
                              ? "bg-primary text-primary-foreground" 
                              : "bg-muted"
                          }`}>
                            <div className="text-sm">{message.content}</div>
                            <div className="text-xs mt-2 opacity-70">
                              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </div>
                          </div>
                          
                          {message.sender === "ai" && (
                            <div className="flex flex-col justify-start gap-1 mt-1">
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-6 w-6"
                                onClick={() => handleMessageReaction(message.id, true)}
                              >
                                <ThumbsUp className={`h-4 w-4 ${message.liked === true ? "fill-primary" : ""}`} />
                              </Button>
                              <Button 
                                size="icon" 
                                variant="ghost" 
                                className="h-6 w-6"
                                onClick={() => handleMessageReaction(message.id, false)}
                              >
                                <ThumbsDown className={`h-4 w-4 ${message.liked === false ? "fill-destructive" : ""}`} />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex mb-6 justify-start">
                        <div className="flex gap-3 max-w-[80%]">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src="/placeholder.svg" />
                            <AvatarFallback className="bg-primary/20">
                              <Heart className="h-4 w-4 text-primary" />
                            </AvatarFallback>
                          </Avatar>
                          
                          <div className="p-3 rounded-lg bg-muted flex items-center">
                            <div className="flex gap-1">
                              <span className="h-2 w-2 bg-primary/60 rounded-full animate-pulse" 
                                style={{ animationDelay: "0ms" }}></span>
                              <span className="h-2 w-2 bg-primary/60 rounded-full animate-pulse" 
                                style={{ animationDelay: "300ms" }}></span>
                              <span className="h-2 w-2 bg-primary/60 rounded-full animate-pulse" 
                                style={{ animationDelay: "600ms" }}></span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </ScrollArea>
                  
                  <div className="p-4 border-t">
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className={`${isRecording ? 'bg-red-100 text-red-500' : ''}`}
                        onClick={toggleRecording}
                      >
                        {isRecording ? <PauseCircle className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
                      </Button>
                      <Input
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button size="icon" disabled={!input.trim()} onClick={handleSendMessage}>
                        <SendIcon className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <div className="md:col-span-3">
              <h3 className="font-medium mb-3">Suggested prompts:</h3>
              <div className="flex flex-wrap gap-2">
                {coachingPrompts.map((prompt, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => handlePromptClick(prompt)}
                    className="whitespace-nowrap"
                  >
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CoachPage;
