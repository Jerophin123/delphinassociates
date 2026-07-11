"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { useHPOE } from "./HPOE";
import ArchPlans from "./ui/ArchPlans";
import SheetWatermark from "./ui/SheetWatermark";
import SpotlightCard from "./ui/SpotlightCard";

const testimonials = [
  {
    code: "T-01",
    initials: "CSI",
    name: "CSI Madras Diocese",
    role: "Church Buildings - Across Tamil Nadu",
    category: "Church",
    rating: 4.5,
    quote:
      "Delphin Associates has built several of our church buildings across Tamil Nadu. Their understanding of sacred architecture, transparent budgeting, and timely completion has made them our trusted construction partner.",
  },
  {
    code: "T-02",
    initials: "VG",
    name: "Mr. V. Gajapathi",
    role: "Global Sales Head",
    category: "Residential & Commercial",
    rating: 5.0,
    quote:
      "From planning to handover, the execution was transparent and precise. They delivered exactly what was promised, on schedule - and their support didn't stop after the keys were handed over.",
  },
  {
    code: "T-03",
    initials: "AJ",
    name: "Mr. A. Jeyashekar",
    role: "Director - Measurecon Instruments Pvt Ltd",
    category: "Commercial",
    rating: 5.0,
    quote:
      "We entrusted Delphin Associates with our commercial building at Tambaram. Their technical strength and clear communication at every stage gave us complete confidence in the build.",
  },
];

/** Gold star row with fractional fill + numeric value */
function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-2" aria-label={`Rated ${rating.toFixed(1)} out of 5`}>
      <span className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((i) => {
          const fill = Math.min(Math.max(rating - (i - 1), 0), 1);
          return (
            <span key={i} className="relative w-4 h-4" aria-hidden>
              <Star className="w-4 h-4 text-white/20" fill="currentColor" strokeWidth={0} />
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className="w-4 h-4 text-accent" fill="currentColor" strokeWidth={0} />
              </span>
            </span>
          );
        })}
      </span>
      <span className="font-display font-bold text-xs tracking-[0.1em] text-accent">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function Testimonials() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;
  const isStatic = tier === "low" || tier === "very-low" || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  return (
    <section
      id="home-testimonials"
      data-header-theme="dark"
      className={`relative z-10 py-14 sm:py-24 md:py-32 ${tier === "very-low" ? "bg-primary-dark" : "bg-primary-dark/95"} overflow-hidden border-y border-white/5`}
    >
      {/* Faint site grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />

      <ArchPlans tone="dark" variant="approved" />

      {/* Sheet-index watermark */}
      <SheetWatermark text="05" tone="light" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial header row */}
        <motion.div
          initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: noReveal ? 0 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display font-bold text-[11px] sm:text-xs text-accent/60 tracking-[0.25em] uppercase">
                Sheet 05&thinsp;/&thinsp;06
              </span>
              <span className="h-[2px] w-12 bg-accent"></span>
              <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
                Client Sign-Off
              </span>
            </div>
            <h2 className="text-[28px] sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-[1.05]">
              <span className="text-white">Client </span>
              <span className="text-outline-display">Testimonials</span>
            </h2>
          </div>
          <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light md:text-right md:max-w-sm">
            The signatures that matter most - from the dioceses, directors, and
            families we&apos;ve built for.
          </p>
        </motion.div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.figure
              key={testimonial.code}
              initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: noReveal ? 0 : 0.7,
                delay: noReveal ? 0 : index * 0.12,
                ease: [0.21, 0.47, 0.32, 0.98],
              }}
              className="h-full m-0"
            >
              <SpotlightCard
                className={`group relative flex flex-col h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-white/10 overflow-hidden ${
                  isHigh
                    ? "liquid-glass-card-dark premium-card-hover-shine"
                    : tier === "mid"
                    ? "mid-glass-card-dark"
                    : tier === "very-low"
                    ? "bg-black"
                    : "bg-black/50"
                } ${
                  isStatic
                    ? ""
                    : "transition-all duration-500 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1.5"
                }`}
              >
                {/* Code + quote mark row */}
                <span className="flex items-start justify-between mb-5 sm:mb-6">
                  <span
                    className={`font-display font-bold text-lg sm:text-xl tracking-[0.1em] text-accent/50 ${
                      isStatic ? "" : "transition-colors duration-500 group-hover:text-accent"
                    }`}
                    aria-hidden
                  >
                    {testimonial.code}
                  </span>
                  <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-accent/40 rotate-180" aria-hidden />
                </span>

                <blockquote className="text-sm sm:text-base text-gray-300 font-light leading-relaxed mb-6 sm:mb-8 flex-grow">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Star rating */}
                <span className="mb-5">
                  <StarRating rating={testimonial.rating} />
                </span>

                {/* Client - engineer's stamp mark */}
                <figcaption className="flex items-center gap-4 pt-5 border-t border-white/10">
                  <span className="flex items-center justify-center w-12 h-12 rounded-md border border-accent/50 p-[3px] shrink-0" aria-hidden>
                    <span className="flex items-center justify-center w-full h-full rounded-[4px] border border-accent/30 bg-accent/10 font-display font-bold text-accent text-xs tracking-widest">
                      {testimonial.initials}
                    </span>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-white font-bold text-sm sm:text-base leading-tight">
                      {testimonial.name}
                    </span>
                    <span className="block text-gray-400 text-xs font-light mt-0.5">
                      {testimonial.role}
                    </span>
                    <span className="mt-1.5 inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[0.2em] text-accent/80">
                      <span className="w-1 h-1 rotate-45 bg-accent/70" aria-hidden />
                      {testimonial.category}
                    </span>
                  </span>
                </figcaption>
              </SpotlightCard>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
