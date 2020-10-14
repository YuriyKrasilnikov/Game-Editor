import React, {
    useState,
    useEffect
} from 'react';

import {
    useParams
} from "react-router-dom";

import { 
    useInput
  } from '../Utilites/useInput'

import { 
    RegistrationProfile
} from '../../utilities/grpc-client'


const Registration = ( ) => {

    const [add_nickname, add_nicknameInput] = useInput({ type: "text", default_value:"yuriy"});

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
                    <td align="right" colSpan="2">
                        <input
                        type="submit"
                        value="Insert"
                        onClick={() => {
                            RegistrationProfile( { 
                                nickname: add_nickname
                            } )
                            }
                        }
                        />
                    </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
  }

export { Registration };