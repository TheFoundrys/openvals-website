"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "../auth.module.css";

const APP_ORIGIN =
  process.env.NEXT_PUBLIC_OPENVALS_APP_URL ?? "https://prod.openvalidations.com";

export default function LoginPage() {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
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

    void email;
    void password;
    window.location.assign(`${APP_ORIGIN}/auth/login`);
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
          <p className={styles.authLead}>Sign in to your OpenVals workspace.</p>

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
              />
            </div>

            {error ? (
              <p className={styles.error} role="alert">
                {error}
              </p>
            ) : null}

            <button type="submit" className={styles.submitBtn} disabled={pending}>
              {pending ? "Redirecting…" : "Log in"}
            </button>
          </form>

          <p className={styles.authFooter}>
            Don&apos;t have an account?{" "}
            <Link href="/auth/signup">Sign up</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
