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
  GetBilling,
} from '../../grpc/query/BillingClient'

import {
  CreatePaid,
} from '../../grpc/command/BillingClient'

const HomeworkApi = ( ) => {

  const key_options = ['nickname', 'value', 'status']

  const [ status, _ ] = useContext(StatusContext)

  const [ billing, setBilling ] = useState()

  const [ msg, inlineMsg, setMsg ] = useMessage();

  const [ get_key, get_keySelect ] = useSelect({ default_value: key_options[0], options: key_options })

  const [ get_value, get_valueInput] = useInput({ type: "text", default_value: "test" });

  const [ paid, paidInput] = useInput({ type: "number", default_value: "100" });

  const regexPaid = RegExp('^[0-9]{1,}');

  const reload = ( ) => {
    window.location.reload()
  }

  return (
    <>
      <h3>{'-'.repeat(15)} You name: {status ? status.nickname : '(need registered)'} {'-'.repeat(15)}</h3>

      <h2>{'~'.repeat(15)} Get Billing {'~'.repeat(15)}</h2>
      <table align="center" border="1" cellSpacing="0" cellPadding="7">
        <tbody>
          <tr>
            <td>
              {get_keySelect}
            </td>
            <td>
              {get_valueInput}
            </td>
          </tr>
          <tr>
            <td align="right" colSpan="2">
              <input
                type="submit"
                value="Get"
                onClick={() => {
                    GetBilling( { 
                      data: {
                        [ get_key ]: get_value,
                      },
                      result: setBilling,
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
      <table align="center" border="1" cellSpacing="0" cellPadding="7">
        <tbody>
          { billing && Object.entries(billing[0]).map( ([key, value]) => 
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

      <h2>{'~'.repeat(15)} Paid {'~'.repeat(15)}</h2>
      <table align="center" border="1" cellSpacing="0" cellPadding="7">
        <tbody align="left">
          <tr>
            <td>
              Value
            </td>
            <td>
              {paidInput}
            </td>
          </tr>
          <tr>
            <td align="right" colSpan="2">
              <input
                type="submit"
                value="Insert"
                onClick={() => {
                  CreatePaid( { 
                      data: {
                        value: paid,
                      },
                      result: setMsg,
                    } )
                }}
                disabled={ !regexPaid.test(paid) }
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