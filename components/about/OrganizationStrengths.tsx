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
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8
      }}
      className="mb-8 sm:mb-12 md:mb-16"
      style={{ willChange: 'opacity, transform' }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 font-display tracking-[0.02em] bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
        Organization Strengths
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {strengths.map((strength, index) => (
          <motion.div
            key={strength.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ 
              type: "spring",
              stiffness: 120,
              damping: 20,
              mass: 0.7,
              delay: index * 0.08
            }}
            whileHover={{ 
              y: -8,
              scale: 1.01,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
              }
            }}
            className="group relative bg-white rounded-3xl p-5 sm:p-6 md:p-7 border border-accent/15 hover:border-accent/35 transition-[box-shadow,border-color] duration-300 ease-out overflow-hidden shadow-[0_12px_28px_-18px_rgba(0,0,0,0.25)] hover:shadow-[0_48px_90px_-30px_rgba(0,0,0,0.35)]"
            style={{ willChange: "transform" }}
          >
            {/* 3D depth layers (static, no mouse tracking) */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/12 via-transparent to-accent-light/8" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 via-black/5 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
            <div className="pointer-events-none absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
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
              className="mb-3 sm:mb-4"
              style={{ willChange: 'transform' }}
            >
              <strength.icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-accent drop-shadow-[0_0_14px_rgba(212,175,55,0.18)]" />
            </motion.div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-primary tracking-[0.01em]">
              {strength.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-700">{strength.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
