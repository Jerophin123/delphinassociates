"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useHPOE } from "@/components/HPOE";

const faqs = [
  {
    question: "What exactly does Delphin Associates build?",
    answer: "We handle a bit of everything from family homes and commercial complexes to industrial warehouses and churches. If it's a civil project in Tamil Nadu, we've likely built something similar since our start in 1999."
  },
  {
    question: "Where are you based and how far do you travel?",
    answer: "Our main office is in Madipakkam, Chennai. While we're most active across the Chennai metropolitan area, we frequently take on projects throughout Tamil Nadu for clients who value our quality and transparency."
  },
  {
    question: "How much experience does your team actually have?",
    answer: "We've been in the industry for over 25 years. Founded in 1999 by Mr. Delphin P. Stanley, we've grown into a seasoned team of engineers who understand the local landscape and construction challenges in Chennai perfectly."
  },
  {
    question: "Do you take on smaller residential projects?",
    answer: "Absolutely. Whether it's a private home or a large-scale industrial facility, we bring the same level of focus. We believe every project is someone's 'dream project,' so we don't differentiate based on scale—only on quality."
  },
  {
    question: "How can I get an honest estimate for my project?",
    answer: "The best way is to just reach out. Give us a call or send a WhatsApp message. We'll have a brief chat about what you're looking for, and our consultants will provide a detailed, transparent quote without the hidden costs."
  },
  {
    question: "What happens after the building is finished?",
    answer: "We don't just hand over the keys and disappear. We take pride in our post-completion support, making sure everything is exactly as it should be. Our relationship with our clients usually lasts long after the final brick is laid."
  }
];

const FAQItem = ({ faq, isOpen, onClick, index, tier, reducedMotion }: any) => {
  return (
    <article
      id={`faq-item-${index}`}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
      className={`group border-b border-gray-200 py-6 transition-all duration-300 ${isOpen ? "bg-accent/[0.02]" : ""
        }`}
    >
      <button
        onClick={onClick}
        className="flex w-full items-start justify-between text-left sm:items-center"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        <span className="flex-1 pr-8">
          <h3
            itemProp="name"
            className={`text-lg font-bold sm:text-xl md:text-2xl ${isOpen ? "text-accent" : "text-primary-dark group-hover:text-accent"
              } transition-colors duration-300 font-display tracking-tight`}
          >
            {faq.question}
          </h3>
        </span>
        <div className={`mt-1 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:mt-0 ${isOpen ? "bg-accent border-accent text-white" : "border-gray-300 text-gray-400 group-hover:border-accent group-hover:text-accent"
          }`}>
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`faq-answer-${index}`}
            itemScope
            itemProp="acceptedAnswer"
            itemType="https://schema.org/Answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
          >
            <div className="pt-4 pr-12">
              <p
                itemProp="text"
                className="text-base leading-relaxed text-gray-500 sm:text-lg font-light max-w-3xl"
              >
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { tier, reducedMotion } = useHPOE();

  const baseUrl = "https://www.delphinassociates.com";

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${baseUrl}/`
    },
    "publisher": {
      "@type": "LocalBusiness",
      "@id": `${baseUrl}/`
    },
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section
      id="home-faq"
      className={`relative z-10 py-16 sm:py-24 md:py-32 bg-[#fdfbf4]`}
    >
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Side: Humanized Heading */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-[2px] w-8 bg-accent"></span>
              <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
                Common Questions
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-primary-dark tracking-tighter leading-[1.05] mb-8">
              Things people usually <br />
              <span className="text-accent italic font-serif">ask us</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-500 max-w-md leading-relaxed font-light mb-10">
              We believe in transparency from the first chat. If you don't find what you're looking for here, just give us a call.
            </p>

            <div className="hidden lg:block mt-12 p-8 rounded-[2rem] bg-white border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-400 uppercase tracking-widest font-bold mb-4">Direct Contact</p>
              <a href="tel:+919841243345" className="text-2xl font-bold text-primary-dark hover:text-accent transition-colors block mb-2">+91 98412 43345</a>
              <p className="text-gray-500 font-light italic">Available Mon - Sat, 9am - 6pm</p>
            </div>
          </motion.div>

          {/* Right Side: Clean, minimalist FAQ list */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7"
          >
            <div className="border-t border-gray-200">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  tier={tier}
                  reducedMotion={reducedMotion}
                />
              ))}
            </div>

            <div className="mt-12 lg:hidden text-center">
              <p className="text-gray-500 font-light">
                Prefer talking? <a href="tel:+919841243345" className="text-accent font-bold">Call us now</a>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
