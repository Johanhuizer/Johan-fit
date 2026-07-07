"use client";

import {
  useEffect,
  useState,
} from "react";

import BottomNavigation from "../components/BottomNavigation";

import {
  getUser,
  getWeight,
  getGoal,
  saveUser,
  saveWeight,
  saveGoal,
} from "../lib/storage";


export default function SettingsPage() {
  const [
    name,
    setName,
  ] = useState("");

  const [
    weight,
    setWeight,
  ] = useState("");

  const [
    goal,
    setGoal,
  ] = useState(
    "Meer spiermassa"
  );

  const [
    message,
    setMessage,
  ] = useState("");


  useEffect(() => {
    setName(
      getUser() ?? ""
    );

    setWeight(
      getWeight() ?? ""
    );

    setGoal(
      getGoal() ??
        "Meer spiermassa"
    );
  }, []);


  function saveProfile() {
    const cleanName =
      name.trim();

    const cleanWeight =
      weight.trim();

    if (!cleanName) {
      setMessage(
        "Vul je naam in."
      );

      return;
    }

    if (!cleanWeight) {
      setMessage(
        "Vul je gewicht in."
      );

      return;
    }

    saveUser(
      cleanName
    );

    saveWeight(
      cleanWeight
    );

    saveGoal(
      goal
    );

    setMessage(
      "Profiel opgeslagen ✓"
    );
  }


  return (
    <main className="min-h-screen bg-zinc-950 px-4 pb-28 pt-6 text-white">

      <div className="mx-auto max-w-2xl">

        <div className="mb-8">

          <p className="text-sm font-semibold uppercase tracking-wider text-green-500">
            ForgeFit
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            ⚙️ Meer
          </h1>

          <p className="mt-2 text-zinc-400">
            Beheer je profiel en persoonlijke gegevens.
          </p>

        </div>


        <section className="rounded-3xl border border-zinc-800 bg-zinc-900 p-5">

          <h2 className="text-xl font-bold">
            Profiel
          </h2>

          <p className="mt-1 text-sm text-zinc-400">
            Deze gegevens worden gebruikt op je dashboard.
          </p>


          <div className="mt-6">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Naam
            </label>

            <input
              type="text"
              value={name}
              onChange={(
                event
              ) => {
                setName(
                  event.target.value
                );

                setMessage("");
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3"
              placeholder="Jouw naam"
            />

          </div>


          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Gewicht (kg)
            </label>

            <input
              type="number"
              inputMode="decimal"
              value={weight}
              onChange={(
                event
              ) => {
                setWeight(
                  event.target.value
                );

                setMessage("");
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3"
              placeholder="Bijvoorbeeld 85"
            />

          </div>


          <div className="mt-5">

            <label className="mb-2 block text-sm font-medium text-zinc-300">
              Doel
            </label>

            <select
              value={goal}
              onChange={(
                event
              ) => {
                setGoal(
                  event.target.value
                );

                setMessage("");
              }}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3"
            >
              <option>
                Meer spiermassa
              </option>

              <option>
                Droger worden
              </option>

              <option>
                Afvallen
              </option>

              <option>
                Sterker worden
              </option>
            </select>

          </div>


          {message && (
            <div className="mt-5 rounded-xl border border-green-900 bg-green-950/50 p-3 text-sm text-green-300">
              {message}
            </div>
          )}


          <button
            type="button"
            onClick={
              saveProfile
            }
            className="mt-6 w-full rounded-2xl bg-green-600 p-4 text-lg font-bold hover:bg-green-700"
          >
            Profiel opslaan
          </button>

        </section>

      </div>

      <BottomNavigation />

    </main>
  );
}