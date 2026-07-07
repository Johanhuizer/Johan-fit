"use client";

import type {
  Exercise,
  WorkoutSet,
} from "./ExerciseCard";

type CompletedExercise = {
  exercise: Exercise;
  sets: WorkoutSet[];
};

type WorkoutSummaryProps = {
  workoutName: string;
  completedExercises: CompletedExercise[];
  durationSeconds: number;
  onClose: () => void;
  onFinish: () => void;
};

function formatDuration(
  totalSeconds: number
): string {
  const hours = Math.floor(
    totalSeconds / 3600
  );

  const minutes = Math.floor(
    (totalSeconds % 3600) / 60
  );

  const seconds =
    totalSeconds % 60;

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

export function WorkoutSummary({
  workoutName,
  completedExercises,
  durationSeconds,
  onClose,
  onFinish,
}: WorkoutSummaryProps) {
  const totalSets =
    completedExercises.reduce(
      (total, item) =>
        total + item.sets.length,
      0
    );

  const totalVolume =
    completedExercises.reduce(
      (workoutTotal, item) => {
        const exerciseVolume =
          item.sets.reduce(
            (
              exerciseTotal,
              set
            ) => {
              const weight =
                Number(set.weight);

              const reps =
                Number(set.reps);

              if (
                Number.isNaN(weight) ||
                Number.isNaN(reps)
              ) {
                return exerciseTotal;
              }

              return (
                exerciseTotal +
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

  return (
    <div className="fixed inset-0 z-50 bg-black/80 overflow-y-auto">

      <div className="min-h-screen p-4 md:p-8">

        <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-700 rounded-2xl p-6">

          <div className="flex items-start justify-between gap-4 mb-6">

            <div>
              <p className="text-green-500">
                Training afronden
              </p>

              <h2 className="text-3xl font-bold">
                {workoutName}
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

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">

            <div className="bg-zinc-800 rounded-xl p-4">

              <p className="text-zinc-400 text-sm">
                Oefeningen
              </p>

              <p className="text-2xl font-bold mt-1">
                {
                  completedExercises.length
                }
              </p>

            </div>

            <div className="bg-zinc-800 rounded-xl p-4">

              <p className="text-zinc-400 text-sm">
                Totaal sets
              </p>

              <p className="text-2xl font-bold mt-1">
                {totalSets}
              </p>

            </div>

            <div className="bg-zinc-800 rounded-xl p-4">

              <p className="text-zinc-400 text-sm">
                Trainingsduur
              </p>

              <p className="text-2xl font-bold mt-1">
                {formatDuration(
                  durationSeconds
                )}
              </p>

            </div>

          </div>

          <div className="bg-zinc-800 rounded-xl p-4 mb-6">

            <p className="text-zinc-400 text-sm">
              Trainingsvolume
            </p>

            <p className="text-3xl font-bold mt-1">
              {totalVolume.toLocaleString(
                "nl-NL"
              )}{" "}
              kg
            </p>

          </div>

          {completedExercises.length ===
          0 ? (

            <div className="bg-zinc-800 rounded-xl p-6 text-zinc-400">
              Er zijn nog geen oefeningen opgeslagen voor deze training.
            </div>

          ) : (

            <div className="space-y-4">

              {completedExercises.map(
                (item) => (

                  <div
                    key={
                      item.exercise.id
                    }
                    className="bg-zinc-800 rounded-2xl p-4"
                  >

                    <div className="mb-4">

                      <h3 className="text-xl font-bold">
                        {
                          item.exercise
                            .name
                        }
                      </h3>

                      <p className="text-green-500 text-sm">
                        {
                          item.exercise
                            .muscle
                        }
                      </p>

                    </div>

                    <div className="space-y-2">

                      {item.sets.map(
                        (
                          set,
                          index
                        ) => (

                          <div
                            key={`${item.exercise.id}-${index}`}
                            className="flex items-center justify-between bg-zinc-900 rounded-lg p-3"
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
                              {set.reps}
                            </span>

                          </div>
                        )
                      )}

                    </div>

                  </div>
                )
              )}

            </div>
          )}

          <div className="flex gap-3 mt-8">

            <button
              type="button"
              onClick={onClose}
              className="w-1/2 bg-zinc-800 hover:bg-zinc-700 rounded-xl p-4 font-bold"
            >
              Terug
            </button>

            <button
              type="button"
              onClick={onFinish}
              disabled={
                completedExercises.length ===
                0
              }
              className="w-1/2 bg-green-600 hover:bg-green-700 disabled:bg-zinc-700 disabled:text-zinc-500 disabled:cursor-not-allowed rounded-xl p-4 font-bold"
            >
              ✓ Training afronden
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}