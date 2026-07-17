"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Home, Building2 } from "lucide-react";
import { useHPOE } from "./HPOE";
import ArchPlans from "./ui/ArchPlans";
import SheetWatermark from "./ui/SheetWatermark";
import ArrowLink from "./ui/ArrowLink";
import ParallaxFrame from "./ui/ParallaxFrame";

const upcomingProjects = [
  {
    code: "U-01",
    status: "Ongoing" as const,
    icon: Home,
    title: "Individual Bungalow",
    category: "Residential",
    location: "Madipakkam, Chennai",
    detail: "4,000 sq.ft individual bungalow - currently under construction.",
    image: "/upcoming-projects/Proposed-Residential-Madipakkam.jpeg",
  },
  {
    code: "U-02",
    status: "Proposed" as const,
    icon: Home,
    title: "Residential Development",
    category: "Residential",
    location: "Adambakkam, Chennai",
    detail: "Proposed residential project - design and planning stage.",
    image: "/upcoming-projects/Proposed-Residential-Adambakkam.jpeg",
  },
  {
    code: "U-03",
    status: "Proposed" as const,
    icon: Building2,
    title: "Commercial Building",
    category: "Commercial",
    location: "Tambaram, Chennai",
    detail: "Proposed commercial building for Measurecon Instruments.",
    image: "/upcoming-projects/Proposed-Commercial-Building-Measurecon-Instruments-Tambaram.jpeg",
  },
];

interface UpcomingProjectsProps {
  /** Ground of the sheet: paper on the homepage, ink on the projects page */
  tone?: "light" | "dark";
  /** Sheet index label, e.g. "03&thinsp;/&thinsp;05" parts */
  sheetNo: string;
  sheetOf: string;
  watermark: string;
  /** Unique background drawing - omit to skip (keeps drawings unrepeated) */
  archVariant?: "sunpath";
}

