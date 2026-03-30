import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import { eq,desc } from "drizzle-orm";
import redis from "@/lib/redis";
export async function POST(req:NextRequest) {
    const{notes,selectedDoctor}=await req.json();
    const user=await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;
    if (!selectedDoctor || !selectedDoctor.id) {
    return NextResponse.json(
      { error: "Doctor selection is required" },
      { status: 400 }
    );
  }

    try{
        const sessionId=uuidv4();
        const result=await db.insert(SessionChatTable).values({
            sessionId:sessionId,
            createdBy:user?.primaryEmailAddress?.emailAddress,
            notes:notes,
            selectedDoctor:selectedDoctor,
            createdOn:(new Date()).toString()
            //@ts-ignore
        }).returning({SessionChatTable});
        //  CLEAR CACHE (IMPORTANT)
       await redis.del(`history:${userEmail}:all`);
        return NextResponse.json(result[0]?.SessionChatTable);
    }
    catch(e){
       return NextResponse.json(e)
    }  
}
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get('sessionId');

    const user = await currentUser();
    const userEmail = user?.primaryEmailAddress?.emailAddress;

    // 🔐 Protect route
    if (!userEmail) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const cacheKey = `history:${userEmail}:${sessionId}`;

    // ✅ Safe Redis read
    let cached = null;
    try {
      cached = await redis.get(cacheKey);
      
    } catch (err) {
      console.error("Redis GET error:", err);
    }

    if (cached) {
      console.log("CACHE HIT");
      const data = JSON.parse(cached);
      console.log(data.length);
      return NextResponse.json(JSON.parse(cached));
    }

    let result;

    if (sessionId === 'all') {
      result = await db.select().from(SessionChatTable)
        //@ts-ignore
        .where(eq(SessionChatTable.createdBy, userEmail))
        .orderBy(desc(SessionChatTable.id));
    } else {
      result = await db.select().from(SessionChatTable)
        //@ts-ignore
        .where(eq(SessionChatTable.sessionId, sessionId));

      result = result[0];
    }

    // ✅ Safe Redis write
    try {
      await redis.set(cacheKey, JSON.stringify(result), "EX", 300);
    } catch (err) {
      console.error("Redis SET error:", err);
    }

    return NextResponse.json(result);

  } catch (error) {
    console.error("GET API ERROR:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


