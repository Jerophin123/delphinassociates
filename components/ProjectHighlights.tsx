"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

const featuredProjects = [
  {
    id: 1,
    title: "CSI Church Buildings",
    category: "Church",
    location: "Multiple Locations",
    description: "Design and construction of church buildings across Tamil Nadu",
    year: "2020-2024",
    image: "/projects/church-buildings.jpg",
  },
  {
    id: 2,
    title: "Residential Flats",
    category: "Residential",
    location: "T. Nagar, West Mambalam, Kolathur",
    description: "Premium residential flats with modern amenities",
    year: "2018-2023",
    image: "/projects/residential-flats.jpg",
  },
  {
    id: 3,
    title: "Industrial Buildings",
    category: "Industrial",
    location: "Ford Alliance Group, MM Nagar",
    description: "Large-scale industrial and factory buildings",
    year: "2019-2022",
    image: "/projects/industrial-buildings.jpg",
  },
];

export default function ProjectHighlights() {
  return (
    <section className="relative z-10 py-12 sm:py-16 md:py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            Our Portfolio
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-display text-primary">
            Featured Projects
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-2">
            Showcasing our excellence across various sectors with innovative design and quality construction
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12 md:mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl shadow-[0_8px_16px_-4px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08),0_2px_4px_-1px_rgba(0,0,0,0.06)] overflow-hidden hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.25),0_16px_32px_-8px_rgba(0,0,0,0.15),0_8px_16px_-4px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02]"
            >
              {/* Image Container */}
              <div className="relative h-48 sm:h-56 md:h-64 bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
                {/* Project Image */}
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={`${project.title} - ${project.category} construction project by Delphin Associates in ${project.location}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index === 0}
                  />
                ) : (
                  /* Fallback gradient background */
                  <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-light to-primary-dark"></div>
                )}
                
                {/* Dark gradient overlay for text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-[1]"></div>
                
                {/* Fallback emoji if no image */}
                {!project.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-8xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">🏗️</div>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-accent text-white rounded-full text-xs font-bold uppercase tracking-wide">
                    {project.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-all duration-500 z-10"></div>
              </div>

              {/* Content */}
              <div className="p-4 sm:p-5 md:p-6 relative">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                </div>
                
                <div className="space-y-1.5 sm:space-y-2 mb-3 sm:mb-4">
                  <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-accent" />
                    </motion.div>
                    <span className="break-words">{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-xs sm:text-sm">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 text-accent" />
                    </motion.div>
                    <span>{project.year}</span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4 leading-relaxed">
                  {project.description}
                </p>

                <Link
                  href={`/projects#project-${project.id}`}
                  className="inline-flex items-center space-x-1.5 sm:space-x-2 text-accent font-semibold text-sm sm:text-base group-hover:space-x-2 sm:group-hover:space-x-3 transition-all"
                >
                  <span>View Details</span>
                  <motion.div
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                  </motion.div>
                </Link>
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-accent/20 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/projects"
            className="group inline-flex items-center space-x-2 sm:space-x-3 px-6 sm:px-8 md:px-10 py-3 sm:py-4 md:py-5 bg-primary text-white rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-primary-dark transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <span>Explore All Projects</span>
            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
