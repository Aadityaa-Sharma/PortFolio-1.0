import aboutData from '@/data/about.json';
import { AboutData } from '@/types';
import { motion } from 'framer-motion';
import { RevealText } from './SectionWrapper';

const data = aboutData as unknown as AboutData;

export const About = () => {
  return (
    <div className="w-full py-32 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] tracking-tight">
            <RevealText className="text-foreground/20">About</RevealText>
            <RevealText className="text-foreground">Me</RevealText>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Bio */}
          <div className="space-y-8">
            <p className="text-2xl lg:text-3xl font-heading font-medium text-foreground leading-snug">
              {data.bio.intro}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed font-body">
              {data.bio.journey}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed font-body">
              {data.bio.current}
            </p>
          </div>

          {/* Stats Grid */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {Object.entries(data.stats).map(([key, value]) => (
              <motion.div
                key={key}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
                className="glass-card text-center flex flex-col justify-center py-6"
              >
                <div className="text-4xl md:text-5xl font-heading font-bold gradient-text mb-2">
                  {value}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider font-mono">
                  {key}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Education Section - Always Visible */}
        <div className="mt-24">
          <h3 className="text-2xl font-heading font-bold mb-10 text-foreground/60">Education</h3>
          <div className="space-y-0">
            {data.education.map((edu, index) => (
              <div
                key={index}
                className="flex flex-col lg:flex-row lg:items-center justify-between py-6 border-b border-border hover:bg-muted/20 transition-colors px-4 -mx-4 rounded-lg"
              >
                <div className="flex-1">
                  <h4 className="text-xl font-heading font-semibold text-foreground">{edu.degree}</h4>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-muted-foreground font-body">
                    <span>{edu.institution}</span>
                    {edu.location && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-border" />
                        <span className="text-sm italic">{edu.location}</span>
                      </>
                    )}
                  </div>
                  {edu.specialization && (
                    <p className="text-sm text-primary font-mono mt-1">{edu.specialization}</p>
                  )}
                </div>
                <div className="flex items-center gap-6 mt-4 lg:mt-0">
                  {edu.cgpa && (
                    <div className="text-center">
                      <div className="text-lg font-heading font-bold text-primary">{edu.cgpa}</div>
                      <div className="text-xs text-muted-foreground font-mono">CGPA</div>
                    </div>
                  )}
                  {edu.percentage && (
                    <div className="text-center">
                      <div className="text-lg font-heading font-bold text-primary">{edu.percentage}</div>
                      <div className="text-xs text-muted-foreground font-mono">Score</div>
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-sm font-mono text-muted-foreground">
                      {edu.duration || edu.year}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="mt-16">
          <h3 className="text-2xl font-heading font-bold mb-8 text-foreground/60">Highlights</h3>
          <motion.div
            className="grid md:grid-cols-2 gap-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } }
            }}
          >
            {data.highlights.map((highlight, idx) => (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                className="flex items-start gap-4 p-4 rounded-xl border border-border hover:border-primary/30 transition-colors"
              >
                <span className="w-2 h-2 mt-2 rounded-full bg-primary flex-shrink-0" />
                <span className="text-foreground/80 font-body">{highlight}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
