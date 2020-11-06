import grpc
import uuid
import json

from kafka.errors import KafkaError

from google.protobuf import field_mask_pb2
from google.protobuf import json_format

from google.protobuf.json_format import MessageToDict

import proto.command.web_client.command_webclient_pb2 as command_webclient_pb2
import proto.command.web_client.command_webclient_pb2_grpc as command_webclient_pb2_grpc

from security.access import get_access

from events.sessions import send_event

class ProfileService(command_webclient_pb2_grpc.ProfileServicer):

  def __init__(self, service_id, producer, *args, **kwargs):
    self.service_id=service_id
    self.producer=producer
    super(command_webclient_pb2_grpc.ProfileServicer, self).__init__(*args, **kwargs)

  #rpc Insert (ProfileData) returns (stream StatusResponse);
  def Insert(self, request, context):
    print(f'--- start Insert', flush=True)
    
    topic = 'saga'
    command = 'registered'
    dialog_id = str( uuid.uuid4() )
    user_id = 'anonymous' #change to id in analytics tools

    request_dict = MessageToDict(request)
    metadata = dict( context.invocation_metadata() )

    #send_event( command=command, user_id=user_id, dialog_id=dialog_id, request=request_dict)
    for msg, status in send_event( producer=self.producer, service_id=self.service_id, topic=topic, command=command, user_id=user_id, dialog_id=dialog_id, request=request_dict) :
       yield command_webclient_pb2.StatusResponse(
              message = msg
             )

    print(f'--- end Insert', flush=True)

  #rpc Update (ProfileData) returns (stream StatusResponse);
  def Update(self, request, context):
    print(f'--- start Update', flush=True)

    request_dict = MessageToDict(request)
    metadata = dict( context.invocation_metadata() )

    print(f'metadata {metadata}', flush=True)

    print(f"metadata accept {metadata['accept']}", flush=True)

    print(f"metadata email {metadata['x-user-authorization-email']}", flush=True)
    print(f"metadata id {metadata['x-user-authorization-id']}", flush=True)

    topic = 'command-profile'

    command = 'update'
    user_id = metadata['x-user-authorization-id']
    dialog_id = str( uuid.uuid4() )

    request_dict['id'] = user_id

    for msg, status  in send_event( producer=self.producer, service_id=self.service_id, topic=topic, command=command, user_id=user_id, dialog_id=dialog_id, request=request_dict) :
       yield command_webclient_pb2.StatusResponse(
              message = msg
             )

    print(f'--- end Update', flush=True)
  
  #rpc Update (ProfileData) returns (stream StatusResponse);
  def Remove(self, request, context):
    print(f'--- start Remove', flush=True)

    request_dict = MessageToDict(request)
    metadata = dict( context.invocation_metadata() )

    print(f'metadata {metadata}', flush=True)

    print(f"metadata accept {metadata['accept']}", flush=True)

    print(f"metadata email {metadata['x-user-authorization-email']}", flush=True)
    print(f"metadata id {metadata['x-user-authorization-id']}", flush=True)

    removing_event={
      'service_id': self.service_id,
      'producer': self.producer,
      'topic': 'saga',
      'command': 'delete_profile',
      'dialog_id': str( uuid.uuid4() ),
      'user_id': metadata['x-user-authorization-id']
    } 

    if metadata['x-user-authorization-email'] == request_dict.get('email') or metadata['x-user-authorization-nickname'] == request_dict.get('nickname'):
      removing_event['request'] = { 'id': removing_event['user_id'] }
      for response in send_event( **removing_event) :
        yield command_webclient_pb2.StatusResponse(
                message = response
              )
    else:
      get_request={
        'service_id': self.service_id,
        'producer': self.producer,
        'topic': 'query_orchestrator',
        'command': 'get_profile',
        'dialog_id': str( uuid.uuid4() ),
        'user_id': metadata['x-user-authorization-id'], 
        'request': {
          'datas': [ request_dict ],
          'paths': [ 'id' ]
        }
      }
      for msg, status in send_event( **get_request ):
        if status == 'close':
          profile_id = json.loads( msg )['profiles'][0]['id']
          removing_event['request'] = { 'id': profile_id }
          for msg, status in send_event( **removing_event) :
            yield command_webclient_pb2.StatusResponse(
                    message = msg
                  )
        else:
          yield command_webclient_pb2.StatusResponse(
                  message = msg
                )


    print(f'--- end Remove', flush=True)
      
