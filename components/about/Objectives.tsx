"use client";

import { motion } from "framer-motion";
import { Ruler, Handshake, Home } from "lucide-react";

const objectives = [
  {
    icon: Ruler,
    title: "Design Economical & High-Quality Buildings",
    description:
      "Create structures that balance cost-effectiveness with superior quality, ensuring durability and structural excellence while adhering to client budgets.",
  },
  {
    icon: Handshake,
    title: "Meet Client Expectations",
    description:
      "Deliver projects that exceed client expectations through precision planning, innovative design, and quality-driven execution for individuals and organizations.",
  },
  {
    icon: Home,
    title: "Promote Excellence in Residential Projects",
    description:
      "Offer deluxe and super deluxe flats with emphasis on both economy and quality, providing value-driven solutions for residential needs.",
  },
];

export default function Objectives() {
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
        Our Objectives
      </h2>
      <div className="grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {objectives.map((objective, index) => (
          <motion.div
            key={objective.title}
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
            className="group relative bg-white rounded-3xl p-5 sm:p-6 md:p-7 border border-accent/10 hover:border-accent/30 transition-[box-shadow,border-color] duration-300 ease-out overflow-hidden shadow-[0_12px_28px_-18px_rgba(0,0,0,0.25)] hover:shadow-[0_48px_90px_-30px_rgba(0,0,0,0.35)]"
            style={{ willChange: "transform" }}
          >
            {/* 3D depth layers (static, no mouse tracking) */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/10 via-transparent to-accent-light/8" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 via-black/5 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
            <div className="pointer-events-none absolute left-0 top-0 h-24 w-24 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.35)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
              <objective.icon className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 text-accent drop-shadow-[0_0_14px_rgba(212,175,55,0.18)]" />
            </motion.div>
            <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-primary tracking-[0.01em]">
              {objective.title}
            </h3>
            <p className="text-sm sm:text-base text-gray-700">{objective.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
