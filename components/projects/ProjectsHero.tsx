"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";

export default function ProjectsHero() {
  return (
    <section
      id="projects-hero"
      className="relative z-10 pt-4 pb-12 sm:pt-6 sm:pb-16 md:pt-4 md:pb-24 bg-white overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_55%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,1)_100%)] shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-5 pt-8 pb-12 sm:px-12 sm:pt-10 sm:pb-20 xl:pt-12 xl:pb-24"
        >
          {/* Decorative dots pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          {/* Subtle glowing orbs */}
          <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-[100px]" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-[100px]" />

          <div className="relative z-10 grid lg:grid-cols-[1fr_minmax(auto,450px)] gap-12 lg:gap-16 items-center">
            {/* Left Column Content */}
            <div className="text-left">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="flex items-center gap-3 mb-4 sm:mb-6"
              >
                <span className="h-[2px] w-8 bg-accent"></span>
                <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
                  Our Portfolio
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mt-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-primary-dark mb-4 sm:mb-6"
              >
                Our Projects
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mt-4 sm:mt-6 max-w-xl sm:max-w-2xl text-base sm:text-xl text-gray-500 leading-relaxed font-light"
              >
                Showcasing our excellence in construction across multiple sectors built with quality, transparency, and on-time execution.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="mt-8 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-8 max-w-4xl"
              >
                {[
                  { icon: Calendar, value: "100+", label: "Projects completed" },
                  { icon: Sparkles, value: "25+", label: "Project sectors" },
                  { icon: MapPin, value: "TN", label: "Chennai & Tamil Nadu" },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div key={idx} className="group relative rounded-2xl border border-gray-100 bg-white/60 backdrop-blur-md p-5 sm:p-8 transition-transform hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(212,175,55,0.08)] hover:border-accent/20">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-yellow-600 transition-colors" />
                        <div className="text-2xl sm:text-4xl font-black text-primary-dark font-display">{item.value}</div>
                      </div>
                      <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">{item.label}</div>
                    </div>
                  );
                })}
              </motion.div>
            </div>

            {/* Right Column Custom Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="relative overflow-hidden rounded-[2.5rem] border border-gray-100 bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_-4px_rgba(0,0,0,0.06),0_4px_12px_-2px_rgba(0,0,0,0.04)] p-6 sm:p-10 lg:p-12 hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.1),0_10px_24px_-4px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500"
            >
              <div className="text-[10px] sm:text-xs uppercase tracking-widest text-gray-500 font-bold mb-3 sm:mb-4">
                Start your next project
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold font-display text-primary-dark tracking-tight mb-4 sm:mb-5">
                Let us plan it right
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-6 sm:mb-8">
                Tell us your scope and timeline. We will respond with a clear plan for construction execution and consultancy.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-5 mb-6 sm:mb-8">
                <a
                  href="tel:+919841243345"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-4 rounded-xl bg-[#d4af37] text-black font-bold text-sm sm:text-base shadow-[0_8px_30px_rgba(212,175,55,0.25)] hover:bg-[#b0912f] transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Call Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-5 py-3 sm:px-6 sm:py-4 rounded-xl bg-gray-50 border border-gray-200 text-primary-dark text-sm sm:text-base font-bold hover:bg-white hover:border-gray-300 hover:shadow-sm transition-all duration-300 transform hover:-translate-y-0.5"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
              
              <div className="text-xs sm:text-sm font-medium text-gray-500 flex items-center gap-2 opacity-90">
                Typically responds within 24 hours.
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
