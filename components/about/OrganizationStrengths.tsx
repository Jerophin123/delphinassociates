"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Timer,
  HardHat,
  MessageSquare,
  ClipboardCheck,
  LifeBuoy,
} from "lucide-react";
import { usePerformance } from "../PerformanceProvider";

const strengths = [
  {
    icon: ShieldCheck,
    title: "First-Quality Standards",
    description:
      "Maintaining first-quality standards in all our projects, ensuring durability and excellence.",
  },
  {
    icon: Timer,
    title: "Timely Completion",
    description:
      "Committed to timely completion of every work, respecting client deadlines and project schedules.",
  },
  {
    icon: HardHat,
    title: "Technically Strong Team",
    description:
      "Highly experienced design and execution team with expertise across all construction domains.",
  },
  {
    icon: MessageSquare,
    title: "Free Consultancy Support",
    description:
      "Providing free consultancy support for clients, helping them make informed decisions.",
  },
  {
    icon: ClipboardCheck,
    title: "Transparent Execution",
    description:
      "Transparent execution and budgeting, ensuring clients are always informed and involved.",
  },
  {
    icon: LifeBuoy,
    title: "Post-Completion Service",
    description:
      "Continuous service even after project completion, ensuring long-term satisfaction and support.",
  },
];

export default function OrganizationStrengths() {
  const { tier } = usePerformance();
  return (
    <section className="mb-12 sm:mb-20 md:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mb-8 sm:mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-8 bg-accent"></span>
          <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
            Why Choose Us
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-primary-dark tracking-tight">
          Organization Strengths
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {strengths.map((strength, index) => (
          <motion.div
            key={strength.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
            className={`group relative ${tier === 'very-low' ? 'bg-white' : 'bg-white/95 liquid-glass-card'} rounded-[2rem] overflow-hidden border border-gray-200 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2),0_16px_32px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 will-change-transform hover:-translate-y-2 p-6 sm:p-8 flex flex-col h-full hover:border-gray-300`}
          >
            {/* Subtle Gradient background on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative z-10 flex flex-col items-start h-full">
              <div className="mb-6 p-3 sm:p-4 rounded-2xl bg-gray-50 group-hover:bg-accent/10 transition-colors duration-500 shadow-sm border border-black/5 flex items-center justify-center">
                <strength.icon className="w-6 h-6 sm:w-8 sm:h-8 text-gray-700 group-hover:text-accent transition-colors duration-500" />
              </div>
              
              <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 text-gray-900 group-hover:text-accent transition-colors duration-300">
                {strength.title}
              </h3>
              
              <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-light mt-auto">
                {strength.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
