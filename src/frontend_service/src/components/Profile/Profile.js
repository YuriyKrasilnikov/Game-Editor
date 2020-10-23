import React, {
    useState,
    useEffect
} from 'react';

import {
    useParams
} from "react-router-dom";

import { 
    GetProfile,
    UpdateProfile
} from '../../utilities/grpc-client'

import { 
  useInput,
  useTextarea
} from '../Utilites/useInput'

import { 
  useError
} from '../Utilites/useError'

const Profile = ( ) => {

    const editable = [ 'description' ]
  
    const { nickname } = useParams();
  
    const [ profile, setProfile ] = useState()
    
    const [ error, errorMsg, setError ] = useError();

    const [ toEdit, setToEdit ] = useState()

    const updateProfile = (data) => {
      let result = { ...profile[0] }
      Object.entries(data[0]).forEach( ([key, value]) => {
          if (value) {
            result[key] = value
          }
        }
      )
      setProfile( [ result ] )
    }

    useEffect( ( ) => {
      GetProfile( { 
        data: {
          nickname: nickname,
        },
        result: setProfile,
        error: setError,
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
                        result={ updateProfile }
                      />
                    </td>
                  </tr>
                )
              }
            </tbody>
          </table>
        </>
      );
    } else {
      if (error) {
        return (
          <h2>Ошибка: {error}</h2>
        )
      }
    }
    return (
      <h2>Нет данных...</h2>
    )
  }

const EditableСell = ( { index, data_key, value, editable, editing, setEdit, result} ) => {

  const [textarea, textareaInput, setTextarea] = useTextarea( { default_value: value } );

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
        {value}{" "}
        {editable && <button onClick={()=>{ setEdit(index) }}> Edit </button>}
      </>
    )
  }
}

export { Profile };
