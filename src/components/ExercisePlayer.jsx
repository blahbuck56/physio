import { useState, useEffect, useRef, useCallback } from 'react';
import { getPlanExercises, bodyRegionColors, difficultyConfig } from '../data/exercises';
import ExerciseIllustration from './media/ExerciseIllustration';
import useBreakpoint from '../hooks/useBreakpoint';

/*
 * ExercisePlayer — linear guided session flow.
 *
 * Flow: Preview → Guided Execution → Feedback (via ExerciseFeedback screen)
 *
 * Preview: exercise name, purpose, visual, "Begin" CTA
 * Execution: large visual, progressive step reveal, embedded contextual timing
 *   (e.g. "Hold for 5 seconds" with inline countdown — NOT a standalone timer)
 *
 * Desktop: split-panel (media left, guidance right)
 * Mobile: single-column, media on top
 */
export default function ExercisePlayer({ state, dispatch }) {
  const { profile, currentWeek, session } = state;
  const { isDesktop } = useBreakpoint();
  const exercises = getPlanExercises(profile.injuryArea, currentWeek);
  const exercise = exercises[session.exerciseIndex];
  const isLast = session.exerciseIndex === exercises.length - 1;

  const [phase, setPhase] = useState('preview'); // 'preview' | 'execute'
  const [currentStep, setCurrentStep] = useState(0);
  const [setCount, setSetCount] = useState(1);
  const [holdTime, setHoldTime] = useState(0);
  const [holdActive, setHoldActive] = useState(false);
  const [showPain, setShowPain] = useState(false);
  const holdRef = useRef(null);

  const region = bodyRegionColors[exercise.bodyRegion] || bodyRegionColors.back;
  const difficulty = difficultyConfig[exercise.difficulty];

  // Reset on exercise change
  useEffect(() => {
    setPhase('preview');
    setCurrentStep(0);
    setSetCount(1);
    setHoldTime(0);
    setHoldActive(false);
    setShowPain(false);
  }, [exercise.id]);

  // Mark exercise start time when entering execution
  useEffect(() => {
    if (phase === 'execute') {
      dispatch({ type: 'START_EXERCISE' });
    }
  }, [phase]);

  // Contextual hold timer — counts UP to the target duration
  useEffect(() => {
    if (holdActive) {
      holdRef.current = setInterval(() => {
        setHoldTime(t => {
          const next = t + 1;
          if (next >= exercise.duration) {
            setHoldActive(false);
            // Auto-advance set
            if (setCount < exercise.sets) {
              setTimeout(() => {
                setSetCount(s => s + 1);
                setHoldTime(0);
              }, 600);
            }
            return exercise.duration;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(holdRef.current);
  }, [holdActive, exercise.duration, setCount, exercise.sets]);

  const beginExercise = () => {
    setPhase('execute');
    setCurrentStep(0);
    setHoldTime(0);
  };

  const handleComplete = (feedback) => {
    dispatch({ type: 'COMPLETE_EXERCISE', exerciseId: exercise.id, feedback });
  };

  const advanceStep = useCallback(() => {
    if (currentStep < exercise.steps.length - 1) {
      setCurrentStep(s => s + 1);
    }
  }, [currentStep, exercise.steps.length]);

  // Pain overlay
  if (showPain) {
    return (
      <PainReport
        exercise={exercise}
        onContinue={() => setShowPain(false)}
        onSkip={() => handleComplete('painful')}
      />
    );
  }

  const holdProgress = exercise.duration > 0 ? (holdTime / exercise.duration) * 100 : 0;
  const remainingHold = Math.max(0, exercise.duration - holdTime);

  // Shared content panels
  const mediaPanel = (size = 'lg') => (
    <ExerciseIllustration exercise={exercise} size={size} className="w-full" />
  );

  const progressBar = (
    <div className="flex gap-1.5 px-5 pb-3">
      {exercises.map((_, i) => (
        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${
          i < session.exerciseIndex ? 'bg-[var(--color-mint)]' :
          i === session.exerciseIndex ? 'bg-[var(--color-mint)]' :
          'bg-[var(--color-border)]'
        }`} />
      ))}
    </div>
  );

  const topBar = (
    <div className="flex items-center justify-between px-5 pt-4 pb-2">
      <button
        onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'dashboard' })}
        className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors"
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
          <path d="M10 12L6 8l4-4" />
        </svg>
        Exit
      </button>
      <span className="text-sm text-[var(--color-text-muted)] font-medium">
        {session.exerciseIndex + 1} / {exercises.length}
      </span>
    </div>
  );

  // ─── DESKTOP SPLIT LAYOUT ─────────────────────────
  if (isDesktop) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex">
        {/* Left — media */}
        <div className="w-1/2 xl:w-[55%] bg-white border-r border-[var(--color-border)] flex flex-col sticky top-0 h-screen">
          {topBar}
          {progressBar}
          <div className="flex-1 flex items-center justify-center p-8">
            {mediaPanel('lg')}
          </div>
          <div className="px-8 pb-6">
            <div className="flex flex-wrap gap-1.5">
              {exercise.targetMuscles.map((m, i) => (
                <span key={i} className={`text-xs px-2.5 py-1 rounded-full ${region.bg} ${region.text} border ${region.border}`}>
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — guidance */}
        <div className="w-1/2 xl:w-[45%] overflow-y-auto">
          <div className="max-w-lg mx-auto p-8">
            <ExerciseHeader exercise={exercise} region={region} difficulty={difficulty} />
            {phase === 'preview' ? (
              <PreviewContent exercise={exercise} region={region} onBegin={beginExercise} />
            ) : (
              <ExecutionContent
                exercise={exercise}
                region={region}
                currentStep={currentStep}
                advanceStep={advanceStep}
                setCount={setCount}
                holdTime={holdTime}
                holdActive={holdActive}
                holdProgress={holdProgress}
                remainingHold={remainingHold}
                onToggleHold={() => {
                  if (holdTime >= exercise.duration) setHoldTime(0);
                  setHoldActive(!holdActive);
                }}
                onPain={() => setShowPain(true)}
                onComplete={() => handleComplete('normal')}
                isLast={isLast}
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  // ─── MOBILE / TABLET ──────────────────────────────
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      {topBar}
      {progressBar}

      <div className={`px-4 ${phase === 'preview' ? 'mb-4' : 'mb-2'}`}>
        {mediaPanel(phase === 'preview' ? 'lg' : 'md')}
      </div>

      <div className="flex-1 px-4 pb-6">
        <ExerciseHeader exercise={exercise} region={region} difficulty={difficulty} />
        {phase === 'preview' ? (
          <PreviewContent exercise={exercise} region={region} onBegin={beginExercise} />
        ) : (
          <ExecutionContent
            exercise={exercise}
            region={region}
            currentStep={currentStep}
            advanceStep={advanceStep}
            setCount={setCount}
            holdTime={holdTime}
            holdActive={holdActive}
            holdProgress={holdProgress}
            remainingHold={remainingHold}
            onToggleHold={() => {
              if (holdTime >= exercise.duration) setHoldTime(0);
              setHoldActive(!holdActive);
            }}
            onPain={() => setShowPain(true)}
            onComplete={() => handleComplete('normal')}
            isLast={isLast}
          />
        )}
      </div>
    </div>
  );
}

/* ── Sub-components ────────────────────────────── */

function ExerciseHeader({ exercise, region, difficulty }) {
  return (
    <div className="mb-5">
      <div className="flex items-center gap-2 flex-wrap mb-1.5">
        <span className={`text-[11px] px-2 py-0.5 rounded-full ${region.bg} ${region.text} border ${region.border} font-medium`}>
          {exercise.bodyRegion}
        </span>
        <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium ${difficulty.color}`}>
          {difficulty.label}
        </span>
        {exercise.equipment !== 'none' && (
          <span className="text-[11px] px-2 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200 font-medium">
            {exercise.equipment}
          </span>
        )}
      </div>
      <h1 className="text-2xl font-display font-bold text-[var(--color-text)] mb-1">{exercise.name}</h1>
      <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{exercise.purpose}</p>
    </div>
  );
}

function PreviewContent({ exercise, region, onBegin }) {
  return (
    <>
      {/* What you'll do */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 mb-4">
        <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">How to do it</h3>
        <ol className="space-y-3">
          {exercise.steps.map((step, i) => (
            <li key={i} className="flex gap-3">
              <span className={`flex-shrink-0 w-6 h-6 rounded-full ${region.bg} ${region.text} text-xs font-bold flex items-center justify-center`}>
                {i + 1}
              </span>
              <span className="text-sm text-[var(--color-text)] leading-relaxed pt-0.5">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Common mistakes */}
      {exercise.commonMistakes.length > 0 && (
        <div className="bg-amber-50 rounded-2xl border border-amber-100 p-5 mb-4">
          <h3 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3.5 h-3.5">
              <path d="M8 6v3M8 11.5h.01M7 2.5L1.5 12.5a1 1 0 00.87 1.5h11.26a1 1 0 00.87-1.5L9 2.5a1 1 0 00-1.74 0z" />
            </svg>
            Avoid These Mistakes
          </h3>
          <ul className="space-y-1.5">
            {exercise.commonMistakes.map((m, i) => (
              <li key={i} className="text-sm text-amber-800 flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">&bull;</span>{m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Session info */}
      <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-6">
        <span>{exercise.reps} &times; {exercise.sets} sets</span>
        {exercise.duration > 0 && <span>~{exercise.duration}s hold</span>}
      </div>

      {/* Begin CTA */}
      <button
        onClick={onBegin}
        className="w-full py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 transition-all active:scale-[0.98] hover:shadow-xl"
      >
        Begin Exercise
      </button>
    </>
  );
}

function ExecutionContent({
  exercise, region, currentStep, advanceStep, setCount,
  holdTime, holdActive, holdProgress, remainingHold,
  onToggleHold, onPain, onComplete, isLast,
}) {
  const allStepsRevealed = currentStep >= exercise.steps.length - 1;

  return (
    <>
      {/* Progressive step guide */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
            Set {setCount} of {exercise.sets}
          </span>
          <span className="text-xs text-[var(--color-text-muted)]">{exercise.reps}</span>
        </div>

        {/* Steps — revealed progressively */}
        <div className="space-y-3 mb-4">
          {exercise.steps.map((step, i) => {
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            const isHidden = i > currentStep;

            return (
              <div
                key={i}
                className={`flex gap-3 transition-all duration-300 ${isHidden ? 'opacity-30 scale-[0.97]' : ''}`}
              >
                <span className={`flex-shrink-0 w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-colors ${
                  isDone ? 'bg-[var(--color-mint)] text-white' :
                  isActive ? `${region.bg} ${region.text} ring-2 ring-[var(--color-mint)]/20` :
                  'bg-[var(--color-surface)] text-[var(--color-text-muted)]'
                }`}>
                  {isDone ? (
                    <svg viewBox="0 0 12 12" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  ) : i + 1}
                </span>
                <span className={`text-sm leading-relaxed pt-0.5 transition-colors ${
                  isActive ? 'text-[var(--color-text)] font-medium' : 'text-[var(--color-text-secondary)]'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {/* Next step button */}
        {!allStepsRevealed && (
          <button
            onClick={advanceStep}
            className="w-full py-2.5 rounded-xl text-sm font-medium bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors"
          >
            Next step
          </button>
        )}
      </div>

      {/* Contextual hold timer — embedded, not standalone */}
      {exercise.duration > 0 && (
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 mb-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-[var(--color-text)]">
              {holdActive
                ? `Hold for ${remainingHold}s more...`
                : holdTime >= exercise.duration
                ? 'Hold complete!'
                : `Hold for ${exercise.duration} seconds`}
            </span>
          </div>

          {/* Subtle progress ring */}
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex-shrink-0">
              <svg viewBox="0 0 64 64" className="w-full h-full -rotate-90">
                <circle cx="32" cy="32" r="28" fill="none" stroke="var(--color-surface)" strokeWidth="4" />
                <circle
                  cx="32" cy="32" r="28"
                  fill="none"
                  stroke={holdTime >= exercise.duration ? 'var(--color-mint)' : holdActive ? 'var(--color-mint)' : 'var(--color-border)'}
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 28}`}
                  strokeDashoffset={`${2 * Math.PI * 28 * (1 - holdProgress / 100)}`}
                  className="transition-all duration-1000"
                />
              </svg>
              <span className={`absolute inset-0 flex items-center justify-center text-lg font-mono font-bold ${
                holdActive && remainingHold <= 5 ? 'text-[var(--color-amber)]' : 'text-[var(--color-text)]'
              }`}>
                {holdTime}
              </span>
            </div>

            <button
              onClick={onToggleHold}
              className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
                holdActive
                  ? 'bg-amber-50 text-[var(--color-amber)] border border-amber-200'
                  : holdTime >= exercise.duration
                  ? 'bg-[var(--color-mint)]/10 text-[var(--color-mint)] border border-[var(--color-mint)]/20'
                  : 'bg-[var(--color-mint)] text-white'
              }`}
            >
              {holdActive ? 'Pause' : holdTime >= exercise.duration ? 'Restart Hold' : holdTime > 0 ? 'Resume' : 'Start Hold'}
            </button>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onPain}
          className="py-4 px-5 rounded-2xl text-sm font-medium bg-red-50 text-[var(--color-danger)] border border-red-100 transition-all active:scale-[0.98]"
        >
          Pain
        </button>
        <button
          onClick={onComplete}
          className="flex-1 py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 transition-all active:scale-[0.98]"
        >
          {isLast ? 'Finish Session' : 'Done — Next'}
        </button>
      </div>
    </>
  );
}

function PainReport({ exercise, onContinue, onSkip }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-5">
      <div className="max-w-md w-full animate-fade-in-up">
        <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" strokeWidth="2" className="w-8 h-8">
              <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
          </div>
          <h2 className="text-xl font-display font-bold text-[var(--color-text)] mb-2">Pain Reported</h2>
          <p className="text-[var(--color-text-secondary)] mb-6">Here's an easier alternative:</p>
          <div className="bg-emerald-50 rounded-2xl p-4 mb-6 text-left border border-emerald-100">
            <div className="text-sm font-bold text-[var(--color-mint)] mb-1">Easier Version</div>
            <p className="text-sm text-[var(--color-text-secondary)]">{exercise.regression}</p>
          </div>
          <div className="space-y-3">
            <button onClick={onContinue} className="w-full py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white transition-all">
              Try Easier Version
            </button>
            <button onClick={onSkip} className="w-full py-3 rounded-2xl text-sm text-[var(--color-text-secondary)] border border-[var(--color-border)] transition-all">
              Skip Exercise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
