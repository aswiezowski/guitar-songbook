import React, { useEffect, useState } from 'react';

const SIZE_STEP = 1;

const TextSize = (props) => {
    const getIniitialFontSize = () => {
        let initialFontSize = 16;
        if (localStorage.getItem("fontSize")) {
            let savedSize = Number(localStorage.getItem("fontSize"));
            if (savedSize != NaN) {
                initialFontSize = savedSize;
            }
        }
        return initialFontSize;
    }

    const [fontSize, setFontSize] = useState(getIniitialFontSize());
    useEffect(() => {
        props.setFontSize(fontSize);
        localStorage.setItem("fontSize", fontSize.toString())
    }, [fontSize])

    const increaseFontSize = () => {
        setFontSize(fontSize + SIZE_STEP);
    }

    const decreaseFontSize = () => {
        if (fontSize - SIZE_STEP > 0) {
            setFontSize(fontSize - SIZE_STEP);
        }
    }

    return (<div>
        <button className="button" onClick={increaseFontSize}>A<sup>+</sup></button>
        <button className="button" onClick={decreaseFontSize}>A<sup>-</sup></button>
    </div>);
}

export default TextSize;