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

          <main className="bg-background relative z-10">
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
