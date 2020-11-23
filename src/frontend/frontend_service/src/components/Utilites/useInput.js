import React, {
    useState
} from 'react';

import {
  Typography,
  TextField,
  Box,
} from '@material-ui/core';


String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const useInput = ({ type, default_value="", ...props}) => {
    const [value, setValue] = useState(default_value);
    const input = <TextField value={value} onChange={e => setValue(e.target.value)} type={type} {...props} />;
    return [value, input, setValue];
  }

const useSelect = ({ default_value="", default_options=[]}) => {
  const [value, setValue] = useState(default_value);
  const [options, setOptions] = useState(default_options);

  const select = <select value={value} onChange={ e => setValue( e.target.value ) }>
                    { 
                      options.map( (value, index) => <option key={index} value={value}> { value.capitalize() } </option> )
                    }
                  </select>
  return [value, select, setValue, setOptions];
}

export { 
  useInput,
  useSelect
};