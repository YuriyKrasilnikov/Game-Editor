import React, {
  useState,
  useEffect,
  useContext
} from 'react';

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

import { StatusContext } from '../../grpc/context'

import { 
  useInput,
  useTextarea,
  useSelect
} from '../Utilites/useInput'

import { 
  useMessage
} from '../Utilites/useMessage'

import {
  GetProfile,
} from '../../grpc/query/ProfileClient'

import {
  CreateProfile,
  UpdateProfile,
  RemoveProfile
} from '../../grpc/command/ProfileClient'

import {
  GetBilling,
} from '../../grpc/query/BillingClient'

import {
  Paid,
  Buy,
} from '../../grpc/command/BillingClient'

import {
  GetChartId,
} from '../../grpc/query/ChartsClient'

const transpose = m => 
  m.length > 0 ? m[0].map( (x,i) => m.map(x => x[i]) ) : m

const unnormalize = (object, result = {} ) => {
  if (object.constructor === Object){
    Object.entries(object).forEach( ([key, value]) => {
      if (value.constructor === Object || value.constructor === Array){
        result = unnormalize(value, result)
      } else {
        if ( !(key in result) ) { 
          result[key] = []
        }
        result[key].push(value)
      }
    })
  } else if (object.constructor === Array){
    object.forEach( (value) => {
      if (value.constructor === Object || value.constructor === Array){
        result = unnormalize(value, result)
      }
    })
  }
  return result;
}

