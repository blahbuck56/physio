import ExerciseIllustration from './media/ExerciseIllustration';
import { bodyRegionColors, difficultyConfig } from '../data/exercises';

/*
 * ExerciseCard — premium card with visual thumbnail, badges, and hover states.
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
        className={`w-full flex items-center gap-4 p-4 rounded-2xl border border-[var(--color-border)] bg-white transition-all hover:border-[var(--color-mint)]/30 hover:shadow-md hover:shadow-[var(--color-mint)]/5 active:scale-[0.99] focus-visible:outline-2 focus-visible:outline-[var(--color-mint)] focus-visible:outline-offset-2 ${isCompleted ? 'opacity-60' : ''} ${className}`}
      >
        {/* Number */}
        <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
          isCompleted ? 'bg-[var(--color-mint)] text-white' : 'bg-[var(--color-mint)]/8 text-[var(--color-mint)]'
        }`}>
          {isCompleted ? (
            <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M3 8l4 4 6-7" />
            </svg>
          ) : index + 1}
        </div>

        {/* Info */}
        <div className="flex-1 text-left min-w-0">
          <div className="font-semibold text-sm text-[var(--color-text)] truncate">{exercise.name}</div>
          <div className="text-xs text-[var(--color-text-muted)] truncate">{exercise.purpose}</div>
        </div>

        {/* Meta */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-[var(--color-text-muted)]">{exercise.reps}</span>
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
        className={`w-full bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden transition-all hover:border-[var(--color-mint)]/30 hover:shadow-lg hover:shadow-[var(--color-mint)]/5 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[var(--color-mint)] focus-visible:outline-offset-2 ${className}`}
      >
        <ExerciseIllustration exercise={exercise} size="sm" showAnnotation={false} className="w-full rounded-b-none border-0" />
        <div className="p-3">
          <div className="font-semibold text-sm text-[var(--color-text)] truncate">{exercise.name}</div>
          <div className="text-xs text-[var(--color-text-muted)] mt-0.5">{exercise.reps}</div>
        </div>
      </button>
    );
  }

  // Default variant — full card
  return (
    <button
      onClick={() => onClick?.(exercise)}
      className={`w-full bg-white rounded-2xl border border-[var(--color-border)] overflow-hidden text-left transition-all hover:border-[var(--color-mint)]/30 hover:shadow-lg hover:shadow-[var(--color-mint)]/5 hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[var(--color-mint)] focus-visible:outline-offset-2 ${className}`}
    >
      {/* Thumbnail */}
      <ExerciseIllustration exercise={exercise} size="sm" showAnnotation={false} className="w-full rounded-b-none border-0" />

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-bold text-[var(--color-text)] text-sm leading-tight">{exercise.name}</h3>
          <span className={`text-[10px] px-2 py-0.5 rounded-full border font-medium flex-shrink-0 ${difficulty.color}`}>
            {difficulty.label}
          </span>
        </div>

        <p className="text-xs text-[var(--color-text-secondary)] leading-relaxed mb-3">
          {exercise.purpose}
        </p>

        <div className="flex items-center gap-3 text-[11px] text-[var(--color-text-muted)]">
          <span className={`px-2 py-0.5 rounded-full ${region.bg} ${region.text} border ${region.border} font-medium`}>
            {exercise.bodyRegion}
          </span>
          <span className="flex items-center gap-1">
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
              <circle cx="8" cy="8" r="6" /><path d="M8 4.5V8l2.5 1.5" />
            </svg>
            {exercise.duration}s
          </span>
          <span>{exercise.reps}</span>
          {exercise.equipment !== 'none' && (
            <span className="flex items-center gap-1">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-3 h-3">
                <path d="M2 8h12M4 5v6M12 5v6" />
              </svg>
              {exercise.equipment}
            </span>
          )}
        </div>
      </div>
    </button>
  );
}
