"use client";

import React from "react";
import { Compass, Gauge, Radio, Wind, Sparkles, Navigation } from "lucide-react";

interface DepthGaugeProps {
  scrollY: number;
  scrollProgress: number;
  scrollVelocity: number;
  activeZone: "abyss" | "cyber" | "celestial" | "void";
  onSelectZone: (zone: "abyss" | "cyber" | "celestial" | "void") => void;
}

export const DepthGauge: React.FC<DepthGaugeProps> = ({
  scrollProgress,
  scrollVelocity,
  activeZone,
  onSelectZone,
}) => {
  // Convert progress (0 to 1) into simulated elevation:
  // 0% -> -10,928m (Mariana Trench)
  // 25% -> 0m (Sea Level)
  // 50% -> +2,500m (Metropolis Apex)
  // 75% -> +35,000m (Stratosphere)
  // 100% -> +408,000 km (Low Earth Orbit / Cosmic Deep)
  const getElevationData = (progress: number) => {
    if (progress < 0.25) {
      const p = progress / 0.25;
      const depth = Math.round(-10928 + p * 10928);
      return { label: `${depth.toLocaleString()} m`, title: "Abyssal Depth", pressure: `${(1000 - p * 999).toFixed(0)} atm` };
    } else if (progress < 0.52) {
      const p = (progress - 0.25) / 0.27;
      const alt = Math.round(p * 2800);
      return { label: `+${alt.toLocaleString()} m`, title: "Neo-Spire Altitude", pressure: "1.02 atm" };
    } else if (progress < 0.78) {
      const p = (progress - 0.52) / 0.26;
      const alt = Math.round(2800 + p * 32200);
      return { label: `+${alt.toLocaleString()} m`, title: "Stratospheric Aether", pressure: `${(0.9 - p * 0.88).toFixed(2)} atm` };
    } else {
      const p = (progress - 0.78) / 0.22;
      const km = Math.round(35 + p * 408000);
      return { label: `+${km.toLocaleString()} km`, title: "Cosmic Event Horizon", pressure: "0.00 atm (Vacuum)" };
    }
  };

  const currentElevation = getElevationData(scrollProgress);

  const zones = [
    { id: "void" as const, name: "IV. Deep Cosmos", tag: "SPACE", color: "text-purple-400 border-purple-500", range: "100,000 km" },
    { id: "celestial" as const, name: "III. Celestial Aether", tag: "AIR", color: "text-amber-300 border-amber-400", range: "+15,000 m" },
    { id: "cyber" as const, name: "II. Neo-Metropolis", tag: "SURFACE", color: "text-cyan-400 border-cyan-400", range: "+1,200 m" },
    { id: "abyss" as const, name: "I. Abyssal Trench", tag: "DEPTHS", color: "text-teal-400 border-teal-400", range: "-10,000 m" },
  ];

  return (
    <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-end gap-3 pointer-events-none">
      {/* Telemetry Capsule */}
      <div className="pointer-events-auto glass-panel p-3.5 rounded-2xl shadow-2xl border border-white/10 w-56 flex flex-col gap-2.5 transition-all duration-300 hover:border-cyan-400/40">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="flex items-center gap-1.5">
            <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-gray-400 uppercase">TELEMETRY HUD</span>
          </div>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
            {Math.round(scrollProgress * 100)}%
          </span>
        </div>

        {/* Altitude Value */}
        <div className="flex flex-col">
          <span className="text-[10px] text-gray-400 font-mono flex items-center gap-1">
            <Compass className="w-3 h-3 text-cyan-400" /> {currentElevation.title}
          </span>
          <div className="text-xl font-bold font-mono tracking-tight text-white flex items-baseline justify-between mt-0.5">
            <span>{currentElevation.label}</span>
          </div>
        </div>

        {/* Velocity Meter & Pressure */}
        <div className="grid grid-cols-2 gap-2 pt-1 border-t border-white/5 text-[10px] font-mono">
          <div className="flex flex-col">
            <span className="text-gray-500 flex items-center gap-1"><Gauge className="w-2.5 h-2.5" /> VELOCITY</span>
            <span className="font-semibold text-cyan-300">{(scrollVelocity * 4.2).toFixed(1)} km/h</span>
          </div>
          <div className="flex flex-col">
            <span className="text-gray-500 flex items-center gap-1"><Wind className="w-2.5 h-2.5" /> PRESSURE</span>
            <span className="font-semibold text-purple-300">{currentElevation.pressure}</span>
          </div>
        </div>

        {/* Progress Bar Track */}
        <div className="w-full bg-gray-800/80 rounded-full h-1.5 overflow-hidden mt-1">
          <div
            className="bg-gradient-to-r from-teal-400 via-cyan-400 to-purple-500 h-full transition-all duration-150"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>
      </div>

      {/* Layer Navigation Quick Points */}
      <div className="pointer-events-auto glass-panel p-2 rounded-2xl flex flex-col gap-1.5 border border-white/10">
        {zones.map((zone) => {
          const isActive = activeZone === zone.id;
          return (
            <button
              key={zone.id}
              onClick={() => onSelectZone(zone.id)}
              className={`group flex items-center justify-between gap-3 px-3 py-1.5 rounded-xl transition-all duration-200 text-left ${
                isActive
                  ? "bg-white/15 border border-white/20 text-white shadow-lg"
                  : "hover:bg-white/5 text-gray-400 hover:text-gray-200"
              }`}
            >
              <div className="flex items-center gap-2">
                <div
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    isActive ? "bg-cyan-400 ring-4 ring-cyan-400/20 scale-125" : "bg-gray-600 group-hover:bg-gray-400"
                  }`}
                />
                <span className="text-xs font-medium">{zone.name}</span>
              </div>
              <span className="text-[9px] font-mono opacity-60 group-hover:opacity-100">{zone.range}</span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
