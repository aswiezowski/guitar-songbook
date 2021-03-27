import React from 'react';
import ChordDisplay from './ChordDisplay'
import TextSize from './TextSize'
import './SongDisplayProperties.css'
import SetCurrentSong from './SetCurrentSong';

const SongDisplayProperties = (props) => {
    return (<div className="song-display-properties">
        <ChordDisplay />
        <TextSize setFontSize={props.setFontSize}/>
        <SetCurrentSong songName={props.songName}/>
    </div>);
}

export default SongDisplayProperties;