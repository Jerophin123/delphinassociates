import { Metadata } from "next";
import CompanyHistory from "@/components/about/CompanyHistory";
import Objectives from "@/components/about/Objectives";
import ManagementTeam from "@/components/about/ManagementTeam";
import TechnicalTeam from "@/components/about/TechnicalTeam";
import OrganizationStrengths from "@/components/about/OrganizationStrengths";
import AboutHero from "@/components/about/AboutHero";

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
    <div className="pt-20 bg-[#fdfbf4]/95 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pt-6 sm:pb-10 md:pt-4 md:pb-12">
        <AboutHero />
        <div className="mt-8 sm:mt-16 md:mt-24">
          <CompanyHistory />
        </div>
        <div className="mt-8 sm:mt-16 md:mt-24">
          <Objectives />
        </div>
        <div className="mt-8 sm:mt-16 md:mt-24">
          <ManagementTeam />
        </div>
        <div className="mt-8 sm:mt-16 md:mt-24">
          <TechnicalTeam />
        </div>
        <div className="mt-8 sm:mt-16 md:mt-24">
          <OrganizationStrengths />
        </div>
      </div>
    </div>
  );
}
