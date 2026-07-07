"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  ExerciseCard,
} from "./ExerciseCard";

import {
  ExerciseHistory,
} from "./ExerciseHistory";

import {
  EditExerciseModal,
} from "./EditExerciseModal";

import {
  WorkoutSummary,
} from "./WorkoutSummary";

import {
  WorkoutHistory,
  type CompletedWorkout,
} from "./WorkoutHistory";

import {
  RestTimer,
} from "./RestTimer";

import type {
  Exercise,
  WorkoutPlan,
  WorkoutSet,
  WorkoutSession,
} from "./ExerciseCard";

import {
  coachSetsToWorkoutSets,
  completeCoachSet,
  createCoachPlanFromLastSession,
  type CoachSet,
} from "../lib/coachEngine";

function createEmptySets(
  amount: number
): WorkoutSet[] {
  return Array.from(
    {
      length: amount,
    },

    (_, index) => ({
      setNumber:
        index + 1,

      weight: "",

      reps: "",
    })
  );
}


function migrateWorkoutData(
  data: WorkoutPlan
): WorkoutPlan {
  return {
    ...data,

    exercises:
      data.exercises.map(
        (exercise) => ({
          ...exercise,

          history:
            (
              exercise.history ||
              []
            ).map(
              (
                session,
                sessionIndex
              ) => ({
                ...session,

                id:
                  session.id ||
                  `${exercise.id}-session-${sessionIndex}`,

                date:
                  session.date ||
                  new Date()
                    .toISOString(),

                sets:
                  (
                    session.sets ||
                    []
                  ).map(
                    (
                      set,
                      setIndex
                    ) => ({
                      setNumber:
                        typeof
                          set.setNumber ===
                        "number"
                          ? set.setNumber
                          : setIndex + 1,

                      weight:
                        String(
                          set.weight ??
                            ""
                        ),

                      reps:
                        String(
                          set.reps ??
                            ""
                        ),
                    })
                  ),
              })
            ),
        })
      ),
  };
}


function setsAreEqual(
  currentSets: WorkoutSet[],
  sessionSets: WorkoutSet[]
): boolean {
  const filledCurrentSets =
    currentSets.filter(
      (set) =>
        set.weight.trim() !==
          "" &&
        set.reps.trim() !== ""
    );

  if (
    filledCurrentSets.length !==
    sessionSets.length
  ) {
    return false;
  }

  return sessionSets.every(
    (
      sessionSet,
      index
    ) => {
      const currentSet =
        filledCurrentSets[index];

      if (!currentSet) {
        return false;
      }

      return (
        currentSet.weight.trim() ===
          sessionSet.weight.trim() &&
        currentSet.reps.trim() ===
          sessionSet.reps.trim()
      );
    }
  );
}


function formatDuration(
  totalSeconds: number
): string {
  const hours =
    Math.floor(
      totalSeconds / 3600
    );

  const minutes =
    Math.floor(
      (
        totalSeconds % 3600
      ) / 60
    );

  const seconds =
    totalSeconds % 60;

  return [
    hours,

    minutes
      .toString()
      .padStart(
        2,
        "0"
      ),

    seconds
      .toString()
      .padStart(
        2,
        "0"
      ),
  ].join(":");
}


function createCoachPlans(
  workoutPlan: WorkoutPlan
): Record<
  string,
  CoachSet[]
> {
console.log("COACH DEBUG", workoutPlan.exercises);

  const plans: Record<
    string,
    CoachSet[]
  > = {};

  workoutPlan.exercises.forEach(
    (exercise) => {
      const lastSession =
        exercise.history[
          exercise.history.length -
            1
        ];

      plans[exercise.id] =
  createCoachPlanFromLastSession(
    lastSession?.sets ?? [],
    exercise.targetSets,
    exercise.weightStep ?? 2.5
  );
    }
  );

  return plans;
}


type WorkoutPageProps = {
  defaultWorkout: WorkoutPlan;
  storageKey: string;
};

const WORKOUT_HISTORY_KEY =
  "forgefit-completed-workouts";


