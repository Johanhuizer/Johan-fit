export type LibraryExercise = {
  id: string;
  name: string;
  muscle: string;
  category: string;
  targetSets: number;
  weightStep: number;
};

export const exerciseLibrary: LibraryExercise[] = [

  // BORST

  {
    id: "machine-bench-press",
    name: "Machine Bench Press",
    muscle: "Borst",
    category: "Borst",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "dumbbell-bench-press",
    name: "Dumbbell Bench Press",
    muscle: "Borst",
    category: "Borst",
    targetSets: 3,
    weightStep: 2,
  },

  {
    id: "barbell-bench-press",
    name: "Barbell Bench Press",
    muscle: "Borst",
    category: "Borst",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "incline-dumbbell-press",
    name: "Incline Dumbbell Press",
    muscle: "Bovenkant borst",
    category: "Borst",
    targetSets: 3,
    weightStep: 2,
  },

  {
    id: "incline-machine-press",
    name: "Incline Machine Press",
    muscle: "Bovenkant borst",
    category: "Borst",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "incline-barbell-press",
    name: "Incline Barbell Press",
    muscle: "Bovenkant borst",
    category: "Borst",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "chest-press",
    name: "Chest Press",
    muscle: "Borst",
    category: "Borst",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "cable-fly",
    name: "Cable Fly",
    muscle: "Borst",
    category: "Borst",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "pec-deck",
    name: "Pec Deck",
    muscle: "Borst",
    category: "Borst",
    targetSets: 3,
    weightStep: 2.5,
  },


  // RUG

  {
    id: "lat-pulldown",
    name: "Lat Pulldown",
    muscle: "Brede rugspier",
    category: "Rug",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "neutral-grip-lat-pulldown",
    name: "Neutral Grip Lat Pulldown",
    muscle: "Brede rugspier",
    category: "Rug",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "close-grip-lat-pulldown",
    name: "Close Grip Lat Pulldown",
    muscle: "Brede rugspier",
    category: "Rug",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "seated-cable-row",
    name: "Seated Cable Row",
    muscle: "Middenrug",
    category: "Rug",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "chest-supported-row",
    name: "Chest Supported Row",
    muscle: "Middenrug",
    category: "Rug",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "chest-supported-tbar-row",
    name: "Chest Supported T-Bar Row",
    muscle: "Middenrug",
    category: "Rug",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "single-arm-cable-row",
    name: "Single Arm Cable Row",
    muscle: "Rug",
    category: "Rug",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "barbell-row",
    name: "Barbell Row",
    muscle: "Rug",
    category: "Rug",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "dumbbell-row",
    name: "One Arm Dumbbell Row",
    muscle: "Rug",
    category: "Rug",
    targetSets: 3,
    weightStep: 2,
  },

  {
    id: "machine-row",
    name: "Machine Row",
    muscle: "Middenrug",
    category: "Rug",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "straight-arm-pulldown",
    name: "Straight Arm Pulldown",
    muscle: "Brede rugspier",
    category: "Rug",
    targetSets: 3,
    weightStep: 2.5,
  },


  // SCHOUDERS

  {
    id: "shoulder-press",
    name: "Shoulder Press",
    muscle: "Schouders",
    category: "Schouders",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "machine-shoulder-press",
    name: "Machine Shoulder Press",
    muscle: "Schouders",
    category: "Schouders",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "dumbbell-shoulder-press",
    name: "Dumbbell Shoulder Press",
    muscle: "Schouders",
    category: "Schouders",
    targetSets: 3,
    weightStep: 2,
  },

  {
    id: "lateral-raise",
    name: "Dumbbell Lateral Raise",
    muscle: "Zijkant schouders",
    category: "Schouders",
    targetSets: 3,
    weightStep: 1,
  },

  {
    id: "cable-lateral-raise",
    name: "Cable Lateral Raise",
    muscle: "Zijkant schouders",
    category: "Schouders",
    targetSets: 3,
    weightStep: 1,
  },

  {
    id: "machine-lateral-raise",
    name: "Machine Lateral Raise",
    muscle: "Zijkant schouders",
    category: "Schouders",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "reverse-pec-deck",
    name: "Reverse Pec Deck",
    muscle: "Achterste schouders",
    category: "Schouders",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "lever-seated-reverse-fly",
    name: "Lever Seated Reverse Fly",
    muscle: "Achterste schouders",
    category: "Schouders",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "face-pull",
    name: "Face Pull",
    muscle: "Achterste schouders",
    category: "Schouders",
    targetSets: 3,
    weightStep: 2.5,
  },


  // BICEPS

  {
    id: "biceps-curl",
    name: "Dumbbell Biceps Curl",
    muscle: "Biceps",
    category: "Biceps",
    targetSets: 3,
    weightStep: 1,
  },

  {
    id: "hammer-curl",
    name: "Hammer Curl",
    muscle: "Biceps en brachialis",
    category: "Biceps",
    targetSets: 3,
    weightStep: 1,
  },

  {
    id: "barbell-curl",
    name: "Barbell Curl",
    muscle: "Biceps",
    category: "Biceps",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "ez-bar-curl",
    name: "EZ Bar Curl",
    muscle: "Biceps",
    category: "Biceps",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "cable-curl",
    name: "Cable Curl",
    muscle: "Biceps",
    category: "Biceps",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "preacher-curl",
    name: "Preacher Curl",
    muscle: "Biceps",
    category: "Biceps",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "incline-dumbbell-curl",
    name: "Incline Dumbbell Curl",
    muscle: "Biceps",
    category: "Biceps",
    targetSets: 3,
    weightStep: 1,
  },


  // TRICEPS

  {
    id: "triceps-pushdown",
    name: "Triceps Pushdown",
    muscle: "Triceps",
    category: "Triceps",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "rope-pushdown",
    name: "Rope Pushdown",
    muscle: "Triceps",
    category: "Triceps",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "overhead-triceps-extension",
    name: "Overhead Triceps Extension",
    muscle: "Triceps",
    category: "Triceps",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "skull-crusher",
    name: "EZ Bar Skull Crusher",
    muscle: "Triceps",
    category: "Triceps",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "close-grip-bench-press",
    name: "Close Grip Bench Press",
    muscle: "Triceps",
    category: "Triceps",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "assisted-dip",
    name: "Assisted Dip",
    muscle: "Triceps en borst",
    category: "Triceps",
    targetSets: 3,
    weightStep: 2.5,
  },


  // QUADRICEPS

  {
    id: "leg-press",
    name: "Leg Press",
    muscle: "Quadriceps en billen",
    category: "Benen",
    targetSets: 4,
    weightStep: 5,
  },

  {
    id: "leg-extension",
    name: "Leg Extension",
    muscle: "Quadriceps",
    category: "Benen",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "hack-squat",
    name: "Hack Squat",
    muscle: "Quadriceps en billen",
    category: "Benen",
    targetSets: 3,
    weightStep: 5,
  },

  {
    id: "barbell-squat",
    name: "Barbell Squat",
    muscle: "Quadriceps en billen",
    category: "Benen",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "smith-machine-squat",
    name: "Smith Machine Squat",
    muscle: "Quadriceps en billen",
    category: "Benen",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "bulgarian-split-squat",
    name: "Bulgarian Split Squat",
    muscle: "Quadriceps en billen",
    category: "Benen",
    targetSets: 3,
    weightStep: 2,
  },

  {
    id: "walking-lunge",
    name: "Walking Lunge",
    muscle: "Quadriceps en billen",
    category: "Benen",
    targetSets: 3,
    weightStep: 2,
  },


  // HAMSTRINGS EN BILLEN

  {
    id: "seated-leg-curl",
    name: "Seated Leg Curl",
    muscle: "Hamstrings",
    category: "Hamstrings",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "lying-leg-curl",
    name: "Lying Leg Curl",
    muscle: "Hamstrings",
    category: "Hamstrings",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "romanian-deadlift",
    name: "Romanian Deadlift",
    muscle: "Hamstrings en billen",
    category: "Hamstrings",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "dumbbell-romanian-deadlift",
    name: "Dumbbell Romanian Deadlift",
    muscle: "Hamstrings en billen",
    category: "Hamstrings",
    targetSets: 3,
    weightStep: 2,
  },

  {
    id: "hip-thrust",
    name: "Hip Thrust",
    muscle: "Billen",
    category: "Billen",
    targetSets: 3,
    weightStep: 5,
  },

  {
    id: "glute-bridge",
    name: "Glute Bridge",
    muscle: "Billen",
    category: "Billen",
    targetSets: 3,
    weightStep: 5,
  },

  {
    id: "cable-kickback",
    name: "Cable Glute Kickback",
    muscle: "Billen",
    category: "Billen",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "hip-abduction",
    name: "Hip Abduction Machine",
    muscle: "Billen",
    category: "Billen",
    targetSets: 3,
    weightStep: 2.5,
  },


  // KUITEN

  {
    id: "standing-calf-raise",
    name: "Standing Calf Raise",
    muscle: "Kuiten",
    category: "Kuiten",
    targetSets: 4,
    weightStep: 2.5,
  },

  {
    id: "seated-calf-raise",
    name: "Seated Calf Raise",
    muscle: "Kuiten",
    category: "Kuiten",
    targetSets: 4,
    weightStep: 2.5,
  },

  {
    id: "leg-press-calf-raise",
    name: "Leg Press Calf Raise",
    muscle: "Kuiten",
    category: "Kuiten",
    targetSets: 4,
    weightStep: 5,
  },


  // CORE

  {
    id: "cable-crunch",
    name: "Cable Crunch",
    muscle: "Buikspieren",
    category: "Core",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "machine-crunch",
    name: "Machine Crunch",
    muscle: "Buikspieren",
    category: "Core",
    targetSets: 3,
    weightStep: 2.5,
  },

  {
    id: "hanging-leg-raise",
    name: "Hanging Leg Raise",
    muscle: "Buikspieren",
    category: "Core",
    targetSets: 3,
    weightStep: 0,
  },

  {
    id: "plank",
    name: "Plank",
    muscle: "Core",
    category: "Core",
    targetSets: 3,
    weightStep: 0,
  },
];

export const exerciseCategories = [
  "Alle",
  "Borst",
  "Rug",
  "Schouders",
  "Biceps",
  "Triceps",
  "Benen",
  "Hamstrings",
  "Billen",
  "Kuiten",
  "Core",
];