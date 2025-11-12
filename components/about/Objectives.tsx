"use client";

import { motion } from "framer-motion";
import { Target, Building, CheckCircle } from "lucide-react";

const objectives = [
  {
    icon: Building,
    title: "Design Economical & High-Quality Buildings",
    description:
      "Create structures that balance cost-effectiveness with superior quality, ensuring durability and structural excellence while adhering to client budgets.",
  },
  {
    icon: Target,
    title: "Meet Client Expectations",
    description:
      "Deliver projects that exceed client expectations through precision planning, innovative design, and quality-driven execution for individuals and organizations.",
  },
  {
    icon: CheckCircle,
    title: "Promote Excellence in Residential Projects",
    description:
      "Offer deluxe and super deluxe flats with emphasis on both economy and quality, providing value-driven solutions for residential needs.",
  },
];

export default function Objectives() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-8 sm:mb-12 md:mb-16"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-primary font-display">
        Our Objectives
      </h2>
      <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {objectives.map((objective, index) => (
          <motion.div
            key={objective.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-50 rounded-lg p-4 sm:p-5 md:p-6 shadow-[0_6px_12px_-3px_rgba(0,0,0,0.1),0_3px_6px_-2px_rgba(0,0,0,0.06),0_1px_3px_-1px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.2),0_10px_20px_-5px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01]"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ 
                duration: 0.4,
                ease: "easeOut",
                delay: index * 0.1 
              }}
              className="mb-3 sm:mb-4"
            >
              <objective.icon className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-accent" />
            </motion.div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-primary">
              {objective.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-700">{objective.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
