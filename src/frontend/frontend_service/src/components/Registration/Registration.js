import React, {
  useState,
  useEffect,
  useReducer
} from 'react';

import { 
  useInput,
  useTextarea
} from '../Utilites/useInput'

import { 
  useMessage
} from '../Utilites/useMessage'

import {
  UpdateProfile
} from '../../grpc/command/ProfileClient'


const Registration = ( ) => {

  const [ msg, inlineMsg, setMsg ] = useMessage();

  const [upd_nickname, upd_nicknameInput] = useInput({ type: "text", default_value:"yuriy"});
  const [upd_description, upd_descriptionInput] = useTextarea({ default_value:"default_description" });
  const regex = RegExp('^[a-z]{3,}');

  const reload = ( ) => {
    window.location.reload()
  }

  return (
      <>
          <h2>{'~'.repeat(15)} Registration {'~'.repeat(15)}</h2>
          <table border="1" cellSpacing="0" cellPadding="7">
              <tbody align="left">
                  <tr>
                    <td>
                      Nickname
                    </td>
                    <td>
                      {upd_nicknameInput}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      Description
                    </td>
                    <td>
                      {upd_descriptionInput}
                    </td>
                  </tr>
                  <tr>
                    <td align="right" colSpan="2">
                        <input
                            type="submit"
                            value="Insert"
                            onClick={() => {
                              UpdateProfile( { 
                                  data: {
                                    nickname: upd_nickname,
                                    description: upd_description,
                                  },
                                  result: setMsg,
                                  callback: reload
                                } )
                            }}
                            disabled={!regex.test(upd_nickname)}
                        />
                    </td>
                  </tr>
              </tbody>
          </table>
          {msg && inlineMsg}
      </>
  );
}

export { Registration };