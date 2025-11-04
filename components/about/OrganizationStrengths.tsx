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
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold mb-8 text-primary font-display">
        Organization Strengths
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {strengths.map((strength, index) => (
          <motion.div
            key={strength.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <strength.icon className="w-10 h-10 text-accent mb-4" />
            <h3 className="text-xl font-bold mb-2 text-primary">
              {strength.title}
            </h3>
            <p className="text-gray-700">{strength.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
