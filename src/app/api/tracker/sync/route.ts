import { NextRequest, NextResponse } from "next/server";
import * as xlsx from "xlsx";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Path to repository scratch backup when running in writable environments
const LOCAL_BACKUP_PATH = path.join(process.cwd(), "scratch", "tracker.xlsx");

// Default GitHub repository details
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER || "TheFoundrys";
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME || "openvals-website";
const GITHUB_DEFAULT_BRANCH = process.env.GITHUB_SYNC_BRANCH || "main";
const DEFAULT_SHAREPOINT_URL =
  "https://techoptima1-my.sharepoint.com/:x:/g/personal/krishna_avula_techoptima_ai/IQBjWJjpczJyR7-ReQj5TzqtAc2o0S7BFX68DN2pQ8qOvMU?download=1";

async function fetchFromSharePoint(): Promise<Buffer | null> {
  try {
    const url = process.env.TRACKER_EXCEL_URL || DEFAULT_SHAREPOINT_URL;
    let downloadUrl = url;
    if (!downloadUrl.includes("download=1")) {
      downloadUrl += (downloadUrl.includes("?") ? "&" : "?") + "download=1";
    }
    console.log(`[API Tracker Sync] Downloading directly from SharePoint: ${downloadUrl}`);
    const r1 = await fetch(downloadUrl, { redirect: "manual" });
    if (r1.status === 302 || r1.status === 301) {
      const loc = r1.headers.get("location");
      const cookies = r1.headers.getSetCookie ? r1.headers.getSetCookie().join("; ") : r1.headers.get("set-cookie");
      const origin = new URL(downloadUrl).origin;
      const nextUrl = new URL(loc || "", origin).toString();
      const r2 = await fetch(nextUrl, {
        headers: cookies ? { cookie: cookies } : {},
      });
      if (r2.ok) {
        const buf = Buffer.from(await r2.arrayBuffer());
        if (buf.length > 1000) return buf;
      }
    } else if (r1.ok) {
      const buf = Buffer.from(await r1.arrayBuffer());
      if (buf.length > 1000) return buf;
    }
  } catch (err) {
    console.error("[API Tracker Sync] Error fetching directly from SharePoint:", err);
  }
  return null;
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, x-sync-secret",
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

export async function GET(req: NextRequest) {
  const syncRequested = req.nextUrl.searchParams.get("sync") === "true" || req.nextUrl.searchParams.get("trigger") === "true";
  if (syncRequested) {
    return POST(req);
  }

  return NextResponse.json(
    {
      status: "online",
      service: "OpenVals Validation Tracker Sync API",
      description: "Automated webhook endpoint to sync validations tracker Excel file from Microsoft SharePoint / Power Automate",
      timestamp: new Date().toISOString(),
      supportedFormats: [
        "Raw binary body (application/octet-stream or application/vnd.openxmlformats-officedocument.spreadsheetml.sheet)",
        "JSON body with base64 { content: 'base64_string', branch?: 'main' }",
        "Multipart form-data with 'file' field",
        "Direct fetch via GET /api/tracker/sync?sync=true",
      ],
      authentication: "Header 'x-sync-secret: <secret>' or 'Authorization: Bearer <secret>' (configured via TRACKER_SYNC_SECRET env variable)",
    },
    { headers: CORS_HEADERS }
  );
}

export async function POST(req: NextRequest) {
  try {
    // 1. Verify Secret
    const expectedSecret = process.env.TRACKER_SYNC_SECRET;
    if (expectedSecret) {
      const authHeader = req.headers.get("authorization");
      const customHeader = req.headers.get("x-sync-secret");
      const token = authHeader?.replace(/^Bearer\s+/i, "").trim() || customHeader?.trim();

      if (!token || token !== expectedSecret) {
        return NextResponse.json(
          { error: "Unauthorized: Invalid or missing sync secret" },
          { status: 401, headers: CORS_HEADERS }
        );
      }
    }

    const contentType = req.headers.get("content-type") || "";
    let fileBuffer: Buffer | null = null;
    let targetBranch = req.nextUrl.searchParams.get("branch") || GITHUB_DEFAULT_BRANCH;

    // 2. Extract Excel Buffer from various request formats
    if (contentType.includes("application/json")) {
      const body = await req.json();
      if (!body.content) {
        return NextResponse.json(
          { error: "Missing 'content' field in JSON. Expected base64 encoded Excel content." },
          { status: 400, headers: CORS_HEADERS }
        );
      }
      fileBuffer = Buffer.from(body.content, "base64");
      if (body.branch) targetBranch = body.branch;
    } else if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();
      const file = formData.get("file") as File | null;
      if (!file) {
        return NextResponse.json(
          { error: "Missing 'file' field in multipart form-data" },
          { status: 400, headers: CORS_HEADERS }
        );
      }
      fileBuffer = Buffer.from(await file.arrayBuffer());
    } else {
      // Default: Raw binary octet-stream from Power Automate
      const arrayBuf = await req.arrayBuffer();
      if (arrayBuf.byteLength > 0) {
        fileBuffer = Buffer.from(arrayBuf);
      }
    }

    if (!fileBuffer || fileBuffer.length < 500) {
      console.log("[API Tracker Sync] No file in payload or empty body, fetching directly from SharePoint...");
      fileBuffer = await fetchFromSharePoint();
    }

    if (!fileBuffer || fileBuffer.length < 500) {
      return NextResponse.json(
        { error: "Could not retrieve Excel file: payload was empty and direct SharePoint download did not return a valid file." },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    // 3. Validate Excel content
    let wb: xlsx.WorkBook;
    try {
      wb = xlsx.read(fileBuffer, { type: "buffer" });
    } catch (parseErr) {
      return NextResponse.json(
        { error: `Failed to parse Excel workbook: ${parseErr instanceof Error ? parseErr.message : "Invalid format"}` },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const sheetName = wb.SheetNames[0];
    if (!sheetName || !wb.Sheets[sheetName]) {
      return NextResponse.json(
        { error: "Workbook does not contain any valid worksheet" },
        { status: 400, headers: CORS_HEADERS }
      );
    }

    const sheetRows = xlsx.utils.sheet_to_json(wb.Sheets[sheetName], { header: 1 }) as unknown[][];
    console.log(`[API Tracker Sync] Successfully parsed Sheet "${sheetName}" with ${sheetRows.length} rows.`);

    // 4. Save to local scratch directory if writable
    try {
      fs.mkdirSync(path.dirname(LOCAL_BACKUP_PATH), { recursive: true });
      fs.writeFileSync(LOCAL_BACKUP_PATH, fileBuffer);
      console.log(`[API Tracker Sync] Wrote backup to ${LOCAL_BACKUP_PATH}`);
    } catch (fsErr) {
      // Ephemeral serverless filesystem (e.g., Vercel production) may not persist local file
      console.warn(`[API Tracker Sync] Local fs write skipped (serverless environment):`, fsErr);
    }

    // 5. Update GitHub Repository via GitHub API if GITHUB_TOKEN is available
    const githubToken = process.env.GITHUB_TOKEN || process.env.GITHUB_PAT;
    let githubPushStatus = "skipped (no GITHUB_TOKEN set)";

    if (githubToken) {
      try {
        const repoFullName = `${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}`;
        const filePath = "scratch/tracker.xlsx";
        const contentBase64 = fileBuffer.toString("base64");

        // A. Fetch current file SHA from GitHub
        const getUrl = `https://api.github.com/repos/${repoFullName}/contents/${filePath}?ref=${targetBranch}`;
        const getRes = await fetch(getUrl, {
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
          },
        });

        let currentSha: string | undefined;
        if (getRes.ok) {
          const getData = await getRes.json();
          currentSha = getData.sha;
        }

        // B. Commit updated tracker.xlsx to GitHub
        const putUrl = `https://api.github.com/repos/${repoFullName}/contents/${filePath}`;
        const putRes = await fetch(putUrl, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${githubToken}`,
            Accept: "application/vnd.github.v3+json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: `chore: auto-sync validations tracker.xlsx from SharePoint [skip ci]`,
            content: contentBase64,
            branch: targetBranch,
            sha: currentSha,
          }),
        });

        if (putRes.ok) {
          githubPushStatus = `committed to ${repoFullName}@${targetBranch}`;
          console.log(`[API Tracker Sync] Committed tracker.xlsx to GitHub (${githubPushStatus})`);

          // C. Trigger the Daily Validation Tracker Sync GitHub Action workflow
          const dispatchUrl = `https://api.github.com/repos/${repoFullName}/actions/workflows/daily-tracker-sync.yml/dispatches`;
          await fetch(dispatchUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${githubToken}`,
              Accept: "application/vnd.github.v3+json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ref: targetBranch,
            }),
          });
        } else {
          const errText = await putRes.text();
          githubPushStatus = `failed to commit to GitHub: ${errText}`;
          console.error(`[API Tracker Sync] GitHub commit failed:`, errText);
        }
      } catch (ghErr) {
        githubPushStatus = `GitHub API error: ${ghErr instanceof Error ? ghErr.message : "Unknown"}`;
        console.error(`[API Tracker Sync] Error calling GitHub API:`, ghErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Excel tracker received and processed successfully.",
        sheetName,
        totalRows: sheetRows.length,
        fileSize: fileBuffer.length,
        targetBranch,
        githubIntegration: githubPushStatus,
        nextSteps: githubToken
          ? "GitHub Action triggered to compile latest reports and update benchmark components."
          : "File validated. Set GITHUB_TOKEN in environment variables to auto-commit directly to repository.",
      },
      { headers: CORS_HEADERS }
    );
  } catch (error) {
    console.error("[API Tracker Sync Error]:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal Server Error" },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
