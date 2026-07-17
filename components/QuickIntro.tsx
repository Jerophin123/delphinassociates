"use client";

import ArchPlans from "./ui/ArchPlans";
import SheetWatermark from "./ui/SheetWatermark";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { Award, Users, CheckCircle2, TrendingUp } from "lucide-react";
import { useHPOE } from "@/components/HPOE";
import ArrowLink from "./ui/ArrowLink";
import { useLiquidGlass } from "./ui/useLiquidGlass";

const stats = [
  { icon: Award, value: "25+", label: "Years of Experience" },
  { icon: TrendingUp, value: "100+", label: "Projects Completed" },
  { icon: Users, value: "50+", label: "Happy Clients" },
  { icon: CheckCircle2, value: "100%", label: "Quality Assured" },
];

function AnimatedCounter({
  value,
  isInView
}: {
  value: string;
  isInView: boolean;
}) {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ''));
  const suffix = value.replace(/[0-9]/g, '');

  useEffect(() => {
    if (!isInView || !nodeRef.current) return;

    let startTime: number | null = null;
    const duration = 2000;
    let animationFrameId: number;

    const easeOutQuart = (x: number): number => 1 - Math.pow(1 - x, 4);

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percent = Math.min(progress / duration, 1);
      const currentVal = Math.floor(numericValue * easeOutQuart(percent));

      if (nodeRef.current) {
        nodeRef.current.textContent = currentVal + suffix;
      }

      if (percent < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, numericValue, suffix]);

  if (useHPOE().tier === 'very-low') {
    return (
      <span className="tabular-nums font-variant-numeric-tabular">
        {isInView ? value : `0${suffix}`}
      </span>
    );
  }

  return (
    <span ref={nodeRef} className="tabular-nums font-variant-numeric-tabular">
      0{suffix}
    </span>
  );
}

