"use client";

import { motion } from "framer-motion";
import { User, Award, Briefcase } from "lucide-react";

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

export default function TechnicalTeam() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-8 sm:mb-12 md:mb-16"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-primary font-display">
        Technical Team
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
        {technicalTeam.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-4 sm:p-5 md:p-6 shadow-[0_6px_12px_-3px_rgba(0,0,0,0.1),0_3px_6px_-2px_rgba(0,0,0,0.06),0_1px_3px_-1px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_40px_-8px_rgba(0,0,0,0.2),0_10px_20px_-5px_rgba(0,0,0,0.12),0_4px_8px_-2px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-2 hover:scale-[1.01]"
          >
            <div className="flex items-start space-x-3 sm:space-x-4">
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center flex-shrink-0"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4,
                  ease: "easeOut",
                  delay: index * 0.1 
                }}
                whileHover={{ 
                  scale: 1.1,
                  transition: { duration: 0.2 }
                }}
              >
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </motion.div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-bold mb-1.5 sm:mb-2 text-primary">
                  {member.name}
                </h3>
                {member.qualifications && (
                  <div className="flex items-center space-x-1 text-accent mb-1">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.1 + 0.2
                      }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Award className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </motion.div>
                    <span className="text-xs sm:text-sm font-semibold">
                      {member.qualifications}
                    </span>
                  </div>
                )}
                {member.experience && (
                  <div className="flex items-center space-x-1 text-gray-600 mb-1.5 sm:mb-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.1 + 0.25
                      }}
                      whileHover={{ scale: 1.15 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Briefcase className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </motion.div>
                    <span className="text-xs sm:text-sm">{member.experience}</span>
                  </div>
                )}
                {member.designation && (
                  <p className="text-xs sm:text-sm text-accent font-semibold mb-1.5 sm:mb-2">
                    {member.designation}
                  </p>
                )}
                <p className="text-xs sm:text-sm text-gray-700">{member.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
