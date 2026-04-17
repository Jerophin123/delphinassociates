import { Metadata } from "next";
import ManagementTeam from "@/components/about/ManagementTeam";
import TechnicalTeam from "@/components/about/TechnicalTeam";
import TeamHero from "@/components/team/TeamHero";

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
    <div className="pt-20 bg-[#fdfbf4]/95 text-primary-dark min-h-[100dvh] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pt-6 sm:pb-10 md:pt-8 md:pb-12">
        <TeamHero />
        <div className="mt-8 sm:mt-16 md:mt-24">
          <ManagementTeam />
        </div>
        <div className="mt-8 sm:mt-16 md:mt-24">
          <TechnicalTeam />
        </div>
      </div>
    </div>
  );
}

