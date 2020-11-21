import { v4 as uuidv4 } from 'uuid';

import classNames from 'classnames';

import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';

import { ElementsContext } from '../initialElements'

import {
  Box,
  Grid,
  Paper,
  Button,
  Popover,
  Typography,
  Backdrop,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  history: {
    //position: 'absolute',
    //zIndex: '20',
    //right: '24px',
    //top: '24px',
    padding: '8px'
  }

}));

const History = ( ) => {

  const classes = useStyles();

  const { history } = useContext(ElementsContext)

  return  <>
            <Box 
              maxHeight='240px'
              overflow='scroll'
              className={
                classNames({
                  [classes.history]: true,
                })
              }
            >
              <ul>
                { 
                  history && history.map((ev, index) =>
                    <li key={index}>
                      { ev }
                    </li>
                  )
                }
              </ul>
            </Box>
          </>
}

export { History };