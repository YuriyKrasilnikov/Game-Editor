import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';

import classNames from 'classnames';

import ReactFlow, {
  getBezierPath,
  getMarkerEnd,

  useStoreState,
  useStoreActions,
} from 'react-flow-renderer';

import {
  Typography,
  Box,
  Paper
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import {
  useDoubleClick
} from '../../../utilites/useDoubleClick';

import {
  EditableInput
} from '../../Utilites/EditableInput';

import {
  deepCopy
} from '../../../utilites/deepCopy';

import { ElementsContext } from '../initialElements'


const useStyles = makeStyles((theme) => ({
  edgeStyle: {
    fill: 'none',
    stroke: '#b1b1b7',
    strokeWidth: '3px',
    '&.selected': {
      strokeWidth: '6px'
    }
  },
  edgeText: {
    position: 'absolute',
    minWidth: '100px',
    padding: '4px'
  },
  edgeTextBox: {
    position: 'relative',
    overflow: 'visible'
  },
  
}));

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
  selected,
  style = {},
}) => {

  const { 
    elements,
    setElements,
    updateElement,
  } = useContext(ElementsContext)
  const classes = useStyles();

  //const elements = useStoreState((state) => state.elements);

  const getElementDataById = (id) => deepCopy( elements.find( el => el.id==id ).data )
  const updateDataElement = (id, data) => updateElement( 
      { ...elements.find( el => el.id==id ), data: data }
    )

  const [editedElData, setEditedElData] = useState( null );

  const [edited, setEdited] = useState( false );

  const doubleClickHandler = () => {
    //console.log('doubleClick')
    setEditedElData(
      getElementDataById(id)
    )
    setEdited(true)
  }

  const [refCallback, elem] = useDoubleClick( doubleClickHandler );

  useEffect(()=>{
    if(selected){
      //console.log('selected', getElementDataById(props.id) )
    }else{
      if (editedElData){
        //console.log('unselected', editedElData )
        updateDataElement(id, editedElData)
        setEditedElData(null)
      }
      setEdited(false)
    }
  },[selected])

  const editElData = ( key ) => ( value ) => {
    setEditedElData( { ...editedElData, [ key ]: value } )
  }

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
      const textBbox = edgeRef.current.getBoundingClientRect()

      setEdgeTextBbox({
        width: textBbox.width,
        height: textBbox.height,
      });
    }
  }, [ data, data.label ]);

  return (
    <g ref={refCallback} >
      <path 
        id={id}
        style={style}
        className={"react-flow__edge-path"}
        d={edgePath}
        markerEnd={markerEnd}
      />
      <g transform={`translate(${centerX - edgeTextBbox.width / 2} ${centerY - edgeTextBbox.height / 2})`}>
        <foreignObject
          width={edgeTextBbox.width }
          height={edgeTextBbox.height }
          className={classes.edgeTextBox}
        >
          <Paper className={classes.edgeText}>
            <EditableInput
              ref={edgeRef}
              data={ data.label }
              edited={ edited }
              callback={ editElData('label') }
            />
          </Paper>
        </foreignObject>
      </g>
    </g>
  );
}

export default {
  custom: CustomEdge,
}