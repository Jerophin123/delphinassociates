import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import projectsData from "@/data/projects.json";
import projectDetails from "@/data/projectDetails";
import ProjectDetailContent from "@/components/projects/ProjectDetailContent";

type Project = {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  year?: string;
  image?: string;
};

const projects = projectsData as Project[];

type ParamsInput = { id: string } | Promise<{ id: string }>;

type ProjectPageParams = {
  params: ParamsInput;
};

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id.toString(),
  }));
}

export async function generateMetadata({
  params,
}: ProjectPageParams): Promise<Metadata> {
  const resolvedParams = await Promise.resolve(params);
  const projectId = Number(resolvedParams.id);
  const project = projects.find((item) => item.id === projectId);
  const detail = projectDetails[projectId];

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: `${project.title} | Projects | Delphin Associates`,
    description: detail?.overview
      ? `${project.title} – ${detail.overview}`
      : `${project.title} – ${project.category} project located in ${project.location}. ${project.description}`,
    openGraph: {
      title: `${project.title} | Projects | Delphin Associates`,
      description: detail?.overview ?? project.description,
      url: `/projects/${project.id}`,
      images: project.image
        ? [
            {
              url: project.image,
              width: 1200,
              height: 630,
              alt: `${project.title} project image`,
            },
          ]
        : undefined,
    },
    alternates: {
      canonical: `/projects/${project.id}`,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: ProjectPageParams) {
  const resolvedParams = await Promise.resolve(params);
  const projectId = Number(resolvedParams.id);
  const project = projects.find((item) => item.id === projectId);
  const detail = projectDetails[projectId];

  if (!project) {
    notFound();
  }

  return (
    <div className="pt-20">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-full bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition hover:bg-gray-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to projects
        </Link>

        <ProjectDetailContent project={project} detail={detail} />
      </div>
    </div>
  );
}

