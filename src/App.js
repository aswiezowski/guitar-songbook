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

axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL || "";


function App() {
  return (
    <Router>
      <div>
        <nav className="menu">
          <ul>
            <li>
              <NavLink exact to="/">Song book</NavLink>
            </li>
            <li>
              <NavLink to="/add-song">Add song</NavLink>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/add-song">
            <AddSong />
          </Route>
          <Route path="/:songName">
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
