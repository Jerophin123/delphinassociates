"use client";

import { Phone } from "lucide-react";
import CTABand from "../ui/CTABand";
import ArrowLink from "../ui/ArrowLink";

const tickerPhrases = [
  "You Dream - We Build",
  "100+ Projects Delivered",
  "Quality Since 1999",
  "Chennai, Tamil Nadu",
];

export default function ProjectsCTA() {
  return (
    <CTABand
      eyebrow="Start Your Next Project"
      titleSolid="Let Us Plan It"
      titleOutline="Right"
      lede="Tell us your scope and timeline. We will respond with a clear plan for construction execution and consultancy - typically within 24 hours."
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
