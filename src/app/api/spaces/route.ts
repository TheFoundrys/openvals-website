import { NextRequest, NextResponse } from "next/server";
import allSpacesData from "@/data/allSpacesData.json";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const remoteUrl = `https://dev.openvalidations.com/api/v1/public/spaces?${searchParams.toString()}`;

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
    console.error("API proxy error for spaces:", err);
  }

  // Graceful fallback to static cached spaces
  return NextResponse.json(allSpacesData);
}
