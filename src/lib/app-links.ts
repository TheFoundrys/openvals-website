const APP_ORIGIN = (
  process.env.NEXT_PUBLIC_OPENVALS_APP_URL ?? "https://prod.openvalidations.com"
).replace(/\/+$/, "");

export const TRIAL_DAYS = 15;

export { APP_ORIGIN };

export const LOGIN_URL = `${APP_ORIGIN}/auth/login`;
export const FORGOT_PASSWORD_URL = `${APP_ORIGIN}/auth/forgot-password`;

export function signupUrl(options?: { source?: string }) {
  const params = new URLSearchParams({ trial: String(TRIAL_DAYS) });
  if (options?.source) params.set("source", options.source);
  return `${APP_ORIGIN}/auth/signup?${params.toString()}`;
}

export const SIGNUP_URL = signupUrl({ source: "website" });
