import { NextRequest, NextResponse } from "next/server";
import allDatasetsData from "@/data/allDatasetsData.json";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const remoteUrl = `https://dev.openvalidations.com/api/v1/public/datasets?${searchParams.toString()}`;

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
    console.error("API proxy error for datasets:", err);
  }

  // Graceful fallback to static cached datasets
  return NextResponse.json(allDatasetsData);
}
