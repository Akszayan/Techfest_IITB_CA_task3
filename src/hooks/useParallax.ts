"use client";

import { useEffect, useState, useRef, useCallback } from "react";

export interface MouseCoords {
  x: number; // -1 to 1
  y: number; // -1 to 1
  pixelX: number;
  pixelY: number;
}

export function useParallax() {
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [mousePos, setMousePos] = useState<MouseCoords>({ x: 0, y: 0, pixelX: 0, pixelY: 0 });
  const [activeZone, setActiveZone] = useState<"abyss" | "cyber" | "celestial" | "void">("abyss");

  const lastScrollY = useRef(0);
  const lastTime = useRef(Date.now());
  const mouseTarget = useRef({ x: 0, y: 0, pixelX: 0, pixelY: 0 });
  const mouseCurrent = useRef({ x: 0, y: 0, pixelX: 0, pixelY: 0 });
  const animFrame = useRef<number | null>(null);

  // Mouse tracking with lerp
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;
      mouseTarget.current = {
        x: normX,
        y: normY,
        pixelX: e.clientX,
        pixelY: e.clientY,
      };
    };

    const updateSmoothMouse = () => {
      // Lerp mouse
      mouseCurrent.current.x += (mouseTarget.current.x - mouseCurrent.current.x) * 0.08;
      mouseCurrent.current.y += (mouseTarget.current.y - mouseCurrent.current.y) * 0.08;
      mouseCurrent.current.pixelX += (mouseTarget.current.pixelX - mouseCurrent.current.pixelX) * 0.08;
      mouseCurrent.current.pixelY += (mouseTarget.current.pixelY - mouseCurrent.current.pixelY) * 0.08;

      setMousePos({ ...mouseCurrent.current });
      animFrame.current = requestAnimationFrame(updateSmoothMouse);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    animFrame.current = requestAnimationFrame(updateSmoothMouse);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (animFrame.current) cancelAnimationFrame(animFrame.current);
    };
  }, []);

  // Scroll and velocity tracking
  useEffect(() => {
    let velocityTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const currentY = window.scrollY || window.pageYOffset;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? Math.min(Math.max(currentY / totalHeight, 0), 1) : 0;

      const now = Date.now();
      const dt = Math.max(now - lastTime.current, 1);
      const dy = Math.abs(currentY - lastScrollY.current);
      const velocity = (dy / dt) * 100; // px per 100ms

      lastScrollY.current = currentY;
      lastTime.current = now;

      setScrollY(currentY);
      setScrollProgress(progress);
      setScrollVelocity(velocity);

      // Determine active zone based on progress
      if (progress < 0.25) {
        setActiveZone("abyss");
      } else if (progress < 0.52) {
        setActiveZone("cyber");
      } else if (progress < 0.78) {
        setActiveZone("celestial");
      } else {
        setActiveZone("void");
      }

      clearTimeout(velocityTimeout);
      velocityTimeout = setTimeout(() => {
        setScrollVelocity(0);
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(velocityTimeout);
    };
  }, []);

  const scrollToZone = useCallback((zone: "abyss" | "cyber" | "celestial" | "void") => {
    const el = document.getElementById(zone);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return {
    scrollY,
    scrollProgress,
    scrollVelocity,
    mousePos,
    activeZone,
    scrollToZone,
  };
}
