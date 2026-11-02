import type { Metadata } from "next";
import Link from "next/link";
import LegalDocumentPage, { type LegalSection } from "@/components/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Data Platform Terms - OpenVals",
  description:
    "Terms for access to OpenVals datasets, benchmarks, models catalog, APIs, and validation data services.",
};

const sections: LegalSection[] = [
  {
    title: "1. Scope",
    body: (
      <>
        These Data Platform Terms (&quot;DPT&quot;) govern access to OpenVals data products,
        including datasets, benchmark results, model catalogs, validation outputs, APIs, and
        downloadable assets (collectively, &quot;Platform Data&quot;). They supplement your master
        services agreement, order form, or{" "}
        <Link href="/terms" style={{ color: "var(--accent)" }}>
          Terms of Use
        </Link>{" "}
        where applicable.
      </>
    ),
  },
  {
    title: "2. License grant",
    body: (
      <>
        Subject to payment and compliance, OpenVals grants you a limited, non-exclusive,
        non-transferable license to access and use Platform Data solely for internal evaluation,
        validation, research, and deployment decisions within your organization. Redistribution,
        public republishing of raw datasets, or commercial resale of Platform Data is prohibited
        unless expressly permitted in writing.
      </>
    ),
  },
  {
    title: "3. Acceptable use",
    body: (
      <>
        You will not use Platform Data to train competing benchmark or validation products for
        third-party commercial sale; de-anonymize or re-identify individuals; violate model or
        dataset licenses from upstream providers; circumvent rate limits or access controls; or
        submit regulated personal health, financial, or other sensitive data to our APIs without a
        signed data processing agreement.
      </>
    ),
  },
  {
    title: "4. Third-party and open-source data",
    body: (
      <>
        Platform Data may incorporate third-party or open-source materials subject to separate
        licenses. You are responsible for complying with those licenses. OpenVals attribution
        requirements, where stated in product documentation, must be followed.
      </>
    ),
  },
  {
    title: "5. Accuracy and updates",
    body: (
      <>
        Benchmarks, scores, and metadata are updated periodically and may change without notice.
        Platform Data is provided for decision support; you remain responsible for production
        validation and compliance in your environment.
      </>
    ),
  },
  {
    title: "6. API and rate limits",
    body: (
      <>
        API keys are confidential. Usage is subject to documented quotas and fair-use limits. We may
        suspend access that threatens platform stability or violates these DPT.
      </>
    ),
  },
  {
    title: "7. Confidentiality",
    body: (
      <>
        Non-public Platform Data, previews, and enterprise reports are OpenVals confidential
        information unless marked public. You will protect them using at least reasonable care.
      </>
    ),
  },
  {
    title: "8. Term and termination",
    body: (
      <>
        Access continues for your subscription term or while your account is in good standing. We
        may terminate or suspend access for breach. Upon termination, you must stop using Platform
        Data and delete copies except where retention is required by law.
      </>
    ),
  },
  {
    title: "9. Disclaimer and liability",
    body: (
      <>
        Platform Data is provided &quot;as is.&quot; OpenVals disclaims warranties to the extent
        permitted by law. Liability caps in your enterprise agreement or Terms of Use apply to
        Platform Data access.
      </>
    ),
  },
  {
    title: "10. Contact",
    body: (
      <>
        Data platform questions:{" "}
        <a href="mailto:legal@openvalidations.com" style={{ color: "var(--accent)" }}>
          legal@openvalidations.com
        </a>
        . Privacy practices:{" "}
        <Link href="/privacy" style={{ color: "var(--accent)" }}>
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
];

export default function DataPlatformTermsPage() {
  return (
    <LegalDocumentPage
      title="Data Platform Terms"
      lastUpdated="November 2, 2026"
      sections={sections}
    />
  );
}
