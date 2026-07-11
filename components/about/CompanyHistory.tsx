"use client";

import ArchPlans from "../ui/ArchPlans";
import SheetWatermark from "../ui/SheetWatermark";
import { motion } from "framer-motion";
import { useHPOE } from "../HPOE";

const sectors = ["Residential", "Industrial", "Commercial", "Institutional", "Church"];

export default function CompanyHistory() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;
  const isStatic = tier === "low" || tier === "very-low" || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  return (
    <section data-header-theme="dark" className={`relative overflow-hidden py-14 sm:py-20 md:py-24 ${tier === 'very-low' ? 'bg-primary-dark' : 'bg-primary-dark/95'} border-y border-white/5`}>
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

      <ArchPlans tone="dark" variant="contours" />

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
            <span className="font-display font-bold text-[11px] sm:text-xs text-accent/60 tracking-[0.25em] uppercase">Sheet 01&thinsp;/&thinsp;05</span>
            <span className="h-[2px] w-12 bg-accent"></span>
            <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
              Our Story
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-[1.05]">
            <span className="text-white">Our </span>
            <span className="text-outline-display">History</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
          <motion.div
            initial={noReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: noReveal ? 0 : 0.6, delay: noReveal ? 0 : 0.2 }}
            className="lg:col-span-5 xl:col-span-4"
          >
            <div className={`rounded-3xl border border-white/10 p-6 sm:p-8 ${
              isHigh ? 'liquid-glass-card-dark' : tier === 'mid' ? 'mid-glass-card-dark' : tier === 'very-low' ? 'bg-black' : 'bg-black/50'
            }`}>
              <div className="text-[10px] sm:text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mb-2">Since</div>
              <div className={`text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-4 ${tier === 'very-low' ? 'text-accent' : 'text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent'}`}>
                1999
              </div>
              <div className="text-gray-400 leading-relaxed font-light mt-4 text-sm sm:text-base">
                Building trust through quality, delivered by an experienced civil
                construction team.
              </div>
              <div className="mt-8 border-t border-white/10 pt-6">
                <div className="text-[10px] sm:text-xs font-bold text-gray-400 tracking-[0.2em] uppercase mb-4">Sectors</div>
                <div className="flex flex-wrap gap-2.5">
                  {sectors.map((s) => (
                    <span
                      key={s}
                      className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-white/15 text-gray-300 ${isStatic ? '' : 'transition-colors duration-300 hover:border-accent/50 hover:text-accent'}`}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={noReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: noReveal ? 0 : 0.6, delay: noReveal ? 0 : 0.35 }}
            className="lg:col-span-7 xl:col-span-8"
          >
            <p className="text-base sm:text-xl text-gray-400 font-light leading-relaxed mb-6">
              Delphin Associates was established in <strong className="text-white font-semibold">1999</strong> by{" "}
              <strong className="text-white font-semibold">Mr. Delphin P. Stanley (DCE, B.Tech)</strong>, a visionary
              leader in the construction industry. Starting with a team of young,
              dedicated engineers across Tamil Nadu, the organization has grown to
              become a trusted name in civil construction and building consultancy.
            </p>
            <p className="text-base sm:text-xl text-gray-400 font-light leading-relaxed mb-6">
              Over the past 25+ years, we have successfully completed numerous
              projects spanning residential, industrial, commercial, institutional,
              and church sectors. Our commitment to transparency, timely completion,
              and post-completion support has earned us the trust and respect of
              clients across Tamil Nadu.
            </p>
            <p className="text-base sm:text-xl text-gray-400 font-light leading-relaxed">
              Today, Delphin Associates continues to lead with innovation, quality,
              and integrity, maintaining our founding principles while embracing
              modern construction technologies and sustainable building practices.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
