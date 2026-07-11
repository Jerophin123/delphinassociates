import { Metadata } from "next";
import ArchPlans from "@/components/ui/ArchPlans";
import SheetWatermark from "@/components/ui/SheetWatermark";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectsHero from "@/components/projects/ProjectsHero";
import ProjectsCTA from "@/components/projects/ProjectsCTA";
import UpcomingProjects from "@/components/UpcomingProjects";
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
    <div className="pt-20 bg-[#fdfbf4] text-primary-dark relative z-10">
      <ProjectsHero />

      {/* Complete register sheet */}
      <section data-header-theme="light" className="relative bg-[#fdfbf4] py-14 sm:py-20 md:py-24 overflow-hidden border-b border-black/5">
        {/* Sheet-index watermark */}
      <ArchPlans tone="light" variant="floorplan" />
      <SheetWatermark text="01" tone="dark" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-10 sm:mb-12">
            <span className="font-display font-bold text-[11px] sm:text-xs text-accent-dark/70 tracking-[0.25em] uppercase">Sheet 01&thinsp;/&thinsp;02</span>
            <span className="h-[2px] w-12 bg-accent"></span>
            <span className="text-accent-dark text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
              Complete Register
            </span>
          </div>
          <ProjectGallery />
        </div>
      </section>

      {/* Upcoming projects sheet */}
      <UpcomingProjects tone="dark" sheetNo="02" sheetOf="02" watermark="02" />

      {/* Lets Build Together CTA Section aligned with Services Page */}
      <ProjectsCTA />
    </div>
  );
}
