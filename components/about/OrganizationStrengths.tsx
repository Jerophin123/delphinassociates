"use client";

import { motion } from "framer-motion";
import {
  Award,
  Clock,
  Users,
  Headphones,
  Eye,
  CheckCircle2,
} from "lucide-react";

const strengths = [
  {
    icon: Award,
    title: "First-Quality Standards",
    description:
      "Maintaining first-quality standards in all our projects, ensuring durability and excellence.",
  },
  {
    icon: Clock,
    title: "Timely Completion",
    description:
      "Committed to timely completion of every work, respecting client deadlines and project schedules.",
  },
  {
    icon: Users,
    title: "Technically Strong Team",
    description:
      "Highly experienced design and execution team with expertise across all construction domains.",
  },
  {
    icon: Headphones,
    title: "Free Consultancy Support",
    description:
      "Providing free consultancy support for clients, helping them make informed decisions.",
  },
  {
    icon: Eye,
    title: "Transparent Execution",
    description:
      "Transparent execution and budgeting, ensuring clients are always informed and involved.",
  },
  {
    icon: CheckCircle2,
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
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-primary font-display">
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
            className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-4 sm:p-5 md:p-6 border border-gray-200 hover:border-accent/30 shadow-[0_6px_12px_-3px_rgba(0,0,0,0.1),0_3px_6px_-2px_rgba(0,0,0,0.06),0_1px_3px_-1px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.2),0_10px_20px_-5px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08)] transition-[box-shadow,border-color] duration-300 ease-out"
            style={{ willChange: 'transform' }}
          >
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
              <strength.icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-accent" />
            </motion.div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 text-primary">
              {strength.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-700">{strength.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
