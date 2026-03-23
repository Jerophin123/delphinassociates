"use client";

import { motion } from "framer-motion";

export default function CompanyHistory() {
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
      <div className="relative rounded-3xl border border-accent/15 bg-gradient-to-b from-white to-gray-50 p-6 sm:p-8">
        <div className="pointer-events-none absolute -top-10 -right-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-accent-light/10 blur-3xl" />

        <div className="relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/20 bg-accent/10">
            <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-accent-light" />
            <span className="text-sm sm:text-base font-semibold text-accent">Our Story</span>
          </div>

          <h2 className="mt-4 text-2xl sm:text-3xl font-bold font-display tracking-[0.01em] bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
            Our History
          </h2>

          <div className="mt-5 grid lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-4">
              <div className="rounded-3xl border border-gray-200 bg-white/70 backdrop-blur-sm p-5">
                <div className="text-sm font-semibold text-gray-600">Since</div>
                <div className="mt-1 text-3xl font-bold text-primary-dark">1999</div>
                <div className="mt-3 text-sm text-gray-600 leading-relaxed">
                  Building trust through quality, delivered by an experienced civil
                  construction team.
                </div>
                <div className="mt-5 border-t border-accent/20 pt-4">
                  <div className="text-xs sm:text-sm font-semibold text-gray-700">Sectors</div>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {["Residential", "Industrial", "Commercial", "Institutional", "Church"].map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full text-xs font-semibold border border-accent/20 bg-white/60 text-primary-dark"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-8 prose prose-lg max-w-none">
              <p className="text-gray-700 mb-4">
                Delphin Associates was established in <strong className="text-gray-800">1999</strong> by{" "}
                <strong className="text-gray-800">Mr. Delphin P. Stanley (DCE, B.Tech)</strong>, a visionary
                leader in the construction industry. Starting with a team of young,
                dedicated engineers across Tamil Nadu, the organization has grown to
                become a trusted name in civil construction and building consultancy.
              </p>
              <p className="text-gray-700 mb-4">
                Over the past 25+ years, we have successfully completed numerous
                projects spanning residential, industrial, commercial, institutional,
                and church sectors. Our commitment to transparency, timely completion,
                and post-completion support has earned us the trust and respect of
                clients across Tamil Nadu.
              </p>
              <p className="text-gray-700">
                Today, Delphin Associates continues to lead with innovation, quality,
                and integrity, maintaining our founding principles while embracing
                modern construction technologies and sustainable building practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
