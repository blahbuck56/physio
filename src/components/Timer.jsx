import { useState, useRef, useEffect } from 'react';

export default function Timer() {
  const [seconds, setSeconds] = useState(30);
  const [timeLeft, setTimeLeft] = useState(30);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (running && timeLeft > 0) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setRunning(false);
    }
    return () => clearInterval(intervalRef.current);
  }, [running, timeLeft]);

  const toggle = () => {
    if (timeLeft === 0) {
      setTimeLeft(seconds);
    }
    setRunning(!running);
  };

  const reset = () => {
    setRunning(false);
    setTimeLeft(seconds);
  };

  const adjustTime = (val) => {
    const newVal = Number(val);
    setSeconds(newVal);
    if (!running) setTimeLeft(newVal);
  };

  const progress = seconds > 0 ? ((seconds - timeLeft) / seconds) * 100 : 0;
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  return (
    <div className="bg-[var(--color-surface)] border border-[var(--color-border)] rounded-2xl p-5 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider">Hold Timer</h3>
        <span className="text-xs text-[var(--color-text-muted)]">{seconds}s preset</span>
      </div>

      {/* Progress ring */}
      <div className="flex items-center justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="44" fill="none" stroke="var(--color-border)" strokeWidth="6" />
            <circle
              cx="50" cy="50" r="44"
              fill="none"
              stroke="var(--color-mint)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 44}`}
              strokeDashoffset={`${2 * Math.PI * 44 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-3xl font-mono font-bold ${timeLeft === 0 ? 'text-[var(--color-mint)]' : 'text-[var(--color-text)]'}`}>
              {mins > 0 ? `${mins}:${secs.toString().padStart(2, '0')}` : secs}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={toggle}
          className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${
            running
              ? 'bg-[var(--color-amber)]/15 text-[var(--color-amber)] border border-[var(--color-amber)]/20'
              : 'bg-[var(--color-mint)]/15 text-[var(--color-mint)] border border-[var(--color-mint)]/20'
          }`}
        >
          {running ? 'Pause' : timeLeft === 0 ? 'Restart' : 'Start'}
        </button>
        <button
          onClick={reset}
          className="py-3 px-4 rounded-xl text-sm text-[var(--color-text-muted)] border border-[var(--color-border)] hover:text-[var(--color-text-secondary)] transition-colors"
        >
          Reset
        </button>
      </div>

      {/* Duration slider */}
      {!running && (
        <div>
          <input
            type="range"
            min="5"
            max="120"
            step="5"
            value={seconds}
            onChange={(e) => adjustTime(e.target.value)}
            className="w-full"
            style={{
              background: `linear-gradient(to right, var(--color-mint) ${((seconds - 5) / 115) * 100}%, var(--color-border) ${((seconds - 5) / 115) * 100}%)`
            }}
          />
          <div className="flex justify-between text-xs text-[var(--color-text-muted)] mt-1">
            <span>5s</span>
            <span>120s</span>
          </div>
        </div>
      )}
    </div>
  );
}
