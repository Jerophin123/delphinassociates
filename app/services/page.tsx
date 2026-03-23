import { Metadata } from "next";
import ServicesList from "@/components/services/ServicesList";
import ServicesHero from "@/components/services/ServicesHero";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Comprehensive construction and consultancy services by Delphin Associates. We specialize in residential construction, industrial buildings, commercial projects, institutional structures, and church buildings. Expert building consultancy and project execution services in Chennai, Tamil Nadu.",
  keywords: [
    "construction services Chennai",
    "building consultancy services",
    "residential construction services",
    "industrial construction",
    "commercial construction Chennai",
    "institutional building construction",
    "church construction services",
    "project execution services",
    "construction consultancy Tamil Nadu",
    "civil construction services",
  ],
  openGraph: {
    title: "Our Services | Delphin Associates",
    description:
      "Comprehensive construction and consultancy services including residential, industrial, commercial, institutional, and church projects. Expert services in Chennai, Tamil Nadu.",
    url: "/services",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Delphin Associates Services",
      },
    ],
  },
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="pt-20 bg-white text-primary-dark">
      <ServicesHero />

      <section className="relative bg-white py-12 sm:py-16 md:py-20 overflow-hidden border-b border-accent/10">
        <div
          className="absolute top-[-12rem] left-[-10rem] w-96 h-96 bg-accent/10 rounded-full blur-3xl pointer-events-none"
        />
        <div
          className="absolute bottom-[-14rem] right-[-10rem] w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none"
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesList />
        </div>
      </section>

      <section className="bg-gradient-to-br from-white via-gray-50 to-white py-12 sm:py-16 md:py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 items-center gap-8 sm:gap-10 md:gap-12">
            <div className="text-center md:text-left">
              <span className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 bg-accent/10 text-accent rounded-full text-xs sm:text-sm font-semibold border border-accent/20">
                Lets Build Together
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-[0.02em]">
                Request a Free Consultation
              </h2>
              <p className="mt-3 text-gray-600 text-base sm:text-lg max-w-xl leading-relaxed mx-auto md:mx-0 px-2 md:px-0">
                Tell us your project scope and timelines. We'll help you with transparent planning, quality execution, and reliable support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center md:justify-end mt-2">
              <a
                className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-accent text-black rounded-lg font-bold text-sm sm:text-base hover:bg-accent-light transition-colors shadow-2xl shadow-accent/25 hover:shadow-accent/45"
                href="tel:+919841243345"
              >
                <span>Call Us Now</span>
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </a>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-primary/5 backdrop-blur-sm text-primary-dark rounded-lg font-bold text-sm sm:text-base hover:bg-accent/15 hover:text-accent transition-[background-color,color,border-color] duration-300 ease-out border border-accent/60"
              >
                <span>Get a Quote</span>
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">
                  &rarr;
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
