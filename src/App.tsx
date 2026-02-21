import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AshramProvider } from "@/contexts/AshramContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import AshramLanding from "./pages/AshramLanding";
import Index from "./pages/Index";
import About from "./pages/About";
import Needs from "./pages/Needs";
import Donate from "./pages/Donate";
import Earn from "./pages/Earn";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Feed from "./pages/Feed";
import VendorRegister from "./pages/VendorRegister";
import VendorDashboard from "./pages/VendorDashboard";
import VendorDetail from "./pages/VendorDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function AshramRoutes() {
  return (
    <AshramProvider>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/needs" element={<Needs />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/earn" element={<Earn />} />
        <Route path="/vendor/register" element={<VendorRegister />} />
        <Route path="/vendor/dashboard" element={<VendorDashboard />} />
        <Route path="/vendor/:vendorId" element={<VendorDetail />} />
        <Route path="/events" element={<Events />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AshramProvider>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<AshramLanding />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/ashram/:ashramSlug/*" element={<AshramRoutes />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <ThemeSwitcher />
          </BrowserRouter>
        </AuthProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
