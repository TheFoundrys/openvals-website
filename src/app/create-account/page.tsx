import { Suspense } from "react";
import Logo from "@/components/Logo";
import ThemeToggle from "@/components/ThemeToggle";
import SignupForm from "./SignupForm";
import styles from "../auth/auth.module.css";

export default function CreateAccountPage() {
  return (
    <div className={styles.authPage}>
      <div className={styles.authTop}>
        <Logo size="sm" font="serif" />
        <ThemeToggle />
      </div>

      <main className={styles.authMain}>
        <div className={styles.authCard}>
          <Suspense
            fallback={
              <p className={styles.authLead} style={{ margin: 0 }}>
                Loading…
              </p>
            }
          >
            <SignupForm />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