const Json2table = ( { json_obj } ) => {

  const [logs, setLogs] = useState([])

  //---
  useEffect(() => {
    if (json_obj) {
      setLogs( unnormalize( json_obj ) )
    } else {
      setLogs( [] )
    }

    console.log(logs.length)

  }, [json_obj]);

  return <table border="1" cellSpacing="0" cellPadding="7">
            <caption>Результат запроса:</caption>
            <thead>
              <tr>
                { logs.length !== 0 && <th>№</th> }
                {
                  Object.keys(logs).map( (key) => {
                    return <th key={key}>{key}</th>
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                transpose( Object.values(logs) ).map( (value, i) => {
                  return <tr key={i}>
                    <td>{i}</td>
                    {
                      value.map((obj, i) => 
                        <td key={i}>{obj}</td>
                      )
                    }
                  </tr>
                })
              }
            </tbody>
          </table>
}

const HomeworkApi = ( ) => {

  const [ status, _ ] = useContext(StatusContext)

  const [ answer, setAnswer ] = useState()

  const [ msg, inlineMsg, setMsg ] = useMessage();

  //---

  const key_service = { 
    'profile':{
      'options': ['nickname', 'email', 'description'],
      'function': GetProfile
    },
    'billing':{
      'options': ['nickname', 'value', 'status'],
      'function': GetBilling
    },
    'charts':{
      'options': ['nickname'],
      'function': GetChartId
    }
  }

  const [ getService, getServiceSelect ] = useSelect({ default_value: Object.keys(key_service)[2], default_options: Object.keys(key_service) })

  const [ 
    getServiceValue,
    getServiceValueSelect,
    setServiceValue,
    setServiceOptions,
  ] = useSelect({ default_value: key_service[ getService ]['options'][0], default_options: key_service[ getService ]['options'] })

  useEffect( ( ) => {
    
    setServiceOptions( key_service[ getService ]['options'] )
    setServiceValue( key_service[ getService ]['options'][0] )

  },[ getService ]);


  //---

  const [ get_nickname, get_nicknameInput] = useInput({ type: "text", default_value:"test" });

  const [ add_nickname, add_nicknameInput ] = useInput({ type: "text", default_value:"test"});
  const [ add_email, add_emailInput ] = useInput({ type: "email", default_value:"test@test.com" });

  const [ upd_nickname, upd_nicknameInput ] = useInput({ type: "text", default_value:"yuriy"});
  const [ upd_description, upd_descriptionInput ] = useTextarea({ default_value:"default_description" });
  const regex = RegExp('^[a-z]{3,}');

  const [ rmv_nickname, rmv_nicknameInput ] = useInput({ type: "text", default_value:"test"});
  const [ rmv_email, rmv_emailInput ] = useInput({ type: "email", default_value:"test@test.com" });

  //---

  const [ get_value, get_valueInput] = useInput({ type: "text", default_value: "test" });

  const [ paid_nickname, paid_nicknameInput] = useInput({ type: "text", default_value: "test" });

  const [ paid_value, paid_valueInput] = useInput({ type: "number", default_value: "100" });

  const regexPaid = RegExp('^[0-9]{1,}');

  const [ buy_nickname, buy_nicknameInput] = useInput({ type: "text", default_value: "test" });

  const [ buy_value, buy_valueInput] = useInput({ type: "number", default_value: "100" });

  const regexBuy = RegExp('^[0-9]{1,}');

  const reload = ( ) => {
    window.location.reload()
  }

  return (
    <>

      <h2>Регистрация пользователя и вход пользователя:</h2>
      {
        status && status.nickname
        ? <> 
            {"Пользователь "+status.nickname+" — авторизирован. Чтобы выйти нажмите: "}
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
      <p>{'—'.repeat(30)}</p>
      <h2>{'~'.repeat(15)} Запросы {'~'.repeat(15)}</h2>
      <table border="1" cellSpacing="0" cellPadding="7">
        <tbody>
          <tr>
            <td>
              { getServiceSelect }
            </td>
            <td>
              { getServiceValueSelect }
            </td>
            <td>
              {get_valueInput}
            </td>
          </tr>
          <tr>
            <td align="right" colSpan="3">
              <input
                type="submit"
                value="Get"
                onClick={() => {
                    key_service[ getService ]['function']( { 
                      data: {
                        [ getServiceValue ]: get_value,
                      },
                      result: setAnswer,
                      error: setMsg,
                      metadata: { "x-cheat": 'true' }
                    } )
                  }
                }
              />
            </td>
          </tr>
        </tbody>
      </table>

      <Json2table json_obj={ answer } />

      <p>{'—'.repeat(30)}</p>
      <h2>{'~'.repeat(15)} Insert {'~'.repeat(15)}</h2>
      <p>Создание пользователя и создание аккаунт в биллинге при помощи саги.</p>
      <table border="1" cellSpacing="0" cellPadding="7">
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
                  CreateProfile( { 
                      data: {
                        nickname: add_nickname,
                        email: add_email,
                      },
                      result: setMsg,
                      metadata: { "x-cheat": 'true' }
                    } )
                }}
              />
            </td>
          </tr>
        </tbody>
      </table>


      <p>{'—'.repeat(30)}</p>
      <h2>{'~'.repeat(15)} Paid {'~'.repeat(15)}</h2>
      <p>Положить деньги на счет пользователя.</p>
      <table border="1" cellSpacing="0" cellPadding="7">
        <tbody align="left">
          <tr>
            <td>
              Nickname
            </td>
            <td>
              {paid_nicknameInput}
            </td>
          </tr>
          <tr>
            <td>
              Value
            </td>
            <td>
              {paid_valueInput}
            </td>
          </tr>
          <tr>
            <td align="right" colSpan="2">
              <input
                type="submit"
                value="Insert"
                onClick={() => {
                  Paid( { 
                      data: {
                        nickname: paid_nickname,
                        value: paid_value,
                      },
                      result: setMsg,
                    } )
                }}
                disabled={ !regexPaid.test(paid_value) }
              />
            </td>
          </tr>
        </tbody>
      </table>

      <p>{'—'.repeat(30)}</p>
      <h2>{'~'.repeat(15)} Buy {'~'.repeat(15)}</h2>
      <p>Снять деньги со счета пользователя.</p>
      <table border="1" cellSpacing="0" cellPadding="7">
        <tbody align="left">
          <tr>
            <td>
              Nickname
            </td>
            <td>
              {buy_nicknameInput}
            </td>
          </tr>
          <tr>
            <td>
              Value
            </td>
            <td>
              {buy_valueInput}
            </td>
          </tr>
          <tr>
            <td align="right" colSpan="2">
              <input
                type="submit"
                value="Buy"
                onClick={() => {
                  Buy( { 
                      data: {
                        nickname: buy_nickname,
                        value: buy_value,
                      },
                      result: setMsg,
                    } )
                }}
                disabled={ !regexBuy.test(paid_value) }
              />
            </td>
          </tr>
        </tbody>
      </table>

      <h3>{'-'.repeat(10)} Status {'-'.repeat(10)}</h3>
      {msg && inlineMsg}
    </>
  );
}

export { HomeworkApi };