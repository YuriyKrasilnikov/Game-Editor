from concurrent import futures

from datetime import datetime
from base64 import b64decode

import grpc

import proto.command.web_client.command_webclient_pb2_grpc as command_webclient_pb2_grpc

from service.profile import ProfileService

class Server:
  _instance = None
  
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
      servicer=ProfileService(),
      server=self.server
    )

    self.server.add_insecure_port(hosts+str(port))
    self.server.start()

    print(f'GRPC Server start on port: { port }')
      

