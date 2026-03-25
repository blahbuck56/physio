import { plans } from '../data/exercises';
import useBreakpoint from '../hooks/useBreakpoint';

export default function ProgressTracker({ state, dispatch }) {
  const { profile, currentWeek, completedSessions, painLog, streak } = state;
  const { isDesktop } = useBreakpoint();
  const plan = plans[profile.injuryArea];

  const recentPain = painLog.slice(-10);
  const weekCounts = [1, 2, 3, 4].map(w => completedSessions.filter(s => s.week === w).length);

  const allFeedback = completedSessions.flatMap(s => s.exercises.map(e => e.feedback));
  const feedbackCounts = {
    easy: allFeedback.filter(f => f === 'easy').length,
    normal: allFeedback.filter(f => f === 'normal').length,
    hard: allFeedback.filter(f => f === 'hard').length,
    painful: allFeedback.filter(f => f === 'painful').length,
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className={`px-4 py-6 md:px-8 md:py-8 ${isDesktop ? 'max-w-5xl' : 'max-w-lg mx-auto'}`}>
        {/* Header — only on mobile/tablet (desktop has sidebar) */}
        {!isDesktop && (
          <div className="flex items-center gap-3 mb-6">
            <button
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'dashboard' })}
              className="text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                <path d="M15 10H5M10 15l-5-5 5-5"/>
              </svg>
            </button>
            <h1 className="text-xl font-display font-bold text-[var(--color-text)]">Your Progress</h1>
          </div>
        )}

        {isDesktop && (
          <h1 className="text-2xl font-display font-bold text-[var(--color-text)] mb-6">Your Progress</h1>
        )}

        <div className={isDesktop ? 'grid grid-cols-2 gap-6' : 'space-y-4'}>
          {/* Big stats */}
          <div className={isDesktop ? 'col-span-2 grid grid-cols-4 gap-4' : 'grid grid-cols-2 gap-3'}>
            <StatCard label="Day Streak" value={streak} color="var(--color-mint)" />
            <StatCard label="Total Sessions" value={completedSessions.length} color="var(--color-text)" />
            {isDesktop && <>
              <StatCard label="Exercises Done" value={allFeedback.length} color="var(--color-text)" />
              <StatCard label="Current Week" value={`${currentWeek} / 4`} color="var(--color-mint)" />
            </>}
          </div>

          {/* Week Progress */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
            <h2 className="font-bold text-[var(--color-text)] mb-4">Plan Progress</h2>
            <div className="space-y-3">
              {plan.weeks.map((week, i) => {
                const isActive = week.week === currentWeek;
                const isComplete = week.week < currentWeek;
                const done = weekCounts[i];
                return (
                  <div key={week.week} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      isComplete ? 'bg-[var(--color-mint)] text-white' :
                      isActive ? 'bg-[var(--color-mint)]/10 text-[var(--color-mint)] ring-2 ring-[var(--color-mint)]/20' :
                      'bg-[var(--color-surface)] text-[var(--color-text-muted)]'
                    }`}>
                      {isComplete ? '✓' : week.week}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-sm font-medium truncate ${isActive ? 'text-[var(--color-text)]' : 'text-[var(--color-text-secondary)]'}`}>
                        {week.name}
                      </div>
                      <div className="text-xs text-[var(--color-text-muted)]">{done}/3 sessions</div>
                    </div>
                    <div className="w-20 h-2 bg-[var(--color-surface)] rounded-full overflow-hidden flex-shrink-0">
                      <div className="h-full bg-[var(--color-mint)] rounded-full" style={{ width: `${Math.min(100, (done / 3) * 100)}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Pain Trend */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
            <h2 className="font-bold text-[var(--color-text)] mb-4">Pain Trend</h2>
            {recentPain.length > 1 ? (
              <>
                <div className="flex items-end gap-1 h-32">
                  {recentPain.map((entry, i) => {
                    const height = (entry.level / 10) * 100;
                    const color = entry.level <= 3 ? 'bg-emerald-400' : entry.level <= 6 ? 'bg-amber-400' : 'bg-red-400';
                    return (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[10px] text-[var(--color-text-muted)]">{entry.level}</span>
                        <div className={`w-full max-w-[2rem] rounded-t-md ${color} transition-all`} style={{ height: `${Math.max(8, height)}%` }} />
                      </div>
                    );
                  })}
                </div>
                <p className="text-sm text-[var(--color-text-secondary)] mt-3 text-center">
                  {recentPain[recentPain.length - 1].level < recentPain[0].level
                    ? '📉 Pain trending down — great progress!'
                    : recentPain[recentPain.length - 1].level === recentPain[0].level
                    ? '➡️ Pain stable. Stay consistent!'
                    : '📈 Pain increased. Consider consulting your physio.'}
                </p>
              </>
            ) : (
              <p className="text-sm text-[var(--color-text-muted)] text-center py-8">Complete more sessions to see trends</p>
            )}
          </div>

          {/* Feedback Summary */}
          {allFeedback.length > 0 && (
            <div className={`bg-white rounded-2xl border border-[var(--color-border)] p-5 ${isDesktop ? 'col-span-2' : ''}`}>
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
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 text-center">
      <div className="text-3xl font-bold" style={{ color }}>{value}</div>
      <div className="text-sm text-[var(--color-text-muted)] mt-1">{label}</div>
    </div>
  );
}
