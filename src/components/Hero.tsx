import { Mail } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import heroData from '@/data/hero.json';
import { Magnetic } from './Magnetic';
import { useEffect, useState } from 'react';

// Morphing Mesh Gradient Component - Optimized for Performance
const MorphingMesh = () => {
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    // Using springs for smoother, throttled movement without React re-renders
    const springX = useSpring(mouseX, { stiffness: 30, damping: 40 });
    const springY = useSpring(mouseY, { stiffness: 30, damping: 40 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set(e.clientX / window.innerWidth);
            mouseY.set(e.clientY / window.innerHeight);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    // Derived transforms for varied orb movement
    const orb1X = useTransform(springX, [0, 1], [-50, 50]);
    const orb1Y = useTransform(springY, [0, 1], [-50, 50]);

    const orb2X = useTransform(springX, [0, 1], [60, -60]);
    const orb2Y = useTransform(springY, [0, 1], [60, -60]);

    const orb3X = useTransform(springY, [0, 1], [-40, 40]);
    const orb3Y = useTransform(springX, [0, 1], [40, -40]);

    return (
        <div className="absolute inset-0 z-0 overflow-hidden bg-background pointer-events-none">
            {/* Layered Mesh Orbs - Reduced blur and optimized with will-change */}
            <motion.div
                style={{ x: orb1X, y: orb1Y, willChange: 'transform' }}
                className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-foreground/10 blur-[80px] mix-blend-overlay opacity-40 dark:opacity-20"
            />
            <motion.div
                style={{ x: orb2X, y: orb2Y, willChange: 'transform' }}
                className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-foreground/5 blur-[100px] mix-blend-overlay opacity-40 dark:opacity-20"
            />
            <motion.div
                style={{ x: orb3X, y: orb3Y, willChange: 'transform' }}
                className="absolute top-[20%] right-[10%] w-[40%] h-[40%] rounded-full bg-foreground/5 blur-[60px] mix-blend-overlay opacity-30 dark:opacity-10"
            />

            {/* Noise Texture for High-Fidelity feel - Static Rect */}
            <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <filter id="meshNoise">
                        <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                    </filter>
                    <rect width="100%" height="100%" filter="url(#meshNoise)" />
                </svg>
            </div>
        </div>
    );
};

export const Hero = () => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { stiffness: 40, damping: 30 });
    const smoothY = useSpring(mouseY, { stiffness: 40, damping: 30 });

    // Stronger parallax for the Bold Typography
    const titleX = useTransform(smoothX, [-500, 500], [40, -40]);
    const titleY = useTransform(smoothY, [-500, 500], [20, -20]);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set(clientX - innerWidth / 2);
        mouseY.set(clientY - innerHeight / 2);
    };

    return (
        <div
            className="relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-background"
            onMouseMove={handleMouseMove}
        >
            <MorphingMesh />

            <div className="relative z-20 w-full max-w-[1800px] mx-auto px-8 lg:px-24">

                {/* Minimalist Status Bar */}
                <div className="flex items-center justify-between mb-24 opacity-60">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-6"
                    >
                        <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_10px_hsl(var(--primary)/0.5)]" />
                            <span className="text-[10px] font-mono uppercase tracking-[0.3em]">System_Active</span>
                        </div>
                        <div className="h-px w-12 bg-foreground/10" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.3em] hidden sm:block">Availability: 2024_Open</span>
                    </motion.div>
                </div>

                {/* Main Content: Bold Brutalist Typography */}
                <div className="relative grid lg:grid-cols-[1.5fr_1fr] gap-20 items-end">

                    <motion.div style={{ x: titleX, y: titleY }} className="cursor-default select-none">
                        <h1 className="font-heading font-black tracking-[-0.05em] leading-[0.8] uppercase flex flex-col">
                            <motion.span
                                initial={{ opacity: 0, y: 150 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                className="block text-[18vw] lg:text-[14vw] text-foreground/10 -mb-[2vw]"
                                style={{
                                    WebkitTextStroke: '2px hsl(var(--foreground) / 0.35)',
                                    filter: 'drop-shadow(0 0 40px hsl(var(--foreground) / 0.1))'
                                }}
                            >
                                ADITYA
                            </motion.span>
                            <motion.span
                                initial={{ opacity: 0, y: 150 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1.2, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                                className="text-[18vw] lg:text-[14vw] text-foreground"
                            >
                                SHARMA
                            </motion.span>
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="space-y-12 pb-8"
                    >
                        <div className="space-y-6 max-w-md">
                            <p className="text-2xl lg:text-3xl font-heading font-bold text-foreground tracking-tight leading-none uppercase">
                                {heroData.title}
                            </p>
                            <p className="text-sm font-body text-muted-foreground leading-relaxed">
                                {heroData.description}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-6">
                            <Magnetic>
                                <a
                                    href={heroData.cta.primary.link}
                                    className="group relative inline-flex items-center justify-center px-10 py-5 bg-foreground text-background font-mono text-xs font-bold uppercase tracking-[0.2em] transition-transform duration-300 hover:scale-105"
                                >
                                    <div className="absolute inset-0 border border-foreground translate-x-1.5 translate-y-1.5 transition-transform group-hover:translate-x-0 group-hover:translate-y-0" />
                                    <span className="relative z-10">{heroData.cta.primary.text}</span>
                                </a>
                            </Magnetic>
                            <Magnetic>
                                <a
                                    href={heroData.cta.secondary.link}
                                    className="group relative inline-flex items-center justify-center px-10 py-5 border border-foreground/20 font-mono text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-foreground/5"
                                >
                                    <span className="text-foreground/60 group-hover:text-foreground transition-colors">{heroData.cta.secondary.text}</span>
                                </a>
                            </Magnetic>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Cinematic Scroll Indicator */}
            <div className="absolute bottom-12 right-12 flex items-center gap-6">
                <span className="text-[10px] font-mono text-foreground/20 uppercase tracking-[0.6em] vertical-text transform rotate-180" style={{ writingMode: 'vertical-rl' }}>Scroll_To_Explore</span>
                <div className="w-px h-24 bg-gradient-to-t from-foreground/40 to-transparent" />
            </div>
        </div>
    );
};
