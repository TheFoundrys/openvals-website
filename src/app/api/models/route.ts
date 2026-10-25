import { NextRequest, NextResponse } from "next/server";
import allModelsData from "@/data/allModelsData.json";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const remoteUrl = `https://dev.openvalidations.com/api/v1/public/models?${searchParams.toString()}`;

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
    console.error("API proxy error:", err);
  }

  // Graceful fallback to static cached data
  return NextResponse.json(allModelsData);
}
