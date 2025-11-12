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
    color: "from-primary to-primary-light",
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
    color: "from-primary-light to-primary",
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
    color: "from-primary-dark to-primary",
  },
];

export default function ServicesPreview() {
  return (
    <section className="relative z-10 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-primary/10 text-primary rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Our Expertise
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-display text-primary">
            Our Services
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Comprehensive construction and consultancy solutions tailored to your project needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_16px_32px_-8px_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-500 border border-gray-100 hover:border-accent/30 hover:-translate-y-3 hover:scale-[1.02]"
              >
                {/* Icon with gradient background */}
                <motion.div 
                  className={`mb-4 sm:mb-6 w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeOut",
                    delay: index * 0.1 
                  }}
                  whileHover={{ 
                    scale: 1.1,
                    transition: { duration: 0.2 }
                  }}
                >
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                </motion.div>

                <h3 className="text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 text-primary group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-2 sm:mb-4">{service.description}</p>

                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}></div>
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
            className="group inline-flex items-center space-x-2 sm:space-x-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-primary text-white rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-primary-dark transition-all duration-300 shadow-xl hover:shadow-2xl"
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
