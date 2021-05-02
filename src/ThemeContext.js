import React from 'react';

export const themes = {
    light: { className: "light", classPrefix: "light" },
    dark: { className: "dark", classPrefix: "dark" }
};
export const ThemeContext = React.createContext({ theme: themes.dark, toggleTheme: () => { } });