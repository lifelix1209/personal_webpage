"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import clsx from "clsx";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";

// Portal wrapper - renders children into document.body
const Portal = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? createPortal(children, document.body) : null;
};

// GBA Screen Component with pixel effect
const GBAScreen = ({ children, isTitle = false, isSmall = false }: { children: React.ReactNode; isTitle?: boolean; isSmall?: boolean }) => (
  <div className={clsx("bg-gray-800 rounded-lg shadow-inner border-b-8 border-gray-900", isSmall ? "p-1.5" : "p-3")}>
    <div
      className={`
        bg-gray-900 rounded border-4 border-gray-700 overflow-hidden relative
        ${isTitle ? "bg-gradient-to-b from-sky-500 to-sky-300" : ""}
      `}
      style={isSmall ? { height: "80px" } : {}}
    >
      {children}
    </div>
  </div>
);

// D-Pad with Framer Motion spring animation
const DPad = ({ isSmall = false, onClick }: { isSmall?: boolean; onClick?: () => void }) => {
  const size = isSmall ? 40 : 100;
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    setTimeout(() => setIsPressed(false), 150);
    onClick?.();
  };

  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className="cursor-pointer"
      onClick={handlePress}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Base */}
        <rect x="25" y="25" width="50" height="50" fill="#2a2a2a" rx="4" />
        {/* Cross - Vertical */}
        <motion.rect
          x="40" y="10" width="20" height="80"
          fill="#333"
          animate={{
            scaleY: isPressed ? 0.95 : 1,
            fill: isPressed ? "#4a4a4a" : "#333"
          }}
          transition={{ duration: 0.1 }}
        />
        {/* Cross - Horizontal */}
        <motion.rect
          x="10" y="40" width="80" height="20"
          fill="#333"
          animate={{
            scaleX: isPressed ? 0.95 : 1,
            fill: isPressed ? "#4a4a4a" : "#333"
          }}
          transition={{ duration: 0.1 }}
        />
        {/* Arrows */}
        <polygon points="50,15 44,25 56,25" fill="#555" />
        <polygon points="50,85 44,75 56,75" fill="#555" />
        <polygon points="15,50 25,44 25,56" fill="#555" />
        <polygon points="85,50 75,44 75,56" fill="#555" />
        {/* Center */}
        <circle cx="50" cy="50" r="8" fill="#1a1a1a" />
      </svg>
    </motion.div>
  );
};

// A/B Buttons with spring animation
const ActionButton = ({
  label,
  color,
  onClick,
  isPressed,
  isSmall = false
}: {
  label: string;
  color: string;
  onClick?: () => void;
  isPressed?: boolean;
  isSmall?: boolean;
}) => {
  const size = isSmall ? 10 : 14;
  return (
    <div className="flex flex-col items-center">
      <motion.button
        onClick={onClick}
        whileTap={{ scale: 0.9, y: 2 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="rounded-full cursor-pointer"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          boxShadow: isPressed
            ? "inset 0 2px 4px rgba(0,0,0,0.3)"
            : `0 4px 0 ${color}60, 0 6px 10px rgba(0,0,0,0.3)`,
        }}
      />
      {!isSmall && <span className="text-xs text-gray-400 mt-2 font-bold">{label}</span>}
    </div>
  );
};

// Start/Select Buttons with spring animation
const SmallButton = ({ label, isPressed, isSmall = false }: { label: string; isPressed?: boolean; isSmall?: boolean }) => {
  const btnWidth = isSmall ? 8 : 10;
  const btnHeight = isSmall ? 4 : 5;
  return (
    <div className="flex flex-col items-center">
      <motion.button
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
        className="rounded-full cursor-pointer"
        style={{
          width: btnWidth,
          height: btnHeight,
          backgroundColor: "#666",
          boxShadow: isPressed
            ? "inset 0 2px 4px rgba(0,0,0,0.4)"
            : "0 2px 0 #444, 0 3px 5px rgba(0,0,0,0.3)",
        }}
      />
      {!isSmall && <span className="text-[10px] text-gray-400 mt-2">{label}</span>}
    </div>
  );
};

