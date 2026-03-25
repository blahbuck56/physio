import { plans, getPlanExercises, getWeekPlan } from '../data/exercises';
import ExerciseCard from './ExerciseCard';
import useBreakpoint from '../hooks/useBreakpoint';

/*
 * Dashboard — session-first entry point.
 *
 * Primary CTA: "Start Today's Session" — big, prominent, always visible.
 * Secondary: week progress, stats, exercise preview list.
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
  const estimatedMins = Math.max(1, Math.round(todayExercises.reduce((t, e) => t + (e.duration * e.sets), 0) / 60));

  const startSession = () => dispatch({ type: 'START_SESSION' });

  // ─── DESKTOP ──────────────────────────────────
  if (isDesktop) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)]">
        <div className="px-8 py-8 max-w-6xl">
          <div className="grid grid-cols-3 gap-8">
            {/* Main — 2/3 */}
            <div className="col-span-2 space-y-8">
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
                <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-5">
                  Today's Exercises
                </h3>
                <div className="grid grid-cols-2 xl:grid-cols-3 gap-5">
                  {todayExercises.map((ex, i) => (
                    <ExerciseCard key={ex.id} exercise={ex} index={i} variant="default" />
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar — 1/3 */}
            <div className="space-y-5">
              {/* Quick stats */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-5">Quick Stats</h3>
                <div className="space-y-5">
                  <StatItem label="Day Streak" value={streak} color="var(--color-mint)" bgColor="bg-emerald-50" />
                  <StatItem label="Total Sessions" value={totalSessions} color="var(--color-text)" bgColor="bg-slate-50" />
                  <StatItem
                    label={`Pain Level`}
                    value={`${lastPain}/10`}
                    color={painTrend === 'improving' ? 'var(--color-mint)' : painTrend === 'stable' ? 'var(--color-amber)' : 'var(--color-danger)'}
                    bgColor={painTrend === 'improving' ? 'bg-emerald-50' : painTrend === 'stable' ? 'bg-amber-50' : 'bg-red-50'}
                    suffix={painTrend === 'improving' ? ' ↓' : painTrend === 'stable' ? '' : ' ↑'}
                  />
                </div>
              </div>

              {/* Week progress */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Week Progress</h3>
                {progressPercent === 0 ? (
                  <div className="text-center py-3">
                    <p className="text-sm text-[var(--color-text-secondary)] mb-2">No sessions yet this week</p>
                    <p className="text-xs text-[var(--color-text-muted)]">Complete your first session to start tracking</p>
                    <div className="w-full h-2.5 bg-[var(--color-surface)] rounded-full overflow-hidden mt-4">
                      <div className="h-full rounded-full" style={{ width: '0%' }} />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-[var(--color-text-secondary)]">{weekSessions.length}/3 sessions</span>
                      <span className="text-sm font-bold text-[var(--color-mint)]">{Math.round(progressPercent)}%</span>
                    </div>
                    <div className="w-full h-2.5 bg-[var(--color-surface)] rounded-full overflow-hidden">
                      <div className="h-full bg-[var(--color-mint)] rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }} />
                    </div>
                    {currentWeek < 4 && progressPercent >= 100 && (
                      <p className="text-xs text-[var(--color-mint)] mt-3 font-medium">Ready to advance to Week {currentWeek + 1}</p>
                    )}
                  </>
                )}
              </div>

              {/* Recovery plan */}
              <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 shadow-sm">
                <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Recovery Plan</h3>
                <div className="space-y-3">
                  {plan.weeks.map(w => {
                    const isCurrent = w.week === currentWeek;
                    const isComplete = w.week < currentWeek;
                    const weekDone = completedSessions.filter(s => s.week === w.week).length;
                    return (
                      <div key={w.week} className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                          isComplete ? 'bg-[var(--color-mint)] text-white' :
                          isCurrent ? 'bg-emerald-50 text-[var(--color-mint)] ring-2 ring-[var(--color-mint)]/20' :
                          'bg-[var(--color-surface)] text-[var(--color-text-muted)]'
                        }`}>
                          {isComplete ? (
                            <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M2 6l3 3 5-5" />
                            </svg>
                          ) : w.week}
                        </div>
                        <div className="flex-1 min-w-0">
                          <span className={`text-sm block truncate ${isCurrent ? 'font-semibold text-[var(--color-text)]' : 'text-[var(--color-text-muted)]'}`}>
                            {w.name}
                          </span>
                          {(isCurrent || isComplete) && (
                            <div className="w-full h-1 bg-[var(--color-surface)] rounded-full mt-1.5 overflow-hidden">
                              <div className="h-full bg-[var(--color-mint)] rounded-full" style={{ width: `${Math.min(100, (weekDone / 3) * 100)}%` }} />
                            </div>
                          )}
                        </div>
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
      <div className="px-5 py-6 md:px-8 md:py-8 max-w-lg mx-auto">
        <div className="space-y-6">
          {/* Session CTA hero */}
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
            <StatCardMobile label="Streak" value={streak} color="text-[var(--color-mint)]" bgColor="bg-emerald-50" />
            <StatCardMobile label="Sessions" value={totalSessions} color="text-[var(--color-text)]" bgColor="bg-slate-50" />
            <StatCardMobile
              label={`Pain ${painTrend === 'improving' ? '↓' : painTrend === 'stable' ? '→' : '↑'}`}
              value={`${lastPain}/10`}
              color={painTrend === 'improving' ? 'text-[var(--color-mint)]' : painTrend === 'stable' ? 'text-[var(--color-amber)]' : 'text-[var(--color-danger)]'}
              bgColor={painTrend === 'improving' ? 'bg-emerald-50' : painTrend === 'stable' ? 'bg-amber-50' : 'bg-red-50'}
            />
            {isTablet && (
              <StatCardMobile label={`Week ${currentWeek}`} value={`${Math.round(progressPercent)}%`} color="text-[var(--color-mint)]" bgColor="bg-emerald-50" />
            )}
          </div>

          {/* Week progress */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="font-bold text-base text-[var(--color-text)]">Week {currentWeek}: {weekPlan?.name}</h2>
                <p className="text-sm text-[var(--color-text-secondary)]">
                  {progressPercent === 0 ? 'Start your first session!' : `${weekSessions.length}/3 sessions this week`}
                </p>
              </div>
              {progressPercent > 0 && (
                <div className="text-sm font-bold text-[var(--color-mint)]">{Math.round(progressPercent)}%</div>
              )}
            </div>
            <div className="w-full h-2.5 bg-[var(--color-surface)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--color-mint)] rounded-full transition-all duration-700" style={{ width: `${progressPercent}%` }} />
            </div>
          </div>

          {/* Exercise list */}
          <div>
            <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">Today's Exercises</h3>
            {isTablet ? (
              <div className="grid grid-cols-2 gap-4">
                {todayExercises.map((ex, i) => (
                  <ExerciseCard key={ex.id} exercise={ex} index={i} variant="default" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {todayExercises.map((ex, i) => (
                  <ExerciseCard key={ex.id} exercise={ex} index={i} variant="list" />
                ))}
              </div>
            )}
          </div>

          <p className="text-xs text-[var(--color-text-muted)] text-center mt-6 leading-relaxed pb-4">
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
    <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 rounded-3xl border border-emerald-100/80 p-6 md:p-8 shadow-md shadow-emerald-100/40">
      <div className="flex items-center gap-2 text-sm text-[var(--color-mint)] font-medium mb-3">
        <span className="w-2 h-2 rounded-full bg-[var(--color-mint)] animate-pulse-ring" />
        {todayCompleted ? 'Session completed today' : 'Ready for today\'s session'}
      </div>
      <h2 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-text)] mb-2">
        Week {currentWeek}: {weekName}
      </h2>
      <p className="text-base text-[var(--color-text-secondary)] mb-6">
        {exerciseCount} exercises &middot; ~{estimatedMins} min
      </p>
      <button
        onClick={onStart}
        className="w-full md:w-auto px-10 py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/25 transition-all duration-200 hover:shadow-xl hover:shadow-[var(--color-mint)]/30 hover:-translate-y-0.5 active:scale-[0.98]"
      >
        {todayCompleted ? 'Do Another Session' : 'Start Today\'s Session'}
      </button>
      {todayCompleted && (
        <p className="text-sm text-[var(--color-mint)] font-medium mt-4">Great work today!</p>
      )}
    </div>
  );
}

/* ── Desktop stat item ───────────────────── */
function StatItem({ label, value, color, bgColor, suffix = '' }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[var(--color-text-secondary)]">{label}</span>
      <div className={`px-3 py-1.5 rounded-lg ${bgColor}`}>
        <span className="text-lg font-bold font-mono" style={{ color }}>{value}{suffix}</span>
      </div>
    </div>
  );
}

/* ── Mobile stat card ────────────────────── */
function StatCardMobile({ label, value, color, bgColor }) {
  return (
    <div className={`rounded-2xl border border-[var(--color-border)] p-4 text-center shadow-sm ${bgColor}`}>
      <div className={`text-2xl font-bold font-mono ${color}`}>{value}</div>
      <div className="text-xs text-[var(--color-text-muted)] mt-1 font-medium">{label}</div>
    </div>
  );
}
