import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import MapSection from "@/components/contact/MapSection";
import SEOStructuredData from "@/components/SEOStructuredData";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with Delphin Associates. Located at Plot No 9, 8th Street, Kubera Nagar, Madipakkam, Chennai - 600 091. Call +91 98412 43345 or +91 99403 06399, or send us a message for your construction and consultancy needs.",
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
      "Get in touch with Delphin Associates. Located at Plot No 9, 8th Street, Kubera Nagar, Madipakkam, Chennai - 600 091. Call us or send us a message for your construction needs.",
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
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-display">
              Contact Us
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get in touch with us for your construction and consultancy needs
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <ContactForm />
            <ContactInfo />
          </div>
          <MapSection />
        </div>
      </div>
    </>
  );
}
