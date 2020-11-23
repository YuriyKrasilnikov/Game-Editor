import { v4 as uuidv4 } from 'uuid';

import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useReducer,
  createContext 
} from 'react';

import classNames from 'classnames';

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

import { StatusContext } from '../../../grpc/context'

import { ElementsContext } from '../initialElements'

import ReactFlow, {
  Handle,

  getBezierPath,
  getMarkerEnd,

  isEdge,
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
} from '@material-ui/core';


import nodeTypes from '../Node/Node.js';

import edgeTypes from '../Edge/Edge.js';


import { 
  deepDiff
} from '../../../utilites/deepDiffMapper';


const NodesDebugger = () => {
  const nodes = useStoreState(state => state.nodes);
  //console.log('NodesDebugger->', nodes);
  return null;
}


const Flow = ( ) => {

  const [ status, _ ] = useContext(StatusContext)
  const {
    elements,
    setElements,
    updateElement,
    deleteElement,
    addNode,
    addEdge
 } = useContext(ElementsContext)
  
  const [ flowInstance, setFlowInstance] = useState();

  useEffect( ( ) => {
    //console.log('что-то поменялось')
    //console.log('elements->', elements)
  },[ elements ]);

  const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    setFlowInstance( reactFlowInstance )
    reactFlowInstance.fitView();
  };
  
  const onConnect = ( params ) => {
    console.log('params', params)
    params['id']=uuidv4()
    params['type']='custom'
    params['data']={label: 'label'}
    return addEdge( params )
  }

  const onNodeDragStop = (event, element) => {
    //console.log('onNodeDragStop', element);
    updateElement( element )
  }

  //--- Отрефакторить!!!
  const addNewNode = ({x, y}) => {
    const nodeId = uuidv4();
    const position = flowInstance.project({ x: x, y: y });
    const newNode = {
      id: nodeId,
      type: 'paper',
      data: {
        label: 'DropTest',
        text: 'DropTest'
      },
      position: position,
    };
    addNode( newNode );
  };

  const handleDrop = (event) => {
    event.preventDefault();
    //console.log('handleDrop', event);

    const flowRef = document.getElementsByClassName('react-flow')[0].getBoundingClientRect()

    addNewNode(
      {
        x: event.clientX-flowRef.x - 24,
        y: event.clientY-flowRef.y - 24
      }
    )
  }

  const handleDragOver = (event) => {
    event.preventDefault();
    //console.log('handleDragOver', e);
  }

  return (
        <ReactFlow
          elements={elements}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onElementsRemove={deleteElement}
          onConnect={onConnect}
          //onSelectionChange={onSelectionChange}
          onNodeDragStop={onNodeDragStop}
          //onSelectionDragStop={onSelectionDragStop}
          onLoad={onLoad}
          selectNodesOnDrag={false}
          snapToGrid={true}
          snapGrid={ [ 10, 10 ] }
          deleteKeyCode={46}

          onDrop={handleDrop}
          onDragOver={handleDragOver}
          //onDragEnter={handleDragEnter}
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
          <NodesDebugger />
        </ReactFlow>
  );
}

export { Flow };