
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import LiveTracker from "./pages/LiveTracker";
import PlayerStats from "./pages/PlayerStats";
import FixturePlanner from "./pages/FixturePlanner";
import TopPicks from "./pages/TopPicks";
import SquadBuilder from "./pages/SquadBuilder";
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
          <Route path="/live-tracker" element={<LiveTracker />} />
          <Route path="/player-stats" element={<PlayerStats />} />
          <Route path="/fixture-planner" element={<FixturePlanner />} />
          <Route path="/top-picks" element={<TopPicks />} />
          <Route path="/squad-builder" element={<SquadBuilder />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
