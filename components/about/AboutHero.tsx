"use client";

import { motion } from "framer-motion";

export default function AboutHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-accent/15 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.18)_0%,transparent_55%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,1)_100%)] px-6 py-10 sm:px-10 sm:py-12 mb-10 sm:mb-12 md:mb-14">
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent-light/10 blur-3xl" />

      <div className="relative text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-accent/25 bg-accent/10 text-accent font-semibold text-sm sm:text-base"
        >
          <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-accent-light" />
          Established Since 1999
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-[0.01em] text-black"
        >
          Delphin Associates
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-4 mx-auto max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed"
        >
          You Dream We Build. Building trust through quality since 1999.
          Leading civil construction company in Chennai, Tamil Nadu.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6"
        >
          <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5 transition-transform hover:-translate-y-1">
            <div className="text-2xl font-bold text-primary-dark">25+</div>
            <div className="mt-1 text-sm font-semibold text-gray-600">Years Experience</div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5 transition-transform hover:-translate-y-1">
            <div className="text-2xl font-bold text-primary-dark">100%</div>
            <div className="mt-1 text-sm font-semibold text-gray-600">Quality Assurance</div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5 transition-transform hover:-translate-y-1">
            <div className="text-2xl font-bold text-primary-dark">End-to-End</div>
            <div className="mt-1 text-sm font-semibold text-gray-600">Execution & Consultancy</div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
