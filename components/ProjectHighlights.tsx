"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, MapPin, Calendar } from "lucide-react";

const featuredProjects = [
  {
    id: 1,
    title: "CSI Church Buildings",
    category: "Church",
    location: "Multiple Locations",
    description: "Design and construction of church buildings across Tamil Nadu",
    year: "2020-2024",
  },
  {
    id: 2,
    title: "Residential Flats",
    category: "Residential",
    location: "T. Nagar, West Mambalam, Kolathur",
    description: "Premium residential flats with modern amenities",
    year: "2018-2023",
  },
  {
    id: 3,
    title: "Industrial Buildings",
    category: "Industrial",
    location: "Ford Alliance Group, MM Nagar",
    description: "Large-scale industrial and factory buildings",
    year: "2019-2022",
  },
];

export default function ProjectHighlights() {
  return (
    <section className="relative z-10 py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-accent/10 text-accent rounded-full text-sm font-semibold mb-4">
            Our Portfolio
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-display text-primary">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Showcasing our excellence across various sectors with innovative design and quality construction
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container */}
              <div className="relative h-64 bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-8xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">🏗️</div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-accent text-white rounded-full text-xs font-bold uppercase tracking-wide">
                    {project.category}
                  </span>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/20 transition-all duration-500"></div>
              </div>

              {/* Content */}
              <div className="p-6 relative">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-2xl font-bold text-primary group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin size={16} className="mr-2 text-accent" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar size={16} className="mr-2 text-accent" />
                    <span>{project.year}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4 leading-relaxed">
                  {project.description}
                </p>

                <Link
                  href={`/projects#project-${project.id}`}
                  className="inline-flex items-center space-x-2 text-accent font-semibold group-hover:space-x-3 transition-all"
                >
                  <span>View Details</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
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
            className="group inline-flex items-center space-x-3 px-10 py-5 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <span>Explore All Projects</span>
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
