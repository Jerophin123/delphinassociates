"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2 } from "lucide-react";

export type PerformanceTier = "high" | "mid" | "low";

interface HardwareSpecs {
  vendor: string;
  architecture: string;
  type: "Discrete" | "Integrated" | "Mobile" | "Unknown";
  estimatedClass: "High-End" | "Mid-Range" | "Budget/Legacy" | "Unknown";
}

interface PerformanceContextProps {
  tier: PerformanceTier;
  reducedMotion: boolean;
  gpuInfo: string | null;
  coreCount: number;
  hardwareSpecs: HardwareSpecs | null;
  isInitialized: boolean;
}

const PerformanceContext = createContext<PerformanceContextProps>({
  tier: "low", // Defaults to low (Progressive Enhancement) for instant mobile hydration
  reducedMotion: false,
  gpuInfo: null,
  coreCount: 4,
  hardwareSpecs: null,
  isInitialized: false,
});

export const usePerformance = () => useContext(PerformanceContext);

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [metrics, setMetrics] = useState<PerformanceContextProps>({
    tier: "low",
    reducedMotion: false,
    gpuInfo: null,
    coreCount: 4,
    hardwareSpecs: null,
    isInitialized: false,
  });

  const currentTierRef = useRef<PerformanceTier>("low");

  useEffect(() => {
    try {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const coreCount = navigator.hardwareConcurrency || 4;
      // @ts-ignore
      const memory = navigator.deviceMemory || 4; 

      let gpuInfo = "Unknown GPU";
      let maxTextureSize = 0;
      const canvas = document.createElement("canvas");
      let gl: WebGLRenderingContext | null = null;
      try {
        gl = (canvas.getContext("webgl") || canvas.getContext("experimental-webgl")) as WebGLRenderingContext;
        if (gl) {
          const debugInfo = gl.getExtension("WEBGL_debug_renderer_info");
          if (debugInfo) {
            gpuInfo = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) as string;
          }
          maxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
        }
      } catch (e) {}

      // Strip trademarks like (R) or (TM) that break rigid regex matching
      const renderer = gpuInfo.toLowerCase().replace(/\((r|tm)\)/g, '').replace(/graphics/g, '').trim();
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      let calculatedTier: PerformanceTier = "high";
      let specs: HardwareSpecs = {
        vendor: "Unknown",
        architecture: "Unknown",
        type: "Unknown",
        estimatedClass: "Unknown",
      };

      // ---------------------------------------------------------
      // MASSIVE HEURISTIC GPU CLASSIFICATION MATRIX
      // ---------------------------------------------------------

      // 1. APPLE SILICON & A-SERIES
      if (renderer.includes("apple")) {
        specs.vendor = "Apple";
        if (/m[1-9]/.test(renderer)) {
          specs.architecture = "M-Series Silicon";
          specs.type = "Integrated";
          specs.estimatedClass = renderer.includes("max") || renderer.includes("pro") || renderer.includes("ultra") ? "High-End" : "Mid-Range";
          calculatedTier = specs.estimatedClass === "High-End" ? "high" : "mid"; 
        } else {
          specs.architecture = "A-Series Silicon";
          specs.type = "Mobile";
          specs.estimatedClass = "Mid-Range"; 
          calculatedTier = "mid"; 
        }
      } 
      // 2. NVIDIA DESKTOP & LAPTOP
      else if (renderer.includes("nvidia") || renderer.includes("geforce") || renderer.includes("quadro")) {
        specs.vendor = "NVIDIA";
        specs.type = "Discrete";
        
        if (/rtx\s*[2-9][0-9]{3}/.test(renderer) || /titan/.test(renderer) || /quadro\s*rtx/.test(renderer)) {
          specs.architecture = "RTX / Ampere / Ada / Turing";
          specs.estimatedClass = "High-End";
          calculatedTier = "high";
        } else if (/gtx\s*(?:10[6-9][0-9]|16[5-9][0-9]|9[8-9][0-9])/.test(renderer)) {
          specs.architecture = "GTX High/Mid";
          specs.estimatedClass = "High-End";
          calculatedTier = "high";
        } else if (/gtx\s*(?:1050|970|960|950|780)/.test(renderer)) {
          specs.architecture = "GTX Legacy Mid";
          specs.estimatedClass = "Mid-Range";
          calculatedTier = "mid";
        } else if (/gtx\s*(?:4|5|6)[0-9]{2}/.test(renderer) || /gt\s*[0-9]+/.test(renderer) || /[7-9][1-4]0m/.test(renderer) || /mx[1-4][0-9]{2}/.test(renderer)) {
          specs.architecture = "Legacy / Low-End Mobile (GT/MX)";
          specs.estimatedClass = "Budget/Legacy";
          calculatedTier = "low";
        } else {
          specs.architecture = "Unknown NVIDIA";
          specs.estimatedClass = "Mid-Range";
          calculatedTier = "mid";
        }
      }
      // 3. AMD RADEON
      else if (renderer.includes("amd") || renderer.includes("radeon")) {
        specs.vendor = "AMD";
        if (/rx\s*[5-8][0-9]{3}/.test(renderer) || /vega\s*(?:56|64)/.test(renderer) || /radeon\s*pro/.test(renderer)) {
          specs.architecture = "RDNA / High-End Vega";
          specs.type = "Discrete";
          specs.estimatedClass = "High-End";
          calculatedTier = "high";
        } else if (/rx\s*(?:4[0-9]{2}|5[7-9][0-9])/.test(renderer) || /6[6-9]0m/.test(renderer)) {
          specs.architecture = "Polaris / Modern APU";
          specs.type = "Integrated";
          specs.estimatedClass = "Mid-Range";
          calculatedTier = "mid";
        } else {
          specs.architecture = "Legacy GCN or Budget APU";
          specs.type = "Integrated";
          specs.estimatedClass = "Budget/Legacy";
          calculatedTier = "low";
        }
      }
      // 4. INTEL GRAPHICS
      else if (renderer.includes("intel")) {
        specs.vendor = "Intel";
        if (/arc\s*a[3-7][0-9]{2}/.test(renderer)) {
          specs.architecture = "Arc Alchemist";
          specs.type = "Discrete";
          specs.estimatedClass = "Mid-Range";
          calculatedTier = "mid"; // Intel drivers on WebGL are unreliable for complex CSS blurs
        } else if ((renderer.includes("iris") && renderer.includes("xe")) || /iris\s*(?:plus|pro)/.test(renderer)) {
          specs.architecture = "Iris Xe/Plus";
          specs.type = "Integrated";
          specs.estimatedClass = "Mid-Range";
          calculatedTier = "mid";
        } else /* HD, UHD, Generic Intel */ {
          specs.architecture = "UHD / HD Legacy";
          specs.type = "Integrated";
          specs.estimatedClass = "Budget/Legacy";
          calculatedTier = "low"; 
        }
      }
      // 5. QUALCOMM ADRENO (ANDROID)
      else if (renderer.includes("adreno")) {
        specs.vendor = "Qualcomm";
        specs.type = "Mobile";
        const match = renderer.match(/adreno\s*([0-9]{3})/);
        const series = match ? parseInt(match[1]) : 0;
        
        if (series >= 700 || series >= 650) {
          specs.architecture = `Adreno ${series}`;
          specs.estimatedClass = "Mid-Range"; // Mobile GPUs never get 'High' to prevent thermal throttling on 120px CSS blurs
          calculatedTier = "mid";
        } else if (series === 0 && coreCount >= 8 && maxTextureSize >= 8192) {
          // Fallback logic! If browser scrubbed the Adreno version number from string
          // but phone has 8 cores and supports heavy textures, it's a modern Snapdragon (Mid Tier).
          specs.architecture = `Modern Adreno (Masked)`;
          specs.estimatedClass = "Mid-Range";
          calculatedTier = "mid";
        } else {
          specs.architecture = `Adreno ${series || "Legacy"}`;
          specs.estimatedClass = "Budget/Legacy";
          calculatedTier = "low";
        }
      }
      // 6. ARM MALI (ANDROID)
      else if (renderer.includes("mali")) {
        specs.vendor = "ARM";
        specs.type = "Mobile";
        if (/g[7-9][0-9]/.test(renderer) || /immortalis/.test(renderer)) {
          specs.architecture = "Mali Valhall / Immortalis";
          specs.estimatedClass = "Mid-Range";
          calculatedTier = "mid";
        } else {
          specs.architecture = "Legacy Mali / Budget G-Series";
          specs.estimatedClass = "Budget/Legacy";
          calculatedTier = "low";
        }
      }
      // 7. POWERVR (OLDER IOS / MEDIATEK)
      else if (renderer.includes("powervr")) {
        specs.vendor = "Imagination Technologies";
        specs.type = "Mobile";
        specs.architecture = "PowerVR Rogue/SGX";
        specs.estimatedClass = "Budget/Legacy";
        calculatedTier = "low";
      }

      // Hard limits and Accessibility Overrides
      if (prefersReducedMotion) {
        calculatedTier = "low";
      } else if (coreCount <= 2 || memory <= 2) {
        calculatedTier = "low";
      }
      
      // Absolute fail-safe: Mobile devices NEVER get "High" tier effects
      // Glassmorphism over multiple layers brings even an iPhone 15 Pro to its knees in mobile Safari.
      if (isMobileDevice && calculatedTier === "high") {
        calculatedTier = "mid";
      }

      // Developer/Testing Override via URL parameter e.g., ?forceTier=high
      const urlParams = new URLSearchParams(window.location.search);
      const forceTier = urlParams.get('forceTier') as PerformanceTier | null;
      if (forceTier === 'high' || forceTier === 'mid' || forceTier === 'low') {
        calculatedTier = forceTier;
        console.info(`[Hardware Profiler] Tier forcefully overridden to: ${forceTier}`);
      }

      currentTierRef.current = calculatedTier;
      setMetrics({
        tier: calculatedTier,
        reducedMotion: prefersReducedMotion,
        gpuInfo: renderer !== "unknown gpu" ? gpuInfo : "Hardware Masked",
        coreCount,
        hardwareSpecs: specs,
        isInitialized: true,
      });

      // ---------------------------------------------------------
      // LIVE V-SYNC DEGRADATION MONITOR (FPS SAFETY NET)
      // ---------------------------------------------------------
      if (calculatedTier !== "low" && !prefersReducedMotion) {
        let frameCount = 0;
        let lastTime = performance.now();
        let animationFrameId: number;
        let sustainedDropTicks = 0;

        const measureFPS = (currentTime: number) => {
          frameCount++;
          if (currentTime - lastTime >= 1000) { 
            const fps = frameCount;
            // A perfect scrolling state is 60fps. < 45fps means visible stutter.
            if (fps < 45) {
               sustainedDropTicks++;
            } else {
               sustainedDropTicks = Math.max(0, sustainedDropTicks - 1);
            }

            // 3 consecutive seconds of < 45 FPS triggers an emergency downgrade
            if (sustainedDropTicks >= 3) {
              const downgradeTarget = currentTierRef.current === "high" ? "mid" : "low";
              console.warn(`[Hardware Profiler] Thermal Throttling / Resource Limit Detected (${fps} FPS). Emergency Downgrading to Tier: ${downgradeTarget}.`);
              
              currentTierRef.current = downgradeTarget;
              setMetrics(prev => ({ ...prev, tier: downgradeTarget }));
              
              if (downgradeTarget === "low") {
                cancelAnimationFrame(animationFrameId);
                return; // Reached rock bottom, stop measuring
              }
              sustainedDropTicks = 0; // reset for next tick
            }

            frameCount = 0;
            lastTime = currentTime;
          }
          animationFrameId = requestAnimationFrame(measureFPS);
        };

        animationFrameId = requestAnimationFrame(measureFPS);
        return () => cancelAnimationFrame(animationFrameId);
      }

    } catch (e) {
        console.warn("Performance Profiler encountered an error:", e);
    }
  }, []);

  return (
    <PerformanceContext.Provider value={metrics}>
      <AnimatePresence>
        {!metrics.isInitialized && (
          <motion.div
            key="performance-splash"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background/95 backdrop-blur-md select-none"
          >
            <div className="relative mb-8 w-32 h-32 md:w-48 md:h-48 overflow-hidden rounded-full shadow-2xl ring-4 ring-primary/10">
              <Image 
                src="/splash.png" 
                alt="Delphin Associates Splash" 
                fill 
                className="object-cover"
                priority
              />
            </div>
            
            <div className="flex flex-col items-center gap-4">
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              >
                <Loader2 className="w-8 h-8 text-primary" />
              </motion.div>
              <p className="text-sm font-medium tracking-widest text-muted-foreground uppercase opacity-80 animate-pulse">
                Optimizing Experience
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </PerformanceContext.Provider>
  );
}
