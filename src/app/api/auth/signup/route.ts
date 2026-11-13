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

type SignupBody = {
  name?: string;
  email?: string;
  password?: string;
  organization?: string;
  trial?: number;
  source?: string;
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
  let body: SignupBody;
  try {
    body = (await req.json()) as SignupBody;
  } catch {
    return NextResponse.json(
      { success: false, message: "Invalid request body." },
      { status: 400 },
    );
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const password = body.password ?? "";
  const organization = body.organization?.trim() ?? "";

  if (!name || !email || !password || !organization) {
    return NextResponse.json(
      {
        success: false,
        message: "Name, email, password, and organization name are required.",
      },
      { status: 400 },
    );
  }

  const apiBase = getOpenValsApiV1Base();
  const appUrl = getOpenValsAppUrl();

  try {
    const upstream = await fetch(`${apiBase}/auth/signup`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password, organization }),
    });

    const payload = await parseJsonResponse(upstream);

    if (!upstream.ok) {
      return NextResponse.json(
        {
          success: false,
          message: parseApiErrorMessage(payload, "Sign-up failed. Try again."),
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
    console.error("OpenVals signup proxy error:", err);
    return NextResponse.json(
      { success: false, message: "Unable to reach the sign-up service." },
      { status: 502 },
    );
  }
}
