import { plans } from '../data/exercises';

export default function ProgressTracker({ state, dispatch }) {
  const { profile, currentWeek, completedSessions, painLog, streak } = state;
  const plan = plans[profile.injuryArea];

  // Pain trend data (last 7 entries)
  const recentPain = painLog.slice(-7);
  const maxPain = 10;

  // Sessions per week
  const weekCounts = [1, 2, 3, 4].map(w =>
    completedSessions.filter(s => s.week === w).length
  );

  // Feedback summary
  const allFeedback = completedSessions.flatMap(s => s.exercises.map(e => e.feedback));
  const feedbackCounts = {
    easy: allFeedback.filter(f => f === 'easy').length,
    normal: allFeedback.filter(f => f === 'normal').length,
    hard: allFeedback.filter(f => f === 'hard').length,
    painful: allFeedback.filter(f => f === 'painful').length,
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="max-w-lg mx-auto px-5 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'dashboard' })}
            className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <h1 className="text-xl font-display font-bold text-[var(--color-text)]">Your Progress</h1>
        </div>

        {/* Big stats */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 text-center">
            <div className="text-4xl font-bold text-[var(--color-mint)]">{streak}</div>
            <div className="text-sm text-[var(--color-text-muted)] mt-1">Day Streak</div>
          </div>
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 text-center">
            <div className="text-4xl font-bold text-[var(--color-text)]">{completedSessions.length}</div>
            <div className="text-sm text-[var(--color-text-muted)] mt-1">Total Sessions</div>
          </div>
        </div>

        {/* Week Progress */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 mb-6">
          <h2 className="font-bold text-[var(--color-text)] mb-4">Plan Progress</h2>
          <div className="space-y-3">
            {plan.weeks.map((week, i) => {
              const isActive = week.week === currentWeek;
              const isComplete = week.week < currentWeek;
              const sessionsDone = weekCounts[i];
              return (
                <div key={week.week} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    isComplete ? 'bg-[var(--color-mint)] text-white' :
                    isActive ? 'bg-[var(--color-mint)]/15 text-[var(--color-mint)] ring-2 ring-[var(--color-mint)]/30' :
                    'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                  }`}>
                    {isComplete ? '✓' : week.week}
                  </div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${isActive ? 'text-[var(--color-text)]' : 'text-[var(--color-text-secondary)]'}`}>
                      {week.name}
                    </div>
                    <div className="text-xs text-[var(--color-text-muted)]">
                      {sessionsDone}/3 sessions
                    </div>
                  </div>
                  <div className="w-20 h-2 bg-[var(--color-surface)] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[var(--color-mint)] rounded-full"
                      style={{ width: `${Math.min(100, (sessionsDone / 3) * 100)}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Pain Trend */}
        {recentPain.length > 1 && (
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 mb-6">
            <h2 className="font-bold text-[var(--color-text)] mb-4">Pain Trend</h2>
            <div className="flex items-end gap-1 h-32">
              {recentPain.map((entry, i) => {
                const height = (entry.level / maxPain) * 100;
                const color = entry.level <= 3 ? 'bg-emerald-400' :
                  entry.level <= 6 ? 'bg-amber-400' : 'bg-red-400';
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-xs text-[var(--color-text-muted)]">{entry.level}</span>
                    <div
                      className={`w-full rounded-t-lg ${color} transition-all`}
                      style={{ height: `${Math.max(4, height)}%` }}
                    />
                    <span className="text-[10px] text-[var(--color-text-muted)]">
                      {new Date(entry.date).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                );
              })}
            </div>
            {recentPain.length >= 2 && (
              <p className="text-sm text-[var(--color-text-secondary)] mt-3 text-center">
                {recentPain[recentPain.length - 1].level < recentPain[0].level
                  ? '📉 Your pain is trending down — great progress!'
                  : recentPain[recentPain.length - 1].level === recentPain[0].level
                  ? '➡️ Pain is stable. Stay consistent!'
                  : '📈 Pain increased. Consider consulting your physio.'}
              </p>
            )}
          </div>
        )}

        {/* Exercise Feedback Summary */}
        {allFeedback.length > 0 && (
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
            <h2 className="font-bold text-[var(--color-text)] mb-4">Exercise Feedback</h2>
            <div className="grid grid-cols-4 gap-2">
              {[
                { key: 'easy', label: 'Easy', emoji: '😌', color: 'text-emerald-600' },
                { key: 'normal', label: 'Good', emoji: '👍', color: 'text-blue-600' },
                { key: 'hard', label: 'Hard', emoji: '💪', color: 'text-amber-600' },
                { key: 'painful', label: 'Pain', emoji: '⚠️', color: 'text-red-600' },
              ].map(item => (
                <div key={item.key} className="text-center p-3 rounded-xl bg-[var(--color-surface)]">
                  <div className="text-xl mb-1">{item.emoji}</div>
                  <div className={`text-lg font-bold ${item.color}`}>{feedbackCounts[item.key]}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
