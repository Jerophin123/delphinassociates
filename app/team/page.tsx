import { Metadata } from "next";
import ManagementTeam from "@/components/about/ManagementTeam";
import TechnicalTeam from "@/components/about/TechnicalTeam";
import { HardHat, ShieldCheck, TrendingUp, Users } from "lucide-react";

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
  const stats = [
    { icon: Users, value: "25+", label: "Years of experience" },
    { icon: TrendingUp, value: "100+", label: "Projects delivered" },
    { icon: ShieldCheck, value: "100%", label: "Quality assured" },
  ];

  return (
    <div className="pt-20 bg-white text-primary-dark min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
        {/* Team Page Hero */}
        <div className="relative overflow-hidden rounded-3xl border border-accent/15 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.18)_0%,transparent_55%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,1)_100%)] px-6 py-10 sm:px-10 sm:py-12 mb-10 sm:mb-12 md:mb-14">
          <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent-light/10 blur-3xl" />

          <div className="relative grid lg:grid-cols-[1.2fr_0.8fr] gap-10 items-start">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-accent/25 bg-accent/10 text-accent font-semibold text-xs sm:text-sm">
                <HardHat className="w-4 h-4" />
                Meet the Experts
              </div>
              <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-[0.01em] bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
                Our Team
              </h1>
              <p className="mt-4 mx-auto lg:mx-0 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed">
                Delphin Associates is built on experienced leadership and technically strong execution.
                Our management and engineering teams work together to deliver quality, transparency, and timely completion.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <a
                  href="#management-team"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm sm:text-base hover:bg-accent-light transition-colors shadow-2xl shadow-accent/25 hover:shadow-accent/45"
                >
                  Management Team
                  <span className="ml-1 text-lg leading-none">&rarr;</span>
                </a>
                <a
                  href="#technical-team"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-primary/5 border border-accent/60 text-primary-dark font-bold text-sm sm:text-base hover:bg-accent/15 hover:text-accent transition-colors"
                >
                  Technical Team
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 sm:gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5"
                  >
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                      <div className="text-2xl font-bold text-primary-dark">{stat.value}</div>
                    </div>
                    <div className="mt-1 text-xs sm:text-sm font-semibold text-gray-600">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <ManagementTeam />
        <TechnicalTeam />
      </div>
    </div>
  );
}
