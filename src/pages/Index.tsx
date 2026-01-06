import { useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Navigation } from '@/components/Navigation';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Projects } from '@/components/Projects';
import { Skills } from '@/components/Skills';
import { Journey } from '@/components/Journey';
import { Socials } from '@/components/Socials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { LoadingScreen } from '@/components/LoadingScreen';
import { SectionWrapper } from '@/components/SectionWrapper';

const Vines = () => {
  const { scrollYProgress } = useScroll();
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden opacity-[0.15]">
      <svg
        viewBox="0 0 100 1000"
        preserveAspectRatio="none"
        className="w-full h-[200vh]"
      >
        <motion.path
          d="M 10,0 Q 30,100 10,200 T 10,400 Q 30,500 10,600 T 10,800 Q 30,900 10,1000"
          fill="none"
          stroke="url(#vine-gradient)"
          strokeWidth="0.2"
          style={{ pathLength }}
        />
        <motion.path
          d="M 90,0 Q 70,100 90,200 T 90,400 Q 70,500 90,600 T 90,800 Q 70,900 90,1000"
          fill="none"
          stroke="url(#vine-gradient)"
          strokeWidth="0.2"
          style={{ pathLength }}
        />
        <defs>
          <linearGradient id="vine-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="50%" stopColor="#16a34a" />
            <stop offset="100%" stopColor="#15803d" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loader" onLoadingComplete={() => setIsLoading(false)} />
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <CustomCursor />
          <Navigation />
          <Vines />

          <main>
            <SectionWrapper id="hero" isFirst>
              <Hero />
            </SectionWrapper>

            <SectionWrapper id="projects">
              <Projects />
            </SectionWrapper>

            <SectionWrapper id="about">
              <About />
            </SectionWrapper>

            <SectionWrapper id="skills">
              <Skills />
            </SectionWrapper>

            <SectionWrapper id="journey">
              <Journey />
            </SectionWrapper>

            <SectionWrapper id="socials">
              <Socials />
            </SectionWrapper>

            <SectionWrapper id="contact">
              <Contact />
            </SectionWrapper>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Index;
