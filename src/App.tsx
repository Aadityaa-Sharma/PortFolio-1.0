import { useEffect, useState } from "react";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ClickSpark from "@/components/ClickSpark";
const App = () => {
  const [path, setPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => setPath(window.location.pathname);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (to: string) => {
    window.history.pushState({}, "", to);
    setPath(to);
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <ClickSpark
        sparkSize={29}
        sparkRadius={60}
        duration={600}
      >
        {path === "/" ? <Index /> : <NotFound navigate={navigate} />}
      </ClickSpark>
    </ThemeProvider>
  );
};

export default App;
