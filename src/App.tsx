import { useEffect } from "react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import themeConfig from "@/data/theme.json";
import ClickSpark from "@/components/ClickSpark";

const queryClient = new QueryClient();

const ColorInjector = () => {
  useEffect(() => {
    const root = document.documentElement;
    const { primary, secondary, accent } = themeConfig.colors;
    root.style.setProperty("--primary", primary);
    root.style.setProperty("--secondary", secondary);
    root.style.setProperty("--accent", accent);
    root.style.setProperty("--glow", primary);
    root.style.setProperty("--ring", primary);
  }, []);
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <TooltipProvider>
        <ColorInjector />
        <Toaster />
        <Sonner />
        <ClickSpark
          sparkSize={29}
          sparkRadius={60}
          duration={600}
        >
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </ClickSpark>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
