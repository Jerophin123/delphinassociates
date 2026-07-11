"use client";

import ArchPlans from "../ui/ArchPlans";
import SheetWatermark from "../ui/SheetWatermark";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Timer,
  HardHat,
  MessageSquare,
  ClipboardCheck,
  LifeBuoy,
} from "lucide-react";
import { useHPOE } from "../HPOE";
import SpotlightCard from "../ui/SpotlightCard";
import GeometricParticleField from "../ui/GeometricParticleField";

const strengths = [
  {
    code: "W-01",
    icon: ShieldCheck,
    title: "First-Quality Standards",
    description:
      "Maintaining first-quality standards in all our projects, ensuring durability and excellence.",
  },
  {
    code: "W-02",
    icon: Timer,
    title: "Timely Completion",
    description:
      "Committed to timely completion of every work, respecting client deadlines and project schedules.",
  },
  {
    code: "W-03",
    icon: HardHat,
    title: "Technically Strong Team",
    description:
      "Highly experienced design and execution team with expertise across all construction domains.",
  },
  {
    code: "W-04",
    icon: MessageSquare,
    title: "Free Consultancy Support",
    description:
      "Providing free consultancy support for clients, helping them make informed decisions.",
  },
  {
    code: "W-05",
    icon: ClipboardCheck,
    title: "Transparent Execution",
    description:
      "Transparent execution and budgeting, ensuring clients are always informed and involved.",
  },
  {
    code: "W-06",
    icon: LifeBuoy,
    title: "Post-Completion Service",
    description:
      "Continuous service even after project completion, ensuring long-term satisfaction and support.",
  },
];

export default function OrganizationStrengths() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;
  const isStatic = tier === 'low' || tier === 'very-low' || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  return (
    <section data-header-theme="dark" className={`relative overflow-hidden py-14 sm:py-20 md:py-24 ${tier === 'very-low' ? 'bg-primary-dark' : 'bg-primary-dark/95'} border-t border-white/5`}>
      {/* Faint site grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <ArchPlans tone="dark" variant="foundation" />

      {/* Sheet-index watermark */}
      <SheetWatermark text="05" tone="light" />

      {isHigh && (
        <GeometricParticleField
          quantity={45}
          color="#D4AF37"
          className="z-[1]"
          staticity={60}
        />
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: noReveal ? 0 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display font-bold text-[11px] sm:text-xs text-accent/60 tracking-[0.25em] uppercase">Sheet 05&thinsp;/&thinsp;05</span>
            <span className="h-[2px] w-12 bg-accent"></span>
            <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
              Why Choose Us
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-[1.05]">
            <span className="text-white">Organization </span>
            <span className="text-outline-display">Strengths</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {strengths.map((strength, index) => {
            const Icon = strength.icon;
            return (
              <motion.div
                key={strength.code}
                initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: noReveal ? 0 : 0.6,
                  delay: noReveal ? 0 : index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="h-full"
              >
                <SpotlightCard
                  className={`group relative flex flex-col h-full p-5 sm:p-7 rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden ${
                    isHigh
                      ? 'liquid-glass-card-dark premium-card-hover-shine'
                      : tier === 'mid'
                      ? 'mid-glass-card-dark'
                      : tier === 'very-low'
                      ? 'bg-black'
                      : 'bg-black/50'
                  } ${
                    isStatic
                      ? ''
                      : 'transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1.5'
                  }`}
                >
                  <span className="flex items-start justify-between mb-6 sm:mb-8">
                    <span
                      className={`font-display font-bold text-lg sm:text-xl tracking-[0.1em] text-accent/50 ${
                        isStatic ? '' : 'transition-colors duration-500 group-hover:text-accent'
                      }`}
                      aria-hidden
                    >
                      {strength.code}
                    </span>
                    <span
                      className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl shrink-0 border ${
                        tier === 'very-low'
                          ? 'bg-accent border-accent'
                          : `bg-white/5 border-white/10 ${isStatic ? '' : 'transition-colors duration-500 group-hover:bg-accent/10 group-hover:border-accent/40'}`
                      }`}
                      aria-hidden
                    >
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${tier === 'very-low' ? 'text-black' : `text-white ${isStatic ? '' : 'group-hover:text-accent transition-colors duration-300'}`}`} />
                    </span>
                  </span>

                  <h3 className={`text-lg sm:text-xl font-bold text-white leading-tight mb-3 ${isStatic ? '' : 'transition-colors duration-300 group-hover:text-accent'}`}>
                    {strength.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed mt-auto">
                    {strength.description}
                  </p>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
