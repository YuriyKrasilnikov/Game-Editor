import grpc
import json
import datetime
import uuid

from kafka import KafkaConsumer
from kafka.errors import KafkaError

from google.protobuf import field_mask_pb2
from google.protobuf import json_format

from google.protobuf.json_format import MessageToDict

import proto.command.web_client.command_webclient_pb2 as command_webclient_pb2
import proto.command.web_client.command_webclient_pb2_grpc as command_webclient_pb2_grpc

import security.access as access
import producer.producer as producer


class ProfileService(command_webclient_pb2_grpc.ProfileServicer):

  def _on_send_success(record_metadata):
    print(f'record_metadata.topic:{record_metadata.topic}', flush=True)
    print(f'record_metadata.partition:{record_metadata.partition}', flush=True)
    print(f'record_metadata.offset:{record_metadata.offset}', flush=True)

  def _on_send_error(excp):
    print(f'I am an errback {excp}', flush=True)
    # log.error('I am an errback', exc_info=excp)
    # handle exception

  #rpc Insert (ProfileData) returns (StatusResponse);;
  def Insert(self, request, context):
    print(f'--- start Insert', flush=True)

    request_dict = {
      'insert': MessageToDict(request)
    }

    request_json = json.dumps(request_dict).encode('utf-8')

    command = 'insert'
    id = str( uuid.uuid4() )
    topic = 'answer-profile-'+id

    future = producer.Producer.send(
        topic=topic,
        value=b'init',
        headers=[
          ('command', command.encode('utf-8')),
          ('id', id.encode('utf-8'))
        ],
    ).add_callback( ProfileService._on_send_success ).add_errback( ProfileService._on_send_error )

    # Block for 'synchronous' sends
    try:
      record_metadata = future.get(timeout=10)
      print(f'record_metadata... {record_metadata}', flush=True)
    except KafkaError:
      # Decide what to do if produce request failed...
      log.exception()

    consumer = KafkaConsumer(
      topic,
      group_id='answer-group',
      bootstrap_servers=[
        'command-kafka.kafka.svc.cluster.local:9092'
      ],
      auto_offset_reset='earliest',
      enable_auto_commit=False,
      consumer_timeout_ms=1000
    )

    if consumer.bootstrap_connected():
      # Asynchronous by default
      producer.Producer.send(
        topic='command-profile',
        value=request_json,
        headers=[
          ('command', command.encode('utf-8')),
          ('id', id.encode('utf-8'))
        ],
      ).add_callback(ProfileService._on_send_success).add_errback(ProfileService._on_send_error)

    yield command_webclient_pb2.StatusResponse( message = "Insert proceccing..." )

    print(f'KafkaConsumer message...', flush=True)
    print(f'KafkaConsumer topics={ consumer.topics() } message...', flush=True)
    print(f'KafkaConsumer subscription={ consumer.subscription() } message...', flush=True)
    for message in consumer:
      # message value and key are raw bytes -- decode if necessary!
      # e.g., for unicode: `message.value.decode('utf-8')`
      print (f"{message.topic}:{message.partition}:{message.offset}: key={message.key} headers={message.headers} value={message.value.decode('utf-8')}", flush=True)

      value = message.value.decode('utf-8')
      headers_dict = dict(message.headers)
      consumer.commit()

      if value=='done':
        yield command_webclient_pb2.StatusResponse(
            message = value,
        )
        consumer.close()
      else:
        yield command_webclient_pb2.StatusResponse(
            message = value,
        )
      
      print (f"send {value}", flush=True)

    print(f'--- end Insert', flush=True)
