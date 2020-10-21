import React, {
    useState,
    useEffect,
    useContext 
} from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import { 
  IdentificationProfile
} from '../../utilities/grpc-client'

import { StatusContext } from '../../utilities/context'


const Navbar = ( ) => {

  const [ status, _ ] = useContext(StatusContext)

  return (
      <>
          <div>
              <a href="https://arch.homework">
                Home
              </a>
              {' |~| '}
              <a href="https://arch.homework/profiles_cheats">
                Profiles Admin Panel
              </a>
              {' | '}
              <a href="https://arch.homework/records_cheats">
                Records Admin Panel
              </a>
              {' |~| '}
              <a href="https://arch.homework/oauth2/">
                Вход
              </a>
              {' | '}
              <a href="https://arch.homework/oauth2/auth">
                Проверка авторизации
              </a>
              {' | '}
              <a href="https://arch.homework/oauth2/userinfo">
                Информация
              </a>
              {' | '}
              <a href="https://arch.homework/oauth2/sign_out">
                Выход
              </a>
              { status && status['nickname'] && Profile( { nickname: status['nickname'] } ) } 
          </div>
      </>
  );
}

const Profile = ( { nickname } ) => {
  return (
    <>
      {' |~| '}
      <Link to={"/profile/"+nickname}>Profile</Link>
    </>
  );
}


export { Navbar };