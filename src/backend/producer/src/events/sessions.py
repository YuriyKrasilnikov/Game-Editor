import os

from kafka import KafkaProducer
from kafka import KafkaConsumer

kafka_consumer_address=os.environ['kafka-consumer-address']
kafka_consumer_port=os.environ['kafka-consumer-port']
kafka_producer_address=os.environ['kafka-producer-address']
kafka_producer_port=os.environ['kafka-producer-port']

Producer = KafkaProducer(
  bootstrap_servers=[
    f'{kafka_producer_address}:{kafka_consumer_port}'
  ],
  acks='all'
)

def initConsumer( 
  topic, 
  group_id,
  auto_offset_reset='earliest',
  consumer_timeout_ms=1000,
  **kwargs
  ):
  return KafkaConsumer(
      topic,
      group_id=group_id,
      bootstrap_servers=[
        f'{kafka_consumer_address}:{kafka_consumer_port}'
      ],
      auto_offset_reset=auto_offset_reset,
      consumer_timeout_ms=consumer_timeout_ms,
      **kwargs
    )