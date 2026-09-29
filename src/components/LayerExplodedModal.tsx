"use client";

import React from "react";
import { Layers, Eye, Zap, Sliders, X, CheckCircle2 } from "lucide-react";

interface LayerExplodedModalProps {
  isOpen: boolean;
  onClose: () => void;
  is3DMode: boolean;
  onToggle3DMode: () => void;
  parallaxSpeed: number;
  onChangeParallaxSpeed: (speed: number) => void;
}

export const LayerExplodedModal: React.FC<LayerExplodedModalProps> = ({
  isOpen,
  onClose,
  is3DMode,
  onToggle3DMode,
  parallaxSpeed,
  onChangeParallaxSpeed,
}) => {
  if (!isOpen) return null;

  const layersInfo = [
    {
      name: "Foreground Particle & Glare Overlay",
      speed: `${(1.8 * parallaxSpeed).toFixed(1)}x Speed`,
      zDepth: "Z: +180px",
      color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
      desc: "Fast moving caustics, bubbles, wind streamers, stardust streaks, cursor repulsion field.",
    },
    {
      name: "Interactive Focus Content Plane",
      speed: `${(1.0 * parallaxSpeed).toFixed(1)}x (Standard 1.0x)`,
      zDepth: "Z: 0px (Base)",
      color: "bg-purple-500/20 text-purple-300 border-purple-500/40",
      desc: "Typography, interactive cards, mini-games, terminal controls, CTA buttons.",
    },
    {
      name: "Midground Floating Elements",
      speed: `${(0.55 * parallaxSpeed).toFixed(2)}x Speed`,
      zDepth: "Z: -120px",
      color: "bg-pink-500/20 text-pink-300 border-pink-500/40",
      desc: "Bioluminescent jellyfish, hover cars, floating crystal islands, orbiting asteroids.",
    },
    {
      name: "Distant Architectural & Horizon Silhouette",
      speed: `${(0.25 * parallaxSpeed).toFixed(2)}x Speed`,
      zDepth: "Z: -300px",
      color: "bg-amber-500/20 text-amber-300 border-amber-500/40",
      desc: "Sunken monoliths, neon mega-towers, mountain ridges, auroras, accretion disks.",
    },
    {
      name: "Cosmic Nebula & Gradient Backdrop",
      speed: `${(0.08 * parallaxSpeed).toFixed(2)}x (Nearly Static)`,
      zDepth: "Z: -600px",
      color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/40",
      desc: "Deep atmospheric lighting, infinite star fields, dimensional gradients.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-2xl glass-panel p-6 rounded-3xl border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.15)] text-white flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold tracking-tight">Parallax Layer Inspector</h3>
              <p className="text-xs text-gray-400">Multi-plane perspective breakdown & live physics controls</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-gray-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 3D Exploded View Toggle */}
        <div className="flex flex-col sm:flex-row items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4 text-cyan-400" />
              <h4 className="font-semibold text-sm">3D Isometric View Mode</h4>
            </div>
            <p className="text-xs text-gray-400 mt-0.5">
              Tilts the entire webpage in real 3D perspective to visually inspect separate layer planes.
            </p>
          </div>
          <button
            onClick={onToggle3DMode}
            className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-2 transition-all ${
              is3DMode
                ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
                : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
            }`}
          >
            <Zap className="w-4 h-4" />
            {is3DMode ? "Disable 3D Tilt" : "Enable 3D Tilt"}
          </button>
        </div>

        {/* Parallax Speed Multiplier Slider */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col gap-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-semibold flex items-center gap-1.5 text-gray-300">
              <Sliders className="w-3.5 h-3.5 text-purple-400" /> Parallax Intensity Multiplier
            </span>
            <span className="font-mono text-purple-300 font-bold">{parallaxSpeed.toFixed(1)}x</span>
          </div>
          <input
            type="range"
            min="0.2"
            max="2.5"
            step="0.1"
            value={parallaxSpeed}
            onChange={(e) => onChangeParallaxSpeed(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-purple-400"
          />
          <div className="flex justify-between text-[10px] font-mono text-gray-500">
            <span>0.2x (Subtle)</span>
            <span>1.0x (Standard)</span>
            <span>2.5x (Hyper-Depth)</span>
          </div>
        </div>

        {/* Layers Stack Diagram */}
        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto pr-1">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Active Parallax Depth Planes</span>
          {layersInfo.map((l, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex flex-col gap-1 hover:border-white/20 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-200 flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" /> {l.name}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${l.color}`}>
                    {l.speed}
                  </span>
                  <span className="text-[10px] font-mono text-gray-400">{l.zDepth}</span>
                </div>
              </div>
              <p className="text-[11px] text-gray-400">{l.desc}</p>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 font-medium text-xs text-white hover:brightness-110 transition-all shadow-lg"
          >
            Return to Exploration
          </button>
        </div>
      </div>
    </div>
  );
};
