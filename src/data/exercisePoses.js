/*
 * Maps each exercise's illustration key to AnatomicalFigure props.
 * This defines the pose, view, highlighted muscles, and annotation
 * for each exercise's visual representation.
 */

const exercisePoses = {
  chinTuck: {
    pose: 'standing',
    highlights: ['neck', 'deep-cervical-flexors', 'suboccipitals'],
    annotation: { label: 'Pull chin back', direction: 'posterior' },
  },
  neckStretch: {
    pose: 'standing',
    highlights: ['neck', 'upper-trapezius', 'levator-scapulae', 'scalenes'],
    annotation: { label: 'Tilt to side', direction: 'lateral' },
  },
  scapularSqueeze: {
    pose: 'standing',
    highlights: ['rhomboids', 'upper-back'],
    annotation: { label: 'Squeeze blades together', direction: 'medial' },
  },
  pecStretch: {
    pose: 'standing',
    highlights: ['pectorals', 'deltoid-l'],
    annotation: { label: 'Step through doorway', direction: 'anterior' },
  },
  wallAngel: {
    pose: 'standing',
    highlights: ['serratus-anterior', 'rotator-cuff', 'deltoid-l', 'deltoid-r'],
    annotation: { label: 'Slide arms up wall', direction: 'superior' },
  },
  catCow: {
    pose: 'quadruped',
    highlights: ['erector-spinae', 'core', 'multifidus'],
    annotation: { label: 'Arch & round spine', direction: 'vertical' },
  },
  pronePress: {
    pose: 'prone',
    highlights: ['erector-spinae', 'lower-back'],
    annotation: { label: 'Press upper body up', direction: 'superior' },
  },
  birdDog: {
    pose: 'quadruped',
    highlights: ['multifidus', 'transverse-abdominis', 'gluteus-maximus'],
    annotation: { label: 'Extend opposite limbs', direction: 'diagonal' },
  },
  deadBug: {
    pose: 'supine',
    highlights: ['transverse-abdominis', 'rectus-abdominis', 'diaphragm'],
    annotation: { label: 'Extend opposite limbs', direction: 'diagonal' },
  },
  gluteBridge: {
    pose: 'supine',
    highlights: ['gluteus-maximus', 'hamstrings', 'core'],
    annotation: { label: 'Lift hips up', direction: 'superior' },
  },
  clamshell: {
    pose: 'sidelying',
    highlights: ['gluteus-medius', 'gluteus-minimus'],
    annotation: { label: 'Open knee up', direction: 'superior' },
  },
  straightLegRaise: {
    pose: 'supine',
    highlights: ['quadriceps', 'hip-flexors', 'vmo'],
    annotation: { label: 'Lift straight leg', direction: 'superior' },
  },
  calfRaise: {
    pose: 'standing',
    highlights: ['gastrocnemius', 'soleus', 'calves'],
    annotation: { label: 'Rise onto toes', direction: 'superior' },
  },
  singleLegBalance: {
    pose: 'standing',
    highlights: ['ankle-stabilizers', 'gluteus-medius', 'core'],
    annotation: { label: 'Balance on one leg', direction: 'center' },
  },
  ankleAlphabet: {
    pose: 'seated',
    highlights: ['tibialis-anterior', 'peroneals', 'ankle-stabilizers'],
    annotation: { label: 'Trace letters with toe', direction: 'circular' },
  },
  threadNeedle: {
    pose: 'quadruped',
    highlights: ['erector-spinae', 'core'],
    annotation: { label: 'Rotate through spine', direction: 'rotational' },
  },
};

export default exercisePoses;
