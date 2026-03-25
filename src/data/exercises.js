const exercises = [
  {
    id: 1,
    name: "Chin Tucks",
    category: "neck",
    difficulty: "beginner",
    duration: "30s hold",
    reps: "10 reps x 3 sets",
    description: "Strengthens deep neck flexors and corrects forward head posture.",
    instructions: [
      "Sit or stand with your back straight",
      "Gently draw your chin straight back, creating a double chin",
      "Hold for 3 seconds, feeling a stretch at the base of your skull",
      "Return to starting position",
      "Keep your eyes level — don't tilt your head up or down"
    ],
    targetMuscles: ["Deep cervical flexors", "Suboccipitals"],
    commonMistakes: ["Tilting head down instead of retracting", "Jutting jaw forward"],
    evidenceNote: "Supported by research for cervicogenic headache and neck pain (Jull et al., 2002)."
  },
  {
    id: 2,
    name: "Scapular Squeezes",
    category: "shoulder",
    difficulty: "beginner",
    duration: "5s hold",
    reps: "15 reps x 3 sets",
    description: "Activates mid and lower trapezius to improve shoulder blade stability.",
    instructions: [
      "Sit or stand with arms at your sides",
      "Squeeze your shoulder blades together and slightly down",
      "Hold for 5 seconds",
      "Slowly release back to the starting position",
      "Avoid shrugging your shoulders upward"
    ],
    targetMuscles: ["Mid trapezius", "Rhomboids", "Lower trapezius"],
    commonMistakes: ["Shrugging shoulders toward ears", "Arching the lower back"],
    evidenceNote: "Key component of postural correction programs for upper crossed syndrome."
  },
  {
    id: 3,
    name: "Wall Angels",
    category: "shoulder",
    difficulty: "intermediate",
    duration: "2s per rep",
    reps: "10 reps x 3 sets",
    description: "Improves shoulder mobility and thoracic extension against a wall.",
    instructions: [
      "Stand with your back flat against a wall, feet 6 inches from the wall",
      "Press your lower back, upper back, and head against the wall",
      "Place arms in a 'goalpost' position (elbows at 90°) against the wall",
      "Slowly slide your arms up overhead, keeping contact with the wall",
      "Slide back down to the starting position"
    ],
    targetMuscles: ["Serratus anterior", "Lower trapezius", "Rotator cuff"],
    commonMistakes: ["Arching lower back off the wall", "Losing arm contact with wall"],
    evidenceNote: "Effective for overhead athletes and desk workers with limited shoulder mobility."
  },
  {
    id: 4,
    name: "Cat-Cow Stretch",
    category: "back",
    difficulty: "beginner",
    duration: "3s each position",
    reps: "10 cycles x 2 sets",
    description: "Mobilizes the entire spine through flexion and extension.",
    instructions: [
      "Start on hands and knees, wrists under shoulders, knees under hips",
      "Inhale: drop your belly, lift your chest and tailbone (Cow)",
      "Exhale: round your spine, tuck your chin and pelvis (Cat)",
      "Move slowly and rhythmically with your breath",
      "Focus on moving one vertebra at a time"
    ],
    targetMuscles: ["Erector spinae", "Rectus abdominis", "Multifidus"],
    commonMistakes: ["Moving too quickly", "Only moving at hips instead of segmentally"],
    evidenceNote: "Widely used in yoga therapy and clinical rehab for spinal mobility (Cramer et al., 2013)."
  },
  {
    id: 5,
    name: "Bird-Dog",
    category: "back",
    difficulty: "intermediate",
    duration: "5s hold",
    reps: "10 reps each side x 3 sets",
    description: "Trains core stability and spinal control through contralateral limb movement.",
    instructions: [
      "Start on hands and knees in a neutral spine position",
      "Brace your core gently (think about tightening a belt)",
      "Simultaneously extend your right arm forward and left leg back",
      "Hold for 5 seconds, keeping hips level",
      "Return to start and repeat on the opposite side"
    ],
    targetMuscles: ["Multifidus", "Transverse abdominis", "Gluteus maximus", "Erector spinae"],
    commonMistakes: ["Rotating hips when extending leg", "Losing neutral spine"],
    evidenceNote: "Core exercise validated by McGill (2007) for low back pain rehabilitation."
  },
  {
    id: 6,
    name: "Dead Bug",
    category: "core",
    difficulty: "intermediate",
    duration: "3s per rep",
    reps: "8 reps each side x 3 sets",
    description: "Builds deep core stability while maintaining a neutral lumbar spine.",
    instructions: [
      "Lie on your back, arms pointing to the ceiling, knees at 90°",
      "Press your lower back firmly into the floor",
      "Slowly extend your right arm overhead and left leg out straight",
      "Return to start position without letting your back arch",
      "Repeat on the opposite side"
    ],
    targetMuscles: ["Transverse abdominis", "Rectus abdominis", "Diaphragm"],
    commonMistakes: ["Lower back arching off the floor", "Moving too fast"],
    evidenceNote: "Recommended for motor control retraining in chronic low back pain."
  },
  {
    id: 7,
    name: "Clamshells",
    category: "hip",
    difficulty: "beginner",
    duration: "2s hold",
    reps: "15 reps each side x 3 sets",
    description: "Isolates the gluteus medius for hip stability and knee alignment.",
    instructions: [
      "Lie on your side with knees bent to 45° and feet together",
      "Keep your pelvis stable — don't roll backward",
      "Lift your top knee as high as you can without moving your pelvis",
      "Hold briefly at the top, then slowly lower",
      "Add a resistance band above the knees for progression"
    ],
    targetMuscles: ["Gluteus medius", "Gluteus minimus", "Deep hip rotators"],
    commonMistakes: ["Rolling pelvis backward", "Using momentum instead of control"],
    evidenceNote: "High gluteus medius activation confirmed by EMG studies (Distefano et al., 2009)."
  },
  {
    id: 8,
    name: "Glute Bridge",
    category: "hip",
    difficulty: "beginner",
    duration: "3s hold",
    reps: "12 reps x 3 sets",
    description: "Activates glutes and hamstrings while teaching hip extension control.",
    instructions: [
      "Lie on your back with knees bent, feet flat and hip-width apart",
      "Push through your heels to lift your hips toward the ceiling",
      "Squeeze your glutes at the top, forming a straight line from knees to shoulders",
      "Hold for 3 seconds",
      "Lower slowly back to the starting position"
    ],
    targetMuscles: ["Gluteus maximus", "Hamstrings", "Core stabilizers"],
    commonMistakes: ["Hyperextending the lower back at the top", "Pushing through toes instead of heels"],
    evidenceNote: "Foundational exercise in ACL rehab and hip strengthening protocols."
  },
  {
    id: 9,
    name: "Standing Calf Raises",
    category: "knee",
    difficulty: "beginner",
    duration: "2s hold",
    reps: "15 reps x 3 sets",
    description: "Strengthens the gastrocnemius and soleus for ankle stability.",
    instructions: [
      "Stand with feet hip-width apart, holding a wall for balance",
      "Rise up onto your toes as high as possible",
      "Hold at the top for 2 seconds",
      "Lower slowly back down with control",
      "For progression: perform on one leg at a time"
    ],
    targetMuscles: ["Gastrocnemius", "Soleus"],
    commonMistakes: ["Rising too quickly", "Not achieving full range of motion"],
    evidenceNote: "Eccentric calf raises are gold-standard for Achilles tendinopathy (Alfredson protocol)."
  },
  {
    id: 10,
    name: "Straight Leg Raise",
    category: "knee",
    difficulty: "beginner",
    duration: "3s hold",
    reps: "10 reps each leg x 3 sets",
    description: "Strengthens the quadriceps without bending the knee — ideal post-surgery.",
    instructions: [
      "Lie on your back with one knee bent, foot flat on the floor",
      "Keep the other leg straight and tighten the quad muscle",
      "Lift the straight leg to the height of the bent knee",
      "Hold for 3 seconds at the top",
      "Lower slowly and repeat"
    ],
    targetMuscles: ["Quadriceps (especially VMO)", "Hip flexors"],
    commonMistakes: ["Bending the knee of the working leg", "Lifting too high"],
    evidenceNote: "Staple exercise in post-operative knee rehab (ACL, meniscus, TKR)."
  },
  {
    id: 11,
    name: "Towel Scrunches",
    category: "ankle",
    difficulty: "beginner",
    duration: "30s",
    reps: "3 sets each foot",
    description: "Strengthens intrinsic foot muscles for arch support and balance.",
    instructions: [
      "Sit in a chair with a towel flat on the floor under your foot",
      "Use your toes to scrunch the towel toward you",
      "Spread the towel back out and repeat",
      "Keep your heel planted on the ground throughout",
      "Progress by placing a small weight on the towel"
    ],
    targetMuscles: ["Intrinsic foot muscles", "Flexor digitorum brevis", "Flexor hallucis brevis"],
    commonMistakes: ["Lifting the heel", "Using the whole foot instead of just the toes"],
    evidenceNote: "Shown to improve arch height and reduce plantar fasciitis symptoms."
  },
  {
    id: 12,
    name: "Ankle Alphabet",
    category: "ankle",
    difficulty: "beginner",
    duration: "2 min",
    reps: "1-2 sets each foot",
    description: "Improves ankle range of motion in all planes of movement.",
    instructions: [
      "Sit with your leg extended or cross your ankle over the opposite knee",
      "Using your big toe as a pointer, trace each letter of the alphabet",
      "Move only your ankle — keep your leg still",
      "Go through A to Z in capital letters",
      "Perform slowly and with full range of motion"
    ],
    targetMuscles: ["Tibialis anterior", "Peroneals", "Ankle joint capsule"],
    commonMistakes: ["Moving the entire leg instead of just the ankle", "Rushing through letters"],
    evidenceNote: "Common early-stage exercise in ankle sprain rehabilitation protocols."
  },
  {
    id: 13,
    name: "Pec Doorway Stretch",
    category: "shoulder",
    difficulty: "beginner",
    duration: "30s hold",
    reps: "3 reps each side",
    description: "Stretches the pectoralis major and minor to counteract rounded shoulders.",
    instructions: [
      "Stand in a doorway with your arm bent at 90° against the frame",
      "Step through with the same-side foot until you feel a chest stretch",
      "Keep your core engaged — don't arch your lower back",
      "Hold for 30 seconds, breathing deeply",
      "Adjust arm height to target different pec fibers"
    ],
    targetMuscles: ["Pectoralis major", "Pectoralis minor", "Anterior deltoid"],
    commonMistakes: ["Arching the back to compensate", "Placing arm too high or too low"],
    evidenceNote: "Recommended for anterior shoulder tightness in postural correction programs."
  },
  {
    id: 14,
    name: "Prone Press-Up (McKenzie)",
    category: "back",
    difficulty: "beginner",
    duration: "3s hold at top",
    reps: "10 reps x 3 sets",
    description: "Promotes lumbar extension to centralize discogenic pain.",
    instructions: [
      "Lie face down with hands placed under your shoulders",
      "Slowly press your upper body up, straightening your arms",
      "Keep your hips and pelvis on the floor",
      "Hold briefly at the top, then lower back down",
      "Stop if pain moves further down the leg (peripheralizes)"
    ],
    targetMuscles: ["Erector spinae", "Lumbar extensors"],
    commonMistakes: ["Lifting hips off the floor", "Pushing through pain that radiates further"],
    evidenceNote: "Core of the McKenzie method — strong evidence for disc-related LBP (McKenzie & May, 2003)."
  },
  {
    id: 15,
    name: "Single Leg Balance",
    category: "ankle",
    difficulty: "beginner",
    duration: "30s hold",
    reps: "3 reps each leg",
    description: "Trains proprioception and balance for injury prevention.",
    instructions: [
      "Stand on one leg near a wall or chair for safety",
      "Keep your standing knee slightly bent",
      "Focus on a fixed point ahead of you",
      "Hold for 30 seconds without touching down",
      "Progress: close your eyes or stand on an unstable surface"
    ],
    targetMuscles: ["Ankle stabilizers", "Hip abductors", "Core"],
    commonMistakes: ["Locking the standing knee", "Looking down at the floor"],
    evidenceNote: "Proprioceptive training reduces ankle sprain recurrence by 50% (Verhagen et al., 2004)."
  },
  {
    id: 16,
    name: "Quadruped Thread the Needle",
    category: "back",
    difficulty: "beginner",
    duration: "3s hold",
    reps: "10 reps each side x 2 sets",
    description: "Improves thoracic spine rotation and reduces mid-back stiffness.",
    instructions: [
      "Start on hands and knees in a tabletop position",
      "Reach your right arm under your body toward the left side",
      "Let your right shoulder and temple rest on the floor",
      "Hold the stretch, then reverse and reach your right arm up to the ceiling",
      "Follow your hand with your eyes to maximize rotation"
    ],
    targetMuscles: ["Thoracic rotators", "Obliques", "Rhomboids"],
    commonMistakes: ["Shifting weight to one side instead of rotating", "Moving too quickly"],
    evidenceNote: "Effective for thoracic mobility deficits common in desk workers and overhead athletes."
  }
];

export const categories = [
  { id: "all", label: "All", icon: "grid" },
  { id: "neck", label: "Neck", icon: "neck" },
  { id: "shoulder", label: "Shoulder", icon: "shoulder" },
  { id: "back", label: "Back", icon: "back" },
  { id: "core", label: "Core", icon: "core" },
  { id: "hip", label: "Hip", icon: "hip" },
  { id: "knee", label: "Knee", icon: "knee" },
  { id: "ankle", label: "Ankle", icon: "ankle" }
];

export const difficultyColors = {
  beginner: "text-emerald-700 bg-emerald-50 border-emerald-200",
  intermediate: "text-amber-700 bg-amber-50 border-amber-200",
  advanced: "text-red-700 bg-red-50 border-red-200"
};

export default exercises;
