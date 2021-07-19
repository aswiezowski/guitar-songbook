import React, { useState } from 'react';
import './App.css';
import SongBook from './songbook/SongBook'
import AddSong from './AddSong'
import SongPage from './song/SongPage'
import EditSong from './EditSong'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import axios from 'axios';
import CurrentSong from './CurrentSong';
import { ThemeContext, themes } from './ThemeContext';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL || "";


function App() {
  const getInitialThemeName = () => {
    const savedThemeName = localStorage.getItem("theme");
    if (themes[savedThemeName]) {
      return themes[savedThemeName].className;
    }
    return themes.light.className;
  }
  const [themeName, setThemeName] = useState(getInitialThemeName());

  const toggleTheme = () => {
    var newThemeName;
    if (themeName === themes.light.className) {
      newThemeName = (themes.dark.className);
    } else {
      newThemeName = themes.light.className;
    }
    setThemeName(newThemeName);
    localStorage.setItem('theme', newThemeName);
  }

  return (
    <ThemeContext.Provider value={{ theme: themes[themeName], toggleTheme }}>
      <Router>
        <div className={themes[themeName].className + " body"}>
          <nav className={"menu"}>
            <ul>
              <li>
                <NavLink exact to="/">Songs</NavLink>
              </li>
              <li>
                <NavLink to="/add-song">Add</NavLink>
              </li>
              <li>
                <NavLink to="/current-song">Ongoing</NavLink>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/add-song">
              <AddSong />
            </Route>
            <Route path="/edit-song/:editedSongName">
              <EditSong />
            </Route>
            <Route path="/current-song">
              <CurrentSong />
            </Route>
            <Route path="/song/:songName">
              <SongPage />
            </Route>
            <Route path="/">
              <SongBook />
            </Route>
          </Switch>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
}

export default App;
