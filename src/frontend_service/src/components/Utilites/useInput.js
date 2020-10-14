import React, {
    useState
} from 'react';


const useInput = ({ type, default_value="" }) => {
    const [value, setValue] = useState(default_value);
    const input = <input value={value} onChange={e => setValue(e.target.value)} type={type} />;
    return [value, input];
  }

export { useInput };