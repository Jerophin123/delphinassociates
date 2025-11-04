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
      className="mb-16"
    >
      <h2 className="text-3xl font-bold mb-8 text-primary font-display">
        Our Objectives
      </h2>
      <div className="grid md:grid-cols-3 gap-8">
        {objectives.map((objective, index) => (
          <motion.div
            key={objective.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gray-50 rounded-lg p-6"
          >
            <objective.icon className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-bold mb-3 text-primary">
              {objective.title}
            </h3>
            <p className="text-gray-700">{objective.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
