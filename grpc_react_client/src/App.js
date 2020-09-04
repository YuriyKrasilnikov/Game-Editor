import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import { getAll, insert, get } from './grpc-client'

const unnormalize = (object, result) => {
  if (object.constructor === Object){
    Object.entries(object).forEach( ([key, value]) => {
      if (value.constructor === Object || value.constructor === Array){
        result = unnormalize(value, result)
      } else {
        if ( !(key in result) ) { 
          result[key] = []
        }
        result[key].push(value)
      }
    })
  } else if (object.constructor === Array){
    object.forEach( (value) => {
      if (value.constructor === Object || value.constructor === Array){
        result = unnormalize(value, result)
      }
    })
  }
  return result;
}

const transpose = m => 
  m.length > 0 ? m[0].map( (x,i) => m.map(x => x[i]) ) : m


const json2table = ( { json_obj } ) => {

  console.log('json_obj', json_obj)

  const logs = unnormalize( json_obj, {} )

  return <table cellSpacing="2" border="1" cellPadding="5">
            <thead>
              <tr>
                <th>№</th>
                {
                  Object.keys(logs).map( (key) => {
                     return <th key={key}>{key}</th>
                  })
                }
              </tr>
            </thead>
            <tbody>
              {
                transpose( Object.values(logs) ).map( (value, i) => {
                  return <tr key={i}>
                    <td>{i}</td>
                    {
                      value.map((obj, i) => 
                        <td key={i}>{obj}</td>
                      )
                    }
                  </tr>
                })
              }
            </tbody>
          </table>
}

const useInput = ({ type }) => {
  const [value, setValue] = useState("");

  const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;

  return [value, input];
}

const toggleArrayValue = (arrayList, arrayValue) =>
  arrayList.includes(arrayValue)
    ? arrayList.filter(el => el !== arrayValue)
    : [...arrayList, arrayValue]

const useSelect = ({ options }) => {
  const [value, setValue] = useState([options[0]]);

  const select = <select
    multiple
    value = { value }
    onChange = { e => setValue(
      toggleArrayValue(
        value,
        e.target.value
      )
    )}
  >
    {
      options.map((option, i) => {
        return <option
          key={i}
          value={option}
        >
          {option}
        </option>
      })
    }
  </select>

  return [value, select];
}


const App = ( ) => {

  const [jsonGetAll, setJsonGetAll] = useState();
  const [table, setTable] = useState();;

  useEffect( ( ) => {
    getAll( { result: setJsonGetAll } )
  },[]);

  useEffect( ( ) => {
    setTable(
      jsonGetAll && json2table(
        {
          json_obj: jsonGetAll
        }
      )
    )
  },[jsonGetAll]);

  const [name, nameInput] = useInput({ type: "text" });
  const [age, ageInput] = useInput({ type: "number" });
  const [address, addressInput] = useInput({ type: "text" });

  const addSubmit = (event) => {
    event.preventDefault();
    insert({
      name: name, 
      age: age, 
      address: address
    })
    getAll( { result: setJsonGetAll } )
  }

  const [id, idInput] = useInput({ type: "text" });

  const getSubmit = (event) => {
    event.preventDefault();
    get({
      id: id,
      fields: mask
    })
  }

  const [mask, maskSelect] = useSelect({
    options: [
      "customer.id",
      "customer.name",
      "customer.age",
      "customer.address",
      "customer.createdAt"
    ]
  });


  return (
    <div className="App">
      {
        table
      }
      <h2>Добавить</h2>
      <form onSubmit={addSubmit}>
        <label>
          name:
          {nameInput}
        </label>
        <label>
          age:
          {ageInput}
        </label>
        <label>
          address:
          {addressInput}
        </label>
        <input type="submit" value="Add Customer" />
      </form>
      <h2>Запросить</h2>
      <form onSubmit={getSubmit}>
        <label>
          ID:
          {idInput}
        </label>
        <input type="submit" value="Get Customer" />
      </form>
      <h3>Ответ:</h3>
      {maskSelect}
    </div>
  );
}

export default App;
