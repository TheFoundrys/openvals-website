import type { MetadataRoute } from "next";
import { SITE_NAME } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_NAME,
    description:
      "OpenVals helps enterprises validate, secure, and trust AI before production.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#002856",
    icons: [
      {
        src: "/openvals-square.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/openvals-square.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
