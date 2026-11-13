import type { Metadata } from "next";
import type { ReactNode } from "react";
import JsonLdScript from "@/components/JsonLd";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";
import { breadcrumbJsonLd, softwareApplicationJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = pageMetadata("/aixlence");

export default function PageLayout({ children }: { children: ReactNode }) {
  const seo = PAGE_SEO["/aixlence"];
  return (
    <>
      <JsonLdScript
        data={[
          softwareApplicationJsonLd({
            name: "AIxLence",
            description: seo.description,
            path: "/aixlence",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "AIxLence", path: "/aixlence" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
