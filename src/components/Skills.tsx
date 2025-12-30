import { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useInView } from '@/hooks/useInView';

const allSkills = [
  { name: 'JavaScript', color: 'electric', size: 1.2 },
  { name: 'TypeScript', color: 'coral', size: 1.1 },
  { name: 'React', color: 'electric', size: 1.5 },
  { name: 'Next.js', color: 'violet', size: 1.3 },
  { name: 'Node.js', color: 'acid', size: 1.1 },
  { name: 'Python', color: 'coral', size: 1.2 },
  { name: 'Three.js', color: 'gold', size: 0.9 },
  { name: 'GSAP', color: 'acid', size: 0.8 },
  { name: 'Tailwind', color: 'electric', size: 1.4 },
  { name: 'MongoDB', color: 'acid', size: 1 },
  { name: 'PostgreSQL', color: 'violet', size: 1.1 },
  { name: 'Git', color: 'coral', size: 0.9 },
  { name: 'Docker', color: 'electric', size: 1.2 },
  { name: 'AWS', color: 'gold', size: 1.1 },
  { name: 'Figma', color: 'violet', size: 1 },
  { name: 'GraphQL', color: 'coral', size: 1.3 },
  { name: 'Framer Motion', color: 'electric', size: 1 },
  { name: 'Vite', color: 'acid', size: 0.8 },
];

const colorClasses: Record<string, string> = {
  electric: 'border-electric bg-electric/10 text-electric',
  coral: 'border-coral bg-coral/10 text-coral',
  acid: 'border-acid bg-acid/10 text-acid',
  violet: 'border-violet bg-violet/10 text-violet',
  gold: 'border-gold bg-gold/10 text-gold',
};

const FloatingSkill = ({ skill, index, containerRef }: { skill: typeof allSkills[0], index: number, containerRef: React.RefObject<HTMLDivElement> }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Random base position
  const initialX = Math.random() * 90 - 45; // -45% to 45% (Horizontal)
  // Shift Y down to avoid title overlap. Range: 10% to 50% (relative to center) -> 60% to 100% of container height approx
  // Center is 50%. We want to add positive offset.
  // Let's say top is 0%, center is 50%, bottom is 100%.
  // Title is at top. We want skills in bottom 2/3rds.
  // initialY is offset from center. 
  // 0 is center. -50 is top. +50 is bottom.
  // We want range roughly -10 to +40.
  const initialY = Math.random() * 50 - 10;

  // Mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      // Parallax effect based on mouse position
      // Varying speeds based on index to create depth
      const depth = 1 + (index % 3) * 0.5;
      x.set(mouseX / (10 * depth));
      y.set(mouseY / (10 * depth));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y, index, containerRef]);

  const springConfig = { damping: 15, stiffness: 50 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  return (
    <motion.div
      drag
      dragConstraints={containerRef}
      className={`absolute cursor-grab active:cursor-grabbing px-6 py-3 rounded-full border-2 font-mono font-bold backdrop-blur-sm ${colorClasses[skill.color]} transition-colors duration-300 hover:bg-background hover:z-50`}
      style={{
        left: `${50 + initialX}%`,
        top: `${50 + initialY}%`,
        x: springX,
        y: springY,
        scale: skill.size,
      }}
      whileHover={{ scale: skill.size * 1.2, rotate: Math.random() * 10 - 5 }}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: skill.size }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
    >
      {skill.name}
    </motion.div>
  );
};

export const Skills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[800px] flex items-center justify-center overflow-hidden"
    >
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="absolute top-10 left-0 right-0 z-10 text-center pointer-events-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">STACK</h2>
          <h2 className="section-title-filled">CONSTEL</h2>
        </motion.div>
      </div>

      <div className="relative w-full h-full max-w-6xl mx-auto">
        {/* Grid lines for "technical" feel */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-10 pointer-events-none">
          {[...Array(36)].map((_, i) => (
            <div key={i} className="border border-foreground/20" />
          ))}
        </div>

        {allSkills.map((skill, index) => (
          <FloatingSkill
            key={skill.name}
            skill={skill}
            index={index}
            containerRef={containerRef}
          />
        ))}
      </div>
    </div>
  );
};
