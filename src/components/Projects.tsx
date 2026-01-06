import { ProjectsCarousel } from './Projects/ProjectsCarousel';
import { RevealText } from './SectionWrapper';

export const Projects = () => {
  return (
    <div className="w-full py-32 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="mb-20">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] tracking-tight">
            <RevealText className="text-foreground/20">Selected</RevealText>
            <RevealText className="text-foreground">Work</RevealText>
          </h2>
        </div>

        <ProjectsCarousel />
      </div>
    </div>
  );
};
