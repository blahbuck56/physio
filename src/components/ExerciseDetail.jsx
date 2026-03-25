import { useState } from 'react';
import { difficultyColors } from '../data/exercises';
import Timer from './Timer';

export default function ExerciseDetail({ exercise, onBack }) {
  const [activeTab, setActiveTab] = useState('instructions');

  return (
    <div className="animate-fade-in-up">
      {/* Header */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors mb-4 text-sm"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to exercises
      </button>

      {/* Title */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="text-2xl font-display font-bold text-[var(--color-text)]">
            {exercise.name}
          </h1>
          <span className={`text-xs px-2 py-1 rounded-full border font-medium capitalize ${difficultyColors[exercise.difficulty]}`}>
            {exercise.difficulty}
          </span>
        </div>
        <p className="text-[var(--color-text-secondary)] leading-relaxed">
          {exercise.description}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 text-center">
          <div className="text-xs text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">Duration</div>
          <div className="text-[var(--color-mint)] font-bold">{exercise.duration}</div>
        </div>
        <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-4 text-center">
          <div className="text-xs text-[var(--color-text-muted)] mb-1 uppercase tracking-wider">Volume</div>
          <div className="text-[var(--color-mint)] font-bold">{exercise.reps}</div>
        </div>
      </div>

      {/* Timer */}
      <Timer />

      {/* Tabs */}
      <div className="flex gap-1 bg-[var(--color-surface)] rounded-xl p-1 mb-4">
        {['instructions', 'muscles', 'evidence'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all capitalize ${
              activeTab === tab
                ? 'bg-[var(--color-mint)]/15 text-[var(--color-mint)]'
                : 'text-[var(--color-text-muted)] hover:text-[var(--color-text-secondary)]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5">
        {activeTab === 'instructions' && (
          <div>
            <ol className="space-y-3">
              {exercise.instructions.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--color-mint)]/10 text-[var(--color-mint)] text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <span className="text-sm text-[var(--color-text-secondary)] leading-relaxed pt-0.5">
                    {step}
                  </span>
                </li>
              ))}
            </ol>
            {exercise.commonMistakes.length > 0 && (
              <div className="mt-5 pt-4 border-t border-[var(--color-border)]">
                <h4 className="text-sm font-bold text-[var(--color-amber)] mb-2 flex items-center gap-2">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                    <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                  </svg>
                  Common Mistakes
                </h4>
                <ul className="space-y-1">
                  {exercise.commonMistakes.map((mistake, i) => (
                    <li key={i} className="text-sm text-[var(--color-text-muted)] flex items-start gap-2">
                      <span className="text-[var(--color-danger)] mt-0.5">•</span>
                      {mistake}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {activeTab === 'muscles' && (
          <div className="flex flex-wrap gap-2">
            {exercise.targetMuscles.map((muscle, i) => (
              <span
                key={i}
                className="px-3 py-2 rounded-lg bg-[var(--color-mint)]/10 text-[var(--color-mint)] text-sm border border-[var(--color-mint)]/20"
              >
                {muscle}
              </span>
            ))}
          </div>
        )}

        {activeTab === 'evidence' && (
          <div className="flex items-start gap-3">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-[var(--color-mint)] flex-shrink-0 mt-0.5">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed italic">
              {exercise.evidenceNote}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
