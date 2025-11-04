import { Metadata } from "next";
import CompanyHistory from "@/components/about/CompanyHistory";
import Objectives from "@/components/about/Objectives";
import ManagementTeam from "@/components/about/ManagementTeam";
import TechnicalTeam from "@/components/about/TechnicalTeam";
import OrganizationStrengths from "@/components/about/OrganizationStrengths";

export const metadata: Metadata = {
  title: "About Us | Delphin Associates",
  description:
    "Learn about Delphin Associates - established in 1999, providing building consultancy, construction, and project execution services across Tamil Nadu.",
};

export default function AboutPage() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 font-display">
          About Delphin Associates
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
