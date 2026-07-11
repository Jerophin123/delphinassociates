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
    <div className="pt-20 bg-[#fdfbf4] text-primary-dark min-h-[100dvh] relative z-10">
      <TeamHero />
      <ManagementTeam />
      <TechnicalTeam />
    </div>
  );
}

