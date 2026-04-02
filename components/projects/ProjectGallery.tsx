"use client";

import { useMemo, useState } from "react";
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
} from "lucide-react";
import projectsData from "@/data/projects.json";
import { usePerformance } from "../PerformanceProvider";

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
  const { tier } = usePerformance();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "title">("newest");

  const projects = projectsData as Project[];

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
        <div className={`rounded-[2.5rem] border border-gray-100 ${tier === 'very-low' ? 'bg-white' : 'bg-white/95'} shadow-[0_8px_30px_rgb(0,0,0,0.04)] px-3 py-4 sm:px-6 sm:py-6`}>
          <div className="grid gap-3 lg:gap-4 lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by project name or location..."
                className="w-full rounded-2xl border border-gray-200 bg-white px-10 py-2.5 sm:py-3 text-sm sm:text-base text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40"
              />
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between lg:justify-end">
              <div className="flex items-center gap-3">
                {query.trim().length > 0 && (
                  <button
                    type="button"
                    onClick={() => setQuery("")}
                    className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
                  >
                    Clear
                  </button>
                )}
                <label className="sr-only" htmlFor="project-sort">
                  Sort
                </label>
                <select
                  id="project-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs sm:text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40"
                >
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="title">Title (A-Z)</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-3 sm:mt-4">
            <div className="flex flex-nowrap gap-2 sm:gap-3 overflow-x-auto pb-1">
              {categoryConfig.map((category, index) => {
                const Icon = category.icon;
                const isActive = selectedCategory === category.name;

                return (
                  <motion.button
                    key={category.name}
                    initial={tier === 'very-low' ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.02 }}
                    onClick={() => setSelectedCategory(category.name)}
                    className={`group relative px-4 sm:px-5 py-1.5 sm:py-2 rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 ${
                      isActive
                        ? `${tier === 'very-low' ? 'bg-accent text-black' : `bg-gradient-to-r ${category.gradient} text-white`} shadow-lg shadow-accent/25 scale-105`
                        : "bg-white text-gray-700 border border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow-sm"
                    }`}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Icon
                      className={`h-3 w-3 sm:h-4 sm:w-4 transition-all duration-300 ${
                        isActive ? "text-white" : "text-gray-600 group-hover:text-accent"
                      }`}
                    />
                    <span className="whitespace-nowrap">{category.name}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-2 text-xs sm:text-sm text-gray-600 flex items-center justify-between">
              <span>Filter by category & search</span>
              <span className="hidden sm:inline">Try “church”, “Chengalpattu”, or a year like “2021”.</span>
            </div>
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
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 120,
                    damping: 18,
                    mass: 0.75,
                    delay: index * 0.02,
                  }}
                  className="h-full"
                  style={{ willChange: "opacity, transform" }}
                >
                  <Link
                    href={`/projects/${project.id}`}
                    className={`group block h-full rounded-[2.5rem] ${tier === 'very-low' ? 'bg-white' : 'bg-white/95 liquid-glass-card'} border border-gray-200 overflow-hidden shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2),0_16px_32px_-8px_rgba(0,0,0,0.12)] hover:-translate-y-2 hover:border-gray-300 transition-all duration-500 will-change-transform focus:outline-none focus:ring-2 focus:ring-accent/40`}
                  >
                    <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
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
                        <span className={`inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full ${tier === 'very-low' || tier === 'low' ? 'bg-white' : 'bg-white/90 backdrop-blur'} border border-gray-200 text-[10px] sm:text-xs font-semibold text-gray-900`}>
                          <CategoryIcon className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                          {project.category}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 z-10">
                        <span className={`inline-flex items-center px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full ${tier === 'very-low' || tier === 'low' ? 'bg-white' : 'bg-white/90 backdrop-blur'} border border-gray-200 text-[10px] sm:text-xs font-semibold text-gray-900`}>
                          <Calendar className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-accent mr-1" />
                          {project.year ?? "—"}
                        </span>
                      </div>

                      <div className="absolute inset-x-4 bottom-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="inline-flex items-center justify-center gap-2 w-full rounded-xl bg-accent px-3 py-2 text-black font-bold text-sm">
                          View details <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <div className="p-4 sm:p-5">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-base sm:text-xl font-bold text-primary-dark">
                          {project.title}
                        </h3>
                        <motion.div
                          whileHover={{ x: 2 }}
                          transition={{ duration: 0.2 }}
                          className="hidden sm:flex items-center justify-center w-9 h-9 rounded-2xl bg-accent/10 border border-accent/20 text-accent"
                        >
                          <ArrowRight className="w-4 h-4" />
                        </motion.div>
                      </div>

                      <div className="mt-2 flex items-center gap-2 text-gray-600 text-xs sm:text-sm">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                        <span className="break-words">{project.location}</span>
                      </div>

                      <p className="mt-2 sm:mt-3 text-[13px] sm:text-base text-gray-700">
                        <span className="line-clamp-3">{project.description}</span>
                      </p>
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
