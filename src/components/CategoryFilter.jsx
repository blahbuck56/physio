import { categories } from '../data/exercises';

const iconMap = {
  grid: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </svg>
  ),
  neck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <circle cx="12" cy="5" r="3" />
      <path d="M10 8v6M14 8v6M8 14h8" />
    </svg>
  ),
  shoulder: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M12 4v4M8 8c-3 0-5 2-5 5v3h18v-3c0-3-2-5-5-5" />
      <circle cx="12" cy="4" r="2" />
    </svg>
  ),
  back: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M12 2v20M8 6c0 0-2 4-2 10M16 6c0 0 2 4 2 10" />
    </svg>
  ),
  core: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <rect x="6" y="4" width="12" height="16" rx="2" />
      <line x1="6" y1="10" x2="18" y2="10" />
      <line x1="6" y1="14" x2="18" y2="14" />
      <line x1="12" y1="4" x2="12" y2="20" />
    </svg>
  ),
  hip: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <ellipse cx="12" cy="10" rx="6" ry="4" />
      <path d="M8 14l-2 8M16 14l2 8" />
    </svg>
  ),
  knee: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M12 2v8M12 14v8" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  ankle: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
      <path d="M12 2v12M12 14l-4 6h8l-4-6z" />
      <line x1="6" y1="20" x2="18" y2="20" />
    </svg>
  )
};

export default function CategoryFilter({ selected, onSelect }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 px-4 scrollbar-hide -mx-4">
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => onSelect(cat.id)}
          className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 border ${
            selected === cat.id
              ? 'bg-[var(--color-mint)]/15 text-[var(--color-mint)] border-[var(--color-mint)]/30'
              : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)] border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
          }`}
        >
          {iconMap[cat.icon]}
          {cat.label}
        </button>
      ))}
    </div>
  );
}
