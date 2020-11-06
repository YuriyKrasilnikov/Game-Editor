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

  #rpc Insert (PaidData) returns (stream StatusResponse);
  def Insert(self, request, context):
    print(f'--- start Billing Insert', flush=True)

    request_dict = MessageToDict(request)
    metadata = dict( context.invocation_metadata() )

    command = 'insert'
    user_id = metadata['x-user-authorization-id']
    dialog_id = str( uuid.uuid4() )

    request_dict['profileid'] = user_id

    for response in send_event( command=command, user_id=user_id, dialog_id=dialog_id, request=request_dict):
      yield command_webclient_pb2.StatusResponse(
              message = response
            )

    print(f'--- end Billing Insert', flush=True)