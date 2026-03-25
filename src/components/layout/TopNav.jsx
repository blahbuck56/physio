import { plans } from '../../data/exercises';

export default function TopNav({ state, dispatch }) {
  const { profile, currentWeek } = state;
  const plan = profile ? plans[profile.injuryArea] : null;

  return (
    <header className="sticky top-0 z-20 bg-white/90 backdrop-blur-xl border-b border-[var(--color-border)]">
      <div className="flex items-center justify-between px-4 py-3 md:px-6">
        <div className="flex items-center gap-3">
          <h1 className="text-lg font-display font-bold text-[var(--color-text)]">
            Physio<span className="text-[var(--color-mint)]">Guide</span>
          </h1>
          {plan && (
            <span className="hidden md:inline text-xs text-[var(--color-text-muted)] bg-[var(--color-surface)] px-2 py-1 rounded-full border border-[var(--color-border)]">
              {plan.name} — Week {currentWeek}
            </span>
          )}
        </div>

        <nav className="flex items-center gap-1">
          {[
            { screen: 'dashboard', label: 'Home' },
            { screen: 'progress', label: 'Progress' },
          ].map(item => (
            <button
              key={item.screen}
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: item.screen })}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                state.screen === item.screen
                  ? 'bg-[var(--color-mint)]/8 text-[var(--color-mint)]'
                  : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => dispatch({ type: 'RESET' })}
            className="ml-2 w-8 h-8 rounded-full bg-[var(--color-surface)] border border-[var(--color-border)] flex items-center justify-center text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            aria-label="Settings"
          >
            <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-4 h-4">
              <circle cx="10" cy="10" r="3"/><path d="M10 1v2M10 17v2M3.5 3.5l1.4 1.4M15.1 15.1l1.4 1.4M1 10h2M17 10h2M3.5 16.5l1.4-1.4M15.1 4.9l1.4-1.4"/>
            </svg>
          </button>
        </nav>
      </div>
    </header>
  );
}
