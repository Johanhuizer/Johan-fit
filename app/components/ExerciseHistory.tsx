"use client";

import { useState } from "react";

import type {
  Exercise,
  WorkoutSession,
} from "./ExerciseCard";

type ExerciseHistoryProps = {
  exercise: Exercise;

  onClose: () => void;

  onChangeHistory: (
    newHistory: WorkoutSession[]
  ) => void;

  onDeleteSession: (
    deletedSession: WorkoutSession,
    newHistory: WorkoutSession[]
  ) => void;
};

export function ExerciseHistory({
  exercise,
  onClose,
  onChangeHistory,
  onDeleteSession,
}: ExerciseHistoryProps) {
  const newestSessionId =
    exercise.history.length > 0
      ? exercise.history[
          exercise.history.length - 1
        ].id
      : null;

  const [
    openSessionId,
    setOpenSessionId,
  ] = useState<string | null>(
    newestSessionId
  );

  function getBestWeight(): string {
    const weights =
      exercise.history.flatMap(
        (session) =>
          session.sets
            .map((set) =>
              Number(set.weight)
            )
            .filter(
              (weight) =>
                !Number.isNaN(weight)
            )
      );

    if (weights.length === 0) {
      return "-";
    }

    return `${Math.max(...weights)} kg`;
  }

  function getSessionBestWeight(
    session: WorkoutSession
  ): string {
    const weights =
      session.sets
        .map((set) =>
          Number(set.weight)
        )
        .filter(
          (weight) =>
            !Number.isNaN(weight)
        );

    if (weights.length === 0) {
      return "-";
    }

    return `${Math.max(...weights)} kg`;
  }

  function updateSet(
    sessionId: string,
    setIndex: number,
    field: "weight" | "reps",
    value: string
  ) {
    const newHistory =
      exercise.history.map(
        (session) => {
          if (
            session.id !== sessionId
          ) {
            return session;
          }

          return {
            ...session,

            sets: session.sets.map(
              (set, index) => {
                if (
                  index !== setIndex
                ) {
                  return set;
                }

                return {
                  ...set,
                  [field]: value,
                };
              }
            ),
          };
        }
      );

    onChangeHistory(newHistory);
  }

  function addSet(
    sessionId: string
  ) {
    const newHistory =
      exercise.history.map(
        (session) => {
          if (
            session.id !== sessionId
          ) {
            return session;
          }

          return {
            ...session,

            sets: [
              ...session.sets,

              {
                setNumber:
                  session.sets.length + 1,

                weight: "",
                reps: "",
              },
            ],
          };
        }
      );

    onChangeHistory(newHistory);
  }

  function deleteSet(
    sessionId: string,
    setIndex: number
  ) {
    const newHistory =
      exercise.history.map(
        (session) => {
          if (
            session.id !== sessionId
          ) {
            return session;
          }

          const newSets =
            session.sets
              .filter(
                (_, index) =>
                  index !== setIndex
              )
              .map(
                (set, index) => ({
                  ...set,
                  setNumber: index + 1,
                })
              );

          return {
            ...session,
            sets: newSets,
          };
        }
      );

    onChangeHistory(newHistory);
  }

  function deleteSession(
    sessionId: string
  ) {
    const deletedSession =
      exercise.history.find(
        (session) =>
          session.id === sessionId
      );

    if (!deletedSession) {
      return;
    }

    const confirmed =
      window.confirm(
        "Weet je zeker dat je deze volledige trainingssessie wilt verwijderen?"
      );

    if (!confirmed) {
      return;
    }

    const newHistory =
      exercise.history.filter(
        (session) =>
          session.id !== sessionId
      );

    onDeleteSession(
      deletedSession,
      newHistory
    );

    if (
      openSessionId === sessionId
    ) {
      setOpenSessionId(null);
    }
  }

  const displayHistory = [
    ...exercise.history,
  ].reverse();

  return (
    <div className="fixed inset-0 z-50 bg-black/80 overflow-y-auto">

      <div className="min-h-screen p-4 md:p-8">

        <div className="max-w-3xl mx-auto bg-zinc-900 border border-zinc-700 rounded-2xl p-6">

          <div className="flex justify-between items-start gap-4 mb-6">

            <div>
              <p className="text-green-500">
                Trainingshistorie
              </p>

              <h2 className="text-3xl font-bold">
                {exercise.name}
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
                Sessies
              </p>

              <p className="text-2xl font-bold mt-1">
                {exercise.history.length}
              </p>
            </div>

            <div className="bg-zinc-800 rounded-xl p-4">
              <p className="text-zinc-400 text-sm">
                Beste gewicht
              </p>

              <p className="text-2xl font-bold mt-1">
                {getBestWeight()}
              </p>
            </div>

            <div className="bg-zinc-800 rounded-xl p-4">
              <p className="text-zinc-400 text-sm">
                Laatste training
              </p>

              <p className="text-lg font-bold mt-1">
                {displayHistory.length > 0
                  ? new Date(
                      displayHistory[0].date
                    ).toLocaleDateString(
                      "nl-NL"
                    )
                  : "-"}
              </p>
            </div>

          </div>

          {displayHistory.length === 0 ? (

            <div className="bg-zinc-800 rounded-xl p-6 text-zinc-400">
              Voor deze oefening is nog geen historie opgeslagen.
            </div>

          ) : (

            <div className="space-y-3">

              {displayHistory.map(
                (session) => {
                  const isOpen =
                    openSessionId ===
                    session.id;

                  return (
                    <div
                      key={session.id}
                      className="bg-zinc-800 rounded-2xl overflow-hidden"
                    >

                      <button
                        type="button"
                        onClick={() =>
                          setOpenSessionId(
                            isOpen
                              ? null
                              : session.id
                          )
                        }
                        className="w-full flex justify-between items-center gap-4 p-4 text-left hover:bg-zinc-700"
                      >

                        <div>
                          <p className="font-bold">
                            {new Date(
                              session.date
                            ).toLocaleDateString(
                              "nl-NL",
                              {
                                day: "2-digit",
                                month: "long",
                                year: "numeric",
                              }
                            )}
                          </p>

                          <p className="text-zinc-400 text-sm mt-1">
                            {session.sets.length}{" "}
                            {session.sets.length === 1
                              ? "set"
                              : "sets"}
                            {" • "}
                            beste{" "}
                            {getSessionBestWeight(
                              session
                            )}
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

                          <div className="space-y-3">

                            {session.sets.map(
                              (
                                set,
                                setIndex
                              ) => (
                                <div
                                  key={`${session.id}-${setIndex}`}
                                  className="grid grid-cols-[55px_1fr_1fr_44px] gap-2 items-center"
                                >

                                  <span className="text-zinc-400 text-sm">
                                    Set {set.setNumber}
                                  </span>

                                  <input
                                    type="number"
                                    inputMode="decimal"
                                    value={set.weight}
                                    placeholder="KG"
                                    onChange={(
                                      event
                                    ) =>
                                      updateSet(
                                        session.id,
                                        setIndex,
                                        "weight",
                                        event.target.value
                                      )
                                    }
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3"
                                  />

                                  <input
                                    type="number"
                                    inputMode="numeric"
                                    value={set.reps}
                                    placeholder="Reps"
                                    onChange={(
                                      event
                                    ) =>
                                      updateSet(
                                        session.id,
                                        setIndex,
                                        "reps",
                                        event.target.value
                                      )
                                    }
                                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3"
                                  />

                                  <button
                                    type="button"
                                    onClick={() =>
                                      deleteSet(
                                        session.id,
                                        setIndex
                                      )
                                    }
                                    className="h-11 bg-zinc-900 hover:bg-red-950 text-red-400 rounded-lg"
                                  >
                                    ✕
                                  </button>

                                </div>
                              )
                            )}

                          </div>

                          <div className="flex flex-col sm:flex-row justify-between gap-3 mt-5">

                            <button
                              type="button"
                              onClick={() =>
                                addSet(
                                  session.id
                                )
                              }
                              className="bg-zinc-700 hover:bg-zinc-600 px-4 py-2 rounded-xl text-sm font-medium"
                            >
                              ＋ Set toevoegen
                            </button>

                            <button
                              type="button"
                              onClick={() =>
                                deleteSession(
                                  session.id
                                )
                              }
                              className="bg-red-950 hover:bg-red-900 border border-red-900 text-red-400 px-4 py-2 rounded-xl text-sm"
                            >
                              🗑️ Sessie verwijderen
                            </button>

                          </div>

                        </div>
                      )}

                    </div>
                  );
                }
              )}

            </div>
          )}

          <div className="mt-8">

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-green-600 hover:bg-green-700 rounded-xl p-4 font-bold"
            >
              ✓ Klaar
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}