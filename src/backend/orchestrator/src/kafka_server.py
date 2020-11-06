import os
import uuid
from datetime import datetime
from base64 import b64decode
import json

from kafka import KafkaProducer, KafkaConsumer, TopicPartition, OffsetAndMetadata

from events.queries import queries

kafka_consumer_address=os.environ['kafka-consumer-address']
kafka_consumer_port=os.environ['kafka-consumer-port']
kafka_producer_address=os.environ['kafka-producer-address']
kafka_producer_port=os.environ['kafka-producer-port']

class Kafka_Server:
  _instance = None
 
  def __new__(cls, *args, **kwargs):
        if not Kafka_Server._instance:
            Kafka_Server._instance = super(Kafka_Server, cls).__new__(cls)
        return Kafka_Server._instance

  def __init__(self, topic, group):
    print('-'*30)
    print('#'*30)
    print(datetime.now())
    print('#'*30)

    self.service_id = str( uuid.uuid4() )

    print('KafkaProducer...', flush=True)
    self.producer = KafkaProducer(
      bootstrap_servers=[
        f'{kafka_producer_address}:{kafka_consumer_port}'
      ],
      api_version=(1, 0, 0),
      acks='all'
    )

    self.start_kafka_server( topic, group )


  def start_kafka_server(self, topic, group):
    print('KafkaConsumer...', flush=True)

    consumer = KafkaConsumer(
      topic,
      group_id=group,
      bootstrap_servers=[
        f'{kafka_consumer_address}:{kafka_producer_port}'
      ],
      api_version=(1, 0, 0),
      auto_offset_reset='earliest',
      enable_auto_commit=True
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

      msg = queries.get(command, lambda: "invalid query")( value=value )
      headers_dict['command'] = 'close'.encode('utf-8')
      # Asynchronous by default
      self.producer.send(
        topic=response_topic,
        value=msg.encode('utf-8'),
        headers=list( headers_dict.items() )
      )
  
