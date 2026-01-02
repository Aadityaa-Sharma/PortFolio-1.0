interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  isFirst?: boolean;
}

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
