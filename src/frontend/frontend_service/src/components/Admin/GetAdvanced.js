import React, {
  useState,
  useEffect,
  useContext
} from 'react';

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
  GetBilling,
} from '../../grpc/query/BillingClient'

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

const GetAdvanced = ( ) => {

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

  const [ getService, getServiceSelect ] = useSelect({ default_value: Object.keys(key_service)[0], default_options: Object.keys(key_service) })

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

  const [ get_value, get_valueInput] = useInput({ type: "text", default_value: "test" });

  //---

  return (
    <>
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
              { get_valueInput }
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

    </>
  );
}

export { GetAdvanced };
