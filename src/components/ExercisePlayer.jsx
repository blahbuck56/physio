import { useState, useEffect, useRef } from 'react';
import { getPlanExercises } from '../data/exercises';
import ExerciseAnimation from './ExerciseAnimation';

export default function ExercisePlayer({ state, dispatch }) {
  const { profile, currentWeek, session } = state;
  const exercises = getPlanExercises(profile.injuryArea, currentWeek);
  const exercise = exercises[session.exerciseIndex];
  const isLast = session.exerciseIndex === exercises.length - 1;

  const [currentStep, setCurrentStep] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [setCount, setSetCount] = useState(1);
  const [showPainReport, setShowPainReport] = useState(false);
  const intervalRef = useRef(null);

  const totalTime = exercise.duration * exercise.sets;

  // Reset when exercise changes
  useEffect(() => {
    setCurrentStep(0);
    setTimerActive(false);
    setTimeLeft(exercise.duration);
    setSetCount(1);
    setShowPainReport(false);
  }, [exercise.id]);

  // Timer
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft(t => t - 1);
      }, 1000);
    } else if (timeLeft === 0 && timerActive) {
      setTimerActive(false);
      if (setCount < exercise.sets) {
        // Next set
        setTimeout(() => {
          setSetCount(s => s + 1);
          setTimeLeft(exercise.duration);
        }, 500);
      }
    }
    return () => clearInterval(intervalRef.current);
  }, [timerActive, timeLeft]);

  const handleStart = () => {
    if (timeLeft === 0) setTimeLeft(exercise.duration);
    setTimerActive(true);
  };

  const handleComplete = (feedback) => {
    dispatch({
      type: 'COMPLETE_EXERCISE',
      exerciseId: exercise.id,
      feedback,
    });
  };

  if (showPainReport) {
    return (
      <PainDuringExercise
        exercise={exercise}
        onContinue={() => setShowPainReport(false)}
        onSkip={() => handleComplete('painful')}
        regression={exercise.regression}
      />
    );
  }

  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const progress = exercise.duration > 0 ? ((exercise.duration - timeLeft) / exercise.duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      <div className="max-w-lg mx-auto w-full flex-1 flex flex-col lg:max-w-5xl lg:flex-row lg:gap-8 lg:p-8">
        {/* Left side on desktop: animation */}
        <div className="lg:flex-1 lg:flex lg:flex-col lg:justify-center">
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 pt-5 pb-3 lg:pb-5">
            <button
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: 'dashboard' })}
              className="text-[var(--color-text-secondary)] text-sm hover:text-[var(--color-text)] transition-colors"
            >
              ← Exit
            </button>
            <span className="text-sm text-[var(--color-text-muted)]">
              {session.exerciseIndex + 1} of {exercises.length}
            </span>
          </div>

          {/* Exercise progress dots */}
          <div className="flex gap-1.5 px-5 mb-5">
            {exercises.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${
                i < session.exerciseIndex ? 'bg-[var(--color-mint)]' :
                i === session.exerciseIndex ? 'bg-[var(--color-mint)] animate-pulse-ring' :
                'bg-[var(--color-border)]'
              }`} />
            ))}
          </div>

          {/* Animation */}
          <div className="px-5 mb-4">
            <ExerciseAnimation type={exercise.animation} />
          </div>
        </div>

        {/* Right side on desktop: instructions + controls */}
        <div className="flex-1 flex flex-col px-5 pb-6 lg:justify-center">
          {/* Exercise name */}
          <h1 className="text-2xl font-display font-bold text-[var(--color-text)] mb-1">
            {exercise.name}
          </h1>
          <p className="text-sm text-[var(--color-mint)] font-medium mb-5">
            {exercise.purpose}
          </p>

          {/* Step-by-step instructions - one at a time */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 mb-5">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-full bg-[var(--color-mint)] text-white text-xs font-bold flex items-center justify-center">
                {currentStep + 1}
              </div>
              <span className="text-xs text-[var(--color-text-muted)] uppercase tracking-wider">
                Step {currentStep + 1} of {exercise.steps.length}
              </span>
            </div>
            <p className="text-lg text-[var(--color-text)] font-medium leading-relaxed">
              {exercise.steps[currentStep]}
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setCurrentStep(s => Math.max(0, s - 1))}
                disabled={currentStep === 0}
                className="px-4 py-2 text-sm rounded-xl border border-[var(--color-border)] text-[var(--color-text-secondary)] disabled:opacity-30 transition-all"
              >
                Prev
              </button>
              <button
                onClick={() => setCurrentStep(s => Math.min(exercise.steps.length - 1, s + 1))}
                disabled={currentStep === exercise.steps.length - 1}
                className="px-4 py-2 text-sm rounded-xl border border-[var(--color-mint)]/30 text-[var(--color-mint)] font-medium disabled:opacity-30 transition-all"
              >
                Next Step
              </button>
            </div>
          </div>

          {/* Timer + Sets */}
          <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 mb-5">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-[var(--color-text)]">
                Set {setCount} of {exercise.sets}
              </span>
              <span className="text-sm text-[var(--color-text-muted)]">
                {exercise.reps} per set
              </span>
            </div>

            {/* Progress bar */}
            <div className="w-full h-2 bg-[var(--color-surface)] rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-[var(--color-mint)] rounded-full transition-all duration-1000"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Timer display */}
            <div className="text-center mb-3">
              <span className={`text-4xl font-mono font-bold ${
                timeLeft <= 5 && timerActive ? 'text-[var(--color-amber)]' : 'text-[var(--color-text)]'
              }`}>
                {mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : secs}
              </span>
              <span className="text-sm text-[var(--color-text-muted)] ml-1">s</span>
            </div>

            <div className="flex gap-2">
              {!timerActive ? (
                <button
                  onClick={handleStart}
                  className="flex-1 py-3 rounded-xl font-bold text-sm bg-[var(--color-mint)] text-white transition-all"
                >
                  {timeLeft === exercise.duration ? 'Start Timer' : 'Resume'}
                </button>
              ) : (
                <button
                  onClick={() => setTimerActive(false)}
                  className="flex-1 py-3 rounded-xl font-bold text-sm bg-[var(--color-amber)]/10 text-[var(--color-amber)] border border-[var(--color-amber)]/20 transition-all"
                >
                  Pause
                </button>
              )}
            </div>
          </div>

          {/* Bottom actions */}
          <div className="flex gap-3 mt-auto">
            <button
              onClick={() => setShowPainReport(true)}
              className="py-4 px-5 rounded-2xl text-sm font-medium bg-[var(--color-danger)]/5 text-[var(--color-danger)] border border-[var(--color-danger)]/15 transition-all"
            >
              I feel pain
            </button>
            <button
              onClick={() => handleComplete('normal')}
              className="flex-1 py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 transition-all active:scale-[0.98]"
            >
              {isLast ? 'Finish Session' : 'Done — Next Exercise'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PainDuringExercise({ exercise, onContinue, onSkip, regression }) {
  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex items-center justify-center p-5">
      <div className="max-w-md w-full animate-fade-in-up">
        <div className="bg-white rounded-3xl border border-[var(--color-border)] p-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[var(--color-danger)]/10 flex items-center justify-center mx-auto mb-5">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" strokeWidth="2" className="w-8 h-8">
              <path d="M12 9v4M12 17h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
            </svg>
          </div>
          <h2 className="text-xl font-display font-bold text-[var(--color-text)] mb-2">
            Pain Reported
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6">
            It's okay — let's adjust. Here's an easier option:
          </p>
          <div className="bg-[var(--color-mint)]/5 rounded-2xl p-4 mb-6 text-left">
            <div className="text-sm font-bold text-[var(--color-mint)] mb-1">Easier Alternative</div>
            <p className="text-sm text-[var(--color-text-secondary)]">{regression}</p>
          </div>
          <div className="space-y-3">
            <button
              onClick={onContinue}
              className="w-full py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white transition-all"
            >
              Try the Easier Version
            </button>
            <button
              onClick={onSkip}
              className="w-full py-3 rounded-2xl text-sm text-[var(--color-text-secondary)] border border-[var(--color-border)] transition-all"
            >
              Skip This Exercise
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
