"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Play } from "lucide-react";
import { useHPOE } from "@/components/HPOE";
import MagneticButton from "./ui/MagneticButton";
import ArrowLink from "./ui/ArrowLink";
import { useLiquidGlass } from "./ui/useLiquidGlass";

// The firm's three standing promises - stats live in the About sheet below
const commitments = ["Transparent Pricing", "On-Time Delivery", "Post-Completion Support"];

const specializations = [
  "Residential",
  "Industrial",
  "Commercial",
  "Institutional",
  "Church Buildings",
  "Consultancy",
  "Turnkey Projects",
];

const KineticLine = ({
  text,
  delay,
  pb,
  className,
}: {
  text: string;
  delay: number;
  pb: string;
  className: string;
}) => {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;

  const lineReveal = {
    initial: noReveal ? { y: "0%", opacity: 1 } : { y: "112%", opacity: 1 },
    animate: { y: "0%", opacity: 1 },
    transition: {
      duration: noReveal ? 0 : 0.95,
      delay: noReveal ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  };

  if (!isHigh) {
    return (
      <span className={`block overflow-hidden ${pb}`} aria-hidden>
        <motion.span {...lineReveal} className={`block ${className}`} style={{ willChange: "transform" }}>
          {text}
        </motion.span>
      </span>
    );
  }
  return (
    <span className={`block overflow-hidden ${pb}`} aria-hidden>
      <span className="block">
        {text.split("").map((ch, i) => (
          <motion.span
            key={i}
            className={`inline-block ${className}`}
            style={{ willChange: "transform", transformOrigin: "0% 100%" }}
            initial={{ y: "118%", rotate: 9 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 0.9, delay: delay + i * 0.045, ease: [0.16, 1, 0.3, 1] }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        ))}
      </span>
    </span>
  );
};

export default function Hero() {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;
  const isStatic = tier === "low" || tier === "very-low" || reducedMotion;
  const noReveal = tier === "very-low" || reducedMotion;
  // Real liquid-glass refraction on the scope-of-work ticker (high tier)
  const tickerGlassRef = useLiquidGlass<HTMLDivElement>({ scale: -55, chroma: 4, blur: 5, mapBlur: 10 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();
  // Tier-graded parallax: high = full depth, mid = 65%, low/very-low = static
  const parallaxFactor = reducedMotion ? 0 : tier === "high" ? 1 : tier === "mid" ? 0.65 : 0;
  const gridY = useTransform(scrollY, [0, 1000], [0, 250 * parallaxFactor]); // Substantial but buttery depth parallax
  const orbY = useTransform(scrollY, [0, 1000], [0, -150 * parallaxFactor]);
  // Content plane drifts up slower than the scroll - full on high, gentler on mid
  const contentY = useTransform(scrollY, [0, 800], [0, -70 * parallaxFactor]);
  const contentOpacity = useTransform(scrollY, [0, 700], [1, tier === "high" && !reducedMotion ? 0.35 : 1]);

  useEffect(() => {
    if (tier !== 'high' || reducedMotion) return;

    // Throttle for performance
    let ticking = false;
    const handleMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [tier, reducedMotion]);

  // Masked line reveal: the span rises out of an overflow-hidden parent
  const lineReveal = (delay: number) => ({
    initial: noReveal ? { y: "0%", opacity: 1 } : { y: "112%", opacity: 1 },
    animate: { y: "0%", opacity: 1 },
    transition: {
      duration: noReveal ? 0 : 0.95,
      delay: noReveal ? 0 : delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

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
      id="home-hero"
      itemScope
      itemType="https://schema.org/CreativeWork"
      className="relative min-h-[100dvh] flex items-end overflow-hidden"
      style={{ marginBottom: 0 }}
      role="banner"
      aria-label="Welcome to Delphin Associates"
    >
      {/* Hero Image Background - covers full viewport including header area */}
      <div className="fixed inset-0 w-full h-full z-0" style={{ transform: 'translateZ(0)', bottom: 0, height: '100vh', backgroundColor: tier === 'very-low' ? '#0A0A0A' : 'transparent' }}>
        {tier !== 'very-low' && (
          <div className="absolute inset-0 w-full h-full will-change-transform" style={{ transform: 'translateZ(0)', bottom: 0, height: '100vh' }}>
            <Image
              src="/hero_background.jpg"
              alt="Hero background"
              fill
              priority
              unoptimized
              quality={85}
              className="object-cover hidden sm:block"
              sizes="100vw"
              style={{
                transform: 'translateZ(0)',
                filter: 'brightness(0.65)',
              }}
            />
            <Image
              src="/hero_background_mobile.jpg"
              alt="Hero background mobile"
              fill
              priority
              unoptimized
              quality={85}
              className="object-cover sm:hidden"
              sizes="100vw"
              style={{
                transform: 'translateZ(0)',
                filter: 'brightness(0.65)',
              }}
            />
          </div>
        )}

        {/* Optimized combined gradient overlay for depth and readability */}
        <div
          className="absolute inset-0"
          style={{
            background: tier === 'very-low'
              ? `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0z' fill='none'/%3E%3Cpath d='M40 0H0v40' stroke='rgba(255,255,255,0.05)' stroke-width='1' fill='none'/%3E%3C/svg%3E")`
              : `
                radial-gradient(ellipse at top left, rgba(212, 175, 55, 0.18) 0%, transparent 52%),
                radial-gradient(ellipse at top right, rgba(197, 164, 109, 0.14) 0%, transparent 52%),
                radial-gradient(ellipse at bottom center, rgba(10, 10, 10, 0.85) 0%, transparent 55%),
                linear-gradient(to top, rgba(10, 10, 10, 0.98) 0%, rgba(18, 18, 18, 0.72) 45%, transparent 100%)
              `,
            willChange: tier === 'very-low' ? 'auto' : 'opacity',
            transform: 'translateZ(0)',
            bottom: 0,
            height: '100vh',
            width: '100%',
          }}
        />
      </div>

      {/* Flagship Interactive Engine Spotlight */}
      {isHigh && (
        <div
          className="pointer-events-none fixed inset-0 z-[2] transition-opacity duration-300"
          style={{
            background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(212, 175, 55, 0.08), transparent 40%)`,
          }}
        />
      )}

      {/* Optimized grid pattern overlay - GPU accelerated */}
      <motion.div
        className="absolute inset-0 opacity-[0.03] md:opacity-[0.05] z-[1] pointer-events-none"
        style={{
          willChange: 'opacity, transform',
          bottom: 0,
          height: '100vh',
          width: '100%',
          y: gridY
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.15) 1px, transparent 1px),
                              linear-gradient(to bottom, rgba(255,255,255,0.15) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'translateZ(0)',
          }}
        />
      </motion.div>

      {/* Optimized floating orbs - conditionally rendered based on hardware tier */}
      {tier !== 'low' && tier !== 'very-low' && (
        <motion.div
          className="absolute inset-0 z-[1] pointer-events-none"
          style={{ y: orbY, willChange: 'transform' }}
        >
          <div
            className={`absolute top-16 left-4 sm:top-20 sm:left-10 w-48 h-48 sm:w-72 sm:h-72 md:w-80 md:h-80 bg-accent/8 rounded-full ${tier === 'mid' ? 'blur-lg' : 'blur-2xl sm:blur-3xl'} ${reducedMotion || tier === 'mid' ? '' : 'md:animate-pulse'} z-[1] pointer-events-none`}
            style={{ willChange: 'opacity, transform', transform: 'translateZ(0)' }}
          />
          <div
            className={`absolute bottom-16 right-4 sm:bottom-20 sm:right-10 w-64 h-64 sm:w-96 sm:h-96 md:w-[28rem] md:h-[28rem] bg-primary-light/8 rounded-full ${tier === 'mid' ? 'blur-lg' : 'blur-2xl sm:blur-3xl'} ${reducedMotion || tier === 'mid' ? '' : 'md:animate-pulse'} z-[1] pointer-events-none`}
            style={{ animationDelay: '1s', willChange: 'opacity, transform', transform: 'translateZ(0)' }}
          />
        </motion.div>
      )}

      {/* Bottom-left anchored composition - one clean column, image breathes on the right */}
      <motion.div
        className="relative z-10 w-full max-w-[90rem] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20 pt-28 sm:pt-32 pb-28 sm:pb-36"
        style={{ y: contentY, opacity: contentOpacity, willChange: tier === 'high' && !reducedMotion ? 'transform, opacity' : 'auto' }}
      >
        <div>
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-12 mb-8 sm:mb-10">
          <h1
            aria-label="We Create Comfort"
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7.5rem] font-bold font-display leading-[1.02] tracking-[0.02em]"
          >
            <KineticLine
              text="We"
              delay={0.15}
              pb="pb-1"
              className={`${tier === 'very-low' ? 'text-white' : `text-transparent bg-clip-text ${tier === 'high' ? 'bg-[linear-gradient(110deg,#D4AF37_0%,#C5A46D_15%,#FFF2B3_30%,#FFFFFF_50%,#FFF2B3_70%,#C5A46D_85%,#D4AF37_100%)] hero-text-premium hero-text-premium-glow' : 'bg-gradient-to-l from-[#FFFFFF] via-[#FFF2B3] to-[#D4AF37]'}`} ${tier === 'low' || tier === 'very-low' ? '' : 'drop-shadow-[0_0_22px_rgba(212,175,55,0.65)]'}`}
            />
            <KineticLine
              text="Create"
              delay={0.3}
              pb="pb-1"
              className={`${tier === 'very-low' ? 'text-white' : `text-transparent bg-clip-text ${tier === 'high' ? 'bg-[linear-gradient(110deg,#D4AF37_0%,#C5A46D_15%,#FFF2B3_30%,#FFFFFF_50%,#FFF2B3_70%,#C5A46D_85%,#D4AF37_100%)] hero-text-premium hero-text-premium-glow' : 'bg-gradient-to-l from-[#FFFFFF] via-[#FFF2B3] to-[#D4AF37]'}`} ${tier === 'low' || tier === 'very-low' ? '' : 'drop-shadow-[0_0_22px_rgba(212,175,55,0.65)]'}`}
            />
            <KineticLine
              text="Comfort"
              delay={0.5}
              pb="pb-2"
              className={`text-outline-display ${tier === 'low' || tier === 'very-low' ? '' : 'drop-shadow-[0_0_28px_rgba(212,175,55,0.4)]'}`}
            />
          </h1>

          {/* Lede - anchored to the headline baseline, ruled like a drawing note */}
          <motion.p
            {...fadeUp(0.45)}
            className={`text-xs sm:text-sm text-[#C5C5C5] font-light leading-relaxed max-w-sm drop-shadow-md lg:mb-3 lg:pl-6 ${tier === 'very-low' ? 'lg:border-l-2 lg:border-accent' : 'lg:border-l lg:border-accent/40'}`}
            style={{ willChange: 'opacity, transform' }}
          >
            Leading civil construction company in Chennai, Tamil Nadu, delivering
            excellence in residential, industrial, commercial, institutional, and
            church projects.
          </motion.p>
          </div>

          <motion.div
            {...fadeUp(0.58)}
            className="flex flex-wrap items-center gap-x-12 gap-y-6"
            style={{ willChange: 'opacity, transform' }}
          >
            <MagneticButton className="w-fit">
              <ArrowLink href="/contact" tone="onDark" size="sm">
                Start Your Project
              </ArrowLink>
            </MagneticButton>
            <MagneticButton className="w-fit">
              <ArrowLink href="/projects" tone="onDark" size="sm" outline icon={<Play className="w-full h-full" />}>
                View Portfolio
              </ArrowLink>
            </MagneticButton>
          </motion.div>

          {/* Standing commitments - quiet footnote under the CTAs */}
          <motion.div
            {...fadeUp(0.72)}
            className="mt-7 sm:mt-9 flex items-center gap-x-6 gap-y-2 flex-wrap"
            style={{ willChange: 'opacity, transform' }}
          >
            {commitments.map((promise, index) => (
              <span key={promise} className="flex items-center gap-x-6">
                {index > 0 && <span className="hidden sm:block w-1 h-1 rounded-full bg-white/20" aria-hidden />}
                <span className="text-[9px] sm:text-[10px] text-white/40 font-semibold tracking-[0.25em] uppercase">
                  {promise}
                </span>
              </span>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Survey-coordinates rail - right edge metadata, drafting sheet style */}
      <div
        aria-hidden
        className="absolute top-1/2 -translate-y-1/2 right-4 lg:right-5 z-10 hidden xl:flex flex-col items-center gap-4 pointer-events-none"
      >
        <span className="h-16 w-px bg-gradient-to-b from-transparent to-accent/50" />
        <span
          className="text-[10px] tracking-[0.35em] uppercase text-white/35 font-bold whitespace-nowrap"
          style={{ writingMode: 'vertical-rl' }}
        >
          12.96&deg; N &middot; 80.19&deg; E &mdash; Madipakkam, Chennai
        </span>
        <span className="h-16 w-px bg-gradient-to-t from-transparent to-accent/50" />
      </div>

      {/* Plumb-line scroll cue - pinned to the left edge, clear of content */}
      {tier !== 'very-low' && !reducedMotion && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="absolute bottom-[4.5rem] left-4 lg:left-5 z-10 hidden lg:flex flex-col items-center gap-3 pointer-events-none"
        >
          <span
            className="text-[9px] tracking-[0.4em] uppercase text-white/40 font-bold"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
          <span className={`block h-12 w-px bg-gradient-to-b from-accent via-accent/60 to-transparent ${isStatic ? '' : 'animate-plumb'}`} />
        </motion.div>
      )}

      {/* Scope-of-work ticker - real liquid glass over the site photo on high tier */}
      <div
        ref={tickerGlassRef}
        className={`absolute bottom-0 inset-x-0 z-10 border-t overflow-hidden ${
          tier === 'very-low'
            ? 'bg-black border-white/10'
            : isHigh
            ? 'bg-black/25 border-white/10'
            : 'bg-black/60 border-white/10'
        }`}
        aria-label="Our specializations"
      >
        {/* Static title-block label pinned over the scrolling strip */}
        <span
          className={`hidden sm:flex absolute inset-y-0 left-0 z-10 items-center pl-6 lg:pl-10 pr-6 text-[10px] font-bold tracking-[0.3em] uppercase text-accent border-r border-white/10 ${
            tier === 'very-low' ? 'bg-black' : 'bg-[#0A0A0A]'
          }`}
        >
          Scope of Work
        </span>
        <div className={`flex whitespace-nowrap w-max py-3.5 sm:py-4 ${isStatic ? '' : 'animate-marquee'}`} style={{ willChange: isStatic ? 'auto' : 'transform' }}>
          {[0, 1].map((copy) => (
            <div key={copy} aria-hidden={copy === 1} className="flex items-center shrink-0">
              {specializations.map((item) => (
                <span
                  key={`${copy}-${item}`}
                  className="flex items-center text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase text-white/45"
                >
                  <span className="w-1.5 h-1.5 rotate-45 bg-accent/60 mx-5 sm:mx-8 shrink-0" aria-hidden />
                  {item}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
