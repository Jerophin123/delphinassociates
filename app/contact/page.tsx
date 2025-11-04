import { Metadata } from "next";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import MapSection from "@/components/contact/MapSection";

export const metadata: Metadata = {
  title: "Contact Us | Delphin Associates",
  description:
    "Get in touch with Delphin Associates. Located in Chennai, Tamil Nadu. Call us or send us a message for your construction needs.",
};

export default function ContactPage() {
  return (
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
  );
}
