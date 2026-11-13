import { establishPlatformSessionFromBrowser } from "@/lib/openvalsBrowserAuth";
import {
  blockPlatformLoginUrl,
  buildPlatformSessionRedirect,
  extractAuthTokens,
  parseApiErrorMessage,
  type OpenValsApiEnvelope,
} from "@/lib/openvalsApi";
import {
  getOpenValsApiV1Base,
  getOpenValsAppUrl,
  getOpenValsPostLoginUrl,
  OPENVALS_POST_LOGIN_PATH,
} from "@/lib/openvalsUrls";

async function loginViaApi(
  email: string,
  password: string,
): Promise<OpenValsApiEnvelope> {
  const apiBase = getOpenValsApiV1Base();

  let direct: Response;
  try {
    direct = await fetch(`${apiBase}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
      body: JSON.stringify({ email, password }),
    });
  } catch {
    direct = new Response(null, { status: 0 });
  }

  if (direct.ok) {
    const payload = (await direct.json().catch(() => ({}))) as OpenValsApiEnvelope;
    return payload;
  }

  if (direct.status > 0 && direct.status < 500) {
    const payload = (await direct.json().catch(() => ({}))) as OpenValsApiEnvelope;
    throw new Error(parseApiErrorMessage(payload, "Sign-in failed."));
  }

  const proxy = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const proxyBody = (await proxy.json().catch(() => ({}))) as OpenValsApiEnvelope & {
    redirectTo?: string;
    needsBrowserSession?: boolean;
  };

  if (!proxy.ok) {
    throw new Error(parseApiErrorMessage(proxyBody, "Sign-in failed."));
  }

  return proxyBody;
}

export async function completeOpenValsLogin(email: string, password: string): Promise<void> {
  const appUrl = getOpenValsAppUrl();
  const fallback = getOpenValsPostLoginUrl();

  const payload = await loginViaApi(email, password);
  const tokens = extractAuthTokens(payload);

  if (!tokens.accessToken) {
    await establishPlatformSessionFromBrowser(email, password);
  }

  let redirectTo = buildPlatformSessionRedirect(
    appUrl,
    OPENVALS_POST_LOGIN_PATH,
    tokens,
  );

  const proxyRedirect =
    typeof (payload as { redirectTo?: string }).redirectTo === "string"
      ? (payload as { redirectTo: string }).redirectTo
      : undefined;

  if (proxyRedirect && tokens.accessToken) {
    redirectTo = proxyRedirect;
  }

  redirectTo = blockPlatformLoginUrl(redirectTo, fallback);
  window.location.assign(redirectTo);
}

export async function completeOpenValsSignup(body: {
  name: string;
  email: string;
  password: string;
  organization: string;
}): Promise<void> {
  const appUrl = getOpenValsAppUrl();
  const fallback = getOpenValsPostLoginUrl();

  const res = await fetch("/api/auth/signup", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = (await res.json().catch(() => ({}))) as OpenValsApiEnvelope & {
    redirectTo?: string;
    needsBrowserSession?: boolean;
  };

  if (!res.ok) {
    throw new Error(parseApiErrorMessage(data, "Sign-up failed."));
  }

  const tokens = extractAuthTokens(data);

  if (data.needsBrowserSession || !tokens.accessToken) {
    await establishPlatformSessionFromBrowser(body.email, body.password);
  }

  let redirectTo =
    typeof data.redirectTo === "string" && data.redirectTo
      ? data.redirectTo
      : buildPlatformSessionRedirect(appUrl, OPENVALS_POST_LOGIN_PATH, tokens);

  redirectTo = blockPlatformLoginUrl(redirectTo, fallback);
  window.location.assign(redirectTo);
}
