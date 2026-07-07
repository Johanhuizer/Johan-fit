import type {
  MetadataRoute,
} from "next";

export default function manifest():
  MetadataRoute.Manifest {
  return {
    name: "ForgeFit",
    short_name: "ForgeFit",

    description:
      "Jouw persoonlijke fitnesscoach",

    start_url: "/",

    display: "standalone",

    background_color:
      "#09090b",

    theme_color:
      "#16a34a",

    orientation:
      "portrait",

    lang: "nl",

    icons: [
      {
        src: "/icons/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}