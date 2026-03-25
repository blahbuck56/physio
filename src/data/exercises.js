const exercises = [
  {
    id: 1,
    name: "Chin Tucks",
    category: "neck",
    difficulty: "beginner",
    duration: 30,
    reps: "10 reps",
    sets: 3,
    purpose: "Corrects forward head posture",
    description: "Strengthens deep neck flexors and corrects forward head posture.",
    steps: [
      "Sit or stand tall with your back straight",
      "Gently pull your chin straight back",
      "Create a \"double chin\" feeling",
      "Hold for 3 seconds",
      "Slowly release forward"
    ],
    targetMuscles: ["Deep cervical flexors", "Suboccipitals"],
    commonMistakes: ["Tilting head down instead of retracting", "Jutting jaw forward"],
    evidenceNote: "Supported by research for cervicogenic headache and neck pain (Jull et al., 2002).",
    regression: "Perform lying down with head on pillow",
    animation: "chinTuck"
  },
  {
    id: 2,
    name: "Neck Side Stretch",
    category: "neck",
    difficulty: "beginner",
    duration: 30,
    reps: "3 each side",
    sets: 2,
    purpose: "Releases neck and upper trap tension",
    description: "Gently stretches the side of the neck to relieve tension headaches and stiffness.",
    steps: [
      "Sit tall in a chair",
      "Tilt your right ear toward your right shoulder",
      "Use your right hand to gently add pressure",
      "Hold for 15 seconds",
      "Switch to the other side"
    ],
    targetMuscles: ["Upper trapezius", "Levator scapulae", "Scalenes"],
    commonMistakes: ["Raising the shoulder instead of tilting the head", "Pulling too aggressively"],
    evidenceNote: "Effective for tension-type headache relief and cervical mobility.",
    regression: "Skip the hand pressure — just tilt gently",
    animation: "neckStretch"
  },
  {
    id: 3,
    name: "Scapular Squeezes",
    category: "shoulder",
    difficulty: "beginner",
    duration: 5,
    reps: "15 reps",
    sets: 3,
    purpose: "Improves shoulder blade stability",
    description: "Activates mid and lower trapezius to improve shoulder blade stability.",
    steps: [
      "Sit or stand with arms at your sides",
      "Squeeze shoulder blades together",
      "Pull them slightly downward",
      "Hold for 5 seconds",
      "Slowly release"
    ],
    targetMuscles: ["Mid trapezius", "Rhomboids", "Lower trapezius"],
    commonMistakes: ["Shrugging shoulders toward ears", "Arching the lower back"],
    evidenceNote: "Key component of postural correction programs for upper crossed syndrome.",
    regression: "Reduce hold time to 2 seconds",
    animation: "scapularSqueeze"
  },
  {
    id: 4,
    name: "Pec Doorway Stretch",
    category: "shoulder",
    difficulty: "beginner",
    duration: 30,
    reps: "3 each side",
    sets: 2,
    purpose: "Opens up a tight chest",
    description: "Stretches the pectoralis major and minor to counteract rounded shoulders.",
    steps: [
      "Stand in an open doorway",
      "Place your arm on the door frame at 90°",
      "Step forward with the same-side foot",
      "Feel the stretch across your chest",
      "Hold for 30 seconds, breathe deeply"
    ],
    targetMuscles: ["Pectoralis major", "Pectoralis minor", "Anterior deltoid"],
    commonMistakes: ["Arching the back to compensate", "Placing arm too high or too low"],
    evidenceNote: "Recommended for anterior shoulder tightness in postural correction programs.",
    regression: "Stand closer to the doorway for a lighter stretch",
    animation: "pecStretch"
  },
  {
    id: 5,
    name: "Wall Angels",
    category: "shoulder",
    difficulty: "intermediate",
    duration: 3,
    reps: "10 reps",
    sets: 3,
    purpose: "Restores overhead shoulder mobility",
    description: "Improves shoulder mobility and thoracic extension against a wall.",
    steps: [
      "Stand with your back flat against a wall",
      "Place arms in a goalpost position",
      "Keep your back and arms touching the wall",
      "Slowly slide arms up overhead",
      "Slide back down to start"
    ],
    targetMuscles: ["Serratus anterior", "Lower trapezius", "Rotator cuff"],
    commonMistakes: ["Arching lower back off the wall", "Losing arm contact with wall"],
    evidenceNote: "Effective for overhead athletes and desk workers with limited shoulder mobility.",
    regression: "Only raise arms halfway up",
    animation: "wallAngel"
  },
  {
    id: 6,
    name: "Cat-Cow Stretch",
    category: "back",
    difficulty: "beginner",
    duration: 3,
    reps: "10 cycles",
    sets: 2,
    purpose: "Loosens up the entire spine",
    description: "Mobilizes the entire spine through flexion and extension.",
    steps: [
      "Get on hands and knees",
      "Inhale: drop belly, lift chest (Cow)",
      "Exhale: round your back, tuck chin (Cat)",
      "Move slowly with your breath",
      "Repeat the flow"
    ],
    targetMuscles: ["Erector spinae", "Rectus abdominis", "Multifidus"],
    commonMistakes: ["Moving too quickly", "Only bending at the hips"],
    evidenceNote: "Widely used in yoga therapy and clinical rehab for spinal mobility (Cramer et al., 2013).",
    regression: "Reduce range of motion — smaller movements",
    animation: "catCow"
  },
  {
    id: 7,
    name: "Prone Press-Up",
    category: "back",
    difficulty: "beginner",
    duration: 3,
    reps: "10 reps",
    sets: 3,
    purpose: "Relieves lower back stiffness",
    description: "Promotes lumbar extension to centralize discogenic pain.",
    steps: [
      "Lie face down on the floor",
      "Place hands under your shoulders",
      "Press your upper body up slowly",
      "Keep hips on the floor",
      "Hold briefly, then lower down"
    ],
    targetMuscles: ["Erector spinae", "Lumbar extensors"],
    commonMistakes: ["Lifting hips off the floor", "Pushing through pain that radiates"],
    evidenceNote: "Core of the McKenzie method — strong evidence for disc-related LBP.",
    regression: "Only press up onto your elbows (sphinx pose)",
    animation: "pronePress"
  },
  {
    id: 8,
    name: "Bird-Dog",
    category: "back",
    difficulty: "intermediate",
    duration: 5,
    reps: "10 each side",
    sets: 3,
    purpose: "Builds core stability and balance",
    description: "Trains core stability and spinal control through contralateral limb movement.",
    steps: [
      "Start on hands and knees",
      "Brace your core gently",
      "Extend right arm and left leg out",
      "Hold for 5 seconds, stay level",
      "Switch to the other side"
    ],
    targetMuscles: ["Multifidus", "Transverse abdominis", "Gluteus maximus"],
    commonMistakes: ["Rotating hips when extending leg", "Losing neutral spine"],
    evidenceNote: "Core exercise validated by McGill (2007) for low back pain rehabilitation.",
    regression: "Only extend one limb at a time",
    animation: "birdDog"
  },
  {
    id: 9,
    name: "Dead Bug",
    category: "core",
    difficulty: "intermediate",
    duration: 3,
    reps: "8 each side",
    sets: 3,
    purpose: "Strengthens deep core muscles",
    description: "Builds deep core stability while maintaining a neutral lumbar spine.",
    steps: [
      "Lie on your back, arms up, knees at 90°",
      "Press lower back into the floor",
      "Extend right arm and left leg out",
      "Don't let your back arch",
      "Return and switch sides"
    ],
    targetMuscles: ["Transverse abdominis", "Rectus abdominis", "Diaphragm"],
    commonMistakes: ["Lower back arching off the floor", "Moving too fast"],
    evidenceNote: "Recommended for motor control retraining in chronic low back pain.",
    regression: "Only extend the legs, keep arms still",
    animation: "deadBug"
  },
  {
    id: 10,
    name: "Glute Bridge",
    category: "hip",
    difficulty: "beginner",
    duration: 3,
    reps: "12 reps",
    sets: 3,
    purpose: "Activates glutes for hip support",
    description: "Activates glutes and hamstrings while teaching hip extension control.",
    steps: [
      "Lie on your back, knees bent, feet flat",
      "Push through your heels",
      "Lift hips toward the ceiling",
      "Squeeze glutes at the top for 3 seconds",
      "Lower slowly back down"
    ],
    targetMuscles: ["Gluteus maximus", "Hamstrings", "Core stabilizers"],
    commonMistakes: ["Arching the lower back at the top", "Pushing through toes"],
    evidenceNote: "Foundational exercise in ACL rehab and hip strengthening protocols.",
    regression: "Reduce hold time and range of motion",
    animation: "gluteBridge"
  },
  {
    id: 11,
    name: "Clamshells",
    category: "hip",
    difficulty: "beginner",
    duration: 2,
    reps: "15 each side",
    sets: 3,
    purpose: "Strengthens hip stabilizers",
    description: "Isolates the gluteus medius for hip stability and knee alignment.",
    steps: [
      "Lie on your side, knees bent 45°",
      "Keep your feet together",
      "Lift your top knee up like a clamshell",
      "Don't let your pelvis roll backward",
      "Lower slowly and repeat"
    ],
    targetMuscles: ["Gluteus medius", "Gluteus minimus", "Deep hip rotators"],
    commonMistakes: ["Rolling pelvis backward", "Using momentum"],
    evidenceNote: "High gluteus medius activation confirmed by EMG studies (Distefano et al., 2009).",
    regression: "Reduce range — don't lift as high",
    animation: "clamshell"
  },
  {
    id: 12,
    name: "Straight Leg Raise",
    category: "knee",
    difficulty: "beginner",
    duration: 3,
    reps: "10 each leg",
    sets: 3,
    purpose: "Strengthens quads without bending the knee",
    description: "Strengthens the quadriceps without bending the knee — ideal post-surgery.",
    steps: [
      "Lie on your back, one knee bent",
      "Keep the other leg straight",
      "Tighten the thigh muscle",
      "Lift the straight leg up",
      "Hold 3 seconds, then lower slowly"
    ],
    targetMuscles: ["Quadriceps (VMO)", "Hip flexors"],
    commonMistakes: ["Bending the working knee", "Lifting too high"],
    evidenceNote: "Staple exercise in post-operative knee rehab (ACL, meniscus, TKR).",
    regression: "Just tighten the quad without lifting",
    animation: "straightLegRaise"
  },
  {
    id: 13,
    name: "Standing Calf Raises",
    category: "knee",
    difficulty: "beginner",
    duration: 2,
    reps: "15 reps",
    sets: 3,
    purpose: "Builds lower leg strength",
    description: "Strengthens the gastrocnemius and soleus for ankle stability.",
    steps: [
      "Stand with feet hip-width apart",
      "Hold a wall for balance",
      "Rise up onto your toes",
      "Hold at the top for 2 seconds",
      "Lower slowly back down"
    ],
    targetMuscles: ["Gastrocnemius", "Soleus"],
    commonMistakes: ["Rising too quickly", "Not reaching full height"],
    evidenceNote: "Eccentric calf raises are gold-standard for Achilles tendinopathy.",
    regression: "Use both hands on the wall for extra support",
    animation: "calfRaise"
  },
  {
    id: 14,
    name: "Single Leg Balance",
    category: "ankle",
    difficulty: "beginner",
    duration: 30,
    reps: "3 each leg",
    sets: 2,
    purpose: "Improves balance and prevents re-injury",
    description: "Trains proprioception and balance for injury prevention.",
    steps: [
      "Stand near a wall for safety",
      "Lift one foot off the ground",
      "Keep standing knee slightly bent",
      "Focus on a fixed point ahead",
      "Hold for 30 seconds"
    ],
    targetMuscles: ["Ankle stabilizers", "Hip abductors", "Core"],
    commonMistakes: ["Locking the standing knee", "Looking at the floor"],
    evidenceNote: "Proprioceptive training reduces ankle sprain recurrence by 50% (Verhagen et al., 2004).",
    regression: "Keep fingertips on the wall",
    animation: "singleLegBalance"
  },
  {
    id: 15,
    name: "Ankle Alphabet",
    category: "ankle",
    difficulty: "beginner",
    duration: 120,
    reps: "A-Z each foot",
    sets: 1,
    purpose: "Restores full ankle range of motion",
    description: "Improves ankle range of motion in all planes of movement.",
    steps: [
      "Sit with your leg extended",
      "Point your big toe forward",
      "Trace each letter of the alphabet",
      "Move only your ankle, not your leg",
      "Go slowly through A to Z"
    ],
    targetMuscles: ["Tibialis anterior", "Peroneals", "Ankle joint capsule"],
    commonMistakes: ["Moving the whole leg", "Rushing through letters"],
    evidenceNote: "Common early-stage exercise in ankle sprain rehabilitation protocols.",
    regression: "Just trace A through M if fatigued",
    animation: "ankleAlphabet"
  },
  {
    id: 16,
    name: "Thread the Needle",
    category: "back",
    difficulty: "beginner",
    duration: 3,
    reps: "10 each side",
    sets: 2,
    purpose: "Unlocks mid-back rotation",
    description: "Improves thoracic spine rotation and reduces mid-back stiffness.",
    steps: [
      "Start on hands and knees",
      "Reach right arm under your body to the left",
      "Let your shoulder rest on the floor",
      "Hold the stretch briefly",
      "Reverse and reach arm to the ceiling"
    ],
    targetMuscles: ["Thoracic rotators", "Obliques", "Rhomboids"],
    commonMistakes: ["Shifting weight instead of rotating", "Moving too quickly"],
    evidenceNote: "Effective for thoracic mobility deficits common in desk workers.",
    regression: "Skip the overhead reach — just do the thread",
    animation: "threadNeedle"
  }
];

