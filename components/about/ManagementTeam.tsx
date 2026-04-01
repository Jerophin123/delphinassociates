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
    <section id="management-team" className="mb-12 sm:mb-20 md:mb-24 scroll-mt-28">
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
            Management Team
          </span>
        </div>
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold font-display text-primary-dark tracking-tight">
          Leaders who keep projects on track
        </h2>
        <p className="mt-4 text-sm sm:text-base text-gray-500 max-w-2xl leading-relaxed font-light">
          Clear direction, transparent execution, and client-first decision making.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-8">
        {managementTeam.map((member, index) => (
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
            className={`group relative rounded-[2rem] overflow-hidden shadow-[0_8px_24px_-4px_rgba(0,0,0,0.12),0_4px_12px_-2px_rgba(0,0,0,0.08)] hover:shadow-[0_32px_64px_-12px_rgba(0,0,0,0.2),0_16px_32px_-8px_rgba(0,0,0,0.12)] transition-all duration-500 will-change-transform hover:-translate-y-2 border p-6 sm:p-8 flex flex-col h-full ${
              member.isFounder 
                ? "bg-gradient-to-br from-yellow-50/50 to-white border-yellow-300/60" 
                : "bg-white border-gray-200 hover:border-gray-300 liquid-glass-card"
            }`}
          >
            {member.isFounder && (
              <span className="absolute top-6 right-6 hidden md:inline-flex items-center gap-1.5 rounded-full bg-yellow-100 border border-yellow-200/50 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-yellow-800">
                <Medal size={14} className="text-yellow-600" />
                Founder
              </span>
            )}
            
            {/* Subtle Gradient background on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${member.isFounder ? 'bg-gradient-to-br from-yellow-100/20 to-transparent' : 'bg-gradient-to-br from-accent/[0.02] to-transparent'}`} />

            <div className="relative z-10 flex items-start space-x-5 h-full">
              <div 
                className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center flex-shrink-0 border border-black/5 transition-colors duration-500 shadow-sm ${member.isFounder ? 'bg-yellow-50 group-hover:bg-yellow-100/50' : 'bg-gray-50 group-hover:bg-accent/10'}`}
              >
                <span className={`relative z-10 text-base sm:text-xl font-bold transition-colors duration-500 ${member.isFounder ? 'text-yellow-700 group-hover:text-yellow-800' : 'text-gray-700 group-hover:text-accent'}`}>
                  {getInitials(member.name)}
                </span>
              </div>
              
              <div className="flex-1 flex flex-col pt-1">
                <h3 className="text-lg sm:text-xl font-bold mb-1.5 text-gray-900 group-hover:text-accent transition-colors duration-300">
                  {member.name}
                </h3>
                
                {member.qualifications && (
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-semibold text-gray-600">
                      <BadgeCheck className="w-3.5 h-3.5 text-gray-400" />
                      {member.qualifications}
                    </span>

                    {member.isFounder && (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-yellow-100 border border-yellow-200/50 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-yellow-800 md:hidden">
                        <Medal className="w-3.5 h-3.5 text-yellow-600" />
                        Founder
                      </span>
                    )}
                  </div>
                )}
                
                <p className={`text-sm sm:text-base font-semibold mb-3 ${member.isFounder ? 'text-yellow-700' : 'text-accent'}`}>
                  {member.designation}
                </p>
                
                <p className="text-gray-500 leading-relaxed font-light text-xs sm:text-sm md:text-base mt-2 sm:mt-0">
                  {member.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
