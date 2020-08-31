import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';

import { helloRequest, helloStream, getAll, insert} from './grpc-client'

const headerRow = () => {
  return  <>
            <th>Country</th>
            <th>Population</th>
          </>
        
}

const bodyRows = () =>  {
  return  <>
            <tr>
              <td>Country1</td>
              <td>Population1</td>
            </tr>
            <tr>
              <td>Country2</td>
              <td>Population2</td>
            </tr>
          </>
}

const unnormalize = (object, result) => {
  if (object.constructor == Object){
    Object.entries(object).forEach( ([key, value]) => {
      if (value.constructor == Object || value.constructor == Array){
        result = unnormalize(value, result)
      } else {
        if ( !(key in result) ) { 
          result[key] = []
        }
        result[key].push(value)
      }
    })
  } else if (object.constructor == Array){
    object.forEach( (value) => {
      if (value.constructor == Object || value.constructor == Array){
        result = unnormalize(value, result)
      }
    })
  }
  return result;
}

const transpose = m => m[0].map( (x,i) => m.map(x => x[i]) )

const json2table = ( { json_obj } ) => {

  console.log(json_obj)

  const logs = unnormalize( json_obj, {} )

  return <table cellSpacing="2" border="1" cellPadding="5">
            <thead>
              <tr>
                <th>№</th>
                {
                  Object.keys(logs).map((key) => {
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


const App = ( ) => {

  const [jsonGetAll, setJsonGetAll] = useState();

  useEffect( ( ) => {
    /*
    setInterval(()=>{
      for (let i = 0; i < 50; i++) {
        helloRequest();
      }
    }, 3000);
    */
    /*
    insert({
      name:'test1', 
      age:35, 
      address:'test addressssss'
    })
    */
    //helloRequest();
    //helloStream();
  });

  useEffect( ( ) => {
    /*
    setInterval(()=>{
      for (let i = 0; i < 50; i++) {
        helloRequest();
      }
    }, 3000);
    */
    /*
    insert({
      name:'test1', 
      age:35, 
      address:'test addressssss'
    })*/
    getAll( { result: setJsonGetAll } )
  },[]);

  const [name, nameInput] = useInput({ type: "text" });
  const [age, ageInput] = useInput({ type: "number" });
  const [address, addressInput] = useInput({ type: "text" });

  const handleSubmit = (event) => {
    event.preventDefault();
    insert({
      name: name, 
      age: age, 
      address: address
    })
    getAll( { result: setJsonGetAll } )
  }

  return (
    <div className="App">
      {
        jsonGetAll && json2table(
          {
            json_obj: jsonGetAll
          }
        )
      }

    <form onSubmit={handleSubmit}>
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

    </div>
  );
}

export default App;
