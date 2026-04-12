"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Calendar, Church, Home, Factory, GraduationCap, Route, Grid3x3 } from "lucide-react";
import { useHPOE } from "./HPOE";
import SpotlightCard from "./ui/SpotlightCard";
import Tilt3DContainer from "./ui/Tilt3DContainer";

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
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;

  return (
    <section
      id="home-project-highlights"
      className={`relative z-10 py-12 sm:py-20 md:py-28 ${tier === 'very-low' ? 'bg-white' : 'bg-gradient-to-b from-white/95 to-gray-50/95'} overflow-hidden border-y border-black/5`}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <span className="h-[2px] w-8 bg-accent"></span>
            <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
              Our Portfolio
            </span>
            <span className="h-[2px] w-8 bg-accent"></span>
          </div>
          <h2 className="text-[28px] sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 font-display text-primary-dark tracking-tight">
            Featured Projects
          </h2>
          <p className="text-sm sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
            Showcasing our excellence across various sectors with innovative design and quality construction
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 mb-12 sm:mb-16 md:mb-20">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="group relative will-change-transform h-full"
            >
              <Tilt3DContainer maxRotation={6} className="h-full w-full">
                <SpotlightCard className={`rounded-3xl sm:rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-500 flex flex-col h-full ${tier === 'very-low' ? 'bg-white' : (isHigh ? 'liquid-glass-card-light premium-border-glow' : 'bg-white border border-gray-100 hover:-translate-y-2')}`}>
                  <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-gray-100 flex-shrink-0">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} - ${project.category} construction project by Delphin Associates in ${project.location}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        priority={index === 0}
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200"></div>
                    )}
                    
                    {!project.image && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-8xl opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-500">🏗️</div>
                      </div>
                    )}
                    
                    {tier !== 'very-low' && (
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                    )}
                    
                    <div className="absolute top-5 left-5 z-10 transition-transform duration-500 group-hover:translate-y-1">
                      <div className={`${tier === 'very-low' ? 'bg-white' : (tier === 'low' ? 'bg-white' : 'backdrop-blur-md bg-white/95')} shadow-[0_4px_12px_rgb(0,0,0,0.1)] border border-white/20 px-4 py-2 rounded-full flex items-center gap-2 group-hover:bg-accent group-hover:border-accent transition-colors duration-300`}>
                        {(() => {
                          const CategoryIcon = getCategoryIcon(project.category);
                          return <CategoryIcon className="w-4 h-4 text-accent group-hover:text-white transition-colors" />;
                        })()}
                        <span className="text-xs font-bold uppercase tracking-wider text-gray-900 group-hover:text-white transition-colors">{project.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 sm:p-8 flex flex-col flex-grow relative z-10">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-5 group-hover:text-accent transition-colors duration-300 leading-tight">
                      {project.title}
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center text-gray-500 text-sm font-medium">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-accent/10 group-hover:text-accent transition-colors shrink-0">
                          <MapPin className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors" />
                        </div>
                        <span className="break-words line-clamp-1 font-light">{project.location}</span>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm font-medium">
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center mr-3 group-hover:bg-accent/10 group-hover:text-accent transition-colors shrink-0">
                          <Calendar className="w-4 h-4 text-gray-400 group-hover:text-accent transition-colors" />
                        </div>
                        <span className="font-light">{project.year}</span>
                      </div>
                    </div>

                    <p className="text-sm sm:text-base text-gray-500 mb-6 sm:mb-8 leading-relaxed font-light flex-grow">
                      {project.description}
                    </p>

                    <div className="mt-auto">
                      <Link
                        href={`/projects#project-${project.id}`}
                        className="inline-flex items-center gap-3 text-primary-dark font-semibold text-sm group/link hover:text-accent transition-colors duration-300 uppercase tracking-widest mt-auto w-fit"
                      >
                        <span className="relative">
                          View Project
                          <span className="absolute left-0 -bottom-1 w-full h-[2px] bg-accent scale-x-0 group-hover/link:scale-x-100 transition-transform origin-left duration-300 ease-out"></span>
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center group-hover/link:bg-accent group-hover/link:text-white transition-all duration-300 group-hover/link:translate-x-1">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Link>
                    </div>
                  </div>
                </SpotlightCard>
              </Tilt3DContainer>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/projects"
            className={`group inline-flex items-center justify-center w-full sm:w-auto px-6 py-3 sm:px-8 sm:py-4 font-bold text-sm sm:text-base text-black transition-all duration-300 bg-accent rounded-xl hover:bg-accent-light hover:shadow-xl ${tier === 'low' || tier === 'very-low' ? '' : 'hover:shadow-accent/20'} ${isHigh ? 'liquid-glass-btn-accent-invert' : tier === 'mid' && !reducedMotion ? 'mid-glass-btn-accent-invert' : ''}`}
          >
            <span className="flex items-center gap-2">
              Explore All Projects
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform duration-300" />
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

