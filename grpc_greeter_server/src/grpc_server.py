from concurrent import futures

import grpc

import proto.api_demo_pb2 as api_demo_pb2
import proto.api_demo_pb2_grpc as api_demo_pb2_grpc

class Greeter(api_demo_pb2_grpc.GreeterServicer):
  def SayHello(self, request, context):
    return api_demo_pb2.HelloReply(message=f'Hello, test23234 {request.name}!')

  def SayRepeatHello(self, request, context):
    for i in range(request.count):
        yield api_demo_pb2.HelloReply(message=f"Hello, test24332 {request.name} {i}/{request.count}!")


class Server:
  _instance = None

  def __new__(cls, *args, **kwargs):
        if not Server._instance:
            Server._instance = super(Server, cls).__new__(cls, *args, **kwargs)
        return Server._instance

  def __init__(self):
    self.server = grpc.server(futures.ThreadPoolExecutor())
    self.serve()

  def serve(self):
    print('Server starting...')
    api_demo_pb2_grpc.add_GreeterServicer_to_server(Greeter(), self.server)
    self.server.add_insecure_port('[::]:9090')
    self.server.start()
    self.server.wait_for_termination()

