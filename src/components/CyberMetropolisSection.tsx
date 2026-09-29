"use client";

import React, { useState } from "react";
import { MouseCoords } from "@/hooks/useParallax";
import { Building2, Terminal, Cpu, Radio, Shield, Palette, Zap } from "lucide-react";

interface CyberMetropolisSectionProps {
  scrollY: number;
  mousePos: MouseCoords;
  parallaxSpeed: number;
  onPlaySfx?: (type: "sonar" | "warp" | "crystal" | "click") => void;
}

type CyberTheme = "cyberpunk" | "sunset" | "matrix" | "gold";

export const CyberMetropolisSection: React.FC<CyberMetropolisSectionProps> = ({
  scrollY,
  mousePos,
  parallaxSpeed,
  onPlaySfx,
}) => {
  const [cityTheme, setCityTheme] = useState<CyberTheme>("cyberpunk");
  const [terminalOutput, setTerminalOutput] = useState<string>("SYSTEM CONNECTED: METROPOLIS GRID 04");

  const themes: { [key in CyberTheme]: { name: string; primary: string; secondary: string; glow: string; textGlow: string } } = {
    cyberpunk: {
      name: "Neo Cyberpunk",
      primary: "#ff0055",
      secondary: "#00f3ff",
      glow: "rgba(255, 0, 85, 0.5)",
      textGlow: "text-glow-magenta",
    },
    sunset: {
      name: "Tokyo Sunset",
      primary: "#f72585",
      secondary: "#7209b7",
      glow: "rgba(247, 37, 133, 0.5)",
      textGlow: "text-glow-magenta",
    },
    matrix: {
      name: "Matrix Emerald",
      primary: "#00ff66",
      secondary: "#008f11",
      glow: "rgba(0, 255, 102, 0.5)",
      textGlow: "text-glow-cyan",
    },
    gold: {
      name: "Solar Zenith",
      primary: "#ffd60a",
      secondary: "#ff9100",
      glow: "rgba(255, 214, 10, 0.5)",
      textGlow: "text-glow-gold",
    },
  };

  const handleThemeChange = (t: CyberTheme) => {
    setCityTheme(t);
    setTerminalOutput(`THEME RELOADED: [${themes[t].name.toUpperCase()}] · FREQUENCY SYNCHRONIZED`);
    if (onPlaySfx) onPlaySfx("click");
  };

  const activeThemeConfig = themes[cityTheme];

  // Relative scroll offset calculations
  const offsetDeep = scrollY * 0.15 * parallaxSpeed;
  const offsetMid = scrollY * 0.45 * parallaxSpeed;
  const offsetFast = scrollY * 0.9 * parallaxSpeed;
  const mouseX = mousePos.x * 30 * parallaxSpeed;
  const mouseY = mousePos.y * 25 * parallaxSpeed;

  return (
    <section
      id="cyber"
      className="relative min-h-[160vh] w-full overflow-hidden bg-gradient-to-b from-[#04152d] via-[#090518] to-[#120726] text-white flex flex-col items-center justify-start pt-32 pb-40 transition-colors duration-700"
    >
      {/* LAYER 0: Distant Cyber Fog Grid & Giant Hologram Moon */}
      <div
        className="absolute inset-0 pointer-events-none cyber-grid opacity-30"
        style={{
          transform: `translate3d(0, ${offsetDeep * 0.3}px, 0)`,
        }}
      />

      {/* Giant Cyber Moon / Orbital Ring */}
      <div
        className="absolute top-20 right-[15%] w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none opacity-40 blur-[1px]"
        style={{
          background: `radial-gradient(circle, ${activeThemeConfig.secondary} 0%, ${activeThemeConfig.primary} 60%, transparent 80%)`,
          transform: `translate3d(${mouseX * 0.1}px, ${-offsetDeep * 0.4}px, 0)`,
          boxShadow: `0 0 100px ${activeThemeConfig.glow}`,
        }}
      />

      {/* LAYER 1: Deep Skyline Silhouette Buildings (Slowest 0.2x) */}
      <div
        className="absolute inset-x-0 bottom-0 pointer-events-none flex justify-around items-end opacity-40 px-4 h-full"
        style={{
          transform: `translate3d(${mouseX * 0.25}px, ${-offsetDeep}px, 0)`,
        }}
      >
        <div className="w-24 sm:w-44 h-[550px] bg-gradient-to-t from-black via-gray-900 to-transparent border-t-2 border-white/20 relative">
          <div className="absolute top-10 inset-x-2 flex flex-col gap-3 opacity-30">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-1 bg-white/40 w-full" />
            ))}
          </div>
        </div>
        <div className="w-32 sm:w-60 h-[700px] bg-gradient-to-t from-black via-gray-900 to-transparent border-t-2 border-white/20 relative">
          <div className="absolute top-20 inset-x-4 flex flex-col gap-4 opacity-40">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="h-1.5 bg-cyan-400/40 w-full" />
            ))}
          </div>
        </div>
        <div className="w-28 sm:w-52 h-[600px] bg-gradient-to-t from-black via-gray-900 to-transparent border-t-2 border-white/20" />
      </div>

      {/* LAYER 2: Flying Hover-Speeders / Air Traffic (Medium Speed 0.5x) */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          transform: `translate3d(0, ${-offsetMid}px, 0)`,
        }}
      >
        {/* Speeder 1 (Gliding Right) */}
        <div
          className="absolute top-60 left-0 w-32 sm:w-48 h-6 rounded-full flex items-center shadow-lg transition-all duration-300"
          style={{
            transform: `translate3d(${(scrollY * 0.6) % 1200}px, ${Math.sin(scrollY * 0.01) * 20}px, 0)`,
            background: `linear-gradient(90deg, transparent, ${activeThemeConfig.primary}, #ffffff)`,
            boxShadow: `0 0 25px ${activeThemeConfig.glow}`,
          }}
        >
          <div className="ml-auto w-3 h-3 rounded-full bg-white shadow-[0_0_10px_#fff]" />
        </div>

        {/* Speeder 2 (Gliding Left Counter-Direction) */}
        <div
          className="absolute top-96 right-0 w-28 sm:w-40 h-5 rounded-full flex items-center shadow-lg"
          style={{
            transform: `translate3d(${-((scrollY * 0.45) % 1100)}px, ${Math.cos(scrollY * 0.01) * 25}px, 0)`,
            background: `linear-gradient(270deg, transparent, ${activeThemeConfig.secondary}, #ffffff)`,
            boxShadow: `0 0 25px ${activeThemeConfig.secondary}`,
          }}
        >
          <div className="mr-auto w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_10px_#fff]" />
        </div>
      </div>

      {/* LAYER 3: Main Foreground Interactive Terminal & City Console */}
      <div
        className="relative z-20 max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-8"
        style={{
          transform: `translate3d(${mouseX * 0.15}px, ${mouseY * 0.12}px, 0)`,
        }}
      >
        {/* Altitude Capsule */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border text-xs font-mono tracking-widest uppercase shadow-lg"
          style={{ borderColor: activeThemeConfig.primary, color: activeThemeConfig.primary }}
        >
          <Building2 className="w-3.5 h-3.5 animate-pulse" />
          <span>ALTITUDE: +1,240 METERS · NEO-TOKYO CITADEL</span>
        </div>

        {/* Hero Title */}
        <div className="space-y-3">
          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight">
            NEO-METROPOLIS <span style={{ color: activeThemeConfig.primary }}>SPIRE</span>
          </h2>
          <p className="max-w-2xl mx-auto text-sm sm:text-base text-gray-300 font-light leading-relaxed">
            Ascend into the towering cyberpunk skyline. Multi-speed elevated sky-rails, volumetric neon billboards,
            and autonomous hover-craft create a dense multi-layered visual illusion.
          </p>
        </div>

        {/* Interactive City Grid Customizer Terminal */}
        <div
          className="p-6 sm:p-8 rounded-3xl w-full max-w-3xl glass-panel flex flex-col gap-6 text-left border transition-all duration-500 shadow-2xl"
          style={{ borderColor: `${activeThemeConfig.primary}50` }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2.5">
              <div
                className="p-2 rounded-xl"
                style={{ backgroundColor: `${activeThemeConfig.primary}25`, color: activeThemeConfig.primary }}
              >
                <Terminal className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">Mainframe Atmosphere Override</h3>
                <p className="text-xs text-gray-400">Reconfigure city illumination frequency and holographic shaders</p>
              </div>
            </div>

            {/* Theme Select Buttons */}
            <div className="flex flex-wrap gap-2">
              {(Object.keys(themes) as CyberTheme[]).map((t) => (
                <button
                  key={t}
                  onClick={() => handleThemeChange(t)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-1.5 ${
                    cityTheme === t
                      ? "bg-white text-black shadow-lg shadow-white/30 scale-105"
                      : "bg-white/10 hover:bg-white/20 text-gray-300"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: themes[t].primary }}
                  />
                  {themes[t].name.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Terminal Console Output */}
          <div className="p-4 rounded-2xl bg-black/60 font-mono text-xs border border-white/10 flex flex-col gap-2">
            <div className="flex items-center justify-between text-[11px] text-gray-500 border-b border-white/5 pb-1">
              <span className="flex items-center gap-1"><Cpu className="w-3 h-3" /> NODE://NEO_GRID_449</span>
              <span className="text-green-400 flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" /> ONLINE</span>
            </div>
            <div className="text-green-400/90 font-mono text-[11px]">
              &gt; {terminalOutput}
            </div>
            <div className="text-gray-400 text-[10px]">
              &gt; PARALLAX_PLANE_OFFSET: {offsetMid.toFixed(1)}px | MULTIPLIER: {parallaxSpeed.toFixed(1)}x
            </div>
          </div>

          {/* Interactive Feature Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-200">Sky-Lanes</span>
                <Radio className="w-3.5 h-3.5 text-cyan-400" />
              </div>
              <span className="text-lg font-bold font-mono text-white">4 Lanes Active</span>
              <span className="text-[10px] text-gray-400">Autonomous speed compensation</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-200">Grid Latency</span>
                <Zap className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <span className="text-lg font-bold font-mono text-white">0.12 ms</span>
              <span className="text-[10px] text-gray-400">Ultra-fast GPU matrix rendering</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-1">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-gray-200">Security Shield</span>
                <Shield className="w-3.5 h-3.5 text-pink-400" />
              </div>
              <span className="text-lg font-bold font-mono text-white">Level 5 Protected</span>
              <span className="text-[10px] text-gray-400">Quantum encryption verified</span>
            </div>
          </div>
        </div>
      </div>

      {/* LAYER 4: Foreground High-Speed Sky-Rail (Fastest 0.9x) */}
      <div
        className="absolute -bottom-6 left-0 right-0 pointer-events-none z-30 flex items-center justify-between opacity-85"
        style={{
          transform: `translate3d(${mouseX * -0.5}px, ${offsetFast * 0.3}px, 0)`,
        }}
      >
        <div
          className="w-full h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_20px_#00f3ff]"
        />
      </div>
    </section>
  );
};
