"use client";

import { useEffect, useState } from "react";

import type { Exercise } from "./ExerciseCard";

type EditExerciseModalProps = {
  exercise: Exercise;
  onClose: () => void;

  onSave: (
    exerciseId: string,
    name: string,
    muscle: string,
    targetSets: number
  ) => void;
};

export function EditExerciseModal({
  exercise,
  onClose,
  onSave,
}: EditExerciseModalProps) {
  const [name, setName] = useState(
    exercise.name
  );

  const [muscle, setMuscle] = useState(
    exercise.muscle
  );

  const [targetSets, setTargetSets] =
    useState(exercise.targetSets);

  useEffect(() => {
    setName(exercise.name);
    setMuscle(exercise.muscle);
    setTargetSets(exercise.targetSets);
  }, [exercise]);

  function handleSave() {
    const cleanName = name.trim();
    const cleanMuscle = muscle.trim();

    if (cleanName === "") {
      window.alert(
        "Vul een naam voor de oefening in."
      );
      return;
    }

    if (cleanMuscle === "") {
      window.alert(
        "Vul een spiergroep in."
      );
      return;
    }

    if (
      targetSets < 1 ||
      targetSets > 10
    ) {
      window.alert(
        "Het aantal sets moet tussen 1 en 10 liggen."
      );
      return;
    }

    onSave(
      exercise.id,
      cleanName,
      cleanMuscle,
      targetSets
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">

      <div className="w-full max-w-lg bg-zinc-900 border border-zinc-700 rounded-2xl p-6 shadow-2xl">

        <div className="flex items-start justify-between gap-4 mb-6">

          <div>
            <p className="text-green-500">
              Oefening aanpassen
            </p>

            <h2 className="text-3xl font-bold">
              Bewerken
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-xl"
          >
            ✕
          </button>

        </div>

        <label className="block text-zinc-400 mb-2">
          Naam oefening
        </label>

        <input
          type="text"
          value={name}
          onChange={(event) =>
            setName(event.target.value)
          }
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 mb-4"
        />

        <label className="block text-zinc-400 mb-2">
          Spiergroep
        </label>

        <input
          type="text"
          value={muscle}
          onChange={(event) =>
            setMuscle(event.target.value)
          }
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 mb-4"
        />

        <label className="block text-zinc-400 mb-2">
          Aantal sets
        </label>

        <input
          type="number"
          min={1}
          max={10}
          value={targetSets}
          onChange={(event) => {
            const value = Number(
              event.target.value
            );

            setTargetSets(value);
          }}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 mb-6"
        />

        <div className="flex gap-3">

          <button
            type="button"
            onClick={onClose}
            className="w-1/2 bg-zinc-800 hover:bg-zinc-700 rounded-xl p-3 font-bold"
          >
            Annuleren
          </button>

          <button
            type="button"
            onClick={handleSave}
            className="w-1/2 bg-green-600 hover:bg-green-700 rounded-xl p-3 font-bold"
          >
            Opslaan
          </button>

        </div>

      </div>

    </div>
  );
}