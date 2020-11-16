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

import { 
  Flow
} from '../Flow/Flow'

import {
  CssBaseline,
  Toolbar,
  Grid,
} from '@material-ui/core';

const App = ( ) => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar />
        <Grid container component='main' direction='column' wrap='nowrap'>
          <Toolbar />
          <Grid item xs={12}>
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
              <Route path="/homeworkapi">
                <HomeworkApi/>
              </Route>
              <Route exact path="/">
                <Flow/>
              </Route>
              <Route>
                <NotFound/>
              </Route>
            </Switch>
          </Grid>
        </Grid>
      </Router>
    </>
  );
}

export default App;
