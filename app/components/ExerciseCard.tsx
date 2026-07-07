"use client";

import type {
  CoachSet,
} from "../lib/coachEngine";

import {
  exerciseMedia,
} from "../lib/exerciseMedia";

export type WorkoutSet = {
  setNumber: number;
  weight: string;
  reps: string;
};

export type WorkoutSession = {
  id: string;
  date: string;
  sets: WorkoutSet[];
};

 export type Exercise = {
  id: string;
  name: string;
  muscle: string;
  targetSets: number;
  weightStep?: number;
  history: WorkoutSession[];
};

export type WorkoutPlan = {
  id: string;
  name: string;
  exercises: Exercise[];
};

type ExerciseCardProps = {
  exercise: Exercise;
  sets: WorkoutSet[];
  coachSets?: CoachSet[];
  coachMessage?: string;
  menuOpen: boolean;

  onToggleMenu: () => void;
  onEdit: () => void;
  onHistory: () => void;

  onUpdateSet: (
    setIndex: number,
    field: "weight" | "reps",
    value: string
  ) => void;

  onUpdateCoachSet?: (
    setIndex: number,
    field: "actualWeight" | "actualReps",
    value: string
  ) => void;

  onCompleteCoachSet?: (
    setIndex: number
  ) => void;

  onSave: () => void;
};

