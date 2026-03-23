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
    <div className="pt-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* About Page Hero (visual only) */}
        <div className="relative overflow-hidden rounded-3xl border border-accent/15 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.18)_0%,transparent_55%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,1)_100%)] px-6 py-10 sm:px-10 sm:py-12 mb-10 sm:mb-12 md:mb-14">
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent-light/10 blur-3xl" />

          <div className="relative text-center">
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-accent/25 bg-accent/10 text-accent font-semibold text-sm sm:text-base">
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-accent-light" />
              Established Since 1999
            </div>

            <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-[0.01em] bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
              Delphin Associates
            </h1>

            <p className="mt-4 mx-auto max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
              You Dream We Build. Building trust through quality since 1999.
              Leading civil construction company in Chennai, Tamil Nadu.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5">
                <div className="text-2xl font-bold text-primary-dark">25+</div>
                <div className="mt-1 text-sm font-semibold text-gray-600">Years Experience</div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5">
                <div className="text-2xl font-bold text-primary-dark">100%</div>
                <div className="mt-1 text-sm font-semibold text-gray-600">Quality Assurance</div>
              </div>
              <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5">
                <div className="text-2xl font-bold text-primary-dark">End-to-End</div>
                <div className="mt-1 text-sm font-semibold text-gray-600">Execution & Consultancy</div>
              </div>
            </div>
          </div>
        </div>
        <CompanyHistory />
        <Objectives />
        <ManagementTeam />
        <TechnicalTeam />
        <OrganizationStrengths />
      </div>
    </div>
  );
}
