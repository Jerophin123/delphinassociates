"use client";

import { Phone } from "lucide-react";
import CTABand from "../ui/CTABand";
import ArrowLink from "../ui/ArrowLink";

const tickerPhrases = [
  "Let's Build Together",
  "Free Consultancy Support",
  "Transparent Planning",
  "You Dream - We Build",
];

export default function ServicesCTA() {
  return (
    <CTABand
      eyebrow="Let's Build Together"
      titleSolid="Request a Free"
      titleOutline="Consultation"
      lede="Tell us your project scope and timelines. We'll help you with transparent planning, quality execution, and reliable support."
      tickerPhrases={tickerPhrases}
      actions={
        <>
          <ArrowLink href="tel:+919841243345" tone="onGold" size="lg" icon={<Phone className="w-full h-full" />}>
            Call Us Now
          </ArrowLink>
          <ArrowLink href="/contact" tone="onGold" size="lg" outline>
            Get a Quote
          </ArrowLink>
        </>
      }
    />
  );
}