// Power LED
const PowerLED = ({ on }: { on: boolean }) => (
  <div className="flex items-center gap-1">
    <div
      className={`
        w-3 h-3 rounded-full transition-all duration-300
        ${on ? "bg-green-400 shadow-lg shadow-green-400/50" : "bg-gray-600"}
      `}
    />
    <span className="text-[8px] text-green-400 tracking-wider hidden lg:inline">POWER</span>
  </div>
);

// Pokemon Ball Image for screen
const PokemonBallSVG = ({ isSmall = false }: { isSmall?: boolean }) => {
  const size = isSmall ? 24 : 60;
  return (
    <img
      src="/assets/icons/pokemon_ball.png"
      alt="Pokeball"
      width={size}
      height={size}
      className="animate-bounce"
      style={{
        imageRendering: "pixelated",
        width: size,
        height: size,
      }}
    />
  );
};

// Star SVG decoration
const StarSVG = ({ delay, className = "" }: { delay: string; className?: string }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="#ffd700"
    xmlns="http://www.w3.org/2000/svg"
    className={"animate-pulse " + className}
    style={{ animationDelay: delay }}
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

// Cloud SVG
const CloudSVG = ({ className }: { className?: string }) => (
  <svg
    width="48"
    height="32"
    viewBox="0 0 48 32"
    fill="white"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path d="M8 20c-4.4 0-8 3.6-8 8s3.6 8 8 8h32c4.4 0 8-3.6 8-8s-3.6-8-8-8H20c-2.2 0-4-1.8-4-4s1.8-4 4-4h4c1.1 0 2 .9 2 2 0 .55.45 1 1 1s1-.45 1-1c0-1.1-.9-2-2-2h-4c-2.2 0-4-1.8-4-4s1.8-4 4-4h12c2.2 0 4 1.8 4 4s-1.8 4-4 4H8z" />
  </svg>
);

// Tree SVG
const TreeSVG = ({ className = "" }: { className?: string }) => (
  <svg
    width="32"
    height="48"
    viewBox="0 0 32 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect x="12" y="32" width="8" height="16" fill="#8B4513" />
    <polygon points="16,0 0,24 8,24 4,36 28,36 24,24 32,24" fill="#228B22" />
    <polygon points="16,6 6,22 10,22 8,30 24,30 22,22 26,22" fill="#2E8B57" />
  </svg>
);

// Menu Icons as SVG
const FolderIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
  </svg>
);

const UserIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

const MailIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
  </svg>
);

