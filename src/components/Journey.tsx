import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { RevealText } from './SectionWrapper';

const journeyItems = [
  {
    year: '2025',
    title: 'Final Year Project',
    description: 'Leading development of an AI-powered campus management system.',
    color: 'currentColor',
  },
  {
    year: '2024',
    title: 'Software Engineering Intern',
    description: 'Contributed to production applications at a tech startup.',
    color: 'currentColor',
  },
  {
    year: '2023',
    title: 'Open Source Contributor',
    description: 'Started contributing to major open-source projects.',
    color: 'currentColor',
  },
  {
    year: '2022',
    title: 'B.Tech Computer Science',
    description: 'Enrolled in B.Tech program, began learning web development.',
    color: 'currentColor',
  },
];

export const Journey = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.7], ['0%', '100%']);

  return (
    <div
      ref={containerRef}
      className="w-full flex items-center bg-transparent overflow-hidden py-20"
    >
      <div
        ref={ref}
        className="w-full px-6 lg:px-12"
      >
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] tracking-tight">
            <RevealText className="text-foreground/20">Our</RevealText>
            <RevealText className="text-foreground">Journey</RevealText>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Animated Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[4px] bg-foreground/5 md:-translate-x-1/2 overflow-hidden rounded-full">
            <motion.div
              className="w-full bg-foreground shadow-[0_0_20px_hsl(var(--foreground)/0.2)]"
              style={{ height: lineHeight }}
            />
          </div>

          {/* Timeline Items */}
          <div className="space-y-24">
            {journeyItems.map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col md:gap-12`}
              >
                {/* Node */}
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 z-10">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ duration: 0.4, delay: index * 0.15 + 0.3 }}
                    className="w-4 h-4 rounded-full border-2 bg-background"
                    style={{ borderColor: item.color }}
                  />
                </div>

                {/* Content */}
                <div className={`md:w-1/2 pl-12 md:pl-0 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                  <span className="text-3xl md:text-4xl font-extrabold" style={{ color: item.color }}>
                    {item.year}
                  </span>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground mt-2 mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
