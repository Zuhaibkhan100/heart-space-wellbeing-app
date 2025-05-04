
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import AuthPage from "./pages/AuthPage";
import MoodPage from "./pages/MoodPage";
import MoodAnalyticsPage from "./pages/MoodAnalyticsPage";
import MoodCheckinPage from "./pages/MoodCheckinPage";
import HabitsPage from "./pages/HabitsPage";
import AffirmationsPage from "./pages/AffirmationsPage";
import MeditationsPage from "./pages/MeditationsPage";
import CoachPage from "./pages/CoachPage";
import ExplorePage from "./pages/ExplorePage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/mood" element={<MoodPage />} />
          <Route path="/mood/analytics" element={<MoodAnalyticsPage />} />
          <Route path="/mood/checkin" element={<MoodCheckinPage />} />
          <Route path="/habits" element={<HabitsPage />} />
          <Route path="/affirmations" element={<AffirmationsPage />} />
          <Route path="/meditations" element={<MeditationsPage />} />
          <Route path="/coach" element={<CoachPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
