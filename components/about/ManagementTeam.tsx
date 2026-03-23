"use client";

import { motion } from "framer-motion";
import { BadgeCheck, Medal } from "lucide-react";

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
  return (
    <motion.section
      id="management-team"
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
          <Medal className="w-4 h-4" />
          Management Team
        </div>
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold font-display tracking-[0.01em] bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
          Leaders who keep projects on track
        </h2>
        <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl">
          Clear direction, transparent execution, and client-first decision making.
        </p>
      </div>
      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {managementTeam.map((member, index) => (
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
            className={`group relative rounded-3xl p-5 sm:p-6 md:p-7 border border-accent/15 hover:border-accent/35 shadow-[0_12px_28px_-18px_rgba(0,0,0,0.25)] hover:shadow-[0_48px_90px_-30px_rgba(0,0,0,0.35)] transition-[box-shadow,border-color] duration-300 ease-out overflow-hidden ${
              member.isFounder 
                ? "bg-gradient-to-br from-yellow-50/50 to-white" 
                : "bg-white"
            }`}
            style={{
              willChange: "transform",
            }}
            whileHover={{
              y: -10,
              scale: 1.02,
              transition: {
                type: "spring",
                stiffness: 420,
                damping: 24,
              },
            }}
          >
            {member.isFounder && (
              <span className="absolute top-4 right-4 hidden md:inline-flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-950 shadow">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                  <Medal size={14} />
                        </motion.div>
                Founder
              </span>
            )}
            {/* 3D depth layers (static, no mouse tracking) */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-accent/10 via-transparent to-accent-light/8" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/10 via-black/5 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />
            <div className="pointer-events-none absolute left-0 top-0 h-24 w-24 bg-[radial-gradient(circle_at_top_left,rgba(212,175,55,0.35)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="flex items-start space-x-3 sm:space-x-4">
              <motion.div 
                className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-accent/20 to-accent-light/10 shadow-[0_10px_30px_-16px_rgba(212,175,55,0.35)]"
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
                style={{ willChange: "transform" }}
              >
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(135deg,rgba(255,255,255,0.65)_0%,transparent_55%)] opacity-70" />
                <span className="relative z-10 text-xs sm:text-sm md:text-base font-bold text-accent drop-shadow-[0_0_14px_rgba(212,175,55,0.18)]">
                  {getInitials(member.name)}
                </span>
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold mb-1 text-primary tracking-[0.01em]">
                  {member.name}
                </h3>
                {member.qualifications && (
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex items-center gap-1 rounded-full border border-accent/15 bg-accent/10 px-3 py-1 text-[11px] sm:text-xs font-semibold text-accent">
                      <BadgeCheck className="w-3 h-3" />
                      {member.qualifications}
                    </span>

                    {member.isFounder && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-2.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wide text-yellow-950 shadow md:hidden">
                        <Medal className="w-3 h-3" />
                        Founder
                      </span>
                    )}
                  </div>
                )}
                <p className="text-sm sm:text-base text-accent font-semibold mb-2">
                  {member.designation}
                </p>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
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
