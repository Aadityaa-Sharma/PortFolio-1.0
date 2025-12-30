import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Download, Code, Palette, Zap, Database, Globe, Terminal, Cpu } from 'lucide-react';

const stats = [
  { value: '50+', label: 'Projects' },
  { value: '15+', label: 'Skills' },
  { value: '3', label: 'Years' },
];

const techIcons = [
  { name: 'React', icon: Code, color: 'electric' },
  { name: 'Node.js', icon: Terminal, color: 'acid' },
  { name: 'Python', icon: Cpu, color: 'coral' },
  { name: 'MongoDB', icon: Database, color: 'violet' },
  { name: 'Figma', icon: Palette, color: 'gold' },
  { name: 'AWS', icon: Globe, color: 'coral' },
];

const colorMap: Record<string, string> = {
  electric: 'hover:bg-electric hover:text-background hover:border-electric',
  coral: 'hover:bg-coral hover:text-background hover:border-coral',
  acid: 'hover:bg-acid hover:text-background hover:border-acid',
  violet: 'hover:bg-violet hover:text-background hover:border-violet',
  gold: 'hover:bg-gold hover:text-background hover:border-gold',
};

export const About = () => {
  const { ref, isInView } = useInView({ threshold: 0.1 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="w-full flex items-center bg-transparent overflow-hidden py-20"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <h2 className="section-title">ABOUT</h2>
          <h2 className="section-title-filled">ABOUT</h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column - Bio */}
          <div className="lg:col-span-5 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="bento-card h-full">
                <Zap className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Creative Technologist
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Third-year B.Tech student passionate about building beautiful, functional digital experiences. I blend technical expertise with creative vision.
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 text-xs font-mono bg-primary text-background">Full-Stack</span>
                  <span className="px-3 py-1 text-xs font-mono bg-secondary text-background">UI/UX</span>
                  <span className="px-3 py-1 text-xs font-mono bg-accent text-background">Creative</span>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bento-card"
            >
              <div className="grid grid-cols-3 gap-4">
                {stats.map((stat, i) => (
                  <div key={stat.label} className="text-center">
                    <motion.span
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      className="block text-4xl md:text-5xl font-extrabold text-foreground"
                    >
                      {stat.value}
                    </motion.span>
                    <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Tech Grid */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {techIcons.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className={`bento-card group flex flex-col items-center justify-center py-8 transition-all duration-300 ${colorMap[tech.color]}`}
                >
                  <tech.icon className="w-10 h-10 mb-4 transition-transform duration-300 group-hover:scale-110" />
                  <span className="text-sm font-medium">{tech.name}</span>
                </motion.div>
              ))}

              {/* Resume Card */}
              <motion.a
                href="#"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bento-card group flex flex-col items-center justify-center py-8 cursor-pointer hover:border-primary transition-all duration-300"
              >
                <Download className="w-10 h-10 mb-4 text-primary transition-transform duration-300 group-hover:scale-110" />
                <span className="text-sm font-medium">Resume</span>
              </motion.a>

              {/* Large Bio Card */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bento-card col-span-2 flex items-center justify-center"
              >
                <div className="text-center">
                  <div className="text-6xl md:text-8xl font-extrabold gradient-text mb-4">AS</div>
                  <p className="text-sm font-mono text-muted-foreground">Aditya Sharma</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
