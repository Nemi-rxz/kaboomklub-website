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
        src: "/kaboomklub-icon.jpg",
        sizes: "828x828",
        type: "image/jpeg",
        purpose: "any",
      },
    ],
  };
}
