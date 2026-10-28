import { NextRequest, NextResponse } from "next/server";
import allEnterpriseData from "@/data/allEnterpriseData.json";

export async function GET(req: NextRequest) {
  try {
    const remoteUrl = "https://dev.openvalidations.com/api/v1/public/enterprise";

    const res = await fetch(remoteUrl, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const data = await res.json();
      return NextResponse.json(data);
    }
  } catch (err) {
    console.error("API proxy error for enterprise:", err);
  }

  // Graceful fallback to static cached data
  return NextResponse.json(allEnterpriseData);
}
