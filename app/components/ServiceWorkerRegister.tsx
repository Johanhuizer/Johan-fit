"use client";

import {
  useEffect,
} from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker
        .register("/sw.js")
        .catch((error) => {
          console.error(
            "Service worker registratie mislukt:",
            error
          );
        });
    }
  }, []);

  return null;
}