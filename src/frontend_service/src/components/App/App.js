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
  Navbar
} from '../Navbar/Navbar'

import { 
  Profile
} from '../Profile/Profile'

import { 
  Registration
} from '../Registration/Registration'

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
          <Route path="/">
            <Demo/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}


const Demo = ( ) => {

  const [profile, setProfile] = useState()
  
  const [get_nickname, get_nicknameInput] = useInput({ type: "text", default_value:"yuriy" });

  const [add_nickname, add_nicknameInput] = useInput({ type: "text", default_value:"test"});
  const [add_email, add_emailInput] = useInput({ type: "email", default_value:"test@test.com" });

  const [del_nickname, del_nicknameInput] = useInput({ type: "text", default_value:"test"});

  useEffect( ( ) => {
  },[]);

  return (
    <>
      <h1>oauth2-proxy</h1>
      <h1>authorization-profiles</h1>
      <div>
        <a href="https://arch.homework/authorization">
          Запись в базе
        </a>
      </div>
      <h1>orchestrator web-grpc</h1>
      <div>
        <h2>{'~'.repeat(15)} Get {'~'.repeat(15)}</h2>

        <table align="center" border="1" cellSpacing="0" cellPadding="7">
          <tbody>
            <tr>
              <td>
                Nickname
              </td>
              <td>
                {get_nicknameInput}
              </td>
            </tr>
            <tr>
              <td align="right" colSpan="2">
                <input
                  type="submit"
                  value="Get"
                  onClick={() => {
                      GetProfile( { 
                        nickname: get_nickname,
                        fields: [],
                        result: setProfile,
                        metadata: { "x-cheat": 'true' }
                      } )
                    }
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>

        <h3>{'-'.repeat(10)} Result {'-'.repeat(10)}</h3>
        <table align="center" border="1" cellSpacing="0" cellPadding="7">
          <tbody>
            { profile && Object.entries(profile).map( ([key, value]) => 
                <tr key={key} align="left">
                  <td>
                    {key}
                  </td>
                  <td>
                    {value}
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
        <h2>{'~'.repeat(15)} Insert {'~'.repeat(15)}</h2>
        <table align="center" border="1" cellSpacing="0" cellPadding="7">
          <tbody align="left">
            <tr>
              <td>
                Nickname
              </td>
              <td>
                {add_nicknameInput}
              </td>
            </tr>
            <tr>
              <td>
                Email
              </td>
              <td>
                {add_emailInput}
              </td>
            </tr>
            <tr>
              <td align="right" colSpan="2">
                <input
                  type="submit"
                  value="Insert"
                  onClick={() => {
                    InsertProfile( { 
                        nickname: add_nickname,
                        email: add_email,
                        fields: [],
                        result: '',
                        metadata: { "x-cheat": 'true' }
                      } )
                    }
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        <h2>{'~'.repeat(15)} Update {'~'.repeat(15)}</h2>
        <h2>{'~'.repeat(15)} Remove {'~'.repeat(15)}</h2>
        <table align="center" border="1" cellSpacing="0" cellPadding="7">
          <tbody>
            <tr>
              <td>
                Nickname
              </td>
              <td>
                {del_nicknameInput}
              </td>
            </tr>
            <tr>
              <td align="right" colSpan="2">
                <input
                  type="submit"
                  value="Remove"
                  onClick={() => {
                      RemoveProfile( { 
                        nickname: del_nickname,
                        fields: [],
                        result: '',
                        metadata: { "x-cheat": 'true' }
                      } )
                    }
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

export default App;
