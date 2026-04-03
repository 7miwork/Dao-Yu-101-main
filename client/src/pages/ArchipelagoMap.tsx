import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, Zap, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/contexts/I18nContext";

interface Island {
  id: number;
  name: string;
  emoji: string;
  progress: number;
  completed: boolean;
  x: number;
  y: number;
}

interface Archipelago {
  id: number;
  name: string;
  emoji: string;
  color: string;
  lightColor: string;
  islands: Island[];
  x: number;
  y: number;
}

const archipelagos: Archipelago[] = [
  {
    id: 1,
    name: "Mathematics Kingdom",
    emoji: "🏝️",
    color: "#f59e0b",
    lightColor: "#fef3c7",
    x: 20,
    y: 30,
    islands: [
      { id: 101, name: "Algebra Basics", emoji: "📐", progress: 100, completed: true, x: 15, y: 25 },
      { id: 102, name: "Geometry", emoji: "🔺", progress: 85, completed: false, x: 25, y: 30 },
      { id: 103, name: "Calculus", emoji: "📊", progress: 60, completed: false, x: 20, y: 40 },
      { id: 104, name: "Statistics", emoji: "📈", progress: 0, completed: false, x: 30, y: 35 },
    ],
  },
  {
    id: 2,
    name: "English Literature",
    emoji: "📚",
    color: "#3b82f6",
    lightColor: "#dbeafe",
    x: 60,
    y: 25,
    islands: [
      { id: 201, name: "Shakespeare", emoji: "🎭", progress: 75, completed: false, x: 55, y: 20 },
      { id: 202, name: "Poetry", emoji: "✍️", progress: 60, completed: false, x: 65, y: 25 },
      { id: 203, name: "Modern Novels", emoji: "📖", progress: 40, completed: false, x: 60, y: 35 },
      { id: 204, name: "Grammar", emoji: "🔤", progress: 90, completed: true, x: 70, y: 30 },
    ],
  },
  {
    id: 3,
    name: "Science Lab",
    emoji: "🔬",
    color: "#10b981",
    lightColor: "#d1fae5",
    x: 40,
    y: 70,
    islands: [
      { id: 301, name: "Physics", emoji: "⚛️", progress: 50, completed: false, x: 35, y: 65 },
      { id: 302, name: "Chemistry", emoji: "🧪", progress: 40, completed: false, x: 45, y: 70 },
      { id: 303, name: "Biology", emoji: "🧬", progress: 30, completed: false, x: 40, y: 80 },
      { id: 304, name: "Ecology", emoji: "🌿", progress: 20, completed: false, x: 50, y: 75 },
    ],
  },
  {
    id: 4,
    name: "History Voyage",
    emoji: "⚓",
    color: "#a855f7",
    lightColor: "#f3e8ff",
    x: 75,
    y: 60,
    islands: [
      { id: 401, name: "Ancient Rome", emoji: "🏛️", progress: 70, completed: false, x: 70, y: 55 },
      { id: 402, name: "Medieval Times", emoji: "🏰", progress: 55, completed: false, x: 80, y: 60 },
      { id: 403, name: "Renaissance", emoji: "🎨", progress: 45, completed: false, x: 75, y: 70 },
      { id: 404, name: "Modern Era", emoji: "🌍", progress: 25, completed: false, x: 85, y: 65 },
    ],
  },
  {
    id: 5,
    name: "Art Studio",
    emoji: "🎨",
    color: "#ef4444",
    lightColor: "#fee2e2",
    x: 85,
    y: 35,
    islands: [
      { id: 501, name: "Drawing", emoji: "✏️", progress: 0, completed: false, x: 80, y: 30 },
      { id: 502, name: "Painting", emoji: "🖌️", progress: 0, completed: false, x: 90, y: 35 },
      { id: 503, name: "Sculpture", emoji: "🗿", progress: 0, completed: false, x: 85, y: 45 },
      { id: 504, name: "Digital Art", emoji: "💻", progress: 0, completed: false, x: 95, y: 40 },
    ],
  },
];

