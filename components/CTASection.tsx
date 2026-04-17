"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";
import { useHPOE } from "./HPOE";
import GeometricParticleField from "./ui/GeometricParticleField";

export default function CTASection() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;

  return (
    <section
      id="home-cta-section"
      className={`relative z-10 py-12 sm:py-20 md:py-28 ${tier === 'very-low' ? 'bg-[#fdfbf4]' : 'bg-gradient-to-br from-white/95 via-gray-50/95 to-white/95'} text-primary-dark overflow-hidden border-y border-black/5`}
    >
      {/* Background decorations */}
      {tier !== 'very-low' && (
        <>
          <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[50px] sm:blur-[100px] -translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[40px] sm:blur-[80px] translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
        </>
      )}
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0,0,0,0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="w-full"
        >
          <motion.div
            className={`relative rounded-2xl sm:rounded-[2.5rem] ${tier === 'very-low' ? 'bg-[#fdfbf4] shadow-none' : (tier === 'low' ? 'bg-[#fdfbf4]' : (tier === 'mid' ? 'bg-[#fdfbf4]/[0.97]' : 'liquid-glass-card-light'))} border ${isHigh ? 'border-accent/20' : 'border-white/60'} shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-[0_16px_60px_rgb(0,0,0,0.12)] transition-shadow duration-500 p-5 sm:p-10 md:p-16 lg:p-20 overflow-hidden`}
          >
            {/* Inner subtle glow */}
            {tier !== 'very-low' && <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none"></div>}

            {/* Animated Golden Border Sweep - High Tier */}
            {isHigh && (
              <motion.div
                className="absolute inset-0 rounded-2xl sm:rounded-[2.5rem] pointer-events-none z-[2]"
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
                <motion.div
                  className="absolute top-1/2 right-20 w-2.5 h-2.5 bg-accent/15 pointer-events-none z-[2]"
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

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`relative z-10 inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 ${tier === 'very-low' ? 'bg-accent text-black' : 'bg-accent/10 text-accent'} rounded-full text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-6 sm:mb-8 border border-accent/20`}
          >
            <span className={`w-2 h-2 rounded-full ${tier === 'very-low' ? 'bg-black' : 'bg-accent animate-[pulse_2s_ease-in-out_infinite]'}`}></span>
            Get Started Today
          </motion.div>

          {isHigh ? (
            <motion.h2
              animate={{ backgroundPosition: ["0% center", "200% center"] }}
              transition={{ repeat: Infinity, ease: "linear", duration: 8 }}
              className="relative z-10 text-[28px] leading-tight sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 xl:mb-8 font-display tracking-tight leading-[1.1] text-transparent bg-clip-text bg-gradient-to-r from-primary-dark via-accent to-primary-dark bg-[length:200%_auto]"
            >
              Ready to Start Your <br className="hidden md:block"/>
              Dream Project?
            </motion.h2>
          ) : (
            <h2 className="relative z-10 text-[28px] leading-tight sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 xl:mb-8 font-display tracking-tight leading-[1.1]">
              Ready to Start Your <br className="hidden md:block"/>
              <span className={`${tier === 'very-low' ? 'text-primary-dark' : 'text-transparent bg-clip-text bg-gradient-to-r from-primary-dark via-primary to-primary-dark bg-[length:200%_auto]'} mt-2 pb-2 inline-block`}>
                Dream Project?
              </span>
            </h2>
          )}
          
          <p className="relative z-10 text-sm sm:text-lg md:text-xl text-gray-500 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Let us help you build your dream project with transparency, quality,
            and timely completion. Experience excellence in construction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full sm:w-auto relative z-20">
            <Link
              href="/contact"
              className={`group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 font-bold text-sm sm:text-base text-black transition-all duration-300 bg-accent rounded-xl hover:bg-accent-light hover:shadow-xl ${tier === 'low' || tier === 'very-low' ? '' : 'hover:shadow-accent/20'} w-full sm:w-auto overflow-hidden border border-transparent ${isHigh ? 'liquid-glass-btn-accent-invert' : tier === 'mid' && !reducedMotion ? 'mid-glass-btn-accent-invert' : ''}`}
            >
              <span className="relative z-10 flex items-center gap-2">
                Get a Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
              {tier !== 'very-low' && <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />}
            </Link>
            
            <a
              href="tel:+919841243345"
              className={`group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 font-bold text-sm sm:text-base text-primary-dark transition-all duration-300 bg-[#fdfbf4] border-2 border-gray-100 rounded-xl hover:border-accent hover:bg-accent/5 hover:text-accent w-full sm:w-auto ${isHigh ? 'liquid-glass-btn-light-invert' : tier === 'mid' && !reducedMotion ? 'mid-glass-btn-light-invert' : ''}`}
            >
              <span className="flex items-center gap-2">
                <Phone className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
                Call Us Now
              </span>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative z-10 mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200/50 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-gray-500"
          >
            <a
              href="mailto:delphinassociates@gmail.com"
              className="group flex items-center gap-2 hover:text-accent transition-colors text-xs sm:text-sm md:text-base font-medium"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#fdfbf4] flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 group-hover:text-accent transition-colors" />
              </div>
              <span>delphinassociates@gmail.com</span>
            </a>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-gray-300"></span>
            <a
              href="mailto:nanchilassociates@gmail.com"
              className="group flex items-center gap-2 hover:text-accent transition-colors text-xs sm:text-sm md:text-base font-medium"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-[#fdfbf4] flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 group-hover:text-accent transition-colors" />
              </div>
              <span>nanchilassociates@gmail.com</span>
            </a>
          </motion.div>
        </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

