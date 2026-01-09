"use client";

import React, { useState, useEffect } from "react";

interface PokeBallLoaderProps {
  isLoading: boolean;
  onLoadingComplete: () => void;
}

const PokeBallLoader: React.FC<PokeBallLoaderProps> = ({
  isLoading,
  onLoadingComplete,
}) => {
  const [showStars, setShowStars] = useState(false);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const loadingMessages = [
    "Searching for Pokemon...",
    "Catching wild bugs...",
    "Running from wild Rattata...",
    "Battling Team Rocket...",
    "Collecting Badges...",
    "Healing Pokemon at Center...",
    "Learning new moves...",
  ];

  // Handle loading complete
  useEffect(() => {
    if (!isLoading) {
      setShowStars(true);
      const timer = setTimeout(() => {
        setShowStars(false);
        onLoadingComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isLoading, onLoadingComplete]);

  // Loading progress animation
  useEffect(() => {
    if (!isLoading) return;

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          // Notify parent to stop loading
          onLoadingComplete();
          return 100;
        }
        return prev + Math.random() * 8 + 2;
      });
    }, 200);

    const messageInterval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length);
    }, 1500);

    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [isLoading]);

  return (
    <div className="poke-loader-container">
      {/* Poke Ball */}
      <div className={`poke-ball-wrapper ${isLoading ? "shaking" : "neutral"}`}>
        <img
          src="/assets/icons/pokemon_ball.png"
          alt="Pokeball"
          className="poke-ball-pixel"
        />

        {/* Success stars - pop out when loading completes */}
        <div className={`stars-container ${showStars ? "visible" : ""}`}>
          <img
            src="/assets/icons/stars.png"
            alt="Success Stars"
            className="pixel-stars-image"
          />
        </div>
      </div>

      {/* Loading progress */}
      {isLoading && (
        <>
          <p className="loading-text pixel-font">{loadingMessages[messageIndex]}</p>
          <div className="health-bar">
            <div
              className="health-bar-fill"
              style={{ width: `${Math.min(progress, 100)}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-xs text-retro-beige/70 pixel-font">
            <span>HP</span>
            <span>{Math.floor(Math.min(progress, 100))}%</span>
          </div>
        </>
      )}

      {/* Success message */}
      {!isLoading && showStars && (
        <p className="success-text">Caught it!</p>
      )}
    </div>
  );
};

export default PokeBallLoader;
