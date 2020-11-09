import grpc
import json
import datetime
import uuid

from kafka.errors import KafkaError

from google.protobuf import field_mask_pb2
from google.protobuf import json_format

from google.protobuf.json_format import MessageToDict

import proto.command.web_client.command_webclient_pb2 as command_webclient_pb2
import proto.command.web_client.command_webclient_pb2_grpc as command_webclient_pb2_grpc

from security.access import get_access

from events.sessions import send_event

class BillingService(command_webclient_pb2_grpc.BillingServicer):

  def __init__(self, service_id, producer, *args, **kwargs):
    self.service_id=service_id
    self.producer=producer
    super(command_webclient_pb2_grpc.BillingServicer, self).__init__(*args, **kwargs)

  #rpc Paid (PaidData) returns (stream StatusResponse);
  def Paid(self, request, context):
    print(f'--- start Billing Paid', flush=True)

    request_dict = MessageToDict(request)
    metadata = dict( context.invocation_metadata() )

    paid_event={
      'service_id': self.service_id,
      'producer': self.producer,
      'topic': 'command-billing',
      'command': 'paid',
      'dialog_id': str( uuid.uuid4() ),
      'user_id': metadata['x-user-authorization-id'],
      'request': request_dict
    } 

    nickname = request_dict.pop('nickname')

    if metadata['x-user-authorization-nickname'] == nickname:
      paid_event['request']['profileid'] = paid_event['user_id']
      for msg, status in send_event( **paid_event) :
        yield command_webclient_pb2.StatusResponse(
                message = msg
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
          'datas': [
            { 'nickname': nickname }
          ],
          'paths': [ 'id' ]
        }
      }

      print(f'request_dict {request_dict}', flush=True)

      for msg, status in send_event( **get_request ):
        if status == 'close':
          profile_id = json.loads( msg )['profiles'][0]['id']
          paid_event['request']['profileid'] = profile_id

          print(f'profileid {profile_id}', flush=True)

          for msg, status in send_event( **paid_event) :
            yield command_webclient_pb2.StatusResponse(
                    message = msg
                  )
        else:
          yield command_webclient_pb2.StatusResponse(
                  message = msg
                )

    
  #rpc Buy (BuyData) returns (stream StatusResponse);
  def Buy(self, request, context):
    print(f'--- start Billing Buy', flush=True)

    request_dict = MessageToDict(request)
    metadata = dict( context.invocation_metadata() )

    buy_event={
      'service_id': self.service_id,
      'producer': self.producer,
      'topic': 'command-billing',
      'command': 'buy',
      'dialog_id': str( uuid.uuid4() ),
      'user_id': metadata['x-user-authorization-id'],
      'request': request_dict
    } 

    nickname = request_dict.pop('nickname')

    if metadata['x-user-authorization-nickname'] == nickname:
      buy_event['request']['profileid'] = buy_event['user_id']
      for msg, status in send_event( **buy_event) :
        yield command_webclient_pb2.StatusResponse(
                message = msg
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
          'datas': [
            { 'nickname': nickname }
          ],
          'paths': [ 'id' ]
        }
      }

      print(f'request_dict {request_dict}', flush=True)

      for msg, status in send_event( **get_request ):
        if status == 'close':
          profile_id = json.loads( msg )['profiles'][0]['id']
          buy_event['request']['profileid'] = profile_id

          print(f'profileid {profile_id}', flush=True)

          for msg, status in send_event( **buy_event) :
            print(f'msg {msg}', flush=True)
            yield command_webclient_pb2.StatusResponse(
                    message = msg
                  )
        elif status == 'error':
          print(f'error {msg}', flush=True)
          yield command_webclient_pb2.StatusResponse(
            message = msg
          )
        else:
          yield command_webclient_pb2.StatusResponse(
                  message = msg
                )


    



    print(f'--- end Billing Buy', flush=True)