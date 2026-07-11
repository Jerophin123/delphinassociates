"use client";

import { useEffect, useRef } from "react";
import type { LiquidGlassOptions, LiquidGlassInstance } from "@/lib/liquid-glass";
import { useHPOE } from "../HPOE";

/**
 * Attaches the vendored liquid-glass refraction effect (SVG displacement
 * backdrop-filter) to the returned ref's element - HIGH TIER ONLY.
 * Real rim refraction on Chromium; the module applies a frosted-blur
 * fallback on Safari/Firefox. Mid/low/very-low never load the module and
 * keep their existing CSS treatments.
 */
export function useLiquidGlass<T extends HTMLElement>(options?: LiquidGlassOptions, active = true) {
  const { tier, reducedMotion } = useHPOE();
  const enabled = tier === "high" && !reducedMotion && active;
  const ref = useRef<T>(null);
  // Options are captured on first use; the effect is not re-created per render
  const optionsRef = useRef(options);
  optionsRef.current = options;

  useEffect(() => {
    if (!enabled) return;
    if (!ref.current) return;

    let instance: LiquidGlassInstance | undefined;
    let cancelled = false;

    import("@/lib/liquid-glass").then((m) => {
      if (cancelled || !ref.current) return;
      instance = m.default(ref.current, optionsRef.current);
    });

    return () => {
      cancelled = true;
      instance?.destroy();
    };
  }, [enabled]);

  return ref;
}
