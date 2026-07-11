"use client";

import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import { useHPOE } from "../HPOE";

type Tone = "onDark" | "onLight" | "onGold";

interface ArrowLinkProps {
  href: string;
  children: ReactNode;
  tone?: Tone;
  /** Filled gold circle (primary) vs outlined circle (secondary) */
  outline?: boolean;
  /** Icon inside the circle; defaults to an arrow */
  icon?: ReactNode;
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
  /** Open in a new tab (adds target + rel) */
  external?: boolean;
  /** "back" leads with a left-arrow chip and slides backward on hover */
  direction?: "forward" | "back";
}

/**
 * Signature landing-page CTA: uppercase tracked label + circular icon chip.
 * HPOE-tiered chip material: high = glass (blur + tint + specular),
 * mid = gold gradient + glow, low = flat with color transitions,
 * very-low = flat static.
 */
export default function ArrowLink({
  href,
  children,
  tone = "onDark",
  outline = false,
  icon,
  size = "md",
  className = "",
  ariaLabel,
  external = false,
  direction = "forward",
}: ArrowLinkProps) {
  const back = direction === "back";
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;
  const isMid = tier === "mid" && !reducedMotion;
  const isStatic = tier === "very-low" || reducedMotion;

  const label =
    tone === "onDark"
      ? `text-white ${isStatic ? "" : "group-hover:text-accent"}`
      : tone === "onLight"
      ? `text-primary-dark ${isStatic ? "" : "group-hover:text-accent-dark"}`
      : `text-primary-dark ${isStatic ? "" : "group-hover:text-black"}`;

  const underline =
    tone === "onDark" ? "bg-accent" : tone === "onLight" ? "bg-accent-dark" : "bg-primary-dark";

  // Chip material per HPOE tier
  let circle: string;
  if (isHigh) {
    // Glass: translucent tint + blur + specular inset
    circle = outline
      ? tone === "onDark"
        ? "backdrop-blur-md bg-white/10 border border-white/30 text-white shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,0,0,0.25)] group-hover:bg-accent/20 group-hover:border-accent/50 group-hover:text-accent"
        : tone === "onLight"
        ? "backdrop-blur-md bg-black/5 border border-black/15 text-primary-dark shadow-[inset_0_1px_1px_rgba(255,255,255,0.6),0_8px_20px_rgba(0,0,0,0.1)] group-hover:bg-accent/15 group-hover:border-accent-dark/50 group-hover:text-accent-dark"
        : "backdrop-blur-md bg-white/15 border border-black/30 text-primary-dark shadow-[inset_0_1px_1px_rgba(255,255,255,0.45)] group-hover:bg-black/10"
      : tone === "onGold"
      ? "backdrop-blur-md bg-primary-dark/70 border border-black/40 text-accent shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_8px_20px_rgba(10,10,10,0.35)] group-hover:bg-primary-dark/90"
      : tone === "onLight"
      ? "backdrop-blur-md bg-accent/25 border border-accent-dark/40 text-accent-dark shadow-[inset_0_1px_1px_rgba(255,255,255,0.5),0_8px_20px_rgba(212,175,55,0.25)] group-hover:bg-accent/40"
      : "backdrop-blur-md bg-accent/25 border border-accent/40 text-accent shadow-[inset_0_1px_1px_rgba(255,255,255,0.35),0_8px_20px_rgba(0,0,0,0.3)] group-hover:bg-accent/40";
  } else if (isMid) {
    // Gradient + glow
    circle = outline
      ? tone === "onDark"
        ? "bg-gradient-to-br from-white/15 to-transparent border border-accent/50 text-white shadow-[0_0_14px_rgba(212,175,55,0.35)] group-hover:text-accent group-hover:shadow-[0_0_20px_rgba(212,175,55,0.55)]"
        : tone === "onLight"
        ? "bg-gradient-to-br from-black/5 to-transparent border border-accent-dark/50 text-primary-dark shadow-[0_0_12px_rgba(156,123,30,0.35)] group-hover:text-accent-dark group-hover:shadow-[0_0_18px_rgba(156,123,30,0.55)]"
        : "bg-gradient-to-br from-black/15 to-transparent border border-black/40 text-primary-dark shadow-[0_0_12px_rgba(10,10,10,0.3)] group-hover:shadow-[0_0_18px_rgba(10,10,10,0.45)]"
      : tone === "onGold"
      ? "bg-gradient-to-br from-[#2E2E2E] to-black text-accent border border-black/30 shadow-[0_0_16px_rgba(10,10,10,0.45)] group-hover:shadow-[0_0_24px_rgba(10,10,10,0.6)]"
      : "bg-gradient-to-br from-[#F0D264] via-accent to-[#B8942C] text-black border border-accent/40 shadow-[0_0_18px_rgba(212,175,55,0.5),0_4px_10px_rgba(0,0,0,0.2)] group-hover:shadow-[0_0_28px_rgba(212,175,55,0.75)]";
  } else {
    // Low / very-low: flat
    circle = outline
      ? tone === "onDark"
        ? `border border-white/40 text-white ${isStatic ? "" : "group-hover:bg-accent group-hover:border-accent group-hover:text-black"}`
        : tone === "onLight"
        ? `border border-black/25 text-primary-dark ${isStatic ? "" : "group-hover:bg-primary-dark group-hover:border-primary-dark group-hover:text-accent"}`
        : `border border-black/40 text-primary-dark ${isStatic ? "" : "group-hover:bg-primary-dark group-hover:border-primary-dark group-hover:text-accent"}`
      : tone === "onGold"
      ? `bg-primary-dark text-accent ${isStatic ? "" : "group-hover:bg-black"}`
      : `bg-accent text-black ${isStatic ? "" : "group-hover:bg-accent-light"}`;
  }

  const sizing =
    size === "lg"
      ? { label: "text-sm sm:text-base", circle: "w-11 h-11 sm:w-12 sm:h-12", icon: "w-5 h-5" }
      : size === "sm"
      ? { label: "text-[11px] sm:text-xs", circle: "w-8 h-8 sm:w-9 sm:h-9", icon: "w-3.5 h-3.5" }
      : { label: "text-xs sm:text-sm", circle: "w-9 h-9 sm:w-10 sm:h-10", icon: "w-4 h-4" };

  const labelEl = (
    <span className={`relative font-bold uppercase tracking-[0.2em] ${sizing.label} ${label} ${isStatic ? "" : "transition-colors duration-300"}`}>
      {children}
      {!isStatic && (
        <span
          className={`absolute left-0 -bottom-1 w-full h-[2px] ${underline} scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out`}
          aria-hidden
        />
      )}
    </span>
  );

  const chipEl = (
    <span
      className={`flex items-center justify-center rounded-full shrink-0 ${sizing.circle} ${circle} ${
        isStatic
          ? ""
          : `transition-all duration-300 ${back ? "group-hover:-translate-x-1" : "group-hover:translate-x-1"}${
              isHigh ? " group-hover:scale-110" : ""
            }`
      }`}
      aria-hidden
    >
      <span className={sizing.icon}>
        {icon ?? (back ? <ArrowLeft className="w-full h-full" /> : <ArrowRight className="w-full h-full" />)}
      </span>
    </span>
  );

  const content = back ? (
    <>
      {chipEl}
      {labelEl}
    </>
  ) : (
    <>
      {labelEl}
      {chipEl}
    </>
  );

  const classes = `group inline-flex items-center gap-4 ${className}`;

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={classes}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
