"use client";

import ArchPlans from "../ui/ArchPlans";
import SheetWatermark from "../ui/SheetWatermark";
import { motion } from "framer-motion";
import { BadgeCheck, Medal } from "lucide-react";
import { useHPOE } from "../HPOE";
import SpotlightCard from "../ui/SpotlightCard";

const managementTeam = [
  {
    name: "Mr. Delphin P. Stanley",
    designation: "Founder & Managing Director",
    qualifications: "DCE, B.Tech",
    description:
      "Established Delphin Associates in 1999 with a vision to provide quality construction services. Leads the organization with over 25 years of experience in civil construction.",
    isFounder: true,
  },
  {
    name: "Mr. B.S. Sundar Singh",
    designation: "Management Team Leader",
    qualifications: "DCE, B.Tech",
    description:
      "Ensures transparency in financial systems and timely project completion. Manages operations with a focus on client satisfaction and organizational efficiency.",
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

export default function ManagementTeam() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;
  const isStatic = tier === 'low' || tier === 'very-low' || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  return (
    <section
      id="management-team"
      data-header-theme="dark"
      className={`relative overflow-hidden py-14 sm:py-20 md:py-24 scroll-mt-28 ${tier === 'very-low' ? 'bg-primary-dark' : 'bg-primary-dark/95'} border-y border-white/5`}
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

      <ArchPlans tone="dark" variant="portal" />

      {/* Sheet-index watermark */}
      <SheetWatermark text="03" tone="light" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: noReveal ? 0 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="mb-10 sm:mb-14"
        >
          <div className="flex items-center gap-3 mb-6">
            <span className="font-display font-bold text-[11px] sm:text-xs text-accent/60 tracking-[0.25em] uppercase">Sheet 03&thinsp;/&thinsp;05</span>
            <span className="h-[2px] w-12 bg-accent"></span>
            <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
              Management Team
            </span>
          </div>
          <h2 className="text-[26px] sm:text-3xl md:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            Leaders who keep projects on track
          </h2>
          <p className="mt-4 text-sm sm:text-base text-gray-400 max-w-2xl leading-relaxed font-light">
            Clear direction, transparent execution, and client-first decision making.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
          {managementTeam.map((member, index) => (
            <motion.div
              key={member.name}
              initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{
                duration: noReveal ? 0 : 0.6,
                delay: noReveal ? 0 : index * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98]
              }}
              className="h-full"
            >
              <SpotlightCard
                className={`group relative flex flex-col h-full p-6 sm:p-8 rounded-2xl sm:rounded-3xl border overflow-hidden ${
                  member.isFounder ? 'border-accent/40' : 'border-white/10'
                } ${
                  isHigh
                    ? 'liquid-glass-card-dark premium-card-hover-shine'
                    : tier === 'mid'
                    ? 'mid-glass-card-dark'
                    : tier === 'very-low'
                    ? 'bg-black'
                    : 'bg-black/50'
                } ${
                  isStatic
                    ? ''
                    : 'transition-all duration-500 hover:border-accent/60 hover:shadow-2xl hover:shadow-accent/10 hover:-translate-y-1.5'
                }`}
              >
                {/* Corner badge on desktop only - it collides with the name on mobile */}
                {member.isFounder && (
                  <span className="hidden sm:inline-flex absolute top-6 right-6 items-center gap-1.5 rounded-full bg-accent/15 border border-accent/40 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-accent">
                    <Medal size={14} aria-hidden />
                    Founder
                  </span>
                )}

                <div className="relative z-10 flex items-start gap-5 h-full">
                  {/* Engineer's stamp initials */}
                  <span className="flex items-center justify-center w-14 h-14 rounded-md border border-accent/50 p-[3px] shrink-0" aria-hidden>
                    <span className="flex items-center justify-center w-full h-full rounded-[4px] border border-accent/30 bg-accent/10 font-display font-bold text-accent text-base tracking-widest">
                      {getInitials(member.name)}
                    </span>
                  </span>

                  <div className="flex-1 flex flex-col pt-1 min-w-0">
                    <h3 className={`text-lg sm:text-xl font-bold mb-2 text-white ${isStatic ? '' : 'group-hover:text-accent transition-colors duration-300'}`}>
                      {member.name}
                    </h3>

                    {member.qualifications && (
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-2.5 py-1 text-xs font-semibold text-gray-300">
                          <BadgeCheck className="w-3.5 h-3.5 text-accent/70" aria-hidden />
                          {member.qualifications}
                        </span>
                        {/* Compact inline founder chip - mobile only */}
                        {member.isFounder && (
                          <span className="sm:hidden inline-flex items-center gap-1 rounded-full bg-accent/15 border border-accent/40 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.15em] text-accent">
                            <Medal size={11} aria-hidden />
                            Founder
                          </span>
                        )}
                      </div>
                    )}

                    <p className="text-sm sm:text-base font-semibold mb-3 text-accent">
                      {member.designation}
                    </p>

                    <p className="text-gray-400 leading-relaxed font-light text-xs sm:text-sm">
                      {member.description}
                    </p>
                  </div>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
