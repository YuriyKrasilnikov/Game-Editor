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

import { StatusContext } from '../../grpc/context'

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
  useStoreState,
} from 'react-flow-renderer';

import {
  Grid,
  Paper,
  Button,
  Popover,
  Typography,
  Backdrop
} from '@material-ui/core';

import {
  ToggleButton,
  ToggleButtonGroup, 
}from '@material-ui/lab';

import {
  NoteAdd,
  Delete
}from '@material-ui/icons';

import { makeStyles } from '@material-ui/core/styles';

import { 
  useInput
} from '../Utilites/useInput';

import nodeTypes from './Node/Node.js';

import edgeTypes from './Edge/Edge.js';

import './flow.css';

import initialElements from './initial-elements';

const useStyles = makeStyles((theme) => ({
  controlsMenu: {
    position: 'absolute',
    zIndex: '20',
    left: '24px',
    top: '24px'
  }
}));

const onLoad = (reactFlowInstance) => {
  console.log('flow loaded:', reactFlowInstance);
  reactFlowInstance.fitView();
};

const NodesDebugger = () => {
  const nodes = useStoreState(state => state.nodes);
  //console.log('NodesDebugger->', nodes);
  return null;
}

const ControlsMenu = ( {callback} ) => {

  const classes = useStyles();

  const [control, setControl] = React.useState();

  const handleChange = (event, nextControl) => {
    setControl(nextControl);
    if (nextControl){
      callback(nextControl)
    }
  };

  return  <>
            <Paper
              elevation={3}
              className={
                classNames({
                  [classes.controlsMenu]: true,
                })
              } 
            >
                <ToggleButtonGroup
                  orientation="vertical"
                  exclusive
                  aria-label="Controls menu"
                  value={control}
                  onChange={handleChange}
                >
                  <ToggleButton value="addNode" aria-label="Add node">
                    <NoteAdd />
                  </ToggleButton>
                  <ToggleButton value="deleteNode" aria-label="Delete Node">
                    <Delete />
                  </ToggleButton>
                </ToggleButtonGroup>
            </Paper>
          </>
}


const Flow = ( ) => {

  const [ status, _ ] = useContext(StatusContext)

  const [ elements, setElements ] = useState(initialElements);

  const [ nodesDraggable, setNodesDraggable ] = useState(true);
  
  const onConnect = ( params ) => setElements((els) => addEdge(params, els));

  const onElementClick = (event, element) => {
    console.log( 'click', element );   
  }

  const onSelectionChange = (element) => {
    if (element) {
      setNodesDraggable(false)
    } else {
      setNodesDraggable(true)
    }
    console.log( 'onSelectionChange', element );   
  }
  
  const onNodeContextMenu = (event, element) => {
    event.preventDefault();
    console.log('onNodeContextMenu', element);
  }

  const onSelectionContextMenu = (event, element) => {
    event.preventDefault();
    console.log('onSelectionContextMenu', element);
  }

  const onPaneContextMenu = (event) => {
    event.preventDefault();
    console.log('onPaneContextMenu', event);
  }

  const onContextMenu = (event) => {
    //event.preventDefault();
    console.log('onContextMenu', event);
  }

  const onElementsRemove = ( elementsToRemove ) =>
    setElements((els) => removeElements(elementsToRemove, els));

  const onControlsMenu = ( value ) => {
    console.log( value )
  }

  return (
    <>
      <ReactFlow
        elements={elements}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onElementClick={onElementClick}
        onSelectionChange={onSelectionChange}
        //onNodeContextMenu={onNodeContextMenu}
        //onSelectionContextMenu={onSelectionContextMenu}
        //onPaneContextMenu={onPaneContextMenu}
        onContextMenu={onContextMenu}
        onLoad={onLoad}
        selectNodesOnDrag={false}
        nodesDraggable={nodesDraggable}
        snapToGrid={true}
        snapGrid={ [ 10, 10 ] }
        deleteKeyCode={46}
      >
        <MiniMap
          nodeColor={(n) => {
            if (n.style?.background) return n.style.background;
            if (n.type === 'input') return 'rgb(255,0,0)';
            if (n.type === 'output') return 'rgb(0,255,0)';
            if (n.type === 'default') return 'rgb(0,0,255)';
            return '#eee';
          }}
          nodeBorderRadius={0.5}
        />
        <Controls 
          showZoom={true}
          showFitView={true}
          showInteractive={true}
        />
        <Background 
          variant="lines"
          gap={12}
          size={1}
          color="#ccc" 
        />
        <ControlsMenu
          callback={ onControlsMenu }
        />
        <NodesDebugger />
      </ReactFlow>
    </>
  );
}

export { Flow };