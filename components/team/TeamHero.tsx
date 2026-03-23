"use client";

import { motion } from "framer-motion";
import { HardHat, ShieldCheck, TrendingUp, Users } from "lucide-react";

export default function TeamHero() {
  const stats = [
    { icon: Users, value: "25+", label: "Years of experience" },
    { icon: TrendingUp, value: "100+", label: "Projects delivered" },
    { icon: ShieldCheck, value: "100%", label: "Quality assured" },
  ];

  return (
    <div className="relative overflow-hidden rounded-3xl border border-accent/15 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.18)_0%,transparent_55%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,1)_100%)] px-6 py-10 sm:px-10 sm:py-12 mb-10 sm:mb-12 md:mb-14">
      <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent-light/10 blur-3xl" />

      <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
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
            <HardHat className="w-4 h-4" />
            Meet the Experts
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-[0.01em] text-black"
          >
            Our Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 mx-auto lg:mx-0 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed"
          >
            Delphin Associates is built on experienced leadership and technically strong execution.
            Our management and engineering teams work together to deliver quality, transparency, and timely completion.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
          >
            <a
              href="#management-team"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm sm:text-base hover:bg-accent-light transition-colors shadow-2xl shadow-accent/25 hover:shadow-accent/45"
            >
              Management Team
              <span className="ml-1 text-lg leading-none">&rarr;</span>
            </a>
            <a
              href="#technical-team"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary/5 border border-accent/60 text-primary-dark font-bold text-sm sm:text-base hover:bg-accent/15 hover:text-accent transition-colors"
            >
              Technical Team
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.15, delayChildren: 0.3 }}
          className="grid grid-cols-3 gap-3 sm:gap-4"
        >
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5 hover:scale-105 transition-transform"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  <div className="text-2xl font-bold text-primary-dark">{stat.value}</div>
                </div>
                <div className="mt-1 text-xs sm:text-sm font-semibold text-gray-600">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
