"use client";

import { motion } from "framer-motion";
import { User, Award, Crown } from "lucide-react";

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

export default function ManagementTeam() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        type: "spring",
        stiffness: 100,
        damping: 20,
        mass: 0.8
      }}
      className="mb-8 sm:mb-12 md:mb-16"
      style={{ willChange: 'opacity, transform' }}
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-primary font-display">
        Management Team
      </h2>
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
            whileHover={{ 
              y: -8,
              scale: 1.01,
              transition: {
                type: "spring",
                stiffness: 400,
                damping: 25
              }
            }}
            className={`relative rounded-lg p-4 sm:p-5 md:p-6 border border-gray-200 hover:border-accent/30 shadow-[0_6px_12px_-3px_rgba(0,0,0,0.1),0_3px_6px_-2px_rgba(0,0,0,0.06),0_1px_3px_-1px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.2),0_10px_20px_-5px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08)] transition-[box-shadow,border-color] duration-300 ease-out ${
              member.isFounder 
                ? "bg-gradient-to-br from-yellow-50/50 to-white" 
                : "bg-white"
            }`}
            style={{ willChange: 'transform' }}
          >
            {member.isFounder && (
              <span className="absolute top-4 right-4 hidden md:inline-flex items-center gap-1 rounded-full bg-yellow-400 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-yellow-950 shadow">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Crown size={14} />
                        </motion.div>
                Founder
              </span>
            )}
            <div className="flex items-start space-x-3 sm:space-x-4">
              <motion.div 
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center flex-shrink-0"
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
                <User className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-primary" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold mb-1 text-primary">
                  {member.name}
                </h3>
                {member.qualifications && (
                  <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-accent mb-2">
                    <span className="inline-flex items-center space-x-1">
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.3,
                          delay: index * 0.1 + 0.2
                        }}
                        whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
                      >
                        <Award className="w-3 h-3 sm:w-4 sm:h-4" />
                      </motion.div>
                      <span className="text-xs sm:text-sm font-semibold">
                        {member.qualifications}
                      </span>
                    </span>
                    {member.isFounder && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-yellow-400 px-2 sm:px-2.5 py-0.5 text-[10px] sm:text-[11px] font-semibold uppercase tracking-wide text-yellow-950 shadow md:hidden">
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </motion.div>
                        Founder
                      </span>
                    )}
                  </div>
                )}
                <p className="text-sm sm:text-base text-accent font-semibold mb-2">
                  {member.designation}
                </p>
                <p className="text-sm sm:text-base text-gray-700">{member.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
