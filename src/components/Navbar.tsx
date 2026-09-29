"use client";

import React, { useState } from "react";
import { Volume2, VolumeX, Eye, Sparkles, Rocket, Menu, X, Layers } from "lucide-react";

interface NavbarProps {
  isPlayingAudio: boolean;
  onToggleAudio: () => void;
  activeZone: "abyss" | "cyber" | "celestial" | "void";
  onSelectZone: (zone: "abyss" | "cyber" | "celestial" | "void") => void;
  onOpenInspector: () => void;
  is3DMode: boolean;
  onTriggerWarp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  isPlayingAudio,
  onToggleAudio,
  activeZone,
  onSelectZone,
  onOpenInspector,
  is3DMode,
  onTriggerWarp,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks: { id: "abyss" | "cyber" | "celestial" | "void"; label: string; tag: string }[] = [
    { id: "abyss", label: "Abyss", tag: "-10,000m" },
    { id: "cyber", label: "Metropolis", tag: "0m" },
    { id: "celestial", label: "Aether", tag: "+15km" },
    { id: "void", label: "Cosmos", tag: "+∞" },
  ];

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
      <nav className="glass-panel px-4 py-2.5 sm:px-6 sm:py-3 rounded-full flex items-center justify-between shadow-2xl border border-white/15">
        {/* Brand Logo */}
        <div
          onClick={() => onSelectZone("abyss")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 p-0.5 group-hover:rotate-180 transition-transform duration-700 shadow-[0_0_15px_rgba(0,240,255,0.4)]">
            <div className="w-full h-full bg-[#030b1e] rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-extrabold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-teal-200 to-pink-400 uppercase">
              CHRONO·PARALLAX
            </span>
            <span className="text-[9px] font-mono tracking-widest text-gray-400 -mt-0.5">ODYSSEY THROUGH DEPTHS</span>
          </div>
        </div>

        {/* Desktop Nav Zone Links */}
        <div className="hidden md:flex items-center gap-1 bg-black/40 px-2 py-1 rounded-full border border-white/10">
          {navLinks.map((item) => {
            const isActive = activeZone === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectZone(item.id)}
                className={`relative px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${
                  isActive
                    ? "text-white bg-gradient-to-r from-cyan-500/80 to-purple-600/80 shadow-md shadow-cyan-500/20"
                    : "text-gray-400 hover:text-gray-200 hover:bg-white/5"
                }`}
              >
                <span>{item.label}</span>
                <span className="text-[9px] font-mono opacity-60">{item.tag}</span>
              </button>
            );
          })}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Ambient Sound Generator Button */}
          <button
            onClick={onToggleAudio}
            title={isPlayingAudio ? "Mute Ambient Soundscape" : "Start Procedural Web Audio Synth"}
            className={`relative p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border transition-all ${
              isPlayingAudio
                ? "bg-cyan-500/20 text-cyan-300 border-cyan-400/40 shadow-[0_0_15px_rgba(0,240,255,0.3)]"
                : "bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            {isPlayingAudio ? (
              <>
                <Volume2 className="w-4 h-4 text-cyan-400" />
                <span className="hidden sm:inline text-[11px] font-mono">AUDIO ON</span>
                <span className="flex items-end gap-0.5 h-3">
                  <span className="w-0.5 bg-cyan-400 h-full animate-[pulse_0.6s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-cyan-400 h-2/3 animate-[pulse_0.8s_ease-in-out_infinite]" />
                  <span className="w-0.5 bg-cyan-400 h-4/5 animate-[pulse_0.7s_ease-in-out_infinite]" />
                </span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="hidden sm:inline text-[11px] font-mono">AUDIO OFF</span>
              </>
            )}
          </button>

          {/* 3D Inspector Button */}
          <button
            onClick={onOpenInspector}
            title="Open 3D Parallax Layer Inspector"
            className={`p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 border transition-all ${
              is3DMode
                ? "bg-purple-500/30 text-purple-300 border-purple-400/50 shadow-[0_0_15px_rgba(168,85,247,0.4)]"
                : "bg-white/5 text-gray-300 border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Layers className="w-4 h-4 text-purple-400" />
            <span className="hidden lg:inline text-[11px] font-mono">3D INSPECT</span>
          </button>

          {/* Warp Travel Button */}
          <button
            onClick={onTriggerWarp}
            title="Trigger Cosmic Warp Speed Jump"
            className="p-2 sm:px-3 sm:py-1.5 rounded-full text-xs font-medium bg-gradient-to-r from-pink-500 to-rose-600 hover:from-pink-600 hover:to-rose-700 text-white flex items-center gap-1.5 shadow-lg shadow-pink-500/25 transition-all active:scale-95"
          >
            <Rocket className="w-4 h-4" />
            <span className="hidden sm:inline text-[11px] font-semibold tracking-wider">WARP</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-full md:hidden text-gray-300 hover:text-white bg-white/5"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-2 p-4 glass-panel rounded-3xl border border-white/10 flex flex-col gap-2">
          {navLinks.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onSelectZone(item.id);
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-between p-3 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-sm"
            >
              <span>{item.label}</span>
              <span className="text-xs font-mono text-cyan-400">{item.tag}</span>
            </button>
          ))}
        </div>
      )}
    </header>
  );
};
