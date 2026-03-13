import { NextRequest, NextResponse } from "next/server";
import { db } from "@/config/db";
import { feedbackTable } from "@/config/schema";

export async function POST(req: NextRequest) {
  try {
    const { rating, comment, sessionId, doctorName, userEmail } = await req.json();

    const result = await db.insert(feedbackTable).values({
      sessionId,
      doctorName,
      rating,
      comment,
      createdBy: userEmail,
      createdOn: new Date().toISOString()
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    return NextResponse.json({ error: "Failed to save feedback" });
  }
}