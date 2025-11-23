"use client";

import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function ContactInfo() {
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
      whileHover={{ 
        y: -8,
        scale: 1.01,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 25
        }
      }}
      className="bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:border-accent/30 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08),0_2px_4px_-1px_rgba(0,0,0,0.06)] p-4 sm:p-6 md:p-8 hover:shadow-[0_24px_48px_-8px_rgba(0,0,0,0.22),0_12px_24px_-6px_rgba(0,0,0,0.14),0_6px_12px_-3px_rgba(0,0,0,0.1)] transition-[box-shadow,border-color] duration-300 ease-out"
      style={{ willChange: 'transform' }}
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-primary font-display">
        Get In Touch
      </h2>
      <div className="space-y-4 sm:space-y-5 md:space-y-6">
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
            className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.08 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            style={{ willChange: 'transform' }}
          >
            <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
          </motion.div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Address</h3>
            <p className="text-xs sm:text-sm text-gray-700 break-words">
              Plot No 9, 8th Street, Kubera Nagar, Madipakkam, Chennai - 600 091
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
            className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.08 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            style={{ willChange: 'transform' }}
          >
            <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
          </motion.div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Phone</h3>
            <a
              href="tel:+919841243345"
              className="text-xs sm:text-sm text-gray-700 hover:text-accent transition-colors block"
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
            className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.08 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            style={{ willChange: 'transform' }}
          >
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
          </motion.div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Email</h3>
            <a
              href="mailto:delphinassociates@gmail.com"
              className="text-xs sm:text-sm text-gray-700 hover:text-accent transition-colors block break-all sm:break-normal"
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
            className="w-10 h-10 sm:w-12 sm:h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0"
            whileHover={{ scale: 1.08 }}
            transition={{ 
              type: "spring",
              stiffness: 500,
              damping: 30
            }}
            style={{ willChange: 'transform' }}
          >
            <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
          </motion.div>
          <div>
            <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-1">Business Hours</h3>
            <p className="text-xs sm:text-sm text-gray-700">
              Monday - Saturday: 9:00 AM - 6:00 PM
            </p>
            <p className="text-xs sm:text-sm text-gray-700">Sunday: Closed</p>
          </div>
        </motion.div>
      </div>

      <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-200">
        <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-3 sm:mb-4">Consultants</h3>
        <div className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-gray-700">
          <p>Kannimar Consultants, Chennai</p>
          <p>DAR & Associates, Chennai</p>
        </div>
      </div>
    </motion.div>
  );
}
