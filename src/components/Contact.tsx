import { Footer } from './Footer';
import socialsData from '@/data/socials.json';
import { SocialsData } from '@/types';

const data = socialsData as unknown as SocialsData;
const resumeLink = data.links.find(link => link.id === 'resume')?.url || '#';

export const Contact = () => {
  return (
    <div className="relative w-full py-32 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-5xl md:text-7xl lg:text-[10rem] font-heading font-bold leading-[0.85] tracking-tight">
            <span className="text-foreground/20">Let's</span>
            <br />
            <span className="gradient-text">Talk.</span>
          </h2>
        </div>

        <div className="max-w-2xl space-y-10">
          <a
            href={`mailto:${data.email}`}
            className="block text-2xl md:text-3xl font-heading font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
          >
            <span className="border-b-2 border-primary/30 group-hover:border-primary pb-2 transition-colors">
              {data.email}
            </span>
            <span className="ml-4 text-primary">→</span>
          </a>

          <div className="flex flex-wrap gap-6">
            <a
              href={`mailto:${data.email}`}
              className="btn-minimal"
            >
              Start project
            </a>
            <a
              href={resumeLink}
              download
              className="btn-minimal-outline"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-40 border-t border-border pt-12">
          <Footer isEmbedded />
        </div>
      </div>
    </div>
  );
};
