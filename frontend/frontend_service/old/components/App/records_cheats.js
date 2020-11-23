
import React, {
  useState,
  useEffect
} from 'react';

import { 
  GetRecord,
  InsertRecord,
} from '../../utilities/grpc-client'

import { 
  useInput
} from '../Utilites/useInput'

const RecordKey = Object.freeze({
  UNKNOWN:    0,
  ID:         1,
  CREATEDAT:  2,
  LASTUPDATE: 3,
  NICKNAME:   4,
  RECORD:     5,
});

const Operand = Object.freeze({
  NONE:       0,
  IN:         1, // in or ==
  OUT:        2, // out or !=
  LESS:       3, // less or <
  GREATER:    4, // greater or >
  EQLESS:     5, // not greater or <=
  EQGREATER:  6, // not less or >=
});

const Direction = Object.freeze({
  NOT:  0,
  MIN:  1,
  MAX:  2,
});

const RecordsCheats = ( ) => {

  const [add_record, add_recordInput] = useInput({ type: "text", default_value:"test record"});

  return (
    <>
      <h2>{'~'.repeat(15)} GetById {'~'.repeat(15)}</h2>
      <h3>{'-'.repeat(10)} Result {'-'.repeat(10)}</h3>
      <h2>{'~'.repeat(15)} Insert {'~'.repeat(15)}</h2>
      <table align="center" border="1" cellSpacing="0" cellPadding="7">
          <tbody>
            <tr>
              <td>
                Nickname
              </td>
              <td>
                {add_recordInput}
              </td>
            </tr>
            <tr>
              <td align="right" colSpan="2">
                <input
                  type="submit"
                  value="Add Record"
                  onClick={() => {
                    InsertRecord( { 
                        record: add_record,
                        result: '',
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
      <h2>{'~'.repeat(15)} RemoveById {'~'.repeat(15)}</h2>
      <h2>{'~'.repeat(15)} GetWithPagination {'~'.repeat(15)}</h2>
      <RecordsListTable />
    </>
  )
}

const RecordsListTable = ( ) => {
  const [recordsList, setRecordsList] = useState()
  const filters=[
    {
      key: RecordKey.NICKNAME,
      operand: Operand.IN,
      values: [ 'yuriy' ]
    }
  ]
  const orders=[
    {
      key: RecordKey.CREATEDAT,
      direction: Direction.MIN
    }
  ]
  const cursor=''

  useEffect( ( ) => {
    GetRecord( { 
      filters: filters,
      orders: orders,
      cursor: cursor,
      result: '',
      limit: 10,
      metadata: { "x-cheat": 'true' }
    } )
  },[]);

  return (
    <>
      RecordsListTable
    </>
  );
}

export { RecordsCheats };