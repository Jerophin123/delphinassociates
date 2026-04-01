"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { usePerformance } from "../PerformanceProvider";

export default function ServicesHero() {
  const { tier, reducedMotion } = usePerformance();
  return (
    <section
      id="services-hero"
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
              className="flex items-center justify-center gap-3 mb-4 sm:mb-6"
            >
              <span className="h-[2px] w-8 bg-accent"></span>
              <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
                Our Expertise
              </span>
              <span className="h-[2px] w-8 bg-accent"></span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-primary-dark mb-4 sm:mb-6"
            >
              Construction & Consultancy Services
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-4 sm:mt-6 mx-auto max-w-xl sm:max-w-2xl text-base sm:text-lg text-gray-500 leading-relaxed font-light"
            >
              Comprehensive solutions tailored to residential, industrial, commercial, institutional, and church project needs.
              We build with transparency, quality, and timely execution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center mt-8 sm:mt-10"
            >
              <a
                href="tel:+919841243345"
                className={`group inline-flex items-center justify-center space-x-2 px-6 py-3 sm:px-8 sm:py-4 bg-accent text-black rounded-xl font-bold text-sm sm:text-base hover:bg-accent-light transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.4)] hover:-translate-y-1 ${tier === 'high' && !reducedMotion ? 'liquid-glass-btn-accent-invert' : ''}`}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Call Us Now</span>
                <div className="ml-1 group-hover:translate-x-1.5 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </a>

              <Link
                href="/contact"
                className={`group inline-flex items-center justify-center space-x-2 px-6 py-3 sm:px-8 sm:py-4 ${tier === 'low' ? 'bg-white' : 'bg-white/60 backdrop-blur-md hover:bg-white'} text-primary-dark rounded-xl font-bold text-sm sm:text-base transition-all duration-300 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-accent/30 ${tier === 'high' && !reducedMotion ? 'liquid-glass-btn-light-invert' : ''}`}
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

