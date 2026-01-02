import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import projectsData from '@/data/projects.json';
import { ProjectsData } from '@/types';

const data = projectsData as unknown as ProjectsData;
const allProjects = [...data.featured, ...data.other];

export const ProjectsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const goToPrevious = () => {
        setCurrentIndex(currentIndex === 0 ? allProjects.length - 1 : currentIndex - 1);
    };

    const goToNext = () => {
        setCurrentIndex(currentIndex === allProjects.length - 1 ? 0 : currentIndex + 1);
    };

    useEffect(() => {
        const interval = setInterval(goToNext, 6000);
        return () => clearInterval(interval);
    }, [currentIndex]);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        const swipeDistance = touchStartX.current - touchEndX.current;
        if (Math.abs(swipeDistance) > 50) {
            if (swipeDistance > 0) goToNext();
            else goToPrevious();
        }
    };

    const currentProject = allProjects[currentIndex];

    return (
        <div
            className="relative max-w-[1200px] mx-auto"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Description & Links */}
                <div className="space-y-6 order-2 lg:order-1">
                    <div className="flex flex-wrap items-center gap-3 text-sm font-mono text-primary">
                        <span>{currentProject.category}</span>
                        <span className="w-1 h-1 rounded-full bg-primary" />
                        <span>{currentProject.year}</span>
                        {currentProject.role && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-primary" />
                                <span>{currentProject.role}</span>
                            </>
                        )}
                    </div>

                    <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
                        {currentProject.title}
                    </h3>

                    <p className="text-muted-foreground leading-relaxed font-body">
                        {currentProject.fullDescription || currentProject.shortDesc}
                    </p>

                    {/* Tech Tags */}
                    <div className="flex flex-wrap gap-2">
                        {currentProject.technologies.map((tech, i) => (
                            <span
                                key={i}
                                className="px-3 py-1.5 text-xs font-mono bg-muted text-foreground/80 rounded-lg border border-border"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>

                    <div className="flex flex-wrap gap-4 pt-4">
                        {/* Primary Button Strategy */}
                        {currentProject.deployed ? (
                            (currentProject.links?.live || currentProject.links?.demo) && (
                                <a
                                    href={currentProject.links.live || currentProject.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-glow flex items-center gap-2"
                                >
                                    <ExternalLink size={18} />
                                    Live Demo
                                </a>
                            )
                        ) : (
                            <div className="btn-outline opacity-50 cursor-default flex items-center gap-2">
                                <ExternalLink size={18} />
                                Run Locally
                            </div>
                        )}

                        {/* Always Display Source Code */}
                        {currentProject.links?.github && (
                            <a
                                href={currentProject.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline flex items-center gap-2"
                            >
                                <Github size={18} />
                                Source Code
                            </a>
                        )}
                    </div>
                </div>

                {/* Right: Image */}
                <div className="relative order-1 lg:order-2">
                    <div className="relative rounded-2xl overflow-hidden border border-border bg-card">
                        <img
                            src={currentProject.image}
                            alt={currentProject.title}
                            className="w-full aspect-video object-cover"
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/0a0a0f/00D9FF?text=Project';
                            }}
                        />
                        <div className="absolute bottom-4 right-4 text-5xl font-heading font-bold text-white/10">
                            {String(currentIndex + 1).padStart(2, '0')}
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="flex items-center justify-between mt-6">
                        <button
                            onClick={goToPrevious}
                            className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <div className="flex gap-2">
                            {allProjects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className={`transition-all duration-300 rounded-full ${currentIndex === index
                                        ? 'w-8 h-2 bg-primary'
                                        : 'w-2 h-2 bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                        }`}
                                />
                            ))}
                        </div>

                        <button
                            onClick={goToNext}
                            className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
