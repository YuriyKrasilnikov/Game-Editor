import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';

import {
  Typography,
  TextField,
} from '@material-ui/core';

const EditableInput = ({ data, edited, callback=()=>{}, type='text', ...props}) => {

  const [value, setValue] = useState( data );

  const onChange = (event) => {
    callback(event.target.value)
    setValue(event.target.value)
  }

  if (edited) {
    //console.log('edited')
    return  <TextField value={value} onChange={ onChange } type={type} {...props}/>;
  } else {
    return  <Typography variant="body2" {...props}>
              { value }
            </Typography>;
  } 
}

export { EditableInput };