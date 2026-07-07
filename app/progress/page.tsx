"use client";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import BottomNavigation from "../components/BottomNavigation";

type WorkoutSet = {
  setNumber: number;
  weight: string;
  reps: string;
};

type CompletedExercise = {
  exerciseId: string;
  exerciseName: string;
  muscle: string;
  sets: WorkoutSet[];
};

type CompletedWorkout = {
  id: string;
  workoutId: string;
  workoutName: string;
  date: string;
  durationSeconds: number;
  exercises: CompletedExercise[];
};

type ExerciseProgress = {
  workoutId: string;
  date: string;
  weight: number;
  reps: string;
  volume: number;
};

const WORKOUT_HISTORY_KEY =
  "forgefit-completed-workouts";


function parseNumber(
  value: string
): number {
  const number =
    Number(
      value.replace(",", ".")
    );

  return Number.isNaN(number)
    ? 0
    : number;
}


export default function ProgressPage() {
  const [
    workouts,
    setWorkouts,
  ] =
    useState<
      CompletedWorkout[]
    >([]);

  const [
    selectedExerciseId,
    setSelectedExerciseId,
  ] =
    useState("");


  useEffect(() => {
    const saved =
      localStorage.getItem(
        WORKOUT_HISTORY_KEY
      );

    if (!saved) {
      return;
    }

    try {
      const parsed:
        CompletedWorkout[] =
          JSON.parse(saved);

      setWorkouts(parsed);
    } catch (error) {
      console.error(
        "Statistieken konden niet worden geladen:",
        error
      );
    }
  }, []);


  const stats =
    useMemo(() => {
      let totalSets = 0;
      let totalReps = 0;
      let totalVolume = 0;
      let bestWeight = 0;

      workouts.forEach(
        (workout) => {
          workout.exercises.forEach(
            (exercise) => {
              exercise.sets.forEach(
                (set) => {
                  const weight =
                    parseNumber(
                      set.weight
                    );

                  const reps =
                    parseNumber(
                      set.reps
                    );

                  totalSets += 1;

                  totalReps +=
                    reps;

                  totalVolume +=
                    weight * reps;

                  bestWeight =
                    Math.max(
                      bestWeight,
                      weight
                    );
                }
              );
            }
          );
        }
      );

      return {
        totalWorkouts:
          workouts.length,

        totalSets,

        totalReps,

        totalVolume,

        bestWeight,
      };
    }, [workouts]);


  const exercises =
    useMemo(() => {
      const exerciseMap =
        new Map<
          string,
          {
            id: string;
            name: string;
          }
        >();

      workouts.forEach(
        (workout) => {
          workout.exercises.forEach(
            (exercise) => {
              exerciseMap.set(
                exercise.exerciseId,
                {
                  id:
                    exercise.exerciseId,

                  name:
                    exercise.exerciseName,
                }
              );
            }
          );
        }
      );

      return Array.from(
        exerciseMap.values()
      ).sort(
        (a, b) =>
          a.name.localeCompare(
            b.name
          )
      );
    }, [workouts]);


  useEffect(() => {
    if (
      selectedExerciseId ||
      exercises.length === 0
    ) {
      return;
    }

    setSelectedExerciseId(
      exercises[0].id
    );
  }, [
    exercises,
    selectedExerciseId,
  ]);


  const exerciseProgress =
    useMemo(() => {
      const progress:
        ExerciseProgress[] = [];

      workouts.forEach(
        (workout) => {
          const exercise =
            workout.exercises.find(
              (item) =>
                item.exerciseId ===
                selectedExerciseId
            );

          if (!exercise) {
            return;
          }

          const weights =
            exercise.sets.map(
              (set) =>
                parseNumber(
                  set.weight
                )
            );

          const reps =
            exercise.sets
              .map(
                (set) =>
                  set.reps
              )
              .join(" / ");

          const weight =
            weights.length > 0
              ? Math.max(
                  ...weights
                )
              : 0;

          const volume =
            exercise.sets.reduce(
              (
                total,
                set
              ) => {
                return (
                  total +
                  parseNumber(
                    set.weight
                  ) *
                    parseNumber(
                      set.reps
                    )
                );
              },
              0
            );

          progress.push({
            workoutId:
              workout.id,

            date:
              workout.date,

            weight,

            reps,

            volume,
          });
        }
      );

      return progress.sort(
        (a, b) =>
          new Date(
            a.date
          ).getTime() -
          new Date(
            b.date
          ).getTime()
      );
    }, [
      workouts,
      selectedExerciseId,
    ]);


  const selectedExercise =
    exercises.find(
      (exercise) =>
        exercise.id ===
        selectedExerciseId
    );


  const exerciseRecords =
    useMemo(() => {
      let bestWeight = 0;
      let bestVolume = 0;

      exerciseProgress.forEach(
        (session) => {
          bestWeight =
            Math.max(
              bestWeight,
              session.weight
            );

          bestVolume =
            Math.max(
              bestVolume,
              session.volume
            );
        }
      );

      return {
        bestWeight,
        bestVolume,
      };
    }, [exerciseProgress]);


  return (
    <main className="min-h-screen bg-zinc-950 px-4 pb-28 pt-6 text-white">

      <div className="mx-auto max-w-3xl">

        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-green-500">
            ForgeFit Progress
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            📈 Jouw voortgang
          </h1>

          <p className="mt-2 text-zinc-400">
            Overzicht van je opgeslagen trainingen.
          </p>

        </div>


        {workouts.length === 0 ? (
          <div className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6">

            <p className="font-semibold">
              Nog geen afgeronde trainingen
            </p>

            <p className="mt-2 text-sm text-zinc-400">
              Rond eerst een volledige training af. Daarna verschijnen hier je statistieken.
            </p>

          </div>
        ) : (
          <>

            <section className="grid grid-cols-2 gap-3">

              <StatCard
                icon="🏋️"
                label="Trainingen"
                value={String(
                  stats.totalWorkouts
                )}
              />

              <StatCard
                icon="✅"
                label="Sets"
                value={String(
                  stats.totalSets
                )}
              />

              <StatCard
                icon="🔁"
                label="Reps"
                value={String(
                  stats.totalReps
                )}
              />

              <StatCard
                icon="⚖️"
                label="Volume"
                value={`${Math.round(
                  stats.totalVolume
                ).toLocaleString(
                  "nl-NL"
                )} kg`}
              />

            </section>


            <section className="mt-6 rounded-3xl border border-zinc-800 bg-zinc-900 p-5">

              <h2 className="text-xl font-bold">
                Progressie per oefening
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                Kies een oefening om je ontwikkeling te bekijken.
              </p>


              <select
                value={
                  selectedExerciseId
                }
                onChange={(
                  event
                ) => {
                  setSelectedExerciseId(
                    event.target.value
                  );
                }}
                className="mt-5 w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3"
              >

                {exercises.map(
                  (exercise) => (
                    <option
                      key={
                        exercise.id
                      }
                      value={
                        exercise.id
                      }
                    >
                      {exercise.name}
                    </option>
                  )
                )}

              </select>


              {selectedExercise && (
                <div className="mt-5">

                  <p className="text-sm text-zinc-400">
                    Geselecteerde oefening
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    {
                      selectedExercise.name
                    }
                  </p>

                </div>
              )}


              <div className="mt-5 grid grid-cols-2 gap-3">

                <div className="rounded-2xl bg-zinc-950 p-4">

                  <p className="text-sm text-zinc-400">
                    Beste gewicht
                  </p>

                  <p className="mt-1 text-2xl font-bold text-green-500">
                    {
                      exerciseRecords.bestWeight
                    }{" "}
                    kg
                  </p>

                </div>


                <div className="rounded-2xl bg-zinc-950 p-4">

                  <p className="text-sm text-zinc-400">
                    Beste sessievolume
                  </p>

                  <p className="mt-1 text-2xl font-bold text-green-500">
                    {Math.round(
                      exerciseRecords.bestVolume
                    ).toLocaleString(
                      "nl-NL"
                    )}{" "}
                    kg
                  </p>

                </div>

              </div>


              <div className="mt-6 space-y-3">

                {exerciseProgress.length ===
                0 ? (
                  <p className="text-sm text-zinc-500">
                    Nog geen historie voor deze oefening.
                  </p>
                ) : (
                  [...exerciseProgress]
                    .reverse()
                    .map(
                      (
                        session,
                        index
                      ) => (
                        <div
                          key={`${session.workoutId}-${index}`}
                          className="rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
                        >

                          <div className="flex items-start justify-between gap-4">

                            <div>

                              <p className="font-bold">
                                {new Date(
                                  session.date
                                ).toLocaleDateString(
                                  "nl-NL"
                                )}
                              </p>

                              <p className="mt-1 text-sm text-zinc-400">
                                Reps:{" "}
                                {
                                  session.reps
                                }
                              </p>

                            </div>


                            <div className="text-right">

                              <p className="text-xl font-bold text-green-500">
                                {
                                  session.weight
                                }{" "}
                                kg
                              </p>

                              <p className="mt-1 text-xs text-zinc-500">
                                {Math.round(
                                  session.volume
                                ).toLocaleString(
                                  "nl-NL"
                                )}{" "}
                                kg volume
                              </p>

                            </div>

                          </div>

                        </div>
                      )
                    )
                )}

              </div>

            </section>


            <section className="mt-6">

              <h2 className="mb-3 text-xl font-bold">
                Laatste trainingen
              </h2>

              <div className="space-y-3">

                {[...workouts]
                  .reverse()
                  .slice(0, 5)
                  .map(
                    (workout) => (
                      <div
                        key={
                          workout.id
                        }
                        className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4"
                      >

                        <div className="flex items-center justify-between gap-4">

                          <div>

                            <p className="font-bold">
                              {
                                workout.workoutName
                              }
                            </p>

                            <p className="mt-1 text-sm text-zinc-400">
                              {new Date(
                                workout.date
                              ).toLocaleDateString(
                                "nl-NL"
                              )}
                            </p>

                          </div>


                          <div className="text-right">

                            <p className="font-semibold text-green-500">
                              {
                                workout.exercises.length
                              }{" "}
                              oefeningen
                            </p>

                          </div>

                        </div>

                      </div>
                    )
                  )}

              </div>

            </section>

          </>
        )}

      </div>

      <BottomNavigation />

    </main>
  );
}


function StatCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">

      <div className="text-2xl">
        {icon}
      </div>

      <p className="mt-3 text-sm text-zinc-400">
        {label}
      </p>

      <p className="mt-1 text-xl font-bold">
        {value}
      </p>

    </div>
  );
}