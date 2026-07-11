"use client";

import { useRef, ReactNode, forwardRef, ForwardedRef } from "react";
import { useHPOE } from "../HPOE";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string; // e.g. "rgba(212, 55, 0.05)" - kept for API compat
}

/**
 * High-tier glass glare that follows the cursor. The overlays are mutated
 * directly via refs — holding the cursor position in React state re-rendered
 * the whole card (and its children) on every mouse move, which was a main
 * source of the jank that tripped the HPOE watchdog.
 */
const SpotlightCard = forwardRef(function SpotlightCard(
  { children, className = "" }: SpotlightCardProps,
  forwarded: ForwardedRef<HTMLDivElement>
) {
  const { tier, reducedMotion } = useHPOE();
  const boxRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  const setRefs = (node: HTMLDivElement | null) => {
    boxRef.current = node;
    if (typeof forwarded === "function") forwarded(node);
    else if (forwarded) forwarded.current = node;
  };

  if (tier !== "high" || reducedMotion) {
    return (
      <div ref={setRefs} className={className}>
        {children}
      </div>
    );
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (ticking.current) return;
    ticking.current = true;
    const { clientX, clientY } = e;
    window.requestAnimationFrame(() => {
      ticking.current = false;
      const box = boxRef.current;
      if (!box) return;
      const rect = box.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      const ratio = rect.width > 0 ? x / rect.width : 0;
      if (sweepRef.current) {
        sweepRef.current.style.background = `linear-gradient(105deg, transparent ${ratio * 50}%, rgba(255, 255, 255, 0.4) ${ratio * 100}%, transparent ${ratio * 150 + 20}%)`;
      }
      if (spotRef.current) {
        spotRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.15), transparent 40%)`;
      }
    });
  };

  const setGlareOpacity = (value: string) => {
    if (glareRef.current) glareRef.current.style.opacity = value;
  };

  return (
    <div
      ref={setRefs}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setGlareOpacity("1")}
      onMouseLeave={() => setGlareOpacity("0")}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Sharp Dynamic Glass Glare */}
      <div
        ref={glareRef}
        className="pointer-events-none absolute -inset-px z-10 transition-opacity duration-[500ms]"
        style={{ opacity: 0 }}
      >
        <div ref={sweepRef} className="absolute inset-0 z-10 mix-blend-overlay" />
        {/* Secondary localized reflection */}
        <div ref={spotRef} className="absolute inset-0 z-10 mix-blend-screen" />
      </div>

      {/* Content */}
      <div className="relative z-20 h-full w-full">{children}</div>
    </div>
  );
});

export default SpotlightCard;
