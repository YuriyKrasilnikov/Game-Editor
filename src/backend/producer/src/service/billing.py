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

from events.sessions import Producer, initConsumer

class BillingService(command_webclient_pb2_grpc.BillingServicer):

  def _on_send_success(record_metadata):
    print(f'record_metadata.topic:{record_metadata.topic}', flush=True)
    print(f'record_metadata.partition:{record_metadata.partition}', flush=True)
    print(f'record_metadata.offset:{record_metadata.offset}', flush=True)

  def _on_send_error(excp):
    print(f'I am an errback {excp}', flush=True)
    # log.error('I am an errback', exc_info=excp)
    # handle exception

  def _send_event(command, user_id, dialog_id, request):

    responce_topic = 'answer-profile-'+user_id
    responce_group = 'answer-group-'+dialog_id

    request_json = json.dumps( request ).encode('utf-8')

    consumer = initConsumer(
      topic=responce_topic,
      group_id=responce_group,
      enable_auto_commit=False
    )

    Producer.send(
      topic='command-billing',
      value=request_json,
      headers=[
        ('command', command.encode('utf-8')),
        ('dialog-id', dialog_id.encode('utf-8')),
        ('responce-topic', responce_topic.encode('utf-8'))
      ],
    ).add_callback(BillingService._on_send_success).add_errback(BillingService._on_send_error)

    yield command_webclient_pb2.StatusResponse(
      message = f"{command} proceccing..."
    )

    for message in consumer:
      # message value and key are raw bytes -- decode if necessary!
      # e.g., for unicode: `message.value.decode('utf-8')`
      print (f"{message.topic}:{message.partition}:{message.offset}: key={message.key} headers={message.headers} value={message.value.decode('utf-8')}", flush=True)

      headers_dict = dict(message.headers)

      if headers_dict['dialog-id'].decode('utf-8') == dialog_id:
        consumer.commit()

        value = message.value.decode('utf-8')

        msg = f"Command: { headers_dict['command'].decode('utf-8') }. Status: {value}"

        print (f"msg: {msg}", flush=True)

        yield command_webclient_pb2.StatusResponse(
          message = msg,
        )

        if value=='done':
          consumer.close()

  #rpc Insert (PaidData) returns (stream StatusResponse);
  def Insert(self, request, context):
    print(f'--- start Billing Insert', flush=True)

    request_dict = MessageToDict(request)
    metadata = dict( context.invocation_metadata() )

    command = 'insert'
    user_id = metadata['x-user-authorization-id']
    dialog_id = str( uuid.uuid4() )

    request_dict['profileid'] = user_id

    for responce in BillingService._send_event( command=command, user_id=user_id, dialog_id=dialog_id, request=request_dict):
       yield responce

    print(f'--- end Billing Insert', flush=True)