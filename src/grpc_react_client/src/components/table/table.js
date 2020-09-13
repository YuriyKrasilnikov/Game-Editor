import React, {useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import MaterialTable from 'material-table'
import { tableIcons } from './icons'

import { 
  getAll,
  insert,
  get,
  remove,
  update
} from '../../utilities/grpc-client'


const Table = ( ) =>{
  const [data, setData] = useState([])

  useEffect( ( ) => {
      getAll( { 
        result: (rawdata) => {
          setData( rawdata.customersList )
        }
      })
      /*
      setInterval(()=>{
        for (let i = 0; i < 50; i++) {
          getAll( { 
            result: (rawdata) => {
  
            }
          })
        }
      }, 1000);
      */
  },[]);

  return <MaterialTable
          icons={ tableIcons }
          columns = {[ 
            { title: 'Id', field: 'id', editable: 'never' },
            { title: 'Created', field: 'createdAt', type:'datetime', editable: 'never'},
            { title: 'Name', field: 'name' },
            { title: 'Age', field: 'age', type: 'numeric'},
            { title: 'Address', field: 'address' },
          ]}
          data={ data }
          title="Таблица CRUD"
          editable={
            {
              onRowAdd: (newData) => 
                new Promise((resolve, reject) => {
                  newData.result = resolve
                  insert(
                    newData
                  )
                }).then((val) => {
                  setData( [...data, val.customer] )
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                  newData.result = resolve
                  update(
                    newData
                  )
                }).then(()=>{
                  const dataUpdate  = [...data];
                  const index = oldData.tableData.id;
                  dataUpdate[index] = newData;;
                  setData([...dataUpdate]);
                }),
              onRowDelete: (oldData) => 
                new Promise((resolve, reject) => {
                  remove({
                    id: oldData.id,
                    result: resolve
                  })
                }).then(()=>{
                  const dataDelete = [...data];
                  const index = oldData.tableData.id;
                  dataDelete.splice(index, 1);
                  setData([...dataDelete]);
                }),
            }
          }
        />
}


export default Table;