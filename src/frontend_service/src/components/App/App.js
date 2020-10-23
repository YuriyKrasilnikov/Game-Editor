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
  GetProfile,
  InsertProfile,
  RemoveProfile
} from '../../utilities/grpc-client'

import { 
  useInput
} from '../Utilites/useInput'

import { 
  NotFound
} from '../Utilites/NotFound'

import {
  Navbar
} from '../Navbar/Navbar'

import { 
  Registration
} from '../Registration/Registration'

//---

import { 
  ProfilesCheats
} from './profiles_cheats'

import { 
  RecordsCheats
} from './records_cheats'

//---

import { 
  Profile
} from '../Profile/Profile'

import { 
  Record
} from '../Records/Record'

import { 
  RecordsList
} from '../Records/RecordsList'

import { 
  HomeworkApi
} from '../Homework/Homework'


const App = ( ) => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route path="/registration">
            <Registration/>
          </Route>
          <Route path="/profile/:nickname">
            <Profile/>
          </Route>
          <Route path="/profiles_cheats">
            <ProfilesCheats/>
          </Route>
          <Route path="/record/:id">
            <Record/>
          </Route>
          <Route path="/records_cheats">
            <RecordsCheats/>
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
