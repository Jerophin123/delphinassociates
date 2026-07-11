"use client";

import ArchPlans from "../ui/ArchPlans";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useHPOE } from "../HPOE";
import GeometricParticleField from "../ui/GeometricParticleField";
import ArrowLink from "../ui/ArrowLink";

export default function ServicesHero() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;
  const isStatic = tier === "low" || tier === "very-low" || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  const fadeUp = (delay: number) => ({
    initial: noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: noReveal ? 0 : 0.7,
      delay: noReveal ? 0 : delay,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  });

  return (
    <section
      id="services-hero"
      data-header-theme="light"
      className="relative overflow-hidden bg-[#fdfbf4] border-b border-black/5 min-h-[calc(100dvh-5rem)] flex flex-col"
    >
      {/* Drafting-paper ruling */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(18,18,18,0.045) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(18,18,18,0.045) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Drafting margin rule */}
      <span aria-hidden className="absolute left-6 sm:left-12 top-0 bottom-0 w-px bg-accent/25 pointer-events-none" />

      <ArchPlans tone="light" variant="villa" />

      {isHigh && (
        <GeometricParticleField
          quantity={40}
          color="#9C7B1E"
          className="z-[1] opacity-50"
          staticity={60}
        />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-14 lg:px-16 py-14 sm:py-16 flex-1 flex flex-col justify-center">
        <motion.div {...fadeUp(0.05)} className="flex items-center gap-3 mb-6">
          <span className="font-display font-bold text-[11px] sm:text-xs text-accent-dark/70 tracking-[0.25em] uppercase">Service Register</span>
          <span className="h-[2px] w-12 bg-accent"></span>
          <span className="text-accent-dark text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
            Our Expertise
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.15)}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display tracking-tight leading-[1.08] mb-6"
        >
          <span className="block text-primary-dark">Construction &amp;</span>
          <span className="block text-outline-ink">Consultancy</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.28)}
          className="max-w-2xl text-base sm:text-lg text-gray-500 leading-relaxed font-light mb-9 sm:mb-11"
        >
          Comprehensive solutions tailored to residential, industrial, commercial, institutional, and church project needs.
          We build with transparency, quality, and timely execution.
        </motion.p>

        <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center gap-x-12 gap-y-6">
          <ArrowLink href="tel:+919841243345" tone="onLight" icon={<Phone className="w-full h-full" />}>
            Call Us Now
          </ArrowLink>
          <ArrowLink href="/contact" tone="onLight" outline>
            Get a Quote
          </ArrowLink>
        </motion.div>
      </div>
    </section>
  );
}
