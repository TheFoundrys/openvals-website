import Link from "next/link";
import CopyableCodeBlock from "./CopyableCodeBlock";
import { BulletList, CheckList, DocsTable, H2, Paragraph } from "./DocBlocks";

function SpecDownloads() {
  const links = [
    { href: "/platform-docs/OpenVals_End_to_End_User_Flow.docx", label: "End-to-End User Flow (.docx)" },
    { href: "/platform-docs/OpenVals_API_and_Functional_Specification.docx", label: "API & Functional Specification (.docx)" },
    { href: "/platform-docs/OpenVals_Platform_Architecture_Flow.docx", label: "Platform Architecture Flow (.docx)" },
  ];
  return (
    <Paragraph>
      Source specifications:{" "}
      {links.map((link, i) => (
        <span key={link.href}>
          <Link href={link.href} style={{ color: "var(--docs-heading)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
            {link.label}
          </Link>
          {i < links.length - 1 ? " · " : ""}
        </span>
      ))}
    </Paragraph>
  );
}

function RelatedSpecs({ current }: { current: "flow" | "api" | "architecture" }) {
  const items = [
    { key: "flow" as const, href: "/openvals-docs/platform-user-flow", label: "End-to-End User Flow" },
    { key: "api" as const, href: "/openvals-docs/platform-api-spec", label: "API & Functional Specification" },
    { key: "architecture" as const, href: "/openvals-docs/platform-architecture", label: "Platform Architecture Flow" },
  ].filter((item) => item.key !== current);

  return (
  <Paragraph>
    Related:{" "}
    {items.map((item, i) => (
      <span key={item.href}>
        <Link href={item.href} style={{ color: "var(--docs-heading)", textDecoration: "underline", textUnderlineOffset: "3px" }}>
          {item.label}
        </Link>
        {i < items.length - 1 ? " · " : ""}
      </span>
    ))}
  </Paragraph>
  );
}

export function PlatformUserFlowPage() {
  return (
    <>
      <Paragraph>
        How visitors, organization users, enterprise administrators, and platform staff move through the public website, Customer Application, Admin Console, FastAPI backend, PostgreSQL, workers, and external services.
      </Paragraph>
      <RelatedSpecs current="flow" />
      <SpecDownloads />

      <H2>Purpose and scope</H2>
      <Paragraph>
        This guide describes user journeys, business rules, system responsibilities, and expected outcomes across acquisition, trial signup, team collaboration, self-service billing, enterprise provisioning, admin operations, invoicing, background billing jobs, and password reset.
      </Paragraph>

      <H2>Applications and actors</H2>
      <DocsTable
        headers={["Component", "Technology / port", "Responsibility"]}
        rows={[
          ["Public website", "Next.js :3000", "Product information, pricing, free-trial entry"],
          ["Customer Application", "Next.js :3003", "Tenant workspace, team, roles, billing"],
          ["Admin Console", "Next.js :3004", "Organizations, plans, subscriptions, invoices, governance"],
          ["Backend", "FastAPI /api/v1", "Authentication, authorization, business logic, billing"],
          ["Data and jobs", "PostgreSQL + scheduler/worker", "Persistence, scheduled processing, notifications"],
          ["External services", "Razorpay, Stripe, Email", "Payments, webhooks, email delivery"],
        ]}
      />
      <DocsTable
        headers={["Actor", "Description"]}
        rows={[
          ["Visitor", "Unauthenticated website visitor"],
          ["Owner", "Creates and manages an organization"],
          ["Enterprise Admin", "Administers an enterprise customer workspace"],
          ["Manager / Developer / User", "Organization members with scoped permissions"],
          ["Platform Staff / Super Admin", "Internal users with platform-level permissions"],
        ]}
      />

      <H2>Phase 1 — Acquisition</H2>
      <Paragraph>
        Visitor explores product and pricing, selects <strong>Start Free Trial</strong>, and is redirected to{" "}
        <code>/auth/signup?trial=15&amp;source=website</code>. Query parameters are context only; the backend must validate trial eligibility.
      </Paragraph>
      <Paragraph>
        <strong>Outcome:</strong> visitor reaches the Customer App signup form.
      </Paragraph>

      <H2>Phase 2 — Tenant creation</H2>
      <Paragraph>
        User submits name, email, password, and organization name via <code>POST /auth/signup</code>. The backend validates input and uniqueness, creates organization and owner, assigns the owner role, creates a trialing subscription (15 days, 10 seats), issues tokens, and routes to <code>/command-center</code>. Records are created transactionally.
      </Paragraph>
      <Paragraph>
        <strong>Outcome:</strong> authenticated owner with a newly provisioned trial organization.
      </Paragraph>

      <H2>Phase 3 — Team and roles</H2>
      <Paragraph>
        Owner invites a member and selects a role. Backend checks authorization and seat capacity, creates an invitation, and sends email. Invitee opens <code>/accept-invite?token=...</code>; backend validates token, expiry, status, organization, and seat capacity before creating membership. If full, return <code>402 SEAT_LIMIT_EXCEEDED</code> with no partial membership.
      </Paragraph>
      <Paragraph>
        <strong>Outcome:</strong> member joins the tenant with the selected role.
      </Paragraph>

      <H2>Phase 4 — Self-service billing</H2>
      <Paragraph>
        Owner opens Billing, selects Team monthly or annual, and starts Razorpay Checkout. Backend verifies payment through <code>/organization/billing/razorpay/verify</code> and reconciles webhooks. Activate subscription only after server-side verification. Support cancel at period end, resume, renew, seat changes, and a renewal banner when renewal is within five days.
      </Paragraph>
      <Paragraph>
        <strong>Outcome:</strong> active subscription with plan entitlements.
      </Paragraph>

      <H2>Phase 5 — Subscription access states</H2>
      <Paragraph>
        Lifecycle states include <code>trialing</code>, <code>active</code>, <code>past_due</code>, <code>suspended</code>, <code>expired</code>, and <code>canceled</code>. Backend computes entitlement mode: <code>full</code>, <code>read_only</code>, or <code>billing_only</code>. Backend enforcement is authoritative; frontend restrictions are supplementary.
      </Paragraph>

      <H2>Phase 6 — Enterprise provisioning</H2>
      <Paragraph>
        Account team confirms the contract. Platform staff creates an organization, assigns Enterprise plan, records contract metadata, and invites <code>enterprise_admin</code>. No self-service trial or checkout is assumed.
      </Paragraph>

      <H2>Phase 7 — Enterprise Customer App</H2>
      <Paragraph>
        Enterprise admin signs into the Customer App. Billing is read-only (“Managed by your account team”). Organization roles do not grant Admin Console access.
      </Paragraph>

      <H2>Phase 8 — Platform login gate</H2>
      <Paragraph>
        Staff opens <code>/login</code> and submits <code>POST /api/auth/login</code>. Backend requires at least one <code>platform.*</code> permission. Organization-only accounts receive <code>403</code>. Sets <code>ov_admin_access</code> and <code>ov_admin_refresh</code> as secured HttpOnly cookies, loads <code>/auth/me</code>, redirects to <code>/overview</code>.
      </Paragraph>

      <H2>Phase 9 — Console operations</H2>
      <Paragraph>
        AdminShell shows permission-filtered navigation: Platform, Access, Billing, Governance. Staff manage organizations, subscriptions, trials, teams, invoices, roles, and plans. Every write creates an audit entry.
      </Paragraph>

      <H2>Phase 10 — Invoice, payment, reactivation</H2>
      <Paragraph>
        Staff creates and issues invoices; customer pays via hosted link or staff records offline payment. After verified payment, <code>mark_invoice_paid</code> reconciles records and reactivates eligible subscriptions and entitlements.
      </Paragraph>

      <H2>Phase 11 — Nightly billing sweep</H2>
      <Paragraph>
        Scheduler runs trial reminders (D-7/D-13/D-15), past-due suspension, invoice due/overdue reminders. Deduplication keys prevent duplicate messages; deliveries and webhooks are logged.
      </Paragraph>

      <H2>Phase 12 — Password reset</H2>
      <Paragraph>
        Customer App uses <code>/auth/forgot-password</code>; Admin Console uses <code>/forgot-password</code>. Backend issues a 30-minute single-use token, validates on reset, and revokes all sessions. Responses must not disclose account existence.
      </Paragraph>

      <H2>Core business rules</H2>
      <BulletList
        items={[
          "Organization roles apply only in the Customer Application; platform permissions govern the Admin Console.",
          "Backend authorization and tenant isolation on every protected API.",
          "Payment redirects do not prove payment—verify signatures and provider events server-side.",
          "Payment, webhook, invoice, subscription, and entitlement processing must be idempotent.",
          "Seat checks before membership creation; no partial records on failure.",
          "Administrative writes and sensitive billing changes must be auditable.",
          "Subscription status and entitlement mode are calculated by backend policy.",
        ]}
      />

      <H2>QA acceptance checklist</H2>
      <Paragraph>
        <strong>Signup</strong>
      </Paragraph>
      <CheckList
        items={[
          "CTA and signup redirect work",
          "Duplicate email rejected",
          "Organization, owner, role, and trial created atomically",
          "15-day / 10-seat trial initialized",
          "Owner reaches command center",
        ]}
      />
      <Paragraph>
        <strong>Team</strong>
      </Paragraph>
      <CheckList
        items={[
          "Invitation email and token work",
          "Expired token rejected",
          "Seat limit returns 402",
          "Role-filtered navigation works",
          "Org roles blocked from console",
        ]}
      />
      <Paragraph>
        <strong>Billing</strong>
      </Paragraph>
      <CheckList
        items={[
          "Monthly/annual checkout works",
          "Payment signature and webhook verified",
          "Duplicate events are idempotent",
          "Cancel/resume/seat change rules enforced",
          "Renewal banner shown within five days",
        ]}
      />
      <Paragraph>
        <strong>Admin and enterprise</strong>
      </Paragraph>
      <CheckList
        items={[
          "Platform permission gate works",
          "Org-only login returns 403",
          "Admin writes create audit records",
          "Enterprise contract and invite flow works",
          "Enterprise billing is read-only",
        ]}
      />
      <Paragraph>
        <strong>Invoice and jobs</strong>
      </Paragraph>
      <CheckList
        items={[
          "Draft and issue invoice",
          "Hosted link/PDF delivered",
          "Online and offline payment reconciled",
          "Eligible subscription reactivated",
          "Reminder deduplication and delivery logs work",
        ]}
      />
      <Paragraph>
        <strong>Password reset</strong>
      </Paragraph>
      <CheckList
        items={["30-minute token expiry", "Single-use token", "Password update", "All sessions revoked"]}
      />

      <H2>Items to confirm against implementation</H2>
      <BulletList
        items={[
          "Whether `/auth/signup` is served on port 3003 or a shared domain.",
          "Whether D-7/D-13/D-15 mean days remaining or elapsed days.",
          "Trial extension behavior and reminder recalculation.",
          "Exact rules for trial-seat expansion after invoice payment.",
          "Cancellation timing and past-due grace period.",
          "Whether Stripe is enabled for enterprise or self-service.",
          "Which invoice payments qualify for subscription reactivation.",
          "Access/refresh token expiry, rotation, CSRF, and revocation.",
          "Whether customer and platform password-reset flows share token infrastructure.",
        ]}
      />
    </>
  );
}

export function PlatformApiSpecPage() {
  return (
    <>
      <Paragraph>
        Functional expectations and API contract checklist for OpenVals: user flows mapped to API groups, validations, authorization, and failure behavior. Reconcile listed paths with live FastAPI routers and OpenAPI before integration.
      </Paragraph>
      <RelatedSpecs current="api" />
      <SpecDownloads />

      <H2>API design principles</H2>
      <BulletList
        items={[
          "Consistent `/api/v1` base path unless routing specifies otherwise.",
          "Authenticate protected routes; authorize every operation server-side.",
          "Derive tenant context from the authenticated session, not an untrusted organization ID alone.",
          "Validate bodies, query params, identifiers, amounts, and state transitions.",
          "Return consistent machine-readable error codes and user-safe messages.",
          "Use idempotency keys for payment creation, reconciliation, webhooks, and retryable writes.",
          "Document pagination, sorting, filtering, and response schemas for list endpoints.",
        ]}
      />

      <H2>Authentication and account APIs</H2>
      <DocsTable
        headers={["Operation", "Endpoint", "Auth", "Key validations / behavior"]}
        rows={[
          ["Signup", "POST /auth/signup", "Public", "Validate fields; reject duplicate email; transactional tenant/owner/trial"],
          ["Login", "POST /auth/login", "Public", "Validate credentials; issue session"],
          ["Current user", "GET /auth/me", "Authenticated", "User, org context, roles, permissions"],
          ["Forgot password", "POST /auth/forgot-password", "Public", "Generic response; rate limit; 30-minute token"],
          ["Reset password", "POST /auth/reset-password", "Reset token", "Validate token; revoke all sessions"],
          ["Refresh / Logout", "Confirm implemented routes", "Session", "Rotate refresh; revoke on logout"],
        ]}
      />

      <H2>Organization, invitation, and membership APIs</H2>
      <DocsTable
        headers={["Operation", "Route family", "Auth", "Key validations / behavior"]}
        rows={[
          ["Invite member", "/organization/.../invitations", "Owner / admin", "Email, role, org status, seat availability"],
          ["Accept invitation", "/accept-invite flow", "Invitation token", "Token, expiry, seats; no duplicate membership"],
          ["Manage team", "Organization user routes", "Org role", "Tenant scope; validate role changes"],
          ["Seat change", "POST/PATCH /organization/billing/seats", "Billing permission", "Plan limits, proration, seat usage"],
        ]}
      />

      <H2>Plans, subscriptions, and billing APIs</H2>
      <DocsTable
        headers={["Operation", "Endpoint", "Auth", "Key validations / behavior"]}
        rows={[
          ["Plan catalog", "Plan route (confirm)", "Policy-dependent", "Visible/purchasable plans and prices"],
          ["Checkout", "POST /organization/billing/checkout", "Billing permission", "Plan, interval, eligibility, idempotency"],
          ["Razorpay verification", "POST /organization/billing/razorpay/verify", "Auth / provider", "Signature, IDs, amount, status"],
          ["Cancel / Resume", "Billing cancel/resume routes", "Billing permission", "Validate state and timing"],
          ["Provider webhook", "POST /webhooks/{provider}", "Provider signature", "Verify, dedupe, reconcile safely"],
        ]}
      />

      <H2>Invoice and payment APIs</H2>
      <DocsTable
        headers={["Operation", "Endpoint", "Auth", "Key validations / behavior"]}
        rows={[
          ["Create / issue invoice", "Admin invoice routes", "Platform invoice permission", "Line items, due days, draft→issued workflow"],
          ["Public invoice view", "Public GET route", "Public token/link", "Minimum fields; validate status"],
          ["Pay invoice", "/public/invoices/{id}/pay", "Payment context", "Payable state, balance, idempotency"],
          ["Mark offline paid", "Admin invoice route", "Platform payment permission", "Reference, amount, audit"],
          ["Reconciliation", "Internal mark_invoice_paid", "Internal", "Idempotent; subscription + entitlements"],
        ]}
      />

      <H2>Admin Console APIs</H2>
      <DocsTable
        headers={["Area", "Route family", "Required authorization"]}
        rows={[
          ["Overview", "GET /admin/overview", "Platform overview permission"],
          ["Organizations", "/admin/organizations", "Platform organization permissions"],
          ["Users", "/admin/users", "Platform user permissions"],
          ["Subscriptions", "/admin/subscriptions", "Platform subscription permissions"],
          ["Invoices", "/admin/invoices", "Platform invoice permissions"],
          ["Audit", "GET /admin/audit", "Platform audit permission"],
          ["Plans / roles / deliveries", "Confirm /admin/plans, roles, deliveries", "Platform access-management permissions"],
        ]}
      />

      <H2>Validation and authorization matrix</H2>
      <DocsTable
        headers={["Validation", "Expected behavior"]}
        rows={[
          ["Missing authentication", "401 Unauthorized"],
          ["Expired or invalid session", "401 Unauthorized"],
          ["Insufficient permission", "403 Forbidden"],
          ["Organization-only account in Admin Console", "403 Forbidden"],
          ["Seat capacity exceeded", "402 with code SEAT_LIMIT_EXCEEDED"],
          ["Invalid body or field", "400 or 422"],
          ["Duplicate resource", "409 Conflict where appropriate"],
          ["Invalid invitation/reset token", "Reject without state change"],
          ["Invalid payment signature", "Reject; do not activate subscription"],
          ["Duplicate webhook / retry", "Idempotent result"],
          ["Unpaid subscription write", "Block per entitlement policy"],
        ]}
      />

      <H2>Recommended response shape</H2>
      <Paragraph>Illustrative success envelope—align field names with the implemented API:</Paragraph>
      <CopyableCodeBlock>{`{
  "success": true,
  "data": {},
  "message": "Operation completed",
  "request_id": "correlation-id"
}`}</CopyableCodeBlock>
      <Paragraph>Illustrative error response:</Paragraph>
      <CopyableCodeBlock>{`{
  "success": false,
  "error": {
    "code": "SEAT_LIMIT_EXCEEDED",
    "message": "The organization has reached its seat limit."
  },
  "request_id": "correlation-id"
}`}</CopyableCodeBlock>

      <H2>Functional rules by domain</H2>
      <Paragraph>
        <strong>Authentication:</strong> no password hashes in responses; rate-limit login and reset; generic forgot-password responses; revoke sessions on reset; separate platform vs organization authorization.
      </Paragraph>
      <Paragraph>
        <strong>Subscription and entitlements:</strong> centralize transitions; backend entitlement mode; validate seats on writes; never activate from browser redirect alone; idempotent reconciliation.
      </Paragraph>
      <Paragraph>
        <strong>Invoices and payments:</strong> server-side totals; validate currency, balance, references; verify provider signatures; transactional updates; reactivate only eligible subscriptions.
      </Paragraph>
      <Paragraph>
        <strong>Admin and audit:</strong> explicit platform permission per action; record actor, target, action, timestamp, correlation ID, before/after values; do not rely on frontend route guards alone.
      </Paragraph>

      <H2>Non-functional requirements</H2>
      <DocsTable
        headers={["Area", "Requirement"]}
        rows={[
          ["Security", "TLS, secure cookies, CSRF, secrets, least privilege, tenant isolation"],
          ["Reliability", "Transactions, idempotency, bounded retries, safe webhook replay"],
          ["Performance", "Pagination; indexed tenant columns; avoid unbounded responses"],
          ["Observability", "Structured logs, correlation IDs, payment/worker/email/auth metrics"],
          ["Data integrity", "Foreign keys, uniqueness, consistent transitions, auditable mutations"],
          ["API documentation", "OpenAPI schemas, auth requirements, examples, error catalogue"],
        ]}
      />

      <H2>API test checklist</H2>
      <CheckList
        items={[
          "Signup validation, duplicate email, transactional tenant creation, trial defaults",
          "Login success/failure, session expiry, refresh and logout",
          "Organization role versus platform permission enforcement",
          "Invitation token expiry, reuse, duplicate membership, seat limit",
          "Checkout, invalid signature, duplicate webhook, failed payment",
          "Cancel/resume/seat change edge cases",
          "Invoice draft, issue, public access, online and offline reconciliation",
          "Subscription transition and entitlement enforcement for every state",
          "Admin permission checks and audit event creation",
          "Password reset expiry, single use, generic response, session revocation",
          "Pagination, filtering, validation errors, rate limits, correlation IDs",
        ]}
      />

      <H2>Contract confirmation required</H2>
      <Paragraph>
        This catalogue is a functional baseline. Before frontend integration, compare with FastAPI routers and OpenAPI output: HTTP methods, payloads, response fields, status codes, permission identifiers, pagination, and webhook paths.
      </Paragraph>
    </>
  );
}

export function PlatformArchitecturePage() {
  return (
    <>
      <Paragraph>
        Logical architecture and interactions between the public website, Customer Application, Admin Console, FastAPI backend, PostgreSQL, background processing, and external providers. Confirm deployment topology against the live environment.
      </Paragraph>
      <RelatedSpecs current="architecture" />
      <SpecDownloads />

      <H2>High-level architecture</H2>
      <DocsTable
        headers={["Layer", "Component", "Primary responsibilities"]}
        rows={[
          ["Presentation", "Website — Next.js :3000", "Public pages, pricing, acquisition, signup CTA"],
          ["Presentation", "Customer App — Next.js :3003", "Tenant workspace, team, roles, billing"],
          ["Presentation", "Admin Console — Next.js :3004", "Platform ops, subscriptions, invoices, governance"],
          ["API / business", "FastAPI /api/v1", "Auth, tenant boundaries, billing and admin APIs"],
          ["Persistence", "PostgreSQL", "Orgs, users, roles, plans, subscriptions, invoices, audit"],
          ["Async processing", "Scheduler + worker", "Reminders, billing sweep, webhooks, email"],
          ["External", "Razorpay / Stripe / Email", "Checkout, callbacks, invitations, notifications"],
        ]}
      />

      <H2>Public acquisition and signup</H2>
      <BulletList
        items={[
          "Visitor requests public website pages.",
          "Website CTA redirects to Customer App signup with source context.",
          "Customer App submits signup to FastAPI.",
          "Backend transactionally creates tenant, owner, role, and trial subscription.",
          "Backend issues session credentials; Customer App opens command center.",
        ]}
      />

      <H2>Authenticated customer requests</H2>
      <BulletList
        items={[
          "Customer App sends API requests with authenticated session.",
          "Backend resolves organization membership and checks role/permission.",
          "Entitlement service checks subscription state, plan limits, and seats.",
          "Business service reads/writes tenant-scoped PostgreSQL records.",
          "Response returns; UI reflects authorized state.",
        ]}
      />

      <H2>Admin Console requests</H2>
      <BulletList
        items={[
          "Staff authenticates through Admin Console login.",
          "Backend requires at least one platform.* permission.",
          "Admin session uses protected cookies; navigation is permission-filtered.",
          "Each administrative API independently verifies platform permission.",
          "Writes persist business changes and an audit event.",
        ]}
      />

      <H2>Payment and webhook flow</H2>
      <BulletList
        items={[
          "Customer starts checkout or public invoice payment.",
          "Backend creates or retrieves payment order and provider checkout context.",
          "Provider processes transaction; browser result and webhook reach verification paths.",
          "Backend verifies signature, event identity, amount, currency, and state.",
          "Idempotent reconciliation updates payment, invoice, subscription, entitlements.",
          "Audit and notification events are recorded.",
        ]}
      />

      <H2>Background billing flow</H2>
      <BulletList
        items={[
          "Scheduler triggers billing sweep.",
          "Worker evaluates trial, subscription, and invoice dates.",
          "Worker applies transitions and creates notification work.",
          "Deduplication key checked before sending email.",
          "Delivery result and provider webhook recorded.",
        ]}
      />

      <H2>Logical backend service boundaries</H2>
      <DocsTable
        headers={["Service area", "Responsibilities"]}
        rows={[
          ["Authentication", "Signup, login, me, refresh, logout, password reset, invitation tokens"],
          ["Tenant and membership", "Org lifecycle, invitations, seat checks, tenant isolation"],
          ["RBAC", "Roles, permissions, platform gate, org permission checks"],
          ["Plans and subscriptions", "Catalog, lifecycle, contracts, entitlement calculation"],
          ["Billing and payments", "Checkout, verification, webhooks, cancel/resume, seats"],
          ["Invoices", "Draft/issue, public access, reconciliation, PDF/link delivery"],
          ["Administration", "Overview, org/user/plan management, subscription ops"],
          ["Audit and delivery", "Audit trail, webhook history, email delivery records"],
          ["Background processing", "Billing sweep, reminders, suspension, deduplication"],
        ]}
      />

      <H2>Data and trust boundaries</H2>
      <BulletList
        items={[
          "Browser clients are untrusted—validate inputs and authorization on the backend.",
          "Customer tenant data scoped by authenticated organization context.",
          "Admin APIs require platform permissions; hidden nav is not authorization.",
          "Payment callbacks untrusted until signature and event validation.",
          "Public invoice pages expose only minimum data per token/link policy.",
          "Secrets, provider credentials, and tokens must not leak to client storage or logs.",
          "Background jobs must be safe to retry without duplicate financial or notification effects.",
        ]}
      />

      <H2>Resilience and observability</H2>
      <BulletList
        items={[
          "Correlation IDs across frontend, backend, workers, and provider callbacks.",
          "Record webhook event IDs and outcomes for idempotency and replay investigation.",
          "Bounded retries with backoff for transient provider/email failures.",
          "Track queue depth, job age, failures, email status, reconciliation failures.",
          "Critical multi-entity updates use database transactions.",
          "Alert on repeated payment verification failures, stuck jobs, failed delivery.",
        ]}
      />

      <H2>Architecture decisions to validate</H2>
      <BulletList
        items={[
          "Whether three Next.js apps share a domain, use separate domains, or sit behind a reverse proxy.",
          "Cookie domain, SameSite, CSRF, and CORS for cross-app authentication.",
          "Whether webhook handlers run in the API process or a dedicated worker.",
          "Scheduler technology, worker concurrency, locking, and retry policy.",
          "PostgreSQL transaction boundaries and uniqueness for payment/webhook idempotency.",
          "Storage location and retention for invoice PDFs and audit records.",
        ]}
      />
    </>
  );
}
