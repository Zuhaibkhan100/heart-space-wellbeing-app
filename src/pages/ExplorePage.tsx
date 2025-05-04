
import { useState } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Headphones, Video, CheckCircle, Search } from "lucide-react";

// Content for explore page
const exploreContent = {
  articles: [
    {
      id: "a1",
      title: "Understanding Your Emotions",
      description: "Learn how to identify and process different emotions in a healthy way.",
      image: "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=500",
      category: "Mental Health",
      readTime: "5 min read",
      popular: true
    },
    {
      id: "a2",
      title: "The Science of Mindfulness",
      description: "Research-backed evidence on how mindfulness practices change your brain.",
      image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500",
      category: "Mindfulness",
      readTime: "7 min read",
      popular: true
    },
    {
      id: "a3",
      title: "Building Better Sleep Habits",
      description: "Practical tips for improving your sleep quality and duration.",
      image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500",
      category: "Sleep",
      readTime: "6 min read"
    },
    {
      id: "a4",
      title: "Anxiety Management Techniques",
      description: "Simple strategies to help you manage anxious thoughts and feelings.",
      image: "https://images.unsplash.com/photo-1474418397713-003ec9d0479e?w=500",
      category: "Anxiety",
      readTime: "8 min read"
    },
  ],
  meditations: [
    {
      id: "m1",
      title: "Morning Gratitude",
      description: "Start your day with a positive mindset through this guided meditation.",
      image: "https://images.unsplash.com/photo-1519834022362-7ea83c978b8e?w=500",
      category: "Gratitude",
      duration: "5 min",
      popular: true
    },
    {
      id: "m2",
      title: "Letting Go of Stress",
      description: "Release tension and find your center with this calming practice.",
      image: "https://images.unsplash.com/photo-1487700160041-babef9c3cb55?w=500",
      category: "Stress Relief",
      duration: "10 min",
      popular: true
    },
    {
      id: "m3",
      title: "Body Scan Relaxation",
      description: "Move through your body systematically to release tension and find deep relaxation.",
      image: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500",
      category: "Relaxation",
      duration: "15 min"
    },
    {
      id: "m4",
      title: "Loving-Kindness Practice",
      description: "Develop compassion for yourself and others with this heart-centered meditation.",
      image: "https://images.unsplash.com/photo-1510797215324-95aa89f43c33?w=500",
      category: "Compassion",
      duration: "8 min"
    },
  ],
  videos: [
    {
      id: "v1",
      title: "The Power of Self-Compassion",
      description: "Learn why being kind to yourself is essential for mental wellbeing.",
      image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=500",
      category: "Self-Care",
      duration: "12 min",
      popular: true
    },
    {
      id: "v2",
      title: "Yoga for Beginners",
      description: "A gentle introduction to yoga practices anyone can do.",
      image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?w=500",
      category: "Movement",
      duration: "20 min"
    },
    {
      id: "v3",
      title: "Understanding Anxiety",
      description: "Expert explanation of what happens in your body during anxiety.",
      image: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?w=500",
      category: "Anxiety",
      duration: "15 min",
      popular: true
    },
    {
      id: "v4",
      title: "Building Emotional Resilience",
      description: "Tools and techniques to bounce back from life's challenges.",
      image: "https://images.unsplash.com/photo-1526614180703-827d23e7c8f2?w=500",
      category: "Resilience",
      duration: "18 min"
    },
  ]
};

// Categories for filtering
const categories = [
  "All",
  "Mental Health",
  "Mindfulness",
  "Sleep",
  "Anxiety",
  "Self-Care",
  "Gratitude",
  "Resilience",
  "Movement",
  "Stress Relief",
  "Compassion"
];

const ExplorePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Filter content based on search term and category
  const filterContent = (content: any[], type: string) => {
    return content.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        item.description.toLowerCase().includes(searchTerm.toLowerCase());
        
      const matchesCategory = 
        selectedCategory === "All" || 
        item.category === selectedCategory;
        
      return matchesSearch && matchesCategory;
    });
  };
  
  const filteredArticles = filterContent(exploreContent.articles, "articles");
  const filteredMeditations = filterContent(exploreContent.meditations, "meditations");
  const filteredVideos = filterContent(exploreContent.videos, "videos");
  
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-y-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-heading font-bold">Explore</h1>
            <p className="text-muted-foreground">
              Discover content curated for your wellbeing journey
            </p>
          </div>
          
          {/* Search and filtering */}
          <div className="mb-8 space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for wellbeing content..." 
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  className="whitespace-nowrap"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
          
          {/* Content Tabs */}
          <Tabs defaultValue="articles" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="articles">
                <BookOpen className="h-4 w-4 mr-2" />
                Articles
              </TabsTrigger>
              <TabsTrigger value="meditations">
                <Headphones className="h-4 w-4 mr-2" />
                Meditations
              </TabsTrigger>
              <TabsTrigger value="videos">
                <Video className="h-4 w-4 mr-2" />
                Videos
              </TabsTrigger>
            </TabsList>
            
            {/* Articles Tab */}
            <TabsContent value="articles">
              {filteredArticles.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article) => (
                    <Card key={article.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div 
                        className="h-40 bg-cover bg-center relative" 
                        style={{ backgroundImage: `url(${article.image})` }}
                      >
                        {article.popular && (
                          <Badge className="absolute top-2 right-2 bg-white text-primary">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{article.category}</Badge>
                          <span className="text-xs text-muted-foreground">{article.readTime}</span>
                        </div>
                        <h3 className="text-lg font-medium mb-1">{article.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{article.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="link" className="p-0">
                          Read Article
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No articles found. Try a different search term or category.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Meditations Tab */}
            <TabsContent value="meditations">
              {filteredMeditations.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredMeditations.map((meditation) => (
                    <Card key={meditation.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div 
                        className="h-40 bg-cover bg-center relative" 
                        style={{ backgroundImage: `url(${meditation.image})` }}
                      >
                        {meditation.popular && (
                          <Badge className="absolute top-2 right-2 bg-white text-primary">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{meditation.category}</Badge>
                          <span className="text-xs text-muted-foreground">{meditation.duration}</span>
                        </div>
                        <h3 className="text-lg font-medium mb-1">{meditation.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2">{meditation.description}</p>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">
                          Play Meditation
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No meditations found. Try a different search term or category.</p>
                </div>
              )}
            </TabsContent>
            
            {/* Videos Tab */}
            <TabsContent value="videos">
              {filteredVideos.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredVideos.map((video) => (
                    <Card key={video.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                      <div 
                        className="h-48 bg-cover bg-center relative flex items-center justify-center" 
                        style={{ 
                          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${video.image})` 
                        }}
                      >
                        <Button size="icon" variant="secondary" className="rounded-full h-12 w-12">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                        </Button>
                        
                        {video.popular && (
                          <Badge className="absolute top-2 right-2 bg-white text-primary">
                            Popular
                          </Badge>
                        )}
                      </div>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline">{video.category}</Badge>
                          <span className="text-xs text-muted-foreground">{video.duration}</span>
                        </div>
                        <h3 className="text-lg font-medium mb-1">{video.title}</h3>
                        <p className="text-sm text-muted-foreground">{video.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-muted-foreground">No videos found. Try a different search term or category.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
          
          {/* Daily Challenges Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-heading font-bold mb-4">Daily Challenges</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardHeader>
                  <CardTitle>Mindful Moment</CardTitle>
                  <CardDescription>Take 5 minutes for mindful breathing</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Close your eyes, focus on your breath, and notice the sensations in your body for just five minutes.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardHeader>
                  <CardTitle>Gratitude Practice</CardTitle>
                  <CardDescription>Write down three things you're grateful for</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Taking time to acknowledge what you're grateful for can shift your perspective and improve your mood.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-50 to-fuchsia-50 border-purple-200">
                <CardHeader>
                  <CardTitle>Act of Kindness</CardTitle>
                  <CardDescription>Do something kind for someone else today</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">Research shows that doing something nice for others benefits your own wellbeing too.</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark Complete
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default ExplorePage;
