import { useState } from 'react';
import { injuryAreas, plans, getPlanExercises } from '../data/exercises';

const experienceLevels = [
  {
    id: 'beginner',
    label: 'New to physio exercises',
    desc: 'Never done structured rehab before',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M12 3v18M8 7l4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'intermediate',
    label: 'Some experience',
    desc: 'Done physio or rehab exercises before',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M4 12h16M8 8l4-4 4 4M8 16l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    id: 'advanced',
    label: 'Regular practitioner',
    desc: 'Comfortable with exercise form and progression',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-6 h-6">
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const bodyAreaIcons = {
  neck: (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <circle cx="16" cy="9" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13 14v6M19 14v6M11 20h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  shoulder: (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M16 8v8M8 16c0-4 3.5-6 8-6s8 2 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="8" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  back: (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M16 4v24M12 8c0 0-4 6-4 16M20 8c0 0 4 6 4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  core: (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <rect x="9" y="6" width="14" height="20" rx="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 13h14M9 19h14M16 6v20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  hip: (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <ellipse cx="16" cy="12" rx="8" ry="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M11 17l-2 11M21 17l2 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  knee: (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M16 4v10M16 22v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  ankle: (
    <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
      <path d="M16 4v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="20" r="3" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 28h12M13 23l-3 5M19 23l3 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const painDescriptors = {
  0: 'No pain',
  1: 'Barely noticeable',
  2: 'Mild discomfort',
  3: 'Mild discomfort',
  4: 'Moderate pain',
  5: 'Moderate pain',
  6: 'Moderate pain',
  7: 'Significant pain',
  8: 'Significant pain',
  9: 'Severe pain',
  10: 'Worst imaginable',
};

const TOTAL_STEPS = 5;

export default function Onboarding({ step, dispatch }) {
  const [injuryArea, setInjuryArea] = useState(null);
  const [painLevel, setPainLevel] = useState(5);
  const [experienceLevel, setExperienceLevel] = useState(null);

  const painColor = painLevel <= 3 ? '#059669' : painLevel <= 6 ? '#D97706' : '#DC2626';

  const handleComplete = () => {
    dispatch({
      type: 'COMPLETE_ONBOARDING',
      profile: { injuryArea, painLevel, mobilityLevel: experienceLevel === 'beginner' ? 'limited' : experienceLevel === 'intermediate' ? 'moderate' : 'full' },
    });
  };

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col">
      {/* Progress bar */}
      {step > 0 && (
        <div className="px-6 pt-5 pb-2">
          <div className="flex gap-2">
            {Array.from({ length: TOTAL_STEPS - 1 }, (_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                i < step ? 'bg-[var(--color-mint)]' : 'bg-[var(--color-border)]'
              }`} />
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col px-6 py-6 max-w-lg mx-auto w-full">
        {/* ── Step 0: Welcome ───────────────────── */}
        {step === 0 && (
          <div className="flex-1 flex flex-col items-center justify-center text-center animate-fade-in-up">
            {/* Logo mark */}
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/20">
              <svg viewBox="0 0 32 32" fill="none" className="w-10 h-10 text-white">
                <path d="M16 4C9.4 4 4 9.4 4 16s5.4 12 12 12 12-5.4 12-12S22.6 4 16 4z" stroke="currentColor" strokeWidth="1.5" />
                <path d="M12 16l3 3 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>

            <h1 className="text-3xl font-display font-bold text-[var(--color-text)] mb-3">
              PhysioGuide
            </h1>
            <p className="text-lg text-[var(--color-text-secondary)] leading-relaxed mb-3 max-w-sm">
              Guided physio exercises for injury recovery
            </p>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-xs mb-12">
              Science-backed exercises, personalized to your body and pain level. No guesswork.
            </p>

            <button
              onClick={() => dispatch({ type: 'NEXT_ONBOARDING' })}
              className="w-full max-w-xs py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 transition-all hover:shadow-xl active:scale-[0.98]"
            >
              Get Started
            </button>
            <p className="text-xs text-[var(--color-text-muted)] mt-4">Takes about 30 seconds</p>
          </div>
        )}

        {/* ── Step 1: Body Area ─────────────────── */}
        {step === 1 && (
          <div className="flex-1 flex flex-col animate-fade-in-up">
            <button onClick={() => dispatch({ type: 'PREV_ONBOARDING' })} className="text-[var(--color-text-secondary)] text-sm mb-4 self-start hover:text-[var(--color-text)] transition-colors">
              &larr; Back
            </button>
            <h1 className="text-2xl font-display font-bold text-[var(--color-text)] mb-2">
              What's bothering you?
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-6">
              Select the area that needs the most attention.
            </p>
            <div className="grid grid-cols-2 gap-3 flex-1 content-start">
              {injuryAreas.map(area => (
                <button
                  key={area.id}
                  onClick={() => setInjuryArea(area.id)}
                  className={`flex flex-col items-center gap-2.5 p-5 rounded-2xl border-2 transition-all text-center hover:shadow-md ${
                    injuryArea === area.id
                      ? 'border-[var(--color-mint)] bg-emerald-50/60 shadow-sm'
                      : 'border-[var(--color-border)] bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                    injuryArea === area.id
                      ? 'bg-[var(--color-mint)] text-white'
                      : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
                  }`}>
                    {bodyAreaIcons[area.id]}
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
                  ? 'bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 hover:shadow-xl active:scale-[0.98]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* ── Step 2: Pain Level ────────────────── */}
        {step === 2 && (
          <div className="flex-1 flex flex-col animate-fade-in-up">
            <button onClick={() => dispatch({ type: 'PREV_ONBOARDING' })} className="text-[var(--color-text-secondary)] text-sm mb-4 self-start hover:text-[var(--color-text)] transition-colors">
              &larr; Back
            </button>
            <h1 className="text-2xl font-display font-bold text-[var(--color-text)] mb-2">
              How much pain are you in?
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-10">
              This helps us set the right starting intensity.
            </p>

            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Pain number */}
              <div className="relative mb-2">
                <span className="text-8xl font-mono font-bold tracking-tight" style={{ color: painColor }}>
                  {painLevel}
                </span>
              </div>
              <div className="text-base font-medium mb-10" style={{ color: painColor }}>
                {painDescriptors[painLevel]}
              </div>

              {/* Descriptor scale */}
              <div className="w-full max-w-sm mb-3">
                <div className="flex justify-between text-[10px] text-[var(--color-text-muted)] mb-2 px-0.5">
                  <span>1–3: Mild</span>
                  <span>4–6: Moderate</span>
                  <span>7–10: Significant</span>
                </div>
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
                <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-2 font-medium">
                  <span>No pain</span>
                  <span>Worst pain</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => dispatch({ type: 'NEXT_ONBOARDING' })}
              className="mt-6 w-full py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 transition-all hover:shadow-xl active:scale-[0.98]"
            >
              Continue
            </button>
          </div>
        )}

        {/* ── Step 3: Experience Level ──────────── */}
        {step === 3 && (
          <div className="flex-1 flex flex-col animate-fade-in-up">
            <button onClick={() => dispatch({ type: 'PREV_ONBOARDING' })} className="text-[var(--color-text-secondary)] text-sm mb-4 self-start hover:text-[var(--color-text)] transition-colors">
              &larr; Back
            </button>
            <h1 className="text-2xl font-display font-bold text-[var(--color-text)] mb-2">
              Your experience level
            </h1>
            <p className="text-[var(--color-text-secondary)] mb-8">
              This determines which exercises we start you with.
            </p>

            <div className="space-y-3 flex-1">
              {experienceLevels.map(level => (
                <button
                  key={level.id}
                  onClick={() => setExperienceLevel(level.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 transition-all text-left hover:shadow-md ${
                    experienceLevel === level.id
                      ? 'border-[var(--color-mint)] bg-emerald-50/60 shadow-sm'
                      : 'border-[var(--color-border)] bg-white hover:border-gray-300'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                    experienceLevel === level.id
                      ? 'bg-[var(--color-mint)] text-white'
                      : 'bg-[var(--color-surface)] text-[var(--color-text-secondary)]'
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
              onClick={() => experienceLevel && dispatch({ type: 'NEXT_ONBOARDING' })}
              disabled={!experienceLevel}
              className={`mt-6 w-full py-4 rounded-2xl text-base font-bold transition-all ${
                experienceLevel
                  ? 'bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 hover:shadow-xl active:scale-[0.98]'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        )}

        {/* ── Step 4: Plan Summary ──────────────── */}
        {step === 4 && (
          <PlanSummary
            injuryArea={injuryArea}
            painLevel={painLevel}
            experienceLevel={experienceLevel}
            onComplete={handleComplete}
            onBack={() => dispatch({ type: 'PREV_ONBOARDING' })}
          />
        )}
      </div>
    </div>
  );
}

function PlanSummary({ injuryArea, painLevel, experienceLevel, onComplete, onBack }) {
  const plan = plans[injuryArea];
  const exercises = getPlanExercises(injuryArea, 1);
  const area = injuryAreas.find(a => a.id === injuryArea);
  const phase = painLevel >= 7 ? 'Gentle Recovery' : painLevel >= 4 ? 'Active Rehabilitation' : 'Strength Building';

  return (
    <div className="flex-1 flex flex-col animate-fade-in-up">
      <button onClick={onBack} className="text-[var(--color-text-secondary)] text-sm mb-4 self-start hover:text-[var(--color-text)] transition-colors">
        &larr; Back
      </button>

      {/* Success badge */}
      <div className="text-center mb-6">
        <div className="w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-mint)" strokeWidth="2.5" className="w-8 h-8">
            <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="text-2xl font-display font-bold text-[var(--color-text)] mb-1">
          Your plan is ready!
        </h1>
        <p className="text-[var(--color-text-secondary)]">
          Personalized for your {area?.label?.toLowerCase()} recovery
        </p>
      </div>

      {/* Summary card */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 mb-4 shadow-sm">
        <div className="space-y-3.5">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">Focus area</span>
            <span className="text-sm font-bold text-[var(--color-text)]">{area?.label}</span>
          </div>
          <div className="h-px bg-[var(--color-border)]" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">Starting phase</span>
            <span className="text-sm font-bold text-[var(--color-mint)]">{phase}</span>
          </div>
          <div className="h-px bg-[var(--color-border)]" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">Pain level</span>
            <span className="text-sm font-bold" style={{ color: painLevel <= 3 ? '#059669' : painLevel <= 6 ? '#D97706' : '#DC2626' }}>
              {painLevel}/10
            </span>
          </div>
          <div className="h-px bg-[var(--color-border)]" />
          <div className="flex items-center justify-between">
            <span className="text-sm text-[var(--color-text-secondary)]">Duration</span>
            <span className="text-sm font-bold text-[var(--color-text)]">4-week program</span>
          </div>
        </div>
      </div>

      {/* Week 1 preview */}
      <div className="bg-white rounded-2xl border border-[var(--color-border)] p-5 mb-4 shadow-sm">
        <h3 className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
          Week 1: {plan?.weeks[0]?.name}
        </h3>
        <div className="space-y-2">
          {exercises.map((ex, i) => (
            <div key={ex.id} className="flex items-center gap-3 p-2.5 rounded-xl bg-[var(--color-surface)]">
              <div className="w-7 h-7 rounded-full bg-[var(--color-mint)]/10 text-[var(--color-mint)] flex items-center justify-center text-xs font-bold flex-shrink-0">
                {i + 1}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-[var(--color-text)] truncate">{ex.name}</div>
                <div className="text-xs text-[var(--color-text-muted)]">{ex.reps} &middot; {ex.sets} sets</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Why this plan */}
      <div className="bg-emerald-50 rounded-2xl border border-emerald-100 p-4 mb-6">
        <p className="text-sm text-emerald-800 leading-relaxed">
          {painLevel >= 7
            ? "We're starting with gentle, low-impact exercises to reduce pain before building strength."
            : painLevel >= 4
            ? "Your plan starts with mobility exercises and progressively adds strengthening work."
            : "You'll begin with foundational exercises and quickly progress to building strength and stability."}
        </p>
      </div>

      <div className="mt-auto">
        <button
          onClick={onComplete}
          className="w-full py-4 rounded-2xl text-base font-bold bg-[var(--color-mint)] text-white shadow-lg shadow-[var(--color-mint)]/20 transition-all hover:shadow-xl active:scale-[0.98]"
        >
          Start Recovery
        </button>
        <p className="text-xs text-[var(--color-text-muted)] text-center mt-3">
          3 sessions per week &middot; 10-15 min each
        </p>
      </div>
    </div>
  );
}
