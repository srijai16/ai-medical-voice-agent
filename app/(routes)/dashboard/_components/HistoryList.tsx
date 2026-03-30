"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import AddNewSessionDialog from "./AddNewSessionDialog";
import HistoryTable from "./HistoryTable";
function HistoryList(){
    const [historyList,setHistoryList]=useState([]);
    const [loading,setLoading]=useState(true);

   useEffect(() => {
        const cached = sessionStorage.getItem("history");

        if (cached) {
            setHistoryList(JSON.parse(cached)); 
        }

        GetHistoryList();
    }, []);
    const GetHistoryList=async()=>{
        setLoading(true);

        const result=await axios.get('/api/session-chat?sessionId=all');

        setHistoryList(result.data);

        //  cache
        sessionStorage.setItem("history", JSON.stringify(result.data));

        setLoading(false);
    }

    

    return (
        <div className='mt-10'>
            {historyList.length==0 ?
               <div className='flex items-center flex-col justify-center p-7 border border-dashed rounded-2xl border-2'>
                  <Image src={'/medical-assistance.png'} alt="empty" width={150} height={150}/>
                   <h2 className='font-bold text-xl mt-5 '>No Recent Consultations</h2>
                   <p>It looks like you haven't consulted with any doctors yet.</p>
                   <AddNewSessionDialog />
                </div>
                :<div> <HistoryTable historyList={historyList}/> </div>
            
             }
            
        </div>
    )
}
export default HistoryList

// const GetHistoryList=async()=>{
//         const result=await axios.get('/api/session-chat?sessionId=all')
//         console.log(result.data);
//         setHistoryList(result.data);
//         //setHistoryListRecord(result.data)
//     }