export function ExerciseCard({
  exercise,
  sets,
  coachSets,
  coachMessage,
  menuOpen,
  onToggleMenu,
  onEdit,
  onHistory,
  onUpdateSet,
  onUpdateCoachSet,
  onCompleteCoachSet,
  onSave,
}: ExerciseCardProps) {
  const lastSession =
    exercise.history.length > 0
      ? exercise.history[
          exercise.history.length - 1
        ]
      : null;

  const coachMode =
    Array.isArray(coachSets) &&
    coachSets.length > 0;

  const media =
    exerciseMedia[exercise.id];

  return (
    <section className="overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">

      <div className="relative h-64 bg-zinc-900">

{media?.animationUrl ? (
  <img
    src={media.animationUrl}
    alt={`${exercise.name} uitvoering`}
    className="h-full w-full object-contain"
  />
) : null}
        

        <div className="absolute right-4 top-4">

          <button
            type="button"
            onClick={onToggleMenu}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950/90 text-2xl"
          >
            ⋮
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-14 z-30 w-56 overflow-hidden rounded-2xl border border-zinc-700 bg-zinc-900 shadow-2xl">

              <button
                type="button"
                onClick={onEdit}
                className="w-full px-4 py-4 text-left hover:bg-zinc-800"
              >
                ✏️ Oefening bewerken
              </button>

              <button
                type="button"
                onClick={onHistory}
                className="w-full border-t border-zinc-800 px-4 py-4 text-left hover:bg-zinc-800"
              >
                📅 Historie bekijken
              </button>

            </div>
          )}

        </div>

      </div>


      <div className="p-5">

        <div className="mb-5">

          <div className="flex items-start justify-between gap-4">

            <div>
              <h2 className="text-2xl font-bold leading-tight">
                {exercise.name}
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                {exercise.muscle}
                {" • "}
                {exercise.targetSets} sets
              </p>
            </div>

            {coachMode && (
              <div className="shrink-0 rounded-full border border-green-800 bg-green-950 px-3 py-1 text-xs font-bold text-green-400">
                🧠 Coach
              </div>
            )}

          </div>

        </div>


        <div className="mb-5 grid grid-cols-3 gap-2">

          <button
            type="button"
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm font-medium"
          >
            ⓘ Info
          </button>

          <button
            type="button"
            onClick={onEdit}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm font-medium"
          >
            ⇄ Swap
          </button>

          <button
            type="button"
            onClick={onHistory}
            className="rounded-xl border border-zinc-800 bg-zinc-900 px-3 py-3 text-sm font-medium"
          >
            ◷ History
          </button>

        </div>


        <div className="mb-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">

          <div className="mb-3 flex items-center justify-between">

            <span className="text-sm font-medium text-zinc-400">
              Vorige training
            </span>

            {lastSession && (
              <span className="text-xs text-zinc-500">
                Laatste sessie
              </span>
            )}

          </div>

          {!lastSession ? (
            <p className="text-sm text-zinc-500">
              Nog geen training opgeslagen
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">

              {lastSession.sets.map(
                (set, index) => (
                  <div
                    key={`${lastSession.id}-${index}`}
                    className="rounded-lg bg-zinc-800 px-3 py-2 text-sm"
                  >
                    <span className="text-zinc-500">
                      {set.setNumber}.
                    </span>{" "}
                    <span className="font-bold">
                      {set.weight} kg
                    </span>
                    {" × "}
                    <span className="font-bold">
                      {set.reps}
                    </span>
                  </div>
                )
              )}

            </div>
          )}

        </div>


        {coachMessage && (
          <div className="mb-4 rounded-2xl border border-green-800 bg-green-950/60 p-4 text-sm text-green-300">
            🧠 {coachMessage}
          </div>
        )}


        {coachMode && coachSets ? (
          <div>

            <div className="mb-2 grid grid-cols-[42px_1fr_1fr_52px] items-center gap-2 px-1 text-center text-xs font-medium uppercase tracking-wide text-zinc-500">

              <span>
                Set
              </span>

              <span>
                Reps
              </span>

              <span>
                Kg
              </span>

              <span>
                ✓
              </span>

            </div>


            <div className="space-y-2">

              {coachSets.map(
                (
                  coachSet,
                  index
                ) => (
                  <div
                    key={`${exercise.id}-coach-${coachSet.setNumber}`}
                    className={`grid grid-cols-[42px_1fr_1fr_52px] items-center gap-2 rounded-xl border p-2 ${
                      coachSet.completed
                        ? "border-green-900 bg-green-950/30"
                        : "border-zinc-800 bg-zinc-900"
                    }`}
                  >

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 font-bold">
                      {coachSet.setNumber}
                    </div>


                    <div>

                      <input
                        type="number"
                        inputMode="numeric"
                        placeholder={
                          coachSet.plannedReps ||
                          "Reps"
                        }
                        value={
                          coachSet.actualReps
                        }
                        disabled={
                          coachSet.completed
                        }
                        onChange={(
                          event
                        ) => {
                          onUpdateCoachSet?.(
                            index,
                            "actualReps",
                            event.target.value
                          );
                        }}
                        className="h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-2 text-center font-bold disabled:opacity-60"
                      />

                      {!coachSet.completed && (
                        <p className="mt-1 text-center text-[10px] text-zinc-500">
                          doel{" "}
                          {coachSet.plannedReps ||
                            "-"}
                        </p>
                      )}

                    </div>


                    <div>

                      <input
                        type="number"
                        inputMode="decimal"
                        placeholder={
                          coachSet.plannedWeight ||
                          "Kg"
                        }
                        value={
                          coachSet.actualWeight
                        }
                        disabled={
                          coachSet.completed
                        }
                        onChange={(
                          event
                        ) => {
                          onUpdateCoachSet?.(
                            index,
                            "actualWeight",
                            event.target.value
                          );
                        }}
                        className="h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-2 text-center font-bold disabled:opacity-60"
                      />

                      {!coachSet.completed && (
                        <p className="mt-1 text-center text-[10px] text-zinc-500">
                          doel{" "}
                          {coachSet.plannedWeight ||
                            "-"}
                        </p>
                      )}

                    </div>


                    <button
                      type="button"
                      disabled={
                        coachSet.completed
                      }
                      onClick={() => {
                        onCompleteCoachSet?.(
                          index
                        );
                      }}
                      className={`flex h-11 w-full items-center justify-center rounded-lg text-xl font-bold ${
                        coachSet.completed
                          ? "bg-green-600 text-white"
                          : "bg-zinc-800 text-zinc-400 hover:bg-green-600 hover:text-white"
                      }`}
                    >
                      ✓
                    </button>

                  </div>
                )
              )}

            </div>

          </div>
        ) : (
          <div>

            <div className="mb-2 grid grid-cols-[42px_1fr_1fr] items-center gap-2 px-1 text-center text-xs font-medium uppercase tracking-wide text-zinc-500">

              <span>
                Set
              </span>

              <span>
                Reps
              </span>

              <span>
                Kg
              </span>

            </div>


            <div className="space-y-2">

              {sets.map(
                (
                  set,
                  index
                ) => (
                  <div
                    key={`${exercise.id}-set-${index}`}
                    className="grid grid-cols-[42px_1fr_1fr] items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 p-2"
                  >

                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 font-bold">
                      {set.setNumber}
                    </div>

                    <input
                      type="number"
                      inputMode="numeric"
                      placeholder="Reps"
                      value={set.reps}
                      onChange={(
                        event
                      ) =>
                        onUpdateSet(
                          index,
                          "reps",
                          event.target.value
                        )
                      }
                      className="h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-2 text-center font-bold"
                    />

                    <input
                      type="number"
                      inputMode="decimal"
                      placeholder="Kg"
                      value={set.weight}
                      onChange={(
                        event
                      ) =>
                        onUpdateSet(
                          index,
                          "weight",
                          event.target.value
                        )
                      }
                      className="h-11 w-full rounded-lg border border-zinc-700 bg-zinc-950 px-2 text-center font-bold"
                    />

                  </div>
                )
              )}

            </div>

          </div>
        )}


        <button
          type="button"
          onClick={onSave}
          className="mt-5 w-full rounded-2xl bg-green-600 p-4 text-lg font-bold hover:bg-green-700"
        >
          Oefening opslaan
        </button>

      </div>

    </section>
  );
}