import os
from concurrent import futures

from datetime import datetime
from base64 import b64decode
import uuid

from kafka import KafkaProducer

import grpc

import proto.command.web_client.command_webclient_pb2_grpc as command_webclient_pb2_grpc

from service.profile import ProfileService
from service.billing import BillingService
from service.charts import ChartsService

kafka_producer_address=os.environ['kafka-producer-address']
kafka_producer_port=os.environ['kafka-producer-port']

class Server:
  _instance = None
  
  _service_id = str( uuid.uuid4() )

  _producer = KafkaProducer(
    bootstrap_servers=[
      f'{kafka_producer_address}:{kafka_producer_port}'
    ],
    acks='all'
  )

  def __new__(cls, *args, **kwargs):
        if not Server._instance:
            Server._instance = super(Server, cls).__new__(cls)
        return Server._instance

  def __init__(self, server_port):
    print('-'*30)
    print('#'*30)
    print(datetime.now())
    print('#'*30)

    self.server = grpc.server(
      thread_pool=futures.ThreadPoolExecutor()
    )

    self.start_grpc_server(
      port=server_port
    )

    print('Server now wait for termination...', flush=True)
    self.server.wait_for_termination()


  def start_grpc_server(self, port, hosts='[::]:'):
    print('Profile GRPC Server starting...')
    command_webclient_pb2_grpc.add_ProfileServicer_to_server(
      servicer=ProfileService( service_id=Server._service_id, producer=Server._producer ),
      server=self.server
    )
    
    print('Billing GRPC Server starting...')
    command_webclient_pb2_grpc.add_BillingServicer_to_server(
      servicer=BillingService( service_id=Server._service_id, producer=Server._producer ),
      server=self.server
    )

    print('Charts GRPC Server starting...')
    command_webclient_pb2_grpc.add_ChartsServicer_to_server(
      servicer=ChartsService( service_id=Server._service_id, producer=Server._producer ),
      server=self.server
    )

    self.server.add_insecure_port(hosts+str(port))
    self.server.start()

    print(f'GRPC Server start on port: { port }')
