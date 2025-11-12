import { Metadata } from "next";
import CompanyHistory from "@/components/about/CompanyHistory";
import Objectives from "@/components/about/Objectives";
import ManagementTeam from "@/components/about/ManagementTeam";
import TechnicalTeam from "@/components/about/TechnicalTeam";
import OrganizationStrengths from "@/components/about/OrganizationStrengths";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Delphin Associates - established in 1999, providing building consultancy, construction, and project execution services across Tamil Nadu. Over 25 years of experience in civil construction, residential, industrial, commercial, institutional, and church projects in Chennai.",
  keywords: [
    "about Delphin Associates",
    "construction company history",
    "building consultancy Chennai",
    "construction company established 1999",
    "civil construction Tamil Nadu",
    "experienced construction company",
    "Chennai construction experts",
  ],
  openGraph: {
    title: "About Us | Delphin Associates",
    description:
      "Learn about Delphin Associates - established in 1999, providing building consultancy, construction, and project execution services across Tamil Nadu. Over 25 years of experience in civil construction.",
    url: "/about",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Delphin Associates",
      },
    ],
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12 font-display">
          Delphin Associates
        </h1>
        <CompanyHistory />
        <Objectives />
        <ManagementTeam />
        <TechnicalTeam />
        <OrganizationStrengths />
      </div>
    </div>
  );
}
