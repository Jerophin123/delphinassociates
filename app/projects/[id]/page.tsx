import { Metadata } from "next";
import { notFound } from "next/navigation";
import projectsData from "@/data/projects.json";
import projectDetails from "@/data/projectDetails";
import ProjectDetailContent from "@/components/projects/ProjectDetailContent";
import SheetWatermark from "@/components/ui/SheetWatermark";
import ArrowLink from "@/components/ui/ArrowLink";
import ArchPlans from "@/components/ui/ArchPlans";

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

  const code = `P-${String(project.id).padStart(2, "0")}`;

  return (
    <div className="pt-20 bg-[#fdfbf4] text-primary-dark min-h-[100dvh] relative z-10">
      <section data-header-theme="light" className="relative overflow-hidden">
        {/* Drafting-paper ruling */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(18,18,18,0.045) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(18,18,18,0.045) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
        {/* Drafting margin rule */}
        <span aria-hidden className="absolute left-6 sm:left-12 top-0 bottom-0 w-px bg-accent/25 pointer-events-none" />

        {/* Background cross-section drawing */}
        <ArchPlans tone="light" variant="section" />

        {/* Drawing-code watermark */}
        <SheetWatermark text={code} tone="dark" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 sm:py-14">
          {/* Back to register */}
          <ArrowLink href="/projects" tone="onLight" direction="back">
            Back to Register
          </ArrowLink>

          <ProjectDetailContent project={project} detail={detail} />
        </div>
      </section>
    </div>
  );
}

