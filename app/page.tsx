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


type TrainingSplit =
  | "upper-lower"
  | "ppl"
  | "full-body";


type WorkoutId =
  | "upper-a"
  | "lower-a"
  | "upper-b"
  | "lower-b"
  | "full-body-a"
|   "full-body-b"
| "full-body-c"
  | "push-a"
  | "pull-a"
  | "legs-a"
  | "push-b"
  | "pull-b";


type WorkoutOption = {
  id: WorkoutId;
  name: string;
  muscles: string;
  route: string;
};


const upperLowerWorkouts:
  WorkoutOption[] = [
    {
      id: "upper-a",
      name: "Upper A",
      muscles:
        "Borst • Rug • Schouders • Armen",
      route:
        "/workout/upper-a",
    },

    {
      id: "lower-a",
      name: "Lower A",
      muscles:
        "Quadriceps • Hamstrings • Billen • Kuiten",
      route:
        "/workout/lower-a",
    },

    {
      id: "upper-b",
      name: "Upper B",
      muscles:
        "Borst • Rug • Schouders • Armen",
      route:
        "/workout/upper-b",
    },

    {
      id: "lower-b",
      name: "Lower B",
      muscles:
        "Quadriceps • Hamstrings • Billen • Kuiten",
      route:
        "/workout/lower-b",
    },
  ];


const pplWorkouts:
  WorkoutOption[] = [
    {
      id: "push-a",
      name: "Push A",
      muscles:
        "Borst • Schouders • Triceps",
      route:
        "/workout",
    },

    {
      id: "pull-a",
      name: "Pull A",
      muscles:
        "Rug • Achterste schouders • Biceps",
      route:
        "/workout/pull-a",
    },

    {
      id: "legs-a",
      name: "Legs A",
      muscles:
        "Quadriceps • Hamstrings • Billen • Kuiten",
      route:
        "/workout/legs-a",
    },

    {
      id: "push-b",
      name: "Push B",
      muscles:
        "Borst • Schouders • Triceps",
      route:
        "/workout/push-b",
    },

    {
      id: "pull-b",
      name: "Pull B",
      muscles:
        "Rug • Achterste schouders • Biceps",
      route:
        "/workout/pull-b",
    },
  ];
const fullBodyWorkouts:
  WorkoutOption[] = [
    {
      id: "full-body-a",
      name: "Full Body A",
      muscles:
        "Benen • Borst • Rug • Schouders • Armen",
      route:
        "/workout/full-body-a",
    },

    {
      id: "full-body-b",
      name: "Full Body B",
      muscles:
        "Benen • Borst • Rug • Schouders • Armen",
      route:
        "/workout/full-body-b",
    },

    {
      id: "full-body-c",
      name: "Full Body C",
      muscles:
        "Benen • Borst • Rug • Schouders • Armen",
      route:
        "/workout/full-body-c",
    },
  ];

function getWorkoutCycle(
  trainingSplit: TrainingSplit
): WorkoutOption[] {
  if (
    trainingSplit ===
    "upper-lower"
  ) {
    return upperLowerWorkouts;
  }

  if (
    trainingSplit ===
    "ppl"
  ) {
    return pplWorkouts;
  }

  return fullBodyWorkouts;
}


function getNextWorkout(
  cycle: WorkoutOption[],
  history: CompletedWorkoutInfo[]
): WorkoutOption {
  if (
    cycle.length === 0
  ) {
    return upperLowerWorkouts[0];
  }

  const lastWorkoutInCycle =
    [...history]
      .reverse()
      .find((completedWorkout) =>
        cycle.some(
          (workout) =>
            workout.id ===
            completedWorkout.workoutId
        )
      );

  if (!lastWorkoutInCycle) {
    return cycle[0];
  }

  const currentIndex =
    cycle.findIndex(
      (workout) =>
        workout.id ===
        lastWorkoutInCycle.workoutId
    );

  if (currentIndex === -1) {
    return cycle[0];
  }

  const nextIndex =
    (currentIndex + 1) %
    cycle.length;

  return cycle[nextIndex];
}


