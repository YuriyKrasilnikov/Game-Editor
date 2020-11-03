import React, {
    useState
} from 'react';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const useInput = ({ type, default_value="" }) => {
    const [value, setValue] = useState(default_value);
    const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input, setValue];
  }

const useTextarea = ({ default_value=""}) => {
  const [value, setValue] = useState(default_value);
  const textarea = <textarea value={value} onChange={e => setValue(e.target.value)}/>
  return [value, textarea, setValue];
}

const useSelect = ({ default_value="", options=[]}) => {
  const [value, setValue] = useState(default_value);
  const select = <select value={value} onChange={ e => setValue( e.target.value ) }>
                    { 
                      options.map( (value, index) => <option key={index} value={value}> { value.capitalize() } </option> )
                    }
                  </select>
  return [value, select, setValue];
}


export { useInput, useTextarea, useSelect };