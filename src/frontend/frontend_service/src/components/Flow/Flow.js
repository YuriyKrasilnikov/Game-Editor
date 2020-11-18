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

import {
  ToggleButton,
  ToggleButtonGroup, 
}from '@material-ui/lab';

import { makeStyles } from '@material-ui/core/styles';

import { 
  useInput
} from '../Utilites/useInput';

import nodeTypes from './Node/Node.js';

import edgeTypes from './Edge/Edge.js';

import {
  ControlsMenu
} from './ControlsMenu/ControlsMenu.js';

import './flow.css';

import initialElements from './initial-elements';


const NodesDebugger = () => {
  const nodes = useStoreState(state => state.nodes);
  //console.log('NodesDebugger->', nodes);
  return null;
}

const EditMenu = ( { anchorEl, element, callback } ) => {

  const resetSelectedElements = useStoreActions(
    (actions) => actions.resetSelectedElements
  );

  const [ data, dataInput, setData ] = useInput({ 
    type: "text",
    fullWidth: true
  });

  useEffect( ( ) => {
    if(element && element.data && element.data.label){
      setData(element.data.label)
    }else{
      setData('')
    }
  },[element]);

  const close = () => {
    element.data['label'] = data
    callback(null);
    resetSelectedElements()
  };

  return <Popover 
          anchorEl={ anchorEl }
          keepMounted
          open={ 
            Boolean( anchorEl )
          }
          onClose={ close }
          anchorOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'center',
            horizontal: 'center',
          }}
        >
          { dataInput }
      </Popover >
}



const Flow = ( ) => {

  const [ status, _ ] = useContext(StatusContext)
  const [ flowInstance, setFlowInstance] = useState();
  const [ elements, setElements ] = useState(initialElements);
  const [ nodesDraggable, setNodesDraggable ] = useState( true );

  const [ anchorEdgeMenu, setAnchorEdgeMenu ] = useState(null);
  const [ editionElement, setEditionElement ] = useState(null);

  const getEditionElement = (element) => elements.find(el=>el.id==element.id)


  const onLoad = (reactFlowInstance) => {
    console.log('flow loaded:', reactFlowInstance);
    setFlowInstance( reactFlowInstance )
    reactFlowInstance.fitView();
  };
  
  const onConnect = ( params ) => {
    console.log('params', params)
    params['id']=uuidv4()
    params['type']='custom'
    params['data']={}
    return  setElements( 
              (els) => addEdge(
                params,
                els
              )
            );
  }

  const onElementsRemove = ( elementsToRemove ) => setElements(
              (els) => removeElements(elementsToRemove, els)
            );

  const onElementClick = (event, element) => {
    if ( isEdge(element) ){
      console.log( 'click on Edge', element );   
      setAnchorEdgeMenu( event.currentTarget );
      setEditionElement( 
        getEditionElement( element )
      )
    } else {
      console.log( 'click', element );   
    }
  }

  const onSelectionChange = (element) => {
    if (element && element.length) {
      console.log( 'setNodesDraggable', false );  
      setNodesDraggable( false )
    } else {
      console.log( 'setNodesDraggable', true );  
      setNodesDraggable( true )
    }
    console.log( 'onSelectionChange', element );   
  }

  //---
  
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

  //---

  const onControlsMenu = ( value ) => {
    console.log( value )
  }


  //---

  const addNode = ({x, y}) => {
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
    setElements((els) => els.concat(newNode));
  };

  const handleDrop = (event) => {
    event.preventDefault();
    console.log('handleDrop', event);

    const flowRef = document.getElementsByClassName('react-flow')[0].getBoundingClientRect()

    addNode(
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

  const handleDragEnter = (event) => {
    console.log('handleDragEnter', event);
  }

  return (
    <ReactFlowProvider>
      <ControlsMenu
      />
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
        //onContextMenu={onContextMenu}
        onLoad={onLoad}
        selectNodesOnDrag={false}
        nodesDraggable={nodesDraggable}
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
    <EditMenu
      anchorEl={anchorEdgeMenu}
      callback={setAnchorEdgeMenu}
      element={editionElement}
    />
    </ReactFlowProvider>
  );
}

export { Flow };