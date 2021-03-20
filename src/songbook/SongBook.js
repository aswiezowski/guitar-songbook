import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SongBookItem from './SongBookItem';
import './SongBook.css'

function SongBook() {
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        axios.get("/songs")
            .then(response => setSongs(response.data.songs));
    }, [])
    songs.sort((song1, song2) => song1.name.localeCompare(song2.name, "pl", {numeric: true}));
    return (
        <div>
            <ul className="songBook">
            {
                songs.map(song =>
                    <SongBookItem key={song.name} songName={song.name} songFormat={song.type} />)
            }
            </ul>
        </div>
    );
}

export default SongBook;