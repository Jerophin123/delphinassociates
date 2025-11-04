import Hero from "@/components/Hero";
import QuickIntro from "@/components/QuickIntro";
import ProjectHighlights from "@/components/ProjectHighlights";
import ServicesPreview from "@/components/ServicesPreview";
import CTASection from "@/components/CTASection";

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
