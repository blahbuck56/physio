import { useState, useEffect, useRef } from 'react';
import { getPlanExercises, bodyRegionColors, difficultyConfig } from '../data/exercises';
import ExerciseIllustration from './media/ExerciseIllustration';
import useBreakpoint from '../hooks/useBreakpoint';

/*
 * ExercisePlayer — two-phase visual-first guided experience.
 *
 * Phase 1: "Watch Demo" — media hero + read instructions + "Start Set" CTA
 * Phase 2: "Perform" — media reference + timer/reps + controls + "Done" CTA
 *
 * Desktop: split-panel (media left, instructions/controls right)
 * Mobile: single-column, media on top
 */
export default function ExercisePlayer({ state, dispatch }) {
  const { profile, currentWeek, session } = state;
  const { isDesktop } = useBreakpoint();
  const exercises = getPlanExercises(profile.injuryArea, currentWeek);
  const exercise = exercises[session.exerciseIndex];
  const isLast = session.exerciseIndex === exercises.length - 1;

  const [phase, setPhase] = useState('demo'); // 'demo' | 'perform'
  const [setCount, setSetCount] = useState(1);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [showPain, setShowPain] = useState(false);
  const intervalRef = useRef(null);

  const region = bodyRegionColors[exercise.bodyRegion] || bodyRegionColors.back;
  const difficulty = difficultyConfig[exercise.difficulty];

  // Reset on exercise change
  useEffect(() => {
    setPhase('demo');
    setSetCount(1);
    setTimerActive(false);
    setTimeLeft(exercise.duration);
    setShowPain(false);
  }, [exercise.id]);

  // Timer
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      if (setCount < exercise.sets) {
        setTimeout(() => {
          setSetCount(s => s + 1);
          setTimeLeft(exercise.duration);
        }, 800);
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [timerActive, timeLeft]);

  const startPerform = () => {
    setPhase('perform');
    setTimeLeft(exercise.duration);
  };

  const handleComplete = (feedback) => {
    dispatch({ type: 'COMPLETE_EXERCISE', exerciseId: exercise.id, feedback });
  };

  // Pain report overlay
  if (showPain) {
    return (
      <PainReport
        exercise={exercise}
        onContinue={() => setShowPain(false)}
        onSkip={() => handleComplete('painful')}
      />
    );
  }

  const progress = exercise.duration > 0 ? ((exercise.duration - timeLeft) / exercise.duration) * 100 : 0;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  // Desktop split layout
  if (isDesktop) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] flex">
        {/* Left panel — media */}
        <div className="w-1/2 xl:w-[55%] bg-white border-r border-[var(--color-border)] flex flex-col sticky top-0 h-screen">
          <TopBar session={session} exercises={exercises} dispatch={dispatch} />
          <ProgressDots exercises={exercises} currentIndex={session.exerciseIndex} />
          <div className="flex-1 flex items-center justify-center p-8">
            <ExerciseIllustration exercise={exercise} size="lg" className="w-full max-w-xl" />
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

        {/* Right panel — instructions / controls */}
        <div className="w-1/2 xl:w-[45%] overflow-y-auto">
          <div className="max-w-lg mx-auto p-8">
            <ExerciseHeader exercise={exercise} region={region} difficulty={difficulty} />

            {phase === 'demo' ? (
              <DemoContent exercise={exercise} region={region} onStart={startPerform} />
            ) : (
              <PerformContent
                exercise={exercise}
                setCount={setCount}
                timerActive={timerActive}
                timeLeft={timeLeft}
                mins={mins}
                secs={secs}
                progress={progress}
                onToggleTimer={() => {
                  if (timeLeft === 0) setTimeLeft(exercise.duration);
                  setTimerActive(!timerActive);
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

  // Mobile / tablet layout
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      <TopBar session={session} exercises={exercises} dispatch={dispatch} />
      <ProgressDots exercises={exercises} currentIndex={session.exerciseIndex} />

      {/* Media area */}
      <div className={`px-4 ${phase === 'demo' ? 'mb-4' : 'mb-2'}`}>
        <ExerciseIllustration
          exercise={exercise}
          size={phase === 'demo' ? 'lg' : 'md'}
          className="w-full"
        />
      </div>

      {/* Content */}
      <div className="flex-1 px-4 pb-6">
        <ExerciseHeader exercise={exercise} region={region} difficulty={difficulty} />

        {phase === 'demo' ? (
          <DemoContent exercise={exercise} region={region} onStart={startPerform} />
        ) : (
          <PerformContent
            exercise={exercise}
            setCount={setCount}
            timerActive={timerActive}
            timeLeft={timeLeft}
            mins={mins}
            secs={secs}
            progress={progress}
            onToggleTimer={() => {
              if (timeLeft === 0) setTimeLeft(exercise.duration);
              setTimerActive(!timerActive);
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

/* ---- Sub-components ---- */

function TopBar({ session, exercises, dispatch }) {
  return (
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
}

function ProgressDots({ exercises, currentIndex }) {
  return (
    <div className="flex gap-1.5 px-5 pb-3">
      {exercises.map((_, i) => (
        <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${
          i < currentIndex ? 'bg-[var(--color-mint)]' :
          i === currentIndex ? 'bg-[var(--color-mint)]' :
          'bg-[var(--color-border)]'
        }`} />
      ))}
    </div>
  );
}

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

function DemoContent({ exercise, region, onStart }) {
  return (
    <>
      {/* Step-by-step instructions */}
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
                <span className="text-amber-400 mt-0.5">•</span>{m}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Cautions */}
      {exercise.cautions?.length > 0 && (
        <div className="bg-red-50 rounded-2xl border border-red-100 p-4 mb-4">
          {exercise.cautions.map((c, i) => (
            <p key={i} className="text-sm text-red-700 flex items-start gap-2">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4 flex-shrink-0 mt-0.5">
                <circle cx="8" cy="8" r="6" /><path d="M8 5v3M8 10.5h.01" />
              </svg>
              {c}
            </p>
          ))}
        </div>
      )}

      {/* Session info */}
      <div className="flex items-center gap-4 text-sm text-[var(--color-text-muted)] mb-6">
        <span>{exercise.reps} × {exercise.sets} sets</span>
        <span>~{exercise.duration}s hold</span>
      </div>

      {/* Start CTA */}
      <button
        onClick={onStart}
        className="w-full py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 transition-all active:scale-[0.98] hover:shadow-xl"
      >
        Start Exercise
      </button>
    </>
  );
}

function PerformContent({ exercise, setCount, timerActive, timeLeft, mins, secs, progress, onToggleTimer, onPain, onComplete, isLast }) {
  return (
    <>
      {/* Set & timer */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 mb-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-bold text-[var(--color-text)]">Set {setCount} of {exercise.sets}</span>
          <span className="text-sm text-[var(--color-text-muted)]">{exercise.reps}</span>
        </div>

        {/* Timer bar */}
        <div className="w-full h-2 bg-[var(--color-surface)] rounded-full overflow-hidden mb-4">
          <div className="h-full bg-[var(--color-mint)] rounded-full transition-all duration-1000" style={{ width: `${progress}%` }} />
        </div>

        {/* Timer display */}
        <div className="text-center mb-4">
          <span className={`text-5xl font-mono font-bold tracking-tight ${
            timeLeft <= 5 && timerActive ? 'text-[var(--color-amber)]' : 'text-[var(--color-text)]'
          }`}>
            {mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : secs}
          </span>
          <span className="text-lg text-[var(--color-text-muted)] ml-1">s</span>
        </div>

        <button
          onClick={onToggleTimer}
          className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all ${
            timerActive
              ? 'bg-amber-50 text-[var(--color-amber)] border border-amber-200'
              : 'bg-[var(--color-mint)] text-white'
          }`}
        >
          {timerActive ? 'Pause' : timeLeft === exercise.duration ? 'Start Timer' : 'Resume'}
        </button>
      </div>

      {/* Current step reminder */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-4 mb-4">
        <h4 className="text-xs font-bold text-[var(--color-text-muted)] uppercase mb-2">Quick Reminder</h4>
        <ul className="space-y-1">
          {exercise.steps.slice(0, 3).map((s, i) => (
            <li key={i} className="text-sm text-[var(--color-text-secondary)]">{i + 1}. {s}</li>
          ))}
        </ul>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={onPain}
          className="py-4 px-5 rounded-2xl text-sm font-medium bg-red-50 text-[var(--color-danger)] border border-red-100 transition-all active:scale-[0.98]"
        >
          I feel pain
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
          <p className="text-[var(--color-text-secondary)] mb-6">Let's adjust. Here's an easier option:</p>
          <div className="bg-emerald-50 rounded-2xl p-4 mb-6 text-left border border-emerald-100">
            <div className="text-sm font-bold text-[var(--color-mint)] mb-1">Easier Alternative</div>
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
