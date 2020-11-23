import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';

import classNames from 'classnames';

import ReactFlow, {
  Handle,

  useStoreState,
  useStoreActions
} from 'react-flow-renderer';

import {
  Grid,
  Paper,
  Button,
  Popover,
  Typography,
  TextField,
  Backdrop
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';

import {
  useDoubleClick
} from '../../../utilites/useDoubleClick';

import {
  deepCopy
} from '../../../utilites/deepCopy';

import {
  EditableInput
} from '../../Utilites/EditableInput';

import { ElementsContext } from '../initialElements'


const useStyles = makeStyles((theme) => ({
  nodeHandle:{
    width: '14px',
    height: '14px',
    transition: 'all .2s ease-in-out',
    '&:hover': {
      width: '28px',
      height: '28px',
    },  
  },
  nodeHandleTop:{
    top: "-7px",
    '&:hover': {
      top: "-14px",
    },
  },
  nodeHandleBottom:{
    bottom: "-7px",
    '&:hover': {
      bottom: "-14px",
    },
  },
  nodeContainer: {
    width: '576px',
    padding: theme.spacing(1),
    transition: 'all .2s ease-in-out',
  },
  nodeContainerSelected: {
    //transform: 'scale( 1.3, 1.3 )'
  },
  edgeStyle: {
    fill: 'none',
    stroke: '#b1b1b7',
    strokeWidth: '3px',
    '&.selected': {
      strokeWidth: '6px'
    }
  },
  edgeText: {
    pointerEvents: 'none',
    userSelect: 'none',
  }
}));


const PaperNodeComponent = ( props ) => {

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
      getElementDataById(props.id)
    )
    setEdited(true)
  }

  const [refCallback, elem] = useDoubleClick( doubleClickHandler );

  useEffect(()=>{
    if(props.selected){
      //console.log('selected', getElementDataById(props.id) )
    }else{
      if (editedElData){
        //console.log('unselected', editedElData )
        updateDataElement(props.id, editedElData)
        setEditedElData(null)
      }
      setEdited(false)
    }
  },[props.selected])

  const editElData = ( key ) => ( value ) => {
    setEditedElData( { ...editedElData, [ key ]: value } )
  }


  return (
    <>
      <Handle
          type="target"
          position="top"
          id="target"
          className={classNames({[classes.nodeHandle]: true, [classes.nodeHandleTop]: true})}
      />
      <Handle
        type="source"
        position="bottom"
        id="source"
        className={classNames({[classes.nodeHandle]: true, [classes.nodeHandleBottom]: true})}
      />
      <Paper 
        className={
          classNames({
            [classes.nodeContainer]: true,
            [classes.nodeContainerSelected]: props.selected
          })
        } 
        elevation={ (props.selected)? 16: 3 }
        ref={ refCallback }
      > 
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
            <EditableInput
              data={ props.data.label  }
              edited={ edited }
              callback={ editElData('label') }
            />
          </Grid>
          <Grid item xs={12}>
            <EditableInput
              data={ props.data.text }
              edited={ edited }
              callback={ editElData('text') }
            />
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
    </>
  );
};

export default {
  paper: PaperNodeComponent,
}