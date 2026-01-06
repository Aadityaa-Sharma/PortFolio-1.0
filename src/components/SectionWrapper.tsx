import { motion } from 'framer-motion';

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  isFirst?: boolean;
}

export const RevealText = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%" }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export const SectionWrapper = ({ children, id, isFirst }: SectionWrapperProps) => {
  return (
    <section
      id={id}
      className={`relative w-full ${isFirst ? '' : ''}`}
    >
      {children}
    </section>
  );
};
