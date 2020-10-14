import React, {
    useState,
    useEffect
} from 'react';

import {
    useParams
} from "react-router-dom";

import { 
    GetProfile,
    InsertProfile,
    RemoveProfile
} from '../../utilities/grpc-client'

const Profile = ( ) => {
  
    const { nickname } = useParams();
  
    const [profile, setProfile] = useState()
  
    useEffect( ( ) => {
      GetProfile( { 
        nickname: nickname,
        fields: [],
        result: setProfile
      } )
    },[nickname]);
  
    if (profile) {
      return (
        <>
          <h2>{'~'.repeat(15)} Data "{nickname}" profile {'~'.repeat(15)}</h2>
          <table align="center" border="1" cellSpacing="0" cellPadding="7">
            <tbody>
              { profile && Object.entries(profile).map( ([key, value]) => 
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
        </>
      );
    } else {
      return (
        <h2>Нет данных...</h2>
      )
    }
  }

export { Profile };
