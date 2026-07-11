"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHPOE } from "../HPOE";

interface ParallaxFrameProps {
  children: ReactNode;
  /** Max drift in px at high tier (mid runs at 65%) */
  range?: number;
  className?: string;
}

/**
 * Scroll-linked drift for imagery inside an overflow-hidden frame.
 * HPOE ladder: high = full range, mid = 65%, low/very-low = static.
 * The oversized inset gives the drift room without exposing edges.
 */
export default function ParallaxFrame({ children, range = 42, className = "" }: ParallaxFrameProps) {
  const { tier, reducedMotion } = useHPOE();
  const factor = reducedMotion ? 0 : tier === "high" ? 1 : tier === "mid" ? 0.65 : 0;
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"], layoutEffect: false });
  const y = useTransform(scrollYProgress, [0, 1], [-range * factor, range * factor]);

  if (factor === 0) {
    return <div ref={ref} className={`absolute inset-0 ${className}`}>{children}</div>;
  }
  return (
    <motion.div ref={ref} className={`absolute inset-[-12%] ${className}`} style={{ y, willChange: "transform" }}>
      {children}
    </motion.div>
  );
}
