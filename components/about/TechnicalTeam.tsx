"use client";

import ArchPlans from "../ui/ArchPlans";
import SheetWatermark from "../ui/SheetWatermark";
import { motion } from "framer-motion";
import { HardHat, BadgeCheck, Briefcase } from "lucide-react";
import { useHPOE } from "../HPOE";
import SpotlightCard from "../ui/SpotlightCard";

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
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;
  const isStatic = tier === 'low' || tier === 'very-low' || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  return (
    <section
      id="technical-team"
      data-header-theme="light"
      className="relative overflow-hidden py-14 sm:py-20 md:py-24 scroll-mt-28 bg-[#fdfbf4] border-b border-black/5"
    >
      {/* Drafting-paper ruling */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(18,18,18,0.045) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(18,18,18,0.045) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      <span aria-hidden className="absolute left-6 sm:left-12 top-0 bottom-0 w-px bg-accent/25 pointer-events-none" />

      <ArchPlans tone="light" variant="instruments" />

      {/* Sheet-index watermark */}
      <SheetWatermark text="04" tone="dark" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-14 lg:px-16">
        <motion.div
          initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: noReveal ? 0 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display font-bold text-[11px] sm:text-xs text-accent-dark/70 tracking-[0.25em] uppercase">Sheet 04&thinsp;/&thinsp;05</span>
            <span className="h-[2px] w-12 bg-accent"></span>
            <span className="text-accent-dark text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
              Technical Team
            </span>
          </div>
          <h2 className="text-[26px] sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-primary-dark tracking-tight">
            Engineers who make execution flawless
          </h2>
          <p className="mt-4 text-sm sm:text-lg text-gray-500 max-w-2xl leading-relaxed font-light">
            Precision planning, quality control, and technically sound execution across all sectors.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {technicalTeam.map((member, index) => (
            <motion.div
              key={member.name}
              initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: noReveal ? 0 : 0.6,
                delay: noReveal ? 0 : index * 0.08,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="h-full"
            >
              <SpotlightCard
                className={`group relative flex flex-col h-full p-5 sm:p-7 rounded-2xl sm:rounded-3xl border overflow-hidden ${
                  isHigh
                    ? 'liquid-glass-card-light !border-black/5 premium-card-hover-shine'
                    : tier === 'mid'
                    ? 'mid-glass-card-light !border-black/5'
                    : 'bg-white border-black/10'
                } ${
                  isStatic
                    ? ''
                    : 'transition-all duration-500 hover:!border-accent-dark/40 hover:shadow-[0_20px_40px_rgba(10,10,10,0.08)] hover:-translate-y-1.5'
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  {/* Engineer's stamp initials */}
                  <span className="relative flex items-center justify-center w-12 h-12 rounded-xl border border-accent-dark/50 p-[3px] shrink-0" aria-hidden>
                    <HardHat className="absolute -top-2 -right-2 w-4 h-4 text-accent-dark" />
                    <span className="flex items-center justify-center w-full h-full rounded-[9px] border border-accent-dark/30 bg-accent/10 font-display font-bold text-accent-dark text-sm tracking-widest">
                      {getInitials(member.name)}
                    </span>
                  </span>

                  <div className="min-w-0">
                    <h3 className={`text-base sm:text-lg font-bold text-primary-dark leading-tight ${isStatic ? '' : 'transition-colors duration-300 group-hover:text-accent-dark'}`}>
                      {member.name}
                    </h3>
                    {member.designation && (
                      <p className="text-xs sm:text-sm text-accent-dark font-semibold mt-1">
                        {member.designation}
                      </p>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {member.qualifications && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-[#fdfbf4] px-2.5 py-1 text-xs font-semibold text-gray-600">
                      <BadgeCheck className="w-3 h-3 text-accent-dark/60" aria-hidden />
                      {member.qualifications}
                    </span>
                  )}
                  {member.experience && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-[#fdfbf4] px-2.5 py-1 text-xs font-semibold text-gray-500">
                      <Briefcase className="w-3 h-3 text-accent-dark/60" aria-hidden />
                      {member.experience}
                    </span>
                  )}
                </div>

                <p className="text-gray-500 leading-relaxed font-light text-xs sm:text-sm mt-auto">
                  {member.description}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
