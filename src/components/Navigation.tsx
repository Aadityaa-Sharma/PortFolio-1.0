import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, Instagram, FileText } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Magnetic } from './Magnetic';
import socialsData from '@/data/socials.json';

const navLinks = [
  { name: 'HOME', href: '#hero' },
  { name: 'WORK', href: '#projects' },
  { name: 'ABOUT', href: '#about' },
  { name: 'SKILLS', href: '#skills' },
  { name: 'JOURNEY', href: '#journey' },
  { name: 'SOCIALS', href: '#socials' },
  { name: 'CONTACT', href: '#contact' },
];

export const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const githubUrl = socialsData.links.find(l => l.id === 'github')?.url;
  const linkedinUrl = socialsData.links.find(l => l.id === 'linkedin')?.url;
  const instaUrl = socialsData.links.find(l => l.id === 'insta')?.url;
  const resumeUrl = socialsData.links.find(l => l.id === 'resume')?.url;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Use a smaller threshold or check for isIntersecting with a custom rootMargin
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        // rootMargin: '-20% 0px -70% 0px' creates a "focus zone" about 30% from the top
        rootMargin: '-10% 0px -40% 0px',
        threshold: 0
      }
    );

    document.querySelectorAll('section[id], div[id]').forEach((el) => {
      if (navLinks.some(link => link.href === `#${el.id}`)) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'bg-background/80 backdrop-blur-xl border-b border-foreground/5' : 'bg-transparent'
          }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex items-center gap-8">
              <motion.a
                layoutId="main-logo"
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('#hero');
                }}
                className="text-2xl font-extrabold text-foreground tracking-tighter"
                whileHover={{ scale: 1.05 }}
                transition={{
                  layout: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
                }}
              >
                <span className="text-primary">[</span>
                AS
                <span className="text-primary">]</span>
              </motion.a>

              {/* Social Icons - Desktop */}
              <div className="hidden lg:flex items-center gap-4 pl-8 border-l border-foreground/10">
                {githubUrl && (
                  <Magnetic>
                    <motion.a
                      href={githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/50 hover:text-primary transition-colors"
                      whileHover={{ y: -2 }}
                    >
                      <Github size={18} />
                    </motion.a>
                  </Magnetic>
                )}
                {linkedinUrl && (
                  <Magnetic>
                    <motion.a
                      href={linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/50 hover:text-primary transition-colors"
                      whileHover={{ y: -2 }}
                    >
                      <Linkedin size={18} />
                    </motion.a>
                  </Magnetic>
                )}
                {instaUrl && (
                  <Magnetic>
                    <motion.a
                      href={instaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground/50 hover:text-primary transition-colors"
                      whileHover={{ y: -2 }}
                    >
                      <Instagram size={18} />
                    </motion.a>
                  </Magnetic>
                )}
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className={`relative text-xs font-mono tracking-widest transition-colors py-2 ${activeSection === link.href.substring(1)
                      ? 'text-primary font-bold'
                      : 'text-foreground/70 hover:text-foreground'
                      }`}
                    whileHover={{ y: -2 }}
                  >
                    {link.name}
                    {activeSection === link.href.substring(1) && (
                      <motion.div
                        layoutId="nav-active"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </motion.a>
                ))}
              </div>

              <div className="flex items-center gap-6 pl-4 border-l border-foreground/10">
                <ThemeToggle />
                {resumeUrl && (
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-minimal !py-2 !px-4 !text-[10px]"
                  >
                    RESUME
                  </a>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-4 md:hidden">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-foreground p-2"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at top right)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at top right)' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 bg-background z-40 md:hidden flex flex-col items-center justify-center p-8"
          >
            <div className="flex flex-col items-center gap-8 mb-12">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 + 0.1 }}
                  className="text-3xl font-extrabold text-foreground tracking-tight"
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            {/* Mobile Socials & Resume */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-8 w-full border-t border-foreground/5 pt-8"
            >
              <div className="flex items-center gap-8">
                {githubUrl && <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary"><Github size={24} /></a>}
                {linkedinUrl && <a href={linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary"><Linkedin size={24} /></a>}
                {instaUrl && <a href={instaUrl} target="_blank" rel="noopener noreferrer" className="text-foreground/50 hover:text-primary"><Instagram size={24} /></a>}
              </div>

              {resumeUrl && (
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-minimal w-full text-center"
                >
                  DOWNLOAD RESUME
                </a>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
