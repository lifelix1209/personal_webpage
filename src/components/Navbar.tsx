"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

// SVG Icons with animations
const HomeIcon = ({ active }: { active: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={active ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    className={`transition-all duration-300 ${active ? "scale-110" : "scale-100"}`}
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const AboutIcon = ({ active }: { active: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={active ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    className={`transition-all duration-300 ${active ? "scale-110 rotate-12" : "scale-100"}`}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4M12 8h.01" />
  </svg>
);

const ProjectsIcon = ({ active }: { active: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={active ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    className={`transition-all duration-300 ${active ? "scale-110" : "scale-100"}`}
  >
    <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <line x1="3" y1="9" x2="21" y2="9" />
    <line x1="9" y1="21" x2="9" y2="9" />
  </svg>
);

const ContactIcon = ({ active }: { active: boolean }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill={active ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    className={`transition-all duration-300 ${active ? "scale-110" : "scale-100"}`}
  >
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);

// Pokeball Image Icon for Navbar
const PokeballNavIcon = () => (
  <img
    src="/assets/icons/pokemon_ball.png"
    alt="Pokeball"
    width="24"
    height="24"
    className="animate-spin-slow"
    style={{
      imageRendering: "pixelated",
      width: 24,
      height: 24,
    }}
  />
);

const HeartIcon = ({ filled }: { filled: boolean }) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill={filled ? "#ff0000" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    className={`transition-all duration-300 ${filled ? "scale-125" : "scale-100"}`}
  >
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const MenuIcon = ({ open }: { open: boolean }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="transition-all duration-300"
  >
    {open ? (
      <>
        <line x1="18" y1="6" x2="6" y2="18" className="transition-all duration-300" />
        <line x1="6" y1="6" x2="18" y2="18" className="transition-all duration-300" />
      </>
    ) : (
      <>
        <line x1="3" y1="12" x2="21" y2="12" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <line x1="3" y1="18" x2="21" y2="18" />
      </>
    )}
  </svg>
);

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("about");
  const [isFavorite, setIsFavorite] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const navItems = [
    { name: "HOME", href: "#home", Icon: HomeIcon },
    { name: "ABOUT", href: "#about", Icon: AboutIcon },
    { name: "PROJECTS", href: "#projects", Icon: ProjectsIcon },
    { name: "CONTACT", href: "#contact", Icon: ContactIcon },
  ];

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const scrollPos = window.scrollY + 150;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPos >= offsetTop && scrollPos < offsetTop + offsetHeight) {
            setActiveSection(section);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = () => setIsOpen(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-pokemon-dark/95 backdrop-blur-sm border-b-4 border-pokemon-red">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="#home"
            className="flex items-center gap-2 group"
            onClick={handleNavClick}
          >
            <div className="w-10 h-10 bg-pokemon-red rounded-full border-4 border-pokemon-cream flex items-center justify-center group-hover:animate-bounce transition-all duration-300">
              <PokeballNavIcon />
            </div>
            <span className="text-pokemon-yellow font-bold text-lg tracking-wider pokemon-text group-hover:text-pokemon-red transition-colors duration-300">
              TRAINER.IO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              const isHovered = hoveredItem === item.name;
              const Icon = item.Icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  onMouseEnter={() => setHoveredItem(item.name)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-lg
                    font-bold text-sm tracking-wider
                    transition-all duration-300
                    border-2
                    ${
                      isActive
                        ? "bg-pokemon-yellow text-pokemon-dark border-pokemon-yellow-dark"
                        : "text-pokemon-cream border-transparent hover:bg-pokemon-cream/10"
                    }
                  `}
                >
                  {/* Hover glow effect */}
                  {isHovered && !isActive && (
                    <div className="absolute inset-0 bg-pokemon-yellow/20 rounded-lg animate-pulse" />
                  )}
                  <Icon active={isActive || isHovered} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>

          {/* Favorite Toggle */}
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`
              hidden md:flex items-center gap-2 px-4 py-2 rounded-lg
              font-bold text-sm tracking-wider
              border-2 transition-all duration-300
              ${isFavorite ? "bg-pokemon-red text-pokemon-cream border-pokemon-red-dark" : "text-pokemon-red border-pokemon-red hover:bg-pokemon-red/10"}
            `}
          >
            <HeartIcon filled={isFavorite} />
            <span>{isFavorite ? "SAVED" : "SAVE"}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg border-2 border-pokemon-cream text-pokemon-cream hover:bg-pokemon-cream/10 transition-colors"
          >
            <MenuIcon open={isOpen} />
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-pokemon-dark border-b-4 border-pokemon-red">
          <div className="px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.slice(1);
              const Icon = item.Icon;

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg
                    font-bold text-sm tracking-wider
                    transition-all duration-200
                    border-2
                    ${
                      isActive
                        ? "bg-pokemon-yellow text-pokemon-dark border-pokemon-yellow-dark"
                        : "text-pokemon-cream border-pokemon-cream/30 hover:bg-pokemon-cream/10"
                    }
                  `}
                >
                  <Icon active={isActive} />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
