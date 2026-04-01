"use client";

import { useRef, useState, ReactNode } from "react";
import { motion } from "framer-motion";
import { usePerformance } from "../PerformanceProvider";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string; // e.g. "rgba(212, 175, 55, 0.05)"
}

export default function SpotlightCard({ 
  children, 
  className = "", 
  spotlightColor = "rgba(212, 175, 55, 0.07)" 
}: SpotlightCardProps) {
  const { tier, reducedMotion } = usePerformance();
  const boxRef = useRef<HTMLDivElement>(null);
  
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  if (tier !== "high" || reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x, y });
    }
  };

  return (
    <div
      ref={boxRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Sharp Dynamic Glass Glare */}
      <motion.div
        className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-[500ms]"
        style={{ opacity: isHovered ? 1 : 0 }}
      >
        <div
          className="absolute inset-0 z-10 mix-blend-overlay"
          style={{
            background: boxRef.current 
              ? `linear-gradient(105deg, transparent ${(mousePosition.x / boxRef.current.clientWidth) * 50}%, rgba(255, 255, 255, 0.4) ${(mousePosition.x / boxRef.current.clientWidth) * 100}%, transparent ${(mousePosition.x / boxRef.current.clientWidth) * 150 + 20}%)`
              : 'none',
          }}
        />
        {/* Secondary localized reflection */}
        <div
          className="absolute inset-0 z-10 mix-blend-screen"
          style={{
            background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.15), transparent 40%)`,
          }}
        />
      </motion.div>
      
      {/* Content */}
      <div className="relative z-20 h-full w-full">
        {children}
      </div>
    </div>
  );
}
