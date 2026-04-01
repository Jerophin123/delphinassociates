"use client";

import { motion } from "framer-motion";

export default function CompanyHistory() {
  return (
    <section className="mb-12 sm:mb-20 md:mb-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative overflow-hidden rounded-[2.5rem] bg-white liquid-glass-card border border-gray-200 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2),0_16px_32px_-8px_rgba(0,0,0,0.12)] transition-shadow duration-500 p-6 sm:p-12 md:p-16 hover:border-gray-300"
      >
        {/* Subtle decorative background elements */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-accent/[0.03] to-transparent rounded-full blur-[80px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-accent/[0.02] to-transparent rounded-full blur-[60px] translate-y-1/3 -translate-x-1/4 pointer-events-none"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-accent"></span>
            <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
              Our Story
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-8 sm:mb-10 font-display text-primary-dark tracking-tight">
            Our History
          </h2>

          <div className="grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-16 items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-5 xl:col-span-4"
            >
              <div className="rounded-[2rem] border border-gray-100 bg-gray-50/50 p-6 sm:p-8">
                <div className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-2">Since</div>
                <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-primary-dark font-display mb-4">1999</div>
                <div className="text-gray-500 leading-relaxed font-light mt-4">
                  Building trust through quality, delivered by an experienced civil
                  construction team.
                </div>
                <div className="mt-8 border-t border-gray-200 pt-6">
                  <div className="text-sm font-semibold text-gray-900 mb-4">Sectors</div>
                  <div className="flex flex-wrap gap-2.5">
                    {["Residential", "Industrial", "Commercial", "Institutional", "Church"].map((s, i) => (
                      <motion.span
                        key={s}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                        viewport={{ once: true }}
                        className="px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium border border-gray-200 bg-white text-gray-600 shadow-sm"
                      >
                        {s}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-7 xl:col-span-8"
            >
              <p className="text-base sm:text-xl text-gray-600 font-light leading-relaxed mb-6">
                Delphin Associates was established in <strong className="text-gray-900 font-semibold">1999</strong> by{" "}
                <strong className="text-gray-900 font-semibold">Mr. Delphin P. Stanley (DCE, B.Tech)</strong>, a visionary
                leader in the construction industry. Starting with a team of young,
                dedicated engineers across Tamil Nadu, the organization has grown to
                become a trusted name in civil construction and building consultancy.
              </p>
              <p className="text-base sm:text-xl text-gray-600 font-light leading-relaxed mb-6">
                Over the past 25+ years, we have successfully completed numerous
                projects spanning residential, industrial, commercial, institutional,
                and church sectors. Our commitment to transparency, timely completion,
                and post-completion support has earned us the trust and respect of
                clients across Tamil Nadu.
              </p>
              <p className="text-base sm:text-xl text-gray-600 font-light leading-relaxed">
                Today, Delphin Associates continues to lead with innovation, quality,
                and integrity, maintaining our founding principles while embracing
                modern construction technologies and sustainable building practices.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
