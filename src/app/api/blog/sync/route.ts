import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";
import { postBySlugQuery } from "@/sanity/lib/queries";

export async function POST(request: Request) {
  try {
    const { slug } = await request.json();
    const webhookUrl = process.env.GOOGLE_SHEET_WEBHOOK_URL;

    if (!webhookUrl) {
      return NextResponse.json({ error: "GOOGLE_SHEET_WEBHOOK_URL not configured" }, { status: 500 });
    }

    // Fetch the latest data from Sanity
    const post = await client.fetch(postBySlugQuery, { slug });

    if (!post || !post.analytics) {
      return NextResponse.json({ error: "Post or analytics data not found" }, { status: 404 });
    }

    // Format data for Google Sheet columns
    const sheetData = {
      Timestamp: new Date().toISOString(),
      Title: post.title,
      Topic: post.analytics.topic || "N/A",
      Objective: post.analytics.objective || "N/A",
      "Page Views": post.analytics.pageViews || 0,
      "Unique Visitors": post.analytics.uniqueVisitors || 0,
      "Avg Time on Page": post.analytics.avgTimeOnPage || 0,
      "Bounce Rate": post.analytics.bounceRate || 0,
      "Scroll Depth": post.analytics.scrollDepth || 0,
      "CTA Clicks": post.analytics.ctaClicks || 0,
      Conversions: post.analytics.conversions || 0,
      "Conversion Rate": post.analytics.conversionRate || 0,
      "Keyword Ranking": post.analytics.keywordRanking || "N/A",
      Impressions: post.analytics.impressions || 0,
      Backlinks: post.analytics.backlinks || 0,
      Insights: post.analytics.insights || "N/A",
      "Next Action": post.analytics.nextAction || "N/A",
    };

    // Send to Google Sheets Webhook (Apps Script)
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sheetData),
    });

    if (!response.ok) {
      throw new Error(`Google Sheets sync failed: ${response.statusText}`);
    }

    return NextResponse.json({ success: true, message: "Logged to Google Sheet automatically" });
  } catch (error) {
    console.error("Google Sheets sync failed:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Unknown error" }, { status: 500 });
  }
}
