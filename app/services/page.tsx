import { Metadata } from "next";
import ServicesList from "@/components/services/ServicesList";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesCTA from "@/components/services/ServicesCTA";
import Link from "next/link";

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
    <div className="pt-20 bg-white text-primary-dark pb-16 sm:pb-20 md:pb-24">
      <ServicesHero />

      {/* Services List Section */}
      <section className="relative bg-white pt-8 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
        <div className="absolute top-[-12rem] left-[-10rem] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-14rem] right-[-10rem] w-[500px] h-[500px] bg-accent/3 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesList />
        </div>
      </section>

      {/* Lets Build Together Section */}
      <ServicesCTA />
    </div>
  );
}
