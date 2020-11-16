import React from 'react';
export default [
  {
    id: '1',
    type: 'paper',
    data: {
      label: 'This is a default node label',
      text: 'This is a default node text'
    },
    position: { x: 350, y: -350 },
  },
  {
    id: '2',
    type: 'paper',
    data: {
      label: 'This is a default node label',
      text: 'This is a default node text'
    },
    position: { x: 0, y: -100 },
  },
  {
    id: '3',
    type: 'paper',
    data: {
      label: 'This is a default node label',
      text: 'This is a default node text'
    },
    position: { x: 700, y: -100 },
  },
  {
    id: '4',
    type: 'paper',
    data: {
      label: 'This is a default node label',
      text: 'This is a default node text'
    },
    position: { x: 350, y: 100 },
  },
  {
    id: '5',
    type: 'paper',
    data: {
      label: 'This is a default node label',
      text: 'This is a default node text'
    },
    position: { x: 350, y: 300 },
  },
  {
    id: '6',
    type: 'paper',
    data: {
      label: 'This is a default node label',
      text: 'This is a default node text'
    },
    position: { x: 0, y: 600 },
  },
  {
    id: '7',
    type: 'paper',
    data: {
      label: 'This is a default node label',
      text: 'This is a default node text'
    },
    position: { x: 700, y: 600 },
  },
  { 
    id: 'e1-2',
    source: '1',
    target: '2',
    type: 'custom',
    data: {
      label: 'custom edge label',
      text: 'custom edge text',
    },
    arrowHeadType: 'arrowclosed',
  },
  {
    id: 'e1-3',
    source: '1',
    target: '3',
    type: 'custom',
    data: {
      label: 'custom edge label',
      text: 'custom edge text',
    },
    arrowHeadType: 'arrowclosed',
  },
  {
    id: 'e3-4',
    source: '3',
    target: '4',
    type: 'custom',
    data: {
      label: 'custom edge label',
      text: 'custom edge text',
    },
    arrowHeadType: 'arrowclosed',
  },
  {
    id: 'e4-5',
    source: '4',
    target: '5',
    type: 'custom',
    data: {
      label: 'custom edge label',
      text: 'custom edge text',
    },
    arrowHeadType: 'arrowclosed',
  },
  {
    id: 'e5-6',
    source: '5',
    target: '6',
    type: 'custom',
    data: {
      label: 'custom edge label',
      text: 'custom edge text',
    },
    arrowHeadType: 'arrowclosed',
  },
  {
    id: 'e5-7',
    source: '5',
    target: '7',
    type: 'custom',
    data: {
      label: 'custom edge label',
      text: 'custom edge text',
    },
    arrowHeadType: 'arrowclosed',
  },
];