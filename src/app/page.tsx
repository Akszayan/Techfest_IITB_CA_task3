"use client";

import React, { useState, useEffect } from "react";
import { useParallax } from "@/hooks/useParallax";
import { useAudioEngine } from "@/hooks/useAudioEngine";
import { Navbar } from "@/components/Navbar";
import { DepthGauge } from "@/components/DepthGauge";
import { FloatingParticlesCanvas } from "@/components/FloatingParticlesCanvas";
import { AbyssalSection } from "@/components/AbyssalSection";
import { CyberMetropolisSection } from "@/components/CyberMetropolisSection";
import { CelestialSkySection } from "@/components/CelestialSkySection";
import { CosmicVoidSection } from "@/components/CosmicVoidSection";
import { LayerExplodedModal } from "@/components/LayerExplodedModal";
import { Footer } from "@/components/Footer";

export default function Home() {
  const {
    scrollY,
    scrollProgress,
    scrollVelocity,
    mousePos,
    activeZone,
    scrollToZone,
  } = useParallax();

  const {
    isPlaying: isPlayingAudio,
    toggleAudio,
    playSfx,
    setCurrentZone,
  } = useAudioEngine();

  const [isInspectorOpen, setIsInspectorOpen] = useState(false);
  const [is3DMode, setIs3DMode] = useState(false);
  const [parallaxSpeed, setParallaxSpeed] = useState(1.0);

  // Synchronize audio engine with active parallax zone
  useEffect(() => {
    setCurrentZone(activeZone);
  }, [activeZone, setCurrentZone]);

  const handleTriggerWarp = () => {
    playSfx("warp");
    // If near top, warp to cosmos; if near bottom, warp to abyss
    if (scrollProgress < 0.5) {
      scrollToZone("void");
    } else {
      scrollToZone("abyss");
    }
  };

  const handleRestartJourney = () => {
    scrollToZone("abyss");
    playSfx("click");
  };

  return (
    <main
      className={`relative min-h-screen w-full transition-transform duration-500 origin-center ${
        is3DMode ? "exploded-view-active" : ""
      }`}
    >
      {/* Interactive Global Particles & Stars Layer */}
      <FloatingParticlesCanvas
        activeZone={activeZone}
        scrollVelocity={scrollVelocity}
        mousePos={mousePos}
      />

      {/* Navigation Bar */}
      <Navbar
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={toggleAudio}
        activeZone={activeZone}
        onSelectZone={scrollToZone}
        onOpenInspector={() => setIsInspectorOpen(true)}
        is3DMode={is3DMode}
        onTriggerWarp={handleTriggerWarp}
      />

      {/* Floating Right HUD Depth Gauge & Telemetry */}
      <DepthGauge
        scrollY={scrollY}
        scrollProgress={scrollProgress}
        scrollVelocity={scrollVelocity}
        activeZone={activeZone}
        onSelectZone={scrollToZone}
      />

      {/* 3D Parallax Layer Inspector Modal */}
      <LayerExplodedModal
        isOpen={isInspectorOpen}
        onClose={() => setIsInspectorOpen(false)}
        is3DMode={is3DMode}
        onToggle3DMode={() => setIs3DMode(!is3DMode)}
        parallaxSpeed={parallaxSpeed}
        onChangeParallaxSpeed={setParallaxSpeed}
      />

      {/* SECTION 1: The Abyssal Trench (-10,928m) */}
      <AbyssalSection
        scrollY={scrollY}
        mousePos={mousePos}
        parallaxSpeed={parallaxSpeed}
        onPlaySfx={playSfx}
      />

      {/* SECTION 2: Neo-Metropolis Spire (0m to +3,000m) */}
      <CyberMetropolisSection
        scrollY={scrollY}
        mousePos={mousePos}
        parallaxSpeed={parallaxSpeed}
        onPlaySfx={playSfx}
      />

      {/* SECTION 3: The Celestial Stratosphere (+15,000m) */}
      <CelestialSkySection
        scrollY={scrollY}
        mousePos={mousePos}
        parallaxSpeed={parallaxSpeed}
        onPlaySfx={playSfx}
      />

      {/* SECTION 4: Cosmic Event Horizon (+408,000 km) */}
      <CosmicVoidSection
        scrollY={scrollY}
        mousePos={mousePos}
        parallaxSpeed={parallaxSpeed}
        onPlaySfx={playSfx}
        onRestartJourney={handleRestartJourney}
      />

      {/* Footer */}
      <Footer onScrollToTop={() => scrollToZone("abyss")} />
    </main>
  );
}
