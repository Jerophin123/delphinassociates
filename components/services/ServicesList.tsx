"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Factory,
  School,
  Church,
  Wrench,
  CheckCircle,
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
    <div className="space-y-6 sm:space-y-8 md:space-y-12">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-[0_8px_16px_-4px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08),0_2px_4px_-1px_rgba(0,0,0,0.06)] p-4 sm:p-6 md:p-8 hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_16px_32px_-8px_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01]"
        >
          <div className="flex flex-col md:flex-row gap-4 sm:gap-5 md:gap-6">
            <div className="flex-shrink-0">
              <motion.div 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center"
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
                <service.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-accent" />
              </motion.div>
            </div>
            <div className="flex-1">
              <h2 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-3 text-primary font-display">
                {service.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">{service.description}</p>
              <ul className="grid md:grid-cols-2 gap-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.1 + 0.2
                      }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                    </motion.div>
                    <span className="text-sm sm:text-base text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
