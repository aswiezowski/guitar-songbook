import React, { useState } from 'react';
import Song from './song/Song'
import './AddSong.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

const AddSong = () => {
    const [chords, setChords] = useState("");
    const [songName, setSongName] = useState("");
    const [songFormat, setSongFormat] = useState("ultimateguitar");
    const [songSaved, setSongSaved] = useState(false);
    const [songSavedName, setSongSavedName] = useState("");
    const [songSavedNameFormat, setSongSavedFormat] = useState("");
    const [errorResponse, setErrorResponse] = useState("");

    const onChordsChange = (event) => {
        setChords(event.target.value);
    }

    const onSongNameChange = (event) => {
        setSongName(event.target.value);
    }

    const onSongFormatChange = (event) => {
        setSongFormat(event.target.value);
    }

    const saveSong = (event) => {
        event.preventDefault();
        axios.post("/songs", { name: songName, chords, format: songFormat })
            .then(function (response) {
                if (response.status === 201) {
                    setSongSaved(true);
                    setSongSavedName(songName);
                    setSongSavedFormat(songFormat);
                    setChords("");
                    setSongName("");
                    setErrorResponse("");
                }
                else {
                    setSongSaved(false);
                    setErrorResponse(response?.body || "save failed")
                    console.error(response);
                }
            })
            .catch(function (error) {
                setErrorResponse(error?.message);
                console.error(error);
            });
    }

    return (
        <div>
            <div className="add-song-container">
                {songSaved &&
                    <div>
                        Song successfully saved: <Link to={songSavedName + "." + songSavedNameFormat}>{songSavedName}</Link>
                    </div>}
                {errorResponse &&
                    <div>
                        Song save failed: {errorResponse}
                    </div>
                }
                <form>
                    <label for="song-name-input">Song name</label>
                    <br />
                    <input size="46" name="song-name" id="song-name-input" type="text" placeholder="" value={songName} onChange={onSongNameChange} />
                    <br />
                    <label for="song-name-select">Song format</label>
                    <br />
                    <select name="song-name" id="song-name-select" value={songFormat} onChange={onSongFormatChange}>
                        <option value="chordpro">Chord pro</option>
                        <option value="ultimateguitar">Ultimate Guitar</option>
                        <option value="regular">Regular</option>
                    </select>
                    <br />
                    <label for="song-text-area">Song</label>
                    <br />
                    <textarea type="text" name="song" id="song-text-area" value={chords} onChange={onChordsChange} rows="40" cols="50" />
                    <br />
                    <input type="submit" value="Add" onClick={saveSong} />
                </form>
            </div>
            <div>
                Preview:
                <Song chords={chords} format={songFormat} />
            </div>
        </div>);
}

export default AddSong;