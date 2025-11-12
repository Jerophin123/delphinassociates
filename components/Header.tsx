"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
  
  let headerStyle = "bg-white shadow-md";
  let textStyle = "text-gray-700";

  // Only apply video/scroll-based styling on home page
  if (isHomePage) {
    const isAtTop = scrollY < 50;
    const isAtHeroEnd = scrollY >= viewportHeight * 0.7 && scrollY <= viewportHeight * 1.1;
    const isPastHero = scrollY > viewportHeight * 1.1;

    // Check if mobile menu is open on mobile in hero section
    if (isMobile && isMobileMenuOpen && isInHeroSection) {
      // Mobile menu open in hero section - translucent background
      headerStyle = "bg-primary-dark/80 backdrop-blur-md shadow-lg border-b border-white/10";
      textStyle = "text-white";
    } else if (isAtTop) {
      // At the very top of the page - fully transparent
      headerStyle = "bg-transparent";
      textStyle = "text-white";
    } else if (isPastHero) {
      // Past the hero section - white background to match content sections
      headerStyle = "bg-white shadow-md";
      textStyle = "text-gray-700";
    } else if (isAtHeroEnd) {
      // At the end of hero section - blend with video overlay (dark blue)
      headerStyle = "bg-primary-dark/95 backdrop-blur-md shadow-lg border-b border-white/10";
      textStyle = "text-white";
    } else if (isScrollingUp && scrollY > viewportHeight * 0.5) {
      // Scrolling up from lower part of hero section - white background
      headerStyle = "bg-white shadow-md";
      textStyle = "text-gray-700";
    } else {
      // Default: scrolling down within hero - transparent
      headerStyle = "bg-transparent";
      textStyle = "text-white";
    }
  }
  // For all other pages, navbar is always white

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${headerStyle}`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex items-center">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? "text-accent"
                    : `${textStyle} hover:text-accent`
                }`}
              >
                {item.name}
                {pathname === item.href && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent"
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden p-2 ${textStyle} hover:text-accent transition-colors`}
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

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden pb-4"
            >
              <div className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-base font-medium ${
                      pathname === item.href
                        ? "text-accent"
                        : textStyle
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
}
