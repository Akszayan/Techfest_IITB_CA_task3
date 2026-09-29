import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Chrono·Parallax Odyssey — Interactive Multi-Dimensional Journey",
  description: "An immersive multi-layered interactive parallax scrolling experience from the Mariana Abyssal Depths to the Cosmic Event Horizon.",
  keywords: ["parallax", "scrolling", "interactive", "web development", "nextjs", "tailwind", "techfest", "threejs", "audio synth"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#02010a] text-[#e6edf3] min-h-screen selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
