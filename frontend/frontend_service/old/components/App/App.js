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
  HomeworkApi
} from '../Homework/Homework'


const App = ( ) => {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
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
