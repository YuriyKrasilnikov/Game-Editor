import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './components/index';
import * as serviceWorker from './serviceWorker';
import { ThemeProvider } from '@material-ui/core/styles';

import { theme } from './utilites/style'
import { StatusObserver } from './grpc/context'


ReactDOM.render(
  <React.StrictMode>
    <StatusObserver>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </StatusObserver>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
