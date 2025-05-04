
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
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, Heart, Calendar, BookOpen, Settings, User } from "lucide-react";

const navItems = [
  { name: "Dashboard", icon: Home, path: "/" },
  { name: "Mood Diary", icon: Heart, path: "/mood" },
  { name: "Habit Tracker", icon: Calendar, path: "/habits" },
  { name: "Affirmations", icon: BookOpen, path: "/affirmations" },
  { name: "Settings", icon: Settings, path: "/settings" },
];

export const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-between p-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full bg-lavender-blush flex items-center justify-center">
            <Heart className="h-4 w-4 text-primary" />
          </div>
          <h1 className="font-heading font-bold text-lg">Lovable</h1>
        </div>
        <SidebarTrigger className="lg:hidden" />
      </SidebarHeader>
      
      <SidebarContent className="p-2">
        <SidebarGroup>
          <nav className="space-y-1">
            {navItems.map((item) => (
              <Button
                key={item.name}
                variant="ghost"
                className={cn(
                  "w-full justify-start gap-3 font-normal",
                  location.pathname === item.path
                    ? "bg-muted"
                    : "hover:bg-transparent hover:text-primary"
                )}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.name}</span>
              </Button>
            ))}
          </nav>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t">
        <Button variant="ghost" className="w-full justify-start gap-3 font-normal">
          <User className="h-5 w-5" />
          <span>Profile</span>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
};
