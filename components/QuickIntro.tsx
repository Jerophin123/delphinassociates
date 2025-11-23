"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { Award, Users, CheckCircle2, TrendingUp } from "lucide-react";

const stats = [
  { icon: Award, value: "25+", label: "Years of Experience", color: "from-accent to-accent-light" },
  { icon: TrendingUp, value: "100+", label: "Projects Completed", color: "from-primary to-primary-light" },
  { icon: Users, value: "50+", label: "Happy Clients", color: "from-accent-light to-accent" },
  { icon: CheckCircle2, value: "100%", label: "Quality Assured", color: "from-primary-light to-primary" },
];

// Counter component that animates from 0 to target value
function AnimatedCounter({ 
  value, 
  isInView 
}: { 
  value: string; 
  isInView: boolean;
}) {
  const [count, setCount] = useState(0);
  
  // Extract numeric value and suffix
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');
  
  useEffect(() => {
    if (!isInView) return;
    
    const duration = 2000; // 2 seconds
    const steps = 60; // Number of animation steps
    const increment = numericValue / steps;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const nextValue = Math.min(
        Math.floor(increment * currentStep),
        numericValue
      );
      setCount(nextValue);
      
      if (currentStep >= steps) {
        setCount(numericValue);
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [isInView, numericValue]);
  
  return (
    <span>
      {count}{suffix}
    </span>
  );
}

export default function QuickIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 py-12 sm:py-16 md:py-24 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.8
            }}
            style={{ willChange: 'opacity, transform' }}
          >
            <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold mb-4 sm:mb-6">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 md:mb-8 font-display text-primary leading-tight">
              Excellence in Construction
              <span className="block text-accent mt-1 sm:mt-2">Since 1999</span>
            </h2>
            <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                Delphin Associates was established in <strong className="text-primary">1999</strong> by{" "}
                <strong className="text-primary">Mr. Delphin P. Stanley (DCE, B.Tech)</strong>, leading a team of 
                young engineers across Tamil Nadu. Our organization provides building consultancy,
                construction, and project execution services for residential,
                industrial, commercial, institutional, and church projects.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 leading-relaxed">
                We are known for <strong className="text-accent">transparency</strong>, <strong className="text-accent">timely completion</strong>, and
                <strong className="text-accent"> post-completion support</strong>. Our commitment to quality and customer
                satisfaction has made us a trusted name in the construction industry.
              </p>
            </div>
            <Link
              href="/about"
              className="group inline-flex items-center space-x-2 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-4 bg-primary text-white rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Learn More About Us</span>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 0.8
            }}
            className="relative"
            style={{ willChange: 'opacity, transform' }}
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 120,
                      damping: 20,
                      mass: 0.7,
                      delay: index * 0.08
                    }}
                    whileHover={{ 
                      y: -12,
                      scale: 1.02,
                      transition: {
                        type: "spring",
                        stiffness: 400,
                        damping: 25
                      }
                    }}
                    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-100 hover:border-accent/30 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_16px_32px_-8px_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.1)] transition-[box-shadow,border-color] duration-300 ease-out"
                    style={{ willChange: 'transform' }}
                  >
                    {/* Icon */}
                    <motion.div 
                      className={`mb-3 sm:mb-4 w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={isInView ? { 
                        opacity: 1, 
                        scale: 1,
                        transition: {
                          type: "spring",
                          stiffness: 150,
                          damping: 18,
                          mass: 0.6,
                          delay: index * 0.08 + 0.15
                        }
                      } : { opacity: 0, scale: 0.85 }}
                      whileHover={{ 
                        scale: 1.1,
                        transition: {
                          type: "spring",
                          stiffness: 500,
                          damping: 30
                        }
                      }}
                      style={{ willChange: 'transform' }}
                    >
                      <motion.div
                        animate={isInView ? {
                          scale: [1, 1.2, 1],
                          transition: {
                            delay: index * 0.1 + 0.5,
                            duration: 0.6,
                            ease: "easeOut"
                          }
                        } : {}}
                      >
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white" />
                      </motion.div>
                    </motion.div>
                    
                    {/* Value */}
                    <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-1 sm:mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      <AnimatedCounter value={stat.value} isInView={isInView} />
                    </div>
                    
                    {/* Label */}
                    <div className="text-xs sm:text-sm md:text-base text-gray-600 font-medium">{stat.label}</div>

                    {/* Hover effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                  </motion.div>
                );
              })}
            </div>

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
