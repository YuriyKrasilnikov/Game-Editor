import React, {
  useState
} from 'react';


const useError = () => {
  const [value, setValue] = useState();
  const error = <span style={{backgroundColor:"coral"}}>{value}</span>;
  return [value, error, setValue];
}

export { useError };