const HomeIcon = ({ className }: { className?: string }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const ArrowIcon = ({ className }: { className?: string }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
  </svg>
);

// Title Screen
const TitleScreen = ({ onStart, isSmall = false }: { onStart: () => void; isSmall?: boolean }) => {
  const [blink, setBlink] = useState(true);
  const [buttonPressed, setButtonPressed] = useState<string | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setBlink(!blink), 400);
    return () => clearInterval(interval);
  }, [blink]);

  const handlePress = (btn: string) => {
    setButtonPressed(btn);
    if (btn === "A" || btn === "START") {
      onStart();
    }
    setTimeout(() => setButtonPressed(null), 150);
  };

  if (isSmall) {
    return (
      <div className="h-full flex items-center justify-center bg-gradient-to-b from-sky-500 to-sky-300">
        <PokemonBallSVG isSmall />
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <TreeSVG className="absolute bottom-0 left-4" />
        <TreeSVG className="absolute bottom-0 right-8" />
        <motion.div
          className="absolute top-8 right-12"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <CloudSVG className="w-12 h-8" />
        </motion.div>
        <motion.div
          className="absolute top-16 left-16"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        >
          <CloudSVG className="w-10 h-6" />
        </motion.div>
        <StarSVG delay="0s" className="absolute top-4 left-8" />
        <StarSVG delay="0.5s" className="absolute top-6 right-4" />
      </div>

      {/* Title with spring animation */}
      <motion.div
        className="relative z-10 text-center pt-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.div
          className="text-3xl font-bold text-white pokemon-text mb-2"
          style={{
            textShadow: "4px 4px 0 #333",
          }}
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          FELIX.WEB
        </motion.div>
        <div className="text-sm text-yellow-300 tracking-[0.3em] mb-6">VERSION 1.0</div>

        {/* Pokemon Ball */}
        <div className="mb-6">
          <PokemonBallSVG />
        </div>

        {/* Press Start with spring animation */}
        <motion.button
          onClick={onStart}
          onMouseDown={() => handlePress("START")}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="text-xl font-bold text-white pokemon-text cursor-pointer"
          style={{ textShadow: "2px 2px 0 #333" }}
          animate={{ opacity: blink ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          PRESS START
        </motion.button>

        {/* Button hint */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div
            onMouseDown={() => handlePress("A")}
            className="flex items-center gap-2 text-white/70 text-xs cursor-pointer hover:text-white"
          >
            <ActionButton label="" color="#27ae60" isPressed={buttonPressed === "A"} />
            <span>or press A</span>
          </div>
        </div>
      </motion.div>

      {/* Battery indicator */}
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <span className="text-[8px] text-gray-400">BATTERY</span>
        <div className="w-10 h-4 bg-green-500 rounded border border-gray-600 flex items-center justify-end px-1">
          <div className="w-1 h-2 bg-gray-600 mr-0.5" />
        </div>
      </div>
    </div>
  );
};

// Menu Screen
const MenuScreen = ({
  onMenuSelect,
  isSmall = false,
  activeSection = null
}: {
  onMenuSelect: (index: number) => void;
  isSmall?: boolean;
  activeSection?: string | null;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [buttonPressed, setButtonPressed] = useState<string | null>(null);

  const menuItems = [
    { name: "HOME", href: "home", icon: HomeIcon },
    { name: "PROJECTS", href: "projects", icon: FolderIcon },
    { name: "ABOUT", href: "about", icon: UserIcon },
    { name: "CONTACT", href: "contact", icon: MailIcon },
  ];

  // 同步 selectedIndex 与 activeSection
  useEffect(() => {
    if (activeSection) {
      const index = menuItems.findIndex(item => item.href === activeSection);
      if (index !== -1) {
        setSelectedIndex(index);
      }
    }
  }, [activeSection]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1));
      } else if (e.key === "ArrowDown") {
        setSelectedIndex((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === "Enter" || e.key === "z") {
        onMenuSelect(selectedIndex);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, onMenuSelect]);

  const handlePress = (btn: string) => {
    setButtonPressed(btn);
    if (btn === "UP") {
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : menuItems.length - 1));
    } else if (btn === "DOWN") {
      setSelectedIndex((prev) => (prev < menuItems.length - 1 ? prev + 1 : 0));
    } else if (btn === "A") {
      onMenuSelect(selectedIndex);
    }
    setTimeout(() => setButtonPressed(null), 100);
  };

  if (isSmall) {
    // Small mode: show active section or current selection
    const currentItem = activeSection
      ? menuItems.find((item) => item.href === activeSection) || menuItems[0]
      : menuItems[selectedIndex];
    const Icon = currentItem.icon;
    return (
      <div className="h-full flex items-center justify-center bg-retro-dark">
        <div className="flex items-center gap-2">
          <Icon className="text-retro-yellow" />
          <span className="text-retro-beige font-bold text-xs">{currentItem.name}</span>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full p-4 relative">
      {/* Trainer card */}
      <div className="bg-retro-green/20 rounded-lg p-3 mb-3 border-2 border-retro-green">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-retro-red rounded-full border-2 border-retro-beige flex items-center justify-center">
            <UserIcon className="text-retro-beige" />
          </div>
          <div>
            <div className="text-retro-beige font-bold text-sm">FELIX</div>
            <div className="text-retro-yellow text-xs">Lv.23</div>
          </div>
        </div>
      </div>

      {/* Menu items with spring animation */}
      <div className="space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isSelected = selectedIndex === index;

          return (
            <motion.button
              key={item.name}
              onClick={() => onMenuSelect(index)}
              onMouseDown={() => handlePress("A")}
              whileTap={{ scale: 0.98 }}
              className={clsx(
                "w-full flex items-center gap-2 p-2 rounded-lg border-2",
                isSelected
                  ? "bg-retro-yellow text-retro-dark border-retro-orange"
                  : "bg-retro-green/10 text-retro-beige border-retro-green/30 hover:bg-retro-green/20"
              )}
              animate={
                isSelected
                  ? { x: 4, scale: 1.02 }
                  : { x: 0, scale: 1 }
              }
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              <Icon className={isSelected ? "text-retro-dark" : "text-retro-beige"} />
              <span className="font-bold tracking-wider text-sm">{item.name}</span>
              {isSelected && (
                <motion.span
                  className="ml-auto"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                >
                  <ArrowIcon className="text-retro-dark" />
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 left-2 right-2 flex justify-between text-[10px] text-retro-beige/40">
        <span>MEM: 256K</span>
        <span>© 2026</span>
      </div>
    </div>
  );
};

// 浮动菜单 Overlay
const MenuOverlay = ({
  onClose,
  onMenuSelect,
  activeSection
}: {
  onClose: () => void;
  onMenuSelect: (index: number) => void;
  activeSection: string | null;
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const menuItems = [
    { name: "HOME", href: "home", icon: HomeIcon },
    { name: "PROJECTS", href: "projects", icon: FolderIcon },
    { name: "ABOUT", href: "about", icon: UserIcon },
    { name: "CONTACT", href: "contact", icon: MailIcon },
  ];

  useEffect(() => {
    if (activeSection) {
      const index = menuItems.findIndex(item => item.href === activeSection);
      if (index !== -1) {
        setSelectedIndex(index);
      }
    }
  }, [activeSection]);

  const handleSelect = (index: number) => {
    onMenuSelect(index);
    onClose();
  };

  return (
    <Portal>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 z-[9998] flex items-center justify-center"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="bg-gradient-to-b from-purple-600 to-purple-800 rounded-2xl p-6 shadow-2xl border-4 border-purple-500 max-w-sm w-full mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="text-retro-beige font-bold text-lg mb-4 text-center">
              SELECT SECTION
            </div>
            <div className="space-y-2">
              {menuItems.map((item, index) => {
                const Icon = item.icon;
                const isSelected = selectedIndex === index;
                const isActive = item.href === activeSection;

                return (
                  <motion.button
                    key={item.name}
                    onClick={() => handleSelect(index)}
                    onMouseEnter={() => setSelectedIndex(index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={clsx(
                      "w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all",
                      isSelected
                        ? "bg-retro-yellow text-retro-dark border-retro-orange shadow-lg"
                        : "bg-retro-green/10 text-retro-beige border-retro-green/30 hover:bg-retro-green/20"
                    )}
                  >
                    <Icon className={isSelected ? "text-retro-dark" : "text-retro-beige"} />
                    <span className="font-bold tracking-wider flex-1 text-left">{item.name}</span>
                    {isActive && (
                      <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    )}
                    {isSelected && <ArrowIcon className="text-retro-dark" />}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-bold text-sm transition-colors"
          >
            CLOSE (ESC)
          </button>
        </motion.div>
      </motion.div>
    </Portal>
  );
};

// GBA Component
const GBAComponent = ({
  showContent,
  buttonPressed,
  isShrunk,
  isMenuOpen,
  onStart,
  onMenuSelect,
  onButtonPress,
  onToggleMenu,
  activeSection = null
}: {
  showContent: boolean;
  buttonPressed: string | null;
  isShrunk: boolean;
  isMenuOpen: boolean;
  onStart: () => void;
  onMenuSelect: (index: number) => void;
  onButtonPress: (btn: string) => void;
  onToggleMenu: () => void;
  activeSection?: string | null;
}) => {
  const gbaWidth = isShrunk ? "180px" : "480px";
  const padding = isShrunk ? "p-2.5" : "p-8";
  const roundedClass = isShrunk ? "rounded-xl" : "rounded-[3rem]";
  const borderWidth = isShrunk ? "border-2" : "border-4";

  return (
    <motion.div
      className={clsx(
        "bg-gradient-to-b from-purple-600 to-purple-800 shadow-2xl border-purple-500 relative",
        padding,
        roundedClass,
        borderWidth
      )}
      style={{ width: gbaWidth }}
    >
      {/* Screen Area */}
      <div className="relative mb-3">
        {/* Screen bezel */}
        <div className="bg-gray-700 rounded-lg p-2 shadow-inner">
          <AnimatePresence mode="wait">
            {(!isShrunk || !isMenuOpen) && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                key="screen"
              >
                <PowerLED on={true} />
                <GBAScreen isTitle={!showContent} isSmall={isShrunk}>
                  {!showContent ? (
                    <TitleScreen onStart={onStart} isSmall={isShrunk} />
                  ) : (
                    <MenuScreen onMenuSelect={onMenuSelect} isSmall={isShrunk} activeSection={activeSection} />
                  )}
                </GBAScreen>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Screen label */}
          {!isShrunk && (
            <div className="text-center mt-1">
              <span className="text-[8px] text-gray-500 tracking-widest font-bold">
                GAME BOY ADVANCE SP
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Controls Area - Hidden when shrunk unless menu is open */}
      <AnimatePresence>
        {!isShrunk && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Controls */}
            <div className="flex justify-between items-center px-1">
              {/* Left side - D-Pad */}
              <div className="flex-shrink-0 ml-1">
                <DPad />
              </div>

              {/* Right side - A/B Buttons */}
              <div className="flex gap-4 mr-4">
                <span
                  onMouseDown={() => onButtonPress("B")}
                  className="cursor-pointer"
                >
                  <ActionButton label="B" color="#c0392b" isPressed={buttonPressed === "B"} />
                </span>
                <span
                  onMouseDown={() => onButtonPress("A")}
                  className="cursor-pointer"
                >
                  <ActionButton label="A" color="#27ae60" isPressed={buttonPressed === "A"} />
                </span>
              </div>
            </div>

            {/* Bottom - Start/Select */}
            <div className="flex justify-center gap-10 mt-4">
              <span
                onMouseDown={() => onButtonPress("SELECT")}
                className="cursor-pointer"
              >
                <SmallButton label="SELECT" isPressed={buttonPressed === "SELECT"} />
              </span>
              <span
                onMouseDown={() => onButtonPress("START")}
                className="cursor-pointer"
              >
                <SmallButton label="START" isPressed={buttonPressed === "START"} />
              </span>
            </div>

            {/* Speaker grills */}
            <div className="flex justify-between px-10 mt-4">
              <div className="flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-purple-400/50"
                    style={{ opacity: 0.3 + (i * 0.1) }}
                  />
                ))}
              </div>
              <div className="flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-purple-400/50"
                    style={{ opacity: 0.3 + (i * 0.1) }}
                  />
                ))}
              </div>
            </div>

            {/* Brand text */}
            <div className="text-center mt-2">
              <span className="text-xs font-bold text-purple-200 tracking-[0.3em]">
                Nintendium
              </span>
            </div>

            {/* Decorative lights */}
            <div className="absolute top-2 left-4 flex gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse delay-100" />
              <div className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse delay-200" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mini controls for shrunk state */}
      {isShrunk && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-center gap-2 mt-2"
        >
          <DPad isSmall onClick={onToggleMenu} />
          <div className="flex gap-1">
            <span onMouseDown={() => onButtonPress("A")} className="cursor-pointer">
              <ActionButton label="" color="#27ae60" isPressed={buttonPressed === "A"} isSmall onClick={onToggleMenu} />
            </span>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default function Hero() {
  const [showContent, setShowContent] = useState(false);
  const [buttonPressed, setButtonPressed] = useState<string | null>(null);
  const [isShrunk, setIsShrunk] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("home");
  const heroRef = useRef<HTMLElement>(null);

  const handleStart = () => {
    setShowContent(true);
  };

  const handleMenuSelect = (index: number) => {
    const routes = ["home", "projects", "about", "contact"];
    const targetId = routes[index];
    
    // 滚动到目标section
    const element = document.getElementById(targetId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // 80px offset for better UX
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth"
      });
    }
  };

  const handleButtonPress = (btn: string) => {
    setButtonPressed(btn);
    if (btn === "START" && !showContent) {
      handleStart();
    }
    if (btn === "A" && isShrunk) {
      setIsMenuOpen(!isMenuOpen);
    }
    setTimeout(() => setButtonPressed(null), 100);
  };

  const onToggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Track scroll position to shrink GBA and active section
  useEffect(() => {
    const sections = ["home", "projects", "about", "contact"];

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      // Shrink GBA after scrolling past Hero section
      if (window.scrollY > heroHeight * 0.3) {
        setIsShrunk(true);
        setShowContent(true); // 自动显示内容
      } else {
        setIsShrunk(false);
        setIsMenuOpen(false);
        setIsNavbarVisible(false);
      }

      // Track active section based on scroll position
      let currentSection = "home";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          const offset = 200; // Offset for better detection
          if (rect.top <= offset && rect.bottom >= offset) {
            currentSection = section;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始检测
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ESC键关闭菜单
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <>
      {/* Navbar - appears when GBA is clicked */}
      <AnimatePresence>
        {isShrunk && isNavbarVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 left-48 z-40"
          >
            <Navbar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <MenuOverlay
            onClose={() => setIsMenuOpen(false)}
            onMenuSelect={handleMenuSelect}
            activeSection={activeSection}
          />
        )}
      </AnimatePresence>

      {/* GBA Component - Fixed position when shrunk (using Portal) */}
      <AnimatePresence>
        {isShrunk && (
          <Portal>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              drag
              dragElastic={0}
              dragSnapToOrigin
              className="fixed top-6 left-6 z-[9999] cursor-grab active:cursor-grabbing drop-shadow-2xl pointer-events-auto"
              onClick={(e) => {
                // 单击行为
                if (!isMenuOpen) {
                  setIsMenuOpen(true);
                }
              }}
            >
              <GBAComponent
                showContent={showContent}
                buttonPressed={buttonPressed}
                isShrunk={isShrunk}
                isMenuOpen={isMenuOpen}
                onStart={handleStart}
                onMenuSelect={handleMenuSelect}
                onButtonPress={handleButtonPress}
                onToggleMenu={onToggleMenu}
                activeSection={activeSection}
              />
              {/* Drag hint */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -bottom-8 left-0 right-0 text-center"
              >
                <span className="text-[8px] text-white/60 bg-black/40 px-2 py-1 rounded">
                  CLICK AND DRAG
                </span>
              </motion.div>
            </motion.div>
          </Portal>
        )}
      </AnimatePresence>

      <section
        id="home"
        ref={heroRef}
        className={clsx(
          "flex items-start justify-center bg-retro-dark py-6 pt-10 relative min-h-screen transition-opacity duration-500",
          isShrunk ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        {/* Animated background */}
        {!isShrunk && (
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 left-10 opacity-20">
              <svg width="64" height="64" viewBox="0 0 64 64" className="animate-pulse">
                <rect x="16" y="48" width="8" height="16" fill="#333" />
                <polygon points="32,8 8,32 20,32 12,56 52,56 44,32 56,32" fill="#444" />
              </svg>
            </div>
            <div className="absolute bottom-40 right-10 opacity-20">
              <svg width="48" height="48" viewBox="0 0 48 48" className="animate-pulse delay-300">
                <circle cx="24" cy="24" r="20" fill="#333" />
                <circle cx="24" cy="24" r="10" fill="#444" />
              </svg>
            </div>
          </div>
        )}

        {/* GBA Component - Hero state */}
        {!isShrunk && (
          <motion.div className="relative z-10 -mt-4">
            <GBAComponent
              showContent={showContent}
              buttonPressed={buttonPressed}
              isShrunk={isShrunk}
              isMenuOpen={isMenuOpen}
              onStart={handleStart}
              onMenuSelect={handleMenuSelect}
              onButtonPress={handleButtonPress}
              onToggleMenu={onToggleMenu}
              activeSection={activeSection}
            />

            {/* Scroll indicator */}
            <motion.div
              className="absolute -bottom-14 left-1/2 transform -translate-x-1/2 animate-bounce"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              <div className="text-white/40 text-sm tracking-wider flex flex-col items-center gap-1">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
                </svg>
                <span className="text-xs">SCROLL DOWN</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </section>
    </>
  );
}
