"use client";

import {
  useMemo,
  useState,
} from "react";

import {
  exerciseCategories,
  exerciseLibrary,
  type LibraryExercise,
} from "../lib/exerciseLibrary";


type ExercisePickerProps = {
  title?: string;

  onClose: () => void;

  onSelect: (
    exercise: LibraryExercise
  ) => void;
};


export function ExercisePicker({
  title = "Oefening kiezen",
  onClose,
  onSelect,
}: ExercisePickerProps) {
  const [
    search,
    setSearch,
  ] = useState("");

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("Alle");


  const filteredExercises =
    useMemo(() => {
      const searchValue =
        search
          .trim()
          .toLowerCase();

      return exerciseLibrary.filter(
        (exercise) => {
          const matchesCategory =
            selectedCategory ===
              "Alle" ||
            exercise.category ===
              selectedCategory;

          const matchesSearch =
            searchValue === "" ||
            exercise.name
              .toLowerCase()
              .includes(
                searchValue
              ) ||
            exercise.muscle
              .toLowerCase()
              .includes(
                searchValue
              );

          return (
            matchesCategory &&
            matchesSearch
          );
        }
      );
    }, [
      search,
      selectedCategory,
    ]);


  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center">

      <div className="flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-zinc-700 bg-zinc-950 sm:rounded-3xl">

        {/* HEADER */}

        <div className="flex items-center justify-between border-b border-zinc-800 p-4">

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-green-500">
              ForgeFit Library
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              {title}
            </h2>
          </div>


          <button
            type="button"
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-900 text-xl text-zinc-300 hover:bg-zinc-800"
          >
            ✕
          </button>

        </div>


        {/* ZOEKEN */}

        <div className="border-b border-zinc-800 p-4">

          <input
            type="search"
            value={search}
            onChange={(
              event
            ) => {
              setSearch(
                event.target.value
              );
            }}
            placeholder="Zoek een oefening..."
            className="w-full rounded-2xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none placeholder:text-zinc-500 focus:border-green-600"
          />


          {/* FILTERS */}

          <div className="mt-3 flex gap-2 overflow-x-auto pb-2">

            {exerciseCategories.map(
              (category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(
                      category
                    );
                  }}
                  className={`shrink-0 rounded-full border px-4 py-2 text-sm font-semibold ${
                    selectedCategory ===
                    category
                      ? "border-green-600 bg-green-600 text-white"
                      : "border-zinc-700 bg-zinc-900 text-zinc-300"
                  }`}
                >
                  {category}
                </button>
              )
            )}

          </div>

        </div>


        {/* LIJST */}

        <div className="flex-1 overflow-y-auto p-4">

          {filteredExercises.length ===
          0 ? (
            <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center">

              <p className="font-bold text-white">
                Geen oefeningen gevonden
              </p>

              <p className="mt-2 text-sm text-zinc-400">
                Probeer een andere zoekterm of spiergroep.
              </p>

            </div>
          ) : (
            <div className="space-y-2">

              {filteredExercises.map(
                (exercise) => (
                  <button
                    key={
                      exercise.id
                    }
                    type="button"
                    onClick={() => {
                      onSelect(
                        exercise
                      );
                    }}
                    className="w-full rounded-2xl border border-zinc-800 bg-zinc-900 p-4 text-left hover:border-green-800 hover:bg-zinc-800"
                  >
                    <div className="flex items-center justify-between gap-4">

                      <div>
                        <p className="font-bold text-white">
                          {
                            exercise.name
                          }
                        </p>

                        <p className="mt-1 text-sm text-zinc-400">
                          {
                            exercise.muscle
                          }
                          {" • "}
                          {
                            exercise.targetSets
                          }{" "}
                          sets
                        </p>
                      </div>


                      <div className="shrink-0 text-2xl text-green-500">
                        ＋
                      </div>

                    </div>
                  </button>
                )
              )}

            </div>
          )}

        </div>


        {/* FOOTER */}

        <div className="border-t border-zinc-800 bg-zinc-950 p-4">

          <p className="text-center text-sm text-zinc-500">
            {
              filteredExercises.length
            }{" "}
            oefeningen gevonden
          </p>

        </div>

      </div>

    </div>
  );
}