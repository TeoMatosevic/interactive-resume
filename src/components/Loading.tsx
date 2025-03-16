import React, { useState, useEffect } from 'react';
import "../styles/Terminal.css"

const Loading: React.FC = () => {
    const loadings = [
        ` ■
■
■  ■
 ■■`,
        ` ■■
■
■
 ■■`,
        ` ■■
■  ■
■
 ■`,
        ` ■■
■  ■
■  ■

`,
        ` ■■
■  ■
   ■
  ■`,
        ` ■■
   ■
   ■
 ■■
`,
        `  ■
   ■
■  ■
 ■■`,
        `
■  ■
■  ■
 ■■`]
    const [loading, setLoading] = useState(loadings[0])

    useEffect(() => {
        let i = 0
        const interval = setInterval(() => {
            setLoading(loadings[i])
            i = (i + 1) % loadings.length
        }, 50)

        return () => clearInterval(interval)
    }, [])

    return (
        <div className="font-ubuntu-mono whitespace-pre-wrap text-terminal-size text-terminal-white">
            <div className="flex items-end gap-10">
                <span>Please be patient as your data is being loaded. <br />This process may take longer than a minute due to our low-budget cloud server instance. </span>
                <pre>{loading}</pre>
            </div>
        </div>
    );
};

export default Loading;
