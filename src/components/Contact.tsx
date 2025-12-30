import { motion } from 'framer-motion';
import { useInView } from '@/hooks/useInView';
import { Footer } from './Footer';

export const Contact = () => {
  const { ref, isInView } = useInView({ threshold: 0.2 });

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="relative w-full flex items-center py-20 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, hsl(240, 10%, 8%) 0%, hsl(220, 30%, 12%) 100%)',
      }}
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute border border-primary/10"
            style={{
              width: `${300 + i * 200}px`,
              height: `${300 + i * 200}px`,
              right: `-${50 + i * 50}px`,
              top: '50%',
              transform: 'translateY(-50%)',
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 60 + i * 20, repeat: Infinity, ease: 'linear' }}
          />
        ))}
      </div>

      <div className="w-full px-6 lg:px-12 relative z-10">
        <div className="max-w-4xl">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="mb-12"
          >
            <h2 className="section-title">SAY HI</h2>
            <h2 className="section-title-filled">SAY HI</h2>
          </motion.div>

          {/* CTA Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-2xl md:text-4xl font-bold text-foreground mb-8 leading-relaxed">
              Got a project in mind? <br />
              <span className="gradient-text">Let's create something extraordinary together.</span>
            </p>

            <motion.a
              href="mailto:adityaasharm@gmail.com"
              className="inline-block text-xl md:text-2xl text-foreground link-underline mb-12"
              whileHover={{ x: 10 }}
            >
              adityaasharm@gmail.com →
            </motion.a>

            <div className="flex gap-4">
              <motion.a
                href="mailto:adityaasharm@gmail.com"
                className="btn-primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Start a Project
              </motion.a>
              <motion.a
                href="#"
                className="btn-outline"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Download CV
              </motion.a>
            </div>
          </motion.div>
        </div>

        {/* Integrated Footer */}
        <div className="mt-20 border-t border-white/5 pt-12">
          <Footer isEmbedded />
        </div>
      </div>
    </div>
  );
};
