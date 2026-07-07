"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Header from "./components/Header";
import ProfileForm from "./components/ProfileForm";

import {
  getUser,
  getWeight,
  getGoal,
} from "./lib/storage";

type CompletedWorkoutInfo = {
  workoutId: string;
};

type WorkoutId =
  | "push-a"
  | "pull-a"
  | "legs-a"
  | "push-b"
  | "pull-b";

export default function Home() {
  const router = useRouter();

  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("");

  const [user, setUser] =
    useState<string | null>(null);

  const [loaded, setLoaded] =
    useState(false);

  const [nextWorkout, setNextWorkout] =
    useState<WorkoutId>("push-a");

  const [
    chooseWorkoutOpen,
    setChooseWorkoutOpen,
  ] = useState(false);

  useEffect(() => {
    const savedUser = getUser();

    setUser(savedUser);
    setWeight(getWeight() ?? "");
    setGoal(getGoal() ?? "");

    const savedHistory =
      localStorage.getItem(
        "forgefit-completed-workouts"
      );

    if (savedHistory) {
      try {
        const history:
          CompletedWorkoutInfo[] =
            JSON.parse(savedHistory);

        const lastWorkout =
          history[history.length - 1];

        const previousWorkout =
          history[history.length - 2];

        if (
          lastWorkout?.workoutId ===
          "push-a"
        ) {
          setNextWorkout("pull-a");
        } else if (
          lastWorkout?.workoutId ===
          "pull-a"
        ) {
          setNextWorkout("legs-a");
        } else if (
          lastWorkout?.workoutId ===
          "push-b"
        ) {
          setNextWorkout("pull-b");
        } else if (
          lastWorkout?.workoutId ===
          "pull-b"
        ) {
          setNextWorkout("legs-a");
        } else if (
          lastWorkout?.workoutId ===
          "legs-a"
        ) {
          if (
            previousWorkout?.workoutId ===
            "pull-a"
          ) {
            setNextWorkout("push-b");
          } else {
            setNextWorkout("push-a");
          }
        }
      } catch (error) {
        console.error(
          "Trainingsgeschiedenis kon niet worden gelezen:",
          error
        );
      }
    }

    setLoaded(true);
  }, []);

  if (!loaded) {
    return (
      <main className="min-h-screen bg-zinc-950 text-white" />
    );
  }

  if (!user) {
    return (
      <ProfileForm
        onSave={(name: string) => {
          setUser(name);
          setWeight(getWeight() ?? "");
          setGoal(getGoal() ?? "");
        }}
      />
    );
  }

  const nextWorkoutName =
    nextWorkout === "push-a"
      ? "Push A"
      : nextWorkout === "pull-a"
        ? "Pull A"
        : nextWorkout === "legs-a"
          ? "Legs A"
          : nextWorkout === "push-b"
            ? "Push B"
            : "Pull B";

  const nextWorkoutMuscles =
    nextWorkout === "push-a" ||
    nextWorkout === "push-b"
      ? "Borst • Schouders • Triceps"
      : nextWorkout === "pull-a" ||
          nextWorkout === "pull-b"
        ? "Rug • Achterste schouders • Biceps"
        : "Quadriceps • Hamstrings • Billen • Kuiten";

  const nextWorkoutRoute =
    nextWorkout === "push-a"
      ? "/workout"
      : nextWorkout === "pull-a"
        ? "/workout/pull-a"
        : nextWorkout === "legs-a"
          ? "/workout/legs-a"
          : nextWorkout === "push-b"
            ? "/workout/push-b"
            : "/workout/pull-b";

  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-28">
      <Header />

      <div className="mx-auto max-w-5xl px-4 py-4 sm:p-6">

        {/* WELKOM */}
        <section className="mb-5">
          <p className="text-sm text-zinc-400 sm:text-base">
            Welkom terug
          </p>

          <h1 className="mt-1 text-3xl font-bold sm:text-4xl">
            {user}
          </h1>

          <p className="mt-1 text-sm text-green-500 sm:mt-2 sm:text-base">
            Klaar om sterker te worden?
          </p>
        </section>


        {/* COACHADVIES EERST OP MOBIEL */}
        <section className="mb-5 rounded-2xl border border-green-800 bg-zinc-900 p-4 sm:p-6">
          <p className="text-xs font-bold text-green-500 sm:text-sm">
            COACHADVIES
          </p>

          <div className="mt-2 flex items-start justify-between gap-4">
            <div>
              <p className="text-sm text-zinc-400">
                Volgende training
              </p>

              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                {nextWorkoutName}
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                {nextWorkoutMuscles}
              </p>
            </div>

            <div className="text-3xl">
              🏋️
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              router.push(nextWorkoutRoute);
            }}
            className="mt-4 w-full rounded-xl bg-green-600 p-4 text-base font-bold hover:bg-green-700 sm:text-xl"
          >
            💪 START TRAINING
          </button>

          <button
            type="button"
            onClick={() => {
              setChooseWorkoutOpen(
                (previous) => !previous
              );
            }}
            className="mt-2 w-full p-2 text-sm text-zinc-400 hover:text-white"
          >
            Andere training kiezen
          </button>

          {chooseWorkoutOpen && (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">

              <WorkoutButton
                name="Push A"
                onClick={() =>
                  router.push("/workout")
                }
              />

              <WorkoutButton
                name="Pull A"
                onClick={() =>
                  router.push(
                    "/workout/pull-a"
                  )
                }
              />

              <WorkoutButton
                name="Legs A"
                onClick={() =>
                  router.push(
                    "/workout/legs-a"
                  )
                }
              />

              <WorkoutButton
                name="Push B"
                onClick={() =>
                  router.push(
                    "/workout/push-b"
                  )
                }
              />

              <WorkoutButton
                name="Pull B"
                onClick={() =>
                  router.push(
                    "/workout/pull-b"
                  )
                }
              />

            </div>
          )}
        </section>


        {/* COMPACTE INFO */}
        <section className="grid grid-cols-2 gap-3 md:grid-cols-3">

          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="text-2xl">
              ⚖️
            </div>

            <p className="mt-2 text-sm text-zinc-400">
              Gewicht
            </p>

            <p className="mt-1 text-xl font-bold">
              {weight
                ? `${weight} kg`
                : "Niet ingevuld"}
            </p>
          </div>


          <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
            <div className="text-2xl">
              🎯
            </div>

            <p className="mt-2 text-sm text-zinc-400">
              Doel
            </p>

            <p className="mt-1 text-base font-bold">
              {goal ||
                "Geen doel ingesteld"}
            </p>
          </div>


          <div className="col-span-2 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:col-span-1">
            <div className="text-2xl">
              📈
            </div>

            <p className="mt-2 text-sm text-zinc-400">
              Voortgang
            </p>

            <button
              type="button"
              onClick={() => {
                router.push("/progress");
              }}
              className="mt-1 font-bold text-green-500"
            >
              Bekijk statistieken →
            </button>
          </div>

        </section>

      </div>
    </main>
  );
}


function WorkoutButton({
  name,
  onClick,
}: {
  name: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl border border-zinc-700 bg-zinc-800 p-3 text-sm font-bold hover:bg-zinc-700"
    >
      {name}
    </button>
  );
}