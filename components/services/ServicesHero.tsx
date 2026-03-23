"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";

export default function ServicesHero() {
  return (
    <section
      id="services-hero"
      className="relative z-10 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white to-gray-50 overflow-hidden border-b border-accent/10"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(10,10,10,0.08) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(10,10,10,0.08) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.8,
          }}
          style={{ willChange: "opacity, transform" }}
          className="text-center"
        >
          <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-semibold border border-accent/20">
            Our Expertise
          </span>

          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-[0.02em] text-primary-dark">
            Construction & Consultancy Services
          </h1>

          <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed px-2">
            Comprehensive solutions tailored to residential, industrial, commercial, institutional, and church project needs.
            We build with transparency, quality, and timely execution.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mt-8">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 25,
              }}
              href="tel:+919841243345"
              className="group inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-accent text-black rounded-xl font-bold text-sm sm:text-base hover:bg-accent-light transition-colors shadow-2xl shadow-accent/25 hover:shadow-accent/45"
              style={{ willChange: "transform" }}
            >
              <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              <span>Call Us Now</span>
              <motion.div
                whileHover={{ x: 2 }}
                transition={{ duration: 0.2 }}
                className="ml-1"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
            </motion.a>

            <Link
              href="/contact"
              className="group inline-flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 sm:py-4 bg-primary/5 backdrop-blur-sm text-primary-dark rounded-xl font-bold text-sm sm:text-base hover:bg-accent/15 hover:text-accent transition-[background-color,color,border-color] duration-300 ease-out border border-accent/60"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

