"use client";

import ArchPlans from "../ui/ArchPlans";
import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { useHPOE } from "../HPOE";
import GeometricParticleField from "../ui/GeometricParticleField";
import ArrowLink from "../ui/ArrowLink";
import projectsData from "@/data/projects.json";

export default function ProjectsHero() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;
  const isStatic = tier === "low" || tier === "very-low" || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  const projects = projectsData as Array<{ category: string }>;
  const sectorCount = new Set(projects.map((p) => p.category)).size;

  const heroStats = [
    { value: "100+", label: "Projects Completed" },
    { value: `${sectorCount}`, label: "Sectors Covered" },
    { value: "TN", label: "Chennai & Tamil Nadu" },
  ];

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
      id="projects-hero"
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

      <ArchPlans tone="light" variant="siteplan" />

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
          <span className="font-display font-bold text-[11px] sm:text-xs text-accent-dark/70 tracking-[0.25em] uppercase">Project Register</span>
          <span className="h-[2px] w-12 bg-accent"></span>
          <span className="text-accent-dark text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
            Our Portfolio
          </span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.15)}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight leading-[1.05] mb-6"
        >
          <span className="block text-primary-dark">Our</span>
          <span className="block text-outline-ink">Projects</span>
        </motion.h1>

        <motion.p
          {...fadeUp(0.28)}
          className="max-w-2xl text-base sm:text-lg text-gray-500 leading-relaxed font-light mb-9 sm:mb-11"
        >
          Showcasing our excellence in construction across multiple sectors built with quality,
          transparency, and on-time execution.
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

      {/* Full-width stats band - pinned to the sheet's bottom edge */}
      <div className="relative z-10 border-t border-black/10 mt-auto">
        <div className="max-w-7xl mx-auto px-6 sm:px-14 lg:px-16 grid grid-cols-1 sm:grid-cols-3">
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              {...fadeUp(0.5 + index * 0.1)}
              className={`group py-7 sm:py-9 px-4 sm:px-8 ${index > 0 ? 'sm:border-l border-t sm:border-t-0 border-black/10' : ''}`}
            >
              <span className={`block text-3xl sm:text-4xl font-display font-bold tracking-tight text-primary-dark ${isStatic ? '' : 'transition-colors duration-500 group-hover:text-accent-dark'}`}>
                {stat.value}
              </span>
              <span className="block mt-2 text-[10px] sm:text-xs text-gray-500 font-bold tracking-[0.2em] uppercase">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
