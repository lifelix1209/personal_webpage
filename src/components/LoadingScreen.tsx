"use client";

import { useState } from "react";
import PokeBallLoader from "./PokeBallLoader";
import "./PokeBallLoader.css";

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

export default function LoadingScreen({ onLoadingComplete }: LoadingScreenProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Start exit animation
    setTimeout(() => {
      setIsExiting(true);
      // Wait for exit animation to complete before calling parent
      setTimeout(() => {
        onLoadingComplete();
      }, 800);
    }, 1000);
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-pokemon-dark overflow-hidden transition-all duration-700 ease-in-out ${
        isExiting ? "opacity-0 scale-95 translate-y-4" : "opacity-100 scale-100 translate-y-0"
      }`}
    >
      {/* Background stars */}
      <BackgroundStars />

      {/* Main content */}
      <div className="relative z-10">
        <PokeBallLoader isLoading={isLoading} onLoadingComplete={handleLoadingComplete} />
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-xs text-pokemon-cream/30 tracking-widest pixel-font">
        &copy; 2002-2026 Nintendium inc.
      </div>
    </div>
  );
}

// Background stars component
function BackgroundStars() {
  const stars = Array.from({ length: 40 }, () => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 3}s`,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 2 + 1,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {stars.map((star, i) => (
        <div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: Math.random() * 0.5 + 0.2,
            animation: `twinkle ${star.duration}s ease-in-out infinite`,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
