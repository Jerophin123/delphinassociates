import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsCTA from "@/components/projects/ProjectsCTA";
import projectsData from "@/data/projects.json";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore our portfolio of completed projects by Delphin Associates. View our residential flats, industrial buildings, church buildings, and institutional structures across Chennai and Tamil Nadu. Showcasing excellence in construction since 1999.",
  keywords: [
    "construction projects Chennai",
    "completed construction projects",
    "residential construction projects",
    "industrial building projects",
    "church construction projects",
    "institutional building projects",
    "construction portfolio Chennai",
    "Tamil Nadu construction projects",
    "Delphin Associates projects",
    "construction gallery",
  ],
  openGraph: {
    title: "Our Projects | Delphin Associates",
    description:
      "Explore our portfolio of completed projects including residential flats, industrial buildings, church buildings, and institutional structures across Tamil Nadu.",
    url: "/projects",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Delphin Associates Projects Portfolio",
      },
    ],
  },
  alternates: {
    canonical: "/projects",
  },
};

export default function ProjectsPage() {
  const projects = projectsData as Array<{
    id: number;
    title: string;
    category: string;
    location: string;
    year?: string;
  }>;

  const totalProjects = projects.length;
  const uniqueCategories = Array.from(new Set(projects.map((p) => p.category))).length;

  return (
    <div className="pt-20 bg-white/95 text-primary-dark pb-16 sm:pb-20 md:pb-24 relative z-10">
      <ProjectsHero />

      <section className="relative mt-8 sm:mt-12 md:mt-16 bg-white/95 pt-8 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
        <div className="absolute top-[-12rem] left-[-10rem] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-14rem] right-[-10rem] w-[500px] h-[500px] bg-accent/3 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectGallery />
        </div>
      </section>

      {/* Lets Build Together CTA Section aligned with Services Page */}
      <ProjectsCTA />
    </div>
  );
}
