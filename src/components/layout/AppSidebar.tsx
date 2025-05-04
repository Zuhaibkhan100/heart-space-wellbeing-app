
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarTrigger,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Heart, 
  Calendar, 
  BookOpen, 
  Settings, 
  User, 
  BarChart, 
  Activity, 
  Compass,
  MessageSquare, 
  Timer,
  Smile
} from "lucide-react";
import { Logo } from "./Logo";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Mood Tracker", icon: Heart, path: "/mood", 
    subItems: [
      { name: "Daily Check-in", icon: Smile, path: "/mood/checkin" },
      { name: "Mood Analytics", icon: BarChart, path: "/mood/analytics" }
    ]
  },
  { name: "Habit Tracker", icon: Calendar, path: "/habits" },
  { name: "Affirmations", icon: BookOpen, path: "/affirmations" },
  { name: "Meditations", icon: Timer, path: "/meditations" },
  { name: "Wellness Coach", icon: MessageSquare, path: "/coach" },
  { name: "Explore", icon: Compass, path: "/explore" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    );
  };

  const isCurrentPath = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <Logo size="sm" />
        </div>
        <SidebarTrigger className="lg:hidden" />
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarGroup>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton
                  isActive={isCurrentPath(item.path)}
                  className={cn(
                    "w-full justify-start gap-3 font-normal",
                    isCurrentPath(item.path)
                      ? "bg-muted"
                      : "hover:bg-transparent hover:text-primary"
                  )}
                  onClick={() => {
                    if (item.subItems) {
                      toggleExpanded(item.name);
                    } else {
                      navigate(item.path);
                    }
                  }}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                  {item.subItems && (
                    <span className="ml-auto">
                      {expandedItems.includes(item.name) ? "−" : "+"}
                    </span>
                  )}
                </SidebarMenuButton>
                
                {item.subItems && expandedItems.includes(item.name) && (
                  <div className="pl-8 space-y-1 mt-1">
                    {item.subItems.map(subItem => (
                      <Button
                        key={subItem.name}
                        variant="ghost"
                        size="sm"
                        className={cn(
                          "w-full justify-start gap-3 font-normal",
                          isCurrentPath(subItem.path)
                            ? "bg-muted"
                            : "hover:bg-transparent hover:text-primary"
                        )}
                        onClick={() => navigate(subItem.path)}
                      >
                        <subItem.icon className="h-4 w-4" />
                        <span>{subItem.name}</span>
                      </Button>
                    ))}
                  </div>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <Button 
          variant="ghost" 
          className="w-full justify-start gap-3 font-normal"
          onClick={() => navigate("/profile")}
        >
          <User className="h-5 w-5" />
          <span>Profile</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
