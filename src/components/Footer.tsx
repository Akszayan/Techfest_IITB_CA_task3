"use client";

import React from "react";
import { ArrowUp, Sparkles, Code2, Layers, Cpu, Compass } from "lucide-react";

interface FooterProps {
  onScrollToTop: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onScrollToTop }) => {
  return (
    <footer className="relative z-30 border-t border-white/10 bg-[#020108] text-white py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-400 via-indigo-500 to-pink-500 p-0.5 shadow-[0_0_20px_rgba(0,240,255,0.4)]">
              <div className="w-full h-full bg-[#030b1e] rounded-2xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold tracking-wider uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-pink-400">
                CHRONO·PARALLAX ODYSSEY
              </h4>
              <p className="text-xs text-gray-400 font-mono">TechFest IIT Bombay · Task 3 Submission</p>
            </div>
          </div>

          {/* Quick Badges */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-cyan-300">
              <Layers className="w-3 h-3" /> Multi-Tier Parallax (5 Planes)
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-purple-300">
              <Cpu className="w-3 h-3" /> 60/120 FPS GPU Acceleration
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[11px] font-mono text-amber-300">
              <Code2 className="w-3 h-3" /> Web Audio Synthesizer
            </div>
          </div>

          {/* Scroll to Top Button */}
          <button
            onClick={onScrollToTop}
            className="group flex items-center gap-2 px-5 py-2.5 rounded-2xl glass-panel border border-white/15 hover:border-cyan-400 text-xs font-semibold text-white transition-all shadow-lg hover:shadow-cyan-500/20 active:scale-95"
          >
            <span>TOP (ABYSS)</span>
            <ArrowUp className="w-4 h-4 text-cyan-400 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 font-mono gap-3">
          <span>&copy; {new Date().getFullYear()} Chrono·Parallax Odyssey. All interactive assets rendered in real-time.</span>
          <span className="text-cyan-400/80">Crafted with Next.js 14, TypeScript & Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
};
