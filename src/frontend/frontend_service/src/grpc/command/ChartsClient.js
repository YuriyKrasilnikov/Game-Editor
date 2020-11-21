import * as grpcWeb from 'grpc-web';
import { FieldMask } from 'google-protobuf/google/protobuf/field_mask_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

import {
  ChartsClient, 

  NodeData,
  NodeDataList,
  NodesRequest,

  EdgeData,
  EdgeDataList,
  EdgesRequest

} from '../../proto/command_webclient_grpc_web_pb';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1).toLowerCase();
}

const ChartsService = new ChartsClient(
                          'https://' + window.location.hostname + ':443',
                          null, null);
         
const Serialization = () => {
  return {
    serialization: function(rootClass, classDict, data) {
      
      const cls = new classDict[ rootClass ]()

      Object.entries(data).forEach( ([key, value]) => {
        let val = value;
        if ( Object.prototype.toString.call(value) === '[object Object]' ){
          if ( key in classDict ){
            val = this.serialization(key, classDict, value )
          }
        }
        //console.log( "set"+key.capitalize(), val )
        if (this.isNumber(val)){ val=Math.round(val) }
        cls["set"+key.capitalize()](val)
      })
      return cls
    },
    isNumber: function isNumber(value) {
        return typeof value === 'number' && isFinite(value);
    },
  }
}



const createNodesRequest = (data, paths) => {
  const classDict = {
    '_': NodeData,
    'data': NodeData.Data,
    'position': NodeData.Position,
  }

  const nodeData = data.map( (d) => Serialization().serialization('_', classDict, d) )

  const fields = new FieldMask();
  fields.setPathsList( paths );

  const nodes = new NodeDataList()
  nodes.setNodesList(
    nodeData
  )

  const request = new NodesRequest();
  request.setNodesdata( nodes );
  request.setFields( fields );

  return request
}

//rpc InsertNodes (NodesRequest) returns (google.protobuf.Empty);
const InsertNodes = ( { data, error=null, paths=[], metadata={} } ) => {

  console.log('InsertNodes', data)
  const request = createNodesRequest(data, paths)

  const call = ChartsService.insertNodes(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for InsertNodes: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error({
            msg: err.message,
            type: 'ErrorMessage'
          })
        }
      } else {
        console.log("InsertNodes");
        if (error){
          error()
        }
      }
  });
}

//rpc UpdateNodes (NodesRequest) returns (google.protobuf.Empty);
const UpdateNodes = ( { data, error=null, paths=[], metadata={} } ) => {

  console.log('UpdateNodes', data)
  const request = createNodesRequest(data, paths)

  const call = ChartsService.updateNodes(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for UpdateNodes: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error({
            msg: err.message,
            type: 'ErrorMessage'
          })
        }
      } else {
        console.log("UpdateNodes");
        if (error){
          error()
        }
      }
  });
}

//rpc RemoveNodes (NodesRequest) returns (google.protobuf.Empty);
const RemoveNodes = ( { data, error=null, paths=[], metadata={} } ) => {

  console.log('RemoveNodes', data)
  const request = createNodesRequest(data, paths)

  const call = ChartsService.removeNodes(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for RemoveNodes: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error({
            msg: err.message,
            type: 'ErrorMessage'
          })
        }
      } else {
        console.log("RemoveNodes");
        if (error){
          error()
        }
      }
  });
}

//-----

const createEdgesRequest = (data, paths) => {
  const classDict = {
    '_': EdgeData,
    'data': EdgeData.Data,
  }

  const edgeData = data.map( (d) => Serialization().serialization('_', classDict, d) )

  const fields = new FieldMask();
  fields.setPathsList( paths );

  const edges = new EdgeDataList()
  edges.setEdgesList(
    edgeData
  )

  const request = new EdgesRequest();
  request.setEdgesdata( edges );
  request.setFields( fields );

  return request
}

//rpc InsertEdges (EdgesRequest) returns (google.protobuf.Empty);
const InsertEdges = ( { data, error=null, paths=[], metadata={} } ) => {

  console.log('InsertEdges', data)
  const request = createEdgesRequest(data, paths)

  const call = ChartsService.insertEdges(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for InsertEdges: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error({
            msg: err.message,
            type: 'ErrorMessage'
          })
        }
      } else {
        console.log("InsertEdges");
        if (error){
          error()
        }
      }
  });
}

//rpc UpdateEdges (EdgesRequest) returns (google.protobuf.Empty);
const UpdateEdges = ( { data, error=null, paths=[], metadata={} } ) => {

  console.log('UpdateEdges', data)
  const request = createEdgesRequest(data, paths)

  const call = ChartsService.updateEdges(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for UpdateEdges: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error({
            msg: err.message,
            type: 'ErrorMessage'
          })
        }
      } else {
        console.log("UpdateEdges");
        if (error){
          error()
        }
      }
  });
}

//rpc RemoveEdges (EdgesRequest) returns (google.protobuf.Empty);
const RemoveEdges = ( { data, error=null, paths=[], metadata={} } ) => {

  console.log('RemoveEdges', data)
  const request = createEdgesRequest(data, paths)

  const call = ChartsService.removeEdges(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for RemoveEdges: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error({
            msg: err.message,
            type: 'ErrorMessage'
          })
        }
      } else {
        console.log("RemoveEdges");
        if (error){
          error()
        }
      }
  });
}

export { 
  InsertNodes,
  UpdateNodes,
  RemoveNodes,

  InsertEdges,
  UpdateEdges,
  RemoveEdges,
};