"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Church,
  Factory,
  GraduationCap,
  Grid3x3,
  Home,
  MapPin,
  Search,
  Route,
  ChevronDown,
  ArrowUpDown,
  X,
} from "lucide-react";
import projectsData from "@/data/projects.json";
import { useHPOE } from "../HPOE";
import ParallaxFrame from "../ui/ParallaxFrame";

type Project = {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  year?: string;
  image?: string;
};

const categoryConfig = [
  { name: "All", icon: Grid3x3 },
  { name: "Church", icon: Church },
  { name: "Residential", icon: Home },
  { name: "Industrial", icon: Factory },
  { name: "Institutional", icon: GraduationCap },
  { name: "Infrastructure", icon: Route },
];

const getCategoryIcon = (category: string) => {
  return categoryConfig.find((c) => c.name === category)?.icon ?? Grid3x3;
};

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "title", label: "Title (A-Z)" },
] as const;

export default function ProjectGallery() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;
  const isStatic = tier === "low" || tier === "very-low" || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const projects = projectsData as Project[];

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { All: projects.length };
    projects.forEach((p) => {
      counts[p.category] = (counts[p.category] ?? 0) + 1;
    });
    return counts;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    const q = query.trim().toLowerCase();

    const base =
      selectedCategory === "All"
        ? projects
        : projects.filter((project) => project.category === selectedCategory);

    const searched =
      q.length === 0
        ? base
        : base.filter((project) => {
            const haystack = `${project.title} ${project.location} ${project.category} ${project.description}`.toLowerCase();
            return haystack.includes(q);
          });

    return [...searched].sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);

      const ay = Number(a.year ?? 0);
      const by = Number(b.year ?? 0);
      return sortBy === "newest" ? by - ay : ay - by;
    });
  }, [projects, query, selectedCategory, sortBy]);

  const total = filteredProjects.length;

  return (
    <div>
      {/* Drafting toolbar */}
      <div className="mb-8 sm:mb-10">
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 mb-5 sm:mb-6">
          {/* Search */}
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" aria-hidden />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search the register by project name or location..."
              className={`w-full pl-12 pr-12 py-3.5 sm:py-4 text-[13px] sm:text-sm rounded-xl border bg-white text-gray-900 placeholder-gray-400 font-light focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent-dark/50 ${
                isStatic ? "border-black/15" : "border-black/15 transition-colors duration-300 hover:border-black/30"
              }`}
            />
            {query.trim().length > 0 && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 sm:p-2 text-gray-400 hover:text-primary-dark hover:bg-black/5 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort */}
          <div className="relative z-20 sm:w-56 shrink-0" ref={sortRef}>
            <button
              type="button"
              onClick={() => setIsSortOpen(!isSortOpen)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3.5 sm:py-4 text-[13px] sm:text-sm rounded-xl border bg-white font-bold uppercase tracking-[0.15em] text-primary-dark focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                isStatic ? "border-black/15" : "border-black/15 transition-colors duration-300 hover:border-black/30"
              }`}
              aria-label="Sort projects"
            >
              <span className="flex items-center gap-2 truncate">
                <ArrowUpDown className="w-4 h-4 text-accent-dark shrink-0" aria-hidden />
                {sortOptions.find((o) => o.value === sortBy)?.label}
              </span>
              <ChevronDown className={`w-4 h-4 text-gray-400 shrink-0 transition-transform duration-300 ${isSortOpen ? "rotate-180" : ""}`} aria-hidden />
            </button>

            <AnimatePresence>
              {isSortOpen && (
                <motion.div
                  initial={noReveal ? { opacity: 1 } : { opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={isStatic ? { opacity: 0 } : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute top-full left-0 right-0 mt-2 p-1.5 z-30 rounded-xl border border-black/10 bg-white shadow-[0_16px_40px_rgba(10,10,10,0.12)]"
                >
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setSortBy(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`w-full flex items-center px-3 py-2.5 rounded-lg text-xs sm:text-sm font-bold uppercase tracking-[0.15em] transition-colors ${
                        sortBy === option.value
                          ? "bg-primary-dark text-accent"
                          : "text-gray-600 hover:bg-black/5 hover:text-primary-dark"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5" role="group" aria-label="Filter by category">
          {categoryConfig.map((category) => {
            const icon = category.icon;
            const isSelected = selectedCategory === category.name;
            const count = categoryCounts[category.name] ?? 0;
            return (
              <button
                key={category.name}
                onClick={() => setSelectedCategory(category.name)}
                aria-pressed={isSelected}
                className={`inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border text-[11px] sm:text-xs font-bold uppercase tracking-[0.15em] ${
                  isSelected
                    ? "bg-primary-dark border-primary-dark text-accent"
                    : `bg-white border-black/15 text-gray-600 ${isStatic ? "" : "transition-all duration-300 hover:border-accent-dark/50 hover:text-primary-dark"}`
                }`}
              >
                {React.createElement(icon, { className: `w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${isSelected ? "text-accent" : "text-accent-dark/70"}`, "aria-hidden": true })}
                {category.name}
                <span className={`font-display ${isSelected ? "text-accent/70" : "text-gray-400"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Register line */}
        <div className="mt-5 sm:mt-6 pt-4 border-t border-black/10 flex items-center justify-between gap-3">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-gray-500">
            {total} {total === 1 ? "Entry" : "Entries"}
            {selectedCategory !== "All" ? ` - ${selectedCategory}` : " - Complete Register"}
          </span>
          <span className="hidden sm:flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
            <span className="w-1.5 h-1.5 rotate-45 bg-accent/60" aria-hidden />
            Est. 1999
          </span>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {total === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            className="text-center py-16 rounded-3xl border-2 border-dashed border-black/15"
          >
            <span className="inline-flex items-center justify-center w-12 h-12 rounded-md border border-accent-dark/50 p-[3px]" aria-hidden>
              <span className="flex items-center justify-center w-full h-full rounded-[4px] border border-accent-dark/30 bg-accent/10">
                <Grid3x3 className="w-5 h-5 text-accent-dark" />
              </span>
            </span>
            <p className="mt-4 text-primary-dark text-lg font-bold font-display">No entries found</p>
            <p className="mt-1 text-gray-500 font-light">Try clearing the search or choosing a different category.</p>
          </motion.div>
        ) : (
          <motion.div
            key={`gallery-${selectedCategory}-${sortBy}-${query}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          >
            {filteredProjects.map((project, index) => {
              const categoryIcon = getCategoryIcon(project.category);
              return (
                <motion.article
                  key={project.id}
                  initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                    mass: 0.75,
                    delay: noReveal ? 0 : index * 0.03,
                  }}
                  className="h-full"
                  style={{ willChange: "opacity, transform" }}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    aria-label={`${project.title} - view project`}
                    className={`group relative block h-[20rem] sm:h-[23rem] overflow-hidden rounded-3xl bg-primary-dark focus:outline-none focus:ring-2 focus:ring-accent/50 ${
                      tier === "high" || tier === "mid"
                        ? "shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_24px_50px_rgb(0,0,0,0.18)] transition-shadow duration-500"
                        : ""
                    }`}
                  >
                    {project.image ? (
                      <ParallaxFrame range={32}>
                        <Image
                          src={project.image}
                          alt={`${project.title} - ${project.category} construction project by Delphin Associates in ${project.location}`}
                          fill
                          className={`object-cover ${isStatic ? "" : "transition-transform duration-700 ease-out group-hover:scale-[1.06]"}`}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index === 0}
                        />
                      </ParallaxFrame>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-light to-primary-dark" aria-hidden />
                    )}

                    {/* Readability scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" aria-hidden />

                    {/* Category chip */}
                    <div className="absolute top-4 left-4 z-10">
                      <span
                        className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-white ${
                          isHigh
                            ? "backdrop-blur-md bg-white/10 border-white/25"
                            : tier === "very-low"
                            ? "bg-black border-white/30"
                            : "bg-black/70 border-white/15"
                        } ${isStatic ? "" : "transition-colors duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-black"}`}
                      >
                        {React.createElement(categoryIcon, { className: "w-3.5 h-3.5", "aria-hidden": true })}
                        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider">{project.category}</span>
                      </span>
                    </div>

                    {/* Drawing code + period */}
                    <span className="absolute top-5 right-5 z-10 text-right">
                      <span className="block font-display font-bold text-sm tracking-[0.2em] text-accent">
                        P-{String(project.id).padStart(2, "0")}
                      </span>
                      <span className="block text-[10px] font-bold tracking-[0.2em] text-white/60 uppercase mt-1">
                        {project.year ?? " - "}
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
                      <p className="text-white/60 font-light leading-relaxed text-xs line-clamp-2 mb-3">
                        {project.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-accent font-semibold text-[11px] sm:text-xs uppercase tracking-[0.2em]">
                        View Project
                        <ArrowRight className={`w-4 h-4 ${isStatic ? "" : "transition-transform duration-300 group-hover:translate-x-1.5"}`} aria-hidden />
                      </span>
                    </div>
                  </Link>
                </motion.article>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
