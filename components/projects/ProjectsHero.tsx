"use client";

import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";

function TiltCard({ item }: { item: { icon: any; value: string; label: string } }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Professional subtle rotation (max 6 degrees)
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["6deg", "-6deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-6deg", "6deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Icon = item.icon;

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="group relative rounded-2xl border border-white/80 bg-gradient-to-b from-white to-white/60 backdrop-blur-md p-5 shadow-[0_8px_16px_-6px_rgba(0,0,0,0.05),_inset_0_1px_1px_rgba(255,255,255,1)] hover:shadow-[0_20px_40px_-10px_rgba(212,175,55,0.15),_0_10px_20px_-5px_rgba(0,0,0,0.06),_inset_0_1px_1px_rgba(255,255,255,1)] cursor-default transition-shadow duration-300"
    >
      {/* Inner subtle depth layer */}
      <div
        style={{ transform: "translateZ(-8px)" }}
        className="absolute inset-0 rounded-2xl border border-accent/10 pointer-events-none"
      />

      <div style={{ transform: "translateZ(16px)" }} className="flex items-center gap-2 text-accent font-semibold transition-transform duration-300">
        <Icon className="w-5 h-5 group-hover:text-amber-500 transition-colors" />
        <span className="text-3xl font-bold font-display tracking-tight text-primary-dark">{item.value}</span>
      </div>
      <div style={{ transform: "translateZ(8px)" }} className="mt-2 text-sm font-semibold text-gray-600 transition-transform duration-300">
        {item.label}
      </div>
    </motion.div>
  );
}

export default function ProjectsHero() {
  return (
    <header className="relative overflow-hidden border-b border-accent/10">
      <div className="pointer-events-none absolute -top-24 -left-10 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-28 -right-10 w-[22rem] h-[22rem] rounded-full bg-accent/8 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.20)_0%,transparent_60%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,1)_100%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.15 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/25 bg-accent/10 text-accent font-semibold text-xs sm:text-sm"
            >
              <Sparkles className="w-4 h-4" />
              Our Portfolio
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-[0.01em] text-black"
            >
              Our Projects
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed"
            >
              Showcasing our excellence in construction across multiple sectors built with quality, transparency, and on-time execution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 grid sm:grid-cols-3 gap-5"
              style={{ perspective: 1000 }}
            >
              {[
                { icon: Calendar, value: "100+", label: "Projects completed" },
                { icon: Sparkles, value: "25", label: "Project sectors" },
                { icon: MapPin, value: "TN", label: "Chennai & Tamil Nadu" },
              ].map((item, idx) => {
                return <TiltCard key={idx} item={item} />;
              })}
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl border border-accent/15 bg-white/70 backdrop-blur-sm shadow-sm p-6 sm:p-7"
          >
            <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
              Start your next project
            </div>
            <div className="mt-2 text-2xl sm:text-3xl font-bold font-display">
              Let us plan it right
            </div>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Tell us your scope and timeline. We will respond with a clear plan for construction execution and consultancy.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
              <a
                href="tel:+919841243345"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold shadow-2xl shadow-accent/25 hover:shadow-accent/40 hover:bg-accent-light transition-all duration-300"
              >
                <span>Call Us</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </a>
              <Link
                href="/contact"
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary/5 border border-accent/60 text-primary-dark font-bold hover:bg-accent/15 hover:text-accent transition-colors"
              >
                <span>Get a Quote</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
            <div className="mt-5 text-xs sm:text-sm text-gray-500">
              Typically responds within 24 hours.
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
