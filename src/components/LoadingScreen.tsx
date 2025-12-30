import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(onLoadingComplete, 500);
    }, 2000);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onLoadingComplete]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <span className="text-6xl font-extrabold text-foreground tracking-tighter">
              <span className="text-primary">[</span>
              AS
              <span className="text-primary">]</span>
            </span>
          </motion.div>

          {/* Progress Bar */}
          <div className="w-48 h-px bg-foreground/10 overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: '0%' }}
              animate={{ width: `${count}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>

          {/* Counter */}
          <motion.span
            className="mt-4 text-sm font-mono text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {count}%
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
