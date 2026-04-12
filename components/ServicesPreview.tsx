"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Factory, School, Church, Wrench, CheckCircle, ArrowRight } from "lucide-react";
import { useHPOE } from "@/components/HPOE";
import GeometricParticleField from "@/components/ui/GeometricParticleField";

const services = [
  {
    icon: Building2,
    title: "Residential Construction",
    description: "Premium residential flats and buildings with modern amenities",
    color: "from-accent to-accent-light",
  },
  {
    icon: Factory,
    title: "Industrial & Commercial",
    description: "Factory buildings and commercial spaces built to last",
    color: "from-accent-light to-accent",
  },
  {
    icon: School,
    title: "Institutional Buildings",
    description: "Educational and institutional structures",
    color: "from-accent-light to-accent",
  },
  {
    icon: Church,
    title: "Church Buildings",
    description: "Sacred spaces and community centers",
    color: "from-accent to-accent-light",
  },
  {
    icon: Wrench,
    title: "Consultancy Services",
    description: "Expert building consultancy and planning",
    color: "from-accent to-accent-dark",
  },
  {
    icon: CheckCircle,
    title: "Turnkey Projects",
    description: "End-to-end project execution",
    color: "from-accent-dark to-accent-light",
  },
];

const ServiceCard = ({ service, index, tier, reducedMotion }: any) => {
  const Icon = service.icon;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (tier !== 'high' || reducedMotion || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const rotateX = isHovered && tier === 'high' && !reducedMotion ? ((mousePosition.y / (cardRef.current?.clientHeight || 200)) - 0.5) * -15 : 0;
  const rotateY = isHovered && tier === 'high' && !reducedMotion ? ((mousePosition.x / (cardRef.current?.clientWidth || 200)) - 0.5) * 15 : 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: reducedMotion ? 0 : 0.6,
        delay: reducedMotion ? 0 : index * 0.1,
        ease: [0.21, 0.47, 0.32, 0.98]
      }}
      animate={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      style={{ willChange: "transform, opacity" }}
      className={`group relative rounded-2xl sm:rounded-3xl p-5 sm:p-8 overflow-hidden ${tier === 'very-low' ? 'bg-black shadow-none scale-100 hover:scale-100' : (tier === 'high' ? 'liquid-glass-card-dark' : (tier === 'mid' ? 'bg-white/[0.05]' : 'bg-[#0a0a0a]'))} border border-white/10 hover:border-accent/40 transition-[border-color,box-shadow,transform] duration-500 hover:shadow-2xl ${tier === 'low' || tier === 'very-low' ? '' : 'hover:shadow-accent/10'} ${tier === 'high' ? '' : (tier === 'very-low' ? '' : 'hover:-translate-y-2')}`}
    >
      {tier === 'high' && isHovered && !reducedMotion && (
        <div
          className="absolute inset-0 pointer-events-none z-0 transition-opacity duration-300"
        >
          {/* Sweeping Reflective Glass Glare */}
          <div 
            className="absolute inset-0 mix-blend-overlay"
            style={{
              background: `linear-gradient(105deg, transparent ${(mousePosition.x / (cardRef.current?.clientWidth || 200)) * 50}%, rgba(255, 255, 255, 0.4) ${(mousePosition.x / (cardRef.current?.clientWidth || 200)) * 100}%, transparent ${(mousePosition.x / (cardRef.current?.clientWidth || 200)) * 150 + 20}%)`
            }}
          />
          {/* Focused Spot Reflection */}
          <div 
            className="absolute inset-0 mix-blend-screen opacity-80"
            style={{
              background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212,175,55,0.12), transparent 40%)`
            }}
          />
        </div>
      )}

      {tier !== 'low' && tier !== 'very-low' && (
        <>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-accent/10 via-transparent to-transparent pointer-events-none" style={{ transform: "translate3d(0,0,0)", willChange: "opacity" }} />
          <div className="absolute -right-12 -top-12 w-48 h-48 bg-accent/20 rounded-full blur-[40px] sm:blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{ transform: "translate3d(0,0,0)", willChange: "opacity" }}></div>
        </>
      )}

      <div className={`relative z-10 flex flex-col h-full transform-gpu ${tier === 'high' && isHovered && !reducedMotion ? 'translate-z-10' : ''}`}>
        <div className={`mb-6 sm:mb-8 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl ${tier === 'high' && !reducedMotion ? 'liquid-glass-card-dark' : (tier === 'very-low' ? 'bg-accent' : `bg-gradient-to-br ${service.color}`)} flex items-center justify-center shadow-lg shadow-black/50 group-hover:scale-110 transition-all duration-500 ease-out`}>
          <Icon className={`w-6 h-6 sm:w-8 sm:h-8 ${tier === 'high' && !reducedMotion ? 'text-white group-hover:text-accent' : 'text-black'} transition-colors duration-300`} />
        </div>

        <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-accent transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light mb-6 flex-grow">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

export default function ServicesPreview() {
  const { tier, reducedMotion } = useHPOE();

  return (
    <section
      id="home-services-preview"
      className={`relative z-10 py-12 sm:py-20 md:py-28 ${tier === 'very-low' ? 'bg-primary-dark' : 'bg-gradient-to-b from-primary-dark/95 to-primary/95'} overflow-hidden border-y border-white/5`}
    >
      {/* Background decoration - dynamically optimized based on hardware */}
      {tier !== 'low' && tier !== 'very-low' && (
        <>
          <div 
            className={`absolute top-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full ${tier === 'mid' ? 'blur-[30px] sm:blur-[40px]' : 'blur-[60px] sm:blur-[120px]'} pointer-events-none`}
            style={{ transform: "translate3d(-25%, -50%, 0)", willChange: "transform" }}
          ></div>
          <div 
            className={`absolute bottom-0 right-0 w-[400px] h-[400px] bg-accent-light/5 rounded-full ${tier === 'mid' ? 'blur-[30px] sm:blur-[40px]' : 'blur-[50px] sm:blur-[100px]'} pointer-events-none`}
            style={{ transform: "translate3d(25%, 33%, 0)", willChange: "transform" }}
          ></div>
        </>
      )}

      {/* Structural Network Particle Field - High Tier */}
      {tier === 'high' && !reducedMotion && (
        <GeometricParticleField 
          quantity={70} 
          color="#D4AF37"
          className="z-[1]"
          staticity={50}
          ease={40}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-accent"></span>
            <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
              Our Expertise
            </span>
            <span className="h-[2px] w-8 bg-accent"></span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 sm:mb-6 font-display text-white tracking-tight">
            Our Services
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed font-light">
            Comprehensive construction and consultancy solutions tailored to your project needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 mb-12 sm:mb-16 md:mb-20">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} tier={tier} reducedMotion={reducedMotion} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/services"
            className={`group relative inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 font-bold text-sm sm:text-base text-white transition-all duration-300 bg-primary-dark rounded-xl border border-gray-800 hover:bg-gray-900 overflow-hidden ${tier === 'high' && !reducedMotion ? 'liquid-glass-btn-dark' : ''}`}
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore All Services
              <svg className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            {tier !== 'very-low' && <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />}
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
