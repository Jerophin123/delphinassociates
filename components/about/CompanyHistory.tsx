"use client";

import { motion } from "framer-motion";

export default function CompanyHistory() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mb-16"
    >
      <h2 className="text-3xl font-bold mb-6 text-primary font-display">
        Our History
      </h2>
      <div className="prose prose-lg max-w-none">
        <p className="text-gray-700 mb-4">
          Delphin Associates was established in <strong>1999</strong> by{" "}
          <strong>Er. Delphin P. Stanley (DCE, B.Tech)</strong>, a visionary
          leader in the construction industry. Starting with a team of young,
          dedicated engineers across Tamil Nadu, the organization has grown to
          become a trusted name in civil construction and building consultancy.
        </p>
        <p className="text-gray-700 mb-4">
          Over the past 25+ years, we have successfully completed numerous
          projects spanning residential, industrial, commercial, institutional,
          and church sectors. Our commitment to transparency, timely completion,
          and post-completion support has earned us the trust and respect of
          clients across Tamil Nadu.
        </p>
        <p className="text-gray-700">
          Today, Delphin Associates continues to lead with innovation, quality,
          and integrity, maintaining our founding principles while embracing
          modern construction technologies and sustainable building practices.
        </p>
      </div>
    </motion.section>
  );
}