export default function WorkoutPage({
  defaultWorkout,
  storageKey,
}: WorkoutPageProps) {
  const router =
    useRouter();


  const [
    workout,
    setWorkout,
  ] =
    useState<WorkoutPlan>(
      defaultWorkout
    );


  const [
    currentSets,
    setCurrentSets,
  ] =
    useState<
      Record<
        string,
        WorkoutSet[]
      >
    >({});


  const [
    currentSessionIds,
    setCurrentSessionIds,
  ] =
    useState<
      Record<
        string,
        string
      >
    >({});


  const [
    coachSetsByExercise,
    setCoachSetsByExercise,
  ] =
    useState<
      Record<
        string,
        CoachSet[]
      >
    >({});


  const [
    coachMessages,
    setCoachMessages,
  ] =
    useState<
      Record<
        string,
        string
      >
    >({});


  const [
    completedWorkouts,
    setCompletedWorkouts,
  ] =
    useState<
      CompletedWorkout[]
    >([]);


  const [
    message,
    setMessage,
  ] =
    useState("");


  const [
    openMenuId,
    setOpenMenuId,
  ] =
    useState<
      string | null
    >(null);


  const [
    editingExerciseId,
    setEditingExerciseId,
  ] =
    useState<
      string | null
    >(null);


  const [
    historyExerciseId,
    setHistoryExerciseId,
  ] =
    useState<
      string | null
    >(null);


  const [
    summaryOpen,
    setSummaryOpen,
  ] =
    useState(false);


  const [
    workoutHistoryOpen,
    setWorkoutHistoryOpen,
  ] =
    useState(false);


  const [
    workoutStartedAt,
    setWorkoutStartedAt,
  ] =
    useState<number>(
      () => Date.now()
    );


  const [
    durationSeconds,
    setDurationSeconds,
  ] =
    useState(0);

    const [
  restTimerRunning,
  setRestTimerRunning,
] = useState(false);

const [
  restTimerRestartKey,
  setRestTimerRestartKey,
] = useState(0);

const [
  restTimerDuration,
  setRestTimerDuration,
] = useState(90);


  const [
    workoutLoaded,
    setWorkoutLoaded,
  ] =
    useState(false);


  useEffect(() => {
    const savedWorkout =
      localStorage.getItem(
        storageKey
      );

    let loadedWorkout =
      defaultWorkout;

    if (savedWorkout) {
      try {
        const parsedWorkout:
          WorkoutPlan =
            JSON.parse(
              savedWorkout
            );

        const migratedWorkout =
  migrateWorkoutData(
    parsedWorkout
  );

loadedWorkout = {
  ...migratedWorkout,

  exercises:
    migratedWorkout.exercises.map(
      (savedExercise) => {
        const defaultExercise =
          defaultWorkout.exercises.find(
            (item) =>
              item.id ===
              savedExercise.id
          );

        return {
          ...savedExercise,

          weightStep:
            defaultExercise?.weightStep ??
            savedExercise.weightStep ??
            2.5,
        };
      }
    ),
};

        setWorkout(
          loadedWorkout
        );

        localStorage.setItem(
          storageKey,

          JSON.stringify(
            loadedWorkout
          )
        );
      } catch (error) {
        console.error(
          "Workout kon niet worden geladen:",
          error
        );

        setWorkout(
          defaultWorkout
        );
      }
    }

    const savedCompletedWorkouts =
      localStorage.getItem(
        WORKOUT_HISTORY_KEY
      );

    if (
      savedCompletedWorkouts
    ) {
      try {
        const parsedHistory:
          CompletedWorkout[] =
            JSON.parse(
              savedCompletedWorkouts
            );

        setCompletedWorkouts(
          parsedHistory
        );
      } catch (error) {
        console.error(
          "Trainingsgeschiedenis kon niet worden geladen:",
          error
        );
      }
    }

    setWorkoutLoaded(true);
  }, []);


  useEffect(() => {
  if (!workoutLoaded) {
    return;
  }

  const plans =
    createCoachPlans(
      workout
    );

  setCoachSetsByExercise(
    plans
  );

  const startMessages: Record<
    string,
    string
  > = {};

  workout.exercises.forEach(
    (exercise) => {
      const lastSession =
        exercise.history[
          exercise.history.length - 1
        ];

      const coachPlan =
        plans[exercise.id];

      if (
        !lastSession ||
        !coachPlan ||
        coachPlan.length === 0
      ) {
        return;
      }

      const previousReps =
        lastSession.sets
          .map(
            (set) =>
              set.reps
          )
          .join(" / ");

      const plannedReps =
        coachPlan
          .map(
            (set) =>
              set.plannedReps
          )
          .join(" / ");

      const previousWeight =
        lastSession.sets[0]
          ?.weight;

      const plannedWeight =
        coachPlan[0]
          ?.plannedWeight;

      if (
        previousWeight &&
        plannedWeight &&
        previousWeight !==
          plannedWeight
      ) {
        startMessages[
          exercise.id
        ] =
          `Vorige training: ${previousWeight} kg — ${previousReps}. Vandaag: ${plannedWeight} kg — doel ${plannedReps}. Gewicht verhoogd, nieuwe repcyclus gestart.`;
      } else {
        startMessages[
          exercise.id
        ] =
          `Vorige training: ${previousWeight} kg — ${previousReps}. Vandaag: ${plannedWeight} kg — doel ${plannedReps}. Gewicht blijft gelijk, bouw de reps verder op.`;
      }
    }
  );

  setCoachMessages(
    startMessages
  );
}, [workout, workoutLoaded]);


  useEffect(() => {
    function updateTimer() {
      const elapsedMilliseconds =
        Date.now() -
        workoutStartedAt;

      const elapsedSeconds =
        Math.floor(
          elapsedMilliseconds /
            1000
        );

      setDurationSeconds(
        elapsedSeconds
      );
    }

    updateTimer();

    const intervalId =
      window.setInterval(
        updateTimer,
        1000
      );

    return () => {
      window.clearInterval(
        intervalId
      );
    };
  }, [
    workoutStartedAt,
  ]);


  function getSetsForExercise(
    exercise: Exercise
  ): WorkoutSet[] {
    const existing =
      currentSets[
        exercise.id
      ];

    if (existing) {
      return existing;
    }

    return createEmptySets(
      exercise.targetSets
    );
  }


  function updateCurrentSet(
    exercise: Exercise,
    setIndex: number,
    field:
      | "weight"
      | "reps",
    value: string
  ) {
    const sets =
      getSetsForExercise(
        exercise
      );

    const updatedSets =
      sets.map(
        (
          set,
          index
        ) => {
          if (
            index ===
            setIndex
          ) {
            return {
              ...set,

              [field]:
                value,
            };
          }

          return set;
        }
      );

    setCurrentSets(
      (previous) => ({
        ...previous,

        [exercise.id]:
          updatedSets,
      })
    );

    setMessage("");
  }


  function updateCoachSet(
    exerciseId: string,
    setIndex: number,
    field:
      | "actualWeight"
      | "actualReps",
    value: string
  ) {
    setCoachSetsByExercise(
      (previous) => {
        const exerciseSets =
          previous[
            exerciseId
          ];

        if (!exerciseSets) {
          return previous;
        }

        const updatedSets =
          exerciseSets.map(
            (
              set,
              index
            ) => {
              if (
                index !==
                setIndex
              ) {
                return set;
              }

              return {
                ...set,

                [field]:
                  value,
              };
            }
          );

        return {
          ...previous,

          [exerciseId]:
            updatedSets,
        };
      }
    );

    setCoachMessages(
      (previous) => ({
        ...previous,

        [exerciseId]: "",
      })
    );

    setMessage("");
  }

  function completeExerciseCoachSet(
    exercise: Exercise,
    setIndex: number
  ) {
    const exerciseSets =
      coachSetsByExercise[
        exercise.id
      ];

    if (!exerciseSets) {
      return;
    }

    const selectedSet =
      exerciseSets[
        setIndex
      ];

    if (!selectedSet) {
      return;
    }

    const actualWeight =
      selectedSet.actualWeight
        .trim();

    const actualReps =
      selectedSet.actualReps
        .trim();

    if (
      actualWeight === "" ||
      actualReps === ""
    ) {
      setCoachMessages(
        (previous) => ({
          ...previous,

          [exercise.id]:
            "Vul je werkelijk gebruikte gewicht en behaalde herhalingen in.",
        })
      );

      return;
    }

    const evaluation =
      completeCoachSet(
        exerciseSets,
        setIndex,
        actualWeight,
        actualReps
      );

    setCoachSetsByExercise(
      (previous) => ({
        ...previous,

        [exercise.id]:
          evaluation.updatedSets,
      })
    );

    setCoachMessages(
      (previous) => ({
        ...previous,

        [exercise.id]:
          evaluation.message,
      })
    );

    const longRestExercises = [
      "machine-bench-press",
      "incline-dumbbell-press",
      "shoulder-press",
      "lat-pulldown",
      "seated-cable-row",
      "chest-supported-row",
    ];

    setRestTimerDuration(
      longRestExercises.includes(
        exercise.id
      )
        ? 180
        : 90
    );

    setRestTimerRunning(true);

    setRestTimerRestartKey(
      (previous) =>
        previous + 1
    );
  }


  function saveExerciseSession(
  exercise: Exercise
) {
  const normalSets =
    getSetsForExercise(
      exercise
    ).filter(
      (set) =>
        set.weight.trim() !== "" &&
        set.reps.trim() !== ""
    );

  const coachSets =
    coachSetsByExercise[
      exercise.id
    ];

  const completedCoachSets =
    coachSets &&
    coachSets.length > 0
      ? coachSetsToWorkoutSets(
          coachSets.filter(
            (set) =>
              set.completed
          )
        ).filter(
          (set) =>
            set.weight.trim() !== "" &&
            set.reps.trim() !== ""
        )
      : [];

  const completedSets =
    completedCoachSets.length > 0
      ? completedCoachSets
      : normalSets;

  if (
    completedSets.length === 0
  ) {
    setMessage(
      `Vul eerst minimaal één complete set in bij ${exercise.name}.`
    );

    return;
  }

  const newSession:
    WorkoutSession = {
      id:
        crypto.randomUUID(),

      date:
        new Date()
          .toISOString(),

      sets:
        completedSets.map(
          (set, index) => ({
            ...set,

            setNumber:
              index + 1,
          })
        ),
    };

  setWorkout(
    (currentWorkout) => {
      const updatedWorkout:
        WorkoutPlan = {
          ...currentWorkout,

          exercises:
            currentWorkout.exercises.map(
              (item) => {
                if (
                  item.id !==
                  exercise.id
                ) {
                  return item;
                }

                return {
                  ...item,

                  history: [
                    ...item.history,
                    newSession,
                  ],
                };
              }
            ),
        };

      localStorage.setItem(
        storageKey,
        JSON.stringify(
          updatedWorkout
        )
      );

      return updatedWorkout;
    }
  );

  setCurrentSessionIds(
    (previous) => ({
      ...previous,

      [exercise.id]:
        newSession.id,
    })
  );

  const nextPlan =
    createCoachPlanFromLastSession(
      newSession.sets,
      exercise.targetSets,
      exercise.weightStep ?? 2.5
    );

  const performedReps =
    newSession.sets
      .map(
        (set) =>
          set.reps
      )
      .join(" / ");

  const nextReps =
    nextPlan
      .map(
        (set) =>
          set.plannedReps
      )
      .join(" / ");

  const currentWeight =
    newSession.sets[0]
      ?.weight;

  const nextWeight =
    nextPlan[0]
      ?.plannedWeight;

  const weightIncreased =
    currentWeight !==
    nextWeight;

  setCoachMessages(
    (previous) => ({
      ...previous,

      [exercise.id]:
        weightIncreased
          ? `Oefening afgerond: ${currentWeight} kg — ${performedReps}. Volgende keer: ${nextWeight} kg — doel ${nextReps}. Gewicht omhoog, nieuwe repcyclus gestart.`
          : `Oefening afgerond: ${currentWeight} kg — ${performedReps}. Volgende keer blijft het gewicht ${nextWeight} kg — doel ${nextReps}.`,
    })
  );

  setMessage(
    `${exercise.name} opgeslagen ✓`
  );
}

  function saveExerciseChanges(
    exerciseId: string,
    name: string,
    muscle: string,
    targetSets: number
  ) {
    setWorkout(
      (
        currentWorkout
      ) => {
        const updatedWorkout:
          WorkoutPlan = {
            ...currentWorkout,

            exercises:
              currentWorkout.exercises.map(
                (exercise) => {
                  if (
                    exercise.id !==
                    exerciseId
                  ) {
                    return exercise;
                  }

                  return {
                    ...exercise,

                    name,

                    muscle,

                    targetSets,
                  };
                }
              ),
          };

        localStorage.setItem(
          storageKey,

          JSON.stringify(
            updatedWorkout
          )
        );

        return updatedWorkout;
      }
    );


    setCurrentSets(
      (previous) => {
        const existingSets =
          previous[
            exerciseId
          ] || [];

        const resizedSets =
          Array.from(
            {
              length:
                targetSets,
            },

            (
              _,
              index
            ) =>
              existingSets[
                index
              ] || {
                setNumber:
                  index + 1,

                weight: "",

                reps: "",
              }
          ).map(
            (
              set,
              index
            ) => ({
              ...set,

              setNumber:
                index + 1,
            })
          );

        return {
          ...previous,

          [exerciseId]:
            resizedSets,
        };
      }
    );


    setEditingExerciseId(
      null
    );

    setMessage(
      `${name} aangepast ✓`
    );
  }


  function changeHistory(
    exerciseId: string,
    newHistory:
      WorkoutSession[]
  ) {
    setWorkout(
      (
        currentWorkout
      ) => {
        const updatedWorkout:
          WorkoutPlan = {
            ...currentWorkout,

            exercises:
              currentWorkout.exercises.map(
                (exercise) => {
                  if (
                    exercise.id !==
                    exerciseId
                  ) {
                    return exercise;
                  }

                  return {
                    ...exercise,

                    history:
                      newHistory,
                  };
                }
              ),
          };

        localStorage.setItem(
          storageKey,

          JSON.stringify(
            updatedWorkout
          )
        );

        return updatedWorkout;
      }
    );
  }


  function deleteHistorySession(
    exercise: Exercise,
    deletedSession:
      WorkoutSession,
    newHistory:
      WorkoutSession[]
  ) {
    setWorkout(
      (
        currentWorkout
      ) => {
        const updatedWorkout:
          WorkoutPlan = {
            ...currentWorkout,

            exercises:
              currentWorkout.exercises.map(
                (item) => {
                  if (
                    item.id !==
                    exercise.id
                  ) {
                    return item;
                  }

                  return {
                    ...item,

                    history:
                      newHistory,
                  };
                }
              ),
          };

        localStorage.setItem(
          storageKey,

          JSON.stringify(
            updatedWorkout
          )
        );

        return updatedWorkout;
      }
    );


    const todaySets =
      getSetsForExercise(
        exercise
      );

    const isSameAsToday =
      setsAreEqual(
        todaySets,
        deletedSession.sets
      );


    if (isSameAsToday) {
      setCurrentSets(
        (previous) => ({
          ...previous,

          [exercise.id]:
            createEmptySets(
              exercise.targetSets
            ),
        })
      );
    }


    setCurrentSessionIds(
      (previous) => {
        if (
          previous[
            exercise.id
          ] !==
          deletedSession.id
        ) {
          return previous;
        }

        const updated = {
          ...previous,
        };

        delete updated[
          exercise.id
        ];

        return updated;
      }
    );


    const previousSession =
      newHistory[
        newHistory.length - 1
      ];


    setCoachSetsByExercise(
      (previous) => {
        const updated = {
          ...previous,
        };

        if (
          previousSession
        ) {
          updated[
            exercise.id
          ] =
            createCoachPlanFromLastSession(
  previousSession.sets,
  exercise.targetSets,
  exercise.weightStep ?? 2.5
);
        } else {
          delete updated[
            exercise.id
          ];
        }

        return updated;
      }
    );


      
    setCoachMessages(
      (previous) => ({
        ...previous,

        [exercise.id]: "",
      })
    );

    setMessage(
      `${exercise.name}: sessie verwijderd ✓`
    );
  }


  const completedExercises =
    workout.exercises.flatMap(
      (exercise) => {
        const sessionId =
          currentSessionIds[
            exercise.id
          ];

        if (!sessionId) {
          return [];
        }

        const session =
          exercise.history.find(
            (item) =>
              item.id ===
              sessionId
          );

        if (!session) {
          return [];
        }

        return [
          {
            exercise,

            sets:
              session.sets,
          },
        ];
      }
    );


  function finishWorkout() {
    if (
      completedExercises.length ===
      0
    ) {
      setSummaryOpen(
        false
      );

      setMessage(
        "Er zijn geen opgeslagen oefeningen om af te ronden."
      );

      return;
    }


    const completedWorkout:
      CompletedWorkout = {
        id:
          crypto.randomUUID(),

        workoutId:
          workout.id,

        workoutName:
          workout.name,

        date:
          new Date()
            .toISOString(),

        durationSeconds,

        exercises:
          completedExercises.map(
            (item) => ({
              exerciseId:
                item.exercise.id,

              exerciseName:
                item.exercise.name,

              muscle:
                item.exercise.muscle,

              sets:
                item.sets.map(
                  (set) => ({
                    ...set,
                  })
                ),
            })
          ),
      };


    setCompletedWorkouts(
      (previous) => {
        const updated = [
          ...previous,

          completedWorkout,
        ];

        localStorage.setItem(
          WORKOUT_HISTORY_KEY,

          JSON.stringify(
            updated
          )
        );

        return updated;
      }
    );


    const nextCoachPlans:
      Record<
        string,
        CoachSet[]
      > = {};


    workout.exercises.forEach(
      (exercise) => {
        const currentCompleted =
          completedExercises.find(
            (item) =>
              item.exercise.id ===
              exercise.id
          );

        if (
          currentCompleted
        ) {
          nextCoachPlans[
            exercise.id
          ] =
            createCoachPlanFromLastSession(
              currentCompleted.sets,
              exercise.targetSets
            );

          return;
        }

        const lastSession =
          exercise.history[
            exercise.history.length -
              1
          ];

        if (lastSession) {
          nextCoachPlans[
            exercise.id
          ] =
            createCoachPlanFromLastSession(
              lastSession.sets,
              exercise.targetSets
            );
        }
      }
    );


    setSummaryOpen(false);

    setCurrentSessionIds({});

    setCurrentSets({});

    setCoachSetsByExercise(
      nextCoachPlans
    );

    setCoachMessages({});

    setDurationSeconds(0);

    setWorkoutStartedAt(
      Date.now()
    );

    setMessage(
      `${workout.name} afgerond en opgeslagen ✓`
    );
  }


  function deleteCompletedWorkout(
    workoutId: string
  ) {
    setCompletedWorkouts(
      (previous) => {
        const updated =
          previous.filter(
            (item) =>
              item.id !==
              workoutId
          );

        localStorage.setItem(
          WORKOUT_HISTORY_KEY,

          JSON.stringify(
            updated
          )
        );

        return updated;
      }
    );
  }


  const editingExercise =
    editingExerciseId !==
    null
      ? workout.exercises.find(
          (exercise) =>
            exercise.id ===
            editingExerciseId
        ) ?? null
      : null;


  const historyExercise =
    historyExerciseId !==
    null
      ? workout.exercises.find(
          (exercise) =>
            exercise.id ===
            historyExerciseId
        ) ?? null
      : null;


  return (
    <main className="min-h-screen bg-zinc-950 text-white p-6 pb-28">

      <div className="flex items-center justify-between mb-6">

        <button
          type="button"
          onClick={() =>
            router.push("/")
          }
          className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-xl"
        >
          ← Dashboard
        </button>

        <h1 className="text-4xl font-bold">
          💪 {workout.name}
        </h1>

        <div className="w-28" />

      </div>


      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 mb-4">

        <div className="flex items-center justify-between gap-4">

          <div>

            <p className="text-zinc-400 text-sm">
              Training bezig
            </p>

            <p className="text-green-500 font-bold text-xl mt-1">
              ⏱️{" "}
              {formatDuration(
                durationSeconds
              )}
            </p>

          </div>


          <div className="text-right">

            <p className="text-zinc-400 text-sm">
              Opgeslagen oefeningen
            </p>

            <p className="text-xl font-bold mt-1">
              {
                completedExercises.length
              }
            </p>

          </div>

        </div>

      </div>


      <div className="mb-6">

        <button
          type="button"
          onClick={() =>
            setWorkoutHistoryOpen(
              true
            )
          }
          className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 rounded-xl p-4 font-bold"
        >
          📊 Trainingsgeschiedenis{" "}
          ({completedWorkouts.length})
        </button>

      </div>


      {message && (
        <div className="bg-green-950 border border-green-800 text-green-400 p-4 rounded-xl mb-6">
          {message}
        </div>
      )}


      <div className="space-y-6">

        {workout.exercises.map(
  (exercise) => (

      <ExerciseCard
        key={exercise.id}

              exercise={
                exercise
              }

              sets={
                getSetsForExercise(
                  exercise
                )
              }

              coachSets={
                coachSetsByExercise[
                  exercise.id
                ]
              }

              coachMessage={
                coachMessages[
                  exercise.id
                ]
              }

              menuOpen={
                openMenuId ===
                exercise.id
              }

              onToggleMenu={() => {
                setOpenMenuId(
                  openMenuId ===
                    exercise.id
                    ? null
                    : exercise.id
                );
              }}

              onEdit={() => {
                setEditingExerciseId(
                  exercise.id
                );

                setOpenMenuId(
                  null
                );
              }}

              onHistory={() => {
                setHistoryExerciseId(
                  exercise.id
                );

                setOpenMenuId(
                  null
                );
              }}

              onUpdateSet={(
                setIndex,
                field,
                value
              ) => {
                updateCurrentSet(
                  exercise,
                  setIndex,
                  field,
                  value
                );
              }}

              onUpdateCoachSet={(
                setIndex,
                field,
                value
              ) => {
                updateCoachSet(
                  exercise.id,
                  setIndex,
                  field,
                  value
                );
              }}

              onCompleteCoachSet={(
                setIndex
              ) => {
                completeExerciseCoachSet(
                  exercise,
                  setIndex
                );
              }}

              onSave={() => {
                saveExerciseSession(
                  exercise
                );
              }}
            />
          )
        )}

      </div>


      <div className="mt-8 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

        <div className="mb-4">

          <h2 className="text-2xl font-bold">
            Training klaar?
          </h2>

          <p className="text-zinc-400 mt-1">
            Bekijk eerst je samenvatting voordat je de training afrondt.
          </p>

        </div>

        <button
          type="button"
          onClick={() =>
            setSummaryOpen(
              true
            )
          }
          className="w-full bg-green-600 hover:bg-green-700 rounded-xl p-4 font-bold text-lg"
        >
          🏁 Training afronden
        </button>

      </div>


      {editingExercise !==
        null && (
        <EditExerciseModal
          exercise={
            editingExercise
          }

          onClose={() => {
            setEditingExerciseId(
              null
            );
          }}

          onSave={
            saveExerciseChanges
          }
        />
      )}


      {historyExercise !==
        null && (
        <ExerciseHistory
          exercise={
            historyExercise
          }

          onClose={() => {
            setHistoryExerciseId(
              null
            );
          }}

          onChangeHistory={(
            newHistory:
              WorkoutSession[]
          ) => {
            changeHistory(
              historyExercise.id,
              newHistory
            );
          }}

          onDeleteSession={(
            deletedSession:
              WorkoutSession,

            newHistory:
              WorkoutSession[]
          ) => {
            deleteHistorySession(
              historyExercise,
              deletedSession,
              newHistory
            );
          }}
        />
      )}


      {summaryOpen && (
        <WorkoutSummary
          workoutName={
            workout.name
          }

          completedExercises={
            completedExercises
          }

          durationSeconds={
            durationSeconds
          }

          onClose={() => {
            setSummaryOpen(
              false
            );
          }}

          onFinish={
            finishWorkout
          }
        />
      )}


      {workoutHistoryOpen && (
        <WorkoutHistory
          workouts={
            completedWorkouts
          }

          onClose={() => {
            setWorkoutHistoryOpen(
              false
            );
          }}

          onDeleteWorkout={
            deleteCompletedWorkout
          }
        />
      )}


      <RestTimer
        duration={restTimerDuration}
        running={restTimerRunning}
        restartKey={restTimerRestartKey}
        onFinished={() => {
          setRestTimerRunning(false);
        }}
      />

    </main>
  );
}