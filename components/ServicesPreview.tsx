"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Building2, Factory, School, Church, Wrench, CheckCircle, ArrowRight } from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Residential Construction",
    description: "Premium residential flats and buildings with modern amenities",
    color: "from-accent to-accent-light",
  },
  {
    icon: Factory,
    title: "Industrial & Commercial",
    description: "Factory buildings and commercial spaces built to last",
    color: "from-primary to-primary-light",
  },
  {
    icon: School,
    title: "Institutional Buildings",
    description: "Educational and institutional structures",
    color: "from-accent-light to-accent",
  },
  {
    icon: Church,
    title: "Church Buildings",
    description: "Sacred spaces and community centers",
    color: "from-primary-light to-primary",
  },
  {
    icon: Wrench,
    title: "Consultancy Services",
    description: "Expert building consultancy and planning",
    color: "from-accent to-accent-dark",
  },
  {
    icon: CheckCircle,
    title: "Turnkey Projects",
    description: "End-to-end project execution",
    color: "from-primary-dark to-primary",
  },
];

export default function ServicesPreview() {
  return (
    <section className="relative z-10 py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold mb-4">
            Our Expertise
          </span>
          <h2 className="text-5xl md:text-6xl font-bold mb-6 font-display text-primary">
            Our Services
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Comprehensive construction and consultancy solutions tailored to your project needs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-accent/30"
              >
                {/* Icon with gradient background */}
                <div className={`mb-6 w-16 h-16 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold mb-3 text-primary group-hover:text-accent transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">{service.description}</p>

                {/* Hover gradient overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`}></div>
                
                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-bl-full transition-opacity duration-500`}></div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/services"
            className="group inline-flex items-center space-x-3 px-10 py-5 bg-primary text-white rounded-lg font-bold text-lg hover:bg-primary-dark transition-all duration-300 shadow-xl hover:shadow-2xl"
          >
            <span>Explore All Services</span>
            <ArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
