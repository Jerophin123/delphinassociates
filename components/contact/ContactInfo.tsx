"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Clock, Mail, MapPin, Phone } from "lucide-react";
import { useHPOE } from "../HPOE";
import SpotlightCard from "../ui/SpotlightCard";
import Tilt3DContainer from "../ui/Tilt3DContainer";

export default function ContactInfo() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;

  return (
    <Tilt3DContainer maxRotation={4} className="h-full">
      <SpotlightCard
        className={`h-full flex flex-col bg-gradient-to-br from-gray-50/95 to-white/95 liquid-glass-card rounded-[2.5rem] border border-gray-100 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2),0_16px_32px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 p-5 sm:p-8 md:p-10 will-change-transform ${isHigh ? 'premium-border-glow hover:border-gray-200' : 'hover:-translate-y-2 hover:border-gray-200'}`}
      >
        <div className="mb-3 sm:mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 sm:px-5 py-1.5 sm:py-2 rounded-full border border-accent/25 bg-accent/10 text-accent font-semibold text-[10px] sm:text-sm">
            <MapPin className="w-3 sm:w-4 h-3 sm:h-4" />
            Contact Details
          </div>
          <h2 className="mt-3 sm:mt-4 text-lg sm:text-2xl font-bold text-primary font-display">
            Talk to Our Team
          </h2>
          <p className="mt-2 text-[13px] sm:text-base text-gray-600 font-light">
            For project consultations, site visits, and construction consultancy support.
          </p>
        </div>
        <div className="space-y-3 sm:space-y-5 md:space-y-6 relative z-10">
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
              className={`relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${isHigh ? 'liquid-glass-card-light !bg-accent/10 !border-accent/30 shadow-[0_8px_16px_-4px_rgba(212,175,55,0.2)]' : 'bg-accent/10'}`}
              whileHover={{ scale: 1.08 }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
              style={{ willChange: 'transform' }}
            >
              {isHigh && (
                <div className="absolute inset-0 rounded-xl bg-accent/10 animate-[pulse-ring_3s_ease-in-out_infinite] pointer-events-none" />
              )}
              <MapPin className="w-4 h-4 sm:w-6 sm:h-6 text-accent z-10" />
            </motion.div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">Address</h3>
              <p className="text-[11px] sm:text-sm text-gray-700 break-words font-light">
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
              className={`relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${isHigh ? 'liquid-glass-card-light !bg-accent/10 !border-accent/30 shadow-[0_8px_16px_-4px_rgba(212,175,55,0.2)]' : 'bg-accent/10'}`}
              whileHover={{ scale: 1.08 }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
              style={{ willChange: 'transform' }}
            >
              {isHigh && (
                <div className="absolute inset-0 rounded-xl bg-accent/10 animate-[pulse-ring_3s_ease-in-out_infinite] pointer-events-none" />
              )}
              <Phone className="w-4 h-4 sm:w-6 sm:h-6 text-accent z-10" />
            </motion.div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">Phone</h3>
              <a
                href="tel:+919841243345"
                className="text-[11px] sm:text-sm text-gray-700 hover:text-accent transition-colors block font-light"
              >
                +91 98412 43345
              </a>
              <a
                href="tel:+919940306399"
                className="text-xs sm:text-sm text-gray-700 hover:text-accent transition-colors block font-light"
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
              className={`relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${isHigh ? 'liquid-glass-card-light !bg-accent/10 !border-accent/30 shadow-[0_8px_16px_-4px_rgba(212,175,55,0.2)]' : 'bg-accent/10'}`}
              whileHover={{ scale: 1.08 }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
              style={{ willChange: 'transform' }}
            >
              {isHigh && (
                <div className="absolute inset-0 rounded-xl bg-accent/10 animate-[pulse-ring_3s_ease-in-out_infinite] pointer-events-none" />
              )}
              <Mail className="w-4 h-4 sm:w-6 sm:h-6 text-accent z-10" />
            </motion.div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">Email</h3>
              <a
                href="mailto:delphinassociates@gmail.com"
                className="text-[11px] sm:text-sm text-gray-700 hover:text-accent transition-colors block break-all sm:break-normal font-light"
              >
                delphinassociates@gmail.com
              </a>
              <a
                href="mailto:nanchilassociates@gmail.com"
                className="text-xs sm:text-sm text-gray-700 hover:text-accent transition-colors block break-all sm:break-normal font-light"
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
              className={`relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${isHigh ? 'liquid-glass-card-light !bg-accent/10 !border-accent/30 shadow-[0_8px_16px_-4px_rgba(212,175,55,0.2)]' : 'bg-accent/10'}`}
              whileHover={{ scale: 1.08 }}
              transition={{ 
                type: "spring",
                stiffness: 500,
                damping: 30
              }}
              style={{ willChange: 'transform' }}
            >
              {isHigh && (
                <div className="absolute inset-0 rounded-xl bg-accent/10 animate-[pulse-ring_3s_ease-in-out_infinite] pointer-events-none" />
              )}
              <Clock className="w-4 h-4 sm:w-6 sm:h-6 text-accent z-10" />
            </motion.div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-0.5 sm:mb-1">Business Hours</h3>
              <p className="text-[11px] sm:text-sm text-gray-700 font-light">
                Monday - Saturday: 9:00 AM - 6:00 PM
              </p>
              <p className="text-xs sm:text-sm text-gray-700 font-light">Sunday: Closed</p>
            </div>
          </motion.div>
        </div>

        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-accent/10 relative z-10">
          <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">
            Consultant Partners
          </h3>
          <div className="space-y-2 text-xs sm:text-sm text-gray-700">
            <div className="flex items-start gap-2">
              <BadgeCheck className="w-4 h-4 text-accent mt-0.5" />
              <p className="font-light">Kannimar Consultants, Chennai</p>
            </div>
            <div className="flex items-start gap-2">
              <BadgeCheck className="w-4 h-4 text-accent mt-0.5" />
              <p className="font-light">DAR & Associates, Chennai</p>
            </div>
          </div>
        </div>
      </SpotlightCard>
    </Tilt3DContainer>
  );
}
