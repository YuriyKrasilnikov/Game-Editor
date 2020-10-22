import React, {
    useState,
    useEffect,
    useReducer
  } from 'react';

import {
    useParams
  } from "react-router-dom";

import { 
    useInput,
    useTextarea
  } from '../Utilites/useInput'

import { 
    RegistrationProfile
  } from '../../utilities/grpc-client'


const Registration = ( ) => {

    const [add_nickname, add_nicknameInput] = useInput({ type: "text", default_value:"yuriy"});
    const [add_description, add_descriptionInput] = useTextarea({ default_value:"default_description" });
    const regex = RegExp('^[a-z]{3,}');

    return (
        <>
            <h2>{'~'.repeat(15)} Registration {'~'.repeat(15)}</h2>
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
                        Description
                      </td>
                      <td>
                        {add_descriptionInput}
                      </td>
                    </tr>
                    <tr>
                      <td align="right" colSpan="2">
                          <input
                              type="submit"
                              value="Insert"
                              onClick={() => {
                                    RegistrationProfile( { 
                                      data: {
                                        nickname: add_nickname,
                                        description: add_description,
                                      },
                                    } )
                                    window.location.reload();
                                  }
                              }
                              disabled={!regex.test(add_nickname)}
                          />
                      </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
  }

export { Registration };