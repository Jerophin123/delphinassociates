"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  Factory,
  School,
  Church,
  Wrench,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Residential Construction",
    description:
      "We specialize in designing and constructing premium residential buildings, including deluxe and super deluxe flats. Our residential projects emphasize both economy and quality, ensuring durable structures with modern amenities while adhering to client budgets.",
    features: [
      "Deluxe and Super Deluxe Flats",
      "Modern Amenities & Finishes",
      "Budget-Conscious Design",
      "Quality Construction Standards",
    ],
  },
  {
    icon: Factory,
    title: "Industrial & Commercial Projects",
    description:
      "Comprehensive construction services for industrial facilities, factory buildings, and commercial spaces. We design and execute projects that meet industry standards, ensuring functionality, efficiency, and compliance with regulatory requirements.",
    features: [
      "Factory Buildings",
      "Industrial Complexes",
      "Commercial Spaces",
      "Regulatory Compliance",
    ],
  },
  {
    icon: School,
    title: "Institutional & Church Buildings",
    description:
      "Specialized expertise in constructing educational institutions, colleges, and church buildings. Our projects combine architectural excellence with functional design, creating spaces that serve communities effectively.",
    features: [
      "Educational Institutions",
      "Church Buildings",
      "Community Centers",
      "Sacred Architecture",
    ],
  },
  {
    icon: Wrench,
    title: "Consultancy & Turnkey Projects",
    description:
      "Expert building consultancy services covering planning, design, and project execution. We offer free consultancy support to help clients make informed decisions and provide end-to-end turnkey solutions for complete project management.",
    features: [
      "Building Consultancy",
      "Project Planning & Design",
      "Turnkey Project Execution",
      "Free Consultancy Support",
    ],
  },
];

export default function ServicesList() {
  return (
    <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
      {services.map((service, index) => {
        const isEven = index % 2 === 0;
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
            className={`group relative bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_16px_32px_-8px_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.1)] hover:border-accent/30 transition-[box-shadow,border-color] duration-300 ease-out ${
              isEven ? 'md:flex-row' : 'md:flex-row-reverse'
            }`}
            style={{
              willChange: "transform",
            }}
          >
            {/* 3D depth layers (desktop hover only) */}
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-to-br from-accent/25 via-transparent to-accent-light/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ transform: "translateZ(0)" }}
            />
            <div
              className="pointer-events-none absolute left-10 right-10 -bottom-10 h-14 bg-black/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ transform: "translateZ(0)" }}
            />

            {/* Gradient Header Section */}
            <div className={`relative h-32 sm:h-40 bg-gradient-to-br ${
              index % 4 === 0 ? 'from-accent to-accent-dark' :
              index % 4 === 1 ? 'from-primary to-primary-dark' :
              index % 4 === 2 ? 'from-accent-light to-accent' :
              'from-primary-light to-primary'
            } p-6 sm:p-8 flex items-center justify-center overflow-hidden`}>
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '40px 40px'
                }}></div>
              </div>
              
              {/* Icon */}
              <motion.div
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
                className="relative z-10"
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
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center shadow-xl">
                <Icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                </div>
              </motion.div>
              
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-tr-full"></div>
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-8">
              <motion.h2 
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                  mass: 0.7,
                  delay: index * 0.08 + 0.15
                }}
                className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 text-primary-dark font-display group-hover:text-accent transition-colors duration-300 ease-out"
                style={{ willChange: 'transform, opacity' }}
              >
                {service.title}
              </motion.h2>
              
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.08 + 0.25
                }}
                className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6 leading-relaxed"
                style={{ willChange: 'opacity' }}
              >
                {service.description}
              </motion.p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
                {service.features.map((feature, featureIndex) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      type: "spring",
                      stiffness: 130,
                      damping: 22,
                      mass: 0.6,
                      delay: index * 0.08 + 0.35 + featureIndex * 0.04
                    }}
                    className="flex items-start space-x-2.5 group/feature"
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <motion.div
                      className="mt-0.5 flex-shrink-0"
                      whileHover={{ scale: 1.12 }}
                      transition={{ 
                        type: "spring",
                        stiffness: 600,
                        damping: 25
                      }}
                      style={{ willChange: 'transform' }}
                    >
                      <CheckCircle className="w-5 h-5 text-accent" />
                    </motion.div>
                    <span className="text-sm sm:text-base text-gray-700 group-hover/feature:text-accent transition-colors">
                      {feature}
                    </span>
                  </motion.div>
                ))}
              </div>

              <div className="mt-5 sm:mt-6">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 bg-accent text-black rounded-xl font-bold text-sm sm:text-base hover:bg-accent-light transition-colors shadow-2xl shadow-accent/20 hover:shadow-accent/45"
                >
                  <span>Discuss This Service</span>
                  <motion.div
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                    className="ml-2 inline-flex"
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </Link>
              </div>
            </div>

            {/* Hover Overlay Effect */}
            <motion.div 
              className="absolute inset-0 pointer-events-none rounded-3xl"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 30,
                duration: 0.3
              }}
              style={{
                background: "linear-gradient(to bottom right, rgba(218, 165, 32, 0.05), rgba(26, 35, 126, 0.05))",
                willChange: 'opacity'
              }}
            />
            
            {/* Animated Border Outline - Top */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent origin-left"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 0
              }}
              style={{ willChange: 'transform' }}
            />
            
            {/* Animated Border Outline - Right */}
            <motion.div
              className="absolute top-0 right-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-accent origin-top"
              initial={{ scaleY: 0 }}
              whileHover={{ scaleY: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 0.08
              }}
              style={{ willChange: 'transform' }}
            />
            
            {/* Animated Border Outline - Bottom */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-primary to-accent origin-right"
              initial={{ scaleX: 0 }}
              whileHover={{ scaleX: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 0.16
              }}
              style={{ willChange: 'transform' }}
            />
            
            {/* Animated Border Outline - Left */}
            <motion.div
              className="absolute top-0 left-0 bottom-0 w-0.5 bg-gradient-to-b from-accent via-primary to-accent origin-bottom"
              initial={{ scaleY: 0 }}
              whileHover={{ scaleY: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 400,
                damping: 30,
                delay: 0.24
              }}
              style={{ willChange: 'transform' }}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
