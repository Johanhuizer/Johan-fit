"use client";

import {
  useEffect,
  useRef,
  useState,
} from "react";

type RestTimerProps = {
  duration?: number;
  running: boolean;
  restartKey: number;
  onFinished?: () => void;
};

export function RestTimer({
  duration = 90,
  running,
  restartKey,
  onFinished,
}: RestTimerProps) {
  const [
    secondsLeft,
    setSecondsLeft,
  ] = useState(duration);

  const warningPlayed =
    useRef(false);

  const finishedPlayed =
    useRef(false);

  useEffect(() => {
    if (!running) {
      return;
    }

    setSecondsLeft(duration);

    warningPlayed.current =
      false;

    finishedPlayed.current =
      false;
  }, [
    running,
    restartKey,
    duration,
  ]);

  useEffect(() => {
    if (
      !running ||
      secondsLeft <= 0
    ) {
      return;
    }

    const timerId =
      window.setTimeout(() => {
        setSecondsLeft(
          (previous) =>
            Math.max(
              0,
              previous - 1
            )
        );
      }, 1000);

    return () => {
      window.clearTimeout(
        timerId
      );
    };
  }, [
    running,
    secondsLeft,
  ]);

  useEffect(() => {
    if (
      running &&
      secondsLeft === 10 &&
      !warningPlayed.current
    ) {
      warningPlayed.current =
        true;

      playBeep(
        700,
        0.15
      );
    }

    if (
      running &&
      secondsLeft === 0 &&
      !finishedPlayed.current
    ) {
      finishedPlayed.current =
        true;

      playBeep(
        1000,
        0.35
      );

      onFinished?.();
    }
  }, [
    running,
    secondsLeft,
    onFinished,
  ]);

  function playBeep(
    frequency: number,
    durationSeconds: number
  ) {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (
          window as typeof window & {
            webkitAudioContext:
              typeof AudioContext;
          }
        ).webkitAudioContext;

      const audioContext =
        new AudioContextClass();

      const oscillator =
        audioContext.createOscillator();

      const gain =
        audioContext.createGain();

      oscillator.frequency.value =
        frequency;

      gain.gain.value =
        0.15;

      oscillator.connect(gain);

      gain.connect(
        audioContext.destination
      );

      oscillator.start();

      oscillator.stop(
        audioContext.currentTime +
          durationSeconds
      );
    } catch (error) {
      console.error(
        "Timer geluid kon niet worden afgespeeld:",
        error
      );
    }
  }

  const minutes =
    Math.floor(
      secondsLeft / 60
    );

  const seconds =
    secondsLeft % 60;

  if (!running) {
    return null;
  }

  return (
    <div className="fixed bottom-24 left-1/2 z-40 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 rounded-2xl border border-green-800 bg-zinc-950 p-4 shadow-2xl">

      <div className="flex items-center justify-between">

        <div>
          <p className="text-sm text-zinc-400">
            Rusttijd
          </p>

          <p className="text-xs text-zinc-500">
            Volgende set voorbereiden
          </p>
        </div>

        <div className="text-3xl font-bold text-green-500">
          {minutes}:
          {seconds
            .toString()
            .padStart(
              2,
              "0"
            )}
        </div>

      </div>

    </div>
  );
}