import { useState } from "react";
import PaperUpload from "./PaperUpload";
import PaperResult from "./PaperResult";
import "./paperAnalysis.css";

function PaperAnalysis() {

    const [result, setResult] = useState("");

    return (
        <div className="paper-page">
            <div className="paper-container">
                <h2 className="paper-title"> 📄 AI Question Paper Analyzer</h2>
                
                <PaperUpload setResult={setResult} />

                <PaperResult result={result} />
            </div>
        </div>
    );
}

export default PaperAnalysis;