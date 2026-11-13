import Link from "next/link";
import LegalDocumentPage, { type LegalSection } from "@/components/LegalDocumentPage";


const sections: LegalSection[] = [
  {
    title: "1. Who we are",
    body: (
      <>
        OpenVals (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides enterprise AI validation,
        security, and trust infrastructure. This Privacy Policy explains how we handle personal
        information when you visit{" "}
        <Link href="/" style={{ color: "var(--accent)" }}>
          openvalidations.com
        </Link>
        , use our products, or contact us.
      </>
    ),
  },
  {
    title: "2. Information we collect",
    body: (
      <>
        <strong>Information you provide:</strong> name, email, company, job title, and message
        content when you fill out forms, book a demo, sign up, or contact support.
        <br />
        <br />
        <strong>Automatic data:</strong> device type, browser, approximate location (from IP),
        pages viewed, referral URLs, and similar usage data collected through cookies and analytics
        tools.
        <br />
        <br />
        <strong>Product usage:</strong> if you use OpenVals services, we may process account
        credentials, configuration data, and validation metadata necessary to operate the platform,
        as described in your agreement with us.
      </>
    ),
  },
  {
    title: "3. How we use information",
    body: (
      <>
        We use personal information to operate and improve our website and services; respond to
        inquiries; provide demos and customer support; send product updates where permitted;
        analyze usage and security; comply with legal obligations; and protect our rights and
        users.
      </>
    ),
  },
  {
    title: "4. Legal bases (EEA / UK)",
    body: (
      <>
        Where applicable, we rely on consent (e.g. marketing), contract performance (providing
        services you request), legitimate interests (security, analytics, product improvement),
        and legal obligation.
      </>
    ),
  },
  {
    title: "5. Sharing",
    body: (
      <>
        We do not sell personal information. We may share data with service providers who assist
        hosting, analytics, email, and support (under confidentiality obligations); professional
        advisers; authorities when required by law; and in connection with a merger or acquisition,
        subject to appropriate safeguards.
      </>
    ),
  },
  {
    title: "6. Retention",
    body: (
      <>
        We retain information only as long as needed for the purposes above, unless a longer period
        is required by law or to resolve disputes.
      </>
    ),
  },
  {
    title: "7. Security",
    body: (
      <>
        We apply administrative, technical, and organizational measures designed to protect
        personal information. No method of transmission or storage is completely secure; we
        encourage strong credentials and responsible use of your account.
      </>
    ),
  },
  {
    title: "8. Your rights",
    body: (
      <>
        Depending on your location, you may have rights to access, correct, delete, restrict, or
        object to processing, and to data portability. You may withdraw consent where processing
        is consent-based. To exercise rights, contact us at{" "}
        <a href="mailto:privacy@openvalidations.com" style={{ color: "var(--accent)" }}>
          privacy@openvalidations.com
        </a>
        . You may also lodge a complaint with your local supervisory authority.
      </>
    ),
  },
  {
    title: "9. Cookies",
    body: (
      <>
        We use cookies and similar technologies for essential site function, preferences, and
        analytics. You can control cookies through your browser settings; disabling some cookies
        may affect site functionality.
      </>
    ),
  },
  {
    title: "10. International transfers",
    body: (
      <>
        We may process data in countries other than yours. Where required, we use appropriate
        safeguards such as standard contractual clauses.
      </>
    ),
  },
  {
    title: "11. Children",
    body: (
      <>
        Our services are not directed to children under 16, and we do not knowingly collect their
        personal information.
      </>
    ),
  },
  {
    title: "12. Changes",
    body: (
      <>
        We may update this policy from time to time. The &quot;Last updated&quot; date below reflects
        the latest version. Material changes may be communicated via the site or email where
        appropriate.
      </>
    ),
  },
  {
    title: "13. Contact",
    body: (
      <>
        Questions about this policy:{" "}
        <a href="mailto:privacy@openvalidations.com" style={{ color: "var(--accent)" }}>
          privacy@openvalidations.com
        </a>
        . General inquiries:{" "}
        <Link href="/contact" style={{ color: "var(--accent)" }}>
          Contact us
        </Link>
        .
      </>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <LegalDocumentPage title="Privacy Policy" lastUpdated="November 2, 2026" sections={sections} />
  );
}
