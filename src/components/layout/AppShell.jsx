import useBreakpoint from '../../hooks/useBreakpoint';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

/*
 * AppShell — responsive layout wrapper.
 * Desktop (lg+): sidebar nav + main content
 * Tablet/Mobile: top nav + main content
 * Excluded from onboarding and exercise player (full-screen flows).
 */
export default function AppShell({ state, dispatch, children }) {
  const { isDesktop } = useBreakpoint();

  // Full-screen screens bypass the shell
  const fullScreens = ['onboarding', 'player', 'feedback'];
  if (fullScreens.includes(state.screen)) {
    return <>{children}</>;
  }

  if (isDesktop) {
    return (
      <div className="flex min-h-screen bg-[var(--color-bg)]">
        <Sidebar state={state} dispatch={dispatch} />
        <main className="flex-1 min-h-screen overflow-y-auto">
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      <TopNav state={state} dispatch={dispatch} />
      <main>
        {children}
      </main>
    </div>
  );
}
