import React, {
  useState,
  useEffect
} from 'react';

import {
  useParams
} from "react-router-dom";


const Record = ( ) => {

  const { id } = useParams();

  const [record, setRecord] = useState()

  useEffect( ( ) => {

  },[id]);

  if (record) {
    return (
      <>
        <h2>{'~'.repeat(15)} Data "{id}" record {'~'.repeat(15)}</h2>
        <table align="center" border="1" cellSpacing="0" cellPadding="7">
          <tbody>
            { record && Object.entries(record).map( ([key, value]) => 
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

export { Record };
