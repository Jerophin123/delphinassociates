import { Metadata } from "next";
import ProjectGallery from "@/components/projects/ProjectGallery";

export const metadata: Metadata = {
  title: "Our Projects | Delphin Associates",
  description:
    "Explore our portfolio of completed projects including residential flats, industrial buildings, church buildings, and institutional structures across Tamil Nadu.",
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
