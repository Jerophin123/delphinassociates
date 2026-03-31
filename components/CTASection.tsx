"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, Mail, ArrowRight } from "lucide-react";

export default function CTASection() {
  return (
    <section
      id="home-cta-section"
      className="relative z-10 py-12 sm:py-20 md:py-28 bg-gradient-to-br from-white via-gray-50 to-white text-primary-dark overflow-hidden border-y border-black/5"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[50px] sm:blur-[100px] -translate-x-1/4 -translate-y-1/4 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[40px] sm:blur-[80px] translate-x-1/4 translate-y-1/4 pointer-events-none"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
        <div 
          className="absolute inset-0" 
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.8) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(0,0,0,0.8) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative rounded-2xl sm:rounded-[2.5rem] bg-white/70 backdrop-blur-md sm:backdrop-blur-2xl border border-white shadow-[0_8px_40px_rgb(0,0,0,0.08)] hover:shadow-[0_16px_60px_rgb(0,0,0,0.12)] transition-shadow duration-500 p-5 sm:p-10 md:p-16 lg:p-20 overflow-hidden"
          >
            {/* Inner subtle glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent pointer-events-none"></div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-bold tracking-[0.2em] uppercase mb-6 sm:mb-8 border border-accent/20"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-[pulse_2s_ease-in-out_infinite]"></span>
            Get Started Today
          </motion.div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 sm:mb-6 xl:mb-8 font-display tracking-tight leading-[1.1]">
            Ready to Start Your <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-dark via-primary to-primary-light mt-2 pb-2 inline-block">
              Dream Project?
            </span>
          </h2>
          
          <p className="text-sm sm:text-lg md:text-xl text-gray-500 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed font-light">
            Let us help you build your dream project with transparency, quality,
            and timely completion. Experience excellence in construction.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center w-full sm:w-auto relative z-20">
            <Link
              href="/contact"
              className="group relative inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 font-bold text-sm sm:text-base text-white transition-all duration-300 bg-primary-dark rounded-xl hover:bg-gray-900 hover:shadow-xl hover:shadow-gray-900/20 w-full sm:w-auto overflow-hidden border border-transparent"
            >
              <span className="relative z-10 flex items-center gap-2">
                Get a Quote
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
            </Link>
            
            <a
              href="tel:+919841243345"
              className="group inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 font-bold text-sm sm:text-base text-primary-dark transition-all duration-300 bg-white border-2 border-gray-100 rounded-xl hover:border-accent hover:bg-accent/5 hover:text-accent w-full sm:w-auto"
            >
              <span className="flex items-center gap-2">
                <Phone className="w-5 h-5 group-hover:-translate-y-1 transition-transform duration-300" />
                Call Us Now
              </span>
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200/50 flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-gray-500"
          >
            <a
              href="mailto:delphinassociates@gmail.com"
              className="group flex items-center gap-2 hover:text-accent transition-colors text-xs sm:text-sm md:text-base font-medium"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 group-hover:text-accent transition-colors" />
              </div>
              <span>delphinassociates@gmail.com</span>
            </a>
            <span className="hidden sm:inline w-1 h-1 rounded-full bg-gray-300"></span>
            <a
              href="mailto:nanchilassociates@gmail.com"
              className="group flex items-center gap-2 hover:text-accent transition-colors text-xs sm:text-sm md:text-base font-medium"
            >
              <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4 group-hover:text-accent transition-colors" />
              </div>
              <span>nanchilassociates@gmail.com</span>
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
