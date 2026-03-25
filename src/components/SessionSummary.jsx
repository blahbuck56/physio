import { useState } from 'react';
import { getExerciseById } from '../data/exercises';
import useBreakpoint from '../hooks/useBreakpoint';

const feelingOptions = [
  { id: 'great', emoji: '😊', label: 'Great' },
  { id: 'okay', emoji: '😐', label: 'Okay' },
  { id: 'rough', emoji: '😩', label: 'Rough' },
];

export default function SessionSummary({ state, dispatch }) {
  const { lastSummary, streak } = state;
  const { isDesktop } = useBreakpoint();
  const [selectedFeeling, setSelectedFeeling] = useState(null);

  if (!lastSummary) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center">
        <button
          onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'dashboard' })}
          className="px-6 py-3 rounded-2xl bg-[var(--color-mint)] text-white font-bold"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const { exercises, totalDuration, feedbackCounts } = lastSummary;
  const mins = Math.floor(totalDuration / 60);
  const secs = totalDuration % 60;
  const timeStr = mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
  const painfulCount = feedbackCounts.painful || 0;

  const handleFeeling = (feeling) => {
    setSelectedFeeling(feeling);
    dispatch({ type: 'SET_OVERALL_FEELING', feeling });
  };

  const handleDone = () => {
    dispatch({ type: 'SET_SCREEN', screen: 'dashboard' });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-5">
      <div className={`w-full animate-fade-in-up ${isDesktop ? 'max-w-xl' : 'max-w-md'}`}>
        <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 shadow-sm">
          {/* Celebration header */}
          <div className="text-center mb-8">
            <div className="text-5xl mb-4">🎉</div>
            <h1 className="text-2xl font-display font-bold text-[var(--color-text)] mb-2">Session Complete!</h1>
            <p className="text-[var(--color-text-secondary)]">
              {exercises.length} exercise{exercises.length !== 1 ? 's' : ''} in {timeStr}
            </p>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="text-center p-3 rounded-xl bg-[var(--color-surface)]">
              <div className="text-2xl font-bold text-[var(--color-mint)]">{exercises.length}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Exercises</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-[var(--color-surface)]">
              <div className="text-2xl font-bold text-[var(--color-text)]">{timeStr}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Duration</div>
            </div>
            <div className="text-center p-3 rounded-xl bg-[var(--color-surface)]">
              <div className="text-2xl font-bold text-[var(--color-mint)]">{streak}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Day Streak</div>
            </div>
          </div>

          {/* Feedback breakdown */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Feedback Summary</h3>
            <div className="grid grid-cols-4 gap-2">
              {[
                { key: 'easy', label: 'Easy', emoji: '😌', color: 'text-emerald-600' },
                { key: 'normal', label: 'Good', emoji: '👍', color: 'text-blue-600' },
                { key: 'hard', label: 'Hard', emoji: '💪', color: 'text-amber-600' },
                { key: 'painful', label: 'Pain', emoji: '⚠️', color: 'text-red-600' },
              ].map(item => (
                <div key={item.key} className="text-center p-2.5 rounded-xl bg-[var(--color-surface)]">
                  <div className="text-lg mb-0.5">{item.emoji}</div>
                  <div className={`text-base font-bold ${item.color}`}>{feedbackCounts[item.key] || 0}</div>
                  <div className="text-[10px] text-[var(--color-text-muted)]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Exercise list */}
          <div className="mb-6">
            <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Exercises Completed</h3>
            <div className="space-y-2">
              {exercises.map((ex, i) => {
                const exerciseData = getExerciseById(ex.id);
                const feedbackEmoji = { easy: '😌', normal: '👍', hard: '💪', painful: '⚠️' }[ex.feedback] || '✓';
                return (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-[var(--color-surface)]">
                    <div className="w-7 h-7 rounded-full bg-[var(--color-mint)] text-white flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M2 6l3 3 5-5" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-[var(--color-text)] truncate">
                        {exerciseData?.name || `Exercise ${ex.id}`}
                      </div>
                      {ex.duration > 0 && (
                        <div className="text-xs text-[var(--color-text-muted)]">
                          {Math.floor(ex.duration / 60)}m {ex.duration % 60}s
                        </div>
                      )}
                    </div>
                    <span className="text-lg flex-shrink-0">{feedbackEmoji}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pain warning */}
          {painfulCount > 0 && (
            <div className="bg-red-50 rounded-2xl border border-red-100 p-4 mb-6">
              <p className="text-sm text-red-700 flex items-start gap-2">
                <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 mt-0.5">
                  <circle cx="8" cy="8" r="6" /><path d="M8 5v3M8 10.5h.01" />
                </svg>
                {painfulCount} exercise{painfulCount !== 1 ? 's' : ''} flagged as painful.
                Consider consulting your physio if pain persists.
              </p>
            </div>
          )}

          {/* Overall feeling prompt */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-[var(--color-text)] mb-3 text-center">How do you feel overall?</h3>
            <div className="flex gap-3 justify-center">
              {feelingOptions.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => handleFeeling(opt.id)}
                  className={`flex-1 max-w-[100px] p-3 rounded-2xl border-2 transition-all active:scale-[0.97] text-center ${
                    selectedFeeling === opt.id
                      ? 'border-[var(--color-mint)] bg-emerald-50'
                      : 'border-[var(--color-border)] bg-white hover:border-[var(--color-mint)]/30'
                  }`}
                >
                  <div className="text-2xl mb-1">{opt.emoji}</div>
                  <div className="text-xs font-medium text-[var(--color-text-secondary)]">{opt.label}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Done CTA */}
          <button
            onClick={handleDone}
            className="w-full py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 transition-all active:scale-[0.98]"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
