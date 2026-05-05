import { NextResponse } from "next/server";
import { client } from "@/sanity/lib/client";

// This route handles real-time tracking of blog metrics
export async function POST(request: Request) {
  try {
    const { event, slug, data } = await request.json();
    const writeToken = process.env.SANITY_WRITE_TOKEN;

    if (!writeToken) {
      // If no write token, we just log to console in dev or ignore
      // This prevents the site from breaking if tracking isn't fully set up
      console.warn("SANITY_WRITE_TOKEN not configured. Tracking data not saved.");
      return NextResponse.json({ success: true, warning: "Token missing" });
    }

    // Configure a write client
    const writeClient = client.withConfig({
      token: writeToken,
      useCdn: false,
    });

    // 1. Find the document ID for this slug
    const post = await client.fetch(`*[_type == "post" && slug.current == $slug][0]{_id}`, { slug });
    
    if (!post?._id) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    const docId = post._id;

    // 2. Initialize analytics fields if they don't exist
    let patch = writeClient.patch(docId).setIfMissing({
      analytics: {
        pageViews: 0,
        uniqueVisitors: 0,
        scrollDepth: 0,
        ctaClicks: 0,
        avgTimeOnPage: 0,
        conversions: 0,
        conversionRate: 0,
        impressions: 0,
        backlinks: 0
      }
    });

    // 3. Update based on event
    if (event === "page_view") {
      patch = patch.inc({ "analytics.pageViews": 1 });
      // Logic for unique visitors could be more complex (IP/Cookie based)
      // For now we just increment it if it's a new session (handled by client)
      if (data?.isNewVisitor) {
        patch = patch.inc({ "analytics.uniqueVisitors": 1 });
      }
    } else if (event === "scroll_depth") {
      // Only update if current depth is greater than stored depth
      const currentPost = await client.fetch(`*[_id == $docId][0]{analytics}`, { docId });
      const storedDepth = currentPost?.analytics?.scrollDepth || 0;
      if (data.depth > storedDepth) {
        patch = patch.set({ "analytics.scrollDepth": data.depth });
      } else {
        // No update needed
        return NextResponse.json({ success: true, message: "Depth not exceeded" });
      }
    } else if (event === "cta_click") {
      patch = patch.inc({ "analytics.ctaClicks": 1 });
    } else if (event === "time_update") {
      // Basic moving average or just update if it's the current session's max
      const currentPost = await client.fetch(`*[_id == $docId][0]{analytics}`, { docId });
      const currentViews = currentPost?.analytics?.pageViews || 1;
      const currentAvg = currentPost?.analytics?.avgTimeOnPage || 0;
      
      // We calculate a rough new average: (old_avg * (views-1) + new_sample) / views
      // But since we get updates every 30s, it's easier to just track total time and divide
      // For simplicity here, we'll just increment a totalTime field if it existed, 
      // but let's just update the average directly with a weighted approach
      const newAvg = Math.round((currentAvg * (currentViews - 1) + data.seconds) / currentViews);
      patch = patch.set({ "analytics.avgTimeOnPage": newAvg });
    }

    await patch.commit();

    // 4. AUTO-SYNC TO GOOGLE SHEETS
    // We trigger the sync API internally so the spreadsheet stays updated automatically
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    fetch(`${baseUrl}/api/blog/sync`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug }),
    }).catch(err => console.error("Auto-sync failed:", err));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Tracking failed:", error);
    return NextResponse.json({ error: "Tracking failed" }, { status: 500 });
  }
}
