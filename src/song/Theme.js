import React, { useContext } from 'react';
import {ThemeContext} from "../ThemeContext"

const TextSize = (props) => {
    const {theme, toggleTheme} = useContext(ThemeContext)

    return (<div>
        <button className="button" onClick={toggleTheme}>B/W</button>
    </div>);
}

export default TextSize;