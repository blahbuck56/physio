import { bodyRegionColors } from '../../data/exercises';

/*
 * ExerciseIllustration — clean visual component for exercises.
 *
 * Rendering priority:
 * 1. Licensed video (media.type === 'video' && media.primaryUrl)
 * 2. Licensed image (media.type === 'image' && media.primaryUrl)
 * 3. Abstract motion-capture style visual (default)
 *
 * Uses colored gradients, movement-type icons, and body-region
 * color coding instead of anatomical stick figures.
 */

const movementIcons = {
  neck: (color) => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <circle cx="40" cy="24" r="10" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="40" cy="24" r="4" fill={color} opacity="0.6" />
      <line x1="40" y1="34" x2="40" y2="56" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="40" cy="40" r="2.5" fill={color} opacity="0.8" />
      <path d="M32 24h-6M48 24h6" stroke={color} strokeWidth="1" opacity="0.3" strokeDasharray="2 2" />
    </svg>
  ),
  shoulder: (color) => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <circle cx="40" cy="20" r="6" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <line x1="40" y1="26" x2="40" y2="50" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="24" cy="34" r="3.5" fill={color} opacity="0.7" />
      <circle cx="56" cy="34" r="3.5" fill={color} opacity="0.7" />
      <path d="M24 34c4-6 12-8 16-8s12 2 16 8" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <line x1="24" y1="34" x2="18" y2="52" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="56" y1="34" x2="62" y2="52" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  ),
  back: (color) => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <path d="M40 12v56" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="40" cy="20" r="2.5" fill={color} opacity="0.5" />
      <circle cx="40" cy="32" r="3" fill={color} opacity="0.7" />
      <circle cx="40" cy="44" r="3.5" fill={color} opacity="0.8" />
      <circle cx="40" cy="56" r="3" fill={color} opacity="0.6" />
      <path d="M32 20c0 0-6 10-6 28" stroke={color} strokeWidth="1" opacity="0.25" />
      <path d="M48 20c0 0 6 10 6 28" stroke={color} strokeWidth="1" opacity="0.25" />
    </svg>
  ),
  core: (color) => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <rect x="24" y="20" width="32" height="40" rx="6" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <line x1="24" y1="34" x2="56" y2="34" stroke={color} strokeWidth="1" opacity="0.2" />
      <line x1="24" y1="46" x2="56" y2="46" stroke={color} strokeWidth="1" opacity="0.2" />
      <line x1="40" y1="20" x2="40" y2="60" stroke={color} strokeWidth="1" opacity="0.2" />
      <circle cx="40" cy="40" r="4" fill={color} opacity="0.6" />
      <circle cx="32" cy="34" r="2" fill={color} opacity="0.4" />
      <circle cx="48" cy="34" r="2" fill={color} opacity="0.4" />
    </svg>
  ),
  hip: (color) => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <ellipse cx="40" cy="30" rx="14" ry="8" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="30" cy="30" r="3" fill={color} opacity="0.7" />
      <circle cx="50" cy="30" r="3" fill={color} opacity="0.7" />
      <line x1="30" y1="38" x2="26" y2="62" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <line x1="50" y1="38" x2="54" y2="62" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="26" cy="50" r="2" fill={color} opacity="0.5" />
      <circle cx="54" cy="50" r="2" fill={color} opacity="0.5" />
    </svg>
  ),
  knee: (color) => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <line x1="40" y1="12" x2="40" y2="32" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <line x1="40" y1="48" x2="40" y2="68" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="40" cy="40" r="6" fill={color} opacity="0.15" />
      <circle cx="40" cy="40" r="6" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="40" r="2.5" fill={color} opacity="0.8" />
      <circle cx="40" cy="20" r="2" fill={color} opacity="0.4" />
      <circle cx="40" cy="60" r="2" fill={color} opacity="0.4" />
    </svg>
  ),
  ankle: (color) => (
    <svg viewBox="0 0 80 80" fill="none" className="w-full h-full">
      <line x1="40" y1="12" x2="40" y2="40" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="40" cy="44" r="5" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="40" cy="44" r="2.5" fill={color} opacity="0.8" />
      <path d="M34 52l-6 12h24l-6-12" stroke={color} strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="64" x2="56" y2="64" stroke={color} strokeWidth="1.5" opacity="0.3" />
      <circle cx="40" cy="26" r="2" fill={color} opacity="0.4" />
    </svg>
  ),
};

export default function ExerciseIllustration({
  exercise,
  size = 'md',
  showAnnotation = true,
  className = '',
}) {
  const regionColor = bodyRegionColors[exercise.bodyRegion] || bodyRegionColors.back;

  const sizeClasses = {
    sm: 'h-36',
    md: 'h-48 md:h-56',
    lg: 'h-56 md:h-64 lg:h-72',
  };

  // Licensed video
  if (exercise.media?.primaryUrl && exercise.media.type === 'video') {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-gray-900 ${sizeClasses[size]} ${className}`}>
        <video
          src={exercise.media.primaryUrl}
          loop muted playsInline autoPlay
          className="w-full h-full object-cover"
          aria-label={`Video demonstration of ${exercise.name}`}
        />
        {exercise.media.attribution && (
          <div className="absolute bottom-2 right-2 text-[10px] text-white/60 bg-black/30 px-2 py-0.5 rounded">
            {exercise.media.attribution}
          </div>
        )}
      </div>
    );
  }

  // Licensed image
  if (exercise.media?.primaryUrl && exercise.media.type === 'image') {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-gray-50 ${sizeClasses[size]} ${className}`}>
        <img
          src={exercise.media.primaryUrl}
          alt={`Demonstration of ${exercise.name}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    );
  }

  // Default: clean abstract visual with motion-capture aesthetic
  const getIcon = movementIcons[exercise.bodyRegion] || movementIcons.back;

  return (
    <div className={`relative overflow-hidden rounded-2xl ${sizeClasses[size]} ${className}`}
      style={{ background: `linear-gradient(135deg, #1E293B 0%, #0F172A 50%, #1E293B 100%)` }}
    >
      {/* Subtle grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `radial-gradient(circle, ${regionColor.accent} 1px, transparent 1px)`,
          backgroundSize: '24px 24px',
        }}
      />

      {/* Ambient glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-32 h-32 rounded-full blur-3xl opacity-15"
          style={{ backgroundColor: regionColor.accent }}
        />
      </div>

      {/* Motion capture icon */}
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <div className="w-24 h-24 md:w-28 md:h-28">
          {getIcon(regionColor.accent)}
        </div>
      </div>

      {/* Exercise info overlay */}
      {size !== 'sm' && (
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex flex-wrap gap-1.5">
            {exercise.targetMuscles.slice(0, size === 'md' ? 2 : 3).map((muscle, i) => (
              <span key={i} className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/10 text-white/70 backdrop-blur-sm">
                {muscle}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Region badge */}
      {size === 'sm' && (
        <div className="absolute top-2.5 right-2.5">
          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/10 text-white/50">
            {exercise.bodyRegion}
          </span>
        </div>
      )}
    </div>
  );
}
