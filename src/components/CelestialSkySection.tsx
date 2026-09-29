"use client";

import React, { useState } from "react";
import { MouseCoords } from "@/hooks/useParallax";
import { Cloud, Feather, Sparkles, Gem, Sun, Wind, Orbit } from "lucide-react";

interface CelestialSkySectionProps {
  scrollY: number;
  mousePos: MouseCoords;
  parallaxSpeed: number;
  onPlaySfx?: (type: "sonar" | "warp" | "crystal" | "click") => void;
}

interface FloatingCrystal {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export const CelestialSkySection: React.FC<CelestialSkySectionProps> = ({
  scrollY,
  mousePos,
  parallaxSpeed,
  onPlaySfx,
}) => {
  const [crystals, setCrystals] = useState<FloatingCrystal[]>([]);
  const [auraIntensity, setAuraIntensity] = useState<number>(1);

  const launchCrystal = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const colors = ["#fca311", "#48cae4", "#c77dff", "#52b788", "#ff70a6"];
    const newCrystal: FloatingCrystal = {
      id: Date.now(),
      x: clickX + (Math.random() - 0.5) * 40,
      y: clickY,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 12 + 16,
    };

    setCrystals((prev) => [...prev.slice(-15), newCrystal]);
    if (onPlaySfx) onPlaySfx("crystal");
  };

  const offsetDeep = scrollY * 0.14 * parallaxSpeed;
  const offsetMid = scrollY * 0.42 * parallaxSpeed;
  const offsetFore = scrollY * 0.88 * parallaxSpeed;
  const mouseX = mousePos.x * 28 * parallaxSpeed;
  const mouseY = mousePos.y * 22 * parallaxSpeed;

