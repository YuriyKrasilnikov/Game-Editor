import React, {
  useState,
  useEffect,
} from 'react';

import { 
  useMessage
} from '../../Utilites/useMessage'

import { 
  useInput,
  useSelect
} from '../../Utilites/useInput'

import {
  GetProfile,
} from '../../../grpc/query/ProfileClient'

import {
  UpdateProfile
} from '../../../grpc/command/ProfileClient'

const Update = ( { nickname } ) => {

  const [ msg, inlineMsg, setMsg ] = useMessage();

  const [ upd_nickname, upd_nicknameInput ] = useInput({ type: "text", default_value: nickname});
  const [ upd_description, upd_descriptionInput ] = useInput({ type: "text", default_value:"default_description",  multiline:true, variant:"outlined"});
  const regex = RegExp('^[a-z]{3,}');

  return (
    <>
      <h2>{'~'.repeat(15)} Update { nickname } {'~'.repeat(15)}</h2>
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
                    value="Update"
                    onClick={() => {
                      UpdateProfile( { 
                          data: {
                            nickname: upd_nickname,
                            description: upd_description,
                          },
                          result: setMsg
                        } )
                    }}
                    disabled={!regex.test(upd_nickname)}
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

export { Update };
