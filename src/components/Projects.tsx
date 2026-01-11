"use client";

import { useEffect, useMemo, useState } from "react";

interface Project {
  name: string;
  description: string;
  type: string;
  power: number;
  status: "caught" | "wild" | "egg";
  iconItem: string; // ✅ use item name from PokeAPI (Poké Balls)
  tags: string[];
}

type ItemResponse = {
  sprites?: { default?: string | null };
};

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [battleMode, setBattleMode] = useState(false);

  // ✅ Project icons changed to different Poké Balls
  const projects: Project[] = [
    {
      name: "PERSONAL-WEB",
      description:
        "My personal page to introduce myself, constructed by React and TailwindCSS",
      type: "NORMAL",
      power: 85,
      status: "caught",
      iconItem: "poke-ball",
      tags: ["React", "Node.js", "TailwindCSS"],
    },
    {
      name: "HepaZone",
      description:
        "Scoring tools for zonation pattern of liver single cell RNA seq data",
      type: "PSYCHIC",
      power: 30,
      status: "egg",
      iconItem: "great-ball",
      tags: ["R"],
    },
    {
      name: "Bioinfovis",
      description:
        "Personal-use tools for visualization of general bioinformatics tools",
      type: "GHOST",
      power: 40,
      status: "wild",
      iconItem: "ultra-ball",
      tags: ["R", "Python"],
    },
    {
      name: "NEED TO BE DONE",
      description: "Waiting to add something here",
      type: "WATER",
      power: 0,
      status: "egg",
      iconItem: "master-ball",
      tags: ["Nothing"],
    },
    {
      name: "NEED TO BE DONE",
      description: "Waiting to add something here",
      type: "FAIRY",
      power: 0,
      status: "egg",
      iconItem: "premier-ball",
      tags: ["Nothing"],
    },
    {
      name: "NEED TO BE DONE",
      description: "Waiting to add something here",
      type: "DRAGON",
      power: 0,
      status: "egg",
      iconItem: "luxury-ball",
      tags: ["Nothing"],
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

  const statusColors: Record<Project["status"], string> = {
    caught: "bg-green-500",
    wild: "bg-yellow-500",
    egg: "bg-orange-400",
  };

  const handleProjectClick = (index: number) => {
    setSelectedProject(index === selectedProject ? null : index);
  };

  // ✅ fetch sprites from PokeAPI once, cache in state
  const allProjectIconItems = useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => s.add(p.iconItem));
    return Array.from(s);
  }, [projects]);

  const [iconUrlByItem, setIconUrlByItem] = useState<Record<string, string>>({});

  // A safe fallback (in case some item has no sprite or fetch fails)
  const fallbackIcon =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png";

  useEffect(() => {
    let cancelled = false;

    async function loadProjectIcons() {
      const entries = await Promise.all(
        allProjectIconItems.map(async (itemName) => {
          try {
            const res = await fetch(`https://pokeapi.co/api/v2/item/${itemName}/`, {
              cache: "force-cache",
            });
            if (!res.ok) return [itemName, ""] as const;

            const data = (await res.json()) as ItemResponse;
            return [itemName, data.sprites?.default ?? ""] as const;
          } catch {
            return [itemName, ""] as const;
          }
        })
      );

      if (cancelled) return;

      const next: Record<string, string> = {};
      for (const [k, v] of entries) next[k] = v || "";
      setIconUrlByItem(next);
    }

    loadProjectIcons();

    return () => {
      cancelled = true;
    };
  }, [allProjectIconItems]);

  const getProjectIconSrc = (itemName: string) => {
    return iconUrlByItem[itemName] || fallbackIcon;
  };

  // Prevent infinite onError loop
  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    if (img.src !== fallbackIcon) img.src = fallbackIcon;
  };

  return (
    <section
      id="projects"
      className="min-h-screen flex items-center bg-gradient-to-b from-pokemon-blue-dark to-pokemon-dark py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pokemon-yellow pokemon-text mb-4 flex items-center justify-center gap-3">
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/adventure-guide.png"
              alt="pokedex"
              className="w-10 h-10"
              onError={handleImgError}
            />
            POKéDEX (PROJECTS)
            <img
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/adventure-guide.png"
              alt="pokedex"
              className="w-10 h-10"
              onError={handleImgError}
            />
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
            <img
              src={
                battleMode
                  ? "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/tm-fighting.png"
                  : "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/data-card-01.png"
              }
              alt={battleMode ? "battle" : "pokedex"}
              className="w-6 h-6"
              onError={handleImgError}
            />
            <span>{battleMode ? "BATTLE MODE" : "POKéDEX MODE"}</span>
          </button>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={`${project.name}-${index}`} // ✅ avoid duplicate key
              onClick={() => handleProjectClick(index)}
              className={`
                relative p-6 rounded-xl border-4 cursor-pointer
                transition-all duration-300
                ${
                  selectedProject === index
                    ? "bg-pokemon-yellow border-pokemon-yellow-dark"
                    : "bg-pokemon-cream/10 border-pokemon-cream/30 hover:bg-pokemon-cream/20"
                }
                ${battleMode ? "battle-card" : ""}
              `}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 flex items-center justify-center">
                  <img
                    src={getProjectIconSrc(project.iconItem)}
                    alt={project.name}
                    className="w-12 h-12"
                    onError={handleImgError}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`${typeColors[project.type]} text-xs px-2 py-1 rounded text-white font-bold`}
                  >
                    {project.type}
                  </span>
                  <span
                    className={`w-3 h-3 rounded-full ${statusColors[project.status]}`}
                    title={project.status}
                  />
                </div>
              </div>

              {/* Project Name */}
              <h3 className="text-xl font-bold text-pokemon-cream mb-2 pokemon-text">
                {project.name}
              </h3>

              {/* Power Level */}
              <div className="mb-4">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-400">POWER</span>
                  <span className="text-pokemon-yellow">{project.power}</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pokemon-yellow to-pokemon-red"
                    style={{ width: `${project.power}%` }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-400 text-sm mb-4">{project.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-2 py-1 rounded ${
                      selectedProject === index
                        ? "bg-pokemon-dark text-pokemon-yellow"
                        : "bg-pokemon-blue/30 text-pokemon-cream"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Selected Details */}
              {selectedProject === index && (
                <div className="mt-4 p-4 bg-pokemon-dark border-t-4 border-pokemon-yellow rounded-lg">
                  <div className="text-center">
                    <p className="text-pokemon-yellow font-bold mb-2 flex items-center justify-center gap-2">
                      <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/star-piece.png"
                        alt="star"
                        className="w-5 h-5"
                        onError={handleImgError}
                      />
                      {project.name}
                      <img
                        src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/star-piece.png"
                        alt="star"
                        className="w-5 h-5"
                        onError={handleImgError}
                      />
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
            <p className="text-pokemon-dark font-bold flex items-center justify-center gap-2">
              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/light-ball.png"
                alt="tip"
                className="w-6 h-6"
                onError={handleImgError}
              />
              TIP: Click on a project to see its stats and start a battle! Defeat
              all wild projects to catch them all!
            </p>
          </div>
        )}

        {/* Project Caught Counter */}
        <div className="mt-8 flex justify-center">
          <div className="bg-pokemon-cream/10 border-4 border-pokemon-cream/30 rounded-xl px-8 py-4 flex items-center gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-pokemon-yellow flex items-center justify-center gap-1">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png"
                  alt="caught"
                  className="w-6 h-6"
                  onError={handleImgError}
                />
                {projects.filter((p) => p.status === "caught").length}
              </div>
              <div className="text-xs text-gray-400">CAUGHT</div>
            </div>
            <div className="text-2xl text-gray-400">|</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pokemon-yellow flex items-center justify-center gap-1">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/safari-ball.png"
                  alt="wild"
                  className="w-6 h-6"
                  onError={handleImgError}
                />
                {projects.filter((p) => p.status === "wild").length}
              </div>
              <div className="text-xs text-gray-400">WILD</div>
            </div>
            <div className="text-2xl text-gray-400">|</div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pokemon-yellow flex items-center justify-center gap-1">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/oval-stone.png"
                  alt="eggs"
                  className="w-6 h-6"
                  onError={handleImgError}
                />
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
