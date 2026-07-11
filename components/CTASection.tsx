"use client";

import { Phone, Mail } from "lucide-react";
import CTABand from "./ui/CTABand";
import ArrowLink from "./ui/ArrowLink";

const tickerPhrases = [
  "You Dream - We Build",
  "Let's Build Together",
  "Building Trust Since 1999",
  "Chennai, Tamil Nadu",
];

export default function CTASection() {
  return (
    <CTABand
      id="home-cta-section"
      eyebrow="Get Started Today"
      titleSolid="Ready to Start Your"
      titleOutline="Dream Project?"
      lede="Let us help you build your dream project with transparency, quality, and timely completion. Experience excellence in construction."
      tickerPhrases={tickerPhrases}
      actions={
        <>
          <ArrowLink href="/contact" tone="onGold" size="lg">
            Get a Quote
          </ArrowLink>
          <ArrowLink href="tel:+919841243345" tone="onGold" size="lg" outline icon={<Phone className="w-full h-full" />}>
            Call Us Now
          </ArrowLink>
        </>
      }
      footer={
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 justify-center items-center text-black/60">
          <a
            href="mailto:delphinassociates@gmail.com"
            className="group flex items-center gap-2 hover:text-primary-dark transition-colors text-xs sm:text-sm md:text-base font-medium"
          >
            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
            </span>
            <span>delphinassociates@gmail.com</span>
          </a>
          <span className="hidden sm:inline w-1 h-1 rounded-full bg-black/30"></span>
          <a
            href="mailto:nanchilassociates@gmail.com"
            className="group flex items-center gap-2 hover:text-primary-dark transition-colors text-xs sm:text-sm md:text-base font-medium"
          >
            <span className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-black/10 flex items-center justify-center group-hover:bg-black/20 transition-colors">
              <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
            </span>
            <span>nanchilassociates@gmail.com</span>
          </a>
        </div>
      }
    />
  );
}
