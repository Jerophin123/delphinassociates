"use client";

import { motion } from "framer-motion";
import { usePerformance } from "../PerformanceProvider";

export default function AboutHero() {
  const { tier } = usePerformance();
  return (
    <div className="relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_55%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,1)_100%)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-5 pt-8 pb-12 sm:px-12 sm:pt-10 sm:pb-20 xl:pt-12 xl:pb-24 mb-12 sm:mb-20 md:mb-24">
      {/* Decorative dots pattern similar to Home */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Subtle glowing orbs */}
      <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-[100px]" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex items-center justify-center gap-3 mb-6"
        >
          <span className="h-[2px] w-8 bg-accent"></span>
          <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
            Since 1999
          </span>
          <span className="h-[2px] w-8 bg-accent"></span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-primary-dark mb-4 sm:mb-6"
        >
          Delphin Associates
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mx-auto max-w-2xl text-base sm:text-xl text-gray-500 leading-relaxed font-light"
        >
          <strong className="text-gray-900 font-semibold">You Dream We Build:</strong> Building trust through quality since 1999.
          Leading civil construction company in Chennai, Tamil Nadu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto"
        >
          <div className={`rounded-2xl border border-gray-100 ${tier === 'low' ? 'bg-white/95' : 'bg-white/60 backdrop-blur-md'} p-5 sm:p-8 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 hover:border-accent/20`}>
            <div className="text-2xl sm:text-4xl font-black text-primary-dark mb-2 font-display">25+</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">Years Experience</div>
          </div>
          <div className={`rounded-2xl border border-gray-100 ${tier === 'low' ? 'bg-white/95' : 'bg-white/60 backdrop-blur-md'} p-5 sm:p-8 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 hover:border-accent/20`}>
            <div className="text-2xl sm:text-4xl font-black text-primary-dark mb-2 font-display">100%</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">Quality Assurance</div>
          </div>
          <div className={`rounded-2xl border border-gray-100 ${tier === 'low' ? 'bg-white/95' : 'bg-white/60 backdrop-blur-md'} p-5 sm:p-8 transition-transform hover:-translate-y-1 hover:shadow-lg hover:shadow-black/5 hover:border-accent/20`}>
            <div className="text-2xl sm:text-4xl font-black text-primary-dark mb-2 font-display">E2E</div>
            <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">Execution & Consultancy</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
