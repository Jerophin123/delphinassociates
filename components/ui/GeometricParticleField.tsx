"use client";

import React, { useRef, useEffect, useState } from "react";
import { usePerformance } from "../PerformanceProvider";

interface GeometricParticleFieldProps {
  color?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  className?: string;
  refresh?: boolean;
}

export default function GeometricParticleField({
  color = "#D4AF37",
  quantity = 30,
  staticity = 50,
  ease = 50,
  className = "",
  refresh = false,
}: GeometricParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);
  const circles = useRef<any[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
  const { tier } = usePerformance();

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext("2d");
    }
    initCanvas();
    animate();
    window.addEventListener("resize", initCanvas);

    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, [tier]);

  useEffect(() => {
    initCanvas();
  }, [refresh]);

  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (canvasContainerRef.current) {
      const rect = canvasContainerRef.current.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }
  };

  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      circles.current = [];
      canvasSize.current.w = canvasContainerRef.current.offsetWidth;
      canvasSize.current.h = canvasContainerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
    }
  };

  type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
  };

  const circleParams = (): Circle => {
    const x = Math.floor(Math.random() * canvasSize.current.w);
    const y = Math.floor(Math.random() * canvasSize.current.h);
    const translateX = 0;
    const translateY = 0;
    const size = Math.floor(Math.random() * 2) + 1;
    const alpha = 0;
    const targetAlpha = parseFloat((Math.random() * 0.6 + 0.1).toFixed(1));
    const dx = (Math.random() - 0.5) * 0.1;
    const dy = (Math.random() - 0.5) * 0.1;
    const magnetism = 0.1 + Math.random() * 4;
    return {
      x,
      y,
      translateX,
      translateY,
      size,
      alpha,
      targetAlpha,
      dx,
      dy,
      magnetism,
    };
  };

  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `${color}${Math.floor(alpha * 255)
        .toString(16)
        .padStart(2, "0")}`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  const drawParticles = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
      const actualQuantity = tier === "high" ? quantity : Math.floor(quantity / 2);
      for (let i = 0; i < actualQuantity; i++) {
        const circle = circleParams();
        drawCircle(circle);
      }
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    stop1: number,
    start2: number,
    stop2: number
  ): number => {
    const rel = (value - start1) / (stop1 - start1);
    return start2 + rel * (stop2 - start2);
  };

  const animate = () => {
    if (context.current) {
      context.current.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
      circles.current.forEach((circle: Circle, i: number) => {
        // Handle transparency
        const edge = [
          circle.x + circle.translateX - circle.size, // distance from left edge
          canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
          circle.y + circle.translateY - circle.size, // distance from top edge
          canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
        ];
        const closestEdge = Math.min(...edge);
        const remapClosestEdge = parseFloat(
          remapValue(closestEdge, 0, 20, 0, 1).toFixed(2)
        );

        if (remapClosestEdge > 1) {
          circle.alpha += 0.02;
          if (circle.alpha > circle.targetAlpha) circle.alpha = circle.targetAlpha;
        } else {
          circle.alpha = circle.targetAlpha * remapClosestEdge;
        }

        circle.x += circle.dx;
        circle.y += circle.dy;
        circle.translateX +=
          (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
          ease;
        circle.translateY +=
          (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
          ease;

        // Bounce off edges
        if (
          circle.x < -circle.size ||
          circle.x > canvasSize.current.w + circle.size ||
          circle.y < -circle.size ||
          circle.y > canvasSize.current.h + circle.size
        ) {
          // Re-spawn on opposite side or just reset
          circle.x = Math.random() * canvasSize.current.w;
          circle.y = Math.random() * canvasSize.current.h;
        }

        drawCircle(circle, true);

        // Draw connections for high and mid tiers
        const isHigh = tier === "high";
        const isMid = tier === "mid";
        
        if (isHigh || isMid) {
          // Increase distance and opacity significantly for high tier to make links cleanly visible
          const maxDistance = isHigh ? 220 : 80;
          const lineOpacityFactor = isHigh ? 0.5 : 0.08;

          for (let j = i + 1; j < circles.current.length; j++) {
            const other = circles.current[j];
            const dx = circle.x + circle.translateX - (other.x + other.translateX);
            const dy = circle.y + circle.translateY - (other.y + other.translateY);
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
              context.current!.beginPath();
              context.current!.moveTo(circle.x + circle.translateX, circle.y + circle.translateY);
              context.current!.lineTo(other.x + other.translateX, other.y + other.translateY);
              const opacity = (1 - distance / maxDistance) * lineOpacityFactor * circle.alpha;
              context.current!.strokeStyle = `${color}${Math.floor(opacity * 255)
                .toString(16)
                .padStart(2, "0")}`;
              // Make line thicker for high tier
              context.current!.lineWidth = isHigh ? 1.2 : 0.4;
              context.current!.stroke();
            }
          }
        }
      });
      requestAnimationFrame(animate);
    }
  };

  return (
    <div
      className={`absolute inset-0 z-0 pointer-events-none overflow-hidden ${className}`}
      ref={canvasContainerRef}
      onMouseMove={handleMouseMove}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}
