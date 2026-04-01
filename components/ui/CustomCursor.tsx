"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePerformance } from "../PerformanceProvider";

export default function CustomCursor() {
  const { tier, reducedMotion, isInitialized } = usePerformance();
  const [isVisible, setIsVisible] = useState(false);
  
  // Start off-screen
  const cursorX = useMotionValue(-1000);
  const cursorY = useMotionValue(-1000);
  
  // Highly constrained spring for a solid, direct, professional tracking sensation
  const springConfig = { damping: 28, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only enable glow on fully initialized High-Tier machines
    if (!isInitialized || tier !== "high" || reducedMotion) return;

    let isMouseDetected = false;

    const moveCursor = (e: MouseEvent) => {
      if (!isMouseDetected) {
        setIsVisible(true);
        isMouseDetected = true;
      }
      cursorX.set(e.clientX - 200); // Offset by half the width (400px / 2)
      cursorY.set(e.clientY - 200); // Offset by half the height (400px / 2)
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", moveCursor, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [tier, reducedMotion, isInitialized, cursorX, cursorY]);

  // Completely destroy payload on non-high devices
  if (tier !== "high" || reducedMotion) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[9999] h-[400px] w-[400px] rounded-full will-change-transform"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        opacity: isVisible ? 1 : 0,
        // Increased base opacity and removed screen blending so it stacks visibly on white and black backgrounds
        background: "radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, rgba(212, 175, 55, 0.04) 35%, transparent 70%)",
      }}
      transition={{ opacity: { duration: 0.8 } }}
    />
  );
}
