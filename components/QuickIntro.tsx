"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Award, Users, CheckCircle2, TrendingUp } from "lucide-react";
import { useHPOE } from "@/components/HPOE";
import GeometricParticleField from "./ui/GeometricParticleField";

const stats = [
  { icon: Award, value: "25+", label: "Years of Experience", color: "from-accent to-accent-light" },
  { icon: TrendingUp, value: "100+", label: "Projects Completed", color: "from-accent-light to-accent" },
  { icon: Users, value: "50+", label: "Happy Clients", color: "from-accent-light to-accent" },
  { icon: CheckCircle2, value: "100%", label: "Quality Assured", color: "from-accent to-accent-dark" },
];

function AnimatedCounter({
  value,
  isInView
}: {
  value: string;
  isInView: boolean;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;

    let startTime: number | null = null;
    const duration = 2000;
    let animationFrameId: number;

    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      const currentVal = Math.floor(numericValue * easeOutQuart(percent));

      if (nodeRef.current) {
        nodeRef.current.textContent = currentVal + suffix;
      }

      if (percent < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, numericValue, suffix]);

  if (useHPOE().tier === 'very-low') {
    return (
      <span className="tabular-nums font-variant-numeric-tabular">
        {isInView ? value : `0${suffix}`}
      </span>
    );
  }

  return (
    <span ref={nodeRef} className="tabular-nums font-variant-numeric-tabular">
      0{suffix}
    </span>
  );
}

export default function QuickIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.47, 0.32, 0.98]
      }
    }
  };

  return (
    <section
      id="home-quickintro"
      className={`relative z-10 py-12 sm:py-20 md:py-28 ${tier === 'very-low' ? 'bg-primary-dark' : 'bg-primary-dark/95'} overflow-hidden border-y border-white/5`}
    >
      {tier !== 'low' && tier !== 'very-low' && (
        <>
          <div
            className={`absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full ${tier === 'mid' ? 'blur-[30px] sm:blur-[40px]' : 'blur-[60px] sm:blur-[120px]'} pointer-events-none`}
            style={{ transform: "translate3d(33%, -50%, 0)", willChange: "transform" }}
          ></div>
          <div
            className={`absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent-light/5 rounded-full ${tier === 'mid' ? 'blur-[30px] sm:blur-[40px]' : 'blur-[50px] sm:blur-[100px]'} pointer-events-none`}
            style={{ transform: "translate3d(-25%, 33%, 0)", willChange: "transform" }}
          ></div>
          
          {isHigh && (
            <GeometricParticleField 
              quantity={40} 
              color="#D4AF37"
              className="z-[1]"
              staticity={60}
            />
          )}
        </>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            ref={ref}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-12 bg-accent"></span>
              <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
                About Us
              </span>
            </motion.div>
            <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 sm:mb-6 font-display text-white leading-[1.15] tracking-tight">
              Excellence in <br />
              <span className={`${tier === 'very-low' ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-400'}`}>Construction</span>
              <span className="block mt-2 text-xl sm:text-2xl md:text-4xl text-accent font-medium">Since 1999</span>
            </motion.h2>
            <motion.div variants={itemVariants} className="space-y-6 mb-10">
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light">
                Delphin Associates was established in <strong className="text-white font-medium">1999</strong> by{" "}
                <strong className="text-white font-medium">Mr. Delphin P. Stanley (DCE, B.Tech)</strong>, leading a team of
                young engineers across Tamil Nadu. Our organization provides building consultancy,
                construction, and project execution services for residential,
                industrial, commercial, institutional, and church projects.
              </p>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light">
                We are known for <strong className="text-white font-medium">transparency</strong>, <strong className="text-white font-medium">timely completion</strong>, and
                <strong className="text-white font-medium"> post-completion support</strong>. Our commitment to quality and customer
                satisfaction has made us a trusted name in the construction industry.
              </p>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Link
                href="/about"
                className={`group relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 font-bold text-sm sm:text-base text-white transition-all duration-300 bg-primary-dark rounded-xl border border-gray-800 hover:bg-gray-900 overflow-hidden ${isHigh ? 'liquid-glass-btn-dark !bg-white/5' : tier === 'mid' && !reducedMotion ? 'mid-glass-btn-dark !bg-white/5' : ''}`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Learn More About Us
                  <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                {tier !== 'very-low' && <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />}
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={reducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: reducedMotion ? 0 : 1, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.1,
                      ease: [0.21, 0.47, 0.32, 0.98]
                    }}
                    style={{ willChange: "transform, opacity" }}
                    className={`group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-8 overflow-hidden ${tier === 'very-low' ? 'bg-black opacity-100' : (tier === 'high' ? 'liquid-glass-card-dark' : (tier === 'mid' ? 'bg-white/[0.05]' : 'bg-black/50'))} border border-white/10 hover:border-accent/40 transition-all duration-500 ${tier === 'high' || tier === 'mid' ? 'hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1.5 hover:scale-[1.02]' : ''} ${isHigh ? 'premium-card-hover-shine premium-border-glow' : ''}`}
                  >
                    {tier !== 'low' && tier !== 'very-low' && (
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none" style={{ transform: "translate3d(0,0,0)", willChange: "opacity" }} />
                    )}

                    <div className="relative z-10 flex flex-col items-start gap-y-4">
                      {/* Icon */}
                      <div className="relative p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 group-hover:border-accent/40 group-hover:bg-accent/10 transition-colors duration-500 shadow-inner">
                        {isHigh && (
                          <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-accent/10 animate-[pulse-ring_3s_ease-in-out_infinite] pointer-events-none" />
                        )}
                        <Icon className="w-5 h-5 sm:w-8 sm:h-8 text-white group-hover:text-accent transition-colors duration-300" />
                      </div>

                      {/* Value & Label */}
                      <div>
                        <span className={`text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold ${tier === 'very-low' ? 'text-white' : 'text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:from-accent group-hover:to-accent-light'} tracking-tight transition-all duration-500`}>
                          <AnimatedCounter value={stat.value} isInView={isInView} />
                        </span>
                        <div className="mt-1 sm:mt-2 text-xs sm:text-base text-gray-400 font-medium tracking-wide group-hover:text-gray-300 transition-colors duration-300 font-light">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {isHigh && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-accent/5 rounded-full blur-[60px] sm:blur-[100px] -z-10 pointer-events-none" style={{ transform: "translateZ(0)" }}></div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
