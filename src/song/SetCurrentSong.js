import axios from "axios";

const SetCurrentSong = ({ songName }) => {

    const setCurrentSongClick = () => {
        axios.post("/current-song", { name: songName })
            .catch((error) => {
                console.error(error);
            });
    }

    return (
        <div>
            {songName && <button className="button" onClick={setCurrentSongClick}>SET</button>}
        </div>
    );
}

export default SetCurrentSong;