import useAppState from './hooks/useAppState';
import AppShell from './components/layout/AppShell';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import ExercisePlayer from './components/ExercisePlayer';
import ExerciseFeedback from './components/ExerciseFeedback';
import SessionSummary from './components/SessionSummary';
import ProgressTracker from './components/ProgressTracker';
import './App.css';

function App() {
  const [state, dispatch] = useAppState();

  const screen = (() => {
    switch (state.screen) {
      case 'onboarding':
        return <Onboarding step={state.onboardingStep} dispatch={dispatch} />;
      case 'dashboard':
        return <Dashboard state={state} dispatch={dispatch} />;
      case 'player':
        return <ExercisePlayer state={state} dispatch={dispatch} />;
      case 'feedback':
        return <ExerciseFeedback state={state} dispatch={dispatch} />;
      case 'summary':
        return <SessionSummary state={state} dispatch={dispatch} />;
      case 'progress':
        return <ProgressTracker state={state} dispatch={dispatch} />;
      default:
        return <Dashboard state={state} dispatch={dispatch} />;
    }
  })();

  return (
    <AppShell state={state} dispatch={dispatch}>
      {screen}
    </AppShell>
  );
}

export default App;
