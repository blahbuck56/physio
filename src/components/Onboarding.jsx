import { useState } from 'react';
import { injuryAreas } from '../data/exercises';

const mobilityLevels = [
  { id: 'limited', label: 'Very Limited', desc: 'Significant pain with basic movements', icon: '1' },
  { id: 'moderate', label: 'Somewhat Limited', desc: 'Can move but with discomfort', icon: '2' },
  { id: 'full', label: 'Mostly Normal', desc: 'Minor stiffness or occasional pain', icon: '3' },
];

const bodyIcons = {
  neck: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <circle cx="20" cy="10" r="6"/><path d="M17 16v8M23 16v8M14 24h12"/>
    </svg>
  ),
  shoulder: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <circle cx="20" cy="8" r="4"/><path d="M20 12v6M12 18c-4 0-6 2-6 5v3h28v-3c0-3-2-5-6-5"/>
    </svg>
  ),
  back: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <path d="M20 4v32M14 10c0 0-3 6-3 16M26 10c0 0 3 6 3 16"/>
    </svg>
  ),
  core: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <rect x="10" y="6" width="20" height="28" rx="3"/><line x1="10" y1="17" x2="30" y2="17"/><line x1="10" y1="23" x2="30" y2="23"/><line x1="20" y1="6" x2="20" y2="34"/>
    </svg>
  ),
  hip: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <ellipse cx="20" cy="16" rx="10" ry="6"/><path d="M13 22l-3 14M27 22l3 14"/>
    </svg>
  ),
  knee: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <path d="M20 4v12M20 24v12"/><circle cx="20" cy="20" r="5"/>
    </svg>
  ),
  ankle: (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="2" className="w-8 h-8">
      <path d="M20 4v20M20 24l-6 10h12l-6-10z"/><line x1="10" y1="34" x2="30" y2="34"/>
    </svg>
  ),
};

export default function Onboarding({ step, dispatch }) {
  const [injuryArea, setInjuryArea] = useState(null);
  const [painLevel, setPainLevel] = useState(5);
  const [mobilityLevel, setMobilityLevel] = useState(null);

  const painLabels = ['No pain', '', 'Mild', '', 'Moderate', '', 'Significant', '', 'Severe', '', 'Worst'];
  const painColor = painLevel <= 3 ? '#059669' : painLevel <= 6 ? '#D97706' : '#DC2626';

  const handleComplete = () => {
    dispatch({
      type: 'COMPLETE_ONBOARDING',
      profile: { injuryArea, painLevel, mobilityLevel },
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      {/* Progress bar */}
      <div className="px-6 pt-6 pb-2">
        <div className="flex gap-2">
          {[0, 1, 2].map(i => (
            <div key={i} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
              i <= step ? 'bg-[var(--color-mint)]' : 'bg-[var(--color-border)]'
            }`} />
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col px-6 py-8 max-w-lg mx-auto w-full">
        {/* Step 0: Injury Area */}
        {step === 0 && (
          <div className="flex-1 flex flex-col animate-fade-in-up">
            <h1 className="text-2xl font-display font-bold text-[var(--color-text)] mb-2">
              What area needs attention?
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-8">
              We'll build a recovery plan just for you.
            </p>
            <div className="grid grid-cols-2 gap-3 flex-1 content-start">
              {injuryAreas.map(area => (
                <button
                  key={area.id}
                  onClick={() => setInjuryArea(area.id)}
                  className={`flex flex-col items-center gap-2 p-5 rounded-2xl border-2 transition-all text-center ${
                    injuryArea === area.id
                      ? 'border-[var(--color-mint)] bg-[var(--color-mint)]/5'
                      : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
                  }`}
                >
                  <div className={`${injuryArea === area.id ? 'text-[var(--color-mint)]' : 'text-[var(--color-text-secondary)]'}`}>
                    {bodyIcons[area.id]}
                  </div>
                  <span className="font-bold text-sm text-[var(--color-text)]">{area.label}</span>
                  <span className="text-xs text-[var(--color-text-muted)] leading-tight">{area.description}</span>
                </button>
              ))}
            </div>
            <button
              onClick={() => injuryArea && dispatch({ type: 'NEXT_ONBOARDING' })}
              disabled={!injuryArea}
              className={`mt-6 w-full py-4 rounded-2xl text-base font-bold transition-all ${
                injuryArea
                  ? 'bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20'
                  : 'bg-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 1: Pain Level */}
        {step === 1 && (
          <div className="flex-1 flex flex-col animate-fade-in-up">
            <button onClick={() => dispatch({ type: 'PREV_ONBOARDING' })} className="text-[var(--color-text-secondary)] text-sm mb-4 self-start">
              ← Back
            </button>
            <h1 className="text-2xl font-display font-bold text-[var(--color-text)] mb-2">
              How much pain are you in?
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-12">
              This helps us set the right starting intensity.
            </p>

            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-7xl font-mono font-bold mb-2" style={{ color: painColor }}>
                {painLevel}
              </div>
              <div className="text-lg font-medium mb-8" style={{ color: painColor }}>
                {painLabels[painLevel] || ''}
              </div>
              <div className="w-full max-w-xs">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={painLevel}
                  onChange={e => setPainLevel(Number(e.target.value))}
                  className="w-full"
                  style={{
                    background: `linear-gradient(to right, #059669 0%, #D97706 50%, #DC2626 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-2">
                  <span>No pain</span>
                  <span>Worst pain</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => dispatch({ type: 'NEXT_ONBOARDING' })}
              className="mt-6 w-full py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 transition-all"
            >
              Continue
            </button>
          </div>
        )}

        {/* Step 2: Mobility */}
        {step === 2 && (
          <div className="flex-1 flex flex-col animate-fade-in-up">
            <button onClick={() => dispatch({ type: 'PREV_ONBOARDING' })} className="text-[var(--color-text-secondary)] text-sm mb-4 self-start">
              ← Back
            </button>
            <h1 className="text-2xl font-display font-bold text-[var(--color-text)] mb-2">
              How's your mobility?
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-8">
              We'll adjust exercises to match your current ability.
            </p>

            <div className="space-y-3 flex-1">
              {mobilityLevels.map(level => (
                <button
                  key={level.id}
                  onClick={() => setMobilityLevel(level.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left ${
                    mobilityLevel === level.id
                      ? 'border-[var(--color-mint)] bg-[var(--color-mint)]/5'
                      : 'border-[var(--color-border)] hover:border-[var(--color-text-muted)]'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                    mobilityLevel === level.id
                      ? 'bg-[var(--color-mint)] text-white'
                      : 'bg-[var(--color-surface)] text-[var(--color-text-muted)] border border-[var(--color-border)]'
                  }`}>
                    {level.icon}
                  </div>
                  <div>
                    <div className="font-bold text-[var(--color-text)]">{level.label}</div>
                    <div className="text-sm text-[var(--color-text-secondary)]">{level.desc}</div>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={handleComplete}
              disabled={!mobilityLevel}
              className={`mt-6 w-full py-4 rounded-2xl text-base font-bold transition-all ${
                mobilityLevel
                  ? 'bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20'
                  : 'bg-[var(--color-border)] text-[var(--color-text-muted)] cursor-not-allowed'
              }`}
            >
              Build My Plan
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