export default function QuickIntro() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;
  const isStatic = tier === 'low' || tier === 'very-low' || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;
  // Real liquid-glass refraction on the founder stamp card (high tier)
  const founderGlassRef = useLiquidGlass<HTMLDivElement>({ scale: -60, chroma: 4, blur: 3, mapBlur: 10 });

  return (
    <section
      id="home-quickintro"
      data-header-theme="light"
      itemScope
      itemType="https://schema.org/AboutPage"
      className="relative z-10 bg-[#fdfbf4] overflow-hidden border-y border-black/5"
      aria-labelledby="about-heading"
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

      <ArchPlans tone="light" variant="surveyor" />

      {/* Sheet-index watermark */}
      <SheetWatermark text="01" tone="dark" />

      {/* Full-width stats band */}
      <div ref={ref} className="relative border-b border-black/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-14 lg:px-16 grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{
                  duration: noReveal ? 0 : 0.6,
                  delay: noReveal ? 0 : index * 0.1,
                  ease: [0.21, 0.47, 0.32, 0.98]
                }}
                className={`group relative py-8 sm:py-12 px-4 sm:px-8 ${index > 0 ? 'border-l border-black/10' : ''} ${index > 1 ? 'border-t lg:border-t-0' : ''} ${index === 2 ? 'border-l-0 lg:border-l' : ''}`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 mb-3 sm:mb-4 ${tier === 'very-low' ? 'text-accent-dark' : `text-accent-dark/60 ${isStatic ? '' : 'group-hover:text-accent-dark transition-colors duration-500'}`}`} aria-hidden />
                <span className={`block text-3xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-primary-dark ${isStatic ? '' : 'transition-colors duration-500 group-hover:text-accent-dark'}`}>
                  <AnimatedCounter value={stat.value} isInView={isInView} />
                </span>
                <span className="block mt-2 text-[10px] sm:text-xs text-gray-500 font-bold tracking-[0.2em] uppercase">
                  {stat.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Editorial body */}
      <div className="relative max-w-7xl mx-auto px-6 sm:px-14 lg:px-16 py-14 sm:py-24 md:py-28">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
          <motion.div
            initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: noReveal ? 0 : 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 min-w-0"
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="font-display font-bold text-[11px] sm:text-xs text-accent-dark/70 tracking-[0.25em] uppercase">Sheet 01&thinsp;/&thinsp;06</span>
              <span className="h-[2px] w-12 bg-accent"></span>
              <span className="text-accent-dark text-sm sm:text-base font-bold tracking-[0.2em] uppercase">
                About Us
              </span>
            </div>
            <h2 id="about-heading" className="text-[1.6rem] sm:text-3xl md:text-4xl xl:text-5xl font-bold font-display leading-[1.12] tracking-tight mb-6">
              <span className="block text-primary-dark whitespace-nowrap">Excellence in</span>
              <span className="block text-outline-ink whitespace-nowrap">Construction</span>
              <span className="block mt-3 text-base sm:text-lg md:text-xl text-accent-dark font-medium">Since 1999</span>
            </h2>

            {/* Founder stamp (desktop) - real liquid glass over the drafting paper on high tier */}
            <div ref={founderGlassRef} className={`hidden sm:flex items-center gap-4 p-4 sm:p-5 rounded-2xl border w-fit ${
              isHigh ? 'liquid-real-light border-black/5' : tier === 'mid' ? 'mid-glass-card-light border-black/5' : 'bg-white border-black/10'
            }`}>
              <span className="flex items-center justify-center w-12 h-12 rounded-xl border border-accent-dark/50 p-[3px] shrink-0" aria-hidden>
                <span className="flex items-center justify-center w-full h-full rounded-[9px] border border-accent-dark/30 bg-accent/10 font-display font-bold text-accent-dark text-sm tracking-widest">
                  DS
                </span>
              </span>
              <span>
                <span className="block text-primary-dark font-bold text-sm sm:text-base">Mr. Delphin P. Stanley</span>
                <span className="block text-gray-500 text-xs sm:text-sm font-light mt-0.5">Founder &mdash; DCE, B.Tech</span>
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={noReveal ? { opacity: 1, y: 0 } : { opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: noReveal ? 0 : 0.8, delay: noReveal ? 0 : 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-6 min-w-0"
          >
            <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-light leading-relaxed mb-6">
              We build with <strong className="text-primary-dark font-medium">transparency</strong>, finish{" "}
              <strong className="text-primary-dark font-medium">on time</strong>, and stay after handover.
            </p>
            <p className="text-sm sm:text-base text-gray-500 leading-relaxed font-light mb-8 max-w-2xl">
              Delphin Associates provides building consultancy, construction, and project
              execution services for residential, industrial, commercial, institutional,
              and church projects &mdash; led by a team of young engineers working across
              Tamil Nadu. Our commitment to quality and customer satisfaction has made us
              a trusted name in the construction industry.
            </p>

            {/* Founder stamp (mobile) - compact full-width sign-off after the copy */}
            <div className={`sm:hidden flex items-center gap-3 p-3 rounded-xl border w-full mb-7 ${
              tier === 'mid' ? 'mid-glass-card-light border-black/5' : 'bg-white border-black/10'
            }`}>
              <span className="flex items-center justify-center w-10 h-10 rounded-xl border border-accent-dark/50 p-[2px] shrink-0" aria-hidden>
                <span className="flex items-center justify-center w-full h-full rounded-[10px] border border-accent-dark/30 bg-accent/10 font-display font-bold text-accent-dark text-xs tracking-widest">
                  DS
                </span>
              </span>
              <span className="min-w-0">
                <span className="block text-primary-dark font-bold text-sm leading-tight truncate">Mr. Delphin P. Stanley</span>
                <span className="block text-gray-500 text-[11px] font-light mt-0.5 truncate">Founder &mdash; DCE, B.Tech</span>
              </span>
            </div>

            <ArrowLink href="/about" tone="onLight">
              Learn More About Us
            </ArrowLink>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
