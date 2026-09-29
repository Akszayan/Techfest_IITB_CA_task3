"use client";

import React, { useState } from "react";
import { MouseCoords } from "@/hooks/useParallax";
import { Waves, Sparkles, Anchor, Compass, Disc, ShieldAlert, Cpu } from "lucide-react";

interface AbyssalSectionProps {
  scrollY: number;
  mousePos: MouseCoords;
  parallaxSpeed: number;
  onPlaySfx?: (type: "sonar" | "warp" | "crystal" | "click") => void;
}

export const AbyssalSection: React.FC<AbyssalSectionProps> = ({
  scrollY,
  mousePos,
  parallaxSpeed,
  onPlaySfx,
}) => {
  const [sonarActive, setSonarActive] = useState(false);
  const [discoveredRelics, setDiscoveredRelics] = useState<number[]>([]);

  const handleSonarPulse = () => {
    setSonarActive(true);
    if (onPlaySfx) onPlaySfx("sonar");
    setTimeout(() => setSonarActive(false), 2400);
  };

  const handleRelicClick = (id: number) => {
    if (!discoveredRelics.includes(id)) {
      setDiscoveredRelics((prev) => [...prev, id]);
      if (onPlaySfx) onPlaySfx("click");
    }
  };

  // Parallax offsets based on scroll and mouse position
  const offsetDeep = scrollY * 0.12 * parallaxSpeed;
  const offsetMid = scrollY * 0.38 * parallaxSpeed;
  const offsetFore = scrollY * 0.85 * parallaxSpeed;
  const mouseX = mousePos.x * 25 * parallaxSpeed;
  const mouseY = mousePos.y * 20 * parallaxSpeed;

  return (
    <section
      id="abyss"
      className="relative min-h-[160vh] w-full overflow-hidden bg-gradient-to-b from-[#01040a] via-[#020d1c] to-[#04152d] text-white flex flex-col items-center justify-start pt-32 pb-40"
    >
      {/* LAYER 0: Background Deep Water Gradient & Trench Fog */}
      <div
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-screen caustic-rays"
        style={{
          transform: `translate3d(0, ${offsetDeep * 0.5}px, 0)`,
        }}
      />

      {/* LAYER 1: Deep Distant Underwater Trench Monoliths */}
      <div
        className="absolute inset-0 pointer-events-none flex justify-between items-end px-10 opacity-35"
        style={{
          transform: `translate3d(${mouseX * 0.2}px, ${-offsetDeep}px, 0)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Sunken Monolith Left */}
        <div className="w-48 sm:w-80 h-[600px] bg-gradient-to-t from-teal-950 via-cyan-950/60 to-transparent rounded-t-full border-t border-teal-500/20 shadow-[0_0_80px_rgba(0,255,179,0.1)] relative">
          <div className="absolute top-20 left-1/2 -translate-x-1/2 text-teal-400/40 text-[10px] font-mono rotate-90">
            [ANCIENT SECTOR 09]
          </div>
        </div>

        {/* Sunken Monolith Right */}
        <div className="w-56 sm:w-96 h-[750px] bg-gradient-to-t from-teal-950 via-cyan-950/60 to-transparent rounded-t-3xl border-t border-cyan-500/20 shadow-[0_0_80px_rgba(0,240,255,0.1)] relative">
          <div className="absolute top-32 left-1/2 -translate-x-1/2 text-cyan-400/30 text-[10px] font-mono">
            [PRESSURE: 1040 BAR]
          </div>
        </div>
      </div>

      {/* LAYER 2: Floating Bioluminescent Jellyfish & Hydrothermal Vents */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          transform: `translate3d(${mouseX * 0.6}px, ${-offsetMid}px, 0)`,
          transition: "transform 0.1s ease-out",
        }}
      >
        {/* Jellyfish 1 (Left floating) */}
        <div
          className="absolute top-48 left-[10%] sm:left-[18%] pointer-events-auto cursor-pointer animate-float-slow group"
          onClick={() => handleRelicClick(1)}
        >
          <div className="relative flex flex-col items-center">
            {/* Jelly Bell */}
            <div className="w-20 h-16 sm:w-28 sm:h-22 rounded-t-full bg-gradient-to-b from-cyan-400/60 via-teal-500/40 to-transparent border-t-2 border-cyan-300 shadow-[0_0_30px_rgba(0,240,255,0.6)] group-hover:scale-110 transition-transform flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-200 animate-pulse" />
            </div>
            {/* Jelly Tentacles */}
            <div className="flex gap-2 -mt-1 opacity-75">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-gradient-to-b from-cyan-300 to-transparent rounded-full animate-pulse"
                  style={{
                    height: `${60 + (i % 3) * 25}px`,
                    animationDelay: `${i * 0.2}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Jellyfish 2 (Right floating) */}
        <div
          className="absolute top-96 right-[12%] sm:right-[20%] pointer-events-auto cursor-pointer animate-float-medium group"
          onClick={() => handleRelicClick(2)}
        >
          <div className="relative flex flex-col items-center">
            <div className="w-16 h-12 sm:w-24 sm:h-18 rounded-t-full bg-gradient-to-b from-pink-500/60 via-purple-600/40 to-transparent border-t-2 border-pink-300 shadow-[0_0_30px_rgba(255,0,128,0.6)] group-hover:scale-110 transition-transform flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-pink-200 animate-pulse" />
            </div>
            <div className="flex gap-1.5 -mt-1 opacity-75">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="w-0.5 bg-gradient-to-b from-pink-400 to-transparent rounded-full animate-pulse"
                  style={{
                    height: `${50 + (i % 2) * 20}px`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Sonar Ping Wave Overlay */}
      {sonarActive && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-20">
          <div className="w-20 h-20 rounded-full border-4 border-cyan-400/80 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] shadow-[0_0_60px_rgba(0,240,255,0.8)]" />
          <div className="w-40 h-40 rounded-full border-2 border-teal-400/50 animate-[ping_2.4s_cubic-bezier(0,0,0.2,1)_infinite]" />
        </div>
      )}

      {/* LAYER 3: Main Foreground Interactive Content */}
      <div
        className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8"
        style={{
          transform: `translate3d(${mouseX * 0.15}px, ${mouseY * 0.1}px, 0)`,
        }}
      >
        {/* Altitude Capsule Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-cyan-500/40 text-cyan-300 text-xs font-mono tracking-widest uppercase shadow-lg">
          <Waves className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span>DEPTH: -10,928 METERS · HADAL ZONE</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            THE ABYSSAL <span className="gradient-text-shimmer">SANCTUARY</span>
          </h1>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            Descend into the bioluminescent depths of the world's deepest trench. As you scroll, multilayered light
            waves and ancient abyssal relics drift with calculated volumetric inertia.
          </p>
        </div>

        {/* Interactive Sonar & Relic Discovery Console */}
        <div className="glass-panel-cyan p-6 sm:p-8 rounded-3xl w-full max-w-3xl flex flex-col gap-6 text-left relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-cyan-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Disc className="w-5 h-5 text-cyan-400 animate-spin-very-slow" />
                <h3 className="text-lg font-bold text-white tracking-wide">Sonar Array & Subsea Scanner</h3>
              </div>
              <p className="text-xs text-cyan-200/70 mt-0.5">Emit low-frequency sonar pulses to illuminate hidden fauna</p>
            </div>

            <button
              onClick={handleSonarPulse}
              disabled={sonarActive}
              className="px-5 py-2.5 rounded-2xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold text-xs tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,240,255,0.4)] active:scale-95 flex items-center gap-2 disabled:opacity-50"
            >
              <Compass className="w-4 h-4" />
              {sonarActive ? "PULSING SONAR..." : "PING ACTIVE SONAR"}
            </button>
          </div>

          {/* Feature Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-cyan-400">01. HYDROSTATIC DEPTH</span>
                <Anchor className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-white">1,086 <span className="text-xs font-normal text-gray-400">bar</span></p>
              <span className="text-[11px] text-gray-400">Dynamic fluid velocity compensation active</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-teal-400">02. BIOLUMINESCENCE</span>
                <Sparkles className="w-4 h-4 text-teal-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-white">{discoveredRelics.length} / 2 <span className="text-xs font-normal text-gray-400">Organisms Found</span></p>
              <span className="text-[11px] text-gray-400">Click swimming jellyfish to record telemetry</span>
            </div>

            <div className="p-4 rounded-2xl bg-black/40 border border-white/5 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-pink-400">03. PARALLAX FACTOR</span>
                <Cpu className="w-4 h-4 text-pink-400" />
              </div>
              <p className="text-2xl font-bold font-mono text-white">{(0.38 * parallaxSpeed).toFixed(2)}x</p>
              <span className="text-[11px] text-gray-400">Multi-speed volumetric layer calculation</span>
            </div>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div className="flex flex-col items-center gap-2 pt-6 text-gray-400 animate-bounce">
          <span className="text-[11px] font-mono tracking-widest uppercase">ASCEND TOWARD SURFACE</span>
          <div className="w-5 h-9 rounded-full border-2 border-cyan-400/40 flex justify-center p-1">
            <div className="w-1.5 h-2.5 bg-cyan-400 rounded-full animate-[pulse_1s_infinite]" />
          </div>
        </div>
      </div>

      {/* LAYER 4: Fast Foreground Bubbles & Underwater Coral Pillars */}
      <div
        className="absolute -bottom-10 left-0 right-0 pointer-events-none z-30 flex justify-between items-end opacity-70"
        style={{
          transform: `translate3d(0, ${offsetFore * 0.4}px, 0)`,
        }}
      >
        <div className="w-72 h-44 bg-gradient-to-tr from-cyan-900/80 to-transparent rounded-tr-full blur-sm" />
        <div className="w-80 h-56 bg-gradient-to-tl from-teal-900/80 to-transparent rounded-tl-full blur-sm" />
      </div>
    </section>
  );
};
