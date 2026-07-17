"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useHPOE } from "./HPOE";

/**
 * Gold hairline reading progress bar pinned above the header.
 * HPOE ladder: high = springy premium tracking, mid/low = the same gradient
 * bar with direct linear tracking, very-low = none.
 */
export default function ScrollProgress() {
  const { tier, reducedMotion } = useHPOE();
  const { scrollYProgress } = useScroll();
  const sprung = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });

  if (reducedMotion || (tier !== "high" && tier !== "mid" && tier !== "low")) return null;

  return (
    <motion.div
      aria-hidden
      className={`fixed top-0 left-0 right-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-accent-dark via-accent to-accent-light ${
        tier === "high" ? "shadow-[0_0_10px_rgba(212,175,55,0.55)]" : ""
      }`}
      style={{ scaleX: tier === "high" ? sprung : scrollYProgress, willChange: "transform" }}
    />
  );
}
