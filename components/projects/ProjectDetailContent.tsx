"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Calendar } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  year?: string;
  image?: string;
};

const containerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function ProjectDetailContent({ project }: { project: Project }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="mt-6 sm:mt-8 md:mt-10 flex flex-col gap-6 sm:gap-8 md:gap-10 md:flex-row md:items-start"
    >
      <motion.div variants={itemVariants} className="md:w-1/2">
        <div className="relative w-full overflow-hidden rounded-xl sm:rounded-2xl bg-gray-100 shadow-lg">
          {project.image ? (
            <motion.div
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Image
                src={project.image}
                alt={`${project.title} - ${project.category} construction project by Delphin Associates in ${project.location}`}
                width={900}
                height={700}
                className="h-full w-full object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          ) : (
            <motion.div
              className="flex aspect-square items-center justify-center bg-gradient-to-br from-accent/20 to-primary/20 text-7xl text-white/70 md:aspect-[4/3]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {project.category === "Church" && "⛪"}
              {project.category === "Residential" && "🏠"}
              {project.category === "Industrial" && "🏭"}
              {project.category === "Institutional" && "🏫"}
              {project.category === "Infrastructure" && "🛣️"}
              {!["Church", "Residential", "Industrial", "Institutional", "Infrastructure"].includes(project.category) && "🏗️"}
            </motion.div>
          )}
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="md:w-1/2">
        <span className="inline-block rounded-full bg-accent/10 px-3 sm:px-4 py-0.5 sm:py-1 text-xs sm:text-sm font-semibold text-accent">
          {project.category}
        </span>

        <motion.h1
          variants={itemVariants}
          className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-4xl font-bold text-primary"
        >
          {project.title}
        </motion.h1>

        <motion.div
          variants={itemVariants}
          className="mt-3 sm:mt-4 flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-gray-600"
        >
          <span className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <MapPin className="mr-1.5 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4 text-accent" />
            </motion.div>
            <span className="break-words">{project.location}</span>
          </span>
          {project.year && (
            <span className="flex items-center text-gray-500">
              <motion.div
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.2 }}
              >
                <Calendar className="mr-1.5 sm:mr-2 w-3 h-3 sm:w-4 sm:h-4 text-accent" />
              </motion.div>
              Year: {project.year}
            </span>
          )}
        </motion.div>

        <motion.p
          variants={itemVariants}
          className="mt-4 sm:mt-5 md:mt-6 text-sm sm:text-base md:text-lg leading-relaxed text-gray-700"
        >
          {project.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
}



