"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
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

const categories = ["All", "Church", "Residential", "Industrial", "Institutional", "Infrastructure"];

export default function ProjectGallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const projects = projectsData as Project[];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-lg font-semibold transition-all ${
              selectedCategory === category
                ? "bg-accent text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
            >
              <div className="relative h-48 bg-gradient-to-br from-accent/20 to-primary/20 overflow-hidden">
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
                  <span className="bg-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {project.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-primary">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm mb-2 flex items-center">
                  <span className="mr-1">📍</span>
                  {project.location}
                </p>
                {project.year && (
                  <p className="text-gray-500 text-sm mb-3">
                    Year: {project.year}
                  </p>
                )}
                <p className="text-gray-700">{project.description}</p>
              </div>
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
