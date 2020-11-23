import React, {
    useState,
    useEffect
} from 'react';

import {
  useParams
} from "react-router-dom";

import {
  GetProfile,
} from '../../grpc/query/ProfileClient'

import {
  UpdateProfile,
} from '../../grpc/command/ProfileClient'

import { 
  useInput,
} from '../Utilites/useInput'

import { 
  useMessage
} from '../Utilites/useMessage'

const Profile = ( ) => {

    const editable = [ 'description' ]
  
    const { nickname } = useParams();
  
    const [ profile, setProfile ] = useState()
    
    const [ msg, inlineMsg, setMsg ] = useMessage();

    const [ toEdit, setToEdit ] = useState()

    const updateProfile = ( updateKey ) => ( updateValue ) => ( ) => {
      let result = { ...profile[0] }
      result[updateKey] = updateValue
      setProfile( [ result ] )
    }

    useEffect( ( ) => {
      GetProfile( { 
        data: {
          nickname: nickname,
        },
        result: setProfile,
        error: setMsg
      } )
    },[nickname]);
  
    if (profile) {
      return (
        <>
          <h2>{'~'.repeat(15)} Data "{nickname}" profile {'~'.repeat(15)}</h2>
          <table align="center" border="1" cellSpacing="0" cellPadding="7">
            <tbody>
              { profile && Object.entries(profile[0]).map( ([key, value], index) => 
                  <tr key={key} align="left">
                    <td>
                      {key}
                    </td>
                    <td>
                      <EditableСell
                        index={ index }
                        data_key={ key } 
                        value={ value }
                        editable={ editable.includes(key) }
                        editing={ toEdit==index }
                        setEdit={ setToEdit }
                        result={ setMsg }
                        callback={ updateProfile(key) }
                      />
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
          {msg && inlineMsg}
        </>
      );
    }
    return (
      <h2>Нет данных...</h2>
    )
  }

const EditableСell = ( { index, data_key, value, editable, editing, setEdit, result, callback } ) => {

  const [textarea, textareaInput, setTextarea] = useInput( { type: "text", default_value: value,  multiline:true, variant:"outlined"} );

  if (editing){
    return (
      <>
        { textareaInput }
        <button
          style={{backgroundColor:"lightgreen"}}
          onClick={
            ()=>{
              let data = {}
              data[data_key] = textarea
              UpdateProfile( { 
                data: data,
                result: result,
                callback: callback(textarea)
              } )
              setEdit();
            }
          }
          disabled={value==textarea}
        > V </button>
        <button
          onClick={
            ()=>{
              setTextarea(value)
            }
          }
          disabled={value==textarea}
        > C </button>
        <button
          style={{backgroundColor:"coral"}}
          onClick={
            ()=>{
              setEdit();
            }
          }
        > X </button>
      </>
    );
  }else{
    return (
      <>
        {value}
        {" "}
        {editable && <button onClick={()=>{ setEdit(index) }}> Edit </button>}
      </>
    )
  }
}

export { Profile };
