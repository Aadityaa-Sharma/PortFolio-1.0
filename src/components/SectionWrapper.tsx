import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  isFirst?: boolean;
}

export const SectionWrapper = ({ children, id, isFirst }: SectionWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Scale from 0.8 to 1.0 as it enters, then back down to 0.8 as it exits
  const scale = useTransform(scrollYProgress, [0, 0.4, 0.6, 1], [0.8, 1, 1, 0.8]);

  // Opacity fade in and fade out
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Slight vertical movement to enhance depth. For the first section, start at 0 to avoid gap with navbar.
  const y = useTransform(scrollYProgress, [0, 1], [isFirst ? 0 : 100, -100]);

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative h-screen flex items-center justify-center snap-start snap-stop-always ${isFirst ? 'pt-0' : ''} overflow-hidden`}
    >
      <motion.div
        style={{
          scale,
          opacity,
        }}
        className="w-full h-full flex items-center justify-center"
      >
        <div className="w-full px-4 md:px-8 lg:px-12">
          {children}
        </div>
      </motion.div>
    </div>
  );
};
