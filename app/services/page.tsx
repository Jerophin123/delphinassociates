import { Metadata } from "next";
import ServicesList from "@/components/services/ServicesList";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive construction and consultancy services by Delphin Associates. We specialize in residential construction, industrial buildings, commercial projects, institutional structures, and church buildings. Expert building consultancy and project execution services in Chennai, Tamil Nadu.",
  keywords: [
    "construction services Chennai",
    "building consultancy services",
    "residential construction services",
    "industrial construction",
    "commercial construction Chennai",
    "institutional building construction",
    "church construction services",
    "project execution services",
    "construction consultancy Tamil Nadu",
    "civil construction services",
  ],
  openGraph: {
    title: "Our Services | Delphin Associates",
    description:
      "Comprehensive construction and consultancy services including residential, industrial, commercial, institutional, and church projects. Expert services in Chennai, Tamil Nadu.",
    url: "/services",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Delphin Associates Services",
      },
    ],
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <div className="text-center mb-8 sm:mb-10 md:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 font-display">
            Our Services
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Comprehensive construction and consultancy services tailored to meet
            your project requirements
          </p>
        </div>
        <ServicesList />
      </div>
    </div>
  );
}
