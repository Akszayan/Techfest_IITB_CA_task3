"use client";

import { useEffect, useRef, useState, useCallback } from "react";

export function useAudioEngine() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.25);
  const [currentZone, setCurrentZone] = useState<"abyss" | "cyber" | "celestial" | "void">("abyss");

  const audioCtxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const oscillatorsRef = useRef<{ [key: string]: any }>({});
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const initAudio = useCallback(() => {
    if (audioCtxRef.current) return;
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);

      audioCtxRef.current = ctx;
      masterGainRef.current = masterGain;

      // Create ambient noise buffer (pink noise for ocean/wind)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.04;
        b6 = white * 0.115926;
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = noiseBuffer;
      noiseSource.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "lowpass";
      noiseFilter.frequency.setValueAtTime(200, ctx.currentTime);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.3, ctx.currentTime);

      noiseSource.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(masterGain);
      noiseSource.start(0);

      // Deep drone
      const droneOsc = ctx.createOscillator();
      droneOsc.type = "sine";
      droneOsc.frequency.setValueAtTime(55, ctx.currentTime); // A1 note

      const droneGain = ctx.createGain();
      droneGain.gain.setValueAtTime(0.4, ctx.currentTime);

      droneOsc.connect(droneGain);
      droneGain.connect(masterGain);
      droneOsc.start(0);

      // Harmonic pad
      const padOsc = ctx.createOscillator();
      padOsc.type = "triangle";
      padOsc.frequency.setValueAtTime(110, ctx.currentTime);

      const padFilter = ctx.createBiquadFilter();
      padFilter.type = "lowpass";
      padFilter.frequency.setValueAtTime(400, ctx.currentTime);

      const padGain = ctx.createGain();
      padGain.gain.setValueAtTime(0.15, ctx.currentTime);

      padOsc.connect(padFilter);
      padFilter.connect(padGain);
      padGain.connect(masterGain);
      padOsc.start(0);

      oscillatorsRef.current = {
        noiseFilter,
        noiseGain,
        droneOsc,
        droneGain,
        padOsc,
        padFilter,
        padGain,
      };

      // Periodic gentle tone generator
      let step = 0;
      const notesByZone = {
        abyss: [55, 82.41, 110, 164.81],
        cyber: [130.81, 164.81, 196.00, 246.94, 293.66],
        celestial: [220, 277.18, 329.63, 440, 554.37],
        void: [110, 146.83, 174.61, 220, 293.66],
      };

      intervalRef.current = setInterval(() => {
        if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
        const currentContext = audioCtxRef.current;
        const notes = notesByZone[currentZone] || notesByZone.abyss;
        const freq = notes[step % notes.length];
        step++;

        const pingOsc = currentContext.createOscillator();
        const pingGain = currentContext.createGain();
        pingOsc.type = currentZone === "cyber" ? "sawtooth" : "sine";
        pingOsc.frequency.setValueAtTime(freq, currentContext.currentTime);

        const pingFilter = currentContext.createBiquadFilter();
        pingFilter.type = "lowpass";
        pingFilter.frequency.setValueAtTime(currentZone === "cyber" ? 1800 : 800, currentContext.currentTime);

        const now = currentContext.currentTime;
        pingGain.gain.setValueAtTime(0.001, now);
        pingGain.gain.exponentialRampToValueAtTime(0.08, now + 0.1);
        pingGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.8);

        pingOsc.connect(pingFilter);
        pingFilter.connect(pingGain);
        pingGain.connect(masterGainRef.current!);

        pingOsc.start(now);
        pingOsc.stop(now + 2.0);
      }, 1600);

    } catch (e) {
      console.warn("Web Audio initialization skipped:", e);
    }
  }, [volume, currentZone]);

  const toggleAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      initAudio();
      setIsPlaying(true);
    } else {
      if (audioCtxRef.current.state === "suspended") {
        audioCtxRef.current.resume();
        setIsPlaying(true);
      } else if (audioCtxRef.current.state === "running") {
        audioCtxRef.current.suspend();
        setIsPlaying(false);
      }
    }
  }, [initAudio]);

  const playSfx = useCallback((type: "sonar" | "warp" | "crystal" | "click") => {
    if (!audioCtxRef.current || audioCtxRef.current.state !== "running") return;
    const ctx = audioCtxRef.current;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === "sonar") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(900, now);
      osc.frequency.exponentialRampToValueAtTime(450, now + 0.8);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
    } else if (type === "warp") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(100, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.6);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7);
    } else if (type === "crystal") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, now);
      osc.frequency.exponentialRampToValueAtTime(1800, now + 0.4);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.9);
    } else {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, now);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
    }

    osc.connect(gain);
    gain.connect(masterGainRef.current || ctx.destination);
    osc.start(now);
    osc.stop(now + 1.5);
  }, []);

  // Update soundscape when zone changes
  useEffect(() => {
    if (!audioCtxRef.current || !oscillatorsRef.current.noiseFilter) return;
    const ctx = audioCtxRef.current;
    const osc = oscillatorsRef.current;
    const now = ctx.currentTime;

    if (currentZone === "abyss") {
      osc.noiseFilter.frequency.setTargetAtTime(180, now, 0.5);
      osc.droneOsc.frequency.setTargetAtTime(55, now, 0.5);
      osc.padFilter.frequency.setTargetAtTime(300, now, 0.5);
    } else if (currentZone === "cyber") {
      osc.noiseFilter.frequency.setTargetAtTime(800, now, 0.5);
      osc.droneOsc.frequency.setTargetAtTime(65.41, now, 0.5);
      osc.padFilter.frequency.setTargetAtTime(1200, now, 0.5);
    } else if (currentZone === "celestial") {
      osc.noiseFilter.frequency.setTargetAtTime(450, now, 0.5);
      osc.droneOsc.frequency.setTargetAtTime(110, now, 0.5);
      osc.padFilter.frequency.setTargetAtTime(1800, now, 0.5);
    } else if (currentZone === "void") {
      osc.noiseFilter.frequency.setTargetAtTime(120, now, 0.5);
      osc.droneOsc.frequency.setTargetAtTime(40, now, 0.5);
      osc.padFilter.frequency.setTargetAtTime(600, now, 0.5);
    }
  }, [currentZone]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (audioCtxRef.current) audioCtxRef.current.close();
    };
  }, []);

  return { isPlaying, toggleAudio, playSfx, currentZone, setCurrentZone, volume, setVolume };
}
