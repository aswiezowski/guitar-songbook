import React, { useState, useEffect } from 'react';
import Song from './song/Song'
import './AddSong.css'
import axios from 'axios';
import { Link, useParams, useHistory } from 'react-router-dom';

const EditSong = () => {
    const [chords, setChords] = useState("");
    const [songName, setSongName] = useState("");
    const [songFormat, setSongFormat] = useState("ultimateguitar");
    const [songSaved, setSongSaved] = useState(false);
    const [songSavedName, setSongSavedName] = useState("");
    const [songSavedNameFormat, setSongSavedFormat] = useState("");
    const [errorResponse, setErrorResponse] = useState("");
    const [loadingError, setLoadingError] = useState(undefined);
    const [editedSongNameWithoutExtension, setEditedSongNameWithoutExtension] = useState(undefined);
    const { editedSongName } = useParams();
    let history = useHistory();
    useEffect(() => {
            axios.get("/chords/" + editedSongName)
                .then(response => {
                    setChords(response.data)
                    const name = editedSongName.replace(/\.[^/.]+$/, "");
                    setSongName(name)
                    setEditedSongNameWithoutExtension(name)
                })
                .catch(function (error) {
                    setLoadingError(error?.message);
                    console.error(error);
                });
    }, [editedSongName])

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
            axios.put("/songs", { name: songName, oldFileName: editedSongName, chords, format: songFormat })
                .then(function (response) {
                    if (response.status === 200) {
                        setSongSaved(true);
                        setSongSavedName(songName);
                        setSongSavedFormat(songFormat);
                        setErrorResponse("");
                        history.replace(songName+"."+songFormat);
                    }
                    else {
                        setSongSaved(false);
                        setErrorResponse(response?.body.error || "save failed")
                        console.error(response);
                    }
                })
                .catch(function (error) {
                    setSongSaved(false);
                    setErrorResponse(error.response?.data?.error);
                    console.error(error);
                });
    }

    if (loadingError && editedSongName) {
        return (
        <div>
            Couldn't load <i>{editedSongName}</i> song
        </div>)
    } else
        return (
            <div className="add-song">
                <div className="add-song-container">
                    {songSaved &&
                        <div>
                            Song successfully saved: <Link to={"/song/" + songSavedName + "." + songSavedNameFormat}>{songSavedName}</Link>
                        </div>}
                    {errorResponse &&
                        <div>
                            Song can't be modified: {errorResponse}
                        </div>
                    }
                    <form>
                        <label for="edited-song-name-input">Edited song name</label>
                        <br />
                        <input size="46" name="edited-song-name" id="edited-song-name-input" type="text" value={editedSongNameWithoutExtension} disabled={true} />
                        <br />
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
                        <input type="submit" value="Edit" onClick={saveSong} />
                    </form>
                    <div><a href="https://github.com/martijnversluis/ChordSheetJS#regular-chord-sheets" target="_blank">Check formats at ChordSheetJS page</a></div>
                </div>
                <div className="add-song-container">
                    Preview:
                <Song chords={chords} format={songFormat} />
                </div>
            </div>);
}

export default EditSong;