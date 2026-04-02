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
import { usePerformance } from "../PerformanceProvider";

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
  const { tier } = usePerformance();
  return (
    <div className="grid md:grid-cols-2 gap-6 sm:gap-10">
      {services.map((service, index) => {
        const Icon = service.icon;
        
        return (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className={`group relative ${tier === 'very-low' ? 'bg-white shadow-none hover:translate-y-0' : 'bg-white/95 liquid-glass-card'} rounded-[2.5rem] overflow-hidden border border-gray-200 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2),0_16px_32px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 will-change-transform hover:-translate-y-2 flex flex-col h-full hover:border-gray-300`}
          >
            {/* Soft Hover Overlay Effect */}
            {tier !== 'very-low' && <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />}

            {/* Gradient Header Section */}
            <div className={`relative h-24 sm:h-40 ${tier === 'very-low' ? 'bg-gray-50' : 'bg-gray-50/50'} border-b border-gray-100 p-5 sm:p-8 flex items-center justify-center overflow-hidden ${tier === 'very-low' ? '' : 'group-hover:bg-accent/5'} transition-colors duration-500`}>
              {/* Subtle pattern */}
              {tier !== 'very-low' && (
                <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, black 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
              )}
              
              {/* Icon Container */}
              <div className={`relative z-10 w-14 h-14 sm:w-20 sm:h-20 bg-white border border-gray-100/60 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] ${tier === 'very-low' ? '' : 'group-hover:shadow-[0_8px_30px_rgba(212,175,55,0.15)] group-hover:scale-110'} transition-all duration-500`}>
                <Icon className="w-6 h-6 sm:w-10 sm:h-10 text-gray-700 group-hover:text-accent transition-colors duration-500" />
              </div>
            </div>

            {/* Content Section */}
            <div className="p-6 sm:p-10 flex-1 flex flex-col">
              <h3 className="text-xl sm:text-3xl font-bold mb-3 sm:mb-4 text-primary-dark font-display group-hover:text-accent transition-colors duration-300">
                {service.title}
              </h3>
              
              <p className="text-gray-500 font-light mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base">
                {service.description}
              </p>
              
              {/* Features Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-auto mb-8 sm:mb-10">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-start space-x-3 group/feature">
                    <div className="mt-1 flex-shrink-0">
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent/80 group-hover/feature:text-accent transition-colors" />
                    </div>
                    <span className="text-sm sm:text-base text-gray-600 font-medium group-hover/feature:text-gray-900 transition-colors">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div>
                <Link
                  href="/contact"
                  className={`group/btn inline-flex items-center justify-center w-full px-5 py-3 sm:px-6 sm:py-4 ${tier === 'very-low' ? 'bg-white' : 'bg-gray-50 hover:bg-accent'} border border-gray-100 rounded-xl font-bold text-sm sm:text-base text-gray-700 hover:text-black transition-all duration-300 shadow-sm ${tier === 'very-low' ? '' : 'hover:shadow-[0_8px_30px_rgba(212,175,55,0.25)]'}`}
                >
                  <span>Discuss This Service</span>
                  <div className={`ml-2 ${tier === 'very-low' ? '' : 'group-hover/btn:translate-x-1.5'} transition-transform duration-300`}>
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                </Link>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
