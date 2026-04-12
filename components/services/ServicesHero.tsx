"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { useHPOE } from "../HPOE";
import GeometricParticleField from "../ui/GeometricParticleField";

export default function ServicesHero() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;

  return (
    <section
      id="services-hero"
      className="relative z-10 pt-4 pb-12 sm:pt-6 sm:pb-16 md:pt-4 md:pb-24 bg-transparent overflow-hidden"
    >
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className={`relative overflow-hidden rounded-[2.5rem] border ${isHigh ? 'border-accent/20' : 'border-gray-100'} ${tier === 'very-low' ? 'bg-gray-50' : 'bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(250,250,250,0.95)_100%)]'} shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-5 pt-8 pb-12 sm:px-12 sm:pt-10 sm:pb-20 xl:pt-12 xl:pb-24`}
        >
          {/* Decorative dots pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
          
          {/* Animated Golden Border Sweep - High Tier */}
          {isHigh && (
            <motion.div
              className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-[2]"
              style={{
                background: `linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.12) 50%, transparent 100%)`,
                backgroundSize: '200% 100%',
              }}
              animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
          )}

          {/* Animated Floating Orbs - High Tier */}
          {isHigh && (
            <>
              <motion.div
                className="pointer-events-none absolute -top-20 -right-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-accent/8 blur-[80px]"
                animate={{
                  x: [0, 30, -20, 0],
                  y: [0, -25, 15, 0],
                  scale: [1, 1.15, 0.9, 1],
                  opacity: [0.6, 0.9, 0.5, 0.6],
                }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="pointer-events-none absolute -bottom-20 -left-20 w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-accent/6 blur-[80px]"
                animate={{
                  x: [0, -25, 20, 0],
                  y: [0, 20, -30, 0],
                  scale: [1, 0.9, 1.1, 1],
                  opacity: [0.5, 0.8, 0.4, 0.5],
                }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              />
            </>
          )}

          {/* Static Orbs - Mid/Low Tier */}
          {!isHigh && tier !== 'very-low' && (
            <>
              <div className="pointer-events-none absolute -top-32 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-[100px]" />
              <div className="pointer-events-none absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-accent/5 blur-[100px]" />
            </>
          )}

          {/* Floating Diamond Accents - High Tier */}
          {isHigh && (
            <>
              <motion.div
                className="absolute top-12 right-16 w-4 h-4 sm:w-5 sm:h-5 border border-accent/30 pointer-events-none z-[2]"
                style={{ rotate: 45 }}
                animate={{ y: [0, -15, 0], opacity: [0.4, 0.8, 0.4], rotate: [45, 90, 45] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute bottom-16 left-12 w-3 h-3 sm:w-4 sm:h-4 border border-accent/25 pointer-events-none z-[2]"
                style={{ rotate: 45 }}
                animate={{ y: [0, 12, 0], opacity: [0.3, 0.7, 0.3], rotate: [45, 0, 45] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              />
              <motion.div
                className="absolute top-1/2 right-24 w-2.5 h-2.5 bg-accent/15 pointer-events-none z-[2]"
                style={{ rotate: 45 }}
                animate={{ y: [0, -10, 5, 0], opacity: [0.2, 0.5, 0.3, 0.2] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
              />
            </>
          )}

          {/* Structural Network Particle Field - High Tier */}
          {isHigh && (
            <GeometricParticleField 
              quantity={70} 
              color="#D4AF37"
              className="z-[1]"
              staticity={50}
              ease={40}
            />
          )}

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex items-center justify-center gap-3 mb-4 sm:mb-6"
            >
              <motion.span 
                className="h-[2px] bg-accent"
                initial={{ width: isHigh ? 0 : 32 }}
                animate={{ width: 32 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              />
              <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
                Our Expertise
              </span>
              <motion.span 
                className="h-[2px] bg-accent"
                initial={{ width: isHigh ? 0 : 32 }}
                animate={{ width: 32 }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-4 text-[28px] leading-tight sm:text-4xl md:text-5xl lg:text-7xl font-bold font-display tracking-tight mb-4 sm:mb-6"
            >
              {isHigh ? (
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark via-accent to-primary-dark bg-[length:200%_auto]"
                  animate={{ backgroundPosition: ['0% center', '200% center'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  Construction & Consultancy Services
                </motion.span>
              ) : (
                <span className="text-primary-dark">Construction & Consultancy Services</span>
              )}
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
                className={`group inline-flex items-center justify-center space-x-2 px-6 py-3 sm:px-8 sm:py-4 bg-accent text-black rounded-xl font-bold text-sm sm:text-base hover:bg-accent-light transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.4)] hover:-translate-y-1 ${isHigh ? 'liquid-glass-btn-accent-invert' : tier === 'mid' && !reducedMotion ? 'mid-glass-btn-accent-invert' : ''}`}
              >
                <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Call Us Now</span>
                <div className="ml-1 group-hover:translate-x-1.5 transition-transform duration-300">
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </a>

              <Link
                href="/contact"
                className={`group inline-flex items-center justify-center space-x-2 px-6 py-3 sm:px-8 sm:py-4 ${tier === 'very-low' ? 'bg-white' : (tier === 'low' ? 'bg-white' : 'bg-white/60 backdrop-blur-md hover:bg-white')} text-primary-dark rounded-xl font-bold text-sm sm:text-base transition-all duration-300 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-accent/30 ${isHigh ? 'liquid-glass-btn-light-invert' : tier === 'mid' && !reducedMotion ? 'mid-glass-btn-light-invert' : ''}`}
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


