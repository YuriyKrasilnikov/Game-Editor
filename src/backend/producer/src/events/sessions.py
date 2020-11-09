import os
import json
import datetime

from kafka import KafkaProducer, KafkaConsumer, TopicPartition, OffsetAndMetadata

kafka_consumer_address=os.environ['kafka-consumer-address']
kafka_consumer_port=os.environ['kafka-consumer-port']
kafka_producer_address=os.environ['kafka-producer-address']
kafka_producer_port=os.environ['kafka-producer-port']

def __on_send_success(record_metadata):
  print(f'record_metadata.topic:{record_metadata.topic}', flush=True)
  print(f'record_metadata.partition:{record_metadata.partition}', flush=True)
  print(f'record_metadata.offset:{record_metadata.offset}', flush=True)

def __on_send_error(excp):
  print(f'I am an errback {excp}', flush=True)
  # log.error('I am an errback', exc_info=excp)
  # handle exception

def send_event(producer, service_id, topic, command, user_id, dialog_id, request):

  print(f'topic {topic}', flush=True)
  print(f'request {request}', flush=True)

  response_topic = 'answer-'+topic+'-'+user_id
  #response_group = 'answer-group-'+dialog_id
  response_group = 'answer-group-'+service_id

  request_json = json.dumps( request ).encode('utf-8')

  consumer = KafkaConsumer(
    response_topic,
    group_id=response_group,
    bootstrap_servers=[
      f'{kafka_consumer_address}:{kafka_consumer_port}'
    ],
    auto_offset_reset='earliest',
    enable_auto_commit=True
  )

  producer.send(
    topic=topic,
    value=request_json,
    headers=[
      ('command', command.encode('utf-8')),
      ('dialog-id', dialog_id.encode('utf-8')),
      ('response-topic', response_topic.encode('utf-8'))
    ],
  ).add_callback(__on_send_success).add_errback(__on_send_error)

  for message in consumer:
    # message value and key are raw bytes -- decode if necessary!
    # e.g., for unicode: `message.value.decode('utf-8')`
    print (f"{message.topic}:{message.partition}:{message.offset}: key={message.key} headers={message.headers} value={message.value.decode('utf-8')}", flush=True)

    consumer.commit(
      offsets={ 
        TopicPartition( topic=message.topic, partition=message.partition ): OffsetAndMetadata( message.offset+1, '' ) 
      }
    )

    headers_dict = dict(message.headers)

    if headers_dict['dialog-id'].decode('utf-8') == dialog_id:

      value = message.value.decode('utf-8')

      msg = value
      status = headers_dict['command'].decode('utf-8')

      if status == 'close' or status == 'error':
        consumer.close()

      yield msg, status