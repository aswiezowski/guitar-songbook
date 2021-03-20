import React, { useEffect, useState } from 'react';

function ChordDisplay() {
    const initialShowChords = localStorage.getItem("showChords") ? localStorage.getItem("showChords") == "true" : true;
    const [showChords, setShowChords] = useState(initialShowChords);

    useEffect(() => {
        const sheet = document.createElement('style');
        sheet.id = 'chordDisplayStyle';
        document.body.appendChild(sheet);
    }, [])

    useEffect(() => {
        const sheet = document.getElementById('chordDisplayStyle');
        if (sheet) {
            if (showChords) {
                sheet.innerHTML = "";
            } else {
                sheet.innerHTML = ".chord {display: none;}";
            }
            localStorage.setItem("showChords", showChords.toString());
        }
    }, [showChords])

    const toggleChord = () => {
        if (showChords) {
            setShowChords(false);
        } else {
            setShowChords(true);
        }
    }

    return (
        <button className="button" onClick={toggleChord}>♯</button>
    );
}

export default ChordDisplay;