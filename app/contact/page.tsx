import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import MapSection from "@/components/contact/MapSection";
import SEOStructuredData from "@/components/SEOStructuredData";
import ContactHero from "@/components/contact/ContactHero";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Delphin Associates. Located at No. 261A, 6th Main road, LIC nagar, Madipakkam, Chennai- 600 091. Call +91 98412 43345 or +91 99403 06399, or send us a message for your construction and consultancy needs.",
  keywords: [
    "contact Delphin Associates",
    "construction company contact Chennai",
    "building consultancy contact",
    "Chennai construction company address",
    "Madipakkam construction company",
    "construction company phone number",
    "construction company email",
  ],
  openGraph: {
    title: "Contact Us | Delphin Associates",
    description:
      "Get in touch with Delphin Associates. Located at No. 261A, 6th Main road, LIC nagar, Madipakkam, Chennai- 600 091. Call us or send us a message for your construction needs.",
    url: "/contact",
    images: [
      {
        url: "/logo.jpg",
        width: 1200,
        height: 630,
        alt: "Contact Delphin Associates",
      },
    ],
  },
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <SEOStructuredData type="LocalBusiness" />
      <div className="pt-20 bg-white/95 text-primary-dark min-h-screen relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pt-6 sm:pb-10 md:pt-8 md:pb-12">
          <ContactHero />

          <div className="mt-8 sm:mt-12 md:mt-16">
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-10 md:mb-12">
              <ContactForm />
              <ContactInfo />
            </div>
            <MapSection />
          </div>
        </div>
      </div>
    </>
  );
}
