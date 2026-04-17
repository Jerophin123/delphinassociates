"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { useHPOE } from "../HPOE";
import GeometricParticleField from "../ui/GeometricParticleField";

export default function ServicesCTA() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;

  return (
    <section className="relative mt-8 sm:mt-16 md:mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className={`relative overflow-hidden rounded-[2.5rem] ${tier === 'very-low' ? 'bg-[#fdfbf4]' : 'bg-gradient-to-br from-white/95 to-gray-50/95'} border ${isHigh ? 'border-accent/20' : 'border-gray-100'} shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] p-12 sm:p-16 md:p-20`}>
        {/* Background decoration */}
        {tier !== 'very-low' && (
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-accent/[0.04] to-transparent rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        )}

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

        {/* Floating Diamond Accents - High Tier */}
        {isHigh && (
          <>
            <motion.div
              className="absolute top-8 right-12 w-4 h-4 sm:w-5 sm:h-5 border border-accent/30 pointer-events-none z-[2]"
              style={{ rotate: 45 }}
              animate={{ y: [0, -15, 0], opacity: [0.4, 0.8, 0.4], rotate: [45, 90, 45] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-12 left-8 w-3 h-3 sm:w-4 sm:h-4 border border-accent/25 pointer-events-none z-[2]"
              style={{ rotate: 45 }}
              animate={{ y: [0, 12, 0], opacity: [0.3, 0.7, 0.3], rotate: [45, 0, 45] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
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

        <div className="relative z-10 grid lg:grid-cols-2 items-center gap-12 lg:gap-16">
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="flex items-center justify-center lg:justify-start gap-3 mb-6"
            >
              <motion.span 
                className="h-[2px] bg-accent"
                initial={{ width: isHigh ? 0 : 32 }}
                whileInView={{ width: 32 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
              />
              <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase">
                Let&apos;s Build Together
              </span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight"
            >
              {isHigh ? (
                <motion.span
                  className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark via-accent to-primary-dark bg-[length:200%_auto]"
                  animate={{ backgroundPosition: ['0% center', '200% center'] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  Request a Free Consultation
                </motion.span>
              ) : (
                <span className="text-primary-dark">Request a Free Consultation</span>
              )}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
              className="mt-6 text-gray-500 font-light text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0"
            >
              Tell us your project scope and timelines. We&apos;ll help you with transparent planning, quality execution, and reliable support.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-end"
          >
            <a
              href="tel:+919841243345"
              className={`group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-accent text-black rounded-xl font-bold text-base hover:bg-accent-light transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.4)] hover:-translate-y-1 ${isHigh ? 'liquid-glass-btn-accent-invert' : tier === 'mid' && !reducedMotion ? 'mid-glass-btn-accent-invert' : ''}`}
            >
              <Phone className="w-5 h-5" />
              <span>Call Us Now</span>
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                <ArrowRight className="w-5 h-5" />
              </span>
            </a>

            <Link
              href="/contact"
              className={`group inline-flex items-center justify-center space-x-2 px-8 py-4 ${tier === 'very-low' ? 'bg-[#fdfbf4] border-gray-300' : 'bg-[#fdfbf4]/60 backdrop-blur-md hover:bg-[#fdfbf4]'} text-primary-dark rounded-xl font-bold text-base transition-all duration-300 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-accent/30 ${isHigh ? 'liquid-glass-btn-light-invert' : tier === 'mid' && !reducedMotion ? 'mid-glass-btn-light-invert' : ''}`}
            >
              <span>Get a Quote</span>
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
