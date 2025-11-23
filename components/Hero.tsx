"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";

export default function Hero() {

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-12 sm:pb-8 md:pb-6 lg:pb-0" style={{ marginBottom: 0 }}>
      {/* Hero Image Background - covers full viewport including header area */}
      <div className="fixed inset-0 w-full h-full z-0" style={{ transform: 'translateZ(0)', bottom: 0, height: '100vh' }}>
        <div className="absolute inset-0 w-full h-full" style={{ willChange: 'transform', transform: 'translateZ(0)', bottom: 0, height: '100vh' }}>
          <Image
            src="/hero_image.jpg"
            alt="Hero background"
            fill
            priority
            quality={85}
            className="object-cover"
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
              radial-gradient(ellipse at top left, rgba(13, 17, 55, 0.7) 0%, transparent 50%),
              radial-gradient(ellipse at top right, rgba(13, 17, 55, 0.5) 0%, transparent 50%),
              radial-gradient(ellipse at bottom center, rgba(13, 17, 55, 0.6) 0%, transparent 50%),
              linear-gradient(to top, rgba(13, 17, 55, 0.7) 0%, rgba(13, 17, 55, 0.2) 50%, transparent 100%)
            `,
            willChange: 'opacity',
            transform: 'translateZ(0)',
            bottom: 0,
            height: '100vh',
            width: '100%',
          }}
        />
      </div>

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

      {/* Optimized floating orbs - reduced blur for performance, GPU accelerated */}
      <div 
        className="absolute top-16 left-4 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-accent/8 rounded-full blur-3xl animate-pulse z-[1] pointer-events-none" 
        style={{ 
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
        }}
      />
      <div 
        className="absolute bottom-16 right-4 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] bg-primary-light/8 rounded-full blur-3xl animate-pulse z-[1] pointer-events-none" 
        style={{ 
          animationDelay: '1s',
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
        }}
      />
      <div 
        className="absolute top-1/2 left-1/4 w-32 h-32 sm:w-48 sm:h-48 bg-accent-light/5 rounded-full blur-2xl animate-pulse z-[1] pointer-events-none" 
        style={{ 
          animationDelay: '2s',
          willChange: 'opacity, transform',
          transform: 'translateZ(0)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-5 md:px-8 lg:px-12 xl:px-16 py-8 sm:py-12 md:py-16 lg:py-20 w-full mt-16 sm:mt-12 md:mt-8 lg:mt-4">
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
            <h1 className="text-6xl sm:text-7xl md:text-7xl lg:text-8xl xl:text-8xl 2xl:text-8xl font-bold mb-4 sm:mb-5 md:mb-6 lg:mb-8 font-display leading-[1.1] md:leading-tight tracking-tight">
              <motion.span 
                className="block text-white drop-shadow-lg"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 120,
                  damping: 22,
                  mass: 0.7,
                  delay: 0.2
                }}
                style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
              >
                You Dream
              </motion.span>
              <motion.span 
                className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent mt-1 sm:mt-1.5 md:mt-2 lg:mt-2.5 drop-shadow-lg"
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ 
                  type: "spring",
                  stiffness: 120,
                  damping: 22,
                  mass: 0.7,
                  delay: 0.3
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
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 md:text-gray-200 mb-6 sm:mb-7 md:mb-8 lg:mb-10 xl:mb-12 font-light leading-relaxed md:leading-relaxed max-w-3xl lg:max-w-4xl drop-shadow-md"
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
                className="group relative px-5 sm:px-6 md:px-7 lg:px-8 xl:px-10 py-3 sm:py-3.5 md:py-4 lg:py-5 bg-accent text-white rounded-xl md:rounded-lg font-bold text-sm sm:text-base md:text-lg shadow-2xl shadow-accent/30 hover:shadow-accent/50 hover:bg-accent-light transition-[background-color,box-shadow,transform] duration-300 ease-out flex items-center justify-center space-x-2 sm:space-x-2.5 md:space-x-3 overflow-hidden w-full sm:w-auto min-h-[48px] sm:min-h-[52px] md:min-h-[56px] will-change-transform hover:scale-[1.02] active:scale-[0.98]"
                style={{ transform: 'translateZ(0)' }}
              >
                <span className="relative z-10">Start Your Project</span>
                <ArrowRight
                  className="relative z-10 group-hover:translate-x-1 transition-transform duration-300 ease-out will-change-transform w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
                  style={{ transform: 'translateZ(0)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-accent-light via-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
                <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out"></div>
              </Link>
              <Link
                href="/projects"
                className="group px-5 sm:px-6 md:px-7 lg:px-8 xl:px-10 py-3 sm:py-3.5 md:py-4 lg:py-5 bg-white/5 backdrop-blur-sm text-white border-2 border-white/60 rounded-xl md:rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-white/95 hover:text-primary-dark transition-[background-color,color,border-color,box-shadow,transform] duration-300 ease-out flex items-center justify-center space-x-2 sm:space-x-2.5 md:space-x-3 w-full sm:w-auto min-h-[48px] sm:min-h-[52px] md:min-h-[56px] shadow-xl hover:shadow-2xl will-change-transform hover:scale-[1.02] active:scale-[0.98] hover:border-white/90"
                style={{ transform: 'translateZ(0)' }}
              >
                <Play className="group-hover:scale-110 transition-transform duration-300 ease-out will-change-transform w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" style={{ transform: 'translateZ(0)' }} />
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
        <div className="w-6 h-10 md:w-7 md:h-11 border-2 border-white/60 rounded-full flex justify-center backdrop-blur-sm bg-white/5 shadow-lg" style={{ transform: 'translateZ(0)' }}>
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="w-1.5 h-3 md:h-3.5 bg-white rounded-full mt-2"
            style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          />
        </div>
      </motion.div>
    </section>
  );
}
