"use client";

import { useHPOE } from "@/components/HPOE";
import GeometricParticleField from "@/components/ui/GeometricParticleField";

export default function GlobalParticleNetwork() {
  const { tier, reducedMotion } = useHPOE();

  if (tier !== "high" || reducedMotion) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <GeometricParticleField 
        quantity={150} 
        color="#D4AF37"
        className="fixed inset-0 w-full h-full pointer-events-none"
        staticity={40}
      />
    </div>
  );
}