export default function UpcomingProjects({
  tone = "light",
  sheetNo,
  sheetOf,
  watermark,
  archVariant,
}: UpcomingProjectsProps) {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;
  const isStatic = tier === "low" || tier === "very-low" || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;
  const light = tone === "light";

  return (
    <section
      id="upcoming-projects"
      data-header-theme={tone}
      className={`relative overflow-hidden py-14 sm:py-20 md:py-24 ${
        light
          ? "bg-[#fdfbf4] border-b border-black/5"
          : `${tier === "very-low" ? "bg-primary-dark" : "bg-primary-dark/95"} border-y border-white/5`
      }`}
    >
      {/* Sheet ruling */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: light
            ? `linear-gradient(to right, rgba(18,18,18,0.045) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(18,18,18,0.045) 1px, transparent 1px)`
            : `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
               linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: "32px 32px",
        }}
      />
      {light && (
        <span aria-hidden className="absolute left-6 sm:left-12 top-0 bottom-0 w-px bg-accent/25 pointer-events-none" />
      )}

      {archVariant && <ArchPlans tone={tone} variant={archVariant} />}

      {/* Sheet-index watermark */}
      <SheetWatermark text={watermark} tone={light ? "dark" : "light"} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial header row */}
        <motion.div
          initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: noReveal ? 0 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span
                className={`font-display font-bold text-[11px] sm:text-xs tracking-[0.25em] uppercase ${
                  light ? "text-accent-dark/70" : "text-accent/60"
                }`}
              >
                Sheet {sheetNo}&thinsp;/&thinsp;{sheetOf}
              </span>
              <span className="h-[2px] w-12 bg-accent"></span>
              <span
                className={`text-sm sm:text-base font-bold tracking-[0.2em] uppercase ${
                  light ? "text-accent-dark" : "text-accent"
                }`}
              >
                On The Board
              </span>
            </div>
            <h2 className="text-[28px] sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-[1.05]">
              <span className={light ? "text-primary-dark" : "text-white"}>Upcoming </span>
              <span className={light ? "text-outline-ink" : "text-outline-display"}>Projects</span>
            </h2>
          </div>
          <div className="md:text-right md:max-w-sm">
            <p className={`text-sm sm:text-base leading-relaxed font-light mb-4 ${light ? "text-gray-500" : "text-gray-400"}`}>
              From the drawing board to the ground - what we&apos;re building next
              across Chennai.
            </p>
            <ArrowLink href="/contact" tone={light ? "onLight" : "onDark"} className="hidden md:inline-flex">
              Plan Yours With Us
            </ArrowLink>
          </div>
        </motion.div>

        {/* Register cards */}
        <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
          {upcomingProjects.map((project, index) => {
            const categoryIcon = project.icon;
            const ongoing = project.status === "Ongoing";
            return (
              <motion.article
                key={project.code}
                initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: noReveal ? 0 : 0.7,
                  delay: noReveal ? 0 : index * 0.12,
                  ease: [0.21, 0.47, 0.32, 0.98],
                }}
                className={`group relative h-[20rem] sm:h-[23rem] overflow-hidden rounded-3xl bg-primary-dark ${
                  tier === "high" || tier === "mid"
                    ? "shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_24px_50px_rgb(0,0,0,0.22)] transition-shadow duration-500"
                    : ""
                }`}
              >
                <ParallaxFrame range={36}>
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.status.toLowerCase()} ${project.category.toLowerCase()} project by Delphin Associates in ${project.location}`}
                    fill
                    className={`object-cover ${isStatic ? "" : "transition-transform duration-700 ease-out group-hover:scale-[1.06]"}`}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </ParallaxFrame>

                {/* Readability scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" aria-hidden />

                {/* Status chip */}
                <div className="absolute top-4 left-4 z-10">
                  <span
                    className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] sm:text-[11px] font-bold uppercase tracking-wider ${
                      ongoing
                        ? "bg-accent border-accent text-black"
                        : isHigh
                        ? "liquid-glass-chip backdrop-blur-md bg-white/10 border-white/25 text-white"
                        : tier === "very-low"
                        ? "bg-black border-white/30 text-white"
                        : "bg-black/70 border-white/15 text-white"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        ongoing ? `bg-black ${isStatic ? "" : "animate-[pulse_2s_ease-in-out_infinite]"}` : "bg-accent"
                      }`}
                      aria-hidden
                    />
                    {project.status}
                  </span>
                </div>

                {/* Drawing code + category */}
                <span className="absolute top-5 right-5 z-10 text-right">
                  <span className="block font-display font-bold text-sm tracking-[0.2em] text-accent">
                    {project.code}
                  </span>
                  <span className="mt-1 flex items-center justify-end gap-1.5 text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase">
                    {React.createElement(categoryIcon, { className: "w-3.5 h-3.5", "aria-hidden": true })}
                    {project.category}
                  </span>
                </span>

                {/* Overlaid info panel */}
                <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-6">
                  <h3 className={`text-lg sm:text-xl font-bold text-white font-display tracking-tight leading-tight mb-2 ${isStatic ? "" : "transition-colors duration-300 group-hover:text-accent-light"}`}>
                    {project.title}
                  </h3>
                  <p className="flex items-center gap-2 text-white/70 text-xs font-light mb-2">
                    <MapPin className="w-3.5 h-3.5 text-accent shrink-0" aria-hidden />
                    <span className="line-clamp-1">{project.location}</span>
                  </p>
                  <p className="text-white/60 font-light leading-relaxed text-xs line-clamp-2">
                    {project.detail}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile CTA */}
        <motion.div
          initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: noReveal ? 0 : 0.6, delay: noReveal ? 0 : 0.3 }}
          className="flex justify-center mt-10 sm:mt-14 md:hidden"
        >
          <ArrowLink href="/contact" tone={light ? "onLight" : "onDark"}>
            Plan Yours With Us
          </ArrowLink>
        </motion.div>
      </div>
    </section>
  );
}
