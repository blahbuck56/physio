/*
 * Visual sourcing metadata for each exercise.
 *
 * This defines the canonical movement, matching criteria, and media
 * assignment for each exercise in the library. It's the single source
 * of truth for what visual should be shown for each exercise.
 *
 * matchConfidence: 'high' | 'medium' | 'low'
 *   high   = exact exercise match from licensed source
 *   medium = close variation, acceptable for use
 *   low    = approximate only — prefer fallback illustration
 *
 * When matchConfidence is 'low' or media is missing, the system
 * automatically falls back to the built-in anatomical illustration.
 */

const visualSources = {
  'chin-tucks': {
    canonicalName: 'Chin Tuck / Cervical Retraction (Seated or Standing)',
    searchKeywords: ['chin tuck', 'cervical retraction', 'axial extension neck', 'deep neck flexor exercise'],
    bodyPosition: 'seated-upright',
    movementType: 'retraction',
    jointAction: 'upper cervical flexion + lower cervical extension',
    rangeOfMotion: 'small',
    tempo: 'slow-hold',
    media: {
      type: 'illustration', // 'video' | 'image' | 'photo-sequence' | 'illustration'
      primaryUrl: null, // INSERT: licensed physio video URL
      thumbnailUrl: null, // INSERT: mid-movement frame capture
      alternateAngles: [], // INSERT: [{ url, angle: 'lateral' }]
      matchConfidence: 'high', // exact movement match available from most libraries
      source: null, // e.g. 'Physiotec', 'MedBridge', 'HEP2Go'
      license: null, // e.g. 'commercial', 'editorial', 'CC-BY'
      verified: false, // true once a human confirms the visual matches
      needsReview: true,
      reviewNote: 'Awaiting licensed video — using built-in illustration',
    },
  },
  'neck-side-stretch': {
    canonicalName: 'Lateral Cervical Flexion Stretch (Seated)',
    searchKeywords: ['neck side bend stretch', 'upper trap stretch', 'lateral cervical flexion', 'scalene stretch seated'],
    bodyPosition: 'seated-upright',
    movementType: 'lateral-flexion',
    jointAction: 'cervical lateral flexion with optional overpressure',
    rangeOfMotion: 'moderate',
    tempo: 'static-hold',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Common in all libraries — high match expected' },
  },
  'scapular-squeezes': {
    canonicalName: 'Scapular Retraction / Squeeze (Standing or Seated)',
    searchKeywords: ['scapular retraction', 'scapular squeeze', 'shoulder blade squeeze', 'rhomboid activation'],
    bodyPosition: 'standing-upright',
    movementType: 'retraction',
    jointAction: 'scapular adduction + depression',
    rangeOfMotion: 'small',
    tempo: 'slow-hold',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Widely available — ensure posterior view included' },
  },
  'pec-doorway-stretch': {
    canonicalName: 'Pectoralis Doorway Stretch (Unilateral)',
    searchKeywords: ['pec doorway stretch', 'chest stretch doorframe', 'pectoralis major stretch', 'anterior shoulder stretch'],
    bodyPosition: 'standing-in-doorway',
    movementType: 'passive-stretch',
    jointAction: 'shoulder horizontal abduction + external rotation',
    rangeOfMotion: 'moderate',
    tempo: 'static-hold',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Requires doorway visible in frame' },
  },
  'wall-angels': {
    canonicalName: 'Wall Slide / Wall Angel',
    searchKeywords: ['wall angel', 'wall slide exercise', 'shoulder wall slide', 'scapular wall slide'],
    bodyPosition: 'standing-against-wall',
    movementType: 'active-range',
    jointAction: 'shoulder flexion/abduction with scapular upward rotation',
    rangeOfMotion: 'full',
    tempo: 'slow-controlled',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Side view best — shows wall contact' },
  },
  'cat-cow-stretch': {
    canonicalName: 'Cat-Cow / Spinal Flexion-Extension Mobilization (Quadruped)',
    searchKeywords: ['cat cow stretch', 'cat camel exercise', 'spinal flexion extension quadruped', 'lumbar mobilization'],
    bodyPosition: 'quadruped',
    movementType: 'rhythmic-mobilization',
    jointAction: 'full spine flexion (cat) and extension (cow)',
    rangeOfMotion: 'full',
    tempo: 'breath-paced',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Video preferred — shows both phases' },
  },
  'prone-press-up': {
    canonicalName: 'Prone Press-Up / McKenzie Extension',
    searchKeywords: ['prone press up', 'McKenzie extension', 'cobra exercise physio', 'lumbar extension prone'],
    bodyPosition: 'prone',
    movementType: 'active-extension',
    jointAction: 'lumbar extension with hips on floor',
    rangeOfMotion: 'moderate-to-full',
    tempo: 'slow-hold',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Ensure hips stay on floor in visual' },
  },
  'bird-dog': {
    canonicalName: 'Bird-Dog / Quadruped Contralateral Limb Extension',
    searchKeywords: ['bird dog exercise', 'quadruped arm leg raise', 'contralateral limb extension', 'McGill bird dog'],
    bodyPosition: 'quadruped',
    movementType: 'anti-extension-stability',
    jointAction: 'shoulder flexion + contralateral hip extension with neutral spine',
    rangeOfMotion: 'full',
    tempo: 'slow-hold',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Side view critical — shows level pelvis' },
  },
  'dead-bug': {
    canonicalName: 'Dead Bug (Supine Contralateral Limb Extension)',
    searchKeywords: ['dead bug exercise', 'supine core stability', 'contralateral reach supine', 'anti-extension core'],
    bodyPosition: 'supine',
    movementType: 'anti-extension-stability',
    jointAction: 'shoulder flexion + contralateral hip/knee extension maintaining lumbar neutral',
    rangeOfMotion: 'moderate',
    tempo: 'slow-controlled',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Overhead angle or side view — show back flat on floor' },
  },
  'glute-bridge': {
    canonicalName: 'Glute Bridge / Hip Bridge (Bilateral)',
    searchKeywords: ['glute bridge', 'hip bridge', 'supine hip extension', 'bilateral bridge exercise'],
    bodyPosition: 'supine-knees-bent',
    movementType: 'active-extension',
    jointAction: 'hip extension with knee flexion',
    rangeOfMotion: 'moderate',
    tempo: 'slow-hold',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Side view — show straight line from knees to shoulders at top' },
  },
  'clamshells': {
    canonicalName: 'Clamshell / Sidelying Hip External Rotation',
    searchKeywords: ['clamshell exercise', 'sidelying hip abduction', 'gluteus medius activation', 'hip external rotation sidelying'],
    bodyPosition: 'sidelying-knees-bent',
    movementType: 'active-rotation',
    jointAction: 'hip external rotation/abduction with pelvis stable',
    rangeOfMotion: 'moderate',
    tempo: 'slow-controlled',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Front-facing view shows knee opening clearly' },
  },
  'straight-leg-raise': {
    canonicalName: 'Supine Straight Leg Raise (Quad Strengthening)',
    searchKeywords: ['straight leg raise', 'SLR quad', 'supine leg lift', 'VMO activation supine'],
    bodyPosition: 'supine',
    movementType: 'active-flexion',
    jointAction: 'hip flexion with knee extended (quad isometric)',
    rangeOfMotion: 'moderate',
    tempo: 'slow-hold',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Side view — show straight working leg at 45° angle' },
  },
  'standing-calf-raises': {
    canonicalName: 'Standing Bilateral Calf Raise',
    searchKeywords: ['calf raise standing', 'heel raise bilateral', 'gastrocnemius exercise', 'plantar flexion standing'],
    bodyPosition: 'standing-upright',
    movementType: 'active-plantar-flexion',
    jointAction: 'ankle plantar flexion (bilateral)',
    rangeOfMotion: 'full',
    tempo: 'slow-eccentric',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Rear or side view — shows full ankle ROM' },
  },
  'single-leg-balance': {
    canonicalName: 'Single Leg Stance / Unipedal Balance',
    searchKeywords: ['single leg balance', 'unipedal stance', 'proprioception balance exercise', 'one leg stand'],
    bodyPosition: 'standing-single-leg',
    movementType: 'static-balance',
    jointAction: 'isometric ankle/hip stabilization',
    rangeOfMotion: 'none',
    tempo: 'static-hold',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Front or side view — show near wall for safety' },
  },
  'ankle-alphabet': {
    canonicalName: 'Ankle Alphabet / Multi-Directional Ankle AROM',
    searchKeywords: ['ankle alphabet exercise', 'ankle range of motion', 'ankle circles physio', 'ankle AROM seated'],
    bodyPosition: 'seated-leg-extended',
    movementType: 'active-multi-directional',
    jointAction: 'ankle dorsiflexion / plantar flexion / inversion / eversion',
    rangeOfMotion: 'full',
    tempo: 'slow-continuous',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'medium', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Challenging to visualize in static — video strongly preferred' },
  },
  'thread-the-needle': {
    canonicalName: 'Thread the Needle / Quadruped Thoracic Rotation',
    searchKeywords: ['thread the needle stretch', 'thoracic rotation quadruped', 'open book stretch', 'upper back rotation'],
    bodyPosition: 'quadruped',
    movementType: 'active-rotation',
    jointAction: 'thoracic rotation with lumbar/pelvis stabilized',
    rangeOfMotion: 'moderate-to-full',
    tempo: 'slow-hold',
    media: { type: 'illustration', primaryUrl: null, thumbnailUrl: null, alternateAngles: [], matchConfidence: 'high', source: null, license: null, verified: false, needsReview: true, reviewNote: 'Front-angle view showing thread-through and reach-up phases' },
  },
};

