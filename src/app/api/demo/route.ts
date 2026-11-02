import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { firstName, lastName, workEmail, company, role, useCase, stage, message } = body;

    // Basic validation
    if (!firstName || !lastName || !workEmail || !company) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Work Email, Company)." },
        { status: 400 }
      );
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(workEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid business email address." },
        { status: 400 }
      );
    }

    // Log the lead details server-side
    console.log("[Demo Request Received]:", {
      name: `${firstName} ${lastName}`,
      workEmail,
      company,
      role: role || "Not specified",
      useCase: useCase || "General AI Validation",
      stage: stage || "Not specified",
      message: message || "No notes provided",
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({
      success: true,
      message: "Demo request received successfully. Our engineering team will contact you within 1 business day.",
      calendarUrl: "https://calendly.com/vishwanath-akuthota/30min",
    });
  } catch (err) {
    console.error("[Demo Request Error]:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again or use direct calendar scheduling." },
      { status: 500 }
    );
  }
}

