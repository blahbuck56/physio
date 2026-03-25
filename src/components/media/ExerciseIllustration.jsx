import AnatomicalFigure from './AnatomicalFigure';
import exercisePoses from '../../data/exercisePoses';
import { bodyRegionColors } from '../../data/exercises';

/*
 * ExerciseIllustration — high-level media component for exercises.
 *
 * Rendering priority:
 * 1. Licensed video (media.type === 'video' && media.primaryUrl)
 * 2. Licensed image (media.type === 'image' && media.primaryUrl)
 * 3. Built-in anatomical SVG illustration (default)
 *
 * Props:
 *   exercise: exercise object from data
 *   size: 'sm' | 'md' | 'lg' — card thumbnail vs detail hero
 *   showAnnotation: boolean — show movement arrow/label overlay
 *   className: string
 */

export default function ExerciseIllustration({
  exercise,
  size = 'md',
  showAnnotation = true,
  className = '',
}) {
  const poseConfig = exercisePoses[exercise.illustration] || {
    pose: 'standing',
    highlights: [],
  };
  const regionColor = bodyRegionColors[exercise.bodyRegion] || bodyRegionColors.back;

  const sizeClasses = {
    sm: 'h-32',
    md: 'h-56 md:h-64',
    lg: 'h-64 md:h-80 lg:h-[28rem]',
  };

  // If licensed media exists, render it
  if (exercise.media?.primaryUrl && exercise.media.type === 'video') {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-gray-50 ${sizeClasses[size]} ${className}`}>
        <video
          src={exercise.media.primaryUrl}
          loop
          muted
          playsInline
          autoPlay
          className="w-full h-full object-cover"
          aria-label={`Video demonstration of ${exercise.name}`}
        />
        {showAnnotation && <AnnotationOverlay exercise={exercise} poseConfig={poseConfig} />}
        {exercise.media.attribution && (
          <div className="absolute bottom-2 right-2 text-[10px] text-white/60 bg-black/30 px-2 py-0.5 rounded">
            {exercise.media.attribution}
          </div>
        )}
      </div>
    );
  }

  if (exercise.media?.primaryUrl && exercise.media.type === 'image') {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-gray-50 ${sizeClasses[size]} ${className}`}>
        <img
          src={exercise.media.primaryUrl}
          alt={`Demonstration of ${exercise.name}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {showAnnotation && <AnnotationOverlay exercise={exercise} poseConfig={poseConfig} />}
      </div>
    );
  }

  // Default: anatomical SVG illustration
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-[#FAFAF8] to-[#F0EDE8] border border-[var(--color-border)] ${sizeClasses[size]} ${className}`}>
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <AnatomicalFigure
          pose={poseConfig.pose}
          highlights={poseConfig.highlights}
          bodyRegion={exercise.bodyRegion}
          className="h-full w-full max-w-[20rem]"
        />
      </div>

      {/* Muscle highlight labels */}
      {size !== 'sm' && (
        <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-1.5">
          {exercise.targetMuscles.slice(0, 3).map((muscle, i) => (
            <span
              key={i}
              className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${regionColor.bg} ${regionColor.text} border ${regionColor.border}`}
            >
              {muscle}
            </span>
          ))}
        </div>
      )}

      {/* Annotation overlay */}
      {showAnnotation && poseConfig.annotation && size !== 'sm' && (
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-sm border border-[var(--color-border)]">
            <ArrowIcon direction={poseConfig.annotation.direction} color={regionColor.accent} />
            <span className="text-xs font-medium text-[var(--color-text)]">
              {poseConfig.annotation.label}
            </span>
          </div>
        </div>
      )}

      {/* "Illustration" badge for transparency */}
      {size === 'lg' && (
        <div className="absolute top-3 left-3 text-[10px] text-[var(--color-text-muted)] bg-white/70 backdrop-blur-sm px-2 py-0.5 rounded-full">
          Illustration — licensed media placeholder
        </div>
      )}
    </div>
  );
}

function AnnotationOverlay({ exercise, poseConfig }) {
  if (!poseConfig.annotation) return null;
  return null; // Handled inline above
}

function ArrowIcon({ direction, color = '#059669' }) {
  const rotations = {
    superior: '0',
    posterior: '90',
    anterior: '-90',
    lateral: '90',
    medial: '-90',
    diagonal: '-45',
    vertical: '0',
    rotational: '0',
    circular: '0',
    center: '0',
  };
  const rotation = rotations[direction] || '0';

  if (direction === 'rotational' || direction === 'circular') {
    return (
      <svg viewBox="0 0 16 16" className="w-4 h-4" fill="none" stroke={color} strokeWidth="1.5">
        <path d="M8 2a6 6 0 105.3 3.2" strokeLinecap="round" />
        <path d="M12 2l1.3 3.2L10 4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 16 16" className="w-4 h-4" style={{ transform: `rotate(${rotation}deg)` }}>
      <path d="M8 12V4M5 7l3-3 3 3" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
