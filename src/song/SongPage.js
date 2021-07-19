import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import Song from './Song'
import './SongPage.css'

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
        <div>
            <Song chords={chords} format={format} songName={songName} />
            <Link id="edit-song-link" to={"/edit-song/" + songName}>Edit</Link>
        </div>
    );
}

export default SongPage;