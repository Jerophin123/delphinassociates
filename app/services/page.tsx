import { Metadata } from "next";
import ServicesList from "@/components/services/ServicesList";

export const metadata: Metadata = {
  title: "Our Services | Delphin Associates",
  description:
    "Comprehensive construction and consultancy services including residential, industrial, commercial, institutional, and church projects.",
};

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Our Services
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive construction and consultancy services tailored to meet
            your project requirements
          </p>
        </div>
        <ServicesList />
      </div>
    </div>
  );
}
