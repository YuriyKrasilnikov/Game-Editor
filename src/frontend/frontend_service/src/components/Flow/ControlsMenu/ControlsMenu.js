import { v4 as uuidv4 } from 'uuid';

import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';

import classNames from 'classnames';

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

import ReactFlow, {
  Handle,

  getBezierPath,
  getMarkerEnd,

  isEdge,
  removeElements,
  addEdge,
  MiniMap,
  Controls,
  Background,
  ReactFlowProvider,

  useStoreState,
  useStoreActions
} from 'react-flow-renderer';

import {
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
  controlsMenu: {
    position: 'absolute',
    zIndex: '20',
    left: '24px',
    top: '24px'
  },
  draggable: {
    cursor: 'move',
    userSelect: 'none',
  }

}));

const ControlsMenu = ( ) => {

  const classes = useStyles();

  const [control, setControl] = useState();

  const handleChange = (event, nextControl) => {
    setControl(nextControl);
  };

  const handleDragStart = (event) => {
    console.log('handleDragStart', event);
  }

  const handleDragEnd = (event) => {
    console.log('handleDragEnd', event);
  }

  const handleDragOver = (event) => {
    console.log('handleDragOver', event);
  }

  const handleDragEnter = (event) => {
    console.log('handleDragEnter', event);
  }

  const handleDragLeave = (event) => {
    console.log('handleDragLeave', event);
  }

  return  <>
            <Paper
              elevation={3}
              className={
                classNames({
                  [classes.controlsMenu]: true,
                })
              }
            >
              <List>
                <ListItem
                  className={ classes.draggable }
                  draggable={true}
                  onDragStart={handleDragStart}
                  //onDragEnd={handleDragEnd}
                  //onDragOver={handleDragOver}
                  //onDragEnter={handleDragEnter}
                  //onDragLeave={handleDragLeave}
                >
                  <ListItemText primary="Add Node" />
                </ListItem>
              </List>  
            </Paper>
          </>
}

export { ControlsMenu };