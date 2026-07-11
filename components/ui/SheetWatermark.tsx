"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useHPOE } from "../HPOE";

interface SheetWatermarkProps {
  text: string;
  /** Ground the watermark sits on: "dark" stroke for paper sheets, "light" stroke for ink sheets */
  tone?: "dark" | "light";
}

/**
 * Sheet-index numeral with scroll-linked depth.
 * HPOE-graded: high = full parallax + subtle tilt, mid = half-range parallax, low/very-low = static.
 */
export default function SheetWatermark({ text, tone = "dark" }: SheetWatermarkProps) {
  const { tier, reducedMotion } = useHPOE();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"], layoutEffect: false });

  const factor = reducedMotion ? 0 : tier === "high" ? 1 : tier === "mid" ? 0.65 : 0;
  const y = useTransform(scrollYProgress, [0, 1], [105 * factor, -105 * factor]);
  // Tilt only registers at high tier - a drafting sheet settling into place
  const rotate = useTransform(scrollYProgress, [0, 1], [1.8 * (factor === 1 ? 1 : 0), -1.8 * (factor === 1 ? 1 : 0)]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={factor ? { y, rotate, willChange: "transform" } : undefined}
      className={`pointer-events-none select-none absolute -top-4 sm:top-2 right-3 sm:right-10 font-display font-bold leading-none text-[4.5rem] sm:text-[10rem] lg:text-[13rem] ${
        tone === "dark" ? "text-outline-dark" : "text-outline-light"
      }`}
    >
      {text}
    </motion.div>
  );
}
