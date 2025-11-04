"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Award, Users, CheckCircle2, TrendingUp } from "lucide-react";

const stats = [
  { icon: Award, value: "25+", label: "Years of Experience", color: "from-accent to-accent-light" },
  { icon: TrendingUp, value: "100+", label: "Projects Completed", color: "from-primary to-primary-light" },
  { icon: Users, value: "50+", label: "Happy Clients", color: "from-accent-light to-accent" },
  { icon: CheckCircle2, value: "100%", label: "Quality Assured", color: "from-primary-light to-primary" },
];

export default function QuickIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative z-10 py-24 bg-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-6">
              About Us
            </span>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 font-display text-primary leading-tight">
              Excellence in Construction
              <span className="block text-accent mt-2">Since 1999</span>
            </h2>
            <div className="space-y-6 mb-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                Delphin Associates was established in <strong className="text-primary">1999</strong> by{" "}
                <strong className="text-primary">Mr. Delphin P. Stanley (DCE, B.Tech)</strong>, leading a team of 
                young engineers across Tamil Nadu. Our organization provides building consultancy,
                construction, and project execution services for residential,
                industrial, commercial, institutional, and church projects.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                We are known for <strong className="text-accent">transparency</strong>, <strong className="text-accent">timely completion</strong>, and
                <strong className="text-accent"> post-completion support</strong>. Our commitment to quality and customer
                satisfaction has made us a trusted name in the construction industry.
              </p>
            </div>
            <Link
              href="/about"
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <span>Learn More About Us</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-accent/30"
                  >
                    {/* Icon */}
                    <div className={`mb-4 w-14 h-14 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    
                    {/* Value */}
                    <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    
                    {/* Label */}
                    <div className="text-gray-600 font-medium">{stat.label}</div>

                    {/* Hover effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                  </motion.div>
                );
              })}
            </div>

            {/* Decorative element */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"
            ></motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
