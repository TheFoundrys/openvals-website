import { NextRequest, NextResponse } from "next/server";
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
  OPENVALS_POST_LOGIN_PATH,
} from "@/lib/openvalsUrls";

type LoginBody = {
  email?: string;
  password?: string;
};

async function parseJsonResponse(res: Response): Promise<OpenValsApiEnvelope> {
  const raw = await res.text();
  if (!raw) return {};
  try {
    return JSON.parse(raw) as OpenValsApiEnvelope;
  } catch {
    return { message: raw };
  }
}

export async function POST(req: NextRequest) {
  let body: LoginBody;
  try {
    body = (await req.json()) as LoginBody;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";

  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "Email and password are required." },
      { status: 400 },
    );
  }

  const apiBase = getOpenValsApiV1Base();
  const appUrl = getOpenValsAppUrl();

  try {
    const upstream = await fetch(`${apiBase}/auth/login`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const payload = await parseJsonResponse(upstream);

    if (!upstream.ok) {
      return NextResponse.json(
        {
          success: false,
          message: parseApiErrorMessage(payload, "Sign-in failed. Try again."),
          error: payload.error,
        },
        { status: upstream.status },
      );
    }

    const tokens = extractAuthTokens(payload);
    const redirectTo = blockPlatformLoginUrl(
      buildPlatformSessionRedirect(appUrl, OPENVALS_POST_LOGIN_PATH, tokens),
      `${appUrl}${OPENVALS_POST_LOGIN_PATH}`,
    );

    const response = NextResponse.json({
      success: true,
      redirectTo,
      needsBrowserSession: !tokens.accessToken,
      data: payload.data ?? null,
    });

    const setCookies =
      typeof upstream.headers.getSetCookie === "function"
        ? upstream.headers.getSetCookie()
        : [];
    for (const cookie of setCookies) {
      response.headers.append("Set-Cookie", cookie);
    }

    return response;
  } catch (err) {
    console.error("OpenVals login proxy error:", err);
    return NextResponse.json(
      { success: false, message: "Unable to reach the sign-in service." },
      { status: 502 },
    );
  }
}
