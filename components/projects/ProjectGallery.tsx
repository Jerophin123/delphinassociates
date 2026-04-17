"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  Calendar,
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
} from "lucide-react";
import projectsData from "@/data/projects.json";
import { useHPOE } from "../HPOE";
import ParticleNetwork from "./ParticleNetwork";

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
  { name: "All", icon: Grid3x3, gradient: "from-accent to-accent-dark" },
  { name: "Church", icon: Church, gradient: "from-purple-500 to-purple-600" },
  { name: "Residential", icon: Home, gradient: "from-blue-500 to-blue-600" },
  { name: "Industrial", icon: Factory, gradient: "from-orange-500 to-orange-600" },
  { name: "Institutional", icon: GraduationCap, gradient: "from-green-500 to-green-600" },
  { name: "Infrastructure", icon: Route, gradient: "from-teal-500 to-teal-600" },
];

// Helper function to get icon for category
const getCategoryIcon = (category: string) => {
  return categoryConfig.find((c) => c.name === category)?.icon ?? Grid3x3;
};

export default function ProjectGallery() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const projects = projectsData as Project[];

  // HPOE Visual Escalation Matrix for Input Elements
  const hpoeInputClasses = 
    isHigh ? 'bg-gradient-to-br from-white/60 to-white/20 backdrop-blur-xl border border-white/60 border-b-white/20 border-r-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.06),inset_0_2px_4px_rgba(255,255,255,0.6)] transition-all duration-300 hover:shadow-[0_12px_48px_rgba(0,0,0,0.12),inset_0_2px_4px_rgba(255,255,255,0.8)] hover:from-white/70 hover:to-white/30 hover:-translate-y-0.5 rounded-2xl' :
    tier === 'mid' ? 'bg-gradient-to-r from-gray-50 to-white border border-gray-200 shadow-sm transition-all duration-300 rounded-2xl' :
    tier === 'low' ? 'bg-[#fdfbf4] border border-gray-200 shadow-sm rounded-2xl hover:bg-[#fdfbf4] transition-colors duration-200' :
    'bg-gray-200 border-transparent shadow-none rounded-2xl transition-none';

  // HPOE Visual Escalation Matrix for Floating Windows/Dropdowns
  const hpoeDropdownClasses = 
    isHigh ? 'bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-2xl border border-white/60 border-b-white/30 border-r-white/30 shadow-[0_16px_60px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.8)] rounded-2xl' :
    tier === 'mid' ? 'bg-gradient-to-b from-white to-gray-50 border border-gray-200 shadow-lg rounded-2xl' :
    tier === 'low' ? 'bg-[#fdfbf4] border border-gray-200 shadow-md rounded-2xl' :
    'bg-[#fdfbf4] border-2 border-gray-800 shadow-none rounded-2xl';

  // HPOE Visual Escalation Matrix for Outer Wrappers
  const hpoeGalleryWrapperClasses = 
    isHigh ? 'bg-gradient-to-br from-white/80 to-white/40 backdrop-blur-3xl border border-white/60 border-b-white/30 border-r-white/30 shadow-[0_24px_80px_rgba(0,0,0,0.07),inset_0_2px_4px_rgba(255,255,255,0.6)] rounded-[2.5rem]' :
    tier === 'mid' ? 'bg-[#fdfbf4]/[0.97] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2.5rem]' :
    tier === 'low' ? 'bg-[#fdfbf4] border border-gray-100 shadow-[0_4px_20px_rgb(0,0,0,0.04)] rounded-[2.5rem]' :
    'bg-transparent shadow-none border-0 rounded-none transition-none';

  // HPOE Visual Escalation Matrix for Project Cards
  const hpoeProjectCardClasses = 
    isHigh ? 'bg-gradient-to-br from-white/70 to-white/30 backdrop-blur-2xl border border-white/60 border-b-white/20 border-r-white/20 shadow-[0_16px_40px_rgba(0,0,0,0.08),inset_0_2px_4px_rgba(255,255,255,0.7)] hover:shadow-[0_40px_80px_rgba(0,0,0,0.15),inset_0_2px_4px_rgba(255,255,255,0.9)] rounded-[2.5rem]' :
    tier === 'mid' ? 'bg-[#fdfbf4]/[0.97] border border-gray-200 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12)] hover:shadow-[0_24px_48px_-12px_rgba(0,0,0,0.2)] rounded-[2.5rem]' :
    tier === 'low' ? 'bg-[#fdfbf4] border border-gray-200 shadow-md hover:shadow-lg rounded-[2.5rem]' :
    'bg-[#fdfbf4] shadow-none border-0 rounded-[2.5rem] transition-none';

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

    return searched.sort((a, b) => {
      if (sortBy === "title") return a.title.localeCompare(b.title);

      const ay = Number(a.year ?? 0);
      const by = Number(b.year ?? 0);
      return sortBy === "newest" ? by - ay : ay - by;
    });
  }, [projects, query, selectedCategory, sortBy]);

  const total = filteredProjects.length;

  return (
    <div>
      <div className="mb-8 sm:mb-10 md:mb-12">
        <div className={`${hpoeGalleryWrapperClasses} px-3 py-4 sm:px-6 sm:py-6`}>
          <div className="flex flex-col lg:flex-row gap-3 lg:gap-4">
            <div className="relative flex-grow">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 z-10 pointer-events-none" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by project name or location..."
                className={`w-full pl-12 pr-12 py-3 sm:py-4 text-[13px] sm:text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent font-light text-gray-900 placeholder-gray-400 ${hpoeInputClasses}`}
              />
              {query.trim().length > 0 && (
                <button
                  type="button"
                  onClick={() => setQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1.5 sm:p-2 bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700 transition-colors"
                  aria-label="Clear search"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              )}
            </div>

            <div className="flex flex-row items-center gap-2 sm:gap-3 w-full lg:w-auto shrink-0">
              <div className="relative flex-grow sm:w-56 z-20" ref={categoryRef}>
                <button
                  type="button"
                  onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                  className={`w-full flex items-center justify-between pl-4 pr-4 py-3 sm:py-4 text-[13px] sm:text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent ${hpoeInputClasses}`}
                >
                  <div className="flex items-center gap-2">
                    {(() => {
                      const ActiveIcon = getCategoryIcon(selectedCategory);
                      return <ActiveIcon className="w-4 h-4 text-accent flex-shrink-0" />;
                    })()}
                    <span className="truncate">{selectedCategory === "All" ? "All Categories" : selectedCategory}</span>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isCategoryOpen ? 'rotate-180' : ''} flex-shrink-0`} />
                </button>

                <AnimatePresence>
                  {isCategoryOpen && (
                    <motion.div
                      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute top-full left-0 right-0 mt-2 p-2 z-30 ${hpoeDropdownClasses}`}
                    >
                      {categoryConfig.map((category) => {
                        const Icon = category.icon;
                        const isSelected = selectedCategory === category.name;
                        return (
                          <button
                            key={category.name}
                            onClick={() => {
                              setSelectedCategory(category.name);
                              setIsCategoryOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${isSelected ? 'bg-accent/10 text-primary-dark' : 'text-gray-600 hover:bg-[#fdfbf4] hover:text-gray-900'}`}
                          >
                            <Icon className={`w-4 h-4 ${isSelected ? 'text-accent' : 'text-gray-400'} flex-shrink-0`} />
                            <span className="whitespace-nowrap">{category.name === "All" ? "All Categories" : category.name}</span>
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative z-10 sm:w-48" ref={sortRef}>
                <button
                  type="button"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  className={`flex items-center justify-center sm:justify-between w-[46px] h-[46px] sm:w-full sm:h-auto sm:pl-4 sm:pr-4 sm:py-4 text-[13px] sm:text-base font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent ${hpoeInputClasses}`}
                  aria-label="Sort projects"
                >
                  <div className="flex items-center sm:gap-2">
                    <ArrowUpDown className="w-5 h-5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                    <span className="hidden sm:inline truncate">
                      {sortBy === 'newest' ? 'Sort by: Newest' : sortBy === 'oldest' ? 'Sort by: Oldest' : 'Sort by: Title (A-Z)'}
                    </span>
                  </div>
                  <ChevronDown className={`hidden sm:block w-4 h-4 text-gray-400 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''} flex-shrink-0`} />
                </button>

                <AnimatePresence>
                  {isSortOpen && (
                    <motion.div
                      initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={reducedMotion ? { opacity: 0 } : { opacity: 0, y: -10 }}
                      transition={{ duration: 0.15 }}
                      className={`absolute top-full right-0 sm:left-0 mt-2 w-48 p-2 z-30 ${hpoeDropdownClasses}`}
                    >
                      {[
                        { value: 'newest', label: 'Newest' },
                        { value: 'oldest', label: 'Oldest' },
                        { value: 'title', label: 'Title (A-Z)' }
                      ].map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSortBy(option.value as "newest" | "oldest" | "title");
                            setIsSortOpen(false);
                          }}
                          className={`w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${sortBy === option.value ? 'bg-accent/10 text-primary-dark' : 'text-gray-600 hover:bg-[#fdfbf4] hover:text-gray-900'}`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] sm:text-xs text-gray-500 font-light">
            <span>Use dropdowns or search to filter projects</span>
            <span className="hidden sm:inline-block">Hint: Try searching "Chennai" or "2023"</span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {total === 0 ? (
          <motion.div
            key="empty"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className="text-center py-12"
          >
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-accent/10 border border-accent/20">
              <Grid3x3 className="w-5 h-5 text-accent" />
            </div>
            <p className="mt-4 text-gray-800 text-lg font-semibold">No projects found</p>
            <p className="mt-1 text-gray-600">Try clearing search or choosing a different category.</p>
          </motion.div>
        ) : (
          <motion.div
            key={`gallery-${selectedCategory}-${sortBy}-${query}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
          >
            {filteredProjects.map((project, index) => {
              const CategoryIcon = getCategoryIcon(project.category);
              return (
                <motion.div
                  key={project.id}
                  initial={reducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                    mass: 0.75,
                    delay: reducedMotion ? 0 : index * 0.02,
                  }}
                  className="h-full"
                  style={{ willChange: "opacity, transform" }}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className={`group relative flex flex-col h-full overflow-hidden ${hpoeProjectCardClasses} ${reducedMotion ? '' : 'hover:-translate-y-2'} hover:border-gray-300 transition-all duration-500 will-change-transform focus:outline-none focus:ring-2 focus:ring-accent/40`}
                  >
                    {isHigh && (
                      <motion.div
                        className="absolute inset-0 rounded-[2.5rem] pointer-events-none z-[1]"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.08) 50%, transparent 100%)`,
                          backgroundSize: '200% 100%',
                        }}
                        animate={{ backgroundPosition: ['200% 0%', '-200% 0%'] }}
                        transition={{ duration: 7, repeat: Infinity, ease: "linear" }}
                      />
                    )}
                    <ParticleNetwork />
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden z-10">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={`${project.title} - ${project.category} construction project by Delphin Associates in ${project.location}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index === 0}
                        />
                      ) : (
                        <div className={`absolute inset-0 ${tier === 'very-low' ? 'bg-gray-200' : 'bg-gradient-to-br from-accent/20 to-primary/10'}`} />
                      )}

                      {tier !== 'very-low' && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                      )}

                      <div className="absolute top-4 left-4 z-10">
                        <span className={`inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full ${tier === 'very-low' || tier === 'low' ? 'bg-[#fdfbf4]' : 'bg-[#fdfbf4]/90 backdrop-blur'} border border-gray-200 text-[10px] sm:text-xs font-semibold text-gray-900`}>
                          <CategoryIcon className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                          {project.category}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 z-10">
                        <span className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full ${tier === 'very-low' || tier === 'low' ? 'bg-[#fdfbf4]' : 'bg-[#fdfbf4]/90 backdrop-blur'} border border-gray-200 text-[10px] sm:text-xs font-semibold text-gray-900`}>
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent mr-1" />
                          {project.year ?? "—"}
                        </span>
                      </div>

                    </div>

                    <div className="p-4 sm:p-5 flex flex-col flex-grow">
                      <div>
                        <h3 className="text-base sm:text-xl font-bold text-primary-dark group-hover:text-accent-dark transition-colors duration-300">
                          {project.title}
                        </h3>

                        <div className="mt-2 flex items-center gap-2 text-gray-500 text-xs sm:text-sm font-medium">
                          <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-accent flex-shrink-0" />
                          <span className="truncate">{project.location}</span>
                        </div>

                        <p className="mt-3 text-[13px] sm:text-sm text-gray-600 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                        <span className="text-xs sm:text-sm font-bold tracking-wide uppercase text-gray-400 group-hover:text-primary-dark transition-colors duration-300 flex items-center gap-2">
                          Explore Project
                        </span>
                        <motion.div
                          whileHover={reducedMotion ? {} : { x: 4 }}
                          transition={{ duration: 0.2 }}
                          className={`flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 ${tier === 'very-low' ? 'bg-gray-100 text-gray-500' : 'bg-[#fdfbf4] group-hover:bg-accent/10 border border-transparent group-hover:border-accent/40 text-gray-400 group-hover:text-accent'}`}
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
