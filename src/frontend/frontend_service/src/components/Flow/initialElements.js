import React, { useEffect, useState, useReducer, createContext } from 'react'

import ReactFlow, {
  removeElements,
  addEdge as flowAddEdge,
  isEdge,
  isNode
} from 'react-flow-renderer';

import {
  InsertNodes,
  UpdateNodes,
  RemoveNodes,

  InsertEdges,
  UpdateEdges,
  RemoveEdges,
} from '../../grpc/command/ChartsClient'

import {
  GetChartData
} from '../../grpc/query/ChartsClient'

const ElementsContext = createContext(undefined)

const ElementsObserver = ( { children } ) => {

  const [ elements, setElements ] = useState( [] );
 
  const [ history, setHistory ] = useState( [] );

  useEffect(()=>{

    console.log( '--- GetChartData start ')
    GetChartData({
      result: responceToFlow,
      error: (e) => console.log( 'GetChartData error: ', e),
    })

  },[])

  const responceToFlow = (data) => {
    setHistory(['Server responce ', ...history])
    setElements(
      [
        ...data['nodesdata']['nodesList'],
        ...data['edgesdata']['edgesList']
      ]
    )
  }

  const updateElement = (element) => {
    setElements(
      elements.map(
        els=>(els.id==element.id)?element:els
      )
    )
    if ( isNode(element) ){
      console.log('update node -> ', element)
      setHistory(['update node '+ JSON.stringify( element ), ...history])
      UpdateNodes({
        data: [element]
      })
    }else{
      console.log('update edge-> ', element)
      setHistory(['update edge '+ JSON.stringify( element ), ...history])
      UpdateEdges({
        data: [element]
      })
    }
  }

  const deleteElement = (element) => {

    const nodes = element.filter( (els)=>isNode(els) )
    const edges = element.filter( (els)=>isEdge(els) )

    setElements(
      (els) => removeElements( element, els )
    );

    console.log('delete nodes -> ', nodes)
    console.log('delete edges -> ', edges)

    if (nodes && nodes.length && edges && edges.length){
      setHistory([
        'delete nodes '+ JSON.stringify( nodes ),
        'delete edges '+ JSON.stringify( edges ),
         ...history
      ])
    }else{
      if (nodes && nodes.length){
        setHistory(['delete nodes '+ JSON.stringify( nodes ), ...history])
      }
      if (edges && edges.length){
        setHistory(['delete edges '+ JSON.stringify( edges ), ...history])
      }
    }

    RemoveNodes({
      data: nodes
    })
    RemoveEdges({
      data: edges
    })
  }

  const addNode = (node) => {
    setElements(
      (els) => els.concat(node)
    )
    console.log('add node -> ', node)
    setHistory(['add node '+ JSON.stringify( node ) , ...history])
    InsertNodes({
      data: [node]
    })
  }

  const addEdge = (edge) => {
    setElements( 
      (els) => flowAddEdge( edge, els )
    )
    console.log('add edge -> ', edge)
    setHistory(['add edge '+ JSON.stringify( edge ) , ...history])
    InsertEdges({
      data: [edge]
    })
  }

  return(
    <ElementsContext.Provider
      value={ 
        {
          elements, 
          setElements,
          updateElement,
          deleteElement,
          addNode,
          addEdge,
          history
        }
      }
    >
      {children}
    </ElementsContext.Provider>
  );
};

export {
  ElementsObserver,
  ElementsContext
}