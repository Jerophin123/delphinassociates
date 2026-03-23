import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProjectGallery from "@/components/projects/ProjectGallery";
import ProjectsHero from "@/components/projects/ProjectsHero";
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
    <div className="pt-20 bg-white text-primary-dark min-h-screen">
      <ProjectsHero />

      <section className="py-12 sm:py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectGallery />
        </div>
      </section>

      <section className="border-t border-accent/10 bg-gradient-to-br from-white via-gray-50 to-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-accent/15 bg-white/70 backdrop-blur-sm shadow-sm overflow-hidden">
            <div className="relative p-6 sm:p-8 md:p-10">
              <div className="pointer-events-none absolute -top-20 -right-24 w-80 h-80 rounded-full bg-accent/15 blur-3xl" />
              <div className="relative grid lg:grid-cols-[1fr_auto] gap-8 items-center">
                <div>
                  <div className="inline-flex items-center px-4 py-2 rounded-full border border-accent/25 bg-accent/10 text-accent font-semibold text-xs sm:text-sm">
                    Ready to build something exceptional
                  </div>
                  <h2 className="mt-4 text-2xl sm:text-3xl md:text-4xl font-bold font-display">
                    Request a Free Consultation
                  </h2>
                  <p className="mt-3 text-gray-600 max-w-2xl leading-relaxed">
                    From residential flats to industrial and institutional structures, we help you with transparent planning, quality execution, and reliable support.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <a
                    href="tel:+919841243345"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-accent text-black font-bold hover:bg-accent-light transition-colors shadow-2xl shadow-accent/25 hover:shadow-accent/40"
                  >
                    <span>Call Now</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </a>
                  <Link
                    href="/contact"
                    className="group inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-white border border-accent/60 text-accent font-bold hover:bg-accent/10 transition-colors"
                  >
                    <span>Get a Quote</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
