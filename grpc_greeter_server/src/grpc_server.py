from concurrent import futures

import grpc
from concurrent.futures import ThreadPoolExecutor

import prometheus_client
from python_grpc_prometheus.prometheus_server_interceptor import PromServerInterceptor

import proto.api_demo_pb2 as api_demo_pb2
import proto.api_demo_pb2_grpc as api_demo_pb2_grpc

class Greeter(api_demo_pb2_grpc.GreeterServicer):
  def SayHello(self, request, context):
    return api_demo_pb2.HelloReply(message=f'Hello, grpc {request.name}!')

  def SayRepeatHello(self, request, context):
    for i in range(request.count):
        yield api_demo_pb2.HelloReply(message=f"Hello, grpc {request.name} {i}/{request.count}!")


class Server:
  _instance = None

  def __new__(cls, *args, **kwargs):
        if not Server._instance:
            Server._instance = super(Server, cls).__new__(cls, *args, **kwargs)
        return Server._instance

  def __init__(self):
    psi = PromServerInterceptor()
    self.server = grpc.server(futures.ThreadPoolExecutor(), interceptors=(psi,))
    self.serve()

  def serve(self):
    print('Prometheus client starting...')
    prometheus_client.start_http_server(9001)
    print('Server starting...')
    api_demo_pb2_grpc.add_GreeterServicer_to_server(Greeter(), self.server)
    self.server.add_insecure_port('[::]:9000')
    self.server.start()
    self.server.wait_for_termination()
    

