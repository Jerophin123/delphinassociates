import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import MapSection from "@/components/contact/MapSection";
import SEOStructuredData from "@/components/SEOStructuredData";
import { Mail, Phone, Sparkles } from "lucide-react";

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
      <div className="pt-20 bg-white text-primary-dark min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 md:py-12">
          {/* Contact Page Hero */}
          <div className="relative overflow-hidden rounded-3xl border border-accent/15 bg-[radial-gradient(ellipse_at_top,rgba(212,175,55,0.18)_0%,transparent_55%),linear-gradient(180deg,rgba(255,255,255,1)_0%,rgba(250,250,250,1)_100%)] px-6 py-10 sm:px-10 sm:py-12 mb-10 sm:mb-12 md:mb-14">
            <div className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-accent/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-accent-light/10 blur-3xl" />

            <div className="relative grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-start">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full border border-accent/25 bg-accent/10 text-accent font-semibold text-xs sm:text-sm">
                  <Sparkles className="w-4 h-4" />
                  Contact Delphin Associates
                </div>
                <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-[0.01em] bg-gradient-to-r from-accent via-accent-light to-accent bg-clip-text text-transparent">
                  Contact Us
                </h1>
                <p className="mt-4 mx-auto lg:mx-0 max-w-2xl text-base sm:text-lg text-gray-600 leading-relaxed px-2 lg:px-0">
                  Get in touch with us for construction and consultancy needs. Share your scope and we will respond quickly.
                </p>

                <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <a
                    href="tel:+919841243345"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-accent text-black font-bold text-sm sm:text-base hover:bg-accent-light transition-colors shadow-2xl shadow-accent/25 hover:shadow-accent/45"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                  <a
                    href="mailto:delphinassociates@gmail.com"
                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-primary/5 border border-accent/60 text-primary-dark font-bold text-sm sm:text-base hover:bg-accent/15 hover:text-accent transition-colors"
                  >
                    <Mail className="w-4 h-4" />
                    Send Email
                  </a>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-accent font-semibold">
                      <Phone className="w-4 h-4 flex-shrink-0" />
                      <span className="whitespace-nowrap">+91 98412 43345</span>
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-semibold text-gray-600">
                    Quick call support
                  </div>
                </div>
                <div className="rounded-2xl border border-gray-100 bg-white/70 backdrop-blur-sm p-4 sm:p-5">
                  <div className="flex items-center gap-2 text-accent font-semibold">
                      <Mail className="w-4 h-4 flex-shrink-0" />
                      <span className="break-all leading-tight">
                        delphinassociates@gmail.com
                      </span>
                  </div>
                  <div className="mt-1 text-xs sm:text-sm font-semibold text-gray-600">
                    Email for consultations
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-2">
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
