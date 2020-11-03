import React, {
  useState,
  useEffect
} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import './App.css';

import { 
  NotFound
} from '../Utilites/NotFound'

import {
  Navbar
} from '../Navbar/Navbar'

import { 
  Registration
} from '../Registration/Registration'

import { 
  Profile
} from '../Profile/Profile'

import { 
  HomeworkApi
} from '../Homework/Homework'

import { 
  ProfilesCheats
} from './ProfilesCheats'


const App = ( ) => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/registration">
            <Registration/>
          </Route>
          <Route path="/profiles_cheats">
            <ProfilesCheats/>
          </Route>
          <Route path="/profile/:nickname">
            <Profile/>
          </Route>
          <Route exact path="/">
            <HomeworkApi/>
          </Route>
          <Route>
            <NotFound/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
