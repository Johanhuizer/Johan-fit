"use client";

import {
  useEffect,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

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
  const router =
    useRouter();
const [
  weight,
  setWeight,
] =
  useState("");

const [
  goal,
  setGoal,
] =
  useState("");

  const [
    user,
    setUser,
  ] =
    useState<
      string | null
    >(null);


  const [
    loaded,
    setLoaded,
  ] =
    useState(false);


  const [
    nextWorkout,
    setNextWorkout,
  ] =
    useState<WorkoutId>(
      "push-a"
    );


  const [
    chooseWorkoutOpen,
    setChooseWorkoutOpen,
  ] =
    useState(false);


  useEffect(() => {
    const savedUser =
      getUser();

    setUser(
      savedUser
    );

setWeight(
  getWeight() ?? ""
);

setGoal(
  getGoal() ?? ""
);

    const savedHistory =
      localStorage.getItem(
        "forgefit-completed-workouts"
      );


    if (savedHistory) {
      try {
        const history:
          CompletedWorkoutInfo[] =
            JSON.parse(
              savedHistory
            );


        const lastWorkout =
          history[
            history.length - 1
          ];


        const previousWorkout =
          history[
            history.length - 2
          ];


        if (
          lastWorkout?.workoutId ===
          "push-a"
        ) {
          setNextWorkout(
            "pull-a"
          );
        }


        else if (
          lastWorkout?.workoutId ===
          "pull-a"
        ) {
          setNextWorkout(
            "legs-a"
          );
        }


        else if (
          lastWorkout?.workoutId ===
          "push-b"
        ) {
          setNextWorkout(
            "pull-b"
          );
        }


        else if (
          lastWorkout?.workoutId ===
          "pull-b"
        ) {
          setNextWorkout(
            "legs-a"
          );
        }


        else if (
          lastWorkout?.workoutId ===
          "legs-a"
        ) {
          if (
            previousWorkout?.workoutId ===
            "pull-a"
          ) {
            setNextWorkout(
              "push-b"
            );
          } else {
            setNextWorkout(
              "push-a"
            );
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
  onSave={(
    name: string
  ) => {
    setUser(name);
    setWeight(
      getWeight() ?? ""
    );
    setGoal(
      getGoal() ?? ""
    );
  }}
/>
    );
  }


  const nextWorkoutName =
    nextWorkout ===
    "push-a"
      ? "Push A"

      : nextWorkout ===
        "pull-a"
        ? "Pull A"

        : nextWorkout ===
          "legs-a"
          ? "Legs A"

          : nextWorkout ===
            "push-b"
            ? "Push B"

            : "Pull B";


  const nextWorkoutMuscles =
    nextWorkout ===
      "push-a" ||
    nextWorkout ===
      "push-b"

      ? "Borst • Schouders • Triceps"

      : nextWorkout ===
          "pull-a" ||
        nextWorkout ===
          "pull-b"

        ? "Rug • Achterste schouders • Biceps"

        : "Quadriceps • Hamstrings • Billen • Kuiten";


  const nextWorkoutRoute =
    nextWorkout ===
    "push-a"
      ? "/workout"

      : nextWorkout ===
        "pull-a"
        ? "/workout/pull-a"

        : nextWorkout ===
          "legs-a"
          ? "/workout/legs-a"

          : nextWorkout ===
            "push-b"
            ? "/workout/push-b"

            : "/workout/pull-b";


  return (
    <main className="min-h-screen bg-zinc-950 text-white pb-28">

      <Header />


      <div className="max-w-5xl mx-auto p-6">


        <section className="mb-8">

          <p className="text-zinc-400">
            Welkom terug
          </p>


          <h1 className="text-4xl font-bold mt-1">
            {user}
          </h1>


          <p className="text-green-500 mt-2">
            Klaar om sterker te worden?
          </p>

        </section>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">


          <div className="bg-zinc-900 border border-green-800 rounded-2xl p-6">

            <div className="text-3xl mb-4">
              🏋️
            </div>


            <p className="text-zinc-400">
              Volgende training
            </p>


            <h2 className="text-2xl font-bold mt-2">
              {nextWorkoutName}
            </h2>


            <p className="text-sm text-zinc-400 mt-2">
              {nextWorkoutMuscles}
            </p>

          </div>


          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <div className="text-3xl mb-4">
              ⚖️
            </div>


            <p className="text-zinc-400">
              Gewicht
            </p>


            <h2 className="text-2xl font-bold mt-2">
  {weight
    ? `${weight} kg`
    : "Niet ingevuld"}
</h2>

          </div>


          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">

            <div className="text-3xl mb-4">
              🎯
            </div>


            <p className="text-zinc-400">
              Doel
            </p>

            <h2 className="text-xl font-bold mt-2">
  {goal || "Geen doel ingesteld"}
</h2>

          </div>

        </div>


        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">


          <p className="text-sm text-green-500 font-bold">
            COACHADVIES
          </p>


          <p className="text-sm text-zinc-400 mt-1">
            Volgende aanbevolen training
          </p>


          <h2 className="text-3xl font-bold mt-2">
            {nextWorkoutName}
          </h2>


          <p className="text-zinc-400 mt-2">
            {nextWorkoutMuscles}
          </p>


          <button
            type="button"
            onClick={() => {
              router.push(
                nextWorkoutRoute
              );
            }}
            className="w-full bg-green-600 hover:bg-green-700 rounded-2xl p-5 text-xl font-bold mt-6"
          >
            💪 START AANBEVOLEN TRAINING
          </button>


          <button
            type="button"
            onClick={() => {
              setChooseWorkoutOpen(
                (previous) =>
                  !previous
              );
            }}
            className="w-full mt-3 p-3 text-zinc-400 hover:text-white"
          >
            Andere training kiezen
          </button>


          {chooseWorkoutOpen && (

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-4">


              <button
                type="button"
                onClick={() => {
                  router.push(
                    "/workout"
                  );
                }}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl p-4 font-bold"
              >
                Push A
              </button>


              <button
                type="button"
                onClick={() => {
                  router.push(
                    "/workout/pull-a"
                  );
                }}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl p-4 font-bold"
              >
                Pull A
              </button>


              <button
                type="button"
                onClick={() => {
                  router.push(
                    "/workout/legs-a"
                  );
                }}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl p-4 font-bold"
              >
                Legs A
              </button>


              <button
                type="button"
                onClick={() => {
                  router.push(
                    "/workout/push-b"
                  );
                }}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl p-4 font-bold"
              >
                Push B
              </button>


              <button
                type="button"
                onClick={() => {
                  router.push(
                    "/workout/pull-b"
                  );
                }}
                className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl p-4 font-bold"
              >
                Pull B
              </button>


            </div>

          )}


        </div>


      </div>


    </main>
  );
}