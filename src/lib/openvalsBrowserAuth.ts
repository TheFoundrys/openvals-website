import { getOpenValsApiV1Base } from "@/lib/openvalsUrls";

/** Second login on the API origin so HttpOnly session cookies attach to the platform domain. */
export async function establishPlatformSessionFromBrowser(
  email: string,
  password: string,
): Promise<boolean> {
  const apiBase = getOpenValsApiV1Base();

  try {
    const res = await fetch(`${apiBase}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
