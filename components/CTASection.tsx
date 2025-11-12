"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative z-10 py-12 md:py-24 bg-gradient-to-br from-primary-dark via-primary to-primary-dark text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-light/10 rounded-full blur-3xl"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-2 bg-accent/20 text-accent rounded-full text-sm font-semibold mb-6 border border-accent/30"
          >
            Get Started Today
          </motion.span>

          <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold mb-6 md:mb-8 font-display overflow-visible">
            Ready to Start Your
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-accent via-accent-light to-accent mt-1 md:mt-2 pb-1 md:pb-2 overflow-visible" style={{ WebkitTextFillColor: 'transparent', textRendering: 'optimizeLegibility', lineHeight: '1.15' }}>
              Dream Project?
            </span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 text-gray-200 max-w-3xl mx-auto leading-relaxed px-2">
            Let us help you build your dream project with transparency, quality,
            and timely completion. Experience excellence in construction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-8 md:mb-12 w-full sm:w-auto">
            <motion.a
              href="tel:+919841243345"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center justify-center space-x-2 sm:space-x-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-white text-primary rounded-lg font-bold text-base sm:text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/50 w-full sm:w-auto"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Phone className="w-5 h-5 sm:w-6 sm:h-6" />
              </motion.div>
              <span>Call Us Now</span>
            </motion.a>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full sm:w-auto"
            >
              <Link
                href="/contact"
                className="group flex items-center justify-center space-x-2 sm:space-x-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-accent text-white rounded-lg font-bold text-base sm:text-lg hover:bg-accent-light transition-all duration-300 shadow-2xl hover:shadow-accent/50 border-2 border-transparent hover:border-white/50 w-full sm:w-auto"
              >
                <span>Get a Quote</span>
                <motion.div
                  whileHover={{ x: 2 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                </motion.div>
              </Link>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-6 justify-center items-center text-gray-300 px-2"
          >
            <a
              href="mailto:delphinassociates@gmail.com"
              className="group flex items-center space-x-2 hover:text-white transition-colors text-sm sm:text-base md:text-lg break-all sm:break-normal"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              <span>delphinassociates@gmail.com</span>
            </a>
            <span className="hidden sm:inline text-gray-500">|</span>
            <a
              href="mailto:nanchilassociates@gmail.com"
              className="group flex items-center space-x-2 hover:text-white transition-colors text-sm sm:text-base md:text-lg break-all sm:break-normal"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
                className="flex-shrink-0"
              >
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.div>
              <span>nanchilassociates@gmail.com</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
