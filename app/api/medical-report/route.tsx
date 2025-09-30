import { openai } from "@/config/OpenAiModel";
import { SessionChatTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import {db} from "@/config/db";
import { eq } from "drizzle-orm";

const REPORT_GEN_PROMPT=`You are an Al Medical Voice Agent that just finished a voice conversation with a user. Based on doctor AI agent info and Conversation between AI medical agent and user, generate a structured report with the following fields:
1. sessionid: a unique session identifier
2. agent: the medical specialist name (e.g., "General Physician Al")
3. user: name of the patient or "Anonymous" if not provided
4. timestamp: current date and time in ISO format
5. chiefComplaint: one-sentence summary of the main health concern
6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
7. symptoms: list of symptoms mentioned by the user
8. duration: how long the user has experienced the symptoms
9. severity: mild, moderate, or severe
10. medicationsMentioned: list of any medicines mentioned
11. recommendations: list of AI suggestions (e.g., rest, see a doctor)
Return the result in this JSON format:
{ "sessionid": "string",
"agent": "string",
"user": "string",
"timestamp": "ISO Date string",
"chiefComplaint": "string",
"summary": "string".
"symptoms": ["symptom1", "symptom2"],
"duration": "string",
"severity": "string"
"medicationsMentioned": ["med1", "med2"],
"recommendations": ["rec1", "rec2"],
Only include valid fields. Respond with nothing else.`

export async function POST(req:NextRequest) {
    const {sessionId,SessionDetail,messages}=await req.json();
    try{
      const simplifiedMessages = messages.map((msg: any) => ({
      role: msg.role,
      text: msg.text.substring(0, 400) // Limit message length
    }));

      const UserInput="AI Doctor Agent Info:"+JSON.stringify(SessionDetail)+",Conversation:"+JSON.stringify(simplifiedMessages);
            const completion =await openai.chat.completions.create({
            model:"gpt-3.5-turbo",
            max_tokens: 1000,
            messages: [
                  {role:'system',content:REPORT_GEN_PROMPT},
                {role: "user", content:UserInput }
            ],
        });
    
    
            
        const rawResp=completion.choices[0].message;
        //@ts-ignore
        const Resp=rawResp.content.trim().replace('```json','').replace('```','');
        const JSONResp=JSON.parse(Resp);
        // First check if the record exists
// const existingRecord = await db.select()
//   .from(SessionChatTable)
//   .where(eq(SessionChatTable.sessionId, "session_12345"))
//   .limit(1);

// console.log('Existing record:', existingRecord);
       // console.log('Update result:', result);
       const result = await db.update(SessionChatTable).set({
  report: JSONResp,
  conversation: messages
}).where(eq(SessionChatTable.sessionId, sessionId.value || sessionId.id || sessionId.sessionid));

        return NextResponse.json(JSONResp);
        }catch(e){
            return NextResponse.json(e)
        }
    
}













// const result=await db.insert(SessionChatTable).values({
//             sessionId:sessionId,
//             createdBy:user?.primaryEmailAddress?.emailAddress,
//             notes:notes,
//             selectedDoctor:selectedDoctor,
//             createdOn:(new Date()).toString()
//             //@ts-ignore
//         }).returning({SessionChatTable});










        // const result=await db.update(SessionChatTable).set({
        //     report:JSONResp,
        //     conversation:messages
        // }).where(eq(SessionChatTable.sessionId,sessionId));