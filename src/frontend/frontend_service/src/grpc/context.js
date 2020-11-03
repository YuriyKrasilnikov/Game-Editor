import React, { useEffect, useState, useReducer, createContext } from 'react'

import { 
  IdentificationProfile
} from './query/ProfileClient'

const StatusContext = createContext(undefined)

const StatusObserver = ( { children } ) => {

  const [reset, forceUpdate] = useReducer((x) => x + 1, 0);
  const [status, setStatus] = useState()

  const identification = ( value ) => {
    if (value){
      setStatus({
        nickname: value['nickname']
      })
   }
  }

  useEffect( ( ) => {
    IdentificationProfile( {
      result: identification
    } )
  },[reset]);

  return(
    <StatusContext.Provider value={ [status, forceUpdate] }>
      {children}
    </StatusContext.Provider>
  );
};

export { StatusContext, StatusObserver }
