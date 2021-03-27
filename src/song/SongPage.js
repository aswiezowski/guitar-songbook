import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from "react-router-dom";
import Song from './Song'

const SongPage = () => {
    let { songName } = useParams();
    const [chords, setChords] = useState("");
    useEffect(() => {
        axios.get("/chords/" + songName)
            .then(response => {
                setChords(response.data)
            })
    }, [songName])

    const format = songName.split('.').pop();

    return (
        <Song chords={chords} format={format} songName={songName} />
    );
}

export default SongPage;