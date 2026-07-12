"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { Loader2 } from "lucide-react";
import { classifyHardware, type HPOETier, type HardwareSpecs } from "@/lib/hpoe-classifier";

export type { HPOETier, HardwareSpecs } from "@/lib/hpoe-classifier";

interface HPOEContextProps {
  tier: HPOETier;
  reducedMotion: boolean;
  gpuInfo: string | null;
  coreCount: number;
  hardwareSpecs: HardwareSpecs | null;
  isInitialized: boolean;
}

const HPOEContext = createContext<HPOEContextProps>({
  tier: "high", // Defaults to high to ensure splash screen has blur on mount
  reducedMotion: false,
  gpuInfo: null,
  coreCount: 4,
  hardwareSpecs: null,
  isInitialized: false,
});

export const useHPOE = () => useContext(HPOEContext);

export function HPOE({ children }: { children: ReactNode }) {
  const [metrics, setMetrics] = useState<HPOEContextProps>({
    tier: "high",
    reducedMotion: false,
    gpuInfo: null,
    coreCount: 4,
    hardwareSpecs: null,
    isInitialized: false,
  });

  const [isMounted, setIsMounted] = useState(false);

  const currentTierRef = useRef<HPOETier>("high");

  useEffect(() => {
    setIsMounted(true);

    try {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coreCount = navigator.hardwareConcurrency || 4;
      // @ts-ignore
      const memory = navigator.deviceMemory || 4;

      let gpuInfo = "Unknown GPU";
      let maxTextureSize = 0;
      let webgl2 = false;
      const canvas = document.createElement("canvas");
      // iPadOS 13+ masquerades as desktop Safari ("Macintosh") but is still a
      // passively-cooled tablet — multi-touch on a Mac UA gives it away.
      const isIPadOS = navigator.maxTouchPoints > 1 && /macintosh/i.test(navigator.userAgent);
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || isIPadOS;

      let gl: WebGLRenderingContext | null = null;
      try {
        gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext;
        if (gl) {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
          let unmaskedRenderer = "";
          if (debugInfo) {
            unmaskedRenderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string || "";
          }

          const standardRenderer = gl.getParameter(gl.RENDERER) as string || "";

          // Keep both WEBGL_debug_renderer_info and standard RENDERER working at the same time
          gpuInfo = `${unmaskedRenderer} ${standardRenderer}`.trim() || "Unknown GPU";

          maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        }
      } catch (e) {}
      try {
        webgl2 = !!document.createElement("canvas").getContext("webgl2");
      } catch (e) {}

      // ---------------------------------------------------------
      // HEURISTIC GPU/CPU CLASSIFICATION
      // The full matrix lives in lib/hpoe-classifier.ts: per-vendor numeric
      // generation parsing (open-ended for future silicon), laptop/desktop
      // form-factor detection, software/VM renderer handling, and a
      // capability-probe fallback for unknown vendors.
      // ---------------------------------------------------------
      const classification = classifyHardware({
        renderer: gpuInfo,
        coreCount,
        memory,
        maxTextureSize,
        webgl2,
        isMobileDevice,
      });
      const specs = classification.specs;
      const renderer = classification.normalizedRenderer;
      let calculatedTier: HPOETier = classification.tier;

      // Hard limits and Accessibility Overrides
      if (prefersReducedMotion) {
        calculatedTier = "low";
      } else if (memory < 3 || coreCount < 3) {
        calculatedTier = "very-low";
      } else if (memory <= 3 && calculatedTier === "high") {
        // <=3GB memory can't sustain high-tier backdrop-blur stacks; cap at mid
        calculatedTier = "mid";
      }

      // Absolute fail-safe: Mobile devices NEVER get "High" tier effects.
      // Even with elite processors (Snapdragon 8 Elite, Exynos 2400), complex CSS blurs
      // will aggressively thermal throttle the mobile chip. We strictly cap them at Mid.
      if (isMobileDevice && calculatedTier === "high") {
        calculatedTier = "mid";
      }

      // Developer/Testing Overrides via URL parameters:
      //   ?forceTier=high|mid|low|very-low - pin the tier for testing.
      //     A forced tier also disables the FPS watchdog downgrade, so the
      //     tier under test stays exactly as requested.
      //   ?disableDowngrade=true - keep the detected tier but disable the
      //     watchdog demotion on its own.
      const matchTier = window.location.search.match(/[?&]forceTier=(high|mid|low|very-low)/);
      const tierForced = !!matchTier;
      const downgradeDisabled = tierForced || window.location.search.includes("disableDowngrade=true");
      if (matchTier) {
        calculatedTier = matchTier[1] as HPOETier;
        console.info(`[Hardware Profiler] Tier forcefully overridden to: ${calculatedTier} (watchdog downgrade disabled).`);
      } else if (downgradeDisabled) {
        console.info("[Hardware Profiler] Watchdog downgrade disabled via ?disableDowngrade=true.");
      }

      currentTierRef.current = calculatedTier;

      // Extremely subtle animations mode: forcefully enable reducedMotion for very-low tier
      const finalReducedMotion = prefersReducedMotion || calculatedTier === "very-low";

      setMetrics({
        tier: calculatedTier,
        reducedMotion: finalReducedMotion,
        gpuInfo: renderer !== "unknown" && renderer !== "unknown gpu" ? gpuInfo : "Hardware Masked",
        coreCount,
        hardwareSpecs: specs,
        isInitialized: false,
      });

      const initTimeout = setTimeout(() => {
        setMetrics(prev => ({ ...prev, isInitialized: true }));
      }, 50);

      // ---------------------------------------------------------
      // LIVE V-SYNC DEGRADATION MONITOR (FPS SAFETY NET)
      // Tuned to avoid false-positive downgrades on mid-tier hardware
      // ---------------------------------------------------------
      if (calculatedTier !== "low" && calculatedTier !== "very-low" && !prefersReducedMotion) {
        let frameCount = 0;
        let lastTime = performance.now();
        const startTime = performance.now();
        let animationFrameId: number;
        let sustainedDropTicks = 0;

        // Adaptive thresholds: mid-tier naturally runs 40-55 FPS; only react to genuine sustained drops
        const gracePeriodMs = 6000; // Ignore the settle window (hydration, image decode, entrance choreography)

        let baselineFpsMeasurements: number[] = [];
        let detectedBaselineFps = 60; // Assume standard 60fps by default
        let midSessionBatterySaverTicks = 0;
        let isBaselineLocked = false;

        let previousFrameTime = performance.now();
        let maxFrameDelta = 0; // Tracks maximum MS between consecutive frames

        // Tab switches pause rAF and produce a huge phantom frame delta on
        // return — never count that second as evidence against the hardware.
        let skipUntil = 0;
        const onVisibility = () => {
          if (!document.hidden) {
            skipUntil = performance.now() + 1500;
            sustainedDropTicks = 0;
            frameCount = 0;
            lastTime = performance.now();
            previousFrameTime = lastTime;
            maxFrameDelta = 0;
          }
        };
        document.addEventListener("visibilitychange", onVisibility);

        const measureFPS = (currentTime: number) => {
          if (document.hidden || currentTime < skipUntil) {
            frameCount = 0;
            lastTime = currentTime;
            previousFrameTime = currentTime;
            maxFrameDelta = 0;
            animationFrameId = requestAnimationFrame(measureFPS);
            return;
          }
          frameCount++;

          const frameDelta = currentTime - previousFrameTime;
          if (frameDelta > maxFrameDelta) {
             maxFrameDelta = frameDelta;
          }
          previousFrameTime = currentTime;
          if (currentTime - lastTime >= 1000) {
            const fps = frameCount;
            const elapsed = currentTime - startTime;

            if (elapsed <= gracePeriodMs) {
              // Wait for initial hydration to clear, then sample naturally achievable FPS
              if (elapsed > 1000 && fps > 0) {
                baselineFpsMeasurements.push(fps);
              }
            } else {
              // Lock in baseline detection once grace period concludes
              if (baselineFpsMeasurements.length > 0 && !isBaselineLocked) {
                const avg = baselineFpsMeasurements.reduce((a, b) => a + b, 0) / baselineFpsMeasurements.length;

                if (avg > 65) {
                  detectedBaselineFps = Math.round(avg);
                  console.info(`[Hardware Profiler] Uncapped high refresh rate detected (~${detectedBaselineFps}Hz). Optimizing threshold for infinite-refresh smoothness.`);
                } else if (avg >= 28 && avg <= 34 && maxFrameDelta < 45) {
                  detectedBaselineFps = 30;
                  console.info("[Hardware Profiler] Stable 30fps pacing with low jitter detected (Battery Saver/30Hz). Re-calibrating.");
                } else {
                  detectedBaselineFps = 60;
                }
                isBaselineLocked = true;
              }

              // Dynamic MID-SESSION Battery Saver Detection (User toggles mode on/off after loading)
              if (detectedBaselineFps >= 60 && fps >= 28 && fps <= 33 && maxFrameDelta < 45) {
                 midSessionBatterySaverTicks++;
                 if (midSessionBatterySaverTicks >= 2) {
                    detectedBaselineFps = 30;
                    console.info("[Hardware Profiler] Mid-session Battery Saver activated. Stable 30fps pacing detected. Modifying limits.");
                    sustainedDropTicks = 0; // Wipe lag penalties incurred during the detection phase
                 }
              } else if (detectedBaselineFps === 30 && fps >= 45) {
                 detectedBaselineFps = fps > 65 ? Math.round(fps) : 60;
                 console.info(`[Hardware Profiler] Mid-session Battery Saver disabled. ${detectedBaselineFps}fps cap restored.`);
                 sustainedDropTicks = 0;
                 midSessionBatterySaverTicks = 0;
              } else {
                 if (detectedBaselineFps >= 60 && (fps < 28 || fps > 33 || maxFrameDelta >= 45)) {
                   midSessionBatterySaverTicks = Math.max(0, midSessionBatterySaverTicks - 1);
                 }
              }

              const currentTier = currentTierRef.current;
              let currentFpsFloor;

              if (detectedBaselineFps === 30) {
                // Battery Saver Mode active: Re-assign the thresholds to avoid aggressively killing animations
                // The device can easily handle mid-tier glass, it is just artificially clipped by the OS.
                currentFpsFloor = 22;
              } else {
                // This logic is followed universally regardless of what display type is running (60Hz -> 700Hz+)
                // Drop below 40 FPS for 3 consecutive seconds
                currentFpsFloor = 40;
              }

              // Five sustained bad seconds before demoting: capable hardware
              // hitting a transient spike (route change, image decode, GC)
              // must not lose its tier. Good seconds heal at double rate.
              const currentRequiredDropTicks = 5;

              if (fps < currentFpsFloor) {
                sustainedDropTicks++;
              } else {
                sustainedDropTicks = Math.max(0, sustainedDropTicks - 2);
              }

              if (sustainedDropTicks >= currentRequiredDropTicks && !downgradeDisabled) {
                let downgradeTarget: HPOETier = "low";
                if (currentTier === "high") downgradeTarget = "mid";
                else if (currentTier === "mid") downgradeTarget = "low";
                else if (currentTier === "low") downgradeTarget = "very-low";

                console.warn(`[Hardware Profiler] Thermal Throttling / Resource Limit Detected (${fps} FPS, floor ${currentFpsFloor}, ${sustainedDropTicks}/${currentRequiredDropTicks} ticks). Emergency Downgrading to Tier: ${downgradeTarget}.`);

                currentTierRef.current = downgradeTarget;

                // Defer state update to prevent Next.js/React re-render conflict inside requestAnimationFrame
                setTimeout(() => {
                  setMetrics(prev => ({ ...prev, tier: downgradeTarget }));
                }, 0);

                sustainedDropTicks = 0;

                if (downgradeTarget === "very-low") {
                  return; // Reached rock bottom, stop measuring
                }
              }
            }

            frameCount = 0;
            lastTime = currentTime;
            maxFrameDelta = 0; // Reset jitter tracking for the next second
          }
          animationFrameId = requestAnimationFrame(measureFPS);
        };

        animationFrameId = requestAnimationFrame(measureFPS);
        return () => {
          cancelAnimationFrame(animationFrameId);
          document.removeEventListener("visibilitychange", onVisibility);
          clearTimeout(initTimeout);
        };
      }

      return () => clearTimeout(initTimeout);
    } catch (e) {
        console.warn("Performance Profiler encountered an error:", e);
    }
  }, []);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.tier = metrics.tier;
      document.documentElement.dataset.reducedMotion = metrics.reducedMotion.toString();
    }
  }, [metrics.tier, metrics.reducedMotion]);

  return (
    <HPOEContext.Provider value={metrics}>
      {/* metrics.reducedMotion is fixed at initial detection. Keying MotionConfig
          off the LIVE tier caused DOM removeChild crashes: a mid-session watchdog
          downgrade to very-low flipped animation behavior while AnimatePresence
          exit nodes were in flight, orphaning them. */}
      <MotionConfig reducedMotion={metrics.reducedMotion ? 'always' : 'user'}>
        <AnimatePresence>
          {!metrics.isInitialized && (
            <motion.div
              key="performance-splash"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background select-none`}
            >
              <div className="relative mb-8 w-32 h-32 md:w-48 md:h-48 overflow-hidden rounded-full shadow-2xl ring-4 ring-primary/10">
                <Image
                  src="/splash.png"
                  alt="Delphin Associates Splash"
                  fill
                  sizes="(max-width: 768px) 128px, 192px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col items-center gap-4">
                <div className="animate-spin">
                  <Loader2 className="w-8 h-8 text-primary" />
                </div>
                <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase opacity-80 animate-pulse">
                  Optimizing Experience
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {children}
      </MotionConfig>
    </HPOEContext.Provider>
  );
}
