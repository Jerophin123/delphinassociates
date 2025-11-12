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
      className="mb-16"
    >
      <h2 className="text-3xl font-bold mb-8 text-primary font-display">
        Technical Team
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {technicalTeam.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold mb-2 text-primary">
                  {member.name}
                </h3>
                {member.qualifications && (
                  <div className="flex items-center space-x-1 text-accent mb-1">
                    <Award size={14} />
                    <span className="text-sm font-semibold">
                      {member.qualifications}
                    </span>
                  </div>
                )}
                {member.experience && (
                  <div className="flex items-center space-x-1 text-gray-600 mb-2">
                    <Briefcase size={14} />
                    <span className="text-sm">{member.experience}</span>
                  </div>
                )}
                {member.designation && (
                  <p className="text-accent font-semibold mb-2 text-sm">
                    {member.designation}
                  </p>
                )}
                <p className="text-gray-700 text-sm">{member.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
