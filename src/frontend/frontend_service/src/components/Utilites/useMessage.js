import React, {
  useState
} from 'react';

const ErrorMessage = {
  backgroundColor:"coral"
}

const Message = {
  backgroundColor:"lightgreen"
}

const styles = {
  Message: Message,
  ErrorMessage: ErrorMessage
}

const useMessage = () => {
  const [value, setValue] = useState();
  const obj = value && <span style={ styles[value.type] }>{value.msg}</span>;
  return [value, obj, setValue];
}

export { useMessage };