import { plans, getPlanExercises, getWeekPlan } from '../data/exercises';

export default function Dashboard({ state, dispatch }) {
  const { profile, currentWeek, streak, completedSessions, painLog, todayCompleted } = state;
  const plan = plans[profile.injuryArea];
  const weekPlan = getWeekPlan(profile.injuryArea, currentWeek);
  const todayExercises = getPlanExercises(profile.injuryArea, currentWeek);

  const weekSessions = completedSessions.filter(s => s.week === currentWeek);
  const totalSessions = completedSessions.length;
  const lastPain = painLog.length > 0 ? painLog[painLog.length - 1].level : profile.painLevel;
  const firstPain = painLog.length > 0 ? painLog[0].level : profile.painLevel;
  const painTrend = lastPain < firstPain ? 'improving' : lastPain === firstPain ? 'stable' : 'monitor';

  const progressPercent = Math.min(100, (weekSessions.length / 3) * 100);

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="max-w-lg mx-auto px-5 py-6 lg:max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl font-display font-bold text-[var(--color-text)]">
              Physio<span className="text-[var(--color-mint)]">Guide</span>
            </h1>
            <p className="text-sm text-[var(--color-text-secondary)]">{plan.name} — Week {currentWeek}</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'progress' })}
              className="w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-mint)] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <path d="M3 3v18h18"/><path d="M18 17V9M13 17V5M8 17v-3"/>
              </svg>
            </button>
            <button
              onClick={() => dispatch({ type: 'RESET' })}
              className="w-10 h-10 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                <circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Streak + Stats Row */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 text-center">
            <div className="text-2xl font-bold text-[var(--color-mint)]">{streak}</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Day Streak</div>
          </div>
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 text-center">
            <div className="text-2xl font-bold text-[var(--color-text)]">{totalSessions}</div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">Sessions</div>
          </div>
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 text-center">
            <div className={`text-2xl font-bold ${
              painTrend === 'improving' ? 'text-[var(--color-mint)]' :
              painTrend === 'stable' ? 'text-[var(--color-amber)]' : 'text-[var(--color-danger)]'
            }`}>
              {lastPain}/10
            </div>
            <div className="text-xs text-[var(--color-text-muted)] mt-1">
              Pain {painTrend === 'improving' ? '↓' : painTrend === 'stable' ? '→' : '↑'}
            </div>
          </div>
        </div>

        {/* Week Progress */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 mb-6">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-bold text-[var(--color-text)]">Week {currentWeek}: {weekPlan?.name}</h2>
              <p className="text-sm text-[var(--color-text-secondary)]">{weekSessions.length}/3 sessions this week</p>
            </div>
            <div className="text-sm font-bold text-[var(--color-mint)]">{Math.round(progressPercent)}%</div>
          </div>
          <div className="w-full h-3 bg-[var(--color-surface)] rounded-full overflow-hidden">
            <div
              className="h-full bg-[var(--color-mint)] rounded-full transition-all duration-700"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          {currentWeek < 4 && progressPercent >= 100 && (
            <p className="text-xs text-[var(--color-mint)] mt-2 font-medium">
              Week complete! You'll advance to Week {currentWeek + 1} next session.
            </p>
          )}
        </div>

        {/* Today's Exercises Preview */}
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 mb-6">
          <h2 className="font-bold text-[var(--color-text)] mb-4">Today's Session</h2>
          <div className="space-y-3 mb-5">
            {todayExercises.map((ex, i) => (
              <div key={ex.id} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--color-mint)]/10 flex items-center justify-center text-sm font-bold text-[var(--color-mint)]">
                  {i + 1}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-[var(--color-text)]">{ex.name}</div>
                  <div className="text-xs text-[var(--color-text-muted)]">{ex.purpose}</div>
                </div>
                <div className="text-xs text-[var(--color-text-muted)]">{ex.reps}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={() => dispatch({ type: todayCompleted ? 'START_SESSION' : 'START_SESSION' })}
          className="w-full py-5 rounded-2xl text-lg font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 transition-all active:scale-[0.98] hover:shadow-xl hover:shadow-[var(--color-mint)]/30"
        >
          {todayCompleted ? 'Do Another Session' : 'Start Today\'s Session'}
        </button>

        {todayCompleted && (
          <p className="text-center text-sm text-[var(--color-mint)] mt-3 font-medium">
            Great job! You already completed a session today.
          </p>
        )}

        {/* Disclaimer */}
        <p className="text-xs text-[var(--color-text-muted)] text-center mt-8 leading-relaxed">
          Not a substitute for professional medical advice. Consult your physiotherapist before starting.
        </p>
      </div>
    </div>
  );
}
