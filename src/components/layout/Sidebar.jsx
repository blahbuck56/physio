import { plans } from '../../data/exercises';

export default function Sidebar({ state, dispatch }) {
  const { profile, currentWeek, streak, completedSessions } = state;
  const plan = profile ? plans[profile.injuryArea] : null;

  const navItems = [
    { screen: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { screen: 'progress', label: 'Progress', icon: ProgressIcon },
  ];

  return (
    <aside className="w-64 xl:w-72 h-screen sticky top-0 bg-white border-r border-[var(--color-border)] flex flex-col">
      {/* Logo */}
      <div className="px-6 py-5 border-b border-[var(--color-border)]">
        <h1 className="text-lg font-display font-bold text-[var(--color-text)]">
          Physio<span className="text-[var(--color-mint)]">Guide</span>
        </h1>
        {plan && (
          <p className="text-xs text-[var(--color-text-muted)] mt-0.5">
            {plan.name} — Week {currentWeek}
          </p>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(item => {
          const isActive = state.screen === item.screen;
          return (
            <button
              key={item.screen}
              onClick={() => dispatch({ type: 'SET_SCREEN', screen: item.screen })}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[var(--color-mint)]/8 text-[var(--color-mint)]'
                  : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text)]'
              }`}
            >
              <item.icon active={isActive} />
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Quick stats */}
      <div className="px-4 py-4 border-t border-[var(--color-border)]">
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-[var(--color-surface)] rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-[var(--color-mint)]">{streak}</div>
            <div className="text-[10px] text-[var(--color-text-muted)]">Streak</div>
          </div>
          <div className="bg-[var(--color-surface)] rounded-xl p-3 text-center">
            <div className="text-lg font-bold text-[var(--color-text)]">{completedSessions.length}</div>
            <div className="text-[10px] text-[var(--color-text-muted)]">Sessions</div>
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="px-4 pb-4">
        <button
          onClick={() => dispatch({ type: 'RESET' })}
          className="w-full text-xs text-[var(--color-text-muted)] hover:text-[var(--color-danger)] transition-colors py-2"
        >
          Reset Progress
        </button>
      </div>
    </aside>
  );
}

function DashboardIcon({ active }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke={active ? 'var(--color-mint)' : 'currentColor'} strokeWidth="1.5" className="w-5 h-5">
      <rect x="2" y="2" width="7" height="7" rx="2" />
      <rect x="11" y="2" width="7" height="7" rx="2" />
      <rect x="2" y="11" width="7" height="7" rx="2" />
      <rect x="11" y="11" width="7" height="7" rx="2" />
    </svg>
  );
}

function ProgressIcon({ active }) {
  return (
    <svg viewBox="0 0 20 20" fill="none" stroke={active ? 'var(--color-mint)' : 'currentColor'} strokeWidth="1.5" className="w-5 h-5">
      <path d="M2 2v16h16" /><path d="M16 14V8M12 14V5M8 14v-3" />
    </svg>
  );
}
