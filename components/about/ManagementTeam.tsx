"use client";

import { motion } from "framer-motion";
import { User, Award } from "lucide-react";

const managementTeam = [
  {
    name: "Mr. Delphin P. Stanley",
    designation: "Founder & Managing Director",
    qualifications: "DCE, B.Tech",
    description:
      "Established Delphin Associates in 1999 with a vision to provide quality construction services. Leads the organization with over 25 years of experience in civil construction.",
  },
  {
    name: "Mr. B.S. Sundar Singh",
    designation: "Management Team Leader",
    description:
      "Ensures transparency in financial systems and timely project completion. Manages operations with a focus on client satisfaction and organizational efficiency.",
  },
];

export default function ManagementTeam() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold mb-8 text-primary font-display">
        Management Team
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        {managementTeam.map((member, index) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-1 text-primary">
                  {member.name}
                </h3>
                {member.qualifications && (
                  <div className="flex items-center space-x-1 text-accent mb-2">
                    <Award size={16} />
                    <span className="text-sm font-semibold">
                      {member.qualifications}
                    </span>
                  </div>
                )}
                <p className="text-accent font-semibold mb-2">
                  {member.designation}
                </p>
                <p className="text-gray-700">{member.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
