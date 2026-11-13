/** Customer app (workspace UI) — e.g. command center after sign-in. */
export function getOpenValsAppUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_OPENVALS_APP_URL ?? "https://dev.openvalidations.com";
  return raw.replace(/\/$/, "");
}

/** FastAPI base — defaults to dev API, not the platform login page. */
export function getOpenValsApiV1Base(): string {
  const raw =
    process.env.NEXT_PUBLIC_OPENVALS_API_URL ??
    process.env.OPENVALS_API_URL ??
    "https://dev.openvalidations.com/api/v1";
  return raw.replace(/\/$/, "");
}

export const OPENVALS_POST_LOGIN_PATH = "/command-center";

export function getOpenValsPostLoginUrl(): string {
  return `${getOpenValsAppUrl()}${OPENVALS_POST_LOGIN_PATH}`;
}

/** Marketing-site sign-in (not the customer app `/auth/login` UI). */
export const MARKETING_LOGIN_PATH = "/sign-in";
export const MARKETING_SIGNUP_PATH = "/create-account";

export function marketingSignupHref(
  source = "website",
  trialDays = 15,
): string {
  const params = new URLSearchParams({
    trial: String(trialDays),
    source,
  });
  return `${MARKETING_SIGNUP_PATH}?${params.toString()}`;
}
