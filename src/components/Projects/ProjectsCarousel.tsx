import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Github } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import projectsData from '@/data/projects.json';
import { ProjectsData } from '@/types';

const data = projectsData as unknown as ProjectsData;
const allProjects = [...data.featured, ...data.other];

export const ProjectsCarousel = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    // 3D Tilt Motion Values
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
    const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseXRelative = (e.clientX - rect.left) / width - 0.5;
        const mouseYRelative = (e.clientY - rect.top) / height - 0.5;
        x.set(mouseXRelative);
        y.set(mouseYRelative);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

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
        touchEndX.current = e.touches[0].clientX; // Reset endX to startX to prevent ghost swipes
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e: React.TouchEvent) => {
        const swipeDistance = touchStartX.current - touchEndX.current;
        const swipeThreshold = 70; // Increased threshold for stability

        if (Math.abs(swipeDistance) > swipeThreshold) {
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
                                    className="btn-minimal flex items-center gap-2"
                                >
                                    <ExternalLink size={18} />
                                    Live demo
                                </a>
                            )
                        ) : (
                            <div className="btn-minimal-outline opacity-50 cursor-default flex items-center gap-2">
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
                                className="btn-minimal-outline flex items-center gap-2"
                            >
                                <Github size={18} />
                                Source Code
                            </a>
                        )}
                    </div>
                </div>

                <div className="relative order-1 lg:order-2" style={{ perspective: 1000 }}>
                    <motion.div
                        className="relative rounded-2xl overflow-hidden border border-border bg-card group cursor-pointer"
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        style={{
                            rotateX,
                            rotateY,
                            transformStyle: "preserve-3d"
                        }}
                    >
                        <motion.img
                            src={currentProject.image}
                            alt={currentProject.title}
                            className="w-full aspect-video object-cover"
                            style={{
                                transform: "translateZ(50px)"
                            }}
                            onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://placehold.co/600x400/000000/ffffff?text=Project';
                            }}
                        />
                        <div
                            className="absolute bottom-4 right-4 text-5xl font-heading font-bold text-white/10"
                            style={{
                                transform: "translateZ(30px)"
                            }}
                        >
                            {String(currentIndex + 1).padStart(2, '0')}
                        </div>
                    </motion.div>

                    {/* Control Bar - Arrows + Dots */}
                    <div className="flex items-center justify-center gap-6 mt-8">
                        {/* Prev Button */}
                        <button
                            onClick={goToPrevious}
                            className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors bg-card hover:bg-muted/50"
                            aria-label="Previous project"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Elastic Slider Indicator */}
                        <div className="flex gap-3 bg-muted/30 p-2 rounded-full backdrop-blur-sm border border-white/5">
                            {allProjects.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentIndex(index)}
                                    className="relative w-2.5 h-2.5 flex items-center justify-center outline-none"
                                >
                                    {/* Active Background Pill (Elastic) */}
                                    {currentIndex === index && (
                                        <motion.div
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-primary rounded-full"
                                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        />
                                    )}
                                    {/* Static Dot */}
                                    <div
                                        className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${currentIndex === index ? 'bg-transparent' : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>

                        {/* Next Button */}
                        <button
                            onClick={goToNext}
                            className="p-3 rounded-full border border-border hover:border-primary hover:text-primary transition-colors bg-card hover:bg-muted/50"
                            aria-label="Next project"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
