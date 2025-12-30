import { useState, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { ExternalLink, Github, X } from 'lucide-react';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    subtitle: 'Full-Stack Development',
    description: 'A complete e-commerce solution with real-time inventory, AI recommendations, and seamless payment processing.',
    tech: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    color: 'electric',
    year: '2024',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 2,
    title: 'AI Content Studio',
    subtitle: 'Machine Learning',
    description: 'Intelligent content generation platform leveraging GPT-4 for marketing copy, blogs, and social media.',
    tech: ['Next.js', 'OpenAI', 'PostgreSQL'],
    color: 'coral',
    year: '2024',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 3,
    title: 'Real-Time Workspace',
    subtitle: 'Collaborative Tools',
    description: 'Notion-inspired workspace with live document editing, task boards, and team collaboration features.',
    tech: ['React', 'Socket.io', 'Redis'],
    color: 'acid',
    year: '2023',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 4,
    title: 'Crypto Analytics',
    subtitle: 'Data Visualization',
    description: 'Comprehensive cryptocurrency tracking with live prices, portfolio management, and predictive charts.',
    tech: ['Vue.js', 'Python', 'FastAPI'],
    color: 'violet',
    year: '2023',
    liveUrl: '#',
    githubUrl: '#',
  },
  {
    id: 5,
    title: 'Social Platform',
    subtitle: 'Mobile First',
    description: 'A modern social networking app with real-time messaging, stories, and content discovery.',
    tech: ['React Native', 'Firebase', 'GraphQL'],
    color: 'gold',
    year: '2023',
    liveUrl: '#',
    githubUrl: '#',
  },
];

const colorClasses: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  electric: { border: 'border-electric', bg: 'bg-electric', text: 'text-electric', glow: 'shadow-[0_0_60px_hsl(220,100%,60%,0.3)]' },
  coral: { border: 'border-coral', bg: 'bg-coral', text: 'text-coral', glow: 'shadow-[0_0_60px_hsl(8,100%,62%,0.3)]' },
  acid: { border: 'border-acid', bg: 'bg-acid', text: 'text-acid', glow: 'shadow-[0_0_60px_hsl(82,100%,55%,0.3)]' },
  violet: { border: 'border-violet', bg: 'bg-violet', text: 'text-violet', glow: 'shadow-[0_0_60px_hsl(270,100%,65%,0.3)]' },
  gold: { border: 'border-gold', bg: 'bg-gold', text: 'text-gold', glow: 'shadow-[0_0_60px_hsl(45,100%,55%,0.3)]' },
};

interface ProjectCardProps {
  project: typeof projects[0];
  index: number;
  total: number;
  onSelect: () => void;
  hovered: boolean;
}

