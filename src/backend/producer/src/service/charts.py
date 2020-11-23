import grpc
import json
import datetime
import uuid

from kafka.errors import KafkaError

from google.protobuf.empty_pb2 import Empty
from google.protobuf import field_mask_pb2
from google.protobuf import json_format

from google.protobuf.json_format import MessageToDict

import proto.command.web_client.command_webclient_pb2 as command_webclient_pb2
import proto.command.web_client.command_webclient_pb2_grpc as command_webclient_pb2_grpc

from security.access import get_access

from events.sessions import send_event

class ChartsService(command_webclient_pb2_grpc.ChartsServicer):

  def __init__(self, service_id, producer, *args, **kwargs):
    self.service_id=service_id
    self.producer=producer
    super(command_webclient_pb2_grpc.ChartsServicer, self).__init__(*args, **kwargs)

  #rpc InsertNodes (NodesRequest) returns (google.protobuf.Empty);
  def InsertNodes(self, request, context):
    print(f'--- start Insert Nodes', flush=True)

    request_dict = MessageToDict(request.nodesData)
    metadata = dict( context.invocation_metadata() )

    insert_nodes_event={
      'service_id': self.service_id,
      'producer': self.producer,
      'topic': 'command-charts',
      'command': 'insert nodes',
      'dialog_id': str( uuid.uuid4() ),
      'user_id': metadata['x-user-authorization-id'],
      'request': request_dict
    }

    insert_nodes_event['request']['profileid'] = insert_nodes_event['user_id']

    for msg, status in send_event( **insert_nodes_event ):
      print(f'status:{status} | msg:{msg}', flush=True)
    
    return Empty()


  #rpc UpdateNodes (NodesRequest) returns (google.protobuf.Empty);
  def UpdateNodes(self, request, context):
    print(f'--- start Update Nodes', flush=True)

    request_dict = MessageToDict(request.nodesData)
    metadata = dict( context.invocation_metadata() )

    update_nodes_event={
      'service_id': self.service_id,
      'producer': self.producer,
      'topic': 'command-charts',
      'command': 'update nodes',
      'dialog_id': str( uuid.uuid4() ),
      'user_id': metadata['x-user-authorization-id'],
      'request': request_dict
    }

    update_nodes_event['request']['profileid'] = update_nodes_event['user_id']

    for msg, status in send_event( **update_nodes_event ):
      print(f'status:{status} | msg:{msg}', flush=True)

    return Empty()

  #rpc RemoveNodes (NodesRequest) returns (google.protobuf.Empty);
  def RemoveNodes(self, request, context):
    print(f'--- start Remove Nodes', flush=True)

    request_dict = MessageToDict(request.nodesData)
    metadata = dict( context.invocation_metadata() )

    remove_nodes_event={
      'service_id': self.service_id,
      'producer': self.producer,
      'topic': 'command-charts',
      'command': 'remove nodes',
      'dialog_id': str( uuid.uuid4() ),
      'user_id': metadata['x-user-authorization-id'],
      'request': request_dict
    }

    remove_nodes_event['request']['profileid'] = remove_nodes_event['user_id']

    for msg, status in send_event( **remove_nodes_event ):
      print(f'status:{status} | msg:{msg}', flush=True)
  
    return Empty()

  #rpc InsertEdges (EdgesRequest) returns (google.protobuf.Empty);
  def InsertEdges(self, request, context):
    print(f'--- start Insert Edges', flush=True)

    request_dict = MessageToDict(request.edgesData)
    metadata = dict( context.invocation_metadata() )

    insert_edges_event={
      'service_id': self.service_id,
      'producer': self.producer,
      'topic': 'command-charts',
      'command': 'insert edges',
      'dialog_id': str( uuid.uuid4() ),
      'user_id': metadata['x-user-authorization-id'],
      'request': request_dict
    }

    insert_edges_event['request']['profileid'] = insert_edges_event['user_id']

    for msg, status in send_event( **insert_edges_event ):
      print(f'status:{status} | msg:{msg}', flush=True)

    return Empty()

  #rpc UpdateEdges (EdgesRequest) returns (google.protobuf.Empty);
  def UpdateEdges(self, request, context):
    print(f'--- start Update Edges', flush=True)

    request_dict = MessageToDict(request.edgesData)
    metadata = dict( context.invocation_metadata() )

    update_edges_event={
      'service_id': self.service_id,
      'producer': self.producer,
      'topic': 'command-charts',
      'command': 'update edges',
      'dialog_id': str( uuid.uuid4() ),
      'user_id': metadata['x-user-authorization-id'],
      'request': request_dict
    }

    update_edges_event['request']['profileid'] = update_edges_event['user_id']

    for msg, status in send_event( **update_edges_event ):
      print(f'status:{status} | msg:{msg}', flush=True)

    return Empty()

  #rpc RemoveEdges (EdgesRequest) returns (google.protobuf.Empty);
  def RemoveEdges(self, request, context):
    print(f'--- start Remove Edges', flush=True)

    request_dict = MessageToDict(request.edgesData)
    metadata = dict( context.invocation_metadata() )

    remove_edges_event={
      'service_id': self.service_id,
      'producer': self.producer,
      'topic': 'command-charts',
      'command': 'remove edges',
      'dialog_id': str( uuid.uuid4() ),
      'user_id': metadata['x-user-authorization-id'],
      'request': request_dict
    }

    remove_edges_event['request']['profileid'] = remove_edges_event['user_id']

    for msg, status in send_event( **remove_edges_event ):
      print(f'status:{status} | msg:{msg}', flush=True)

    return Empty()