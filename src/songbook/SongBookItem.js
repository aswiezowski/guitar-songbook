import React from 'react';
import { Link } from 'react-router-dom';

const SongBookItem = ({ songName, songFormat }) => {
    return (
    <li>
        <Link to={songName + "." + songFormat}>{songName}</Link>
    </li>);
}

export default SongBookItem;