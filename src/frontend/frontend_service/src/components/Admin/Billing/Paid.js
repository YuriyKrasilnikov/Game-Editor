import React, {
  useState,
  useEffect,
} from 'react';

import { 
  useMessage
} from '../../Utilites/useMessage'

import { 
  useInput,
} from '../../Utilites/useInput'

import {
  Paid as PaidClient,
} from '../../../grpc/command/BillingClient'

const Paid = ( ) => {

  const [ msg, inlineMsg, setMsg ] = useMessage();

  //---

  const [ paid_nickname, paid_nicknameInput] = useInput({ type: "text", default_value: "test" });

  const [ paid_value, paid_valueInput] = useInput({ type: "number", default_value: "100" });

  const regexPaid = RegExp('^[0-9]{1,}');

  //---

  return (
    <>

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
                  PaidClient( { 
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

      <h3>{'-'.repeat(10)} Status {'-'.repeat(10)}</h3>
      {msg && inlineMsg}

    </>
  );
}

export { Paid };
