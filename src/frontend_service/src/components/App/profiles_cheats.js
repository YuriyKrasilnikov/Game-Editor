
import React, {
  useState,
  useEffect,
  useReducer
} from 'react';

import { 
  GetProfile,
  InsertProfile,
  RemoveProfile
} from '../../utilities/grpc-client'

import { 
  useInput
} from '../Utilites/useInput'

const ProfilesCheats = ( ) => {

  const [profile, setProfile] = useState()

  const [get_nickname, get_nicknameInput] = useInput({ type: "text", default_value:"yuriy" });

  const [add_nickname, add_nicknameInput] = useInput({ type: "text", default_value:"test"});
  const [add_email, add_emailInput] = useInput({ type: "email", default_value:"test@test.com" });

  const [del_nickname, del_nicknameInput] = useInput({ type: "text", default_value:"test"});

  let updateProfilesList

  return (
    <>
      <h1>oauth2-proxy</h1>
      <h1>authorization-profiles</h1>
      <div>
        <a href="https://arch.homework/authorization">
          Запись в базе
        </a>
      </div>
      <h1>orchestrator web-grpc</h1>
      <div>
        <h2>{'~'.repeat(15)} Profiles List {'~'.repeat(15)}</h2>
        <ProfilesListTable
          update={
            (func) => { 
              updateProfilesList=func
            }
          }
        />
        <h2>{'~'.repeat(15)} Get {'~'.repeat(15)}</h2>
        <table align="center" border="1" cellSpacing="0" cellPadding="7">
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
        <table align="center" border="1" cellSpacing="0" cellPadding="7">
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
                      InsertProfile( { 
                        data: {
                          nickname: add_nickname,
                          email: add_email,
                        },
                        result: ()=>{updateProfilesList()},
                        metadata: { "x-cheat": 'true' }
                      } )
                    }
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
        <h2>{'~'.repeat(15)} Update {'~'.repeat(15)}</h2>
        <h2>{'~'.repeat(15)} Remove {'~'.repeat(15)}</h2>
        <table align="center" border="1" cellSpacing="0" cellPadding="7">
          <tbody>
            <tr>
              <td>
                Nickname
              </td>
              <td>
                {del_nicknameInput}
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
                          nickname: del_nickname,
                        },
                        result: ()=>{updateProfilesList()},
                        metadata: { "x-cheat": 'true' }
                      } )
                    }
                  }
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  )
}

const ProfilesListTable = ( { update } ) => {

  const [profilesList, setProfilesList] = useState()
  const [reset, forceUpdate] = useReducer((x) => x + 1, 0);

  const resultProfilesList = ( data ) => {

    let data_list = [[]]

    data.forEach( (d, index) => {
      data_list[index+1] = []
      Object.entries(d).forEach( ([key, value]) => {
        if ( !(data_list[0].includes(key)) ){
          data_list[0].push(key)
        }
        data_list[index+1][ data_list[0].indexOf(key) ] = value
      })
  
    })

    setProfilesList(data_list)
  }

  useEffect( ( ) => {
    update( forceUpdate )
  },[]);

  useEffect( ( ) => {
    GetProfile( { 
      data: {},
      result: resultProfilesList,
      metadata: { "x-cheat": 'true' }
    } )
  },[reset]);

  return (
    <>
      <table align="center" border="1" cellSpacing="0" cellPadding="7">
        <tbody>
          {
            profilesList && profilesList.map( (list, index) => 
              <tr key={index} align="left">
                {
                  list.map( (value, index) => 
                    <td key={index}>
                      {value}
                    </td>
                  )
                }
              </tr>
            )
          }      
        </tbody>
      </table>
    </>
  );
}

export { ProfilesCheats };