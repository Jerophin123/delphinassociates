"use client";

import ArchPlans from "../ui/ArchPlans";
import SheetWatermark from "../ui/SheetWatermark";
import { motion } from "framer-motion";
import {
  Building2,
  Factory,
  School,
  Wrench,
} from "lucide-react";
import { useHPOE } from "../HPOE";
import SpotlightCard from "../ui/SpotlightCard";
import ArrowLink from "../ui/ArrowLink";
import { useLiquidGlass } from "../ui/useLiquidGlass";

/** Card shell with real liquid-glass refraction on high tier */
function GlassSpecCard({ children, className }: { children: React.ReactNode; className: string }) {
  const glassRef = useLiquidGlass<HTMLDivElement>({ scale: -60, chroma: 4, blur: 4, mapBlur: 12 });
  return (
    <SpotlightCard ref={glassRef} className={className}>
      {children}
    </SpotlightCard>
  );
}

const services = [
  {
    code: "SP-01",
    icon: Building2,
    title: "Residential Construction",
    description:
      "We specialize in designing and constructing premium residential buildings, including deluxe and super deluxe flats. Our residential projects emphasize both economy and quality, ensuring durable structures with modern amenities while adhering to client budgets.",
    features: [
      "Deluxe and Super Deluxe Flats",
      "Modern Amenities & Finishes",
      "Budget-Conscious Design",
      "Quality Construction Standards",
    ],
  },
  {
    code: "SP-02",
    icon: Factory,
    title: "Industrial & Commercial Projects",
    description:
      "Comprehensive construction services for industrial facilities, factory buildings, and commercial spaces. We design and execute projects that meet industry standards, ensuring functionality, efficiency, and compliance with regulatory requirements.",
    features: [
      "Factory Buildings",
      "Industrial Complexes",
      "Commercial Spaces",
      "Regulatory Compliance",
    ],
  },
  {
    code: "SP-03",
    icon: School,
    title: "Institutional & Church Buildings",
    description:
      "Specialized expertise in constructing educational institutions, colleges, and church buildings. Our projects combine architectural excellence with functional design, creating spaces that serve communities effectively.",
    features: [
      "Educational Institutions",
      "Church Buildings",
      "Community Centers",
      "Sacred Architecture",
    ],
  },
  {
    code: "SP-04",
    icon: Wrench,
    title: "Consultancy & Turnkey Projects",
    description:
      "Expert building consultancy services covering planning, design, and project execution. We offer free consultancy support to help clients make informed decisions and provide end-to-end turnkey solutions for complete project management.",
    features: [
      "Building Consultancy",
      "Project Planning & Design",
      "Turnkey Project Execution",
      "Free Consultancy Support",
    ],
  },
];

export default function ServicesList() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;
  const isStatic = tier === 'low' || tier === 'very-low' || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  return (
    <section
      data-header-theme="dark"
      className={`relative overflow-hidden py-14 sm:py-20 md:py-24 ${tier === 'very-low' ? 'bg-primary-dark' : 'bg-primary-dark/95'} border-y border-white/5`}
    >
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

      <ArchPlans tone="dark" variant="axon" />

      {/* Sheet-index watermark */}
      <SheetWatermark text="01" tone="light" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: noReveal ? 0 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display font-bold text-[11px] sm:text-xs text-accent/60 tracking-[0.25em] uppercase">Sheet 01&thinsp;/&thinsp;01</span>
            <span className="h-[2px] w-12 bg-accent"></span>
            <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
              What We Deliver
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-[1.05]">
            <span className="text-white">Full </span>
            <span className="text-outline-display">Specification</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.code}
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
                <GlassSpecCard
                  className={`group relative flex flex-col h-full p-6 sm:p-9 rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden ${
                    isHigh
                      ? 'liquid-real-dark premium-card-hover-shine'
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
                  {/* Code + icon row */}
                  <span className="flex items-start justify-between mb-6 sm:mb-8">
                    <span
                      className={`font-display font-bold text-lg sm:text-xl tracking-[0.1em] text-accent/50 ${
                        isStatic ? '' : 'transition-colors duration-500 group-hover:text-accent'
                      }`}
                      aria-hidden
                    >
                      {service.code}
                    </span>
                    <span
                      className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl shrink-0 border ${
                        tier === 'very-low'
                          ? 'bg-accent border-accent'
                          : `bg-white/5 border-white/10 ${isStatic ? '' : 'transition-colors duration-500 group-hover:bg-accent/10 group-hover:border-accent/40'}`
                      }`}
                      aria-hidden
                    >
                      <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${tier === 'very-low' ? 'text-black' : `text-white ${isStatic ? '' : 'group-hover:text-accent transition-colors duration-300'}`}`} />
                    </span>
                  </span>

                  <h3 className={`text-xl sm:text-2xl font-bold text-white font-display leading-tight mb-3 sm:mb-4 ${isStatic ? '' : 'transition-colors duration-300 group-hover:text-accent'}`}>
                    {service.title}
                  </h3>

                  <p className="text-sm sm:text-base text-gray-400 font-light leading-relaxed mb-6 sm:mb-8">
                    {service.description}
                  </p>

                  {/* Scope items */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-auto mb-7 sm:mb-9">
                    {service.features.map((feature) => (
                      <span key={feature} className="flex items-start gap-3">
                        <span className="mt-1.5 w-1.5 h-1.5 rotate-45 bg-accent shrink-0" aria-hidden />
                        <span className="text-sm text-gray-300 font-medium leading-snug">
                          {feature}
                        </span>
                      </span>
                    ))}
                  </div>

                  <span className="pt-5 border-t border-white/10">
                    <ArrowLink href="/contact" tone="onDark" size="sm">
                      Discuss This Service
                    </ArrowLink>
                  </span>
                </GlassSpecCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
