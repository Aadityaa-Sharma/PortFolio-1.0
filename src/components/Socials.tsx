import { Github, Linkedin, Twitter, Mail, Globe, FileText, Download, ExternalLink, LucideIcon, Instagram } from 'lucide-react';
import socialsData from '@/data/socials.json';
import { SocialsData } from '@/types';
import { RevealText } from './SectionWrapper';

const data = socialsData as unknown as SocialsData;

const iconMap: Record<string, LucideIcon> = {
  github: Github,
  linkedin: Linkedin,
  twitter: Twitter,
  mail: Mail,
  globe: Globe,
  'file-text': FileText,
  instagram: Instagram,
};

export const Socials = () => {
  return (
    <div className="w-full py-32 overflow-hidden relative">
      <div className="max-w-[1400px] px-8 lg:px-16 mx-auto">
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] tracking-tight">
            <RevealText className="text-foreground/20">Connect</RevealText>
            <RevealText className="text-foreground">With Me</RevealText>
          </h2>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
          {data.links.map((social) => {
            const Icon = iconMap[social.icon] || Globe;

            return (
              <a
                key={social.id}
                href={social.url}
                target={social.id === 'resume' ? '_self' : '_blank'}
                rel="noopener noreferrer"
                download={social.download || false}
                className="group glass-card !p-6 flex flex-col items-center justify-center gap-4 text-center hover:scale-105 transition-transform duration-300"
              >
                <div className="p-4 rounded-xl border border-foreground/10 group-hover:bg-foreground group-hover:border-foreground transition-all duration-300 shadow-sm">
                  <Icon size={24} className="text-foreground group-hover:text-background transition-colors" />
                </div>

                <span className="text-sm font-body font-medium text-foreground/80 group-hover:text-foreground transition-colors">
                  {social.platform}
                </span>

                {social.download && (
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Download size={12} />
                  </div>
                )}

                {!social.download && (
                  <div className="absolute top-3 right-3 p-2 rounded-full bg-primary/10 text-primary opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <ExternalLink size={12} />
                  </div>
                )}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
