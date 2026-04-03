'use client';

import React, { useState } from 'react';
import GameLayout from '@/components/gamified/GameLayout';
import { usei18n } from '@/contexts/i18nContext';
import Link from 'next/link';

interface Island {
  id: number;
  name: string;
  progress: number;
  locked: boolean;
  lessons: number;
}

interface Archipelago {
  id: number;
  name: string;
  description: string;
  islands: Island[];
}

export default function ArchipelagoPage() {
  const { t } = usei18n();
  const [archipelagos] = useState<Archipelago[]>([
    {
      id: 1,
      name: 'Mathematics Kingdom',
      description: 'Master the fundamentals of mathematics',
      islands: [
        { id: 1, name: 'Algebra Island', progress: 100, locked: false, lessons: 5 },
        { id: 2, name: 'Geometry Island', progress: 60, locked: false, lessons: 6 },
        { id: 3, name: 'Calculus Island', progress: 0, locked: true, lessons: 8 },
      ],
    },
    {
      id: 2,
      name: 'English Literature',
      description: 'Explore the world of literature',
      islands: [
        { id: 4, name: 'Poetry Island', progress: 80, locked: false, lessons: 4 },
        { id: 5, name: 'Novel Island', progress: 30, locked: false, lessons: 7 },
      ],
    },
  ]);

  return (
    <GameLayout xp={2450} level={5} streak={12}>
      <div className="space-y-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4">
            {t('gamification.archipelago')}
          </h1>
          <p className="text-purple-200 text-lg">
            Choose your learning path and master new skills!
          </p>
        </div>

        {archipelagos.map((archipelago) => (
          <div key={archipelago.id} className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-xl border border-purple-500/30 p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-white mb-2">{archipelago.name}</h2>
            <p className="text-purple-200 mb-6">{archipelago.description}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {archipelago.islands.map((island) => (
                <Link
                  key={island.id}
                  href={`/island/${island.id}`}
                  className={`group relative overflow-hidden rounded-lg border transition-all duration-300 ${
                    island.locked
                      ? 'bg-gray-600/20 border-gray-500/30 cursor-not-allowed opacity-50'
                      : 'bg-gradient-to-br from-blue-600/30 to-purple-600/30 border-blue-400/30 hover:border-blue-400/60 hover:shadow-lg hover:shadow-blue-500/20'
                  }`}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <h3 className="text-xl font-bold text-white flex-1">{island.name}</h3>
                      {island.locked ? (
                        <span className="text-2xl">🔒</span>
                      ) : (
                        <span className="text-2xl">🏝️</span>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-purple-300">{t('dashboard.progress')}</span>
                          <span className="text-white font-semibold">{island.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-blue-400 to-purple-400 h-2 rounded-full transition-all"
                            style={{ width: `${island.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <p className="text-sm text-purple-300">
                        {island.lessons} {t('gamification.mission')}s
                      </p>

                      {!island.locked && (
                        <button className="w-full mt-4 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition">
                          {island.progress === 100 ? '✓ Completed' : 'Continue Learning'}
                        </button>
                      )}
                    </div>
                  </div>

                  {island.locked && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                      <div className="text-center">
                        <p className="text-white font-semibold">Unlock by completing previous islands</p>
                      </div>
                    </div>
                  )}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </GameLayout>
  );
}
