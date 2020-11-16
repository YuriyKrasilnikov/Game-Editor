import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';

import {
  BrowserRouter as Router,
  Link,
} from "react-router-dom";

import { StatusContext } from '../../grpc/context'

import { 
  useInput,
  useTextarea,
  useSelect
} from '../Utilites/useInput'

import { 
  useMessage
} from '../Utilites/useMessage'

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

import { makeStyles } from '@material-ui/core/styles';

import initialElements from './initial-elements';

const useStyles = makeStyles((theme) => ({
  nodeContainer: {
    padding: theme.spacing(1)
  },
  edgeText: {
    pointerEvents: 'none',
    userSelect: 'none',
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

const NodeEditableText = ( {selected, text} ) => {
  if (selected) {
    return <Typography variant="body2">
      selected
    </Typography>
  }else{
    return  <Typography variant="body2">
              {text}
            </Typography>
  }
}

const PaperNodeComponent = ( props ) => {
  const classes = useStyles();

  const editable = props.selected && !props.isDragging

  return (
    <>
      <Handle
        type="target"
        position="top"
        id="t"
      />
      <Paper className={classes.nodeContainer} elevation={ (props.selected)? 16: 3 }>  
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <Typography variant="caption">
              id: {props.id}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">
              type: {props.type}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <NodeEditableText selected={ editable } text={props.data.label} />
          </Grid>
          <Grid item xs={12}>
            <NodeEditableText selected={ editable } text={props.data.text} />
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">
              x: {props.xPos}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="caption">
              y: {props.yPos}
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Handle
          type="source"
          position="bottom"
          id="s"
      />
    </>
  );
};

const CustomEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
  arrowHeadType,
  markerEndId,

  style = {},
  labelBgPadding = [2, 4],
  labelBgBorderRadius = 2,
}) => {

  const classes = useStyles();

  const edgePath = getBezierPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition });
  const markerEnd = getMarkerEnd(arrowHeadType, markerEndId);

  const yOffset = Math.abs(targetY - sourceY) / 2;
  const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;

  const xOffset = Math.abs(targetX - sourceX) / 2;
  const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;

  const edgeRef = useRef(null);
  const [edgeTextBbox, setEdgeTextBbox] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (edgeRef.current) {
      const textBbox = edgeRef.current.getBBox();

      setEdgeTextBbox({
        x: textBbox.x,
        y: textBbox.y,
        width: textBbox.width,
        height: textBbox.height,
      });
    }
  }, []);

  return (
    <>
      <path 
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <g transform={`translate(${centerX - edgeTextBbox.width / 2} ${centerY - edgeTextBbox.height / 2})`}>
        {data.text && <>
          <rect
              width={edgeTextBbox.width + 2 * labelBgPadding[0]}
              x={-labelBgPadding[0]}
              y={-labelBgPadding[1]}
              height={edgeTextBbox.height + 2 * labelBgPadding[1]}
              className="react-flow__edge-textbg"
              rx={labelBgBorderRadius}
              ry={labelBgBorderRadius}
              fill='purple'
            />
          <g className={classes.edgeText} ref={edgeRef} >
            <Typography component="text" variant="body2" y={edgeTextBbox.height/2} dy="0.3em" >
              {data.label}
            </Typography>
          </g>
        </>
        }
      </g>
    </>
  );
}



const Flow = ( ) => {

  const [ status, _ ] = useContext(StatusContext)

  //---
  const nodeTypes = {
    paper: PaperNodeComponent,
  };

  const edgeTypes = {
    custom: CustomEdge,
  };

  const [ elements, setElements ] = useState(initialElements);
  
  const onConnect = ( params ) => setElements((els) => addEdge(params, els));

  const onElementClick = (event, element) => {
    console.log( 'click', element );   
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

  return (
    <>
      <ReactFlow
        elements={elements}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onElementsRemove={onElementsRemove}
        onConnect={onConnect}
        onElementClick={onElementClick}
        //onNodeContextMenu={onNodeContextMenu}
        //onSelectionContextMenu={onSelectionContextMenu}
        //onPaneContextMenu={onPaneContextMenu}
        onContextMenu={onContextMenu}
        onLoad={onLoad}
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
        <NodesDebugger />
      </ReactFlow>
    </>
  );
}

export { Flow };