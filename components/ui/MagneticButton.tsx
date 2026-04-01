"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { usePerformance } from "../PerformanceProvider";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  pullScale?: number; // How strong the pull is. Default 0.15 for subtle business feel
}

export default function MagneticButton({ children, className = "", pullScale = 0.15 }: MagneticButtonProps) {
  const { tier, reducedMotion } = usePerformance();
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (tier !== "high" || reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * pullScale, y: middleY * pullScale });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 30, mass: 0.8 }} // Very tight spring for grounded feel
      className={className}
    >
      {children}
    </motion.div>
  );
}
