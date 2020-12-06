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
  CssBaseline,
  Toolbar,
  Grid,
} from '@material-ui/core';

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
  Admin
} from '../Admin/Admin'

import { 
  FlowBase
} from '../Flow/FlowBase'

const App = ( ) => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar />
        <Grid container component='main' direction='column' wrap='nowrap'>
          <Toolbar />
          <Grid container item xs={12} direction='column' wrap='nowrap'>
            <Switch>
              <Route path="/registration">
                <Registration/>
              </Route>
              <Route path="/profile/:nickname">
                <Profile/>
              </Route>
              <Route path="/admin">
                <Admin/>
              </Route>
              <Route exact path="/">
                <FlowBase />
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
