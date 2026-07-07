"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNavigation() {
  const pathname = usePathname();

  const itemClass = (path: string) =>
    `flex flex-col items-center text-sm ${
      pathname === path
        ? "text-green-500 font-bold"
        : "text-zinc-400"
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-800">
      <div className="flex justify-around py-3">

        <Link href="/" className={itemClass("/")}>
          🏠
          <span>Home</span>
        </Link>

        <Link href="/workout" className={itemClass("/workout")}>
          💪
          <span>Workout</span>
        </Link>

        <Link href="/progress" className={itemClass("/progress")}>
          📈
          <span>Stats</span>
        </Link>

        <Link href="/food" className={itemClass("/food")}>
          🍽️
          <span>Voeding</span>
        </Link>

        <Link href="/settings" className={itemClass("/settings")}>
          ⚙️
          <span>Meer</span>
        </Link>

      </div>
    </nav>
  );
}