"use client";

import { useState } from "react";

interface Project {
  name: string;
  description: string;
  type: string;
  power: number;
  status: "caught" | "wild" | "egg";
  emoji: string;
  tags: string[];
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [battleMode, setBattleMode] = useState(false);

  const projects: Project[] = [
    {
      name: "E-COMMERCE",
      description: "A full-stack online store with payment integration and inventory management.",
      type: "NORMAL",
      power: 85,
      status: "caught",
      emoji: "🛒",
      tags: ["React", "Node.js", "MongoDB"],
    },
    {
      name: "TASK MASTER",
      description: "Real-time collaborative task manager with team features and analytics.",
      type: "PSYCHIC",
      power: 78,
      status: "caught",
      emoji: "📋",
      tags: ["Next.js", "TypeScript", "WebSocket"],
    },
    {
      name: "PORTFOLIO V1",
      description: "Personal portfolio website with smooth animations and dark mode.",
      type: "GHOST",
      power: 65,
      status: "caught",
      emoji: "🎨",
      tags: ["React", "Tailwind CSS", "Framer"],
    },
    {
      name: "WEATHER APP",
      description: "Weather forecasting with location-based services and beautiful UI.",
      type: "WATER",
      power: 70,
      status: "wild",
      emoji: "🌤️",
      tags: ["React", "Weather API", "CSS3"],
    },
    {
      name: "CHAT APP",
      description: "Real-time messaging application with rooms and file sharing.",
      type: "FAIRY",
      power: 72,
      status: "egg",
      emoji: "💬",
      tags: ["Socket.io", "Express", "Redis"],
    },
    {
      name: "DATA VIS",
      description: "Interactive data visualization dashboard for analytics.",
      type: "DRAGON",
      power: 90,
      status: "wild",
      emoji: "📊",
      tags: ["D3.js", "Python", "Pandas"],
    },
  ];

  const typeColors: Record<string, string> = {
    NORMAL: "bg-gray-400",
    FIRE: "bg-red-500",
    WATER: "bg-blue-500",
    ELECTRIC: "bg-yellow-500",
    PSYCHIC: "bg-pink-500",
    GHOST: "bg-purple-700",
    FAIRY: "bg-pink-300",
    DRAGON: "bg-indigo-600",
    GRASS: "bg-green-500",
  };

  const statusColors = {
    caught: "bg-green-500",
    wild: "bg-yellow-500",
    egg: "bg-orange-400",
  };

  const handleProjectClick = (index: number) => {
    setSelectedProject(index === selectedProject ? null : index);
  };

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center bg-gradient-to-b from-pokemon-blue-dark to-pokemon-dark py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pokemon-yellow pokemon-text mb-4">
            🎒 POKéDEX (PROJECTS) 🎒
          </h2>
          <div className="flex justify-center gap-4">
            <div className="w-32 h-1 bg-pokemon-red" />
            <div className="w-32 h-1 bg-pokemon-cream" />
            <div className="w-32 h-1 bg-pokemon-green" />
          </div>
        </div>

        {/* Battle Toggle */}
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setBattleMode(!battleMode)}
            className={`gba-button px-6 py-2 flex items-center gap-2 ${
              battleMode ? "bg-pokemon-red" : ""
            }`}
          >
            <span>{battleMode ? "⚔️" : "📖"}</span>
            <span>{battleMode ? "BATTLE MODE" : "POKéDEX MODE"}</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={project.name}
              onClick={() => handleProjectClick(index)}
              className={`
                relative p-6 rounded-xl border-4 cursor-pointer
                transition-all duration-300
                ${
                  selectedProject === index
                    ? "bg-pokemon-yellow border-pokemon-yellow-dark transform scale-105 z-10"
                    : "bg-pokemon-cream/10 border-pokemon-cream/30 hover:bg-pokemon-cream/20"
                }
                ${battleMode ? "battle-card" : ""}
              `}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{project.emoji}</div>
                <div className="flex items-center gap-2">
                  <span
                    className={`${typeColors[project.type]} text-xs px-2 py-1 rounded text-white font-bold`}
                  >
                    {project.type}
                  </span>
                  <span
                    className={`w-3 h-3 rounded-full ${
                      statusColors[project.status]
                    }`}
                    title={project.status}
                  />
                </div>
              </div>

              {/* Project Name */}
              <h3 className="text-xl font-bold text-pokemon-cream mb-2 pokemon-text">
                {project.name}
              </h3>

              {/* Power Level (like Pokemon Stats) */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">POWER</span>
                  <span className="text-pokemon-yellow">{project.power}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pokemon-yellow to-pokemon-red"
                    style={{ width: `${(project.power / 100) * 100}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-pokemon-blue/30 text-pokemon-cream rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Selected Details */}
              {selectedProject === index && (
                <div className="absolute -bottom-2 left-0 right-0 p-4 bg-pokemon-dark border-t-4 border-pokemon-yellow transform translate-full">
                  <div className="text-center">
                    <p className="text-pokemon-yellow font-bold mb-2">
                      ★ {project.name} ★
                    </p>
                    <button className="gba-button px-4 py-2 text-sm">
                      OPEN PROJECT
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Battle Mode Info */}
        {battleMode && (
          <div className="mt-12 dialog-box p-6 text-center">
            <p className="text-pokemon-dark font-bold">
              💡 TIP: Click on a project to see its stats and start a battle!
              Defeat all wild projects to catch them all!
            </p>
          </div>
        )}

        {/* Project Caught Counter */}
        <div className="mt-8 flex justify-center">
          <div className="bg-pokemon-cream/10 border-4 border-pokemon-cream/30 rounded-xl px-8 py-4 flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-pokemon-yellow">
                {projects.filter((p) => p.status === "caught").length}
              </div>
              <div className="text-xs text-gray-400">CAUGHT</div>
            </div>
            <div className="text-2xl">|</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pokemon-yellow">
                {projects.filter((p) => p.status === "wild").length}
              </div>
              <div className="text-xs text-gray-400">WILD</div>
            </div>
            <div className="text-2xl">|</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pokemon-yellow">
                {projects.filter((p) => p.status === "egg").length}
              </div>
              <div className="text-xs text-gray-400">EGGS</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
