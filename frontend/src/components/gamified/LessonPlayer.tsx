'use client';

import React, { useState } from 'react';
import { usei18n } from '@/contexts/i18nContext';

interface LessonPlayerProps {
  lessonId: number;
  title: string;
  content: string;
  type: 'text' | 'video' | 'quiz' | 'interactive';
  onComplete: () => void;
}

export default function LessonPlayer({
  lessonId,
  title,
  content,
  type,
  onComplete,
}: LessonPlayerProps) {
  const { t } = usei18n();
  const [isCompleted, setIsCompleted] = useState(false);

  const handleComplete = () => {
    setIsCompleted(true);
    onComplete();
  };

  return (
    <div className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 rounded-xl border border-purple-500/30 p-8 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-white mb-6">{title}</h2>

        {/* Content Area */}
        <div className="bg-black/30 rounded-lg p-8 mb-8 min-h-96">
          {type === 'text' && (
            <div className="prose prose-invert max-w-none">
              <p className="text-purple-100 leading-relaxed">{content}</p>
            </div>
          )}

          {type === 'video' && (
            <div className="bg-gray-800 rounded-lg flex items-center justify-center h-96">
              <div className="text-center">
                <p className="text-6xl mb-4">🎬</p>
                <p className="text-purple-300">Video content would be displayed here</p>
              </div>
            </div>
          )}

          {type === 'quiz' && (
            <div className="space-y-4">
              <div className="bg-purple-600/20 border border-purple-400/30 rounded-lg p-4">
                <p className="text-white font-semibold mb-3">Question 1: Sample Question?</p>
                <div className="space-y-2">
                  {['Option A', 'Option B', 'Option C', 'Option D'].map((option, idx) => (
                    <label key={idx} className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="question1"
                        className="w-4 h-4"
                      />
                      <span className="text-purple-100">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {type === 'interactive' && (
            <div className="text-center">
              <p className="text-6xl mb-4">🎮</p>
              <p className="text-purple-300">Interactive content would be displayed here</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 justify-end">
          <button className="px-6 py-3 bg-gray-600/30 hover:bg-gray-600/50 text-white rounded-lg font-semibold transition border border-gray-500/30">
            {t('common.back')}
          </button>
          <button
            onClick={handleComplete}
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-semibold transition"
          >
            {isCompleted ? '✓ ' : ''}{t('gamification.completed')}
          </button>
        </div>

        {/* XP Reward */}
        {isCompleted && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-gradient-to-r from-yellow-400 to-orange-400 rounded-lg p-6">
              <p className="text-gray-900 font-bold text-lg">+100 XP Earned!</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
