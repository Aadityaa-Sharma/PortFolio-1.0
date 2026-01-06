import { useState } from 'react';
import techStackData from '@/data/techstack.json';
import themeData from '@/data/theme.json';
import { RevealText } from './SectionWrapper';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer, RadarProps } from 'recharts';
import './Skills.css';

export const Skills = () => {
  const [hoveredTech, setHoveredTech] = useState<string | null>(null);

  const radarData = techStackData.categories.map(cat => ({
    subject: cat.name.split(' ')[0],
    A: cat.id === 'frontend' ? 95 :
      cat.id === 'backend' ? 90 :
        cat.id === 'ai-ml' ? 85 :
          cat.id === 'languages' ? 92 : 88,
    fullMark: 100
  }));

  return (
    <div className="w-full py-32 overflow-hidden relative">
      <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
        {/* Section Header */}
        <div className="mb-20 text-center">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold leading-[0.9] tracking-tight">
            <RevealText className="text-foreground/20">Tech</RevealText>
            <RevealText className="text-foreground">Stack</RevealText>
          </h2>
        </div>

        {/* Radar Chart */}
        <div className="mb-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-3xl font-heading font-bold text-foreground">Skill Balance</h3>
            <p className="text-muted-foreground text-lg leading-relaxed font-body max-w-md">
              A visual representation of my proficiency across key technology domains.
              Always evolving and expanding my knowledge base.
            </p>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-sm font-mono text-foreground/70 uppercase">Proficiency</span>
              </div>
            </div>
          </div>

          <div className="glass-card !p-4 h-[400px] flex items-center justify-center overflow-hidden">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                <PolarAngleAxis
                  dataKey="subject"
                  tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12, fontWeight: 500 }}
                />
                <Radar
                  name="Skills"
                  dataKey="A"
                  stroke={`hsl(${themeData.colors.primary})`}
                  fill={`hsl(${themeData.colors.primary})`}
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
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
                          className="tech-logo w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110"
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
