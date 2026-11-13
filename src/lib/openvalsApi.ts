export type OpenValsApiError = {
  code?: string;
  message?: string;
  details?: unknown;
};

export type OpenValsApiEnvelope<T = unknown> = {
  data?: T | null;
  meta?: unknown;
  error?: OpenValsApiError | null;
  success?: boolean;
  message?: string;
};

export function parseApiErrorMessage(
  payload: OpenValsApiEnvelope,
  fallback: string,
): string {
  if (payload.error?.message) return payload.error.message;
  if (typeof payload.message === "string" && payload.message) return payload.message;
  return fallback;
}

function asRecord(value: unknown): Record<string, unknown> | null {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }
  return null;
}

export function extractAuthTokens(payload: OpenValsApiEnvelope): {
  accessToken?: string;
  refreshToken?: string;
} {
  const roots: Record<string, unknown>[] = [];
  const data = asRecord(payload.data);
  if (data) roots.push(data);
  roots.push(payload as Record<string, unknown>);

  const nestedKeys = ["tokens", "session", "auth"];

  for (const root of roots) {
    for (const key of ["access_token", "accessToken"] as const) {
      const access = root[key];
      if (typeof access === "string" && access) {
        const refresh =
          (typeof root.refresh_token === "string" && root.refresh_token) ||
          (typeof root.refreshToken === "string" && root.refreshToken) ||
          undefined;
        return { accessToken: access, refreshToken: refresh };
      }
    }

    for (const nestKey of nestedKeys) {
      const nested = asRecord(root[nestKey]);
      if (!nested) continue;
      const access =
        (typeof nested.access_token === "string" && nested.access_token) ||
        (typeof nested.accessToken === "string" && nested.accessToken) ||
        undefined;
      if (access) {
        const refresh =
          (typeof nested.refresh_token === "string" && nested.refresh_token) ||
          (typeof nested.refreshToken === "string" && nested.refreshToken) ||
          undefined;
        return { accessToken: access, refreshToken: refresh };
      }
    }
  }

  return {};
}

export function buildPlatformSessionRedirect(
  appUrl: string,
  postLoginPath: string,
  tokens: { accessToken?: string; refreshToken?: string },
): string {
  const defaultRedirect = `${appUrl.replace(/\/$/, "")}${postLoginPath}`;

  if (!tokens.accessToken) {
    return defaultRedirect;
  }

  const callback = new URL(`${appUrl.replace(/\/$/, "")}/auth/callback`);
  callback.searchParams.set("accessToken", tokens.accessToken);
  if (tokens.refreshToken) {
    callback.searchParams.set("refreshToken", tokens.refreshToken);
  }
  callback.searchParams.set("next", postLoginPath);
  return callback.toString();
}

export function blockPlatformLoginUrl(url: string, fallback: string): string {
  try {
    const parsed = new URL(url);
    if (parsed.pathname === "/auth/login" || parsed.pathname === "/login") {
      return fallback;
    }
  } catch {
    /* use url as-is below */
  }
  if (url.includes("/auth/login") || url.endsWith("/login")) {
    return fallback;
  }
  return url;
}
