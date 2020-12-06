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
  RemoveProfile
} from '../../../grpc/command/ProfileClient'

const Remove = ( ) => {

  const [ msg, inlineMsg, setMsg ] = useMessage();

  //---

  const [ rmv_nickname, rmv_nicknameInput ] = useInput({ type: "text", default_value:"test"});
  const [ rmv_email, rmv_emailInput ] = useInput({ type: "email", default_value:"test@test.com" });

  //---

  return (
    <>
      <h2>{'~'.repeat(15)} Remove {'~'.repeat(15)}</h2>
      <table border="1" cellSpacing="0" cellPadding="7">
        <tbody align="left">
          <tr>
            <td>
              Nickname
            </td>
            <td>
              {rmv_nicknameInput}
            </td>
          </tr>
          <tr>
            <td>
              Email
            </td>
            <td>
              {rmv_emailInput}
            </td>
          </tr>
          <tr>
            <td align="right" colSpan="2">
              <input
                type="submit"
                value="Remove"
                onClick={() => {
                  RemoveProfile( { 
                      data: {
                        nickname: rmv_nickname,
                        email: rmv_email,
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

export { Remove };
