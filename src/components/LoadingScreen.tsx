import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface LoadingScreenProps {
  onLoadingComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onLoadingComplete?.();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div className="relative flex flex-col items-center gap-8">
        {/* Animated Logo */}
        <motion.div
          layoutId="logo"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1]
          }}
          className="text-4xl font-extrabold text-foreground tracking-tighter"
        >
          <span className="text-foreground/40">[</span>
          AS
          <span className="text-foreground/40">]</span>
        </motion.div>

        {/* Loading Progress Bar */}
        <div className="w-48 h-[1px] bg-foreground/10 relative overflow-hidden">
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute inset-0 bg-foreground"
          />
        </div>

        {/* Status Text */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-[10px] font-mono uppercase tracking-[0.4em] text-foreground/50"
        >
          Initializing Experience
        </motion.span>
      </div>
    </motion.div>
  );
};
