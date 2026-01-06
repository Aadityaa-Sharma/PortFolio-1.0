import { motion } from 'framer-motion';
import socialsData from '@/data/socials.json';
import { Github, Linkedin, Instagram } from 'lucide-react';

const iconMap: Record<string, any> = {
  github: Github,
  linkedin: Linkedin,
  insta: Instagram,
};

export const Footer = ({ isEmbedded }: { isEmbedded?: boolean }) => {
  return (
    <div className={`${isEmbedded ? 'bg-transparent' : 'bg-background border-t border-foreground/5 py-12'}`}>
      <div className={`${isEmbedded ? '' : 'container mx-auto px-6 lg:px-12'}`}>
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Logo */}
          <div className="text-xl font-extrabold text-foreground tracking-tighter">
            <span className="text-primary">[</span>AS<span className="text-primary">]</span>
          </div>

          {/* Copyright */}
          <p className="text-sm font-mono text-muted-foreground text-center">
            © 2025 Aditya Sharma. Built with passion & caffeine ☕
          </p>

          {/* Social Icons */}
          <div className="flex gap-4">
            {socialsData.links.filter(l => iconMap[l.id]).map((link) => {
              const Icon = iconMap[link.id];
              return (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.platform}
                  className="p-2 text-foreground/50 hover:text-primary transition-colors duration-300"
                  whileHover={{ scale: 1.2, y: -2 }}
                >
                  <Icon size={20} strokeWidth={1.5} />
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
