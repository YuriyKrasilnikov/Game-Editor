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
  useInput
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

const ProfilesCheats = ( ) => {

  const [ status, _ ] = useContext(StatusContext)

  const [ profile, setProfile ] = useState()

  const [ msg, inlineMsg, setMsg ] = useMessage();

  const [ get_nickname, get_nicknameInput] = useInput({ type: "text", default_value:"test" });

  const [ add_nickname, add_nicknameInput ] = useInput({ type: "text", default_value:"test"});
  const [ add_email, add_emailInput ] = useInput({ type: "email", default_value:"test@test.com" });

  const [ upd_nickname, upd_nicknameInput ] = useInput({ type: "text", default_value:"yuriy"});
  const [ upd_description, upd_descriptionInput ] = useInput({ type: "text", default_value:"default_description",  multiline:true, variant:"outlined"});
  const regex = RegExp('^[a-z]{3,}');

  const [ rmv_nickname, rmv_nicknameInput ] = useInput({ type: "text", default_value:"test"});
  const [ rmv_email, rmv_emailInput ] = useInput({ type: "email", default_value:"test@test.com" });

  const reload = ( ) => {
    window.location.reload()
  }

  return (
    <>
      <h1>ProfilesCheats</h1>
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

      <h2>{'~'.repeat(15)} Insert {'~'.repeat(15)}</h2>
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

      <h2>{'~'.repeat(15)} Update {status ? status.nickname : '(need registered)'} {'~'.repeat(15)}</h2>
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

export { ProfilesCheats };