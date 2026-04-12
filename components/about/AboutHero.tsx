"use client";

import { motion } from "framer-motion";
import { useHPOE } from "../HPOE";
import GeometricParticleField from "../ui/GeometricParticleField";

export default function AboutHero() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;

  return (
    <div className={`relative overflow-hidden rounded-[2.5rem] border ${isHigh ? 'border-accent/20' : 'border-gray-100'} ${tier === 'very-low' ? 'bg-gray-50' : 'bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.08)_0%,transparent_55%),linear-gradient(180deg,rgba(255,255,255,0.95)_0%,rgba(250,250,250,0.95)_100%)]'} shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-5 pt-8 pb-12 sm:px-12 sm:pt-10 sm:pb-20 xl:pt-12 xl:pb-24 mb-12 sm:mb-20 md:mb-24`}>
      {/* Decorative dots pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>
      
      {/* Animated Golden Border Glow - High Tier */}
      {isHigh && (
        <motion.div
          className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-[2]"
          style={{
            background: `linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.15) 50%, transparent 100%)`,
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
          <motion.div
            className="pointer-events-none absolute top-1/3 left-1/2 w-48 h-48 rounded-full bg-yellow-400/5 blur-[60px]"
            animate={{ 
              x: [0, 40, -30, 0], 
              y: [0, -20, 25, 0],
              opacity: [0.3, 0.6, 0.2, 0.3],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
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

      {/* Structural Network Particle Field - High Tier Exclusive */}
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
          className="flex items-center justify-center gap-3 mb-6"
        >
          {/* Animated expanding accent lines - High Tier */}
          <motion.span 
            className="h-[2px] bg-accent"
            initial={{ width: isHigh ? 0 : 32 }}
            animate={{ width: 32 }}
            transition={{ duration: 1.2, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          />
          <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
            Since 1999
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
          className="text-[28px] leading-tight sm:text-4xl md:text-5xl lg:text-7xl font-bold font-display tracking-tight mb-4 sm:mb-6"
        >
          {isHigh ? (
            <motion.span
              className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark via-accent to-primary-dark bg-[length:200%_auto]"
              animate={{ backgroundPosition: ['0% center', '200% center'] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              Delphin Associates
            </motion.span>
          ) : (
            <span className="text-primary-dark">Delphin Associates</span>
          )}
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
          {[
            { value: "25+", label: "Years Experience" },
            { value: "100%", label: "Quality Assurance" },
            { value: "E2E", label: "Execution & Consultancy" },
          ].map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 + idx * 0.12, ease: [0.21, 0.47, 0.32, 0.98] }}
              whileHover={isHigh ? { scale: 1.05, y: -4, boxShadow: "0 20px 40px -8px rgba(212,175,55,0.15)" } : { y: -4 }}
              className={`rounded-2xl border border-gray-100 ${tier === 'very-low' ? 'bg-white' : (tier === 'low' ? 'bg-white/95' : 'bg-white/60 backdrop-blur-md')} p-5 sm:p-8 transition-colors hover:border-accent/20 ${isHigh ? 'cursor-default' : ''}`}
            >
              <div className="text-2xl sm:text-4xl font-black text-primary-dark mb-2 font-display">{stat.value}</div>
              <div className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}