export default function Home() {
  const router =
    useRouter();


  const [
    weight,
    setWeight,
  ] = useState("");


  const [
    goal,
    setGoal,
  ] = useState("");


  const [
    trainingSplit,
    setTrainingSplit,
  ] =
    useState<TrainingSplit>(
      "upper-lower"
    );


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
    completedHistory,
    setCompletedHistory,
  ] =
    useState<
      CompletedWorkoutInfo[]
    >([]);


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


    const savedTrainingSplit =
      localStorage.getItem(
        "forgefit-training-split"
      ) as TrainingSplit | null;


    if (
      savedTrainingSplit
    ) {
      setTrainingSplit(
        savedTrainingSplit
      );
    }


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

        setCompletedHistory(
          history
        );
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
          setUser(
            name
          );

          setWeight(
            getWeight() ?? ""
          );

          setGoal(
            getGoal() ?? ""
          );


          const savedSplit =
            localStorage.getItem(
              "forgefit-training-split"
            ) as TrainingSplit | null;


          if (savedSplit) {
            setTrainingSplit(
              savedSplit
            );
          }
        }}
      />
    );
  }


  const workoutCycle =
    getWorkoutCycle(
      trainingSplit
    );


  const nextWorkout =
    getNextWorkout(
      workoutCycle,
      completedHistory
    );


  const splitName =
    trainingSplit ===
    "upper-lower"
      ? "Upper / Lower"
      : trainingSplit ===
          "ppl"
        ? "Push / Pull / Legs"
        : "Full Body";


  return (
    <main className="min-h-screen bg-zinc-950 pb-28 text-white">

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

{/* TRAININGSSCHEMA */}

<section className="mb-5 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 sm:p-6">

  <h2 className="text-xl font-bold">
    Trainingsschema
  </h2>

  <p className="mt-1 text-sm text-zinc-400">
    Kies het schema dat je wilt volgen.
  </p>

  <div className="mt-4 grid gap-3 sm:grid-cols-3">

    <button
      type="button"
      onClick={() => {
        setTrainingSplit(
          "upper-lower"
        );

        localStorage.setItem(
          "forgefit-training-split",
          "upper-lower"
        );
      }}
      className={`rounded-2xl border p-4 text-left ${
        trainingSplit === "upper-lower"
          ? "border-green-600 bg-green-950/40"
          : "border-zinc-700 bg-zinc-950"
      }`}
    >
      <p className="font-bold">
        Upper / Lower
      </p>

      <p className="mt-1 text-sm text-zinc-400">
        4 trainingen
      </p>
    </button>


    <button
      type="button"
      onClick={() => {
        setTrainingSplit(
          "ppl"
        );

        localStorage.setItem(
          "forgefit-training-split",
          "ppl"
        );
      }}
      className={`rounded-2xl border p-4 text-left ${
        trainingSplit === "ppl"
          ? "border-green-600 bg-green-950/40"
          : "border-zinc-700 bg-zinc-950"
      }`}
    >
      <p className="font-bold">
        Push / Pull / Legs
      </p>

      <p className="mt-1 text-sm text-zinc-400">
        5 trainingen
      </p>
    </button>

       <button
  type="button"
  onClick={() => {
    setTrainingSplit(
      "full-body"
    );

    localStorage.setItem(
      "forgefit-training-split",
      "full-body"
    );
  }}
  className={`rounded-2xl border p-4 text-left ${
    trainingSplit === "full-body"
      ? "border-green-600 bg-green-950/40"
      : "border-zinc-700 bg-zinc-950"
  }`}
>
  <p className="font-bold">
    Full Body
  </p>

  <p className="mt-1 text-sm text-zinc-400">
    3 trainingen
  </p>
</button>

  </div>

</section>
        {/* COACHADVIES */}

        <section className="mb-5 rounded-2xl border border-green-800 bg-zinc-900 p-4 sm:p-6">

          <div className="flex items-center justify-between gap-4">

            <p className="text-xs font-bold text-green-500 sm:text-sm">
              COACHADVIES
            </p>

            <span className="rounded-full border border-zinc-700 bg-zinc-950 px-3 py-1 text-xs text-zinc-400">
              {splitName}
            </span>

          </div>


          <div className="mt-3 flex items-start justify-between gap-4">

            <div>

              <p className="text-sm text-zinc-400">
                Volgende training
              </p>

              <h2 className="mt-1 text-2xl font-bold sm:text-3xl">
                {nextWorkout.name}
              </h2>

              <p className="mt-1 text-sm text-zinc-400">
                {nextWorkout.muscles}
              </p>

            </div>


            <div className="text-3xl">
              🏋️
            </div>

          </div>


          <button
            type="button"
            onClick={() => {
              router.push(
                nextWorkout.route
              );
            }}
            className="mt-4 w-full rounded-xl bg-green-600 p-4 text-base font-bold hover:bg-green-700 sm:text-xl"
          >
            💪 START TRAINING
          </button>


          <button
            type="button"
            onClick={() => {
              setChooseWorkoutOpen(
                (previous) =>
                  !previous
              );
            }}
            className="mt-2 w-full p-2 text-sm text-zinc-400 hover:text-white"
          >
            Andere training kiezen
          </button>


          {chooseWorkoutOpen && (
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">

              {workoutCycle.map(
                (workout) => (
                  <WorkoutButton
                    key={
                      workout.id
                    }
                    name={
                      workout.name
                    }
                    onClick={() => {
                      router.push(
                        workout.route
                      );
                    }}
                  />
                )
              )}

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
                router.push(
                  "/progress"
                );
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