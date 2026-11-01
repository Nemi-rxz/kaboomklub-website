import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KaboomKlub",
    short_name: "KaboomKlub",
    description:
      "African Music, Culture, Business & Entertainment",
    start_url: "/",
    display: "standalone",
    background_color: "#f7f3ea",
    theme_color: "#b3241b",
    icons: [
      {
        src: "/icon.jpg",
        sizes: "768x768",
        type: "image/jpeg",
      },
    ],
  };
}
