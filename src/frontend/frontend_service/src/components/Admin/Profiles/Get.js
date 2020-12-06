import React, {
  useState,
  useEffect,
  useContext
} from 'react';

import {
  useParams,
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

import { StatusContext } from '../../grpc/context'

import { 
  useMessage
} from '../Utilites/useMessage'

import { 
  useInput,
  useSelect
} from '../Utilites/useInput'

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

const EditableСell = ( { index, data_key, value, editable, editing, setEdit, result, callback } ) => {

  const [textarea, textareaInput, setTextarea] = useInput( { type: "text", default_value: value,  multiline:true, variant:"outlined"} );
  
  if (editing){
    return (
      <>
        { textareaInput }
        <button
          style={{backgroundColor:"lightgreen"}}
          onClick={
            ()=>{
              let data = {}
              data[data_key] = textarea
              UpdateProfile( { 
                data: data,
                result: result,
                callback: callback(textarea)
              } )
              setEdit();
            }
          }
          disabled={value==textarea}
        > V </button>
        <button
          onClick={
            ()=>{
              setTextarea(value)
            }
          }
          disabled={value==textarea}
        > C </button>
        <button
          style={{backgroundColor:"coral"}}
          onClick={
            ()=>{
              setEdit();
            }
          }
        > X </button>
      </>
    );
  }else{
    return (
      <>
        {value}
        {" "}
        {editable && <button onClick={()=>{ setEdit(index) }}> Edit </button>}
      </>
    )
  }
}

const Get = ( ) => {

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
  const [ upd_description, upd_descriptionInput ] = useInput({ type: "text", default_value:"default_description",  multiline:true, variant:"outlined"});
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

  //---

  const [ get_nickname, get_nicknameInput] = useInput({ type: "text", default_value:"test" });

  const [ add_nickname, add_nicknameInput ] = useInput({ type: "text", default_value:"test"});
  const [ add_email, add_emailInput ] = useInput({ type: "email", default_value:"test@test.com" });

  const [ upd_nickname, upd_nicknameInput ] = useInput({ type: "text", default_value:"yuriy"});
  const [ upd_description, upd_descriptionInput ] = useInput({ type: "text", default_value:"default_description",  multiline:true, variant:"outlined"});
  const regex = RegExp('^[a-z]{3,}');

  const [ rmv_nickname, rmv_nicknameInput ] = useInput({ type: "text", default_value:"test"});
  const [ rmv_email, rmv_emailInput ] = useInput({ type: "email", default_value:"test@test.com" });

  //---

  const reload = ( ) => {
    window.location.reload()
  }

  return (
    <>
      <h1>Profiles</h1>
      <h2>{'~'.repeat(15)} Get {'~'.repeat(15)}</h2>
      <table border="1" cellSpacing="0" cellPadding="7">
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
                      data: {
                        nickname: get_nickname,
                      },
                      result: setProfile,
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

      <h3>{'-'.repeat(10)} Result {'-'.repeat(10)}</h3>
      <table border="1" cellSpacing="0" cellPadding="7">
        <tbody>
          { profile && Object.entries(profile[0]).map( ([key, value]) => 
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

      <h3>{'-'.repeat(10)} Status {'-'.repeat(10)}</h3>
      {msg && inlineMsg}
    </>
  );
}

export { Get };
