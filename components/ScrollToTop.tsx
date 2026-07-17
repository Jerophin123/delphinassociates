"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useHPOE } from "./HPOE";

export default function ScrollToTop() {
  const { tier, reducedMotion } = useHPOE();
  const isStatic = tier === "low" || tier === "very-low" || reducedMotion;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
      <AnimatePresence>
        {isVisible && (
          // Engineer's-stamp control - tier materials match the app bar
          <motion.button
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            whileHover={isStatic ? undefined : { scale: 1.08, y: -2 }}
            whileTap={{ scale: 0.92 }}
            onClick={scrollToTop}
            className={`pointer-events-auto w-10 h-10 rounded-xl border p-[2px] border-accent/70 ${
              isStatic ? '' : 'shadow-[0_6px_18px_rgba(212,175,55,0.3)]'
            }`}
            aria-label="Scroll to top"
          >
            <span
              className={`flex items-center justify-center w-full h-full rounded-[10px] border ${
                tier === 'high' && !reducedMotion
                  ? 'liquid-glass-chip gold-breathe backdrop-blur-md bg-accent/25 border-accent/40 text-accent shadow-[inset_0_1px_1px_rgba(255,255,255,0.35)]'
                  : tier === 'mid' && !reducedMotion
                  ? 'bg-gradient-to-br from-[#F0D264] via-accent to-[#B8942C] border-accent/40 text-black'
                  : 'bg-accent border-black/10 text-black'
              }`}
            >
              <ChevronUp className="w-5 h-5" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
