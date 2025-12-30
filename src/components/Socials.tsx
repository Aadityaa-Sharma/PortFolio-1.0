import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Github, Linkedin, Twitter, Mail, Dribbble, Figma } from 'lucide-react';

const socials = [
  { name: 'GitHub', icon: Github, url: '#', color: 'electric' },
  { name: 'LinkedIn', icon: Linkedin, url: '#', color: 'coral' },
  { name: 'Twitter', icon: Twitter, url: '#', color: 'acid' },
  { name: 'Email', icon: Mail, url: 'mailto:adityaasharm@gmail.com', color: 'violet' },
  { name: 'Dribbble', icon: Dribbble, url: '#', color: 'gold' },
  { name: 'Figma', icon: Figma, url: '#', color: 'electric' },
];

const colorMap: Record<string, { bg: string; border: string }> = {
  electric: { bg: 'group-hover:bg-electric', border: 'group-hover:border-electric' },
  coral: { bg: 'group-hover:bg-coral', border: 'group-hover:border-coral' },
  acid: { bg: 'group-hover:bg-acid', border: 'group-hover:border-acid' },
  violet: { bg: 'group-hover:bg-violet', border: 'group-hover:border-violet' },
  gold: { bg: 'group-hover:bg-gold', border: 'group-hover:border-gold' },
};

export const Socials = () => {
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
          <h2 className="section-title">LINKS</h2>
          <h2 className="section-title-filled">LINKS</h2>
        </motion.div>

        {/* Social Cards Grid */}
        <div className="flex flex-wrap gap-6 justify-center lg:justify-start">
          {socials.map((social, index) => (
            <motion.a
              key={social.name}
              href={social.url}
              target={social.url.startsWith('mailto') ? undefined : '_blank'}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40, rotate: -5 }}
              animate={isInView ? { opacity: 1, y: 0, rotate: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -15, rotate: 3 }}
              className={`social-card group border ${colorMap[social.color].border}`}
              style={{ marginTop: index % 2 === 1 ? '30px' : '0' }}
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${colorMap[social.color].bg}`} />
              <social.icon className="relative z-10 w-10 h-10 text-foreground group-hover:text-background transition-colors duration-300" />
              <span className="relative z-10 text-sm font-mono text-foreground group-hover:text-background transition-colors duration-300">
                {social.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  );
};
