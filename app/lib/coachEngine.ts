import type {
  WorkoutSet,
} from "../components/ExerciseCard";

export type CoachSet = {
  setNumber: number;

  plannedWeight: string;
  plannedReps: string;

  actualWeight: string;
  actualReps: string;

  completed: boolean;
};

export type CoachEvaluation = {
  targetReached: boolean;
  repsDifference: number;
  message: string;
  updatedSets: CoachSet[];
};

function parseNumber(
  value: string
): number {
  const normalized =
    value.replace(",", ".");

  const parsed =
    Number(normalized);

  if (Number.isNaN(parsed)) {
    return 0;
  }

  return parsed;
}

function formatWeight(
  weight: number
): string {
  if (Number.isInteger(weight)) {
    return String(weight);
  }

  return weight
    .toFixed(2)
    .replace(/0+$/, "")
    .replace(/\.$/, "");
}

function roundToWeightStep(
  weight: number,
  step: number
): number {
  if (step <= 0) {
    return weight;
  }

  return (
    Math.round(
      weight / step
    ) * step
  );
}

function getMainWeight(
  previousSets: WorkoutSet[]
): number {
  const weights =
    previousSets
      .map((set) =>
        parseNumber(set.weight)
      )
      .filter(
        (weight) =>
          weight > 0
      );

  if (weights.length === 0) {
    return 0;
  }

  return weights[0];
}

function createPlan(
  targetSets: number,
  plannedWeight: string
): CoachSet[] {
  return Array.from(
    {
      length: targetSets,
    },

    (_, index) => ({
      setNumber:
        index + 1,

      plannedWeight,

      plannedReps: "10",

      actualWeight: "",
      actualReps: "",

      completed: false,
    })
  );
}

function createFirstExercisePlan(
  targetSets: number
): CoachSet[] {
  return createPlan(
    targetSets,
    ""
  );
}

function createProgressiveRepPlan(
  previousSets: WorkoutSet[],
  targetSets: number,
  plannedWeight: string
): CoachSet[] {
  return Array.from(
    {
      length: targetSets,
    },

    (_, index) => {
      const previousSet =
        previousSets[index];

      const previousReps =
        previousSet
          ? parseNumber(
              previousSet.reps
            )
          : 0;

      const nextTarget =
  previousReps <= 0
    ? 10
    : previousReps >= 10
      ? 10
      : previousReps + 1;

      return {
        setNumber:
          index + 1,

        plannedWeight,

        plannedReps:
          String(nextTarget),

        actualWeight: "",

        actualReps: "",

        completed: false,
      };
    }
  );
}

export function createCoachPlanFromLastSession(
  previousSets: WorkoutSet[],
  targetSets: number,
  weightStep = 2.5
): CoachSet[] {
  if (previousSets.length === 0) {
    return createFirstExercisePlan(
      targetSets
    );
  }

  const mainWeight =
    getMainWeight(
      previousSets
    );

  if (mainWeight <= 0) {
    return createFirstExercisePlan(
      targetSets
    );
  }

  const reps =
    previousSets.map(
      (set) =>
        parseNumber(set.reps)
    );

  const allSetsReachedTarget =
    previousSets.length >=
      targetSets &&
    reps
      .slice(0, targetSets)
      .every(
        (rep) =>
          rep >= 10
      );

  if (allSetsReachedTarget) {
  const increasedWeight =
    roundToWeightStep(
      mainWeight +
        weightStep,
      weightStep
    );

  const newPlan =
    createPlan(
      targetSets,
      formatWeight(
        increasedWeight
      )
    );

  return newPlan.map(
    (set) => ({
      ...set,
      plannedReps: "8",
    })
  );
}

return createProgressiveRepPlan(
  previousSets,
  targetSets,
  formatWeight(
    mainWeight
  )
);
}

export function completeCoachSet(
  currentSets: CoachSet[],
  setIndex: number,
  actualWeight: string,
  actualReps: string
): CoachEvaluation {
  const sets =
    currentSets.map(
      (set) => ({
        ...set,
      })
    );

  const currentSet =
    sets[setIndex];

  if (!currentSet) {
    return {
      targetReached: false,

      repsDifference: 0,

      message:
        "Set kon niet worden beoordeeld.",

      updatedSets:
        sets,
    };
  }

  const plannedReps =
    parseNumber(
      currentSet.plannedReps
    );

  const performedReps =
    parseNumber(
      actualReps
    );

  const performedWeight =
    parseNumber(
      actualWeight
    );

  if (
    performedWeight <= 0 ||
    performedReps <= 0
  ) {
    return {
      targetReached: false,

      repsDifference: 0,

      message:
        "Vul een geldig gewicht en aantal herhalingen in.",

      updatedSets:
        sets,
    };
  }

  currentSet.actualWeight =
    actualWeight;

  currentSet.actualReps =
    actualReps;

  currentSet.completed =
    true;

  const repsDifference =
    performedReps -
    plannedReps;

  const targetReached =
    performedReps >=
    plannedReps;

  if (targetReached) {
    return {
      targetReached: true,

      repsDifference,

      message:
        performedReps >
        plannedReps
          ? `Sterke set: +${repsDifference} reps boven doel. Target voor de volgende set blijft ${plannedReps}.`
          : `Doel gehaald. Volgende set blijft gericht op ${plannedReps} reps.`,

      updatedSets:
        sets,
    };
  }

  const missedReps =
    plannedReps -
    performedReps;

  let message =
    `${missedReps} rep${missedReps === 1 ? "" : "s"} onder target. Neem je volledige rust en probeer de volgende set opnieuw ${plannedReps} reps te halen.`;

  if (missedReps >= 4) {
    message =
      `Je zat ${missedReps} reps onder target. De targets blijven staan; na de volledige oefening beoordeelt de coach of het gewicht voor de volgende training omlaag moet.`;
  }

  return {
    targetReached: false,

    repsDifference,

    message,

    updatedSets:
      sets,
  };
}

export function coachSetsToWorkoutSets(
  coachSets: CoachSet[]
): WorkoutSet[] {
  return coachSets.map(
    (set) => ({
      setNumber:
        set.setNumber,

      weight:
        set.completed
          ? set.actualWeight
          : set.plannedWeight,

      reps:
        set.completed
          ? set.actualReps
          : set.plannedReps,
    })
  );
}