const ProjectCard = ({ project, index, total, onSelect, hovered }: ProjectCardProps) => {
  const colors = colorClasses[project.color];
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Stack calculation
  const reverseIndex = total - 1 - index;
  const offset = reverseIndex * -5; // Vertical stacking offset
  const scale = 1 - reverseIndex * 0.05; // Scale down cards behind

  // Fan out calculation
  // Middle index
  const mid = (total - 1) / 2;
  // Distance from middle (-2, -1, 0, 1, 2 for 5 items)
  const dist = index - mid;

  // Hover state transforms
  const hoverX = dist * 250; // Spread horizontally
  const hoverY = 0;
  const hoverRotate = dist * 5; // Slight rotation

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      layoutId={`card-${project.id}`}
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        type: "spring",
        stiffness: 100
      }}
      onClick={onSelect}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`absolute w-full max-w-sm h-[450px] bg-card border-2 ${colors.border} p-8 cursor-pointer overflow-hidden flex flex-col justify-between origin-bottom transition-colors duration-500`}
      style={{
        zIndex: index + 1,
        rotateX: mousePos.y * -10,
        rotateY: mousePos.x * 10,
        transformStyle: 'preserve-3d',
      }}
      animate={{
        y: hovered ? hoverY : offset * 4, // More compact stack height
        x: hovered ? hoverX : 0,
        rotate: hovered ? hoverRotate : 0,
        scale: hovered ? 1 : scale,
      }}
    >
      {/* Gloss Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-20 transition-opacity"
        style={{
          background: `radial-gradient(circle at ${50 + mousePos.x * 100}% ${50 + mousePos.y * 100}%, white, transparent)`,
        }}
      />

      {/* Card Content */}
      <div className="transform translate-z-10">
        <div className="flex items-start justify-between mb-6">
          <span className={`text-xs font-mono ${colors.text} tracking-widest uppercase`}>
            {project.subtitle}
          </span>
          <span className="text-4xl font-extrabold text-foreground/5">
            0{index + 1}
          </span>
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-4 tracking-tight leading-none">
          {project.title}
        </h3>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed line-clamp-3">
          {project.description}
        </p>
      </div>

      <div className="mt-auto transform translate-z-10">
        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className={`px-2 py-1 text-[10px] font-mono ${colors.bg} text-background font-medium`}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-foreground/5 pt-4">
          <span className="text-xs font-mono text-muted-foreground">{project.year}</span>
          <div className="flex gap-2">
            <span className={`text-xs font-bold ${colors.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
              VIEW PROJECT
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [expandedProject, setExpandedProject] = useState<typeof projects[0] | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      <div
        ref={ref as React.RefObject<HTMLDivElement>}
        className="w-full bg-transparent overflow-hidden py-32 relative min-h-[900px] flex flex-col items-center justify-center"
      >
        <div className="w-full max-w-7xl px-6 lg:px-12 flex flex-col items-center">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-24 z-10"
          >
            <h2 className="section-title text-center inline-block">WORK</h2>
            <h2 className="section-title-filled ml-4 inline-block">PORTFOLIO</h2>
            <p className="text-muted-foreground text-lg mt-8 max-w-2xl mx-auto">
              Hover to explore my digital craftsmanship. Click to dive deeper.
            </p>
          </motion.div>

          {/* Stack Container */}
          <div
            className="relative w-full h-[600px] flex items-center justify-center perspective-1000"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={index}
                total={projects.length}
                onSelect={() => setExpandedProject(project)}
                hovered={isHovered}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Expanded Project Modal */}
      <AnimatePresence>
        {expandedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/95 backdrop-blur-md"
            onClick={() => setExpandedProject(null)}
          >
            <motion.div
              layoutId={`card-${expandedProject.id}`}
              className={`w-full max-w-4xl bg-card border-2 ${colorClasses[expandedProject.color].border} p-12 relative ${colorClasses[expandedProject.color].glow} overflow-y-auto max-h-[90vh]`}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setExpandedProject(null)}
                className="absolute top-8 right-8 p-3 border border-foreground/10 text-foreground/50 hover:bg-foreground hover:text-background hover:border-foreground transition-all rounded-full"
              >
                <X size={20} />
              </button>

              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className={`text-sm font-mono ${colorClasses[expandedProject.color].text} tracking-widest uppercase`}>
                    {expandedProject.subtitle}
                  </span>
                  <h3 className="text-4xl md:text-6xl font-bold text-foreground mt-2">
                    {expandedProject.title}
                  </h3>
                </div>
              </div>

              <p className="text-xl text-muted-foreground mb-8 leading-relaxed max-w-3xl">
                {expandedProject.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-12">
                {expandedProject.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`px-6 py-3 text-xs font-mono ${colorClasses[expandedProject.color].bg} text-background font-bold`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={expandedProject.liveUrl}
                  className="px-8 py-4 bg-foreground text-background font-bold flex items-center gap-2 hover:bg-primary transition-all duration-300"
                >
                  <ExternalLink size={18} />
                  Live Demo
                </a>
                <a
                  href={expandedProject.githubUrl}
                  className="px-8 py-4 border-2 border-foreground/10 text-foreground font-bold flex items-center gap-2 hover:bg-foreground/5 transition-all duration-300"
                >
                  <Github size={18} />
                  Source Code
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
