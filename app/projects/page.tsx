import { Metadata } from "next";
import ProjectGallery from "@/components/projects/ProjectGallery";

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
  return (
    <div className="pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
            Our Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Showcasing our excellence in construction across various sectors
          </p>
        </div>
        <ProjectGallery />
      </div>
    </div>
  );
}
