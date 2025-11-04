"use client";

import { motion } from "framer-motion";
import {
  Building2,
  Factory,
  School,
  Church,
  Wrench,
  CheckCircle,
} from "lucide-react";

const services = [
  {
    icon: Building2,
    title: "Residential Construction",
    description:
      "We specialize in designing and constructing premium residential buildings, including deluxe and super deluxe flats. Our residential projects emphasize both economy and quality, ensuring durable structures with modern amenities while adhering to client budgets.",
    features: [
      "Deluxe and Super Deluxe Flats",
      "Modern Amenities & Finishes",
      "Budget-Conscious Design",
      "Quality Construction Standards",
    ],
  },
  {
    icon: Factory,
    title: "Industrial & Commercial Projects",
    description:
      "Comprehensive construction services for industrial facilities, factory buildings, and commercial spaces. We design and execute projects that meet industry standards, ensuring functionality, efficiency, and compliance with regulatory requirements.",
    features: [
      "Factory Buildings",
      "Industrial Complexes",
      "Commercial Spaces",
      "Regulatory Compliance",
    ],
  },
  {
    icon: School,
    title: "Institutional & Church Buildings",
    description:
      "Specialized expertise in constructing educational institutions, colleges, and church buildings. Our projects combine architectural excellence with functional design, creating spaces that serve communities effectively.",
    features: [
      "Educational Institutions",
      "Church Buildings",
      "Community Centers",
      "Sacred Architecture",
    ],
  },
  {
    icon: Wrench,
    title: "Consultancy & Turnkey Projects",
    description:
      "Expert building consultancy services covering planning, design, and project execution. We offer free consultancy support to help clients make informed decisions and provide end-to-end turnkey solutions for complete project management.",
    features: [
      "Building Consultancy",
      "Project Planning & Design",
      "Turnkey Project Execution",
      "Free Consultancy Support",
    ],
  },
];

export default function ServicesList() {
  return (
    <div className="space-y-12">
      {services.map((service, index) => (
        <motion.div
          key={service.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="bg-white rounded-lg shadow-md p-8 hover:shadow-xl transition-shadow"
        >
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/20 to-primary/20 rounded-lg flex items-center justify-center">
                <service.icon className="w-8 h-8 text-accent" />
              </div>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold mb-3 text-primary font-display">
                {service.title}
              </h2>
              <p className="text-gray-700 mb-4">{service.description}</p>
              <ul className="grid md:grid-cols-2 gap-2">
                {service.features.map((feature) => (
                  <li key={feature} className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
