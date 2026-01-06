import React, { useRef, ReactElement } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

interface MagneticProps {
    children: ReactElement;
}

export const Magnetic: React.FC<MagneticProps> = ({ children }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isTouchDevice, setIsTouchDevice] = React.useState(false);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const mouseX = useSpring(x, springConfig);
    const mouseY = useSpring(y, springConfig);

    React.useEffect(() => {
        // Detect touch device on mount
        setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        // Skip magnetic effect on touch devices
        if (isTouchDevice || !ref.current) return;

        const { clientX, clientY } = e;
        const { height, width, left, top } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const distanceX = clientX - centerX;
        const distanceY = clientY - centerY;

        x.set(distanceX * 0.3);
        y.set(distanceY * 0.3);
    };

    const handleMouseLeave = () => {
        if (isTouchDevice) return;
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ x: mouseX, y: mouseY, display: 'inline-block' }}
        >
            {children}
        </motion.div>
    );
};
