import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const LoadingScreen = ({ onLoadingComplete }: { onLoadingComplete: () => void }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onLoadingComplete, 200);
          return 100;
        }
        return prev + 2;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center">
      {/* Logo */}
      <motion.div
        layoutId="main-logo"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
        }}
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
    </div>
  );
};
