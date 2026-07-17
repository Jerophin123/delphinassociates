"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar, Church, Home, Factory, GraduationCap, Route, Grid3x3, CheckCircle2 } from "lucide-react";
import { useHPOE } from "../HPOE";

type Project = {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  year?: string;
  image?: string;
};

type ProjectDetailExtras = {
  overview: string;
  scopeOfWork: string[];
  highlights: { label: string; value: string }[];
  outcomes: string[];
};

type ProjectDetailContentProps = {
  project: Project;
  detail?: ProjectDetailExtras;
};

const getCategoryIcon = (category: string) => {
  const categoryIcons: Record<string, typeof Church> = {
    Church,
    Residential: Home,
    Industrial: Factory,
    Institutional: GraduationCap,
    Infrastructure: Route,
  };
  return categoryIcons[category] || Grid3x3;
};

export default function ProjectDetailContent({
  project,
  detail,
}: ProjectDetailContentProps) {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;
  const isStatic = tier === "low" || tier === "very-low" || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;
  const categoryIcon = getCategoryIcon(project.category);
  const code = `P-${String(project.id).padStart(2, "0")}`;

  const reveal = (delay: number) => ({
    initial: noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: noReveal ? 0 : 0.7,
      delay: noReveal ? 0 : delay,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  });

  return (
    <div className="mt-8 sm:mt-10 grid lg:grid-cols-2 gap-6 sm:gap-10 items-start">
      {/* Drawing panel - register-style image card */}
      <motion.div {...reveal(0.05)} className="w-full lg:sticky lg:top-28">
        <div
          className={`group relative w-full overflow-hidden rounded-3xl bg-primary-dark ${
            tier === "high" || tier === "mid" ? "shadow-[0_16px_40px_rgba(0,0,0,0.15)]" : ""
          }`}
        >
          {project.image ? (
            <Image
              src={project.image}
              alt={`${project.title} - ${project.category} construction project by Delphin Associates in ${project.location}`}
              width={900}
              height={700}
              className={`h-full w-full object-cover ${isStatic ? "" : "transition-transform duration-700 ease-out group-hover:scale-[1.04]"}`}
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          ) : (
            <div className="flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-primary-light to-primary-dark" aria-hidden>
              {React.createElement(categoryIcon, { className: "w-20 h-20 text-accent/40" })}
            </div>
          )}

          {/* Readability scrim */}
          {tier !== "very-low" && (
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/10" aria-hidden />
          )}

          {/* Category chip */}
          <div className="absolute top-4 left-4 z-10">
            <span
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-white ${
                isHigh
                  ? "liquid-glass-chip backdrop-blur-md bg-white/10 border-white/25"
                  : tier === "very-low"
                  ? "bg-black border-white/30"
                  : "bg-black/70 border-white/15"
              }`}
            >
              {React.createElement(categoryIcon, { className: "w-3.5 h-3.5", "aria-hidden": true })}
              <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">{project.category}</span>
            </span>
          </div>

          {/* Drawing code + period */}
          <span className="absolute top-5 right-5 z-10 text-right">
            <span className="block font-display font-bold text-sm tracking-[0.2em] text-accent">{code}</span>
            {project.year && (
              <span className="block text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase mt-1">
                {project.year}
              </span>
            )}
          </span>
        </div>
      </motion.div>

      {/* Specification column */}
      <div className="w-full min-w-0">
        {/* Eyebrow */}
        <motion.div {...reveal(0.12)} className="flex items-center gap-3 mb-5">
          <span className="font-display font-bold text-[11px] sm:text-xs text-accent-dark/70 tracking-[0.25em] uppercase">
            Project Register - {code}
          </span>
          <span className="h-[2px] w-12 bg-accent"></span>
        </motion.div>

        <motion.h1
          {...reveal(0.18)}
          className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-primary-dark tracking-tight leading-[1.1]"
        >
          {project.title}
        </motion.h1>

        {/* Location / year microline */}
        <motion.div
          {...reveal(0.24)}
          className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-gray-500"
        >
          <span className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-accent-dark" aria-hidden />
            {project.location}
          </span>
          {project.year && (
            <span className="flex items-center gap-2">
              <span className="w-1 h-1 rotate-45 bg-accent/60 hidden sm:block" aria-hidden />
              <Calendar className="w-4 h-4 text-accent-dark" aria-hidden />
              {project.year}
            </span>
          )}
        </motion.div>

        <motion.p {...reveal(0.3)} className="mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-gray-600 font-light">
          {detail?.overview ?? project.description}
        </motion.p>

        {/* Highlights - flat stats band */}
        {detail?.highlights?.length ? (
          <motion.div {...reveal(0.38)} className="mt-8 border-y border-black/10 grid grid-cols-2 sm:grid-cols-3">
            {detail.highlights.map((item, index) => (
              <div
                key={item.label}
                className={`group py-5 sm:py-6 px-4 sm:px-5 ${index > 0 ? "border-l border-black/10" : ""} ${
                  index > 1 ? "border-t sm:border-t-0" : ""
                } ${index === 2 ? "border-l-0 sm:border-l col-span-2 sm:col-span-1" : ""}`}
              >
                <span
                  className={`block text-lg sm:text-2xl font-display font-bold tracking-tight text-primary-dark ${
                    isStatic ? "" : "transition-colors duration-500 group-hover:text-accent-dark"
                  }`}
                >
                  {item.value}
                </span>
                <span className="block mt-1.5 text-[9px] sm:text-[10px] text-gray-500 font-bold tracking-[0.2em] uppercase">
                  {item.label}
                </span>
              </div>
            ))}
          </motion.div>
        ) : null}

        {/* Scope of work - specification list */}
        {detail?.scopeOfWork?.length ? (
          <motion.div {...reveal(0.46)} className="mt-8">
            <div className="flex items-center gap-3 mb-5">
              <span className="font-display font-bold text-[11px] sm:text-xs text-accent-dark/70 tracking-[0.25em] uppercase">
                S-01
              </span>
              <span className="h-[2px] w-10 bg-accent"></span>
              <h2 className="text-xs sm:text-sm font-bold text-accent-dark tracking-[0.2em] uppercase">
                Scope of Work
              </h2>
            </div>
            <ul className="space-y-3">
              {detail.scopeOfWork.map((scope) => (
                <li key={scope} className="flex gap-3 text-sm sm:text-base text-gray-600 font-light leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rotate-45 bg-accent shrink-0" aria-hidden />
                  <span>{scope}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}

        {/* Outcomes - dark ink block */}
        {detail?.outcomes?.length ? (
          <motion.div
            {...reveal(0.54)}
            className={`mt-8 rounded-3xl p-6 sm:p-8 border border-white/10 ${
              tier === "very-low" ? "bg-black" : "bg-primary-dark"
            } ${tier === "high" || tier === "mid" ? "shadow-[0_20px_50px_rgba(10,10,10,0.2)]" : ""}`}
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="font-display font-bold text-[11px] sm:text-xs text-accent/60 tracking-[0.25em] uppercase">
                O-01
              </span>
              <span className="h-[2px] w-10 bg-accent"></span>
              <h2 className="text-xs sm:text-sm font-bold text-accent tracking-[0.2em] uppercase">
                Outcomes &amp; Impact
              </h2>
            </div>
            <ul className="space-y-3">
              {detail.outcomes.map((outcome) => (
                <li key={outcome} className="flex gap-3 text-sm sm:text-base text-gray-300 font-light leading-relaxed">
                  <CheckCircle2 className="mt-0.5 w-4 h-4 sm:w-5 sm:h-5 text-accent shrink-0" aria-hidden />
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
            <span className="block h-[2px] w-10 bg-accent/60 mt-6" aria-hidden />
          </motion.div>
        ) : null}
      </div>
    </div>
  );
}
