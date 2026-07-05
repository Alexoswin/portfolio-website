import type { MetadataRoute } from "next";
import { profile } from "@/lib/profile";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${profile.name} — ${profile.title}`,
    short_name: profile.name,
    description: profile.summary,
    start_url: "/",
    display: "standalone",
    background_color: "#0b0f1a",
    theme_color: "#0b0f1a",
    icons: [
      {
        src: "/constants/favicon.png",
        sizes: "509x513",
        type: "image/png",
      },
    ],
  };
}
