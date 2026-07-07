"use client";

import { useState } from "react";
import { saveUser, saveWeight, saveGoal } from "../lib/storage";

type Props = {
  onSave: (name: string) => void;
};

export default function ProfileForm({ onSave }: Props) {
  const [name, setName] = useState("");
  const [weight, setWeight] = useState("");
  const [goal, setGoal] = useState("Meer spiermassa");

  function handleSave() {
    if (!name.trim()) return;

    saveUser(name);
    saveWeight(weight);
    saveGoal(goal);

    onSave(name);
  }

  return (
    <div className="max-w-md mx-auto mt-20 bg-zinc-900 p-6 rounded-2xl">

      <h2 className="text-3xl font-bold mb-6">
        👋 Welkom bij ForgeFit
      </h2>

      <label className="text-zinc-300">Naam</label>
      <input
        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 mb-4"
        placeholder="Jouw naam"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label className="text-zinc-300">Gewicht (kg)</label>
      <input
        type="number"
        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 mb-4"
        placeholder="97"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />

      <label className="text-zinc-300">Doel</label>
      <select
        className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 mb-6"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
      >
        <option>Meer spiermassa</option>
        <option>Droger worden</option>
        <option>Afvallen</option>
        <option>Sterker worden</option>
      </select>

      <button
        onClick={handleSave}
        className="w-full bg-green-600 hover:bg-green-700 p-3 rounded-lg font-bold"
      >
        Start ForgeFit
      </button>

    </div>
  );
}