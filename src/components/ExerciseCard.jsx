import { difficultyColors } from '../data/exercises';

export default function ExerciseCard({ exercise, onClick }) {
  return (
    <button
      onClick={() => onClick(exercise)}
      className="w-full text-left bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 transition-all duration-200 hover:border-[var(--color-mint)]/30 hover:bg-[var(--color-mint)]/[0.03] active:scale-[0.98] animate-fade-in-up"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <h3 className="text-lg font-bold text-[var(--color-text)]">
          {exercise.name}
        </h3>
        <span className={`text-xs px-2 py-1 rounded-full border font-medium capitalize ${difficultyColors[exercise.difficulty]}`}>
          {exercise.difficulty}
        </span>
      </div>
      <p className="text-sm text-[var(--color-text-secondary)] mb-4 leading-relaxed">
        {exercise.description}
      </p>
      <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
          </svg>
          {exercise.duration}
        </span>
        <span className="flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path d="M4 12h16M4 6h16M4 18h16" />
          </svg>
          {exercise.reps}
        </span>
        <span className="capitalize flex items-center gap-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5">
            <path d="M21 10c0 6-9 12-9 12S3 16 3 10a9 9 0 1118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          {exercise.category}
        </span>
      </div>
    </button>
  );
}
