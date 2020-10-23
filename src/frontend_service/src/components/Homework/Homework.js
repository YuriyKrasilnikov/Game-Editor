import React, {
  useState,
  useEffect,
  useContext
} from 'react';

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

import { StatusContext } from '../../utilities/context'

import { 
  GetProfile,
  InsertProfile,
  RemoveProfile
} from '../../utilities/grpc-client'

import { 
  useError
} from '../Utilites/useError'

const HomeworkApi = ( ) => {

  const [ status, _ ] = useContext(StatusContext)

  const [ createUser, setCreateUser ] = useState();

  const [ error, errorMsg, setError ] = useError();

  return (
    <>
      <h1>Домашняя работа Backend for frontends. Apigateway</h1>
      <h2>1. Регистрация пользователя и вход пользователя:</h2>
      {
        status && status['nickname']
        ? <> 
            {"Пользователь "+status['nickname']+" — авторизирован. Чтобы выйти нажмите: "}
            <a href='https://arch.homework/oauth2/sign_out'>
              Выход
            </a>
          </>
        : <>
            {"Пользователь не авторизирован! Чтобы войти или зарегистрироваться нажмите: "}
            <a href="https://arch.homework/oauth2/">
              Вход
            </a>
        </>
      }
      <h2>2. Проверка, что изменение и получение профиля пользователя недоступно без логина:</h2>
      <>
        {"Используем 'чит' для создания случайного пользователя: "}<br/>
        <input
          type="submit"
          value="Insert"
          onClick={() => {
              InsertProfile( { 
                data: {
                  nickname: Math.random().toString(36).substring(2, 15),
                  email: Math.random().toString(36).substring(2, 5)+'@'+Math.random().toString(36).substring(2, 5),
                },
                result: setCreateUser,
                error: setError,
                metadata: { "x-cheat": 'true' }
              } )
            }
          }
        />
        <table align="center" border="1" cellSpacing="0" cellPadding="7">
          <tbody>
            { createUser &&
              Object.entries(createUser[0]).map( ([key, value]) => 
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
        { createUser && <Link to={"/profile/"+createUser[0]['nickname']}>Перейти в профиль {createUser[0]['nickname']}</Link>}
      </>
      <h2>3. Изменение профиля пользователя: </h2>
      {
        status && status['nickname']
        ? <> 
            {"Пользователь "+status['nickname']+" — авторизирован. Изменение профиля пользователя доступено по ссылке: "}
            <Link to={"/profile/"+status['nickname']}>Перейти в профиль {status['nickname']}</Link>
          </>
        : <>
            {"Пользователь не авторизирован! Чтобы войти или зарегистрироваться нажмите: "}
            <a href="https://arch.homework/oauth2/">
              Вход
            </a>
        </>
      }
    </>
  );
}

export { HomeworkApi };