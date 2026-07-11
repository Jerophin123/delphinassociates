"use client";

import { useEffect } from "react";
import type { LiquidGlassInstance } from "@/lib/liquid-glass";
import { useHPOE } from "./HPOE";

/**
 * HIGH TIER ONLY: upgrades every CSS glass card on the page to REAL
 * liquid-glass refraction (vendored liquid-glass.js - SVG displacement
 * backdrop-filter with prism fringe; frosted fallback on Safari/Firefox).
 *
 * The `.liquid-glass-card*` classes provide only the material dressing
 * (tint, highlights, border) - this manager owns the optics, attaching
 * per-element instances and tearing them down as React swaps DOM nodes
 * or the HPOE watchdog demotes the tier.
 *
 * Per the module's guidance: cards use the subtle tuning (scale −60,
 * chroma 4) and elements larger than ~900px per side are skipped
 * (per-frame GPU cost grows with filtered area).
 */

const SELECTOR = ".liquid-glass-card, .liquid-glass-card-light, .liquid-glass-card-dark";

export default function LiquidGlassManager() {
  const { tier, reducedMotion } = useHPOE();
  const enabled = tier === "high" && !reducedMotion;

  useEffect(() => {
    if (!enabled) return;

    let disposed = false;
    let lg: typeof import("@/lib/liquid-glass").default | null = null;
    let mo: MutationObserver | null = null;
    const instances = new Map<HTMLElement, LiquidGlassInstance>();

    const attach = (el: HTMLElement) => {
      if (!lg || instances.has(el)) return;
      const w = el.offsetWidth;
      const h = el.offsetHeight;
      if (!w || !h) return; // not laid out yet; a later mutation will retry
      if (w > 900 && h > 900) return; // too large for a per-frame GPU filter
      instances.set(el, lg(el, { scale: -60, chroma: 4, blur: 4, mapBlur: 12, saturate: 1.4 }));
    };

    const scan = (root: ParentNode) => {
      root.querySelectorAll?.(SELECTOR).forEach((node) => attach(node as HTMLElement));
    };

    import("@/lib/liquid-glass").then((m) => {
      if (disposed) return;
      lg = m.default;
      scan(document);

      // Follow React: attach to glass cards as they mount, release as they unmount
      mo = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType !== 1) return;
            const el = node as HTMLElement;
            if (el.matches?.(SELECTOR)) attach(el);
            scan(el);
          });
          mutation.removedNodes.forEach((node) => {
            if (node.nodeType !== 1) return;
            const el = node as HTMLElement;
            instances.forEach((instance, target) => {
              if (el === target || el.contains(target)) {
                instance.destroy();
                instances.delete(target);
              }
            });
          });
        }
      });
      mo.observe(document.body, { childList: true, subtree: true });
    });

    return () => {
      disposed = true;
      mo?.disconnect();
      instances.forEach((instance) => instance.destroy());
      instances.clear();
    };
  }, [enabled]);

  return null;
}
