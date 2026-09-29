"use client";

import React, { useEffect, useRef } from "react";
import { MouseCoords } from "@/hooks/useParallax";

interface FloatingParticlesCanvasProps {
  activeZone: "abyss" | "cyber" | "celestial" | "void";
  scrollVelocity: number;
  mousePos: MouseCoords;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  baseVx: number;
  baseVy: number;
  vx: number;
  vy: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  angle: number;
  layer: number; // 1 to 4 (depth factor)
}

export const FloatingParticlesCanvas: React.FC<FloatingParticlesCanvasProps> = ({
  activeZone,
  scrollVelocity,
  mousePos,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const zoneRef = useRef(activeZone);
  const velocityRef = useRef(scrollVelocity);
  const mouseRef = useRef(mousePos);

  zoneRef.current = activeZone;
  velocityRef.current = scrollVelocity;
  mouseRef.current = mousePos;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const getColorsForZone = (zone: string) => {
      switch (zone) {
        case "abyss":
          return ["#00f0ff", "#00ffb3", "#0ea5e9", "#38bdf8", "#67e8f9"];
        case "cyber":
          return ["#ff0055", "#00f3ff", "#ffe600", "#9d00ff", "#ffffff"];
        case "celestial":
          return ["#fca311", "#48cae4", "#ffffff", "#ffd166", "#c77dff"];
        case "void":
        default:
          return ["#ffffff", "#c084fc", "#38bdf8", "#f43f5e", "#a855f7"];
      }
    };

    const initParticles = () => {
      const count = Math.min(Math.floor((width * height) / 10000), 120);
      const colors = getColorsForZone(zoneRef.current);
      const particles: Particle[] = [];

      for (let i = 0; i < count; i++) {
        const layer = Math.random() * 3 + 1; // 1 to 4 depth
        const size = (Math.random() * 2.5 + 0.8) * layer;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const alpha = Math.random() * 0.5 + 0.3;

        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          baseVx: (Math.random() - 0.5) * 0.4,
          baseVy: -(Math.random() * 0.6 + 0.2) * (layer * 0.5),
          vx: 0,
          vy: 0,
          color,
          alpha,
          baseAlpha: alpha,
          pulseSpeed: Math.random() * 0.03 + 0.01,
          angle: Math.random() * Math.PI * 2,
          layer,
        });
      }
      particlesRef.current = particles;
    };

    initParticles();
    window.addEventListener("resize", handleResize);

    let frame = 0;
    const render = () => {
      frame++;
      ctx.clearRect(0, 0, width, height);

      const zone = zoneRef.current;
      const velocity = velocityRef.current;
      const mouse = mouseRef.current;
      const particles = particlesRef.current;

      const isWarping = zone === "void" && velocity > 15;

      particles.forEach((p) => {
        // Pulse alpha
        p.angle += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.angle) * 0.2;

        // Zone-specific physics
        if (zone === "abyss") {
          // Bubbles floating upward with wobble
          p.x += Math.sin(p.angle * 1.5) * 0.5 + p.baseVx;
          p.y += p.baseVy - (velocity * 0.08 * p.layer);
        } else if (zone === "cyber") {
          // Digital matrix rain / particles falling with horizontal skew
          p.x += p.baseVx * 1.5 + (mouse.x * 0.8 * p.layer);
          p.y += (Math.abs(p.baseVy) + 0.8) * p.layer - (velocity * 0.05 * p.layer);
        } else if (zone === "celestial") {
          // Gentle floating aether dust with wind flow
          p.x += Math.cos(p.angle * 0.8) * 0.8 + 0.3 * p.layer + (mouse.x * 0.4 * p.layer);
          p.y += Math.sin(p.angle * 0.8) * 0.4 + p.baseVy * 0.5 - (velocity * 0.06 * p.layer);
        } else {
          // Cosmic void: warp speed effect when scrolling fast
          if (isWarping) {
            const centerX = width / 2;
            const centerY = height / 2;
            const dx = p.x - centerX;
            const dy = p.y - centerY;
            const dist = Math.sqrt(dx * dx + dy * dy) || 1;
            p.x += (dx / dist) * (velocity * 0.3 * p.layer);
            p.y += (dy / dist) * (velocity * 0.3 * p.layer);
          } else {
            p.x += p.baseVx * 0.5 + (mouse.x * 0.6 * p.layer);
            p.y += p.baseVy * 0.4 - (velocity * 0.08 * p.layer);
          }
        }

        // Mouse avoidance / attraction
        const dxMouse = mouse.pixelX - p.x;
        const dyMouse = mouse.pixelY - p.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < 120 && distMouse > 0) {
          const force = (120 - distMouse) / 120;
          p.x -= (dxMouse / distMouse) * force * 3;
          p.y -= (dyMouse / distMouse) * force * 3;
        }

        // Screen wrap
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.layer > 2 ? 8 : 2;

        if (isWarping) {
          // Draw streak lines for warp speed
          ctx.beginPath();
          const centerX = width / 2;
          const centerY = height / 2;
          const angle = Math.atan2(p.y - centerY, p.x - centerX);
          const streakLen = Math.min(velocity * 1.5 * p.layer, 40);
          ctx.lineWidth = p.size;
          ctx.strokeStyle = p.color;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + Math.cos(angle) * streakLen, p.y + Math.sin(angle) * streakLen);
          ctx.stroke();
        } else {
          ctx.beginPath();
          if (zone === "cyber" && p.layer > 2) {
            // Cyber square pixel
            ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size * 1.5, p.size * 1.5);
          } else {
            // Round glowing orb
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }
        }
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 h-full w-full"
      style={{ opacity: 0.95 }}
    />
  );
};
