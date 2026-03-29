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
    <div className="pt-20 bg-white text-primary-dark pb-16 sm:pb-20 md:pb-24">
      <ServicesHero />

      {/* Services List Section */}
      <section className="relative bg-white pt-8 pb-16 sm:pb-20 md:pb-24 overflow-hidden">
        <div className="absolute top-[-12rem] left-[-10rem] w-[500px] h-[500px] bg-accent/5 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute bottom-[-14rem] right-[-10rem] w-[500px] h-[500px] bg-accent/3 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ServicesList />
        </div>
      </section>

      {/* Lets Build Together Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-white to-gray-50 border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.05)] p-12 sm:p-16 md:p-20">
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-accent/[0.04] to-transparent rounded-full blur-[60px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>

          <div className="relative z-10 grid lg:grid-cols-2 items-center gap-12 lg:gap-16">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-6">
                <span className="h-[2px] w-8 bg-accent"></span>
                <span className="text-accent text-sm font-bold tracking-[0.2em] uppercase">
                  Let's Build Together
                </span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight text-primary-dark">
                Request a Free Consultation
              </h2>
              <p className="mt-6 text-gray-500 font-light text-lg sm:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0">
                Tell us your project scope and timelines. We'll help you with transparent planning, quality execution, and reliable support.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center lg:justify-end">
              <a
                href="tel:+919841243345"
                className="group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-accent text-black rounded-xl font-bold text-base hover:bg-accent-light transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:shadow-[0_20px_50px_-10px_rgba(212,175,55,0.4)] hover:-translate-y-1"
              >
                <span>Call Us Now</span>
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
                  &rarr;
                </span>
              </a>

              <Link
                href="/contact"
                className="group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white/60 backdrop-blur-md text-primary-dark rounded-xl font-bold text-base hover:bg-white transition-all duration-300 border border-gray-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] hover:-translate-y-1 hover:border-accent/30"
              >
                <span>Get a Quote</span>
                <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1.5">
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
