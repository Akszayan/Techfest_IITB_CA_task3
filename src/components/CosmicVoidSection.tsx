"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { MouseCoords } from "@/hooks/useParallax";
import { Sparkles, Orbit, Rocket, Trophy, Compass, Star, RefreshCw, Zap } from "lucide-react";

interface CosmicVoidSectionProps {
  scrollY: number;
  mousePos: MouseCoords;
  parallaxSpeed: number;
  onPlaySfx?: (type: "sonar" | "warp" | "crystal" | "click") => void;
  onRestartJourney: () => void;
}

interface StarNode {
  id: number;
  x: number;
  y: number;
  name: string;
}

export const CosmicVoidSection: React.FC<CosmicVoidSectionProps> = ({
  scrollY,
  mousePos,
  parallaxSpeed,
  onPlaySfx,
  onRestartJourney,
}) => {
  const [activeStars, setActiveStars] = useState<number[]>([]);
  const [completedConstellation, setCompletedConstellation] = useState(false);
  const [supernovaTriggered, setSupernovaTriggered] = useState(false);

  // Constellation stars
  const constellationStars: StarNode[] = [
    { id: 1, x: 20, y: 30, name: "Alpha Centauri" },
    { id: 2, x: 45, y: 20, name: "Sirius Prime" },
    { id: 3, x: 75, y: 35, name: "Betelgeuse" },
    { id: 4, x: 60, y: 70, name: "Vega Lumina" },
    { id: 5, x: 30, y: 75, name: "Polaris Nova" },
  ];

  const handleStarClick = (id: number) => {
    if (activeStars.includes(id)) return;
    const next = [...activeStars, id];
    setActiveStars(next);
    if (onPlaySfx) onPlaySfx("click");

    if (next.length === constellationStars.length) {
      setCompletedConstellation(true);
      if (onPlaySfx) onPlaySfx("warp");
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#a855f7", "#38bdf8", "#f43f5e", "#ffd166"],
      });
    }
  };

  const resetConstellation = () => {
    setActiveStars([]);
    setCompletedConstellation(false);
    if (onPlaySfx) onPlaySfx("click");
  };

  const triggerSupernova = () => {
    setSupernovaTriggered(true);
    if (onPlaySfx) onPlaySfx("warp");
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.7 },
      colors: ["#ff0055", "#00f0ff", "#ffe600", "#ffffff", "#9d00ff"],
    });
    setTimeout(() => setSupernovaTriggered(false), 2000);
  };

  const offsetDeep = scrollY * 0.1 * parallaxSpeed;
  const offsetMid = scrollY * 0.35 * parallaxSpeed;
  const offsetFore = scrollY * 0.75 * parallaxSpeed;
  const mouseX = mousePos.x * 35 * parallaxSpeed;
  const mouseY = mousePos.y * 25 * parallaxSpeed;

  return (
    <section
      id="void"
      className="relative min-h-[180vh] w-full overflow-hidden bg-gradient-to-b from-[#0c1821] via-[#05010f] to-[#020005] text-white flex flex-col items-center justify-start pt-32 pb-40"
    >
      {/* LAYER 0: Deep Space Galactic Core / Accretion Disk */}
      <div
        className="absolute top-28 left-1/2 -translate-x-1/2 w-[350px] h-[350px] sm:w-[650px] sm:h-[650px] pointer-events-none opacity-50 accretion-disk"
        style={{
          background: "radial-gradient(circle, rgba(168,85,247,0.4) 0%, rgba(244,63,94,0.3) 40%, rgba(0,240,255,0.15) 60%, transparent 75%)",
          transform: `translate3d(${mouseX * 0.05}px, ${-offsetDeep * 0.3}px, 0)`,
        }}
      />

      {/* Black Hole Singularity Core */}
      <div
        className="absolute top-52 left-1/2 -translate-x-1/2 w-48 h-48 sm:w-80 sm:h-80 rounded-full bg-black border border-purple-500/30 shadow-[0_0_100px_rgba(168,85,247,0.6)] pointer-events-none flex items-center justify-center"
        style={{
          transform: `translate3d(${mouseX * 0.08}px, ${-offsetDeep * 0.4}px, 0)`,
        }}
      >
        <div className="w-full h-full rounded-full border border-cyan-400/20 animate-spin-very-slow" />
      </div>

      {/* LAYER 1: Orbiting Celestial Asteroids & Distant Nebulae (0.3x) */}
      <div
        className="absolute inset-0 pointer-events-none opacity-50 z-10"
        style={{
          transform: `translate3d(${mouseX * 0.3}px, ${-offsetMid}px, 0)`,
        }}
      >
        {/* Asteroid 1 */}
        <div className="absolute top-44 left-[12%] w-16 h-14 bg-gradient-to-br from-purple-800 to-slate-900 rounded-[35%] border border-white/10 shadow-xl rotate-12 animate-float-slow" />
        {/* Asteroid 2 */}
        <div className="absolute top-96 right-[15%] w-20 h-18 bg-gradient-to-br from-indigo-800 to-slate-900 rounded-[40%] border border-white/10 shadow-xl -rotate-45 animate-float-medium" />
      </div>

      {/* LAYER 2: Main Foreground Interactive Odyssey Climax */}
      <div
        className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8"
        style={{
          transform: `translate3d(${mouseX * 0.15}px, ${mouseY * 0.12}px, 0)`,
        }}
      >
        {/* Altitude Capsule */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-purple-400/40 text-purple-300 text-xs font-mono tracking-widest uppercase shadow-lg">
          <Orbit className="w-3.5 h-3.5 text-purple-400 animate-spin-very-slow" />
          <span>LOCATION: +408,000 KM · DEEP COSMIC HORIZON</span>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            THE EVENT <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-300">HORIZON</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            You have journeyed from the Mariana depths through neon spires and stratospheric cloudscapes to the edge of
            spacetime. Connect the constellation stars or ignite a Supernova to celebrate.
          </p>
        </div>

        {/* Interactive Constellation Connector Game */}
        <div className="p-6 sm:p-8 rounded-3xl w-full max-w-3xl glass-panel-magenta flex flex-col gap-6 text-left relative overflow-hidden">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-pink-500/20 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-pink-400 animate-pulse" />
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
                  {completedConstellation ? "✨ Constellation 'Aethel-Phoenix' Unified!" : "Constellation Star Linker"}
                </h3>
              </div>
              <p className="text-xs text-pink-200/70 mt-0.5">Click all 5 major cosmic stars to align the constellation matrix</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={resetConstellation}
                className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-gray-300 text-xs font-mono flex items-center gap-1.5 transition-all"
              >
                <RefreshCw className="w-3 h-3" /> Reset
              </button>

              <button
                onClick={triggerSupernova}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 text-white font-semibold text-xs tracking-wider uppercase transition-all shadow-lg hover:brightness-110 active:scale-95 flex items-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5" /> Supernova Burst
              </button>
            </div>
          </div>

          {/* Constellation Star Arena */}
          <div className="relative h-56 sm:h-64 w-full bg-black/60 rounded-2xl border border-white/10 overflow-hidden">
            {/* SVG Connecting Lines between active stars */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {activeStars.map((starId, index) => {
                if (index === 0) return null;
                const prevStar = constellationStars.find((s) => s.id === activeStars[index - 1]);
                const currStar = constellationStars.find((s) => s.id === starId);
                if (!prevStar || !currStar) return null;

                return (
                  <line
                    key={`${prevStar.id}-${currStar.id}`}
                    x1={`${prevStar.x}%`}
                    y1={`${prevStar.y}%`}
                    x2={`${currStar.x}%`}
                    y2={`${currStar.y}%`}
                    stroke="#ff007f"
                    strokeWidth="2.5"
                    strokeDasharray="4 4"
                    className="animate-pulse"
                  />
                );
              })}
            </svg>

            {/* Clickable Star Nodes */}
            {constellationStars.map((star) => {
              const isSelected = activeStars.includes(star.id);
              return (
                <button
                  key={star.id}
                  onClick={() => handleStarClick(star.id)}
                  style={{ left: `${star.x}%`, top: `${star.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group p-2 rounded-full transition-all duration-300 focus:outline-none ${
                    isSelected ? "scale-125" : "hover:scale-110"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                      isSelected
                        ? "bg-pink-500 shadow-[0_0_20px_#ff007f] text-white"
                        : "bg-white/20 hover:bg-white/40 border border-white/40 text-gray-300"
                    }`}
                  >
                    <Star className={`w-3.5 h-3.5 ${isSelected ? "fill-white" : ""}`} />
                  </div>
                  <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-[9px] font-mono text-gray-300 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 px-1.5 py-0.5 rounded border border-white/10">
                    {star.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Journey Completion Summary Trophy */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3.5 text-left">
              <div className="p-3 rounded-2xl bg-gradient-to-tr from-amber-400 to-pink-500 text-black shadow-lg">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-white text-sm">Parallax Odyssey Completed!</h4>
                <p className="text-xs text-gray-400">Total vertical distance: 418,928 meters navigated seamlessly</p>
              </div>
            </div>

            <button
              onClick={onRestartJourney}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs tracking-wider uppercase hover:bg-cyan-200 transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
            >
              <Rocket className="w-4 h-4" /> Restart Odyssey (Abyss)
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
