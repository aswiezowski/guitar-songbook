import React from 'react';
import './App.css';
import SongBook from './songbook/SongBook'
import AddSong from './AddSong'
import SongPage from './song/SongPage'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import axios from 'axios';
import CurrentSong from './CurrentSong';

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL || "";


function App() {
  return (
    <Router>
      <div>
        <nav className="menu">
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
  );
}

export default App;