  return (
    <section
      id="celestial"
      className="relative min-h-[160vh] w-full overflow-hidden bg-gradient-to-b from-[#120726] via-[#1b263b] to-[#0c1821] text-white flex flex-col items-center justify-start pt-32 pb-40"
    >
      {/* LAYER 0: Twilight Celestial Gradient & Dual Solar Crowns */}
      <div
        className="absolute top-10 left-1/2 -translate-x-1/2 w-80 h-80 sm:w-[500px] sm:h-[500px] rounded-full pointer-events-none opacity-30 blur-2xl"
        style={{
          background: "radial-gradient(circle, #fca311 0%, #48cae4 40%, transparent 70%)",
          transform: `translate3d(${mouseX * 0.08}px, ${-offsetDeep * 0.3}px, 0)`,
        }}
      />

      {/* Aurora Borealis Flow Ribbon */}
      <div
        className="absolute inset-x-0 top-20 h-72 pointer-events-none aurora-ribbon"
        style={{
          transform: `translate3d(0, ${-offsetDeep * 0.5}px, 0)`,
          opacity: 0.6 * auraIntensity,
        }}
      />

      {/* LAYER 1: Distant Floating Mountain Isles (0.25x) */}
      <div
        className="absolute inset-0 pointer-events-none flex justify-between items-center px-6 sm:px-16 opacity-45"
        style={{
          transform: `translate3d(${mouseX * 0.2}px, ${-offsetDeep}px, 0)`,
        }}
      >
        {/* Floating Mountain Left */}
        <div className="w-56 sm:w-80 h-64 bg-gradient-to-b from-indigo-900/60 via-slate-900/80 to-transparent rounded-[40px] border border-cyan-400/20 shadow-2xl flex flex-col items-center justify-center p-4 relative">
          <div className="w-16 h-16 rounded-full bg-amber-400/20 border border-amber-400/40 animate-pulse-slow flex items-center justify-center">
            <Sun className="w-8 h-8 text-amber-300" />
          </div>
          <span className="text-[10px] font-mono text-cyan-300/60 mt-4">ISLE OF SOLIS · +14,200M</span>
        </div>

        {/* Floating Mountain Right */}
        <div className="w-60 sm:w-96 h-72 bg-gradient-to-b from-purple-900/60 via-slate-900/80 to-transparent rounded-[50px] border border-purple-400/20 shadow-2xl flex flex-col items-center justify-center p-4 relative">
          <div className="w-16 h-16 rounded-full bg-purple-400/20 border border-purple-400/40 animate-pulse-slow flex items-center justify-center">
            <Orbit className="w-8 h-8 text-purple-300" />
          </div>
          <span className="text-[10px] font-mono text-purple-300/60 mt-4">SANCTUARY OF ZEPHYR · +16,800M</span>
        </div>
      </div>

      {/* LAYER 2: Midground Drifting Volumetric Clouds (0.5x) */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-40"
        style={{
          transform: `translate3d(${-mouseX * 0.4}px, ${-offsetMid}px, 0)`,
        }}
      >
        <div className="absolute top-44 left-[5%] w-72 sm:w-96 h-32 bg-gradient-to-r from-white/20 via-cyan-200/10 to-transparent rounded-full blur-xl" />
        <div className="absolute top-96 right-[8%] w-80 sm:w-[450px] h-36 bg-gradient-to-l from-white/20 via-amber-200/10 to-transparent rounded-full blur-xl" />
      </div>

      {/* LAYER 3: Main Foreground Interactive Sky Platform */}
      <div
        className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8"
        style={{
          transform: `translate3d(${mouseX * 0.15}px, ${mouseY * 0.1}px, 0)`,
        }}
      >
        {/* Altitude Capsule */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-400/40 text-amber-300 text-xs font-mono tracking-widest uppercase shadow-lg">
          <Feather className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
          <span>ALTITUDE: +15,400 METERS · STRATOSPHERIC REALM</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            THE CELESTIAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-cyan-300 to-purple-400">AETHER</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            Enter the weightless stratosphere. Suspended floating sanctuaries drift above cloud carpets as
            anti-gravity crystal fields respond to kinetic interactions.
          </p>
        </div>

        {/* Interactive Anti-Gravity Crystal Spawning Well */}
        <div
          onClick={launchCrystal}
          className="glass-panel-gold p-6 sm:p-8 rounded-3xl w-full max-w-3xl flex flex-col gap-6 text-left relative overflow-hidden cursor-crosshair group transition-all duration-300 hover:border-amber-400/60"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-amber-400/20 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Gem className="w-5 h-5 text-amber-300 group-hover:rotate-45 transition-transform" />
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">Anti-Gravity Resonator Well</h3>
              </div>
              <p className="text-xs text-amber-200/70 mt-0.5">Click anywhere inside this arena to synthesize levitating crystals</p>
            </div>

            <div className="flex items-center gap-2 bg-amber-400/10 px-3 py-1.5 rounded-xl border border-amber-400/20 text-xs font-mono text-amber-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{crystals.length} Crystals Floating</span>
            </div>
          </div>

          {/* Interactive Arena */}
          <div className="relative h-44 sm:h-52 w-full bg-black/40 rounded-2xl border border-white/5 overflow-hidden flex items-center justify-center">
            {/* Background floating runes */}
            <span className="text-xs font-mono text-amber-300/40 select-none pointer-events-none text-center px-4">
              ✨ [ CLICK ANYWHERE TO LAUNCH LEVITATING RESONANCE CRYSTALS ] ✨
            </span>

            {/* Render dynamically launched crystals */}
            {crystals.map((c) => (
              <div
                key={c.id}
                className="absolute pointer-events-none transition-all"
                style={{
                  left: c.x,
                  top: c.y,
                  animation: "levitateUp 4s cubic-bezier(0.2, 0.8, 0.3, 1) forwards",
                }}
              >
                <div
                  className="rounded-lg shadow-lg flex items-center justify-center p-1"
                  style={{
                    backgroundColor: `${c.color}30`,
                    border: `2px solid ${c.color}`,
                    boxShadow: `0 0 20px ${c.color}`,
                    width: `${c.size}px`,
                    height: `${c.size}px`,
                    transform: "rotate(45deg)",
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Metric cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
              <span className="text-xs text-gray-400">Gravitational Force</span>
              <span className="text-lg font-bold font-mono text-amber-300">0.14 G (Microgravity)</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
              <span className="text-xs text-gray-400">Stratospheric Wind</span>
              <span className="text-lg font-bold font-mono text-cyan-300">142 km/h Jetstream</span>
            </div>
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
              <span className="text-xs text-gray-400">Aether Resonance</span>
              <span className="text-lg font-bold font-mono text-purple-300">528 Hz Harmonic</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Crystal Animation Keyframe Inline */}
      <style jsx>{`
        @keyframes levitateUp {
          0% {
            opacity: 1;
            transform: translateY(0px) scale(0.6) rotate(0deg);
          }
          50% {
            opacity: 0.9;
            transform: translateY(-80px) scale(1.1) rotate(180deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-160px) scale(0.3) rotate(360deg);
          }
        }
      `}</style>
    </section>
  );
};
