"use client";

import ArchPlans from "./ui/ArchPlans";
import SheetWatermark from "./ui/SheetWatermark";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MapPin, Church, Home, Factory, GraduationCap, Route, Grid3x3 } from "lucide-react";
import { useHPOE } from "./HPOE";
import SpotlightCard from "./ui/SpotlightCard";
import GeometricParticleField from "./ui/GeometricParticleField";
import ArrowLink from "./ui/ArrowLink";
import ParallaxFrame from "./ui/ParallaxFrame";

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
    code: "P-01",
    title: "CSI Church Buildings",
    category: "Church",
    location: "Multiple Locations",
    description: "Design and construction of church buildings across Tamil Nadu",
    year: "2020-2024",
    image: "/projects/church-buildings.jpg",
  },
  {
    id: 2,
    code: "P-02",
    title: "Residential Flats",
    category: "Residential",
    location: "T. Nagar, West Mambalam, Kolathur",
    description: "Premium residential flats with modern amenities",
    year: "2018-2023",
    image: "/projects/residential-flats.jpg",
  },
  {
    id: 3,
    code: "P-03",
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
  const isStatic = tier === 'low' || tier === 'very-low' || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  return (
    <section
      id="home-project-highlights"
      data-header-theme="dark"
      className={`relative z-10 py-14 sm:py-24 md:py-32 ${tier === 'very-low' ? 'bg-primary-dark' : 'bg-primary-dark/95'} overflow-hidden border-y border-white/5`}
    >
      {/* Faint site grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <ArchPlans tone="dark" variant="crane" />

      {/* Sheet-index watermark */}
      <SheetWatermark text="02" tone="light" />

      {isHigh && (
        <GeometricParticleField
          quantity={50}
          color="#D4AF37"
          className="z-[1]"
          staticity={60}
        />
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial header row */}
        <motion.div
          initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: noReveal ? 0 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 sm:mb-16"
        >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display font-bold text-[11px] sm:text-xs text-accent/60 tracking-[0.25em] uppercase">Sheet 02&thinsp;/&thinsp;06</span>
              <span className="h-[2px] w-12 bg-accent"></span>
              <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
                Our Portfolio
              </span>
            </div>
            <h2 className="text-[28px] sm:text-4xl md:text-5xl lg:text-7xl font-bold font-display tracking-tight leading-[1.05]">
              <span className="text-white">Featured </span>
              <span className="text-outline-display">Projects</span>
            </h2>
          </div>
          <div className="md:text-right md:max-w-sm">
            <p className="text-sm sm:text-base text-gray-400 leading-relaxed font-light mb-4">
              From CSI church halls to the Ford Alliance factory floor - a
              cross-section of 100+ builds across Tamil Nadu.
            </p>
            <ArrowLink href="/projects" tone="onDark" className="hidden md:inline-flex">
              View all projects
            </ArrowLink>
          </div>
        </motion.div>

        {/* Feature grid: one full-width card, two supporting */}
        <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
          {featuredProjects.map((project, index) => {
            const CategoryIcon = getCategoryIcon(project.category);
            const isFeature = index === 0;
            return (
              <motion.article
                key={project.id}
                initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{
                  duration: noReveal ? 0 : 0.7,
                  delay: noReveal ? 0 : index * 0.12,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className={`group relative will-change-transform ${isFeature ? 'md:col-span-2' : ''}`}
              >
                <Link href={`/projects#project-${project.id}`} aria-label={`${project.title} - view project`} className="block h-full">
                  <SpotlightCard
                    className={`relative overflow-hidden rounded-3xl sm:rounded-[2rem] border border-white/10 ${isFeature ? 'h-[22rem] sm:h-[26rem] lg:h-[30rem]' : 'h-[20rem] sm:h-[24rem]'} ${tier === 'very-low' ? 'bg-black' : 'bg-black'} ${tier === 'high' || tier === 'mid' ? 'shadow-[0_16px_40px_rgba(0,0,0,0.4)] hover:shadow-[0_28px_60px_rgba(0,0,0,0.6)] hover:border-accent/30 transition-all duration-500' : ''} ${isHigh ? 'premium-border-glow' : ''}`}
                  >
                    <ParallaxFrame range={42}>
                      <Image
                        src={project.image}
                        alt={`${project.title} - ${project.category} construction project by Delphin Associates in ${project.location}`}
                        fill
                        className={`object-cover ${isStatic ? '' : 'transition-transform duration-700 ease-out group-hover:scale-[1.06]'}`}
                        sizes={isFeature ? "(max-width: 768px) 100vw, 90vw" : "(max-width: 768px) 100vw, 45vw"}
                        priority={isFeature}
                      />
                    </ParallaxFrame>

                    {/* Readability scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10 pointer-events-none" aria-hidden />

                    {/* Category chip */}
                    <div className="absolute top-5 left-5 z-10">
                      <span
                        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-white ${
                          isHigh
                            ? 'liquid-glass-chip backdrop-blur-md bg-white/10 border-white/25'
                            : tier === 'very-low'
                            ? 'bg-black border-white/30'
                            : 'bg-black/70 border-white/15'
                        } ${isStatic ? '' : 'transition-colors duration-300 group-hover:bg-accent group-hover:border-accent group-hover:text-black'}`}
                      >
                        <CategoryIcon className="w-4 h-4" aria-hidden />
                        <span className="text-xs font-bold uppercase tracking-wider">{project.category}</span>
                      </span>
                    </div>

                    {/* Drawing code + period */}
                    <span className="absolute top-6 right-6 z-10 text-right">
                      <span className="block font-display font-bold text-sm sm:text-base tracking-[0.2em] text-accent">
                        {project.code}
                      </span>
                      <span className="block text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-white/60 uppercase mt-1">
                        {project.year}
                      </span>
                    </span>

                    {/* Overlaid info panel */}
                    <div className="absolute inset-x-0 bottom-0 z-10 p-5 sm:p-7 lg:p-9">
                      <h3 className={`font-bold text-white font-display tracking-tight leading-tight mb-2 sm:mb-3 ${isFeature ? 'text-2xl sm:text-3xl lg:text-4xl' : 'text-xl sm:text-2xl'} ${isStatic ? '' : 'transition-colors duration-300 group-hover:text-accent-light'}`}>
                        {project.title}
                      </h3>
                      <p className="flex items-center gap-2 text-white/70 text-xs sm:text-sm font-light mb-2 sm:mb-3">
                        <MapPin className="w-4 h-4 text-accent shrink-0" aria-hidden />
                        <span className="line-clamp-1">{project.location}</span>
                      </p>
                      <p className={`text-white/60 font-light leading-relaxed text-xs sm:text-sm ${isFeature ? 'max-w-xl' : ''} line-clamp-2 mb-3 sm:mb-4`}>
                        {project.description}
                      </p>
                      <span className="inline-flex items-center gap-2 text-accent font-semibold text-xs sm:text-sm uppercase tracking-[0.2em]">
                        View Project
                        <ArrowRight className={`w-4 h-4 ${isStatic ? '' : 'transition-transform duration-300 group-hover:translate-x-1.5'}`} aria-hidden />
                      </span>
                    </div>
                  </SpotlightCard>
                </Link>
              </motion.article>
            );
          })}
        </div>

        {/* Mobile / fallback all-projects CTA */}
        <motion.div
          initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 20, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: noReveal ? 0 : 0.6, delay: noReveal ? 0 : 0.3 }}
          className="flex justify-center mt-10 sm:mt-14 md:hidden"
        >
          <ArrowLink href="/projects" tone="onDark">
            Explore All Projects
          </ArrowLink>
        </motion.div>
      </div>
    </section>
  );
}
