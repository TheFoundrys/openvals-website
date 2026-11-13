import type { Metadata } from "next";
import type { ReactNode } from "react";
import JsonLdScript from "@/components/JsonLd";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";
import { breadcrumbJsonLd, softwareApplicationJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = pageMetadata("/openlxm");

export default function PageLayout({ children }: { children: ReactNode }) {
  const seo = PAGE_SEO["/openlxm"];
  return (
    <>
      <JsonLdScript
        data={[
          softwareApplicationJsonLd({
            name: "OpenLXM",
            description: seo.description,
            path: "/openlxm",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "OpenLXM", path: "/openlxm" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
