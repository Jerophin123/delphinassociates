import { Metadata } from "next";
import ManagementTeam from "@/components/about/ManagementTeam";
import TechnicalTeam from "@/components/about/TechnicalTeam";

export const metadata: Metadata = {
  title: "Our Team",
  description:
    "Meet our experienced management and technical team of engineers at Delphin Associates. Our dedicated professionals are committed to delivering quality construction projects in Chennai, Tamil Nadu. Expert engineers and consultants with years of experience.",
  keywords: [
    "construction team Chennai",
    "building engineers",
    "construction consultants",
    "management team",
    "technical team",
    "construction professionals",
    "experienced engineers",
    "Delphin Associates team",
  ],
  openGraph: {
    title: "Our Team | Delphin Associates",
    description:
      "Meet our experienced management and technical team of engineers dedicated to delivering quality construction projects in Chennai, Tamil Nadu.",
    url: "/team",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Delphin Associates Team",
      },
    ],
  },
  alternates: {
    canonical: "/team",
  },
};

export default function TeamPage() {
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Our Team
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experienced professionals committed to excellence
          </p>
        </div>
        <ManagementTeam />
        <TechnicalTeam />
      </div>
    </div>
  );
}
