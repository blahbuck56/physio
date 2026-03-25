import { useState, useEffect, useRef, useCallback } from 'react';
import { getPlanExercises, bodyRegionColors, difficultyConfig } from '../data/exercises';
import ExerciseIllustration from './media/ExerciseIllustration';
import useBreakpoint from '../hooks/useBreakpoint';

/*
 * ExercisePlayer — linear guided session flow.
 *
 * Flow: Preview → Guided Execution → Feedback (via ExerciseFeedback screen)
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
  const isFirst = session.exerciseIndex === 0;

  const [phase, setPhase] = useState('preview');
  const [currentStep, setCurrentStep] = useState(0);
  const [setCount, setSetCount] = useState(1);
  const [holdTime, setHoldTime] = useState(0);
  const [holdActive, setHoldActive] = useState(false);
  const [showPain, setShowPain] = useState(false);
  const holdRef = useRef(null);

  const region = bodyRegionColors[exercise.bodyRegion] || bodyRegionColors.back;
  const difficulty = difficultyConfig[exercise.difficulty];

  useEffect(() => {
    setPhase('preview');
    setCurrentStep(0);
    setSetCount(1);
    setHoldTime(0);
    setHoldActive(false);
    setShowPain(false);
  }, [exercise.id]);

  useEffect(() => {
    if (phase === 'execute') {
      dispatch({ type: 'START_EXERCISE' });
    }
  }, [phase]);

  useEffect(() => {
    if (holdActive) {
      holdRef.current = setInterval(() => {
        setHoldTime(t => {
          const next = t + 1;
          if (next >= exercise.duration) {
            setHoldActive(false);
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

  // ─── TOP BAR ──────────────────────────────────
  const topBar = (
    <div className="flex items-center justify-between px-5 pt-4 pb-2">
      <button
        onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'dashboard' })}
        className="flex items-center gap-2 text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text)] transition-colors px-3 py-2 -ml-3 rounded-xl hover:bg-[var(--color-surface)]"
      >
        <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
          <path d="M10 12L6 8l4-4" />
        </svg>
        Exit Session
      </button>
      <span className="text-sm text-[var(--color-text-muted)] font-medium bg-[var(--color-surface)] px-3 py-1.5 rounded-full">
        {session.exerciseIndex + 1} / {exercises.length}
      </span>
    </div>
  );

  // ─── PROGRESS BAR ─────────────────────────────
  const progressBar = (
    <div className="flex gap-1.5 px-5 pb-4">
      {exercises.map((_, i) => (
        <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
          i < session.exerciseIndex ? 'bg-[var(--color-mint)]' :
          i === session.exerciseIndex ? 'bg-[var(--color-mint)]' :
          'bg-[var(--color-border)]'
        }`} />
      ))}
    </div>
  );

  // ─── DESKTOP SPLIT LAYOUT ─────────────────────
  if (isDesktop) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex">
        {/* Left — media */}
        <div className="w-1/2 xl:w-[55%] bg-slate-900 flex flex-col sticky top-0 h-screen">
          <div className="flex items-center justify-between px-5 pt-4 pb-2">
            <button
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'dashboard' })}
              className="flex items-center gap-2 text-sm font-medium text-white/60 hover:text-white transition-colors px-3 py-2 -ml-3 rounded-xl hover:bg-white/10"
            >
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4">
                <path d="M10 12L6 8l4-4" />
              </svg>
              Exit
            </button>
            <span className="text-sm text-white/50 font-medium bg-white/10 px-3 py-1.5 rounded-full">
              {session.exerciseIndex + 1} / {exercises.length}
            </span>
          </div>
          <div className="flex gap-1.5 px-5 pb-4">
            {exercises.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                i <= session.exerciseIndex ? 'bg-emerald-400' : 'bg-white/10'
              }`} />
            ))}
          </div>
          <div className="flex-1 flex items-center justify-center p-8">
            <ExerciseIllustration exercise={exercise} size="lg" className="w-full max-w-xl" />
          </div>
          <div className="px-8 pb-6">
            <div className="flex flex-wrap gap-1.5">
              {exercise.targetMuscles.map((m, i) => (
                <span key={i} className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-white/10 text-white/60">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right — guidance */}
        <div className="w-1/2 xl:w-[45%] overflow-y-auto">
          <div className="max-w-lg mx-auto p-8 lg:p-10">
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

            {/* Exercise navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--color-border)]">
              {!isFirst ? (
                <button className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1">
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <path d="M10 12L6 8l4-4" />
                  </svg>
                  Previous
                </button>
              ) : <div />}
              {!isLast && (
                <button
                  onClick={() => handleComplete('normal')}
                  className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1"
                >
                  Skip
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                    <path d="M6 12l4-4-4-4" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── MOBILE / TABLET ──────────────────────────
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      {topBar}
      {progressBar}

      <div className={`px-4 ${phase === 'preview' ? 'mb-4' : 'mb-2'}`}>
        <ExerciseIllustration exercise={exercise} size={phase === 'preview' ? 'lg' : 'md'} className="w-full" />
      </div>

      <div className="flex-1 px-5 pb-6">
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

        {/* Exercise navigation (mobile) */}
        <div className="flex items-center justify-between mt-6 pt-5 border-t border-[var(--color-border)]">
          {!isFirst ? (
            <button className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path d="M10 12L6 8l4-4" />
              </svg>
              Previous
            </button>
          ) : <div />}
          {!isLast && (
            <button
              onClick={() => handleComplete('normal')}
              className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors flex items-center gap-1"
            >
              Skip
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
                <path d="M6 12l4-4-4-4" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ────────────────────────────── */

function ExerciseHeader({ exercise, region, difficulty }) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 flex-wrap mb-2">
        <span className={`text-[11px] px-2.5 py-0.5 rounded-full ${region.bg} ${region.text} border ${region.border} font-medium`}>
          {exercise.bodyRegion}
        </span>
        <span className={`text-[11px] px-2.5 py-0.5 rounded-full border font-medium ${difficulty.color}`}>
          {difficulty.label}
        </span>
        {exercise.equipment !== 'none' && (
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-50 text-gray-600 border border-gray-200 font-medium">
            {exercise.equipment}
          </span>
        )}
      </div>
      <h1 className="text-2xl md:text-3xl font-display font-bold text-[var(--color-text)] mb-1.5">{exercise.name}</h1>
      <p className="text-sm md:text-base text-[var(--color-text-secondary)] leading-relaxed">{exercise.purpose}</p>
    </div>
  );
}

function PreviewContent({ exercise, region, onBegin }) {
  return (
    <>
      {/* Step-by-step instructions */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 mb-5 shadow-sm">
        <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest mb-4">How to do it</h3>
        <ol className="space-y-4">
          {exercise.steps.map((step, i) => (
            <li key={i} className="flex gap-4">
              <span className={`flex-shrink-0 w-8 h-8 rounded-full ${region.bg} ${region.text} text-sm font-bold flex items-center justify-center`}>
                {i + 1}
              </span>
              <span className="text-sm text-[var(--color-text)] leading-relaxed pt-1">{step}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* Common mistakes */}
      {exercise.commonMistakes.length > 0 && (
        <div className="bg-amber-50 rounded-2xl border-2 border-amber-200/60 p-6 mb-5">
          <h3 className="text-xs font-bold text-amber-800 uppercase tracking-widest mb-3 flex items-center gap-2">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <path d="M8 6v3M8 11.5h.01M7 2.5L1.5 12.5a1 1 0 00.87 1.5h11.26a1 1 0 00.87-1.5L9 2.5a1 1 0 00-1.74 0z" />
            </svg>
            Common Mistakes
          </h3>
          <ul className="space-y-2">
            {exercise.commonMistakes.map((m, i) => (
              <li key={i} className="text-sm text-amber-900 flex items-start gap-2.5">
                <span className="text-amber-400 mt-0.5 text-lg leading-none">&bull;</span>{m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cautions */}
      {exercise.cautions?.length > 0 && (
        <div className="bg-red-50 rounded-2xl border-2 border-red-200/60 p-5 mb-5">
          {exercise.cautions.map((c, i) => (
            <p key={i} className="text-sm text-red-800 flex items-start gap-2.5">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-500">
                <circle cx="8" cy="8" r="6" /><path d="M8 5v3M8 10.5h.01" />
              </svg>
              {c}
            </p>
          ))}
        </div>
      )}

      {/* Session info pills */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-sm px-3 py-1.5 rounded-full bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] font-medium">
          {exercise.reps} &times; {exercise.sets} sets
        </span>
        {exercise.duration > 0 && (
          <span className="text-sm px-3 py-1.5 rounded-full bg-[var(--color-surface)] text-[var(--color-text-secondary)] border border-[var(--color-border)] font-medium">
            ~{exercise.duration}s hold
          </span>
        )}
      </div>

      {/* Begin CTA */}
      <button
        onClick={onBegin}
        className="w-full py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/25 transition-all duration-200 active:scale-[0.98] hover:shadow-xl hover:-translate-y-0.5"
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
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 mb-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-widest">
            Set {setCount} of {exercise.sets}
          </span>
          <span className="text-xs font-medium text-[var(--color-text-muted)] bg-[var(--color-surface)] px-2.5 py-1 rounded-full">{exercise.reps}</span>
        </div>

        <div className="space-y-4 mb-4">
          {exercise.steps.map((step, i) => {
            const isActive = i === currentStep;
            const isDone = i < currentStep;
            const isHidden = i > currentStep;
            return (
              <div key={i} className={`flex gap-4 transition-all duration-300 ${isHidden ? 'opacity-25 scale-[0.97]' : ''}`}>
                <span className={`flex-shrink-0 w-8 h-8 rounded-full text-sm font-bold flex items-center justify-center transition-colors ${
                  isDone ? 'bg-[var(--color-mint)] text-white' :
                  isActive ? `${region.bg} ${region.text} ring-2 ring-[var(--color-mint)]/30` :
                  'bg-[var(--color-surface)] text-[var(--color-text-muted)]'
                }`}>
                  {isDone ? (
                    <svg viewBox="0 0 12 12" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 6l3 3 5-5" />
                    </svg>
                  ) : i + 1}
                </span>
                <span className={`text-sm leading-relaxed pt-1.5 transition-colors ${
                  isActive ? 'text-[var(--color-text)] font-medium' : 'text-[var(--color-text-secondary)]'
                }`}>
                  {step}
                </span>
              </div>
            );
          })}
        </div>

        {!allStepsRevealed && (
          <button
            onClick={advanceStep}
            className="w-full py-3 rounded-xl text-sm font-medium bg-[var(--color-surface)] text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors border border-[var(--color-border)]"
          >
            Next step
          </button>
        )}
      </div>

      {/* Contextual hold timer */}
      {exercise.duration > 0 && (
        <div className="bg-white rounded-2xl border border-[var(--color-border)] p-6 mb-5 shadow-sm">
          <div className="mb-4">
            <span className="text-sm font-semibold text-[var(--color-text)]">
              {holdActive
                ? `Hold for ${remainingHold}s more...`
                : holdTime >= exercise.duration
                ? 'Hold complete!'
                : `Hold for ${exercise.duration} seconds`}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <div className="relative w-18 h-18 flex-shrink-0" style={{ width: 72, height: 72 }}>
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
              <span className={`absolute inset-0 flex items-center justify-center text-xl font-mono font-bold ${
                holdActive && remainingHold <= 5 ? 'text-[var(--color-amber)]' : 'text-[var(--color-text)]'
              }`}>
                {holdTime}
              </span>
            </div>
            <button
              onClick={onToggleHold}
              className={`flex-1 py-3.5 rounded-xl font-bold text-sm transition-all ${
                holdActive
                  ? 'bg-amber-50 text-[var(--color-amber)] border-2 border-amber-200'
                  : holdTime >= exercise.duration
                  ? 'bg-emerald-50 text-[var(--color-mint)] border-2 border-emerald-200'
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
          className="py-4 px-5 rounded-2xl text-sm font-medium bg-red-50 text-[var(--color-danger)] border-2 border-red-200/60 transition-all active:scale-[0.98] hover:bg-red-100"
        >
          Pain
        </button>
        <button
          onClick={onComplete}
          className="flex-1 py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/25 transition-all duration-200 active:scale-[0.98] hover:-translate-y-0.5"
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
        <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 text-center shadow-md">
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" strokeWidth="2" className="w-8 h-8">
              <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
          </div>
          <h2 className="text-xl font-display font-bold text-[var(--color-text)] mb-2">Pain Reported</h2>
          <p className="text-[var(--color-text-secondary)] mb-6">Here's an easier alternative:</p>
          <div className="bg-emerald-50 rounded-2xl p-5 mb-6 text-left border border-emerald-200">
            <div className="text-sm font-bold text-[var(--color-mint)] mb-1">Easier Version</div>
            <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">{exercise.regression}</p>
          </div>
          <div className="space-y-3">
            <button onClick={onContinue} className="w-full py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white transition-all hover:-translate-y-0.5 shadow-lg shadow-[var(--color-mint)]/20">
              Try Easier Version
            </button>
            <button onClick={onSkip} className="w-full py-3 rounded-2xl text-sm font-medium text-[var(--color-text-secondary)] border-2 border-[var(--color-border)] transition-all hover:bg-[var(--color-surface)]">
              Skip Exercise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
