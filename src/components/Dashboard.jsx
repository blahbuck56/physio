import { plans, getPlanExercises, getWeekPlan } from '../data/exercises';
import ExerciseCard from './ExerciseCard';
import useBreakpoint from '../hooks/useBreakpoint';

/*
 * Dashboard — session-first entry point.
 *
 * Primary CTA: "Start Today's Session" — big, prominent, always visible.
 * Secondary: week progress, stats, exercise preview list.
 * Session resume: if todayCompleted, show "Do Another Session" variant.
 */
export default function Dashboard({ state, dispatch }) {
  const { profile, currentWeek, streak, completedSessions, painLog, todayCompleted } = state;
  const { isDesktop, isTablet } = useBreakpoint();
  const plan = plans[profile.injuryArea];
  const weekPlan = getWeekPlan(profile.injuryArea, currentWeek);
  const todayExercises = getPlanExercises(profile.injuryArea, currentWeek);

  const weekSessions = completedSessions.filter(s => s.week === currentWeek);
  const totalSessions = completedSessions.length;
  const lastPain = painLog.length > 0 ? painLog[painLog.length - 1].level : profile.painLevel;
  const firstPain = painLog.length > 0 ? painLog[0].level : profile.painLevel;
  const painTrend = lastPain < firstPain ? 'improving' : lastPain === firstPain ? 'stable' : 'monitor';
  const progressPercent = Math.min(100, (weekSessions.length / 3) * 100);
  const estimatedMins = Math.round(todayExercises.reduce((t, e) => t + (e.duration * e.sets), 0) / 60);

  const startSession = () => dispatch({ type: 'START_SESSION' });

  // ─── DESKTOP ──────────────────────────────────
  if (isDesktop) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <div className="px-8 py-8 max-w-6xl">
          <div className="grid grid-cols-3 gap-6">
            {/* Main — 2/3 */}
            <div className="col-span-2 space-y-6">
              {/* Session CTA hero */}
              <SessionHero
                todayCompleted={todayCompleted}
                currentWeek={currentWeek}
                weekName={weekPlan?.name}
                exerciseCount={todayExercises.length}
                estimatedMins={estimatedMins}
                onStart={startSession}
              />

              {/* Exercise preview */}
              <div>
                <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
                  Today's Exercises
                </h3>
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                  {todayExercises.map((ex, i) => (
                    <ExerciseCard key={ex.id} exercise={ex} index={i} variant="default" />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar — 1/3 */}
            <div className="space-y-4">
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
                <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Quick Stats</h3>
                <div className="space-y-4">
                  <StatItem label="Day Streak" value={streak} color="var(--color-mint)" icon="🔥" />
                  <StatItem label="Total Sessions" value={totalSessions} color="var(--color-text)" icon="📊" />
                  <StatItem
                    label={`Pain ${painTrend === 'improving' ? '↓' : painTrend === 'stable' ? '→' : '↑'}`}
                    value={`${lastPain}/10`}
                    color={painTrend === 'improving' ? 'var(--color-mint)' : painTrend === 'stable' ? 'var(--color-amber)' : 'var(--color-danger)'}
                    icon={painTrend === 'improving' ? '📉' : '📊'}
                  />
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
                <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Week Progress</h3>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[var(--color-text-secondary)]">{weekSessions.length}/3 sessions</span>
                  <span className="text-sm font-bold text-[var(--color-mint)]">{Math.round(progressPercent)}%</span>
                </div>
                <div className="w-full h-2.5 bg-[var(--color-surface)] rounded-full overflow-hidden">
                  <div className="h-full bg-[var(--color-mint)] rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }} />
                </div>
                {currentWeek < 4 && progressPercent >= 100 && (
                  <p className="text-xs text-[var(--color-mint)] mt-2 font-medium">Ready to advance to Week {currentWeek + 1}</p>
                )}
              </div>

              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
                <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Recovery Plan</h3>
                <div className="space-y-2.5">
                  {plan.weeks.map(w => {
                    const isCurrent = w.week === currentWeek;
                    const isComplete = w.week < currentWeek;
                    return (
                      <div key={w.week} className="flex items-center gap-2.5">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          isComplete ? 'bg-[var(--color-mint)] text-white' :
                          isCurrent ? 'bg-[var(--color-mint)]/10 text-[var(--color-mint)] ring-2 ring-[var(--color-mint)]/20' :
                          'bg-[var(--color-surface)] text-[var(--color-text-muted)]'
                        }`}>
                          {isComplete ? '✓' : w.week}
                        </div>
                        <span className={`text-sm ${isCurrent ? 'font-medium text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'}`}>
                          {w.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="text-xs text-[var(--color-text-muted)] text-center leading-relaxed">
                Not a substitute for professional medical advice.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── MOBILE + TABLET ──────────────────────────
  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <div className="px-4 py-6 md:px-8 md:py-8 max-w-lg mx-auto">
        <div className="space-y-5">
          {/* Session CTA — prominent top placement */}
          <SessionHero
            todayCompleted={todayCompleted}
            currentWeek={currentWeek}
            weekName={weekPlan?.name}
            exerciseCount={todayExercises.length}
            estimatedMins={estimatedMins}
            onStart={startSession}
          />

          {/* Stats row */}
          <div className={`grid gap-3 ${isTablet ? 'grid-cols-4' : 'grid-cols-3'}`}>
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 text-center">
              <div className="text-2xl font-bold text-[var(--color-mint)]">{streak}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Streak</div>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 text-center">
              <div className="text-2xl font-bold text-[var(--color-text)]">{totalSessions}</div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Sessions</div>
            </div>
            <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 text-center">
              <div className={`text-2xl font-bold ${painTrend === 'improving' ? 'text-[var(--color-mint)]' : painTrend === 'stable' ? 'text-[var(--color-amber)]' : 'text-[var(--color-danger)]'}`}>
                {lastPain}/10
              </div>
              <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Pain {painTrend === 'improving' ? '↓' : painTrend === 'stable' ? '→' : '↑'}</div>
            </div>
            {isTablet && (
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 text-center">
                <div className="text-2xl font-bold text-[var(--color-mint)]">{Math.round(progressPercent)}%</div>
                <div className="text-xs text-[var(--color-text-muted)] mt-0.5">Week {currentWeek}</div>
              </div>
            )}
          </div>

          {/* Week progress */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-bold text-[var(--color-text)]">Week {currentWeek}: {weekPlan?.name}</h2>
                <p className="text-sm text-[var(--color-text-secondary)]">{weekSessions.length}/3 sessions this week</p>
              </div>
              <div className="text-sm font-bold text-[var(--color-mint)]">{Math.round(progressPercent)}%</div>
            </div>
            <div className="w-full h-2.5 bg-[var(--color-surface)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--color-mint)] rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* Exercise list */}
          <div>
            <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">Today's Exercises</h3>
            {isTablet ? (
              <div className="grid grid-cols-2 gap-3">
                {todayExercises.map((ex, i) => (
                  <ExerciseCard key={ex.id} exercise={ex} index={i} variant="default" />
                ))}
              </div>
            ) : (
              <div className="space-y-2">
                {todayExercises.map((ex, i) => (
                  <ExerciseCard key={ex.id} exercise={ex} index={i} variant="list" />
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-[var(--color-text-muted)] text-center mt-4 leading-relaxed pb-4">
            Not a substitute for professional medical advice.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Session Hero CTA ─────────────────────── */
function SessionHero({ todayCompleted, currentWeek, weekName, exerciseCount, estimatedMins, onStart }) {
  return (
    <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl border border-emerald-100 p-6 md:p-8">
      <div className="flex items-center gap-2 text-sm text-[var(--color-mint)] font-medium mb-2">
        <span className="w-2 h-2 rounded-full bg-[var(--color-mint)] animate-pulse-ring" />
        {todayCompleted ? 'Session completed today' : 'Ready for today\'s session'}
      </div>
      <h2 className="text-2xl font-display font-bold text-[var(--color-text)] mb-1">
        Week {currentWeek}: {weekName}
      </h2>
      <p className="text-[var(--color-text-secondary)] mb-5">
        {exerciseCount} exercises &middot; ~{estimatedMins} min
      </p>
      <button
        onClick={onStart}
        className="w-full md:w-auto px-8 py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 transition-all hover:shadow-xl hover:shadow-[var(--color-mint)]/30 active:scale-[0.98]"
      >
        {todayCompleted ? 'Do Another Session' : 'Start Today\'s Session'}
      </button>
      {todayCompleted && (
        <p className="text-sm text-[var(--color-mint)] font-medium mt-3">Great work today!</p>
      )}
    </div>
  );
}

function StatItem({ label, value, color, icon }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-lg">{icon}</span>
        <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
      </div>
      <span className="text-lg font-bold" style={{ color }}>{value}</span>
    </div>
  );
}
