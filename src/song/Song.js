import React, { useState } from 'react';
import ChordSheetJS from 'chordsheetjs';
import SongDisplayProperties from "./SongDisplayProperties";
import './Song.css';

function Song(props) {
    const [fontSize, setFontSize] = useState(12);

    const getParser = (format) => {
        switch (format) {
            case 'chordpro':
                return new ChordSheetJS.ChordProParser();
            case 'ultimateguitar':
                return new ChordSheetJS.UltimateGuitarParser();
            case 'regular':
                return new ChordSheetJS.ChordSheetParser();
            default:
                return new ChordSheetJS.ChordProParser()
        }
    }
    const parser = getParser(props.format);
    const song = parser.parse(props.chords);
    const formatter = new ChordSheetJS.HtmlDivFormatter();
    const disp = { "__html": formatter.format(song) };

    return (
        <div className="song">
            <SongDisplayProperties setFontSize={setFontSize} songName={props.songName} />
            <div className="songContent" dangerouslySetInnerHTML={disp} style={{ fontSize: fontSize + "px" }} />
        </div>
    );
}

export default Song;