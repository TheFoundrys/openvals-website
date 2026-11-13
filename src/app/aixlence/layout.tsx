import type { Metadata } from "next";
import type { ReactNode } from "react";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata("/aixlence");

export default function PageLayout({ children }: { children: ReactNode }) {
  return children;
}
