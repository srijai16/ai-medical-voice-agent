"use client"
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
//import React, { useEffect,useState } from "react";
import axios from "axios";
import { doctorAgent } from "../../_components/DoctorAgentCard";
import { Circle, Loader, PhoneCall, PhoneOff } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Vapi from '@vapi-ai/web';
import Provider from "@/app/provider";
import { toast } from "sonner";

export type SessionDetail={
    id:number,
    notes:string,
    sessionId:string,
    report:JSON,
    selectedDoctor:doctorAgent,
    createdOn:string,
    
}

type messages={
    role:string,
    text:string
}

function MedicalVoiceAgent(){
    const sessionId=useParams();
    const [SessionDetail, setSessionDetail]=useState<SessionDetail>();
    const [callStarted,setCallStarted]=useState(false);
    const [loading,setLoading]=useState(false);
    const [connecting,setConnecting]=useState(false);
    const[vapiInstance,setVapiInstance]=useState<any>();
    const[currentRoll,setCurrentRole]=useState<string|null>();
    const[liveTranscript,setLiveTranscript]=useState<string>();
    const[messages,setMessages]=useState<messages[]>([]);
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null);
    const router=useRouter();
    
    // Timer function
    useEffect(() => {
        if (callStarted) {
            timerRef.current = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
            setSeconds(0); // Reset timer when call ends
        }
        
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [callStarted]);
    
    // Format time to MM:SS
    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };
    
    useEffect(()=>{
        sessionId&&GetSessionDetails();
    },[sessionId])
    
    const GetSessionDetails=async()=>{
        const result=await axios.get('/api/session-chat?sessionId='+sessionId.sessionid);
        console.log(result.data);
        setSessionDetail(result.data);
    };


    
    



    const StartCall=()=>{
        setConnecting(true);
        //console.log(sessionId.value || sessionId.id || sessionId.sessionid);
        const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
        setVapiInstance(vapi);

    //     const VapiAgentConfig={
    //         name:'AI Medical Doctor Voice Agent',
    //         firstMessage:"Hi there! I'am your AI Medical Assistant. I'm here to help you with any health questions or concerns you might have today. How are you feeling?",
    //         transcriber:{
    //             provider: 'deepgram', // Keep this as 'deepgram'
    //             model: 'nova-2',
    //             language: 'en'
    //         },
    //         voice:{
    //             provider:'11labs',
    //             voiceId:SessionDetail?.selectedDoctor?.voiceId 
    //         },
    //         model:{
    //             provider: 'openai',
    // model: 'gpt-5',
    //             messages:[
    //                 {
    //                     role:'system',
    //                     content:SessionDetail?.selectedDoctor?.agentPrompt
    //                 }
    //             ]
    //         }
    //     }
    const VapiAgentConfig = {
        name:'AI Medical Doctor Voice Agent',
        firstMessage:"Hi there! I'am your AI Medical Assistant. I'm here to help you with any health questions or concerns you might have today. How are you feeling?",
        transcriber: { provider: 'deepgram',language: 'en' },
        voice: { provider: '11labs', voiceId: SessionDetail?.selectedDoctor?.voiceId},
        model: { provider: 'openai', model: 'gpt-5',messages:[
                  {
                     role:'system',
                      content:SessionDetail?.selectedDoctor?.agentPrompt
                   } ]}
    };
        //@ts-ignore
        vapi.start(VapiAgentConfig);
        vapi.on('call-start', () => {console.log('Call started')
            setCallStarted(true);
        });
        vapi.on('call-end', () => {console.log('Call ended')
            setCallStarted(false);
            setConnecting(false);
        });
        vapi.on('message', (message) => {
        if (message.type === 'transcript') {
            const{role,transcriptType,transcript}=message;
            console.log(`${message.role}: ${message.transcript}`);
            if(transcriptType=='partial'){
            setLiveTranscript(transcript);
            setCurrentRole(role);
            }else if(transcriptType=='final'){
                setMessages((prev:any)=>[...prev,{role:role,text:transcript}])
                setLiveTranscript("");
                setCurrentRole(null);
            }
        }
        });
        vapi.on('speech-start', () => {
      console.log('Assistant started speaking');
      setCurrentRole('assistant');
        });
    vapi.on('speech-end', () => {
      console.log('Assistant stopped speaking');
      setCurrentRole('user');
        });

    };
    const endCall = async() => {
      setLoading(true);
      if(!vapiInstance) return;
      vapiInstance.stop();
      const result=await GenerateReport();
    //   vapiInstance.off('call-start');
    //   vapiInstance.off('call-end');
    //   vapiInstance.off('message');
      setCallStarted(false);
      setVapiInstance(null);
      setLoading(false);
      toast.success('Your report is generated!')
      router.replace('/dashboard');
  };
     

    
    const GenerateReport=async()=>{
        //console.log("jdm");
        const result=await axios.post('/api/medical-report',{
            messages:messages,
            SessionDetail:SessionDetail,
            sessionId:sessionId
        })
        console.log(result.data);
        return result.data;
    }

    
    return(
        <div className="p-5 border rounded-3xl bg-secondary">
            <div className="flex justify-between items-center">
                <h2 className="p-1 px-2 border rounded-md flex gap-2 items-center"><Circle className={`h-4 w-4 rounded-full ${callStarted?'bg-green-500':'bg-red-500'}`}/>{callStarted?'Connected...':'Not Connected'}</h2>
               <h2 className="font-bold text-xl text-gray-400">
                    {formatTime(seconds)}
                </h2>
            </div>  
            {SessionDetail&& <div className="flex items-center flex-col mt-10">
                <Image src={SessionDetail?.selectedDoctor?.image} alt={SessionDetail?.selectedDoctor?.specialist??''}
                width={120} height={120}
                className="h-[100px] w-[100px] object-cover rounded-full"/>
            
            <h2 className="mt-1 text-lg">{SessionDetail?.selectedDoctor?.specialist}</h2>
            <p className="text-sm text-gray-400">AI Medical Voice Agent</p>
            <div className="mt-12 overflow-y-auto flex flex-col px-10 md:px-28 lg:px-52 xl:px-72">
                {messages?.slice(-4).map((msg:messages,index)=>(
                    <h2 className="text-gray-400 p-2" key={index}>{msg.role}:{msg.text}</h2>
                    
                ))}
                
                {liveTranscript && liveTranscript?.length>0 &&<h2 className="text-lg">{currentRoll} : {liveTranscript}</h2>}
            </div>
            {!callStarted? <Button className="mt-20" onClick={StartCall} disabled={connecting}>
                {connecting ? <Loader className="animate-spin"/>:<PhoneCall/>}Start call</Button>
            :<Button variant={'destructive'} onClick={endCall} disabled={loading}> 
            {loading ? <Loader className="animate-spin"/>:<PhoneOff/>}Disconnect</Button>
            }
            </div>}
        </div>
    )
}
export default MedicalVoiceAgent


//{loading ? <Loader className="animate-spin"/>:}















