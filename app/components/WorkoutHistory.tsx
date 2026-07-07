"use client";

import { useState } from "react";

import type {
  WorkoutSet,
} from "./ExerciseCard";

export type CompletedWorkoutExercise = {
  exerciseId: string;
  exerciseName: string;
  muscle: string;
  sets: WorkoutSet[];
};

export type CompletedWorkout = {
  id: string;
  workoutId: string;
  workoutName: string;
  date: string;
  durationSeconds: number;
  exercises: CompletedWorkoutExercise[];
};

type WorkoutHistoryProps = {
  workouts: CompletedWorkout[];
  onClose: () => void;
  onDeleteWorkout: (
    workoutId: string
  ) => void;
};

function formatDuration(
  totalSeconds: number
): string {
  const safeSeconds =
    Number.isFinite(totalSeconds)
      ? Math.max(0, totalSeconds)
      : 0;

  const hours = Math.floor(
    safeSeconds / 3600
  );

  const minutes = Math.floor(
    (safeSeconds % 3600) / 60
  );

  const seconds =
    safeSeconds % 60;

  if (hours > 0) {
    return [
      hours,
      minutes
        .toString()
        .padStart(2, "0"),
      seconds
        .toString()
        .padStart(2, "0"),
    ].join(":");
  }

  return [
    minutes,
    seconds
      .toString()
      .padStart(2, "0"),
  ].join(":");
}

