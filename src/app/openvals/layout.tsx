import type { Metadata } from "next";
import type { ReactNode } from "react";
import JsonLdScript from "@/components/JsonLd";
import { pageMetadata, PAGE_SEO } from "@/lib/seo";
import { breadcrumbJsonLd, softwareApplicationJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = pageMetadata("/openvals");

export default function PageLayout({ children }: { children: ReactNode }) {
  const seo = PAGE_SEO["/openvals"];
  return (
    <>
      <JsonLdScript
        data={[
          softwareApplicationJsonLd({
            name: "OpenVals Platform",
            description: seo.description,
            path: "/openvals",
          }),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "OpenVals Platform", path: "/openvals" },
          ]),
        ]}
      />
      {children}
    </>
  );
}
