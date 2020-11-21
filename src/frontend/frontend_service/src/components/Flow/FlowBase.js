import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useReducer,
  createContext 
} from 'react';

import ReactFlow, {
  ReactFlowProvider,
} from 'react-flow-renderer';

import {
  Box,
} from '@material-ui/core';

import {
  ElementsObserver
} from './initialElements';

import { StatusContext } from '../../grpc/context'

import {
  ControlsMenu
} from './ControlsMenu/ControlsMenu.js';

import {
  History
} from './History/History.js';

import {
  Flow
} from './Flow/Flow.js';

import './flow.css';

const FlowBase = ( ) => {

  const [ status, _ ] = useContext(StatusContext)

  return (
      <ElementsObserver>
        <ReactFlowProvider>
            <Box flex='1 1 100%'>
              <Flow />
              <ControlsMenu />
            </Box>
            <Box flex='0 1 auto'>
              <History />
            </Box>
        </ReactFlowProvider>
      </ElementsObserver>
  );
}

export { FlowBase };