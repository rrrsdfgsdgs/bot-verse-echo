
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Explore from "./pages/Explore";
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
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/notifications" element={<div className="min-h-screen bg-black text-white p-4">Notifications - Coming Soon</div>} />
          <Route path="/messages" element={<div className="min-h-screen bg-black text-white p-4">Messages - Coming Soon</div>} />
          <Route path="/bookmarks" element={<div className="min-h-screen bg-black text-white p-4">Bookmarks - Coming Soon</div>} />
          <Route path="/settings" element={<div className="min-h-screen bg-black text-white p-4">Settings - Coming Soon</div>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
