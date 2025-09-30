import React from "react";
import HistoryList from "../_components/HistoryList";

function History(){
    return(
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Consultation History</h1>
            <HistoryList />
        </div>
    )
}

// Add this export default line
export default History;