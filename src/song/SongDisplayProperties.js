import React from 'react';
import ChordDisplay from './ChordDisplay'
import TextSize from './TextSize'
import './SongDisplayProperties.css'

const SongDisplayProperties = (props) => {
    return (<div className="song-display-properties">
        <ChordDisplay />
        <TextSize setFontSize={props.setFontSize}/>
    </div>);
}

export default SongDisplayProperties;