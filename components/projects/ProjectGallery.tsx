"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar, Church, Home, Factory, GraduationCap, Route, Grid3x3 } from "lucide-react";
import projectsData from "@/data/projects.json";

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
  { name: "All", icon: Grid3x3, color: "from-primary to-primary-dark" },
  { name: "Church", icon: Church, color: "from-purple-500 to-purple-600" },
  { name: "Residential", icon: Home, color: "from-blue-500 to-blue-600" },
  { name: "Industrial", icon: Factory, color: "from-orange-500 to-orange-600" },
  { name: "Institutional", icon: GraduationCap, color: "from-green-500 to-green-600" },
  { name: "Infrastructure", icon: Route, color: "from-teal-500 to-teal-600" },
];

// Helper function to get icon for category
const getCategoryIcon = (category: string) => {
  const config = categoryConfig.find((c) => c.name === category);
  return config ? config.icon : Grid3x3;
};

export default function ProjectGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const projects = projectsData as Project[];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div>
      {/* Modern Category Filter */}
      <div className="mb-8 sm:mb-10 md:mb-12">
        <div className="flex flex-wrap gap-2 sm:gap-3 justify-center items-center">
          {categoryConfig.map((category, index) => {
            const Icon = category.icon;
            const isActive = selectedCategory === category.name;

            return (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => setSelectedCategory(category.name)}
                className={`group relative px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 rounded-lg font-semibold text-xs sm:text-sm md:text-base transition-all duration-300 flex items-center gap-2 sm:gap-2.5 ${
                  isActive
                    ? "bg-gradient-to-r from-accent to-accent-dark text-white shadow-lg shadow-accent/30 scale-105"
                    : "bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Icon
                  className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-gray-600 group-hover:text-accent"
                  }`}
                />
                <span className="whitespace-nowrap">{category.name}</span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                type: "spring",
                stiffness: 120,
                damping: 20,
                mass: 0.7,
                delay: index * 0.04
              }}
              className="h-full"
              style={{ willChange: 'opacity, transform' }}
            >
              <Link
                href={`/projects/${project.id}`}
                className="group block h-full bg-white rounded-lg shadow-[0_8px_16px_-4px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08),0_2px_4px_-1px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_16px_32px_-8px_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-300 hover:-translate-y-3 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-accent/40"
              >
                <div className="relative h-40 sm:h-44 md:h-48 bg-gradient-to-br from-accent/20 to-primary/20 overflow-hidden">
                {/* Project Image */}
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.category} construction project by Delphin Associates in ${project.location}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  /* Fallback gradient background */
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/20"></div>
                )}
                
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent z-[1]"></div>
                
                {/* Fallback emoji if no image */}
                {!project.image && (
                  <div className="absolute inset-0 flex items-center justify-center z-[1]">
                    <div className="text-6xl opacity-30">
                      {project.category === "Church" && "⛪"}
                      {project.category === "Residential" && "🏠"}
                      {project.category === "Industrial" && "🏭"}
                      {project.category === "Institutional" && "🏫"}
                      {project.category === "Infrastructure" && "🛣️"}
                      {!["Church", "Residential", "Industrial", "Institutional", "Infrastructure"].includes(project.category) && "🏗️"}
                    </div>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5">
                    {(() => {
                      const CategoryIcon = getCategoryIcon(project.category);
                      return <CategoryIcon className="w-3 h-3" />;
                    })()}
                    {project.category}
                  </span>
                </div>
                </div>
                <div className="p-4 sm:p-5 md:p-6">
                  <h3 className="text-lg sm:text-xl font-bold mb-2 text-primary">
                    {project.title}
                  </h3>
                  <div className="text-gray-600 text-xs sm:text-sm mb-2 flex items-center">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MapPin className="mr-1 w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                    </motion.div>
                    <span className="break-words">{project.location}</span>
                  </div>
                  {project.year && (
                    <div className="text-gray-500 text-xs sm:text-sm mb-2 sm:mb-3 flex items-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Calendar className="mr-1 w-3 h-3 sm:w-4 sm:h-4 text-accent" />
                      </motion.div>
                      Year: {project.year}
                    </div>
                  )}
                  <p className="text-sm sm:text-base text-gray-700">{project.description}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">
            No projects found in this category.
          </p>
        </div>
      )}
    </div>
  );
}
