import { useState } from 'react';

const painLabels = ['None', 'Minimal', 'Mild', 'Moderate', 'Severe', 'Worst'];
const painColors = [
  'bg-emerald-400', 'bg-emerald-300', 'bg-yellow-400',
  'bg-amber-400', 'bg-orange-500', 'bg-red-500'
];

export default function PainTracker() {
  const [pain, setPain] = useState(0);
  const [log, setLog] = useState([]);

  const logPain = () => {
    const entry = {
      level: pain,
      label: painLabels[Math.floor(pain / 2)],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setLog((prev) => [entry, ...prev].slice(0, 10));
  };

  const colorIndex = Math.floor(pain / 2);

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5">
      <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-4">Pain Level</h3>

      <div className="flex items-center justify-between mb-2">
        <span className="text-3xl font-mono font-bold text-[var(--color-text)]">{pain}</span>
        <span className={`text-sm px-3 py-1 rounded-full ${painColors[colorIndex]} text-black font-medium`}>
          {painLabels[colorIndex]}
        </span>
      </div>

      <input
        type="range"
        min="0"
        max="10"
        value={pain}
        onChange={(e) => setPain(Number(e.target.value))}
        className="w-full mb-1"
        style={{
          background: `linear-gradient(to right, #6EE7B7 0%, #EF4444 100%)`
        }}
      />
      <div className="flex justify-between text-xs text-[var(--color-text-muted)] mb-4">
        <span>0 — No Pain</span>
        <span>10 — Worst</span>
      </div>

      <button
        onClick={logPain}
        className="w-full py-2.5 rounded-xl text-sm font-medium bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-secondary)] hover:border-[var(--color-mint)]/30 hover:text-[var(--color-mint)] transition-all"
      >
        Log Entry
      </button>

      {log.length > 0 && (
        <div className="mt-4 pt-3 border-t border-[var(--color-border)] space-y-2">
          {log.map((entry, i) => (
            <div key={i} className="flex items-center justify-between text-xs">
              <span className="text-[var(--color-text-muted)]">{entry.time}</span>
              <div className="flex items-center gap-2">
                <span className="text-[var(--color-text-secondary)]">{entry.label}</span>
                <div className={`w-3 h-3 rounded-full ${painColors[Math.floor(entry.level / 2)]}`} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
