"use client";

import { motion } from "framer-motion";
import { Mail, Phone, Sparkles } from "lucide-react";

export default function ContactHero() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-accent/15 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.18)_0%,transparent_55%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,1)_100%)] px-6 py-10 sm:px-10 sm:py-12 mb-10 sm:mb-12 md:mb-14">
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent-light/10 blur-3xl" />

      <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15 }}
          className="text-center lg:text-left"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-accent/25 bg-accent/10 text-accent font-semibold text-xs sm:text-sm"
          >
            <Sparkles className="w-4 h-4" />
            Contact Delphin Associates
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-[0.01em] text-black"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 mx-auto lg:mx-0 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed px-2 lg:px-0"
          >
            Get in touch with us for construction and consultancy needs. Share your scope and we will respond quickly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
          >
            <a
              href="tel:+919841243345"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm sm:text-base hover:bg-accent-light transition-colors shadow-2xl shadow-accent/25 hover:shadow-accent/45"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </a>
            <a
              href="mailto:delphinassociates@gmail.com"
              className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary/5 border border-accent/60 text-primary-dark font-bold text-sm sm:text-base hover:bg-accent/15 hover:text-accent transition-colors"
            >
              <Mail className="w-4 h-4" />
              Send Email
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
          className="grid sm:grid-cols-2 gap-3"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5 hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-2 text-accent font-semibold">
              <Phone className="w-4 h-4 flex-shrink-0" />
              <span className="whitespace-nowrap">+91 98412 43345</span>
            </div>
            <div className="mt-1 text-xs sm:text-sm font-semibold text-gray-600">
              Quick call support
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5 hover:scale-105 transition-transform"
          >
            <div className="flex items-center gap-2 text-accent font-semibold">
              <Mail className="w-4 h-4 flex-shrink-0" />
              <span className="break-all leading-tight">
                delphinassociates@gmail.com
              </span>
            </div>
            <div className="mt-1 text-xs sm:text-sm font-semibold text-gray-600">
              Email for consultations
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
