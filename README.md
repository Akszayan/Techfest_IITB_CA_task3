# 🌌 Chrono·Parallax Odyssey — Interactive Multi-Dimensional Journey
> **TechFest IIT Bombay — Web Development Task 3: Interactive Parallax Scrolling Page**

An immersive, responsive, and performance-optimized interactive parallax web application built with **Next.js 14**, **TypeScript**, **Tailwind CSS**, and the **Web Audio API**. Traverse seamlessly from the deepest ocean trenches to the farthest cosmic event horizon with multi-plane depth illusions, dynamic physics, and procedural ambient audio.

---

## ✨ Features & Architecture

### 1. 🌊 Multi-Tier Dimensional Parallax Realms
Traverse 4 continuous altitude zones with 5 discrete parallax depth planes operating at distinct velocity factors:
- **I. The Abyssal Sanctuary (`-10,928m`)**: Bioluminescent Hadal zone with glowing interactive jellyfish, floating particles, deep sea monoliths, and an active sonar ping emitter.
- **II. Neo-Metropolis Spire (`0m` to `+3,000m`)**: Cyberpunk skyline with autonomous hover-speeders gliding across multi-tier sky rails, holographic advertisements, and a theme customizer terminal.
- **III. The Celestial Aether (`+15,400m`)**: Stratospheric weightless sanctuary with floating sky islands, aurora borealis ribbons, and an interactive anti-gravity crystal spawner.
- **IV. The Event Horizon (`+408,000km`)**: Deep space gravitational singularity featuring a rotating accretion disk, interactive constellation linker mini-game, and supernova burst celebrations.

### 2. 🎛️ Real-Time Telemetry & Depth Gauge HUD
- Live altitude calculation from `-10,928m` (Mariana Trench) to `+408,000km` (Deep Cosmos).
- Real-time scroll velocity meter (`km/h`), atmospheric pressure readout (`atm`), and progression tracking.
- Interactive quick-warp jump points to instantly navigate between dimension sectors.

### 3. 👓 3D Layer Inspector Mode (Exploded View)
- Real-time **3D isometric perspective tilt** mode to visually dissect and understand the separation of background, midground, content, and foreground planes.
- Live **Parallax Multiplier Slider** (`0.2x` subtle to `2.5x` hyper-depth).

### 4. 🎵 Procedural Web Audio Ambient Synthesizer
- Built using native **HTML5 Web Audio API** with zero external audio asset dependencies.
- Generates zone-adaptive ambient frequencies (underwater low-pass drone, cyberpunk sawtooth pads, celestial wind harmonics, and cosmic resonance).
- Interactive sound effects for sonar pings, warp jumps, crystal harmonics, and UI interactions.

### 5. ⚡ 60/120 FPS High-Performance Canvas & Hardware Acceleration
- Particle physics canvas that smoothly adapts particles (bubbles, cyber data bits, golden aether pollen, star warp streaks).
- Hardware-accelerated CSS `translate3d` transforms with sub-pixel interpolation and mouse-driven inertial damping.

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: v18.0 or higher
- **npm** or **yarn** / **pnpm**

### Installation & Local Run

1. Navigate into the `task 3` directory:
   ```bash
   cd "task 3"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:3002
   ```

### Production Build
```bash
npm run build
npm run start
```

---

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Custom Glassmorphism, CSS 3D Transforms
- **Icons**: Lucide React
- **Audio Engine**: Procedural Web Audio API
- **Particle System**: HTML5 2D Canvas with requestAnimationFrame
- **Celebration Engine**: Canvas Confetti
