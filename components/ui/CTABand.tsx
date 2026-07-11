"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { useHPOE } from "../HPOE";
import GeometricParticleField from "./GeometricParticleField";

interface CTABandProps {
  id?: string;
  eyebrow: string;
  titleSolid: string;
  /** Rendered in the paper-filled, ink-stroked outline face */
  titleOutline?: string;
  lede: string;
  tickerPhrases: string[];
  /** ArrowLink actions (already tone="onGold") */
  actions: ReactNode;
  /** Optional row under the grid, e.g. contact emails */
  footer?: ReactNode;
}

function TickerBorder({
  position,
  animated,
  phrases,
}: {
  position: "top" | "bottom";
  animated: boolean;
  phrases: string[];
}) {
  return (
    <div
      className={`relative z-10 overflow-hidden ${position === "top" ? "border-b" : "border-t"} border-black/15`}
      aria-hidden
    >
      <div
        className={`flex whitespace-nowrap w-max py-2.5 sm:py-3 ${animated ? "animate-marquee-slow" : ""}`}
        style={{ willChange: animated ? "transform" : "auto" }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex items-center shrink-0">
            {phrases.map((phrase) => (
              <span
                key={`${copy}-${phrase}`}
                className="flex items-center text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-black/30"
              >
                <span className="w-1.5 h-1.5 rotate-45 bg-black/25 mx-5 sm:mx-8 shrink-0" />
                {phrase}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * The site's gold call-to-action band - drawing-sheet edition.
 * Ticker borders, ink ruling on gold, mixed solid/outline display heading,
 * editorial two-column layout. HPOE ladder: high = sheen sweep + particles,
 * mid = static vignette, low = reveals only, very-low = flat solid gold.
 */
export default function CTABand({
  id,
  eyebrow,
  titleSolid,
  titleOutline,
  lede,
  tickerPhrases,
  actions,
  footer,
}: CTABandProps) {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;
  const isStatic = tier === "low" || tier === "very-low" || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  return (
    <section
      id={id}
      data-header-theme="light"
      className={`relative overflow-hidden text-primary-dark ${
        tier === "very-low" || tier === "low"
          ? "bg-accent"
          : "bg-gradient-to-br from-[#E3C158] via-accent to-[#A8862B]"
      }`}
    >
      <TickerBorder position="top" animated={!isStatic} phrases={tickerPhrases} />

      {/* Ink ruling over the gold - ties the band into the sheet language */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(10,10,10,0.05) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(10,10,10,0.05) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      {/* High tier: sweeping sheen across the band */}
      {isHigh && (
        <motion.div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
            backgroundSize: "300% 100%",
            willChange: "background-position",
          }}
          animate={{ backgroundPosition: ["200% 0%", "-100% 0%"] }}
          transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
        />
      )}

      {isHigh && (
        <GeometricParticleField
          quantity={45}
          color="#0A0A0A"
          className="z-[1] opacity-40"
          staticity={55}
          ease={40}
        />
      )}

      {/* Mid tier: static depth vignette */}
      {tier === "mid" && !reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse at top left, rgba(255,255,255,0.25) 0%, transparent 55%), radial-gradient(ellipse at bottom right, rgba(10,10,10,0.18) 0%, transparent 55%)",
          }}
          aria-hidden
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 md:py-24">
        <div className="grid lg:grid-cols-2 items-center gap-10 lg:gap-16">
          <motion.div
            initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: noReveal ? 0 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="w-1.5 h-1.5 rotate-45 bg-primary-dark" aria-hidden />
              <span className="h-[2px] w-12 bg-primary-dark"></span>
              <span className="text-primary-dark text-sm font-bold tracking-[0.2em] uppercase">
                {eyebrow}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-primary-dark leading-[1.08]">
              {titleSolid}
              {titleOutline && (
                <>
                  {" "}
                  <span className="text-outline-on-gold">{titleOutline}</span>
                </>
              )}
            </h2>
            <p className="mt-6 text-black/70 font-light text-base sm:text-lg leading-relaxed max-w-xl">
              {lede}
            </p>
          </motion.div>

          <motion.div
            initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: noReveal ? 0 : 0.8, delay: noReveal ? 0 : 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-wrap gap-x-12 gap-y-6 lg:justify-end"
          >
            {actions}
          </motion.div>
        </div>

        {footer && (
          <motion.div
            initial={noReveal ? { opacity: 1 } : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: noReveal ? 0 : 0.8, delay: noReveal ? 0 : 0.3 }}
            className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-black/20"
          >
            {footer}
          </motion.div>
        )}
      </div>

      <TickerBorder position="bottom" animated={!isStatic} phrases={tickerPhrases} />
    </section>
  );
}
