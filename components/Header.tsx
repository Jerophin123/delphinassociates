"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone } from "lucide-react";
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

export default function Header() {
  const [scrollY, setScrollY] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(1000);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const pathname = usePathname();
  const [isLightHomeSection, setIsLightHomeSection] = useState(false);
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === "high" && !reducedMotion;

  useEffect(() => {
    const updateViewportHeight = () => {
      setViewportHeight(window.innerHeight);
    };
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // md breakpoint
    };
    
    const handleResize = () => {
      updateViewportHeight();
      checkMobile();
    };
    
    updateViewportHeight();
    checkMobile();
    window.addEventListener("resize", handleResize);
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      setScrollY(currentScrollY);
      
      // Detect scroll direction
      if (currentScrollY < lastScrollY && currentScrollY > 50) {
        setIsScrollingUp(true);
      } else if (currentScrollY > lastScrollY) {
        setIsScrollingUp(false);
      }
      
      setLastScrollY(currentScrollY);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
    };
  }, [lastScrollY]);

  // Determine header style based on scroll state and current page
  const isHomePage = pathname === "/";
  const isInHeroSection = scrollY < viewportHeight * 1.1;

  useEffect(() => {
    if (!isHomePage) return;

    const lightIds = new Set(["home-project-highlights", "home-cta-section"]);
    const ratiosById: Record<string, number> = {};

    const targets = Array.from(lightIds)
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          ratiosById[id] = entry.isIntersecting ? entry.intersectionRatio : 0;
        }

        const nextIsLight = Array.from(lightIds).some((id) => (ratiosById[id] ?? 0) >= 0.18);
        setIsLightHomeSection(nextIsLight);
      },
      {
        threshold: [0, 0.12, 0.18, 0.25, 0.35, 0.5],
      }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [isHomePage]);
  
  let headerStyle =
    "bg-[#fdfbf4]/80 backdrop-blur-md shadow-sm border-b border-accent/20";
  let textStyle = "text-gray-900";

  // Only apply video/scroll-based styling on home page
  if (isHomePage) {
    const isAtTop = scrollY < 50;
    const isAtHeroEnd = scrollY >= viewportHeight * 0.7 && scrollY <= viewportHeight * 1.1;
    const isPastHero = scrollY > viewportHeight * 1.1;

    // Check if mobile menu is open on mobile in hero section
    if (isMobile && isMobileMenuOpen && isInHeroSection) {
      // Mobile menu open in hero section - translucent background
      headerStyle =
        "bg-primary-dark/80 backdrop-blur-md shadow-lg border-b border-accent/20";
      textStyle = "text-white";
    } else if (isAtTop) {
      // At the very top of the page - fully transparent
      headerStyle = "bg-transparent";
      textStyle = "text-accent";
    } else if (isPastHero) {
      // Past the hero section - white background to match content sections
      headerStyle =
        isLightHomeSection
          ? "bg-[#fdfbf4]/80 backdrop-blur-md shadow-sm border-b border-accent/20"
          : "bg-primary-dark/92 backdrop-blur-md shadow-lg border-b border-accent/20";
      textStyle = isLightHomeSection ? "text-gray-900" : "text-gray-100";
    } else if (isAtHeroEnd) {
      // At the end of hero section - blend with video overlay (dark blue)
      headerStyle =
        "bg-primary-dark/85 backdrop-blur-md shadow-lg border-b border-accent/20";
      textStyle = "text-accent";
    } else if (isScrollingUp && scrollY > viewportHeight * 0.5) {
      // Scrolling up from lower part of hero section - white background
      headerStyle =
        isLightHomeSection
          ? "bg-[#fdfbf4]/80 backdrop-blur-md shadow-sm border-b border-accent/20"
          : "bg-primary-dark/92 backdrop-blur-md shadow-lg border-b border-accent/20";
      textStyle = isLightHomeSection ? "text-gray-900" : "text-gray-100";
    } else {
      // Default: scrolling down within hero - transparent
      headerStyle = "bg-transparent";
      textStyle = "text-accent";
    }
  }
  // For all other pages, navbar stays white glass

   if (tier === "low" || tier === "very-low" || tier === "mid") {
     headerStyle = headerStyle
       .replace("backdrop-blur-md", "")
       .replace("bg-[#fdfbf4]/80", tier === "very-low" ? "bg-[#fdfbf4]" : "bg-[#fdfbf4]/[0.97]")
       .replace("bg-primary-dark/80", tier === "very-low" ? "bg-primary-dark" : "bg-primary-dark/[0.97]")
       .replace("bg-primary-dark/85", tier === "very-low" ? "bg-primary-dark" : "bg-primary-dark/[0.97]")
       .replace("bg-primary-dark/92", tier === "very-low" ? "bg-primary-dark" : "bg-primary-dark/[0.97]")
       .trim();
   }

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerStyle}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 relative">
          <Link href="/" className="flex items-center z-10">
            <Image
              src="/logo.jpg"
              alt="Delphin Associates Logo"
              width={200}
              height={70}
              className="h-12 md:h-14 w-auto object-contain"
              priority
              unoptimized
            />
          </Link>

          {/* Desktop Navigation - Centered */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 items-center space-x-8">
            {navItems.filter(item => item.name !== "Contact").map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`group relative text-[13px] font-bold uppercase tracking-[0.15em] transition-colors duration-300 ease-out ${
                  pathname === item.href
                    ? "text-accent"
                    : `${textStyle} hover:text-accent`
                } hover:drop-shadow-[0_0_14px_rgba(212,175,55,0.25)] after:absolute after:left-0 after:bottom-[-0.25rem] after:h-[2px] after:w-full after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-accent after:to-accent-light after:transition-transform after:duration-300 after:ease-out group-hover:after:scale-x-100`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent to-accent-light shadow-[0_0_14px_rgba(212,175,55,0.35)]"
                  />
                )}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 z-10">
            {/* Desktop Contact Nav */}
            <div className="hidden md:flex items-center">
              <Link
                href="/contact"
                className={`group relative inline-flex items-center justify-center px-5 py-2.5 font-bold text-sm text-black transition-all duration-300 bg-accent rounded-xl hover:bg-accent-light hover:shadow-xl ${tier === 'low' || tier === 'very-low' ? '' : 'hover:shadow-accent/20'} overflow-hidden border border-transparent ${isHigh ? 'liquid-glass-btn-accent-invert' : tier === 'mid' && !reducedMotion ? 'mid-glass-btn-accent-invert' : ''}`}
                style={{ transform: 'translateZ(0)' }}
              >
                <span className={`relative z-10 flex items-center gap-2 uppercase tracking-wider ${isHigh ? '!text-accent' : ''}`}>
                  <Phone className={`w-4 h-4 ${tier === 'low' || tier === 'very-low' ? '' : 'group-hover:scale-110 group-hover:-rotate-3'} transition-transform duration-300 ease-out`} />
                  Contact us
                </span>
                {isHigh && <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0" />}
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className={`md:hidden w-10 h-10 flex items-center justify-center ${textStyle} hover:text-accent transition-colors`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <motion.div
                animate={isMobileMenuOpen ? { rotate: 90 } : { rotate: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </motion.div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden overflow-hidden mt-4 pt-2 pb-6 border-t ${tier === 'high' ? 'border-white/10' : 'border-black/5'}`}
            >
              <div className="flex flex-col space-y-1">
                {navItems.filter((item) => item.name !== "Contact").map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={reducedMotion ? { opacity: 1 } : { opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reducedMotion ? 0 : i * 0.05 + 0.1 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`block px-4 py-3.5 text-[13px] font-bold uppercase tracking-[0.15em] rounded-xl transition-all ${
                        pathname === item.href
                          ? "bg-accent/10 text-accent"
                          : `${textStyle} hover:bg-black/5 hover:text-accent`
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  initial={reducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reducedMotion ? 0 : 0.3 }}
                  className="pt-4 px-2"
                >
                  <Link
                    href="/contact"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`group relative flex items-center justify-center w-full px-5 py-3 font-bold text-sm text-black transition-all duration-300 bg-accent rounded-xl hover:bg-accent-light hover:shadow-xl ${tier === 'low' || tier === 'very-low' ? '' : 'shadow-lg shadow-accent/20 hover:shadow-accent/40'} overflow-hidden border border-transparent ${isHigh ? 'liquid-glass-btn-accent-invert' : tier === 'mid' && !reducedMotion ? 'mid-glass-btn-accent-invert' : ''}`}
                    style={{ transform: 'translateZ(0)' }}
                  >
                    <span className={`relative z-10 flex items-center gap-2 uppercase tracking-wider ${isHigh ? '!text-accent' : ''}`}>
                      <Phone className={`w-4 h-4 ${tier === 'low' || tier === 'very-low' ? '' : 'group-hover:scale-110 group-hover:-rotate-3'} transition-transform duration-300 ease-out`} />
                      Contact us
                    </span>
                    {isHigh && <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-0" />}
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
