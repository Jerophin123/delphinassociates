"use client";

import { motion } from "framer-motion";
import { HardHat, BadgeCheck, Briefcase } from "lucide-react";

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
  return (
    <motion.section
      id="technical-team"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8
      }}
      className="mb-8 sm:mb-12 md:mb-16 scroll-mt-28"
      style={{ willChange: 'opacity, transform' }}
    >
      <div className="mb-6 sm:mb-8">
        <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-accent/25 bg-accent/10 text-accent font-semibold text-xs sm:text-sm">
          <HardHat className="w-4 h-4" />
          Technical Team
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold font-display tracking-[0.01em] bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
          Engineers who make execution flawless
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl">
          Precision planning, quality control, and technically sound execution across all sectors.
        </p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {technicalTeam.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ 
              type: "spring",
              stiffness: 120,
              damping: 20,
              mass: 0.7,
              delay: index * 0.08
            }}
            whileHover={{ 
              y: -8,
              scale: 1.01,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
              }
            }}
            className="group relative bg-white border border-accent/15 hover:border-accent/35 rounded-3xl p-5 sm:p-6 md:p-7 transition-[box-shadow,border-color] duration-300 ease-out overflow-hidden shadow-[0_12px_28px_-18px_rgba(0,0,0,0.25)] hover:shadow-[0_48px_90px_-30px_rgba(0,0,0,0.35)]"
            style={{ willChange: "transform" }}
          >
            {/* 3D depth layers (static, no mouse tracking) */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/10 via-transparent to-accent-light/10" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 via-black/5 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
            <div className="pointer-events-none absolute left-0 top-0 h-24 w-24 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.35)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-start space-x-3 sm:space-x-4">
              <motion.div 
                className="relative w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent/20 to-accent-light/10 rounded-full flex items-center justify-center flex-shrink-0"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  type: "spring",
                  stiffness: 150,
                  damping: 18,
                  mass: 0.6,
                  delay: index * 0.08 + 0.1
                }}
                whileHover={{ 
                  scale: 1.08,
                  transition: {
                    type: "spring",
                    stiffness: 500,
                    damping: 30
                  }
                }}
                style={{ willChange: 'transform' }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.65)_0%,transparent_55%)] opacity-70" />
                <HardHat className="pointer-events-none absolute -top-0.5 right-0.5 w-4 h-4 sm:w-5 sm:h-5 text-accent/80 drop-shadow-[0_0_14px_rgba(212,175,55,0.18)]" />
                <span className="relative z-10 text-xs sm:text-sm md:text-base font-bold text-accent drop-shadow-[0_0_14px_rgba(212,175,55,0.18)]">
                  {getInitials(member.name)}
                </span>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 text-primary tracking-[0.01em]">
                  {member.name}
                </h3>
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  {member.qualifications && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-accent/15 bg-accent/10 px-3 py-1 text-[11px] sm:text-xs font-semibold text-accent">
                      <BadgeCheck className="w-3 h-3" />
                      {member.qualifications}
                    </span>
                  )}
                  {member.experience && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-accent/15 bg-white px-3 py-1 text-[11px] sm:text-xs font-semibold text-gray-700">
                      <Briefcase className="w-3 h-3 text-accent" />
                      {member.experience}
                    </span>
                  )}
                </div>

                {member.designation && (
                  <p className="text-xs sm:text-sm text-accent font-semibold mb-1.5 sm:mb-2">
                    {member.designation}
                  </p>
                )}

                <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                  {member.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
