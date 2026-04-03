"use client";

import { motion } from "framer-motion";
import { HardHat, BadgeCheck, Briefcase } from "lucide-react";
import { usePerformance } from "../PerformanceProvider";
import SpotlightCard from "../ui/SpotlightCard";
import Tilt3DContainer from "../ui/Tilt3DContainer";

const technicalTeam = [
  {
    name: "Mr. S.M. Darwin Rholland",
    qualifications: "B.Tech",
    designation: "Technical Division Leader",
    description:
      "Leads the technical division with focus on precision planning, design innovation, and quality-driven execution. Ensures all projects meet the highest technical standards.",
  },
  {
    name: "Mr. Godwin",
    qualifications: "DCE",
    experience: "10 years experience",
    description: "Experienced engineer specializing in project planning and execution.",
  },
  {
    name: "Mr. Janarthanan. S",
    qualifications: "DCE",
    experience: "10 years experience",
    description: "Skilled engineer with expertise in structural design and quality control.",
  },
  {
    name: "Mr. John Griffin. C",
    qualifications: "DCE Civil",
    experience: "6 years experience",
    description: "Dedicated engineer focusing on residential and commercial projects.",
  },
  {
    name: "Mr. Glenn Grifton. C",
    qualifications: "BE Civil",
    experience: "4 years experience",
    description: "Young professional engineer contributing to innovative construction solutions.",
  },
];

function getInitials(name: string) {
  const cleaned = name
    .replace(/Mr\.|Mrs\.|Ms\.|Dr\./gi, "")
    .replace(/[^A-Za-z\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return "DA";

  const tokens = cleaned.split(" ").filter(Boolean);
  return tokens
    .slice(0, 2)
    .map((t) => t[0]?.toUpperCase())
    .join("");
}

export default function TechnicalTeam() {
  const { tier, reducedMotion } = usePerformance();
  const isHigh = tier === 'high' && !reducedMotion;

  return (
    <section id="technical-team" className="relative mb-12 sm:mb-20 md:mb-24 scroll-mt-28">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="mb-8 sm:mb-12"
      >
        <div className="flex items-center gap-3 mb-4">
          <span className="h-[2px] w-8 bg-accent"></span>
          <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
            Technical Team
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-primary-dark tracking-tight">
          Engineers who make execution flawless
        </h2>
        <p className="mt-4 text-sm sm:text-lg text-gray-500 max-w-2xl leading-relaxed font-light">
          Precision planning, quality control, and technically sound execution across all sectors.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
        {technicalTeam.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ 
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.21, 0.47, 0.32, 0.98]
            }}
          >
            <Tilt3DContainer maxRotation={8} className="h-full">
              <SpotlightCard className={`group relative ${tier === 'very-low' ? 'bg-white' : 'bg-white/95 liquid-glass-card'} rounded-[2rem] overflow-hidden border border-gray-200 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2),0_16px_32px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 will-change-transform hover:-translate-y-2 p-6 sm:p-8 flex flex-col h-full hover:border-gray-300 ${isHigh ? 'premium-card-hover-shine premium-border-glow' : ''}`}>
                {/* Subtle Gradient background on hover */}
                {tier !== 'very-low' && <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />}
                
                <div className="relative z-10 flex flex-col sm:flex-row items-start sm:space-x-4 h-full">
                  <div className="relative mb-4 sm:mb-0 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 bg-gray-50 border border-black/5 group-hover:bg-accent/10 transition-colors duration-500 shadow-sm">
                    {isHigh && (
                      <div className="absolute inset-0 rounded-full bg-accent/10 animate-[pulse-ring_3s_ease-in-out_infinite] pointer-events-none" />
                    )}
                    <HardHat className="absolute -top-1 right-0 w-3.5 h-3.5 text-accent opacity-80" />
                    <span className="relative z-10 text-base font-bold text-gray-700 group-hover:text-accent transition-colors duration-500">
                      {getInitials(member.name)}
                    </span>
                  </div>
                  
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-base sm:text-lg font-bold mb-2 text-gray-900 group-hover:text-accent transition-colors duration-300">
                      {member.name}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {member.qualifications && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-600">
                          <BadgeCheck className="w-3 h-3 text-gray-400" />
                          {member.qualifications}
                        </span>
                      )}
                      {member.experience && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-semibold text-gray-500">
                          <Briefcase className="w-3 h-3 text-accent/60" />
                          {member.experience}
                        </span>
                      )}
                    </div>

                    {member.designation && (
                      <p className="text-sm text-accent font-semibold mb-2">
                        {member.designation}
                      </p>
                    )}

                    <p className="text-gray-500 leading-relaxed font-light text-xs sm:text-sm mt-auto pt-2">
                      {member.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </Tilt3DContainer>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
