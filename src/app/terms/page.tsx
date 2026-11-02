import type { Metadata } from "next";
import Link from "next/link";
import LegalDocumentPage, { type LegalSection } from "@/components/LegalDocumentPage";

export const metadata: Metadata = {
  title: "Terms of Use - OpenVals",
  description: "Terms governing your access to and use of the OpenVals website and related services.",
};

const sections: LegalSection[] = [
  {
    title: "1. Agreement",
    body: (
      <>
        By accessing or using{" "}
        <Link href="/" style={{ color: "var(--accent)" }}>
          openvalidations.com
        </Link>{" "}
        and related sites (the &quot;Site&quot;), you agree to these Terms of Use. If you do not
        agree, do not use the Site. Separate agreements apply to paid platform products.
      </>
    ),
  },
  {
    title: "2. Eligibility",
    body: (
      <>
        You must be at least 16 years old and able to form a binding contract. Use on behalf of an
        organization requires that you have authority to bind that organization.
      </>
    ),
  },
  {
    title: "3. Permitted use",
    body: (
      <>
        You may use the Site for lawful business and informational purposes. You may not scrape,
        reverse engineer, or overload our systems; attempt unauthorized access; interfere with
        security; misrepresent your identity; or use the Site in violation of applicable law.
      </>
    ),
  },
  {
    title: "4. Intellectual property",
    body: (
      <>
        The Site, branding, content, and software are owned by OpenVals or its licensors and
        protected by intellectual property laws. No license is granted except as needed to use the
        Site as intended. Trademarks may not be used without written permission.
      </>
    ),
  },
  {
    title: "5. Third-party links and services",
    body: (
      <>
        The Site may link to third-party sites or services. We are not responsible for their content
        or practices. Your use of third-party services is at your own risk and subject to their
        terms.
      </>
    ),
  },
  {
    title: "6. Disclaimers",
    body: (
      <>
        The Site and materials are provided &quot;as is&quot; without warranties of any kind,
        including merchantability, fitness for a particular purpose, and non-infringement. Benchmark
        results, scores, and documentation are for informational purposes and do not constitute
        legal, security, or compliance advice.
      </>
    ),
  },
  {
    title: "7. Limitation of liability",
    body: (
      <>
        To the maximum extent permitted by law, OpenVals will not be liable for indirect,
        incidental, special, consequential, or punitive damages, or for lost profits, data, or
        goodwill arising from your use of the Site. Our aggregate liability for claims relating to
        the Site will not exceed one hundred U.S. dollars (USD $100) or the amount you paid us in
        the twelve months before the claim, whichever is greater.
      </>
    ),
  },
  {
    title: "8. Indemnity",
    body: (
      <>
        You will indemnify and hold OpenVals harmless from claims arising out of your misuse of the
        Site or violation of these Terms.
      </>
    ),
  },
  {
    title: "9. Changes",
    body: (
      <>
        We may modify these Terms at any time by posting an updated version on the Site. Continued
        use after changes become effective constitutes acceptance.
      </>
    ),
  },
  {
    title: "10. Governing law",
    body: (
      <>
        These Terms are governed by the laws of the State of Delaware, USA, without regard to
        conflict-of-law rules, except where mandatory local law applies.
      </>
    ),
  },
  {
    title: "11. Contact",
    body: (
      <>
        Questions:{" "}
        <a href="mailto:legal@openvalidations.com" style={{ color: "var(--accent)" }}>
          legal@openvalidations.com
        </a>
        . See also our{" "}
        <Link href="/privacy" style={{ color: "var(--accent)" }}>
          Privacy Policy
        </Link>
        .
      </>
    ),
  },
];

export default function TermsOfUsePage() {
  return (
    <LegalDocumentPage title="Terms of Use" lastUpdated="November 2, 2026" sections={sections} />
  );
}
