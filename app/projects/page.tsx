import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, MapPin, Sparkles } from "lucide-react";
import ProjectGallery from "@/components/projects/ProjectGallery";
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
      <header className="relative overflow-hidden border-b border-accent/10">
        <div className="pointer-events-none absolute -top-24 -left-10 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-28 -right-10 w-[22rem] h-[22rem] rounded-full bg-accent/8 blur-3xl" />
        <div className="pointer-events-none absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.20)_0%,transparent_60%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,1)_100%)]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14 md:py-16">
          <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/25 bg-accent/10 text-accent font-semibold text-xs sm:text-sm">
                <Sparkles className="w-4 h-4" />
                Our Portfolio
              </div>

              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-[0.01em] bg-gradient-to-r from-accent via-accent-light to-accent-dark bg-clip-text text-transparent">
                Our Projects
              </h1>

              <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-2xl leading-relaxed">
                Showcasing our excellence in construction across multiple sectors—built with quality, transparency, and on-time execution.
              </p>

              <div className="mt-8 grid sm:grid-cols-3 gap-4">
                <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <Calendar className="w-4 h-4" />
                    <span className="text-2xl">100+</span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-gray-600">Projects completed</div>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-2xl">25</span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-gray-600">Project sectors</div>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-accent font-semibold">
                    <MapPin className="w-4 h-4" />
                    <span className="text-2xl">TN</span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-gray-600">Chennai & Tamil Nadu</div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-accent/15 bg-white/70 backdrop-blur-sm shadow-sm p-6 sm:p-7">
              <div className="text-xs uppercase tracking-wide text-gray-500 font-semibold">
                Start your next project
              </div>
              <div className="mt-2 text-2xl sm:text-3xl font-bold font-display">
                Let us plan it right
              </div>
              <p className="mt-3 text-gray-600 leading-relaxed">
                Tell us your scope and timeline. We will respond with a clear plan for construction execution and consultancy.
              </p>

              <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                <a
                  href="tel:+919841243345"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold shadow-2xl shadow-accent/25 hover:shadow-accent/40 hover:bg-accent-light transition-all duration-300"
                >
                  <span>Call Us</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary/5 border border-accent/60 text-primary-dark font-bold hover:bg-accent/15 hover:text-accent transition-colors"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </div>
              <div className="mt-5 text-xs sm:text-sm text-gray-500">
                Typically responds within 24 hours.
              </div>
            </div>
          </div>
        </div>
      </header>

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
