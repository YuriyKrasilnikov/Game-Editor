import React, {
  useState,
  useEffect,
} from 'react';

import { 
  useMessage
} from '../../Utilites/useMessage'

import { 
  useInput
} from '../../Utilites/useInput'

import {
  Buy as BuyClient,
} from '../../../grpc/command/BillingClient'

const Buy = ( ) => {

  const [ msg, inlineMsg, setMsg ] = useMessage();

  const [ buy_nickname, buy_nicknameInput] = useInput({ type: "text", default_value: "test" });

  const [ buy_value, buy_valueInput] = useInput({ type: "number", default_value: "100" });

  const regexBuy = RegExp('^[0-9]{1,}');

  return (
    <>

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
                  BuyClient( { 
                      data: {
                        nickname: buy_nickname,
                        value: buy_value,
                      },
                      result: setMsg,
                    } )
                }}
                disabled={ !regexBuy.test(buy_value) }
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

export { Buy };
