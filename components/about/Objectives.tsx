"use client";

import ArchPlans from "../ui/ArchPlans";
import SheetWatermark from "../ui/SheetWatermark";
import { motion } from "framer-motion";
import { Ruler, Handshake, Home } from "lucide-react";
import { useHPOE } from "../HPOE";
import SpotlightCard from "../ui/SpotlightCard";

const objectives = [
  {
    code: "O-01",
    icon: Ruler,
    title: "Design Economical & High-Quality Buildings",
    description:
      "Create structures that balance cost-effectiveness with superior quality, ensuring durability and structural excellence while adhering to client budgets.",
  },
  {
    code: "O-02",
    icon: Handshake,
    title: "Meet Client Expectations",
    description:
      "Deliver projects that exceed client expectations through precision planning, innovative design, and quality-driven execution for individuals and organizations.",
  },
  {
    code: "O-03",
    icon: Home,
    title: "Promote Excellence in Residential Projects",
    description:
      "Offer deluxe and super deluxe flats with emphasis on both economy and quality, providing value-driven solutions for residential needs.",
  },
];

export default function Objectives() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;
  const isStatic = tier === 'low' || tier === 'very-low' || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  return (
    <section data-header-theme="light" className="relative overflow-hidden py-14 sm:py-20 md:py-24 bg-[#fdfbf4] border-b border-black/5">
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
      <span aria-hidden className="absolute left-6 sm:left-12 top-0 bottom-0 w-px bg-accent/25 pointer-events-none" />

      <ArchPlans tone="light" variant="settingout" />

      {/* Sheet-index watermark */}
      <SheetWatermark text="02" tone="dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-14 lg:px-16">
        <motion.div
          initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: noReveal ? 0 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display font-bold text-[11px] sm:text-xs text-accent-dark/70 tracking-[0.25em] uppercase">Sheet 02&thinsp;/&thinsp;05</span>
            <span className="h-[2px] w-12 bg-accent"></span>
            <span className="text-accent-dark text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
              Our Goals
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-[1.05]">
            <span className="text-primary-dark">Our </span>
            <span className="text-outline-ink">Objectives</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {objectives.map((objective, index) => {
            const Icon = objective.icon;
            return (
              <motion.div
                key={objective.code}
                initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: noReveal ? 0 : 0.6,
                  delay: noReveal ? 0 : index * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="h-full"
              >
                <SpotlightCard
                  className={`group relative flex flex-col h-full p-5 sm:p-7 rounded-2xl sm:rounded-3xl border overflow-hidden ${
                    isHigh
                      ? 'liquid-glass-card-light !border-black/5 premium-card-hover-shine'
                      : tier === 'mid'
                      ? 'mid-glass-card-light !border-black/5'
                      : 'bg-white border-black/10'
                  } ${
                    isStatic
                      ? ''
                      : 'transition-all duration-500 hover:!border-accent-dark/40 hover:shadow-[0_20px_40px_rgba(10,10,10,0.08)] hover:-translate-y-1.5'
                  }`}
                >
                  <span className="flex items-start justify-between mb-6 sm:mb-8">
                    <span
                      className={`font-display font-bold text-lg sm:text-xl tracking-[0.1em] text-accent-dark/50 ${
                        isStatic ? '' : 'transition-colors duration-500 group-hover:text-accent-dark'
                      }`}
                      aria-hidden
                    >
                      {objective.code}
                    </span>
                    <span
                      className={`flex items-center justify-center w-11 h-11 sm:w-12 sm:h-12 rounded-xl shrink-0 border ${
                        tier === 'very-low'
                          ? 'bg-accent border-accent'
                          : `bg-[#fdfbf4] border-black/10 ${isStatic ? '' : 'transition-colors duration-500 group-hover:bg-accent/10 group-hover:border-accent-dark/40'}`
                      }`}
                      aria-hidden
                    >
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${tier === 'very-low' ? 'text-black' : `text-primary-dark ${isStatic ? '' : 'group-hover:text-accent-dark transition-colors duration-300'}`}`} />
                    </span>
                  </span>

                  <h3 className={`text-lg sm:text-xl font-bold text-primary-dark leading-tight mb-3 ${isStatic ? '' : 'transition-colors duration-300 group-hover:text-accent-dark'}`}>
                    {objective.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed mt-auto">
                    {objective.description}
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
