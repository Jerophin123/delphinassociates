"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { usePerformance } from "@/components/PerformanceProvider";

const PARTICLES = [
  { size: 3, x: 10, y: 120, duration: 25, delay: 0 },
  { size: 4, x: 30, y: 140, duration: 35, delay: 2 },
  { size: 2, x: 50, y: 110, duration: 20, delay: 5 },
  { size: 5, x: 70, y: 130, duration: 40, delay: 1 },
  { size: 2, x: 80, y: 115, duration: 28, delay: 8 },
  { size: 3, x: 95, y: 165, duration: 32, delay: 3 },
  { size: 4, x: 15, y: 150, duration: 22, delay: 6 },
  { size: 2, x: 45, y: 110, duration: 30, delay: 4 },
  { size: 3, x: 60, y: 170, duration: 26, delay: 7 },
  { size: 5, x: 85, y: 145, duration: 38, delay: 2 },
  { size: 2, x: 25, y: 135, duration: 24, delay: 9 },
  { size: 4, x: 5, y: 185, duration: 34, delay: 1 },
];

export default function Hero() {
  const { tier, reducedMotion } = usePerformance();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (tier !== 'high' || reducedMotion) return;
    
    // Throttle for performance
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [tier, reducedMotion]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-12 sm:pb-8 md:pb-6 lg:pb-0" style={{ marginBottom: 0 }}>
      {/* Hero Image Background - covers full viewport including header area */}
      <div className="fixed inset-0 w-full h-full z-0" style={{ transform: 'translateZ(0)', bottom: 0, height: '100vh' }}>
        <div className="absolute inset-0 w-full h-full" style={{ willChange: 'transform', transform: 'translateZ(0)', bottom: 0, height: '100vh' }}>
          <Image
            src="/hero_background.jpg"
            alt="Hero background"
            fill
            priority
            quality={85}
            className="object-cover hidden sm:block"
            sizes="100vw"
            style={{ 
              transform: 'translateZ(0)',
              filter: 'brightness(0.65)',
            }}
          />
          <Image
            src="/hero_background_mobile.jpg"
            alt="Hero background mobile"
            fill
            priority
            quality={85}
            className="object-cover sm:hidden"
            sizes="100vw"
            style={{ 
              transform: 'translateZ(0)',
              filter: 'brightness(0.65)',
            }}
          />
        </div>
        
        {/* Optimized combined gradient overlay for depth and readability */}
        <div 
          className="absolute inset-0" 
          style={{
            background: `
              radial-gradient(ellipse at top left, rgba(212, 175, 55, 0.18) 0%, transparent 52%),
              radial-gradient(ellipse at top right, rgba(197, 164, 109, 0.14) 0%, transparent 52%),
              radial-gradient(ellipse at bottom center, rgba(10, 10, 10, 0.85) 0%, transparent 55%),
              linear-gradient(to top, rgba(10, 10, 10, 0.98) 0%, rgba(18, 18, 18, 0.72) 45%, transparent 100%)
            `,
            willChange: 'opacity',
            transform: 'translateZ(0)',
            bottom: 0,
            height: '100vh',
            width: '100%',
          }}
        />
      </div>

      {/* Flagship Interactive Engine Spotlight */}
      {tier === 'high' && !reducedMotion && (
        <div 
          className="pointer-events-none fixed inset-0 z-[2] transition-opacity duration-300"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.08), transparent 40%)`,
          }}
        />
      )}

      {/* Optimized grid pattern overlay - GPU accelerated */}
      <div 
        className="absolute inset-0 opacity-[0.03] md:opacity-[0.05] z-[1] pointer-events-none" 
        style={{ 
          willChange: 'opacity',
          transform: 'translateZ(0)',
          bottom: 0,
          height: '100vh',
          width: '100%',
        }}
      >
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'translateZ(0)',
          }}
        />
      </div>

      {/* Optimized floating orbs - conditionally rendered based on hardware tier */}
      {tier !== 'low' && (
        <>
          <div 
            className={`absolute top-16 left-4 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-accent/8 rounded-full ${tier === 'mid' ? 'blur-xl' : 'blur-2xl sm:blur-3xl'} ${reducedMotion ? '' : 'md:animate-pulse'} z-[1] pointer-events-none`}
            style={{ 
              willChange: 'opacity, transform',
              transform: 'translateZ(0)',
            }}
          />
          <div 
            className={`absolute bottom-16 right-4 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] bg-primary-light/8 rounded-full ${tier === 'mid' ? 'blur-xl' : 'blur-2xl sm:blur-3xl'} ${reducedMotion ? '' : 'md:animate-pulse'} z-[1] pointer-events-none`}
            style={{ 
              animationDelay: '1s',
              willChange: 'opacity, transform',
              transform: 'translateZ(0)',
            }}
          />
          <div 
            className={`absolute top-1/2 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-accent-light/5 rounded-full ${tier === 'mid' ? 'blur-lg' : 'blur-xl sm:blur-2xl'} ${reducedMotion ? '' : 'md:animate-pulse'} z-[1] pointer-events-none`}
            style={{ 
              animationDelay: '2s',
              willChange: 'opacity, transform',
              transform: 'translateZ(0)',
            }}
          />
        </>
      )}

      {/* Flagship Floating Particles */}
      {tier === 'high' && !reducedMotion && (
        <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden" style={{ transform: 'translateZ(0)' }}>
          {PARTICLES.map((p, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-accent/40 shadow-[0_0_12px_rgba(212,175,55,0.8)]"
              style={{
                width: p.size,
                height: p.size,
                left: `${p.x}%`,
                top: `${p.y}%`,
              }}
              animate={{
                y: [0, -window.innerHeight - 200],
                x: [0, Math.sin(p.duration) * 50],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                delay: p.delay,
                ease: "linear",
              }}
            />
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 w-full mt-10 sm:mt-12 md:mt-8 lg:mt-4">
        <div className="max-w-4xl lg:max-w-5xl text-left">
          {/* Main Content - Optimized animations with GPU acceleration */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.8
            }}
            style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
          >
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-8xl font-bold mb-4 sm:mb-5 md:mb-6 lg:mb-8 font-display leading-[1.1] md:leading-tight tracking-[0.02em]">
              <motion.span 
                className={`block text-transparent bg-clip-text bg-gradient-to-l from-[#FFFFFF] via-[#FFF2B3] to-[#D4AF37] ${tier === 'low' ? '' : 'drop-shadow-[0_0_22px_rgba(212,175,55,0.65)]'}`}
                initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: reducedMotion ? 0 : undefined,
                  type: "spring",
                  stiffness: 120,
                  damping: 22,
                  mass: 0.7,
                  delay: reducedMotion ? 0 : 0.2
                }}
                style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
              >
                You Dream
              </motion.span>
              <motion.span 
                className={`block text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent-dark mt-1 sm:mt-1.5 md:mt-2 lg:mt-2.5 ${tier === 'low' ? '' : 'drop-shadow-lg'}`}
                initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  duration: reducedMotion ? 0 : undefined,
                  type: "spring",
                  stiffness: 120,
                  damping: 22,
                  mass: 0.7,
                  delay: reducedMotion ? 0 : 0.3
                }}
                style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
              >
                We Build
              </motion.span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.8,
                delay: 0.4
              }}
              className="text-sm sm:text-base md:text-xl lg:text-2xl text-[#B0B0B0] mb-6 sm:mb-7 md:mb-8 lg:mb-10 xl:mb-12 font-light leading-relaxed md:leading-relaxed max-w-3xl lg:max-w-4xl drop-shadow-md"
              style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
            >
              Leading civil construction company in Chennai, Tamil Nadu, delivering
              excellence in residential, industrial, commercial, institutional, and
              church projects.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 100,
                damping: 20,
                mass: 0.8,
                delay: 0.5
              }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-5 lg:gap-6 justify-start items-stretch sm:items-center w-full sm:w-auto"
              style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
            >
              <Link
                href="/contact"
                className={`group relative px-5 sm:px-6 md:px-7 lg:px-8 xl:px-10 py-3 sm:py-3.5 md:py-4 lg:py-5 bg-accent text-black rounded-xl font-bold text-sm sm:text-base md:text-lg ${tier === 'low' ? '' : 'shadow-2xl shadow-accent/30 hover:shadow-accent/55'} hover:bg-accent-light transition-[background-color,box-shadow,transform] duration-300 ease-out flex items-center justify-center space-x-2 sm:space-x-2.5 md:space-x-3 overflow-hidden w-full sm:w-auto min-h-[44px] sm:min-h-[52px] md:min-h-[56px] will-change-transform ${tier === 'low' ? '' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                style={{ transform: 'translateZ(0)' }}
              >
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight
                  className={`relative z-10 ${tier === 'low' ? '' : 'group-hover:translate-x-1'} transition-transform duration-300 ease-out will-change-transform w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6`}
                  style={{ transform: 'translateZ(0)' }}
                />
                {tier !== 'low' && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-accent-light via-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                  </>
                )}
              </Link>
              <Link
                href="/projects"
                className={`group px-5 sm:px-6 md:px-7 lg:px-8 xl:px-10 py-3 sm:py-3.5 md:py-4 lg:py-5 ${tier === 'low' ? 'bg-black/60 border-accent text-white' : 'bg-primary-dark/25 backdrop-blur-sm text-white border-accent/60'} border-2 rounded-xl font-bold text-sm sm:text-base md:text-lg hover:bg-accent/10 hover:text-accent transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out flex items-center justify-center space-x-2 sm:space-x-2.5 md:space-x-3 w-full sm:w-auto min-h-[44px] sm:min-h-[52px] md:min-h-[56px] shadow-xl ${tier === 'low' ? '' : 'hover:shadow-[0_0_30px_rgba(212,175,55,0.12)] hover:scale-[1.02] active:scale-[0.98]'} hover:border-accent/90 will-change-transform`}
                style={{ transform: 'translateZ(0)' }}
              >
                <Play className={`${tier === 'low' ? '' : 'group-hover:scale-110'} transition-transform duration-300 ease-out will-change-transform w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6`} style={{ transform: 'translateZ(0)' }} />
                <span>View Portfolio</span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Optimized Scroll Indicator - GPU accelerated */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, repeat: Infinity, repeatType: "reverse", duration: 2.5 }}
        className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block pointer-events-none"
        style={{ willChange: 'opacity', transform: 'translateZ(0) translateX(-50%)' }}
      >
        <div className="w-6 h-10 md:w-7 md:h-11 border-2 border-accent/40 rounded-full flex justify-center backdrop-blur-sm bg-primary-dark/30 shadow-lg" style={{ transform: 'translateZ(0)' }}>
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 md:h-3.5 bg-accent rounded-full mt-2"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
