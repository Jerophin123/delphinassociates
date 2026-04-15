"use client";

import React, { useEffect, useRef } from "react";
import { useHPOE } from "../HPOE";

export default function ParticleNetwork() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { tier, reducedMotion } = useHPOE();
  const isHigh = tier === 'high' && !reducedMotion;

  useEffect(() => {
    if (!isHigh) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let isHovering = false;

    // Start drawing particles on hover
    const startAnimation = () => {
      if (isHovering) return;
      isHovering = true;
      initParticles(); 
      animate();
    };

    // Kill the math loop precisely when mouse leaves to save battery
    const stopAnimation = () => {
      isHovering = false;
      cancelAnimationFrame(animationFrameId);
    };

    parent.addEventListener('mouseenter', startAnimation);
    parent.addEventListener('mouseleave', stopAnimation);

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      if (isHovering) {
        initParticles();
      }
    };

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.vx = (Math.random() - 0.5) * 0.9;
        this.vy = (Math.random() - 0.5) * 0.9;
        this.radius = Math.random() * 1.5 + 0.5;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas!.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas!.height) this.vy *= -1;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(202, 138, 4, 0.7)"; // Golden accent
        ctx.fill();
      }
    }

    const initParticles = () => {
      particles = [];
      const density = Math.min((canvas!.width * canvas!.height) / 6000, 50); // Frame density cap
      for (let i = 0; i < density; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      if (!isHovering) return;
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      
      particles.forEach((p) => {
        p.update();
        p.draw();
      });

      // Draw constellation connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 110) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(202, 138, 4, ${0.4 - distance / 275})`;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      parent.removeEventListener('mouseenter', startAnimation);
      parent.removeEventListener('mouseleave', stopAnimation);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHigh]);

  // Completely erase from DOM if not authorized by HPOE tier
  if (!isHigh) return null;

  return (
    <div className="absolute inset-0 z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700 overflow-hidden rounded-[2.5rem]">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
