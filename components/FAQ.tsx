"use client";

import ArchPlans from "./ui/ArchPlans";
import SheetWatermark from "./ui/SheetWatermark";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Phone } from "lucide-react";
import { useHPOE } from "@/components/HPOE";
import ArrowLink from "./ui/ArrowLink";

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
    answer: "Absolutely. Whether it's a private home or a large-scale industrial facility, we bring the same level of focus. We believe every project is someone's 'dream project,' so we don't differentiate based on scale - only on quality."
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

type FAQItemProps = {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
  index: number;
  isStatic: boolean;
  noReveal: boolean;
};

function FAQItem({ faq, isOpen, onClick, index, isStatic, noReveal }: FAQItemProps) {
  const code = `RFI-${String(index + 1).padStart(2, "0")}`;
  return (
    <motion.article
      id={`faq-item-${index}`}
      itemScope
      itemProp="mainEntity"
      itemType="https://schema.org/Question"
      initial={noReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: noReveal ? 0 : 0.55,
        delay: noReveal ? 0 : index * 0.06,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={`group border-b border-white/10 border-l-2 ${
        isOpen ? "border-l-accent bg-accent/[0.04]" : "border-l-transparent"
      } ${isStatic ? "" : "transition-colors duration-300"}`}
    >
      <button
        onClick={onClick}
        className="grid grid-cols-[1fr_auto] sm:grid-cols-[auto_1fr_auto] items-center gap-4 sm:gap-6 w-full py-5 sm:py-6 px-3 sm:px-5 text-left"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${index}`}
      >
        {/* RFI code */}
        <span
          aria-hidden
          className={`hidden sm:block font-display font-bold text-sm md:text-base tracking-[0.1em] w-16 md:w-20 shrink-0 ${
            isOpen ? "text-accent" : `text-accent/40 ${isStatic ? "" : "transition-colors duration-300 group-hover:text-accent/70"}`
          }`}
        >
          {code}
        </span>

        <h3
          itemProp="name"
          className={`text-base font-bold sm:text-lg md:text-xl font-display tracking-tight leading-snug ${
            isOpen ? "text-accent" : `text-white ${isStatic ? "" : "transition-colors duration-300 group-hover:text-accent"}`
          }`}
        >
          {faq.question}
        </h3>

        {/* Drafting toggle stamp */}
        <span
          className={`flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-xl border ${
            isOpen
              ? "bg-accent border-accent text-black"
              : `border-white/20 text-gray-400 ${isStatic ? "" : "transition-all duration-300 group-hover:border-accent/60 group-hover:text-accent"}`
          }`}
          aria-hidden
        >
          {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
        </span>
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
            transition={{ duration: noReveal ? 0 : 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            {/* Answer - ruled note column aligned under the question */}
            <div className="px-3 sm:px-5 pb-6 grid sm:grid-cols-[auto_1fr] gap-4 sm:gap-6">
              <span className="hidden sm:block w-16 md:w-20 shrink-0" aria-hidden />
              <div className="border-l-2 border-accent/50 pl-4 sm:pl-5 pr-4 sm:pr-12">
                <span className="block text-[9px] font-bold uppercase tracking-[0.3em] text-accent/70 mb-2">
                  Answer
                </span>
                <p itemProp="text" className="text-sm leading-relaxed text-gray-400 sm:text-base font-light max-w-3xl">
                  {faq.answer}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;
  const isStatic = tier === 'low' || tier === 'very-low' || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

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
      data-header-theme="dark"
      className={`relative z-10 py-16 sm:py-24 md:py-32 ${tier === 'very-low' ? 'bg-primary-dark' : 'bg-primary-dark/95'} overflow-hidden border-y border-white/5`}
    >
      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Faint site grid */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />

      <ArchPlans tone="dark" variant="detail" />

      {/* Sheet-index watermark */}
      <SheetWatermark text="06" tone="light" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Side: register heading + direct contact */}
          <motion.div
            initial={noReveal ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: noReveal ? 0 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display font-bold text-[11px] sm:text-xs text-accent/60 tracking-[0.25em] uppercase">Sheet 06&thinsp;/&thinsp;06</span>
              <span className="h-[2px] w-12 bg-accent"></span>
              <span className="text-accent text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
                RFI Register
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight leading-[1.08] mb-8">
              <span className="text-white">Questions </span>
              <span className="text-outline-display">&amp; Answers</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-md leading-relaxed font-light mb-8">
              Every project starts with good questions. If yours isn&apos;t on the
              register, raise it - we believe in transparency from the first chat.
            </p>

            <ArrowLink href="/contact" tone="onDark">
              Raise a Query
            </ArrowLink>

            {/* Direct contact card - real glass on high tier */}
            <div className={`hidden lg:block mt-10 p-8 rounded-3xl border ${
              isHigh ? 'liquid-glass-card-dark border-white/10' : tier === 'mid' ? 'mid-glass-card-dark border-white/10' : tier === 'very-low' ? 'bg-black border-white/20' : 'bg-black/40 border-white/10'
            }`}>
              <p className="flex items-center gap-3 text-[11px] text-accent uppercase tracking-[0.25em] font-bold mb-5">
                <span className="flex items-center justify-center w-9 h-9 rounded-xl border border-accent/50 p-[2px]" aria-hidden>
                  <span className="flex items-center justify-center w-full h-full rounded-[10px] border border-accent/30 bg-accent/10">
                    <Phone className="w-4 h-4 text-accent" />
                  </span>
                </span>
                Direct Contact
              </p>
              <a href="tel:+919841243345" className={`text-2xl font-bold font-display text-white block mb-2 ${isStatic ? '' : 'hover:text-accent transition-colors'}`}>
                +91 98412 43345
              </a>
              <p className="text-gray-400 font-light text-sm">Available Mon &ndash; Sat, 9am &ndash; 6pm</p>
              <span className="block h-[2px] w-10 bg-accent/60 mt-6" aria-hidden />
            </div>
          </motion.div>

          {/* Right Side: the register */}
          <div className="lg:col-span-7">
            <div className="border-t border-white/10">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  faq={faq}
                  index={index}
                  isOpen={openIndex === index}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  isStatic={isStatic}
                  noReveal={noReveal}
                />
              ))}
            </div>

            <div className="mt-10 lg:hidden text-center">
              <p className="text-gray-400 font-light">
                Prefer talking? <a href="tel:+919841243345" className="text-accent font-bold">Call us now</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
