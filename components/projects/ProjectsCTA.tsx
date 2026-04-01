"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { usePerformance } from "../PerformanceProvider";

export default function ProjectsCTA() {
  const { tier, reducedMotion } = usePerformance();

  return (
    <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] p-12 sm:p-16 md:p-20">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-accent/[0.04] to-transparent rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

        <div className="relative z-10 grid lg:grid-cols-2 items-center gap-12 lg:gap-16">
          <div className="text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
              <span className="h-[2px] w-8 bg-accent"></span>
              <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase">
                Ready to Build?
              </span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-primary-dark">
              Request a Free Consultation
            </h2>
            <p className="mt-6 text-gray-500 font-light text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
              From residential flats to industrial and institutional structures, we help you with transparent planning, quality execution, and reliable support.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-end">
            <a
              href="tel:+919841243345"
              className={`group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-accent text-black rounded-xl font-bold text-base hover:bg-accent-light transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.4)] hover:-translate-y-1 ${tier === 'high' && !reducedMotion ? 'liquid-glass-btn-accent-invert' : ''}`}
            >
              <Phone className="w-5 h-5" />
              <span>Call Us Now</span>
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                <ArrowRight className="w-5 h-5" />
              </span>
            </a>

            <Link
              href="/contact"
              className={`group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/60 backdrop-blur-md text-primary-dark rounded-xl font-bold text-base hover:bg-white transition-all duration-300 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-accent/30 ${tier === 'high' && !reducedMotion ? 'liquid-glass-btn-light-invert' : ''}`}
            >
              <span>Get a Quote</span>
              <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
