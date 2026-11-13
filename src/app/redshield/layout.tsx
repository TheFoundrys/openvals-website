import type { Metadata } from "next";
import type { ReactNode } from "react";
import JsonLdScript from "@/components/JsonLd";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";
import { breadcrumbJsonLd, softwareApplicationJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = pageMetadata("/redshield");

export default function PageLayout({ children }: { children: ReactNode }) {
  const seo = PAGE_SEO["/redshield"];
  return (
    <>
      <JsonLdScript
        data={[
          softwareApplicationJsonLd({
            name: "RedShield",
            description: seo.description,
            path: "/redshield",
            applicationCategory: "SecurityApplication",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "RedShield", path: "/redshield" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
