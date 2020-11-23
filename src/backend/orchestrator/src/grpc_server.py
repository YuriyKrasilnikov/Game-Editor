from concurrent import futures

from datetime import datetime
from base64 import b64decode

import grpc

import proto.query.web_client.query_webclient_pb2_grpc as query_webclient_pb2_grpc

from service.profile import ProfileService
from service.billing import BillingService
from service.charts import ChartsService

class GRPC_Server:
  _instance = None
  
  def __new__(cls, *args, **kwargs):
        if not GRPC_Server._instance:
            GRPC_Server._instance = super(GRPC_Server, cls).__new__(cls)
        return GRPC_Server._instance

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

    print('GRPC Server now wait for termination...', flush=True)
    self.server.wait_for_termination()


  def start_grpc_server(self, port, hosts='[::]:'):
    print('Profile GRPC Server starting...')
    query_webclient_pb2_grpc.add_ProfileServicer_to_server(
      servicer=ProfileService(),
      server=self.server
    )
    print('Billing GRPC Server starting...')
    query_webclient_pb2_grpc.add_BillingServicer_to_server(
      servicer=BillingService(),
      server=self.server
    )

    print('Charts GRPC Server starting...')
    query_webclient_pb2_grpc.add_ChartsServicer_to_server(
      servicer=ChartsService(),
      server=self.server
    )

    self.server.add_insecure_port(hosts+str(port))
    self.server.start()

    print(f'GRPC Server start on port: { port }')
      

