import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-background px-8 overflow-hidden relative">
      {/* Background Decor */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-lg w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-4"
        >
          <h1 className="text-[10rem] font-heading font-extrabold leading-none tracking-tighter gradient-text opacity-50">
            404
          </h1>
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-foreground">
            Lost in Space?
          </h2>
          <p className="text-muted-foreground text-lg font-body max-w-xs mx-auto">
            The digital dimension you're looking for doesn't exist or has moved.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <button
            onClick={() => navigate("/")}
            className="btn-minimal w-full sm:w-auto"
          >
            Return to Home
          </button>
          <button
            onClick={() => window.history.back()}
            className="btn-minimal-outline w-full sm:w-auto"
          >
            Go Back
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default NotFound;
