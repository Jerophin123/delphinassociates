import { Metadata } from "next";
import Hero from "@/components/Hero";
import QuickIntro from "@/components/QuickIntro";
import ProjectHighlights from "@/components/ProjectHighlights";
import ServicesPreview from "@/components/ServicesPreview";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "Delphin Associates",
  description:
    "Delphin Associates - You Dream We Build. Leading civil construction company in Chennai, Tamil Nadu since 1999. Specializing in residential, industrial, commercial, institutional, and church construction projects. Expert building consultancy and construction services.",
  keywords: [
    "construction company Chennai",
    "civil construction Tamil Nadu",
    "building contractors Chennai",
    "residential construction",
    "industrial construction",
    "commercial construction Chennai",
    "church buildings",
    "institutional buildings",
    "construction services",
    "building consultancy",
  ],
  openGraph: {
    title: "Delphin Associates | Civil Construction Company | Chennai, Tamil Nadu",
    description:
      "You Dream We Build. Building Trust Through Quality Since 1999. Leading civil construction company in Chennai, Tamil Nadu, specializing in residential, industrial, commercial, institutional, and church projects.",
    url: "/",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Delphin Associates - Civil Construction Company",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <>
      <Hero />
      <QuickIntro />
      <ProjectHighlights />
      <ServicesPreview />
      <CTASection />
    </>
  );
}
