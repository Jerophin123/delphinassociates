"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { useHPOE } from "@/components/HPOE";
import MagneticButton from "./ui/MagneticButton";

export default function Hero() {
  const { tier, reducedMotion } = useHPOE();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  const gridY = useTransform(scrollY, [0, 1000], [0, 250]); // Substantial but buttery depth parallax
  const orbY = useTransform(scrollY, [0, 1000], [0, -150]);

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
    <section className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden pb-12 sm:pb-8 md:pb-6 lg:pb-0" style={{ marginBottom: 0 }}>
      {/* Hero Image Background - covers full viewport including header area */}
      <div className="fixed inset-0 w-full h-full z-0" style={{ transform: 'translateZ(0)', bottom: 0, height: '100vh', backgroundColor: tier === 'very-low' ? '#0A0A0A' : 'transparent' }}>
        {tier !== 'very-low' && (
          <div className="absolute inset-0 w-full h-full will-change-transform" style={{ transform: 'translateZ(0)', bottom: 0, height: '100vh' }}>
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
        )}
        
        {/* Optimized combined gradient overlay for depth and readability */}
        <div 
          className="absolute inset-0" 
          style={{
            background: tier === 'very-low' 
              ? `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M40 0H0v40' stroke='rgba(255,255,255,0.05)' stroke-width='1' fill='none'/%3E%3C/svg%3E")` 
              : `
                radial-gradient(ellipse at top left, rgba(212, 175, 55, 0.18) 0%, transparent 52%),
                radial-gradient(ellipse at top right, rgba(197, 164, 109, 0.14) 0%, transparent 52%),
                radial-gradient(ellipse at bottom center, rgba(10, 10, 10, 0.85) 0%, transparent 55%),
                linear-gradient(to top, rgba(10, 10, 10, 0.98) 0%, rgba(18, 18, 18, 0.72) 45%, transparent 100%)
              `,
            willChange: tier === 'very-low' ? 'auto' : 'opacity',
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
      <motion.div 
        className="absolute inset-0 opacity-[0.03] md:opacity-[0.05] z-[1] pointer-events-none" 
        style={{ 
          willChange: 'opacity, transform',
          bottom: 0,
          height: '100vh',
          width: '100%',
          y: tier === 'high' && !reducedMotion ? gridY : 0
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
      </motion.div>

      {/* Optimized floating orbs - conditionally rendered based on hardware tier */}
      {tier !== 'low' && (
        <motion.div 
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ y: tier === 'high' && !reducedMotion ? orbY : 0, willChange: 'transform' }}
        >
          <div 
            className={`absolute top-16 left-4 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-accent/8 rounded-full ${tier === 'mid' ? 'blur-lg' : 'blur-2xl sm:blur-3xl'} ${reducedMotion || tier === 'mid' ? '' : 'md:animate-pulse'} z-[1] pointer-events-none`}
            style={{ 
              willChange: 'opacity, transform',
              transform: 'translateZ(0)',
            }}
          />
          <div 
            className={`absolute bottom-16 right-4 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] bg-primary-light/8 rounded-full ${tier === 'mid' ? 'blur-lg' : 'blur-2xl sm:blur-3xl'} ${reducedMotion || tier === 'mid' ? '' : 'md:animate-pulse'} z-[1] pointer-events-none`}
            style={{ 
              animationDelay: '1s',
              willChange: 'opacity, transform',
              transform: 'translateZ(0)',
            }}
          />
          <div 
            className={`absolute top-1/2 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-accent-light/5 rounded-full ${tier === 'mid' ? 'blur-md' : 'blur-xl sm:blur-2xl'} ${reducedMotion || tier === 'mid' ? '' : 'md:animate-pulse'} z-[1] pointer-events-none`}
            style={{ 
              animationDelay: '2s',
              willChange: 'opacity, transform',
              transform: 'translateZ(0)',
            }}
          />
        </motion.div>
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
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl xl:text-8xl 2xl:text-8xl font-bold mb-4 sm:mb-5 md:mb-6 lg:mb-8 font-display leading-[1.1] md:leading-tight tracking-[0.02em]">
              <motion.span 
                className={`block ${tier === 'very-low' ? 'text-white' : `text-transparent bg-clip-text ${tier === 'high' ? 'bg-[linear-gradient(110deg,#D4AF37_0%,#C5A46D_15%,#FFF2B3_30%,#FFFFFF_50%,#FFF2B3_70%,#C5A46D_85%,#D4AF37_100%)] hero-text-premium hero-text-premium-glow' : 'bg-gradient-to-l from-[#FFFFFF] via-[#FFF2B3] to-[#D4AF37]'}`} ${tier === 'low' || tier === 'very-low' ? '' : 'drop-shadow-[0_0_22px_rgba(212,175,55,0.65)]'}`}
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
                className={`block ${tier === 'very-low' ? 'text-accent' : `text-transparent bg-clip-text ${tier === 'high' ? 'bg-[linear-gradient(110deg,#9C7B1E_0%,#C5A46D_15%,#D4AF37_30%,#FFFFFF_50%,#D4AF37_70%,#C5A46D_85%,#9C7B1E_100%)] hero-text-premium hero-text-premium-glow' : 'bg-gradient-to-r from-accent via-accent-light to-accent-dark mt-1 sm:mt-1.5 md:mt-2 lg:mt-2.5'}`} ${tier === 'low' || tier === 'very-low' ? '' : 'drop-shadow-lg'}`}
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
              <MagneticButton className="w-full sm:w-auto">
                <Link
                  href="/contact"
                  className={`group relative px-5 sm:px-6 md:px-7 lg:px-8 xl:px-10 py-3 sm:py-3.5 md:py-4 lg:py-5 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 ease-out flex items-center justify-center space-x-2 sm:space-x-2.5 md:space-x-3 overflow-hidden w-full sm:w-auto min-h-[44px] sm:min-h-[52px] md:min-h-[56px] will-change-transform ${tier === 'high' && !reducedMotion ? 'bg-accent/15 backdrop-blur-xl border border-white/20 text-white shadow-[0_8px_20px_rgba(0,0,0,0.15),inset_0_1px_1px_rgba(255,255,255,0.4)] hover:bg-accent/25 hover:border-white/30 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.5)]' : (tier === 'mid' && !reducedMotion) ? 'mid-glass-btn-accent-invert' : `bg-accent text-black hover:bg-accent-light ${tier === 'low' || tier === 'very-low' ? '' : 'shadow-2xl shadow-accent/30 hover:shadow-accent/55 hover:scale-[1.02] active:scale-[0.98]'}`}`}
                style={{ transform: 'translateZ(0)' }}
              >
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight
                  className={`relative z-10 ${tier === 'low' || tier === 'very-low' ? '' : 'group-hover:translate-x-1'} transition-transform duration-300 ease-out will-change-transform w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6`}
                  style={{ transform: 'translateZ(0)' }}
                />
                </Link>
              </MagneticButton>
              <MagneticButton className="w-full sm:w-auto">
                <Link
                  href="/projects"
                className={`group px-5 sm:px-6 md:px-7 lg:px-8 xl:px-10 py-3 sm:py-3.5 md:py-4 lg:py-5 border-2 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 ease-out flex items-center justify-center space-x-2 sm:space-x-2.5 md:space-x-3 w-full sm:w-auto min-h-[44px] sm:min-h-[52px] md:min-h-[56px] will-change-transform ${tier === 'high' && !reducedMotion ? 'bg-[#fdfbf4]/5 backdrop-blur-xl text-white border-white/15 shadow-[0_8px_20px_rgba(0,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:bg-[#fdfbf4]/10 hover:border-white/30 hover:shadow-[0_12px_24px_rgba(0,0,0,0.2),inset_0_1px_1px_rgba(255,255,255,0.4)]' : (tier === 'mid' && !reducedMotion) ? 'mid-glass-btn-dark' : `text-white ${tier === 'low' ? 'bg-black/60 border-accent' : 'bg-primary-dark/25 backdrop-blur-sm border-accent/60 shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.12)] hover:scale-[1.02] active:scale-[0.98]'} hover:bg-accent/10 hover:text-accent hover:border-accent/90`}`}
                style={{ transform: 'translateZ(0)' }}
              >
                <Play className={`${tier === 'low' ? '' : 'group-hover:scale-110'} transition-transform duration-300 ease-out will-change-transform w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6`} style={{ transform: 'translateZ(0)' }} />
                  <span>View Portfolio</span>
                </Link>
              </MagneticButton>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Optimized Scroll Indicator - GPU accelerated */}
      {tier !== 'very-low' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, repeat: Infinity, repeatType: "reverse", duration: 2.5 }}
          className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 hidden md:block pointer-events-none"
          style={{ willChange: 'opacity', transform: 'translateZ(0) translateX(-50%)' }}
        >
          <div className={`w-6 h-10 md:w-7 md:h-11 border-2 border-accent/40 rounded-full flex justify-center ${tier === 'low' || tier === 'mid' ? 'bg-primary-dark/80' : 'backdrop-blur-sm bg-primary-dark/30'} shadow-lg`} style={{ transform: 'translateZ(0)' }}>
            <motion.div
              animate={{ y: [0, 14, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 md:h-3.5 bg-accent rounded-full mt-2"
              style={{ willChange: 'transform', transform: 'translateZ(0)' }}
            />
          </div>
        </motion.div>
      )}
    </section>
  );
}


