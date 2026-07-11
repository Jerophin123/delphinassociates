"use client";

import ArchPlans from "../ui/ArchPlans";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { useHPOE } from "../HPOE";
import GeometricParticleField from "../ui/GeometricParticleField";
import ArrowLink from "../ui/ArrowLink";

const quickContacts = [
  {
    icon: Phone,
    value: "+91 98412 43345",
    label: "Quick call support",
    href: "tel:+919841243345",
  },
  {
    icon: Mail,
    value: "delphinassociates@gmail.com",
    label: "Email for consultations",
    href: "mailto:delphinassociates@gmail.com",
  },
];

export default function ContactHero() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;
  const isStatic = tier === "low" || tier === "very-low" || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  const fadeUp = (delay: number) => ({
    initial: noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: {
      duration: noReveal ? 0 : 0.7,
      delay: noReveal ? 0 : delay,
      ease: [0.21, 0.47, 0.32, 0.98] as const,
    },
  });

  return (
    <section
      data-header-theme="light"
      className="relative overflow-hidden bg-[#fdfbf4] border-b border-black/5 sm:min-h-[calc(100dvh-5rem)] flex flex-col"
    >
      {/* Drafting-paper ruling */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(18,18,18,0.045) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(18,18,18,0.045) 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
        }}
      />
      {/* Drafting margin rule */}
      <span aria-hidden className="absolute left-6 sm:left-12 top-0 bottom-0 w-px bg-accent/25 pointer-events-none" />

      <ArchPlans tone="light" variant="locus" />

      {isHigh && (
        <GeometricParticleField
          quantity={40}
          color="#9C7B1E"
          className="z-[1] opacity-50"
          staticity={60}
        />
      )}

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-14 lg:px-16 py-14 sm:py-16 flex-1 flex flex-col justify-center">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          <div className="lg:col-span-7">
            <motion.div {...fadeUp(0.05)} className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-6">
              <span className="font-display font-bold text-[11px] sm:text-xs text-accent-dark/70 tracking-[0.25em] uppercase">Correspondence</span>
              <span className="h-[2px] w-8 sm:w-12 bg-accent shrink-0"></span>
              <span className="text-accent-dark text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
                Contact Delphin Associates
              </span>
            </motion.div>

            <motion.h1
              {...fadeUp(0.15)}
              className="text-4xl sm:text-5xl md:text-6xl font-bold font-display tracking-tight leading-[1.05] mb-6"
            >
              <span className="block text-primary-dark">Get In</span>
              <span className="block text-outline-ink">Touch</span>
            </motion.h1>

            <motion.p
              {...fadeUp(0.28)}
              className="max-w-xl text-base sm:text-lg text-gray-500 leading-relaxed font-light mb-9"
            >
              Get in touch with us for construction and consultancy needs. Share your
              scope and we will respond quickly.
            </motion.p>

            <motion.div {...fadeUp(0.4)} className="flex flex-wrap items-center gap-x-12 gap-y-6">
              <ArrowLink href="tel:+919841243345" tone="onLight" icon={<Phone className="w-full h-full" />}>
                Call Now
              </ArrowLink>
              <ArrowLink href="mailto:delphinassociates@gmail.com" tone="onLight" outline icon={<Mail className="w-full h-full" />}>
                Send Email
              </ArrowLink>
            </motion.div>
          </div>

          {/* Quick-contact tiles */}
          <div className="lg:col-span-5 grid gap-4">
            {quickContacts.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.a
                  key={item.href}
                  href={item.href}
                  {...fadeUp(0.5 + idx * 0.12)}
                  className={`group relative rounded-2xl border p-5 sm:p-6 flex items-center gap-4 sm:gap-5 ${
                    isHigh
                      ? 'liquid-glass-card-light border-black/5'
                      : tier === 'mid'
                      ? 'mid-glass-card-light border-black/5'
                      : 'bg-white border-black/10'
                  } ${isStatic ? '' : 'transition-all duration-300 hover:border-accent-dark/40 hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(10,10,10,0.08)]'}`}
                >
                  <span
                    className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl shrink-0 border ${
                      tier === 'very-low'
                        ? 'bg-accent border-accent'
                        : `bg-[#fdfbf4] border-black/10 ${isStatic ? '' : 'transition-colors duration-500 group-hover:bg-accent/10 group-hover:border-accent-dark/40'}`
                    }`}
                    aria-hidden
                  >
                    <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${tier === 'very-low' ? 'text-black' : `text-primary-dark ${isStatic ? '' : 'group-hover:text-accent-dark transition-colors duration-300'}`}`} />
                  </span>
                  <span className="min-w-0">
                    <span className={`block font-display font-bold text-primary-dark text-base sm:text-xl break-all sm:break-normal ${isStatic ? '' : 'transition-colors duration-300 group-hover:text-accent-dark'}`}>
                      {item.value}
                    </span>
                    <span className="block text-[10px] sm:text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">
                      {item.label}
                    </span>
                  </span>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
