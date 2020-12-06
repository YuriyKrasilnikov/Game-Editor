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
  CreateProfile,
} from '../../../grpc/command/ProfileClient'

const Insert = ( ) => {

  const [ msg, inlineMsg, setMsg ] = useMessage();

  //---
  const [ add_nickname, add_nicknameInput ] = useInput({ type: "text", default_value:"test"});
  const [ add_email, add_emailInput ] = useInput({ type: "email", default_value:"test@test.com" });


  return (
    <>
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

      <h3>{'-'.repeat(10)} Status {'-'.repeat(10)}</h3>
      {msg && inlineMsg}
    </>
  );
}

export { Insert };
