import { getPlanExercises, getExerciseById } from '../data/exercises';

const feedbackOptions = [
  { id: 'easy', label: 'Too Easy', emoji: '😌', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
  { id: 'normal', label: 'Just Right', emoji: '👍', color: 'bg-blue-50 border-blue-200 text-blue-700' },
  { id: 'hard', label: 'Challenging', emoji: '💪', color: 'bg-amber-50 border-amber-200 text-amber-700' },
  { id: 'painful', label: 'Painful', emoji: '⚠️', color: 'bg-red-50 border-red-200 text-red-700' },
];

export default function ExerciseFeedback({ state, dispatch }) {
  const { profile, currentWeek, session } = state;
  const exercises = getPlanExercises(profile.injuryArea, currentWeek);
  const isLast = session.exerciseIndex >= exercises.length - 1;
  const lastCompleted = session.completedExercises[session.completedExercises.length - 1];
  const exercise = getExerciseById(lastCompleted?.id);

  const handleFeedback = (feedback) => {
    // Update the last completed exercise with feedback
    if (isLast) {
      dispatch({ type: 'COMPLETE_SESSION' });
    } else {
      dispatch({ type: 'NEXT_EXERCISE' });
    }
  };

  // If feedback was already given (painful via pain button), auto-advance
  if (lastCompleted?.feedback === 'painful') {
    if (isLast) {
      return <SessionComplete state={state} dispatch={dispatch} />;
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-5">
      <div className="max-w-md w-full animate-fade-in-up">
        <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-mint)]/10 flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-mint)" strokeWidth="2" className="w-8 h-8">
              <path d="M20 6L9 17l-5-5"/>
            </svg>
          </div>

          <h2 className="text-xl font-display font-bold text-[var(--color-text)] mb-1">
            {exercise?.name} — Done!
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            How did that feel?
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6">
            {feedbackOptions.map(opt => (
              <button
                key={opt.id}
                onClick={() => handleFeedback(opt.id)}
                className={`p-4 rounded-2xl border-2 transition-all hover:scale-[1.02] active:scale-[0.98] ${opt.color}`}
              >
                <div className="text-2xl mb-1">{opt.emoji}</div>
                <div className="text-sm font-bold">{opt.label}</div>
              </button>
            ))}
          </div>

          <p className="text-xs text-[var(--color-text-muted)]">
            {isLast
              ? `This was your last exercise — great session!`
              : `${exercises.length - session.exerciseIndex - 1} exercises remaining`
            }
          </p>
        </div>
      </div>
    </div>
  );
}

function SessionComplete({ state, dispatch }) {
  const { session, completedSessions } = state;
  const totalDone = session.completedExercises.length;
  const painCount = session.completedExercises.filter(e => e.feedback === 'painful').length;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-5">
      <div className="max-w-md w-full animate-fade-in-up">
        <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 text-center">
          <div className="text-5xl mb-4">🎉</div>
          <h2 className="text-2xl font-display font-bold text-[var(--color-text)] mb-2">
            Session Complete!
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            You completed {totalDone} exercise{totalDone !== 1 ? 's' : ''} today.
            {painCount > 0 && ` ${painCount} flagged for adjustment.`}
          </p>
          <button
            onClick={() => dispatch({ type: 'COMPLETE_SESSION' })}
            className="w-full py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 transition-all"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
