"use client";

import { useState, useEffect, ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, HardHat } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHPOE } from "./HPOE";

const navItems = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Team", href: "/team" },
  { name: "Contact", href: "/contact" },
];

/** Engineer's-stamp CTA: double-ring bordered block, filled (accent) or outline.
 *  HPOE ladder: noMotion kills color transitions (very-low), noLift kills the
 *  hover translate (low and below) while keeping colors alive on low. */
function StampButton({
  href,
  children,
  icon,
  filled = false,
  darkGround,
  noMotion,
  noLift,
  external = false,
  className = "",
  onClick,
}: {
  href: string;
  children: ReactNode;
  icon: ReactNode;
  filled?: boolean;
  darkGround: boolean;
  noMotion: boolean;
  noLift: boolean;
  external?: boolean;
  className?: string;
  onClick?: () => void;
}) {
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;
  const isMid = tier === "mid" && !reducedMotion;

  const outer = filled
    ? "border-accent/70"
    : darkGround
    ? "border-accent/50"
    : "border-accent-dark/50";

  // Plate material per HPOE tier: high = glass, mid = gradient + glow, low/very-low = flat
  let inner: string;
  if (isHigh) {
    inner = filled
      ? `backdrop-blur-md bg-accent/25 border-accent/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)] ${
          darkGround ? "text-accent" : "text-accent-dark"
        } group-hover:bg-accent/40`
      : darkGround
      ? "backdrop-blur-md bg-white/10 text-accent border-white/25 shadow-[inset_0_1px_1px_rgba(255,255,255,0.25)] group-hover:bg-accent/20"
      : "backdrop-blur-md bg-black/5 text-accent-dark border-black/15 shadow-[inset_0_1px_1px_rgba(255,255,255,0.5)] group-hover:bg-accent/15";
  } else if (isMid) {
    inner = filled
      ? "bg-gradient-to-br from-[#F0D264] via-accent to-[#B8942C] text-black border-accent/40 shadow-[0_0_14px_rgba(212,175,55,0.5)] group-hover:shadow-[0_0_22px_rgba(212,175,55,0.75)]"
      : darkGround
      ? "bg-gradient-to-br from-white/12 to-transparent text-accent border-accent/40 shadow-[0_0_10px_rgba(212,175,55,0.3)] group-hover:shadow-[0_0_16px_rgba(212,175,55,0.5)]"
      : "bg-gradient-to-br from-black/5 to-transparent text-accent-dark border-accent-dark/40 shadow-[0_0_10px_rgba(156,123,30,0.3)] group-hover:shadow-[0_0_16px_rgba(156,123,30,0.5)]";
  } else {
    inner = filled
      ? `bg-accent text-black border-black/10 ${noMotion ? "" : "group-hover:bg-accent-light"}`
      : darkGround
      ? `bg-accent/10 text-accent border-accent/30 ${noMotion ? "" : "group-hover:bg-accent/20"}`
      : `bg-accent/10 text-accent-dark border-accent-dark/30 ${noMotion ? "" : "group-hover:bg-accent/20"}`;
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group inline-flex rounded-md border p-[2px] ${outer} ${
        noLift ? "" : "transition-all duration-300 hover:-translate-y-0.5"
      } ${className}`}
    >
      <span
        className={`flex items-center justify-center gap-2 w-full rounded-[4px] border px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.18em] ${inner} ${
          noMotion ? "" : "transition-colors duration-300"
        }`}
      >
        {icon}
        {children}
      </span>
    </Link>
  );
}

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(1000);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const [sectionTheme, setSectionTheme] = useState<"light" | "dark" | null>(null);
  const { tier, reducedMotion } = useHPOE();
  // HPOE ladder for the bar:
  //  - noReveal: entrance animations off (very-low / reduced motion)
  //  - noMotion: color/underline transitions off (very-low / reduced motion)
  //  - noLift:   transform hovers + animated indicator off (low and below)
  const noReveal = tier === "very-low" || reducedMotion;
  const noMotion = tier === "very-low" || reducedMotion;
  const noLift = tier === "low" || tier === "very-low" || reducedMotion;

  const isHomePage = pathname === "/";

  useEffect(() => {
    const updateViewportHeight = () => setViewportHeight(window.innerHeight);
    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    updateViewportHeight();
    checkMobile();

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const vh = window.innerHeight;

      setScrollY(currentScrollY);
      setViewportHeight(vh);

      // Detect scroll direction
      if (currentScrollY < lastScrollY && currentScrollY > 50) {
        setIsScrollingUp(true);
      } else if (currentScrollY > lastScrollY) {
        setIsScrollingUp(false);
      }
      setLastScrollY(currentScrollY);

      // Section ground detection: sheets declare their ground via data-header-theme
      const themedSections = document.querySelectorAll<HTMLElement>("[data-header-theme]");
      let theme: "light" | "dark" | null = null;
      themedSections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Header height is roughly 80px. Check if header overlaps this section.
        if (rect.top <= 80 && rect.bottom >= 20) {
          theme = el.dataset.headerTheme === "light" ? "light" : "dark";
        }
      });
      setSectionTheme(theme);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", () => {
      updateViewportHeight();
      checkMobile();
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateViewportHeight);
    };
  }, [lastScrollY, isHomePage]);

  let headerStyle = "bg-[#fdfbf4]/80 backdrop-blur-md shadow-sm border-b border-accent/20";
  let textStyle = "text-gray-900";

  if (isHomePage) {
    const isAtTop = scrollY < 50;
    const isPastHero = scrollY > viewportHeight * 0.9;

    if (isMobile && isMobileMenuOpen && scrollY < viewportHeight) {
      headerStyle = "bg-primary-dark/80 backdrop-blur-md shadow-lg border-b border-accent/20";
      textStyle = "text-white";
    } else if (isAtTop) {
      headerStyle = "bg-transparent";
      textStyle = "text-accent";
    } else if (sectionTheme === "light") {
      // Force light style if we are in a light section
      headerStyle = "bg-[#fdfbf4]/80 backdrop-blur-md shadow-sm border-b border-accent/20";
      textStyle = "text-gray-900";
    } else if (isPastHero) {
      // General dark style for non-light sections past hero
      headerStyle = "bg-primary-dark/92 backdrop-blur-md shadow-lg border-b border-accent/20";
      textStyle = "text-gray-100";
    } else {
      // Still in hero but not at top
      headerStyle = "bg-primary-dark/85 backdrop-blur-md shadow-lg border-b border-accent/20";
      textStyle = "text-accent";
    }
  } else if (sectionTheme === "dark") {
    // Inner pages: match the header to whichever sheet sits under it
    headerStyle = "bg-primary-dark/92 backdrop-blur-md shadow-lg border-b border-accent/20";
    textStyle = "text-gray-100";
  }

  // Tier-based overrides
  if (tier === "low" || tier === "very-low" || tier === "mid") {
    headerStyle = headerStyle
      .replace("backdrop-blur-md", "")
      .replace("bg-[#fdfbf4]/80", tier === "very-low" ? "bg-[#fdfbf4]" : "bg-[#fdfbf4]/[0.97]")
      .replace("bg-primary-dark/80", tier === "very-low" ? "bg-primary-dark" : "bg-primary-dark/[0.97]")
      .replace("bg-primary-dark/85", tier === "very-low" ? "bg-primary-dark" : "bg-primary-dark/[0.97]")
      .replace("bg-primary-dark/92", tier === "very-low" ? "bg-primary-dark" : "bg-primary-dark/[0.97]")
      .trim();
  }

  // Everything except the solid-light ground reads as a dark ground for content colors
  const darkGround = textStyle !== "text-gray-900";
  const hairline = darkGround ? "border-white/10" : "border-black/10";

  return (
    <motion.header
      initial={noReveal ? { y: 0 } : { y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 ${noMotion ? "" : "transition-all duration-300"} ${headerStyle}`}
    >
      <nav className="max-w-[90rem] mx-auto px-5 sm:px-8 md:px-12 lg:px-16 xl:px-20" aria-label="Main Navigation">
        <div className="flex items-center justify-between h-20 relative">
          <Link href="/" className="flex items-center z-10 shrink-0" aria-label="Delphin Associates Home">
            <Image
              src="/logo.jpg"
              alt="Delphin Associates - Leading Civil Engineers and Contractors in Chennai, Tamil Nadu - Official Logo"
              width={200}
              height={70}
              className="h-12 md:h-14 w-auto object-contain shrink-0"
              style={{ width: "auto" }}
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation - numbered drawing index */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-7 lg:space-x-9">
            {navItems.filter((item) => item.name !== "Contact").map((item, index) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group relative flex items-baseline gap-1.5 text-[12px] font-bold uppercase tracking-[0.18em] ${
                    active ? "text-accent" : `${textStyle} ${noMotion ? "" : "transition-colors duration-300 hover:text-accent"}`
                  }`}
                >
                  <span
                    className={`font-display text-[9px] tracking-[0.1em] ${
                      active ? "text-accent" : darkGround ? "text-accent/60" : "text-accent-dark/60"
                    }`}
                    aria-hidden
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.name}
                  {/* Hover underline - simple grow allowed down to low tier */}
                  {!active && !noMotion && (
                    <span
                      className="absolute left-0 -bottom-1.5 w-full h-[2px] bg-accent/60 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300 ease-out"
                      aria-hidden
                    />
                  )}
                  {/* Active datum bar - animates between links on mid/high only */}
                  {active &&
                    (noLift ? (
                      <span className="absolute left-0 -bottom-1.5 w-full h-[2px] bg-accent" aria-hidden />
                    ) : (
                      <motion.span
                        layoutId="navbar-indicator"
                        className="absolute left-0 -bottom-1.5 w-full h-[2px] bg-accent"
                        aria-hidden
                      />
                    ))}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3 z-10">
            {/* Desktop stamp CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <StampButton
                href="https://delphinassociates-app.vercel.app/"
                external
                darkGround={darkGround}
                noMotion={noMotion}
                noLift={noLift}
                icon={<HardHat className="w-4 h-4" aria-hidden />}
              >
                Login
              </StampButton>
              <StampButton
                href="/contact"
                filled
                darkGround={darkGround}
                noMotion={noMotion}
                noLift={noLift}
                icon={<Phone className="w-4 h-4" aria-hidden />}
              >
                Contact Us
              </StampButton>
            </div>

            {/* Mobile menu button - drafting stamp */}
            <button
              className={`md:hidden w-10 h-10 flex items-center justify-center rounded-md border ${
                darkGround ? "border-white/25" : "border-black/15"
              } ${textStyle} ${noMotion ? "" : "transition-colors duration-300 hover:text-accent hover:border-accent/50"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: noLift ? 0 : 0.3 }}
              >
                {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
              </motion.div>
            </button>
          </div>
        </div>

        {/* Mobile drawer - numbered drawing index */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={noReveal ? { opacity: 1, height: "auto" } : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden overflow-hidden border-t-2 border-accent`}
            >
              {/* Sheet eyebrow */}
              <div className="flex items-center gap-3 pt-5 pb-1">
                <span className={`font-display font-bold text-[10px] tracking-[0.25em] uppercase ${darkGround ? "text-accent/70" : "text-accent-dark/70"}`}>
                  Index
                </span>
                <span className="h-[2px] w-10 bg-accent" aria-hidden></span>
                <span className={`text-[10px] font-bold tracking-[0.25em] uppercase ${darkGround ? "text-white/40" : "text-gray-500"}`}>
                  Delphin Associates
                </span>
              </div>

              <div className="flex flex-col pb-6">
                {navItems.filter((item) => item.name !== "Contact").map((item, i) => {
                  const active = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={noReveal ? { opacity: 1 } : { opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: noReveal ? 0 : i * 0.05 + 0.1 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className={`flex items-center gap-4 py-4 border-b ${hairline} ${
                          active ? "text-accent" : `${textStyle} ${noMotion ? "" : "transition-colors duration-300 hover:text-accent"}`
                        }`}
                      >
                        <span
                          className={`font-display font-bold text-[11px] tracking-[0.1em] w-7 ${
                            active ? "text-accent" : darkGround ? "text-accent/60" : "text-accent-dark/60"
                          }`}
                          aria-hidden
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="text-[13px] font-bold uppercase tracking-[0.18em]">{item.name}</span>
                        {active && <span className="ml-auto w-1.5 h-1.5 rotate-45 bg-accent" aria-hidden />}
                      </Link>
                    </motion.div>
                  );
                })}

                <motion.div
                  initial={noReveal ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: noReveal ? 0 : 0.3 }}
                  className="pt-5 grid grid-cols-2 gap-3"
                >
                  <StampButton
                    href="https://delphinassociates-app.vercel.app/"
                    external
                    darkGround={darkGround}
                    noMotion={noMotion}
                    noLift={noLift}
                    icon={<HardHat className="w-4 h-4" aria-hidden />}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full"
                  >
                    Login
                  </StampButton>
                  <StampButton
                    href="/contact"
                    filled
                    darkGround={darkGround}
                    noMotion={noMotion}
                    noLift={noLift}
                    icon={<Phone className="w-4 h-4" aria-hidden />}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-full"
                  >
                    Contact Us
                  </StampButton>
                </motion.div>

                {/* Sheet footer line */}
                <div className="mt-6 flex items-center justify-center gap-3">
                  <span className="w-1.5 h-1.5 rotate-45 bg-accent/60" aria-hidden />
                  <span className={`text-[9px] font-bold uppercase tracking-[0.3em] ${darkGround ? "text-white/35" : "text-gray-400"}`}>
                    Est. 1999 - Chennai, Tamil Nadu
                  </span>
                  <span className="w-1.5 h-1.5 rotate-45 bg-accent/60" aria-hidden />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
