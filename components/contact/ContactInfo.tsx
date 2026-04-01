"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Clock, Mail, MapPin, Phone } from "lucide-react";
import { usePerformance } from "../PerformanceProvider";

export default function ContactInfo() {
  const { tier, reducedMotion } = usePerformance();
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8
      }}
      className="bg-gradient-to-br from-gray-50 to-white liquid-glass-card rounded-[2.5rem] border border-gray-100 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2),0_16px_32px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 p-5 sm:p-8 md:p-10 hover:-translate-y-2 hover:border-gray-200"
      style={{ willChange: 'transform' }}
    >
      <div className="mb-3 sm:mb-6">
        <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-accent/25 bg-accent/10 text-accent font-semibold text-[10px] sm:text-sm">
          <MapPin className="w-3 sm:w-4 h-3 sm:h-4" />
          Contact Details
        </div>
        <h2 className="mt-3 sm:mt-4 text-lg sm:text-2xl font-bold text-primary font-display">
          Talk to Our Team
        </h2>
        <p className="mt-2 text-[13px] sm:text-base text-gray-600">
          For project consultations, site visits, and construction consultancy support.
        </p>
      </div>
      <div className="space-y-3 sm:space-y-5 md:space-y-6">
        <motion.div 
          className="flex items-start space-x-3 sm:space-x-4"
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.7,
            delay: 0.08
          }}
          style={{ willChange: 'opacity, transform' }}
        >
          <motion.div 
            className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${tier === 'high' && !reducedMotion ? 'liquid-glass-card-dark !bg-accent/20 !border-accent/30 shadow-none' : 'bg-accent/10'}`}
            whileHover={{ scale: 1.08 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            style={{ willChange: 'transform' }}
          >
            <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
          </motion.div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">Address</h3>
            <p className="text-[11px] sm:text-sm text-gray-700 break-words">
              No. 261A, 6th Main road, LIC nagar, Madipakkam, Chennai- 600 091.
            </p>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-start space-x-3 sm:space-x-4"
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.7,
            delay: 0.16
          }}
          style={{ willChange: 'opacity, transform' }}
        >
          <motion.div 
            className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${tier === 'high' && !reducedMotion ? 'liquid-glass-card-dark !bg-accent/20 !border-accent/30 shadow-none' : 'bg-accent/10'}`}
            whileHover={{ scale: 1.08 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            style={{ willChange: 'transform' }}
          >
            <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
          </motion.div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">Phone</h3>
            <a
              href="tel:+919841243345"
              className="text-[11px] sm:text-sm text-gray-700 hover:text-accent transition-colors block"
            >
              +91 98412 43345
            </a>
            <a
              href="tel:+919940306399"
              className="text-xs sm:text-sm text-gray-700 hover:text-accent transition-colors block"
            >
              +91 99403 06399
            </a>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-start space-x-3 sm:space-x-4"
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.7,
            delay: 0.24
          }}
          style={{ willChange: 'opacity, transform' }}
        >
          <motion.div 
            className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${tier === 'high' && !reducedMotion ? 'liquid-glass-card-dark !bg-accent/20 !border-accent/30 shadow-none' : 'bg-accent/10'}`}
            whileHover={{ scale: 1.08 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            style={{ willChange: 'transform' }}
          >
            <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
          </motion.div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">Email</h3>
            <a
              href="mailto:delphinassociates@gmail.com"
              className="text-[11px] sm:text-sm text-gray-700 hover:text-accent transition-colors block break-all sm:break-normal"
            >
              delphinassociates@gmail.com
            </a>
            <a
              href="mailto:nanchilassociates@gmail.com"
              className="text-xs sm:text-sm text-gray-700 hover:text-accent transition-colors block break-all sm:break-normal"
            >
              nanchilassociates@gmail.com
            </a>
          </div>
        </motion.div>

        <motion.div 
          className="flex items-start space-x-3 sm:space-x-4"
          initial={{ opacity: 0, x: -15 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ 
            type: "spring",
            stiffness: 120,
            damping: 20,
            mass: 0.7,
            delay: 0.32
          }}
          style={{ willChange: 'opacity, transform' }}
        >
          <motion.div 
            className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${tier === 'high' && !reducedMotion ? 'liquid-glass-card-dark !bg-accent/20 !border-accent/30 shadow-none' : 'bg-accent/10'}`}
            whileHover={{ scale: 1.08 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            style={{ willChange: 'transform' }}
          >
            <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-accent" />
          </motion.div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">Business Hours</h3>
            <p className="text-[11px] sm:text-sm text-gray-700">
              Monday - Saturday: 9:00 AM - 6:00 PM
            </p>
            <p className="text-xs sm:text-sm text-gray-700">Sunday: Closed</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-accent/10">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
          Consultant Partners
        </h3>
        <div className="space-y-2 text-xs sm:text-sm text-gray-700">
          <div className="flex items-start gap-2">
            <BadgeCheck className="w-4 h-4 text-accent mt-0.5" />
            <p>Kannimar Consultants, Chennai</p>
          </div>
          <div className="flex items-start gap-2">
            <BadgeCheck className="w-4 h-4 text-accent mt-0.5" />
            <p>DAR & Associates, Chennai</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