export const injuryAreas = [
  { id: "neck", label: "Neck & Head", icon: "neck", description: "Headaches, stiffness, forward head posture" },
  { id: "shoulder", label: "Shoulder", icon: "shoulder", description: "Frozen shoulder, rotator cuff, posture" },
  { id: "back", label: "Back", icon: "back", description: "Lower back pain, sciatica, disc issues" },
  { id: "core", label: "Core", icon: "core", description: "Weak core, post-surgery stability" },
  { id: "hip", label: "Hip", icon: "hip", description: "Hip pain, bursitis, weak glutes" },
  { id: "knee", label: "Knee", icon: "knee", description: "ACL recovery, arthritis, patellar pain" },
  { id: "ankle", label: "Ankle & Foot", icon: "ankle", description: "Sprains, plantar fasciitis, instability" }
];

export const plans = {
  neck: {
    name: "Neck Recovery",
    weeks: [
      { week: 1, name: "Gentle Mobilization", exerciseIds: [1, 2], difficulty: "beginner" },
      { week: 2, name: "Building Stability", exerciseIds: [1, 2, 3], difficulty: "beginner" },
      { week: 3, name: "Strengthening", exerciseIds: [1, 2, 3, 6], difficulty: "beginner" },
      { week: 4, name: "Full Integration", exerciseIds: [1, 2, 3, 6, 16], difficulty: "intermediate" }
    ]
  },
  shoulder: {
    name: "Shoulder Rehab",
    weeks: [
      { week: 1, name: "Pain Relief", exerciseIds: [3, 4], difficulty: "beginner" },
      { week: 2, name: "Mobility Focus", exerciseIds: [3, 4, 5], difficulty: "beginner" },
      { week: 3, name: "Stability Training", exerciseIds: [3, 4, 5, 6], difficulty: "intermediate" },
      { week: 4, name: "Strength Building", exerciseIds: [3, 4, 5, 6, 8], difficulty: "intermediate" }
    ]
  },
  back: {
    name: "Back Pain Program",
    weeks: [
      { week: 1, name: "Gentle Movement", exerciseIds: [6, 7], difficulty: "beginner" },
      { week: 2, name: "Core Activation", exerciseIds: [6, 7, 16], difficulty: "beginner" },
      { week: 3, name: "Stability Phase", exerciseIds: [6, 7, 8, 16], difficulty: "intermediate" },
      { week: 4, name: "Full Recovery", exerciseIds: [6, 7, 8, 9, 16], difficulty: "intermediate" }
    ]
  },
  core: {
    name: "Core Strengthening",
    weeks: [
      { week: 1, name: "Foundation", exerciseIds: [6, 10], difficulty: "beginner" },
      { week: 2, name: "Activation", exerciseIds: [6, 9, 10], difficulty: "beginner" },
      { week: 3, name: "Building Power", exerciseIds: [6, 8, 9, 10], difficulty: "intermediate" },
      { week: 4, name: "Full Core Circuit", exerciseIds: [6, 8, 9, 10, 7], difficulty: "intermediate" }
    ]
  },
  hip: {
    name: "Hip Recovery",
    weeks: [
      { week: 1, name: "Gentle Activation", exerciseIds: [10, 11], difficulty: "beginner" },
      { week: 2, name: "Mobility Work", exerciseIds: [10, 11, 6], difficulty: "beginner" },
      { week: 3, name: "Strengthening", exerciseIds: [10, 11, 6, 12], difficulty: "intermediate" },
      { week: 4, name: "Functional Recovery", exerciseIds: [10, 11, 6, 12, 8], difficulty: "intermediate" }
    ]
  },
  knee: {
    name: "Knee Rehab",
    weeks: [
      { week: 1, name: "Quad Activation", exerciseIds: [12, 13], difficulty: "beginner" },
      { week: 2, name: "Range of Motion", exerciseIds: [12, 13, 10], difficulty: "beginner" },
      { week: 3, name: "Stability Focus", exerciseIds: [12, 13, 10, 11], difficulty: "intermediate" },
      { week: 4, name: "Return to Function", exerciseIds: [12, 13, 10, 11, 14], difficulty: "intermediate" }
    ]
  },
  ankle: {
    name: "Ankle Recovery",
    weeks: [
      { week: 1, name: "Range of Motion", exerciseIds: [15, 14], difficulty: "beginner" },
      { week: 2, name: "Balance Training", exerciseIds: [15, 14, 13], difficulty: "beginner" },
      { week: 3, name: "Strength Phase", exerciseIds: [15, 14, 13, 10], difficulty: "intermediate" },
      { week: 4, name: "Full Recovery", exerciseIds: [15, 14, 13, 10, 11], difficulty: "intermediate" }
    ]
  }
};

export function getExerciseById(id) {
  return exercises.find(e => e.id === id);
}

export function getPlanExercises(injuryArea, week) {
  const plan = plans[injuryArea];
  if (!plan) return [];
  const weekPlan = plan.weeks.find(w => w.week === week) || plan.weeks[0];
  return weekPlan.exerciseIds.map(id => getExerciseById(id)).filter(Boolean);
}

export function getWeekPlan(injuryArea, week) {
  const plan = plans[injuryArea];
  if (!plan) return null;
  return plan.weeks.find(w => w.week === week) || plan.weeks[0];
}

export default exercises;
