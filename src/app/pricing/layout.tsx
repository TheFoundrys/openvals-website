import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Pricing - OpenVals",
  description:
    "Priced like trust infrastructure, not metered SaaS. Free Community tier; licensed Scale and Enterprise.",
};

export default function PricingLayout({ children }: { children: ReactNode }) {
  return children;
}
