"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { completeOpenValsSignup } from "@/lib/completeOpenValsAuth";
import {
  getOpenValsAppUrl,
  MARKETING_LOGIN_PATH,
} from "@/lib/openvalsUrls";
import styles from "../auth/auth.module.css";

const APP_ORIGIN = getOpenValsAppUrl();

export default function SignupForm() {
  const searchParams = useSearchParams();
  const trialDays = useMemo(() => {
    const trial = Number(searchParams.get("trial"));
    return Number.isFinite(trial) && trial > 0 ? trial : 15;
  }, [searchParams]);
  const source = searchParams.get("source") ?? "website";

  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");
    const organization = String(fd.get("organization") ?? "").trim();

    if (!name || !email || !password || !organization) {
      setError("Fill in all fields to create your workspace.");
      setPending(false);
      return;
    }

    try {
      await completeOpenValsSignup({
        name,
        email,
        password,
        organization,
      });
      void trialDays;
      void source;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign up.");
      setPending(false);
    }
  }

  return (
    <>
      <h1 className={styles.authTitle}>Create account</h1>
      <p className={styles.authLead}>
        Start your free OpenVals workspace{trialDays ? ` (${trialDays}-day trial)` : ""}.
      </p>

      <form className={styles.authForm} onSubmit={onSubmit}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Your name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className={styles.input}
            placeholder="Jordan Lee"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Work email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className={styles.input}
            placeholder="you@company.com"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="organization">
            Organization name
          </label>
          <input
            id="organization"
            name="organization"
            type="text"
            autoComplete="organization"
            required
            className={styles.input}
            placeholder="Acme Corp"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            className={styles.input}
            placeholder="At least 8 characters"
          />
        </div>

        {error ? (
          <p className={styles.error} role="alert">
            {error}
          </p>
        ) : null}

        <button type="submit" className={styles.submitBtn} disabled={pending}>
          {pending ? "Creating workspace…" : "Create account"}
        </button>
      </form>

      <p className={styles.authFooter}>
        Already have an account? <Link href={MARKETING_LOGIN_PATH}>Log in</Link>
      </p>

      <p className={styles.authFooter} style={{ marginTop: 12, fontSize: 14 }}>
        Forgot password on the workspace?{" "}
        <a href={`${APP_ORIGIN}/auth/forgot-password`}>
          Reset on {APP_ORIGIN.replace(/^https?:\/\//, "")}
        </a>
      </p>
    </>
  );
}
