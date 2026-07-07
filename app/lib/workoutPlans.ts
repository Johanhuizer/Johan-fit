import type {
  WorkoutPlan,
} from "../components/ExerciseCard";


export const pushAWorkout: WorkoutPlan = {
  id: "push-a",

  name: "Push A",

  exercises: [
    {
      id: "machine-bench-press",
      name: "Machine Bench Press",
      muscle: "Borst",
      targetSets: 4,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "incline-dumbbell-press",
      name: "Incline Dumbbell Press",
      muscle: "Borst",
      targetSets: 3,
      weightStep: 2,
      history: [],
    },

    {
      id: "shoulder-press",
      name: "Shoulder Press",
      muscle: "Schouders",
      targetSets: 3,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "lateral-raise",
      name: "Lateral Raise",
      muscle: "Schouders",
      targetSets: 3,
      weightStep: 1,
      history: [],
    },

    {
      id: "triceps-pushdown",
      name: "Triceps Pushdown",
      muscle: "Triceps",
      targetSets: 3,
      weightStep: 2,
      history: [],
    },
  ],
};


export const pullAWorkout: WorkoutPlan = {
  id: "pull-a",


  name: "Pull A",

  exercises: [
    {
      id: "lat-pulldown",
      name: "Lat Pulldown",
      muscle: "Rug",
      targetSets: 4,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "seated-cable-row",
      name: "Seated Cable Row",
      muscle: "Rug",
      targetSets: 3,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "chest-supported-row",
      name: "Chest Supported Row",
      muscle: "Rug",
      targetSets: 3,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "reverse-pec-deck",
      name: "Reverse Pec Deck",
      muscle: "Achterste schouder",
      targetSets: 3,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "biceps-curl",
      name: "Biceps Curl",
      muscle: "Biceps",
      targetSets: 3,
      weightStep: 2,
      history: [],
    },
  ],
};
export const legsAWorkout: WorkoutPlan = {
  id: "legs-a",

  name: "Legs A",

  exercises: [
    {
      id: "leg-press",
      name: "Leg Press",
      muscle: "Benen",
      targetSets: 4,
      weightStep: 5,
      history: [],
    },

    {
      id: "leg-extension",
      name: "Leg Extension",
      muscle: "Quadriceps",
      targetSets: 3,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "seated-leg-curl",
      name: "Seated Leg Curl",
      muscle: "Hamstrings",
      targetSets: 3,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "romanian-deadlift",
      name: "Romanian Deadlift",
      muscle: "Hamstrings / Billen",
      targetSets: 3,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "standing-calf-raise",
      name: "Standing Calf Raise",
      muscle: "Kuiten",
      targetSets: 4,
      weightStep: 5,
      history: [],
    },
  ],
};
export const pushBWorkout: WorkoutPlan = {
  id: "push-b",

  name: "Push B",

  exercises: [
    {
      id: "incline-machine-press",
      name: "Incline Machine Press",
      muscle: "Borst",
      targetSets: 4,
      weightStep: 2,
      history: [],
    },

    {
      id: "dumbbell-bench-press",
      name: "Dumbbell Bench Press",
      muscle: "Borst",
      targetSets: 3,
      weightStep: 2,
      history: [],
    },

    {
      id: "machine-shoulder-press",
      name: "Machine Shoulder Press",
      muscle: "Schouders",
      targetSets: 3,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "cable-lateral-raise",
      name: "Cable Lateral Raise",
      muscle: "Schouders",
      targetSets: 3,
      weightStep: 1,
      history: [],
    },

    {
      id: "overhead-triceps-extension",
      name: "Overhead Triceps Extension",
      muscle: "Triceps",
      targetSets: 3,
      weightStep: 2.5,
      history: [],
    },
  ],
};
export const pullBWorkout: WorkoutPlan = {
  id: "pull-b",

  name: "Pull B",

  exercises: [
    {
      id: "neutral-grip-lat-pulldown",
      name: "Neutral Grip Lat Pulldown",
      muscle: "Rug",
      targetSets: 4,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "chest-supported-tbar-row",
      name: "Chest Supported T-Bar Row",
      muscle: "Rug",
      targetSets: 3,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "single-arm-cable-row",
      name: "Single Arm Cable Row",
      muscle: "Rug",
      targetSets: 3,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "lever-seated-reverse-fly",
      name: "Seated Reverse Fly",
      muscle: "Achterste schouders",
      targetSets: 3,
      weightStep: 2.5,
      history: [],
    },

    {
      id: "hammer-curl",
      name: "Hammer Curl",
      muscle: "Biceps / Onderarmen",
      targetSets: 3,
      weightStep: 2,
      history: [],
    },
  ],
};  