export default function ArchipelagoMap() {
  const [, setLocation] = useLocation();
  const [selectedArchipelago, setSelectedArchipelago] = useState<Archipelago | null>(null);
  const [hoveredArchipelago, setHoveredArchipelago] = useState<number | null>(null);
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; opacity: number }>>([]);
  const { t } = useI18n();

  // Generate floating particles
  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: 0.5,
      };
      setParticles((prev) => [...prev.slice(-20), newParticle]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleArchipelagoClick = (archipelago: Archipelago) => {
    setSelectedArchipelago(archipelago);
  };

  const handleIslandClick = (island: Island) => {
    setLocation(`/lesson/${island.id}`);
  };

  const handleBack = () => {
    setSelectedArchipelago(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950 overflow-hidden relative">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="absolute w-1 h-1 bg-white rounded-full animate-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              opacity: particle.opacity,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
            }}
          ></div>
        ))}
      </div>

      {/* Header */}
      <div className="sticky top-0 z-40 bg-gradient-to-b from-slate-900/95 to-slate-900/50 backdrop-blur-xl border-b border-purple-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {selectedArchipelago ? (
            <>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBack}
                  className="p-2 hover:bg-purple-500/20 rounded-lg transition duration-300"
                >
                  <ChevronLeft className="w-6 h-6 text-white" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    {selectedArchipelago.emoji} {selectedArchipelago.name}
                  </h1>
                  <p className="text-sm text-purple-300">
                    {selectedArchipelago.islands.length} Topics
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                🗺️ Your Learning World
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {!selectedArchipelago ? (
          // World Map View
          <div className="space-y-8">
            {/* Interactive SVG Map */}
            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-3xl p-8 border border-purple-500/30 shadow-2xl backdrop-blur-sm">
              <svg
                className="w-full h-96 bg-gradient-to-b from-cyan-900/20 to-purple-900/20 rounded-2xl"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Gradients */}
                  <radialGradient id="waterGradient" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0.1" />
                  </radialGradient>

                  {/* Glow filter */}
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  {/* Wave pattern */}
                  <pattern id="waves" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path
                      d="M0,10 Q5,5 10,10 T20,10"
                      stroke="rgba(59,130,246,0.2)"
                      fill="none"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>

                {/* Water background */}
                <rect width="100" height="100" fill="url(#waterGradient)" />
                <rect width="100" height="100" fill="url(#waves)" />

                {/* Archipelagos with enhanced visuals */}
                {archipelagos.map((arch) => (
                  <g
                    key={arch.id}
                    onClick={() => handleArchipelagoClick(arch)}
                    onMouseEnter={() => setHoveredArchipelago(arch.id)}
                    onMouseLeave={() => setHoveredArchipelago(null)}
                    className="cursor-pointer transition-transform duration-300"
                    style={{
                      transform:
                        hoveredArchipelago === arch.id ? "scale(1.15)" : "scale(1)",
                      transformOrigin: `${arch.x}% ${arch.y}%`,
                    }}
                  >
                    {/* Glow halo */}
                    <circle
                      cx={arch.x}
                      cy={arch.y}
                      r={hoveredArchipelago === arch.id ? 9 : 7}
                      fill={arch.color}
                      opacity={hoveredArchipelago === arch.id ? 0.4 : 0.2}
                      className="transition-all duration-300"
                    />

                    {/* Outer ring */}
                    <circle
                      cx={arch.x}
                      cy={arch.y}
                      r={hoveredArchipelago === arch.id ? 6.5 : 5.5}
                      fill="none"
                      stroke={arch.color}
                      strokeWidth="0.5"
                      opacity={hoveredArchipelago === arch.id ? 1 : 0.6}
                      className="transition-all duration-300"
                    />

                    {/* Main archipelago circle */}
                    <circle
                      cx={arch.x}
                      cy={arch.y}
                      r={hoveredArchipelago === arch.id ? 5 : 4}
                      fill={arch.color}
                      filter="url(#glow)"
                      className="transition-all duration-300"
                    />

                    {/* Archipelago emoji */}
                    <text
                      x={arch.x}
                      y={arch.y + 1}
                      textAnchor="middle"
                      fontSize={hoveredArchipelago === arch.id ? "4.5" : "4"}
                      fill="white"
                      fontWeight="bold"
                      className="pointer-events-none transition-all duration-300"
                    >
                      {arch.emoji}
                    </text>

                    {/* Label with better styling */}
                    <text
                      x={arch.x}
                      y={arch.y + 13}
                      textAnchor="middle"
                      fontSize="2"
                      fill="white"
                      fontWeight="600"
                      className="pointer-events-none"
                      opacity={hoveredArchipelago === arch.id ? 1 : 0.8}
                    >
                      {arch.name.split(" ")[0]}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            {/* Archipelago Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archipelagos.map((arch) => {
                const completedIslands = arch.islands.filter((i) => i.completed).length;
                const avgProgress = Math.round(
                  arch.islands.reduce((sum, i) => sum + i.progress, 0) / arch.islands.length
                );

                return (
                  <button
                    key={arch.id}
                    onClick={() => handleArchipelagoClick(arch)}
                    className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 overflow-hidden"
                  >
                    {/* Gradient overlay on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                      style={{ backgroundColor: arch.color }}
                    ></div>

                    <div className="relative z-10 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="text-5xl drop-shadow-lg">{arch.emoji}</div>
                        <span className="text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-blue-600 px-3 py-1 rounded-full shadow-lg">
                          {completedIslands}/{arch.islands.length}
                        </span>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                          {arch.name}
                        </h3>
                        <p className="text-xs text-purple-200 mt-1">{arch.islands.length} Topics</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-xs text-purple-300 font-medium">Progress</span>
                          <span className="text-sm font-bold text-cyan-400">{avgProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden border border-purple-500/20">
                          <div
                            className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-500 shadow-lg shadow-purple-500/50"
                            style={{ width: `${avgProgress}%` }}
                          ></div>
                        </div>
                      </div>

                      <Button className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group-hover:shadow-xl">
                        Explore
                      </Button>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          // Archipelago Detail View
          <div className="space-y-8">
            {/* Archipelago Map */}
            <div className="bg-gradient-to-b from-slate-800/50 to-slate-900/50 rounded-3xl p-8 border border-purple-500/30 shadow-2xl backdrop-blur-sm">
              <svg
                className="w-full h-96 bg-gradient-to-b from-cyan-900/20 to-purple-900/20 rounded-2xl"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  <filter id="islandGlow">
                    <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                  <pattern id="waves2" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path
                      d="M0,10 Q5,5 10,10 T20,10"
                      stroke="rgba(59,130,246,0.2)"
                      fill="none"
                      strokeWidth="0.5"
                    />
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#waterGradient)" />
                <rect width="100" height="100" fill="url(#waves2)" />

                {/* Islands */}
                {selectedArchipelago.islands.map((island) => (
                  <g
                    key={island.id}
                    onClick={() => handleIslandClick(island)}
                    className="cursor-pointer transition-transform duration-300 hover:scale-125"
                    style={{ transformOrigin: `${island.x}% ${island.y}%` }}
                  >
                    {/* Glow halo */}
                    <circle
                      cx={island.x}
                      cy={island.y}
                      r="5"
                      fill={island.completed ? "#10b981" : "#f59e0b"}
                      opacity="0.3"
                    />

                    {/* Island circle */}
                    <circle
                      cx={island.x}
                      cy={island.y}
                      r="3.5"
                      fill={island.completed ? "#10b981" : "#f59e0b"}
                      filter="url(#islandGlow)"
                    />

                    {/* Island emoji */}
                    <text
                      x={island.x}
                      y={island.y + 0.5}
                      textAnchor="middle"
                      fontSize="2"
                      fill="white"
                      fontWeight="bold"
                      className="pointer-events-none"
                    >
                      {island.emoji}
                    </text>

                    {/* Completion indicator */}
                    {island.completed && (
                      <circle
                        cx={island.x + 3}
                        cy={island.y - 3}
                        r="1.2"
                        fill="#10b981"
                        stroke="white"
                        strokeWidth="0.3"
                      />
                    )}
                  </g>
                ))}
              </svg>
            </div>

            {/* Islands Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedArchipelago.islands.map((island) => (
                <button
                  key={island.id}
                  onClick={() => handleIslandClick(island)}
                  className="group relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/30 hover:border-purple-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover:scale-105 overflow-hidden"
                >
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300"
                    style={{
                      backgroundColor: island.completed ? "#10b981" : "#f59e0b",
                    }}
                  ></div>

                  <div className="relative z-10 space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="text-5xl drop-shadow-lg">{island.emoji}</div>
                      {island.completed && (
                        <span className="text-2xl text-green-400">✓</span>
                      )}
                    </div>

                    <div>
                      <h3 className="text-lg font-bold bg-gradient-to-r from-purple-300 to-blue-300 bg-clip-text text-transparent">
                        {island.name}
                      </h3>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-purple-300 font-medium">Progress</span>
                        <span className="text-sm font-bold text-cyan-400">
                          {island.progress}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700/50 rounded-full h-2.5 overflow-hidden border border-purple-500/20">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-full transition-all duration-500 shadow-lg shadow-purple-500/50"
                          style={{ width: `${island.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-purple-300">
                      <Zap className="w-4 h-4 text-amber-400" />
                      <span>+50 XP per lesson</span>
                    </div>

                    <Button className="w-full mt-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold shadow-lg hover:shadow-purple-500/50 transition-all duration-300 group-hover:shadow-xl">
                      {island.completed ? "Review" : "Start Learning"}
                    </Button>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CSS for animations */}
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}
