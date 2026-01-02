import { useState } from 'react';
import techStackData from '@/data/techstack.json';
import './Skills.css';

export const Skills = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  return (
    <div className="w-full py-32 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] tracking-tight">
            <span className="text-foreground/20">Tech</span>
            <br />
            <span className="text-foreground">Stack</span>
          </h2>
        </div>

        {/* Tech Categories */}
        <div className="space-y-16">
          {techStackData.categories.map((category) => (
            <div key={category.id}>
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-lg font-heading font-semibold text-foreground/60 uppercase tracking-wider">
                  {category.name}
                </h3>
                <div className="h-[1px] flex-grow bg-border" />
              </div>

              {/* Tech Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4">
                {category.technologies.map((tech) => {
                  const isHovered = hoveredTech === tech.name;

                  return (
                    <div
                      key={tech.name}
                      className={`tech-tile ${isHovered ? 'hovered' : ''}`}
                      onMouseEnter={() => setHoveredTech(tech.name)}
                      onMouseLeave={() => setHoveredTech(null)}
                    >
                      {/* Growing bush vines - all corners */}
                      <div className="vine vine-tl" />
                      <div className="vine vine-tr" />
                      <div className="vine vine-bl" />
                      <div className="vine vine-br" />

                      {/* Content */}
                      <div className="relative z-10 text-center flex flex-col items-center gap-3">
                        <img
                          src={tech.logo}
                          alt={tech.name}
                          className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                        <span className="text-sm font-body text-foreground/70">
                          {tech.name}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
