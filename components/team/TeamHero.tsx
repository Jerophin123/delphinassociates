"use client";

import { motion } from "framer-motion";
import { HardHat, ShieldCheck, TrendingUp, Users } from "lucide-react";
import { usePerformance } from "../PerformanceProvider";
import GeometricParticleField from "../ui/GeometricParticleField";

export default function TeamHero() {
  const { tier, reducedMotion } = usePerformance();
  const isHigh = tier === "high" && !reducedMotion;

  const stats = [
    { icon: Users, value: "25+", label: "Years of experience" },
    { icon: TrendingUp, value: "100+", label: "Projects delivered" },
    { icon: ShieldCheck, value: "100%", label: "Quality assured" },
  ];

  return (
    <div className={`relative overflow-hidden rounded-[2.5rem] border ${isHigh ? 'border-accent/20' : 'border-gray-100'} ${tier === 'very-low' ? 'bg-gray-50' : 'bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(250,250,250,0.95)_100%)]'} shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-5 pt-8 pb-12 sm:px-12 sm:pt-14 sm:pb-20 xl:pt-16 xl:pb-24 mb-12 sm:mb-20 md:mb-24`}>
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

      {/* Floating Diamond Accents */}
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
            className="absolute top-1/3 left-1/4 w-2.5 h-2.5 bg-accent/15 pointer-events-none z-[2]"
            style={{ rotate: 45 }}
            animate={{ y: [0, -10, 5, 0], opacity: [0.2, 0.5, 0.3, 0.2] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          />
        </>
      )}

      {/* Structural Network Particle Field */}
      {isHigh && (
        <GeometricParticleField 
          quantity={70} 
          color="#D4AF37"
          className="z-[1]"
          staticity={50}
          ease={40}
        />
      )}

      <div className="relative z-10 grid lg:grid-cols-[1fr_minmax(auto,400px)] gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
        <div className="text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="flex items-center gap-3 mb-4 sm:mb-6"
          >
            <motion.span 
              className="h-[2px] bg-accent"
              initial={{ width: isHigh ? 0 : 32 }}
              animate={{ width: 32 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            />
            <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
              Meet the Experts
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-4 text-3xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight mb-4 sm:mb-6"
          >
            {isHigh ? (
              <motion.span
                className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark via-accent to-primary-dark bg-[length:200%_auto]"
                animate={{ backgroundPosition: ['0% center', '200% center'] }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              >
                Our Team
              </motion.span>
            ) : (
              <span className="text-primary-dark">Our Team</span>
            )}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-4 sm:mt-6 text-base sm:text-xl text-gray-500 leading-relaxed font-light"
          >
            Delphin Associates is built on experienced leadership and technically strong execution. Our management and engineering teams work together to deliver quality, transparency, and timely completion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-start items-stretch sm:items-start"
          >
            <a
              href="#management-team"
              className={`group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-accent text-black font-bold text-sm sm:text-base shadow-[0_8px_30px_rgba(212,175,55,0.25)] hover:bg-[#b0912f] transition-all duration-300 transform hover:-translate-y-0.5 ${isHigh ? 'liquid-glass-btn-accent-invert' : ''}`}
            >
              Management Team
            </a>
            <a
              href="#technical-team"
              className={`group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-white border border-gray-200 text-primary-dark font-bold text-sm sm:text-base hover:border-gray-300 hover:shadow-sm transition-all duration-300 transform hover:-translate-y-0.5 ${isHigh ? 'liquid-glass-btn-light-invert' : ''}`}
            >
              Technical Team
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="grid gap-3 sm:gap-5 mt-8 sm:mt-0"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: 20, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.5 + idx * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
                whileHover={isHigh ? { scale: 1.03, x: -4, boxShadow: "0 20px 40px -8px rgba(212,175,55,0.15)" } : { y: -4 }}
                className={`group relative rounded-2xl border border-gray-100 ${tier === 'very-low' ? 'bg-white' : (tier === 'low' ? 'bg-white/95' : 'bg-white/60 backdrop-blur-md')} p-4 sm:p-6 transition-colors hover:border-accent/20 flex flex-col justify-center`}
              >
                {/* Animated accent border on hover - High Tier */}
                {isHigh && (
                  <motion.div 
                    className="absolute inset-0 rounded-2xl border-2 border-accent/0 group-hover:border-accent/20 transition-colors duration-500 pointer-events-none"
                  />
                )}
                <div className="flex items-center gap-4 mb-2">
                  <div className="bg-accent/10 w-10 sm:w-12 h-10 sm:h-12 rounded-xl flex items-center justify-center">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent group-hover:text-yellow-600 transition-colors" />
                  </div>
                  <div className="text-2xl sm:text-4xl font-black text-primary-dark font-display">{stat.value}</div>
                </div>
                <div className="text-[10px] sm:text-xs font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
