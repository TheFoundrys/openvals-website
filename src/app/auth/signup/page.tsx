"use client";

import Link from "next/link";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import { SIGNUP_URL, TRIAL_DAYS } from "@/lib/app-links";
import styles from "../auth.module.css";

export default function SignupPage() {
  return (
    <div className={styles.authPage}>
      <div className={styles.authTop}>
        <Logo size="sm" font="serif" />
        <ThemeToggle />
      </div>

      <main className={styles.authMain}>
        <div className={styles.authCard}>
          <h1 className={styles.authTitle}>Create account</h1>
          <p className={styles.authLead}>
            Start your {TRIAL_DAYS}-day free trial. No credit card required.
          </p>

          <a
            href={SIGNUP_URL}
            className={styles.submitBtn}
            style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", textDecoration: "none" }}
          >
            Continue to sign up
          </a>

          <p className={styles.authFooter}>
            Already have an account? <Link href="/auth/login">Log in</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
