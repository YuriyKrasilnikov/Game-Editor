import React, {
  useRef,
  useState,
  useEffect,
  useContext
} from 'react';

import classNames from 'classnames';

import ReactFlow, {
  Handle,
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

import { 
  useInput
} from '../../Utilites/useInput'

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
    transform: 'scale( 1.3, 1.3 )'
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

const NodeEditableText = ( {selected, source, sourceKey} ) => {

  const [ data, dataInput ] = useInput({ type: "text", default_value: source[sourceKey], fullWidth: true });

  if (selected) {
    source[sourceKey]=data
    return  <>
              { dataInput }
            </>
  }else{
    return <Typography variant="body2">
            { source[sourceKey] }
          </Typography>
  }
}

const MemoizedNodeEditableText = React.memo( NodeEditableText )

const PaperNodeComponent = ( props ) => {
  const classes = useStyles();

  return (
    <>
      <Handle
          type="target"
          position="top"
          id="t"
          className={classNames({[classes.nodeHandle]: true, [classes.nodeHandleTop]: true})}
      />
      <Handle
        type="source"
        position="bottom"
        id="s"
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
            <MemoizedNodeEditableText
              selected = { props.selected }
              source = { props.data }
              sourceKey = 'label'
            />
          </Grid>
          <Grid item xs={12}>
            <MemoizedNodeEditableText
              selected = { props.selected }
              source = { props.data }
              sourceKey = 'text'
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