/*
 * Resolves the best available media for an exercise.
 * Priority: licensed video > licensed image > built-in illustration
 * Falls back gracefully if matchConfidence is 'low' or URL is missing.
 */
export function resolveExerciseMedia(exercise) {
  const source = visualSources[exercise.slug];
  if (!source) {
    return { type: 'illustration', url: null, confidence: 'high', useFallback: true };
  }

  const { media } = source;

  // If we have a licensed URL and confidence is acceptable
  if (media.primaryUrl && media.matchConfidence !== 'low') {
    return {
      type: media.type,
      url: media.primaryUrl,
      thumbnailUrl: media.thumbnailUrl,
      alternateAngles: media.alternateAngles,
      confidence: media.matchConfidence,
      attribution: media.source,
      license: media.license,
      useFallback: false,
    };
  }

  // Fallback to built-in illustration
  return {
    type: 'illustration',
    url: null,
    confidence: media.matchConfidence || 'high',
    useFallback: true,
    needsReview: media.needsReview,
    reviewNote: media.reviewNote,
  };
}

/*
 * Returns all exercises that need visual review (matchConfidence < 'high' or not verified).
 */
export function getExercisesNeedingReview() {
  return Object.entries(visualSources)
    .filter(([, src]) => !src.media.verified || src.media.matchConfidence !== 'high')
    .map(([slug, src]) => ({
      slug,
      canonicalName: src.canonicalName,
      confidence: src.media.matchConfidence,
      note: src.media.reviewNote,
    }));
}

export default visualSources;
