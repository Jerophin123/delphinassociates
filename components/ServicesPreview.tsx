"use client";

import ArchPlans from "./ui/ArchPlans";
import SheetWatermark from "./ui/SheetWatermark";
import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Factory, School, Church, Wrench, CheckCircle, ArrowRight } from "lucide-react";
import { useHPOE } from "@/components/HPOE";
import ArrowLink from "./ui/ArrowLink";

const services = [
  {
    code: "S-01",
    icon: Building2,
    title: "Residential Construction",
    description: "Premium residential flats and buildings with modern amenities",
  },
  {
    code: "S-02",
    icon: Factory,
    title: "Industrial & Commercial",
    description: "Factory buildings and commercial spaces built to last",
  },
  {
    code: "S-03",
    icon: School,
    title: "Institutional Buildings",
    description: "Educational and institutional structures",
  },
  {
    code: "S-04",
    icon: Church,
    title: "Church Buildings",
    description: "Sacred spaces and community centers",
  },
  {
    code: "S-05",
    icon: Wrench,
    title: "Consultancy Services",
    description: "Expert building consultancy and planning",
  },
  {
    code: "S-06",
    icon: CheckCircle,
    title: "Turnkey Projects",
    description: "End-to-end project execution",
  },
];

export default function ServicesPreview() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;
  const isStatic = tier === 'low' || tier === 'very-low' || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  return (
    <section
      id="home-services-preview"
      data-header-theme="light"
      className="relative z-10 py-14 sm:py-24 md:py-32 bg-[#fdfbf4] overflow-hidden border-y border-black/5"
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

      <ArchPlans tone="light" variant="truss" />

      {/* Sheet-index watermark */}
      <SheetWatermark text="04" tone="dark" />

      <div className="relative max-w-7xl mx-auto px-6 sm:px-14 lg:px-16">
        {/* Editorial header row */}
        <motion.div
          initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: noReveal ? 0 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10 sm:mb-14"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display font-bold text-[11px] sm:text-xs text-accent-dark/70 tracking-[0.25em] uppercase">Sheet 04&thinsp;/&thinsp;06</span>
              <span className="h-[2px] w-12 bg-accent"></span>
              <span className="text-accent-dark text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
                Our Expertise
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold font-display tracking-tight leading-[1.05]">
              <span className="text-primary-dark">Our </span>
              <span className="text-outline-ink">Services</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-light md:text-right md:max-w-sm">
            Comprehensive construction and consultancy solutions tailored to your project needs
          </p>
        </motion.div>

        {/* Specification cards - coded service grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-12 sm:mb-16" role="list">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.code}
                role="listitem"
                initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: noReveal ? 0 : 0.6,
                  delay: noReveal ? 0 : index * 0.08,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className="h-full"
              >
                <Link
                  href="/services"
                  className={`group relative flex flex-col h-full p-5 sm:p-7 rounded-2xl sm:rounded-3xl border overflow-hidden ${
                    isHigh
                      ? 'liquid-glass-card-light !border-black/5 premium-card-hover-shine'
                      : tier === 'mid'
                      ? 'mid-glass-card-light !border-black/5'
                      : tier === 'very-low'
                      ? 'bg-white border-black/10'
                      : 'bg-white border-black/10'
                  } ${
                    isStatic
                      ? ''
                      : 'transition-all duration-500 hover:!border-accent-dark/40 hover:shadow-[0_20px_40px_rgba(10,10,10,0.08)] hover:-translate-y-1.5'
                  }`}
                >
                  {/* Code + icon row */}
                  <span className="flex items-start justify-between mb-6 sm:mb-8">
                    <span
                      className={`font-display font-bold text-lg sm:text-xl tracking-[0.1em] text-accent-dark/50 ${
                        isStatic ? '' : 'transition-colors duration-500 group-hover:text-accent-dark'
                      }`}
                      aria-hidden
                    >
                      {service.code}
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

                  {/* Title + description */}
                  <h3 className={`text-lg sm:text-xl font-bold text-primary-dark leading-tight mb-2 ${isStatic ? '' : 'transition-colors duration-300 group-hover:text-accent-dark'}`}>
                    {service.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 font-light leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>

                  {/* Footer arrow */}
                  <span className="flex items-center justify-between mt-auto pt-4 border-t border-black/5">
                    <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-400 ${isStatic ? '' : 'transition-colors duration-300 group-hover:text-primary-dark'}`}>
                      View Details
                    </span>
                    <span
                      className={`flex items-center justify-center w-9 h-9 rounded-full border shrink-0 ${
                        tier === 'very-low'
                          ? 'bg-primary-dark border-primary-dark text-white'
                          : `border-black/15 text-primary-dark ${isStatic ? '' : 'transition-all duration-300 group-hover:bg-primary-dark group-hover:border-primary-dark group-hover:text-accent group-hover:translate-x-1'}`
                      }`}
                      aria-hidden
                    >
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: noReveal ? 0 : 0.6, delay: noReveal ? 0 : 0.3 }}
          className="flex justify-center"
        >
          <ArrowLink href="/services" tone="onLight">
            Explore All Services
          </ArrowLink>
        </motion.div>
      </div>
    </section>
  );
}
