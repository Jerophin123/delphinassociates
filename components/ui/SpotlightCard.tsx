"use client";

import { useRef, useState, ReactNode, forwardRef, ForwardedRef } from "react";
import { motion } from "framer-motion";
import { useHPOE } from "../HPOE";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string; // e.g. "rgba(212, 55, 0.05)" - kept for API compat
}

const SpotlightCard = forwardRef(function SpotlightCard(
  { children, className = "" }: SpotlightCardProps,
  forwarded: ForwardedRef<HTMLDivElement>
) {
  const { tier, reducedMotion } = useHPOE();
  const boxRef = useRef<HTMLDivElement>(null);

  const setRefs = (node: HTMLDivElement | null) => {
    boxRef.current = node;
    if (typeof forwarded === "function") forwarded(node);
    else if (forwarded) forwarded.current = node;
  };

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0, ratio: 0 });
  const [isHovered, setIsHovered] = useState(false);

  if (tier !== "high" || reducedMotion) {
    return (
      <div ref={setRefs} className={className}>
        {children}
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const ratio = boxRef.current.clientWidth > 0 ? x / boxRef.current.clientWidth : 0;
      setMousePosition({ x, y, ratio });
    }
  };

  return (
    <div
      ref={setRefs}
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
            background: isHovered
              ? `linear-gradient(105deg, transparent ${mousePosition.ratio * 50}%, rgba(255, 255, 255, 0.4) ${mousePosition.ratio * 100}%, transparent ${mousePosition.ratio * 150 + 20}%)`
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
});

export default SpotlightCard;
