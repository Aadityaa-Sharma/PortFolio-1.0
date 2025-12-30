import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={containerRef} className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Floating Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-foreground/5"
            style={{
              width: `${100 + i * 80}px`,
              height: `${100 + i * 80}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              rotate: i * 15,
            }}
            animate={{
              rotate: [i * 15, i * 15 + 360],
              y: [0, -30, 0],
            }}
            transition={{
              rotate: { duration: 40 + i * 10, repeat: Infinity, ease: 'linear' },
              y: { duration: 4 + i, repeat: Infinity, ease: 'easeInOut' },
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full">
        <div className="w-full overflow-hidden px-6 lg:px-12">
          {/* Overline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-sm font-mono text-primary tracking-[0.3em] uppercase mb-8"
          >
            B.Tech • Full-Stack • Creative
          </motion.p>

          {/* Main Title - Marquee effect */}
          <div className="mb-6 w-full overflow-hidden text-center md:text-left">
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-[0.9] tracking-tighter">
                <span className="text-white">DEVE</span>
                <span className="text-blue-500">LOPER</span>
              </h1>
            </motion.div>
          </div>

          <div className="mb-12 w-full overflow-hidden text-center md:text-right">
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold leading-[0.9] tracking-tighter">
                <span className="text-blue-500">&</span>
                <span className="text-white ml-2">CREA</span>
                <span className="text-blue-500">TOR</span>
              </h1>
            </motion.div>
          </div>

          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col md:flex-row md:items-end justify-between gap-8 mt-20"
          >
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              Crafting digital experiences that blend cutting-edge technology with bold creative vision.
            </p>

            <motion.button
              onClick={() => {
                const el = document.querySelector('#projects');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-primary self-start"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View Work
            </motion.button>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-xs font-mono tracking-[0.3em] text-muted-foreground uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-primary to-transparent"
        />
      </motion.div>
    </div>
  );
};
