"use client";

import { useState } from "react";

export default function About() {
  const [selectedPokemon, setSelectedPokemon] = useState(0);
  const [moveCooldown, setMoveCooldown] = useState(false);

  const skills = [
    { name: "PYTHON", power: 55, type: "tech", icon: "python/python-original.svg" },
    { name: "R", power: 50, type: "tech", icon: "r/r-original.svg" },
    { name: "React", power: 40, type: "tech", icon: "react/react-original.svg" },
    { name: "NEXT.JS", power: 45, type: "tech", icon: "nextjs/nextjs-original.svg" },
    { name: "TAILWIND", power: 35, type: "tech", icon: "tailwindcss/tailwindcss-original.svg" },
    { name: "NODE.JS", power: 40, type: "tech", icon: "nodejs/nodejs-original.svg" },
    { name: "GIT", power: 30, type: "tech", icon: "git/git-original.svg" }
  ];

  const playerStats = [
    { label: "LEVEL", value: 25, max: 99 },
    { label: "HP", value: 180, max: 200 },
    { label: "ATK", value: 85 },
    { label: "DEF", value: 72 },
    { label: "SPD", value: 95 },
    { label: "EXP", value: 7500, max: 10000 },
  ];

  const typeColors: Record<string, string> = {
    tech: "bg-blue-500",
    design: "bg-purple-500",
    combat: "bg-red-500",
  };

  // Pokemon selection animation
  const handlePokemonSelect = (index: number) => {
    if (!moveCooldown) {
      setSelectedPokemon(index);
      setMoveCooldown(true);
      setTimeout(() => setMoveCooldown(false), 200);
    }
  };

  return (
    <section
      id="about"
      className="min-h-screen flex items-center bg-gradient-to-b from-pokemon-dark to-pokemon-blue-dark py-20"
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-pokemon-yellow pokemon-text mb-4">
            ★ TRAINER INFO ★
          </h2>
          <div className="w-48 h-1 bg-pokemon-yellow mx-auto" />
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Panel - Trainer Card */}
          <div className="bg-pokemon-cream rounded-xl p-6 text-pokemon-dark border-4 border-pokemon-brown">
            {/* Trainer Sprite Area */}
            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-pokemon-blue rounded-full border-4 border-pokemon-blue-dark flex items-center justify-center overflow-hidden">
                <img src="/assets/icons/ava.png" alt="Avatar" className="w-full h-full object-cover" />
              </div>
            </div>

            {/* Trainer Name */}
            <div className="text-center mb-6">
              <div className="bg-pokemon-yellow inline-block px-6 py-2 rounded-lg font-bold text-xl border-2 border-pokemon-yellow-dark">
                HANZHANG "Felix" LI
              </div>
              <p className="text-sm text-gray-600 mt-2">A Bioinformatic student</p>
            </div>

            {/* Player Stats */}
            <div className="space-y-3">
              {playerStats.map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <span className="w-14 font-bold text-xs text-pokemon-brown">
                    {stat.label}
                  </span>
                  <div className="w-85">
                    <div className="bg-gray-300 rounded-full h-3 border-2 border-gray-400">
                      <div
                        className={`h-full ${
                          stat.label === "HP"
                            ? "bg-green-500"
                            : stat.label === "EXP"
                            ? "bg-pokemon-yellow"
                            : "bg-blue-500"
                        }`}
                        style={{
                          width: stat.max
                            ? `${(stat.value / stat.max) * 100}%`
                            : undefined,
                        }}
                      />
                    </div>
                  </div>
                  <span className="w-14 text-left font-bold text-pokemon-dark text-[10px]">
                    {stat.value}
                    {stat.max && `/${stat.max}`}
                  </span>
                </div>
              ))}
            </div>

            {/* Badges / Degrees */}
            <div className="mt-6 pt-4 border-t-2 border-gray-300">
              <p className="text-sm font-bold mb-3"> LEAGUE BADGE:</p>
              <div className="flex justify-between px-4">
                <div className="flex flex-col items-center">
                  <img src="/assets/icons/b1.png" alt="PhD" className="w-12 h-12 rounded-lg object-cover" />
                  <span className="text-xs text-gray-600 mt-1">PhD</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/assets/icons/b2.png" alt="BSc" className="w-12 h-12 rounded-lg object-cover" />
                  <span className="text-xs text-gray-600 mt-1">BSc</span>
                </div>
                <div className="flex flex-col items-center">
                  <img src="/assets/icons/b3.png" alt="Honor BSc" className="w-12 h-12 rounded-lg object-cover" />
                  <span className="text-xs text-gray-600 mt-1">Honor BSc</span>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="mt-6 pt-4 border-t-2 border-gray-300">
              <p className="text-sm font-bold mb-3">ABOUT ME:</p>
              <p className="text-sm text-gray-700 leading-relaxed mb-3">
                Hi, I'm Hanzhang Li! You can call me Felix. I'm a passionate in computational and developmental biology.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mb-2 font-bold">Research Interests:</p>
              <ul className="text-sm text-gray-700 leading-relaxed list-disc list-inside space-y-1">
                <li>Cell fate determination</li>
                <li>Stem cell and regenerative bio</li>
                <li>Evo Devo</li>
              </ul>
              <p className="text-sm text-gray-700 leading-relaxed mt-3">
                For my publications please see <a href="#" className="text-pokemon-blue underline">link</a>
              </p>
            </div>
          </div>

          {/* Right Panel - Skills (Pokemon Team) */}
          <div className="space-y-6">
            <div className="bg-pokemon-blue-dark rounded-xl p-6 border-4 border-pokemon-cream">
              <h3 className="text-xl font-bold text-pokemon-yellow mb-4 pokemon-text">
                ⚔️ MOVE SET (SKILLS) ⚔️
              </h3>

              {/* Skill List */}
              <div className="space-y-3">
                {skills.map((skill, index) => (
                  <div
                    key={skill.name}
                    onClick={() => handlePokemonSelect(index)}
                    className={`
                      flex items-center gap-4 p-3 rounded-lg cursor-pointer
                      border-2 transition-all duration-200
                      ${
                        selectedPokemon === index
                          ? "bg-pokemon-yellow text-pokemon-dark border-pokemon-yellow-dark transform scale-105"
                          : "bg-pokemon-cream/10 border-pokemon-cream/30 hover:bg-pokemon-cream/20"
                      }
                      ${moveCooldown ? "opacity-50 cursor-not-allowed" : ""}
                    `}
                  >
                    {/* Pokemon Icon */}
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        selectedPokemon === index
                          ? "bg-pokemon-yellow-dark"
                          : "bg-pokemon-cream/20"
                      }`}
                    >
                      <img
                        src={`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${skill.icon}`}
                        alt={skill.name}
                        className="w-8 h-8"
                      />
                    </div>

                    {/* Skill Info */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-xs px-2 py-0.5 rounded text-white font-bold ${
                            typeColors[skill.type]
                          }`}
                        >
                          {skill.type.toUpperCase()}
                        </span>
                        <span className="font-bold">{skill.name}</span>
                      </div>
                    </div>

                    {/* Power */}
                    <div className="text-right">
                      <div className="text-xs text-gray-400">POWER</div>
                      <div className="font-bold text-retro-orange">{skill.power}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Selected Skill Details */}
            <div className="dialog-box p-6">
              <h4 className="font-bold text-pokemon-dark mb-2">
                ★ {skills[selectedPokemon].name} ★
              </h4>
              <p className="text-pokemon-dark text-sm">
                A powerful technique! Deals {skills[selectedPokemon].power} damage
                to your opponents. Very effective against bugs and complex projects!
              </p>
              <div className="mt-3 flex gap-2">
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                  STAB BONUS +5
                </span>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
                  CRITICAL HIT 20%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
