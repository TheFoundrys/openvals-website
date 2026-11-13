"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { completeOpenValsLogin } from "@/lib/completeOpenValsAuth";
import {
  getOpenValsAppUrl,
  MARKETING_SIGNUP_PATH,
} from "@/lib/openvalsUrls";
import styles from "../auth/auth.module.css";

const APP_ORIGIN = getOpenValsAppUrl();

export default function SignInPage() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setError(null);

    const fd = new FormData(e.currentTarget);
    const email = String(fd.get("email") ?? "").trim();
    const password = String(fd.get("password") ?? "");

    if (!email || !password) {
      setError("Enter your email and password.");
      setPending(false);
      return;
    }

    try {
      await completeOpenValsLogin(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to sign in.");
      setPending(false);
    }
  }

  return (
    <div className={styles.authPage}>
      <div className={styles.authTop}>
        <Logo size="sm" font="serif" />
        <ThemeToggle />
      </div>

      <main className={styles.authMain}>
        <div className={styles.authCard}>
          <h1 className={styles.authTitle}>Log in</h1>
          <p className={styles.authLead}>
            Sign in with your OpenVals account. Your session is created via the API and you are sent straight into the workspace.
          </p>

          <form className={styles.authForm} onSubmit={onSubmit}>
            <div className={styles.field}>
              <label className={styles.label} htmlFor="email">
                Email
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
              <div className={styles.passwordRow}>
                <label className={styles.label} htmlFor="password">
                  Password
                </label>
                <a
                  className={styles.forgotLink}
                  href={`${APP_ORIGIN}/auth/forgot-password`}
                >
                  Forgot password?
                </a>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className={styles.input}
                placeholder="••••••••"
                minLength={8}
              />
            </div>

            {error ? (
              <p className={styles.error} role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" className={styles.submitBtn} disabled={pending}>
              {pending ? "Signing in…" : "Log in"}
            </button>
          </form>

          <p className={styles.authFooter}>
            Don&apos;t have an account?{" "}
            <Link href={MARKETING_SIGNUP_PATH}>Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
