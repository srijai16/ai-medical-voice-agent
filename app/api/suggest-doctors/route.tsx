import { openai } from "@/config/OpenAiModel";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";
export async function POST(req: NextRequest) {
    const {notes}=await req.json();
    try{
        const completion =await openai.chat.completions.create({
        model:"openai/gpt-4.1-mini",
        max_tokens: 2000,
        messages: [
              {role:'system',content:`You are a doctor recommendation assistant.
Here is the list of available doctors: ${JSON.stringify(AIDoctorAgents)}.
Based on the user's symptoms, choose the top  doctors that best match the specialist field.
Return only a JSON array of doctor objects (no extra text, no markdown).`},
            {role: "user", content: `User Notes/Symptoms: ${notes}` }
        ],
    });


        
    const rawResp=completion.choices[0].message;
    //@ts-ignore
    const Resp=rawResp.content.trim().replace('```json','').replace('```','');
    const JSONResp=JSON.parse(Resp);
    return NextResponse.json(JSONResp);
    }catch(e){
        return NextResponse.json(e)
    }
}