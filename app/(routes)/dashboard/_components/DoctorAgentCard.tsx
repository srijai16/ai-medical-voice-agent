"use client"
import React, { useState } from "react";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";

export type doctorAgent={
  id: number,
  specialist: string, 
  description: string,
  image: string,
  agentPrompt: string,
  voiceId?: string,
  subscriptionRequired:boolean
}
type props={
    doctorAgent:doctorAgent
}

function DoctorAgentCard({ doctorAgent }:props){
  const[loading,setLoading]=useState(false);
const router=useRouter();
  const {has}=useAuth();
  //@ts-ignore
  const paidUser=has && has({plan:'pro' })
      const onStartConsultation=async()=>{
      setLoading(true);
      const result=await axios.post('/api/session-chat',{
        notes:'New Query',
        selectedDoctor:doctorAgent
      });
      console.log(result.data)
      if(result.data?.sessionId){
        console.log(result.data.sessionId);
        router.push('/dashboard/medical-agent/'+result.data.sessionId);
      }
      setLoading(false);
    }
    return(
        <div className='relative'>
          {doctorAgent.subscriptionRequired && <Badge className='absolute m-2 right-0'>Premium</Badge>}
            <Image src={doctorAgent.image} alt={doctorAgent.specialist} width={200} height={300} 
              className="w-full h-[250px] obj-cover rounded-xl"/>
            <h2 className="font-bold mt-1">{doctorAgent.specialist}</h2>
            <p className="line-clamp-2 mt-1 text-sm text-gray-500">{doctorAgent.description}</p>
            <Button className="w-full mt-2" disabled={!paidUser && doctorAgent.subscriptionRequired} onClick={()=>onStartConsultation()}>Consult {loading ? <Loader2 className="animate-spin" /> : <ArrowRight />}</Button>
        </div>
    )
}
export default DoctorAgentCard