export function WorkoutHistory({
  workouts,
  onClose,
  onDeleteWorkout,
}: WorkoutHistoryProps) {
  const [
    openWorkoutId,
    setOpenWorkoutId,
  ] = useState<string | null>(
    workouts.length > 0
      ? workouts[
          workouts.length - 1
        ].id
      : null
  );

  function calculateWorkoutSets(
    workout: CompletedWorkout
  ): number {
    return workout.exercises.reduce(
      (total, exercise) =>
        total + exercise.sets.length,
      0
    );
  }

  function calculateWorkoutVolume(
    workout: CompletedWorkout
  ): number {
    return workout.exercises.reduce(
      (workoutTotal, exercise) => {
        const exerciseVolume =
          exercise.sets.reduce(
            (setTotal, set) => {
              const weight =
                Number(set.weight);

              const reps =
                Number(set.reps);

              if (
                Number.isNaN(weight) ||
                Number.isNaN(reps)
              ) {
                return setTotal;
              }

              return (
                setTotal +
                weight * reps
              );
            },
            0
          );

        return (
          workoutTotal +
          exerciseVolume
        );
      },
      0
    );
  }

  function deleteWorkout(
    workoutId: string
  ) {
    const confirmed =
      window.confirm(
        "Weet je zeker dat je deze volledige training uit de geschiedenis wilt verwijderen?"
      );

    if (!confirmed) {
      return;
    }

    onDeleteWorkout(workoutId);

    if (
      openWorkoutId === workoutId
    ) {
      setOpenWorkoutId(null);
    }
  }

  const displayWorkouts = [
    ...workouts,
  ].reverse();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 overflow-y-auto">

      <div className="min-h-screen p-4 md:p-8">

        <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-700 rounded-2xl p-6">

          <div className="flex items-start justify-between gap-4 mb-6">

            <div>
              <p className="text-green-500">
                Trainingsgeschiedenis
              </p>

              <h2 className="text-3xl font-bold">
                Afgeronde trainingen
              </h2>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl"
            >
              ✕ Sluiten
            </button>

          </div>

          <div className="grid grid-cols-2 gap-3 mb-6">

            <div className="bg-zinc-800 rounded-xl p-4">

              <p className="text-zinc-400 text-sm">
                Trainingen
              </p>

              <p className="text-2xl font-bold mt-1">
                {workouts.length}
              </p>

            </div>

            <div className="bg-zinc-800 rounded-xl p-4">

              <p className="text-zinc-400 text-sm">
                Laatste training
              </p>

              <p className="text-lg font-bold mt-1">
                {displayWorkouts.length > 0
                  ? new Date(
                      displayWorkouts[0].date
                    ).toLocaleDateString(
                      "nl-NL"
                    )
                  : "-"}
              </p>

            </div>

          </div>

          {displayWorkouts.length === 0 ? (

            <div className="bg-zinc-800 rounded-xl p-6 text-zinc-400">
              Er zijn nog geen complete trainingen afgerond.
            </div>

          ) : (

            <div className="space-y-4">

              {displayWorkouts.map(
                (workout) => {
                  const isOpen =
                    openWorkoutId ===
                    workout.id;

                  const totalSets =
                    calculateWorkoutSets(
                      workout
                    );

                  const totalVolume =
                    calculateWorkoutVolume(
                      workout
                    );

                  return (
                    <div
                      key={workout.id}
                      className="bg-zinc-800 rounded-2xl overflow-hidden"
                    >

                      <button
                        type="button"
                        onClick={() =>
                          setOpenWorkoutId(
                            isOpen
                              ? null
                              : workout.id
                          )
                        }
                        className="w-full flex items-center justify-between gap-4 p-4 text-left hover:bg-zinc-700"
                      >

                        <div>

                          <h3 className="text-xl font-bold">
                            {workout.workoutName}
                          </h3>

                          <p className="text-zinc-400 mt-1">
                            {new Date(
                              workout.date
                            ).toLocaleDateString(
                              "nl-NL",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>

                          <p className="text-green-500 text-sm mt-1">
                            {
                              workout.exercises
                                .length
                            }{" "}
                            oefeningen
                            {" • "}
                            {totalSets} sets
                            {" • "}
                            {formatDuration(
                              workout.durationSeconds ??
                                0
                            )}
                            {" • "}
                            {totalVolume.toLocaleString(
                              "nl-NL"
                            )}{" "}
                            kg volume
                          </p>

                        </div>

                        <span className="text-xl text-zinc-400">
                          {isOpen
                            ? "▲"
                            : "▼"}
                        </span>

                      </button>

                      {isOpen && (

                        <div className="border-t border-zinc-700 p-4">

                          <div className="grid grid-cols-2 gap-3 mb-4">

                            <div className="bg-zinc-900 rounded-xl p-4">

                              <p className="text-zinc-400 text-sm">
                                Trainingsduur
                              </p>

                              <p className="text-xl font-bold mt-1">
                                {formatDuration(
                                  workout.durationSeconds ??
                                    0
                                )}
                              </p>

                            </div>

                            <div className="bg-zinc-900 rounded-xl p-4">

                              <p className="text-zinc-400 text-sm">
                                Volume
                              </p>

                              <p className="text-xl font-bold mt-1">
                                {totalVolume.toLocaleString(
                                  "nl-NL"
                                )}{" "}
                                kg
                              </p>

                            </div>

                          </div>

                          <div className="space-y-4">

                            {workout.exercises.map(
                              (exercise) => (

                                <div
                                  key={
                                    exercise.exerciseId
                                  }
                                  className="bg-zinc-900 rounded-xl p-4"
                                >

                                  <div className="mb-3">

                                    <h4 className="font-bold text-lg">
                                      {
                                        exercise.exerciseName
                                      }
                                    </h4>

                                    <p className="text-green-500 text-sm">
                                      {
                                        exercise.muscle
                                      }
                                    </p>

                                  </div>

                                  <div className="space-y-2">

                                    {exercise.sets.map(
                                      (
                                        set,
                                        index
                                      ) => (

                                        <div
                                          key={`${exercise.exerciseId}-${index}`}
                                          className="flex items-center justify-between bg-zinc-800 rounded-lg p-3"
                                        >

                                          <span className="text-zinc-400">
                                            Set{" "}
                                            {index + 1}
                                          </span>

                                          <span className="font-bold">
                                            {
                                              set.weight
                                            }{" "}
                                            kg ×{" "}
                                            {
                                              set.reps
                                            }
                                          </span>

                                        </div>
                                      )
                                    )}

                                  </div>

                                </div>
                              )
                            )}

                          </div>

                          <button
                            type="button"
                            onClick={() =>
                              deleteWorkout(
                                workout.id
                              )
                            }
                            className="w-full mt-5 bg-red-950 hover:bg-red-900 border border-red-900 text-red-400 rounded-xl p-3 font-medium"
                          >
                            🗑️ Training verwijderen
                          </button>

                        </div>
                      )}

                    </div>
                  );
                }
              )}

            </div>
          )}

          <button
            type="button"
            onClick={onClose}
            className="w-full mt-8 bg-green-600 hover:bg-green-700 rounded-xl p-4 font-bold"
          >
            ✓ Klaar
          </button>

        </div>

      </div>

    </div>
  );
}