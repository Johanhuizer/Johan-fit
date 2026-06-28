export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">
      <h1 className="text-5xl font-bold">🏋️ Johan Fit</h1>

      <p className="mt-3 text-zinc-400">
        Welkom terug Johan
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2">

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">💪 Volgende training</h2>
          <p className="mt-2 text-zinc-400">
            Push A
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">⚖️ Gewicht</h2>
          <p className="mt-2 text-4xl font-bold">
            97 kg
          </p>
        </div>

        <div className="rounded-2xl bg-zinc-900 p-6">
          <h2 className="text-2xl font-bold">🎯 Doel</h2>
          <p className="mt-2 text-zinc-400">
            Meer spiermassa en droger worden
          </p>
        </div>

        <div className="rounded-2xl bg-green-600 p-6 text-center text-3xl font-bold">
          ▶️ START WORKOUT
        </div>

      </div>
    </main>
  );
}