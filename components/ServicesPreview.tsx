"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Factory, School, Church, Wrench, CheckCircle, ArrowRight } from "lucide-react";

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

export default function ServicesPreview() {
  return (
    <section
      id="home-services-preview"
      className="relative z-10 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-primary-dark to-primary overflow-hidden border-y border-accent/10"
    >
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ 
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8
          }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
          style={{ willChange: 'opacity, transform' }}
        >
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-display text-white tracking-[0.02em]">
            Our Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#B0B0B0] max-w-3xl mx-auto leading-relaxed px-2">
            Comprehensive construction and consultancy solutions tailored to your project needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  mass: 0.8,
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
                className="group relative bg-primary/40 rounded-3xl p-4 sm:p-6 md:p-8 border border-white/10 hover:border-accent/30 transition-[box-shadow,border-color] duration-300 ease-out overflow-hidden shadow-[0_12px_28px_-18px_rgba(0,0,0,0.65)] hover:shadow-[0_48px_110px_-40px_rgba(0,0,0,0.80)]"
                style={{ willChange: "transform" }}
              >
                {/* 3D depth layers (static, no mouse tracking) */}
                <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/15 via-transparent to-accent-light/10" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 via-black/15 to-transparent opacity-100 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="pointer-events-none absolute left-0 top-0 h-24 w-24 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.35)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon with gradient background */}
                <motion.div 
                  className={`mb-4 sm:mb-6 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    type: "spring",
                    stiffness: 150,
                    damping: 18,
                    mass: 0.6,
                    delay: index * 0.08 + 0.1
                  }}
                  whileHover={{ 
                    scale: 1.08,
                    transition: {
                      type: "spring",
                      stiffness: 500,
                      damping: 30
                    }
                  }}
                  style={{ willChange: 'transform' }}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </motion.div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-white group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-[#B0B0B0] leading-relaxed mb-2 sm:mb-4">{service.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/services"
            className="group inline-flex items-center space-x-2 sm:space-x-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-accent text-black rounded-xl font-bold text-sm sm:text-base md:text-lg hover:bg-accent-light transition-all duration-300 shadow-2xl shadow-accent/25 hover:shadow-accent/45"
          >
            <span>Explore All Services</span>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
