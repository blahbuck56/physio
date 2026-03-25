import ExerciseIllustration from './media/ExerciseIllustration';
import { bodyRegionColors, difficultyConfig } from '../data/exercises';

/*
 * ExerciseCard — polished card with visual thumbnail, badges, hover states.
 *
 * Props:
 *   exercise: exercise object
 *   index: number — position in list (for numbering)
 *   onClick: (exercise) => void
 *   variant: 'default' | 'compact' | 'list' — layout style
 *   isCompleted: boolean
 *   className: string
 */
export default function ExerciseCard({
  exercise,
  index,
  onClick,
  variant = 'default',
  isCompleted = false,
  className = '',
}) {
  const region = bodyRegionColors[exercise.bodyRegion] || bodyRegionColors.back;
  const difficulty = difficultyConfig[exercise.difficulty] || difficultyConfig.beginner;

  if (variant === 'list') {
    return (
      <button
        onClick={() => onClick?.(exercise)}
        className={`w-full flex items-center gap-4 p-5 rounded-2xl border border-[var(--color-border)] bg-white shadow-sm transition-all duration-200 hover:border-[var(--color-mint)]/40 hover:shadow-md hover:-translate-y-0.5 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[var(--color-mint)] focus-visible:outline-offset-2 ${isCompleted ? 'opacity-60' : ''} ${className}`}
      >
        {/* Number */}
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
          isCompleted ? 'bg-[var(--color-mint)] text-white' : 'bg-[var(--color-mint)]/10 text-[var(--color-mint)]'
        }`}>
          {isCompleted ? (
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 8l4 4 6-7" />
            </svg>
          ) : index + 1}
        </div>

        {/* Info */}
        <div className="flex-1 text-left min-w-0">
          <div className="font-bold text-sm text-[var(--color-text)] truncate mb-0.5">{exercise.name}</div>
          <div className="text-xs text-[var(--color-text-muted)] truncate">{exercise.steps[0]}</div>
        </div>

        {/* Meta pills */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-[10px] font-medium px-2.5 py-1 rounded-full bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]">
            {exercise.reps}
          </span>
          <svg viewBox="0 0 16 16" className="w-4 h-4 text-[var(--color-text-muted)]" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 12l4-4-4-4" />
          </svg>
        </div>
      </button>
    );
  }

  if (variant === 'compact') {
    return (
      <button
        onClick={() => onClick?.(exercise)}
        className={`w-full bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-sm transition-all duration-200 hover:border-[var(--color-mint)]/40 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[var(--color-mint)] focus-visible:outline-offset-2 ${className}`}
      >
        <ExerciseIllustration exercise={exercise} size="sm" showAnnotation={false} className="w-full rounded-b-none border-0" />
        <div className="p-4">
          <div className="font-bold text-sm text-[var(--color-text)] truncate">{exercise.name}</div>
          <div className="text-xs text-[var(--color-text-muted)] mt-1">{exercise.reps}</div>
        </div>
      </button>
    );
  }

  // Default variant — full card
  return (
    <button
      onClick={() => onClick?.(exercise)}
      className={`w-full bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden text-left shadow-sm transition-all duration-200 hover:border-[var(--color-mint)]/40 hover:shadow-lg hover:-translate-y-1 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[var(--color-mint)] focus-visible:outline-offset-2 ${className}`}
    >
      {/* Thumbnail */}
      <ExerciseIllustration exercise={exercise} size="sm" showAnnotation={false} className="w-full rounded-b-none border-0" />

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-[var(--color-text)] text-sm leading-tight">{exercise.name}</h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${difficulty.color}`}>
            {difficulty.label}
          </span>
        </div>

        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
          {exercise.purpose}
        </p>

        {/* First instruction step preview */}
        <p className="text-[11px] text-[var(--color-text-muted)] italic mb-3 line-clamp-1">
          1. {exercise.steps[0]}
        </p>

        {/* Meta pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`text-[10px] px-2.5 py-1 rounded-full ${region.bg} ${region.text} border ${region.border} font-medium`}>
            {exercise.bodyRegion}
          </span>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200 font-medium flex items-center gap-1">
            <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-2.5 h-2.5">
              <circle cx="6" cy="6" r="4.5" /><path d="M6 3.5V6l1.5 1" />
            </svg>
            {exercise.duration}s
          </span>
          <span className="text-[10px] px-2.5 py-1 rounded-full bg-slate-50 text-slate-600 border border-slate-200 font-medium">
            {exercise.reps}
          </span>
          {exercise.equipment !== 'none' && (
            <span className="text-[10px] px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium">
              {exercise.equipment}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
