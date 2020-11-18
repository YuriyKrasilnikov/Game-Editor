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

} from 'react-flow-renderer';

import {
  Typography,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';


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
    pointerEvents: 'none',
    userSelect: 'none',
  }
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
        className={"react-flow__edge-path"}
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

export default {
  custom: CustomEdge,
}