import { useState, useMemo } from 'react';
import exercises from './data/exercises';
import CategoryFilter from './components/CategoryFilter';
import ExerciseCard from './components/ExerciseCard';
import ExerciseDetail from './components/ExerciseDetail';
import PainTracker from './components/PainTracker';
import './App.css';

function App() {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedExercise, setSelectedExercise] = useState(null);

  const filtered = useMemo(() => {
    return exercises.filter((ex) => {
      const matchCat = category === 'all' || ex.category === category;
      const matchSearch =
        !search ||
        ex.name.toLowerCase().includes(search.toLowerCase()) ||
        ex.description.toLowerCase().includes(search.toLowerCase()) ||
        ex.targetMuscles.some((m) => m.toLowerCase().includes(search.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [category, search]);

  if (selectedExercise) {
    return (
      <div className="min-h-screen bg-[var(--color-bg)] px-4 py-6 max-w-lg mx-auto">
        <ExerciseDetail
          exercise={selectedExercise}
          onBack={() => setSelectedExercise(null)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-[var(--color-bg)]/80 backdrop-blur-xl border-b border-[var(--color-border)]">
        <div className="max-w-lg mx-auto px-4 pt-6 pb-4">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-xl font-display font-bold text-[var(--color-text)]">
              Physio<span className="text-[var(--color-mint)]">Guide</span>
            </h1>
            <span className="text-xs text-[var(--color-text-muted)] bg-[var(--color-surface)] px-2 py-1 rounded-full border border-[var(--color-border)]">
              {exercises.length} exercises
            </span>
          </div>
          <p className="text-xs text-[var(--color-text-muted)] mb-4">Evidence-based recovery exercises</p>

          {/* Search */}
          <div className="relative mb-4">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-muted)]">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search exercises or muscles..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm text-[var(--color-text)] placeholder-[var(--color-text-muted)] outline-none focus:border-[var(--color-mint)]/40 transition-colors"
            />
          </div>

          {/* Categories */}
          <CategoryFilter selected={category} onSelect={setCategory} />
        </div>
      </header>

      {/* Exercise List */}
      <main className="max-w-lg mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">
            {category === 'all' ? 'All Exercises' : `${category.charAt(0).toUpperCase() + category.slice(1)} Exercises`}
          </h2>
          <span className="text-xs text-[var(--color-text-muted)]">{filtered.length} found</span>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-[var(--color-text-muted)]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-12 h-12 mx-auto mb-3 opacity-30">
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
              <path d="M8 11h6" />
            </svg>
            <p className="text-sm">No exercises found</p>
            <p className="text-xs mt-1">Try a different search or category</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map((ex) => (
              <ExerciseCard key={ex.id} exercise={ex} onClick={setSelectedExercise} />
            ))}
          </div>
        )}

        {/* Pain Tracker */}
        <div className="mt-8">
          <h2 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">
            Track Your Pain
          </h2>
          <PainTracker />
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-[var(--color-text-muted)] text-center mt-8 mb-4 px-4 leading-relaxed">
          This app provides general exercise guidance only and is not a substitute for professional medical advice. Consult your physiotherapist before starting any exercise program.
        </p>
      </main>
    </div>
  );
}

export default App;
