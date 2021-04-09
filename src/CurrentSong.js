import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Redirect } from "react-router-dom";

const CurrentSong = () => {
    const [currentSong, setCurrentSong] = useState(null);
    const [loading, setLoading] = useState(true);
    useEffect(() => axios.get("/current-song")
        .then(response => {
            setCurrentSong(response.data?.name);
            setLoading(false);
        })
        .catch((error) => {
            console.error(error);
        }));

    console.log(currentSong);
    return (
        <div>
            {!!currentSong && <Redirect to={"/song/" + currentSong} />}
            {!currentSong && !loading &&
                <div>
                    No song set yet
                </div>}
            {loading && <div>Loading...</div>}
        </div>);
}

export default CurrentSong;