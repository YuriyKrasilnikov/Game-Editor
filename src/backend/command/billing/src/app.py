import os
import json
from datetime import datetime
import uuid

from kafka import KafkaConsumer, KafkaProducer, TopicPartition, OffsetAndMetadata

from service.billing import commands
 
kafka_consumer_address=os.environ['kafka-consumer-address']
kafka_consumer_port=os.environ['kafka-consumer-port']
kafka_producer_address=os.environ['kafka-producer-address']
kafka_producer_port=os.environ['kafka-producer-port']

def _on_send_success(record_metadata):
  print(f'record_metadata.topic:{record_metadata.topic}', flush=True)
  print(f'record_metadata.partition:{record_metadata.partition}', flush=True)
  print(f'record_metadata.offset:{record_metadata.offset}', flush=True)

def _on_send_error(excp):
  print(f'I am an errback {excp}', flush=True)
  # log.error('I am an errback', exc_info=excp)
  # handle exception


if __name__ == '__main__':
  print('-'*30)
  print('#'*30)
  print(datetime.now())
  print('#'*30)

  print('KafkaConsumer...', flush=True)
  consumer = KafkaConsumer(
    'command-billing',
    group_id='billing-group',
    bootstrap_servers=[
      f'{kafka_consumer_address}:{kafka_consumer_port}'
    ],
    auto_offset_reset='earliest',
    enable_auto_commit=True
  )

  print('KafkaProducer...', flush=True)
  producer = KafkaProducer(
    bootstrap_servers=[
      f'{kafka_producer_address}:{kafka_producer_port}'
    ],
    acks='all'
  )

  for message in consumer:
      # message value and key are raw bytes -- decode if necessary!
      # e.g., for unicode: `message.value.decode('utf-8')`
      print (f"{message.topic}:{message.partition}:{message.offset}: key={message.key} headers={message.headers} value={message.value.decode('utf-8')}", flush=True)

      consumer.commit(
        offsets={ 
          TopicPartition( topic=message.topic, partition=message.partition ): OffsetAndMetadata( message.offset+1, '' ) 
        }
      )

      headers_dict = dict( message.headers )

      command = headers_dict['command'].decode('utf-8')
      response_topic = headers_dict['response-topic'].decode('utf-8')

      value = json.loads( message.value.decode('utf-8') )
      response = commands.get(command, lambda: "invalid commands")( value )

      headers_dict['command'] = 'close'.encode('utf-8')

      # Asynchronous by default
      producer.send(
        topic=response_topic,
        value=response.encode('utf-8'),
        headers=list( headers_dict.items() )
      ).add_callback(_on_send_success).add_errback(_on_send_error)

      print("next...", flush=True)