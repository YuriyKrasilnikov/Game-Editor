from concurrent import futures

from datetime import datetime

import grpc

import cassandra
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider

import cassandra.cqlengine
import cassandra.cqlengine.management

from concurrent.futures import ThreadPoolExecutor

import prometheus_client
from py_grpc_prometheus.prometheus_server_interceptor import PromServerInterceptor

import proto.api_demo_pb2 as api_demo_pb2
import proto.api_demo_pb2_grpc as api_demo_pb2_grpc

from model import ExampleModel



class Greeter(api_demo_pb2_grpc.GreeterServicer):

  def SayHello(self, request, context):
    response={
      'message':f'Hello, grpc {request.name}!'
    }
    return api_demo_pb2.HelloReply(
      **response
    )

  def SayRepeatHello(self, request, context):
    for i in range(request.count):
        yield api_demo_pb2.HelloReply(
          message=f"Hello, grpc {request.name} {i}/{request.count}!"
        )


class CustomerCRUD(api_demo_pb2_grpc.CustomerServiceServicer):

    def __init__(self, model):
      self.model=model

    #---
    #rpc GetAll (Empty) returns (CustomerList)
    def GetAll(self, request, context):
      customer_list = self.model.objects

      response = api_demo_pb2.CustomerList()

      for customer in customer_list:
        customer_dict = customer.to_dict()
        response.customers.append(
          api_demo_pb2.Customer(
            id = api_demo_pb2.Customer.ID(
              id=customer_dict.pop("id", '')
            ),
            info = api_demo_pb2.Customer.Info(
              **customer_dict
            )
          )
        )

      return response

    #---
    #rpc Get (CustomerRequestId) returns (Customer)
    def Get(self, request, context):
      
      customer_list = self.model.objects

      customer_id = request.id

      customer = {
        "id":"0",
        "name":"User_0_Name",
        "age":31,
        "address":"address1 address2 address3",
      }

      return api_demo_pb2.Customer(
        customer
      )

    #---
    #rpc Insert (Customer) returns (Customer)
    def Insert(self, request, context):
      
      print(f'Insert...', flush=True)

      customer_name = request.name
      customer_age = request.age
      customer_address = request.address

      print(f'request: {request}', flush=True)

      instance = self.model.create(
        name            = request.name,
        age             = request.age,
        address         = request.address,
        created_at      = datetime.now()
      ).to_dict()
      
      return api_demo_pb2.Customer(
            id = api_demo_pb2.Customer.ID(
              id=instance.pop("id", '')
            ),
            info = api_demo_pb2.Customer.Info(
              **instance
            )
      )

    #---
    #rpc Update (Customer) returns (Customer)
    def Update(self, request, context):
      
      customer_id = request.id
      customer_name = request.name
      customer_age = request.age
      customer_address = request.address

      customer = {
        "id": request.id,
        "name":request.name,
        "age":request.age,
        "address":request.address
      }

      return api_demo_pb2.Customer(

      )

    #---
    #rpc Remove (CustomerRequestId) returns (Empty)
    def Remove(self, request, context):
      customer_id = request.id
      return api_demo_pb2.Empty( )


class Server:
  _instance = None

  def __new__(cls, *args, **kwargs):
        if not Server._instance:
            Server._instance = super(Server, cls).__new__(cls)
        return Server._instance

  def __init__(self, server_port, metric_port=9001, db_model=ExampleModel):
    print('\n'*2)
    print('#'*30)
    print(datetime.now())
    print('#'*30)

    psi = PromServerInterceptor()
    self.server = grpc.server(futures.ThreadPoolExecutor(), interceptors=(psi,))

    self.start_prometheus_client(
      port=metric_port
    )
    
    #self.cas_sys_query( username='cassandra', password='Xd4VVBWt2z', hosts=['cassandra.cassandra.svc'], deleted_keyspace='example_crud_keyspace')
    
    self.start_cassandra_client(
      username='cassandra',
      password='Xd4VVBWt2z',
      hosts=['cassandra.cassandra.svc'],
      default_keyspace='example_crud_keyspace',
      model=db_model
    )
    

    self.start_grpc_server(
      port=server_port,
      model=db_model
    )

    print('Server now wait for termination...',flush=True)
    self.server.wait_for_termination()


  def start_grpc_server(self, port, model, hosts='[::]:'):
    print('GRPC Server starting...')
    api_demo_pb2_grpc.add_GreeterServicer_to_server(Greeter(), self.server)
    api_demo_pb2_grpc.add_CustomerServiceServicer_to_server(
      servicer=CustomerCRUD(
        model=model
      ),
      server=self.server
    )

    self.server.add_insecure_port(hosts+str(port))
    self.server.start()

    print(f'GRPC Server start on port: { port }')
        

  def start_prometheus_client(self, port):
    print(f'Prometheus client starting at port:{port}...')
    prometheus_client.start_http_server(port)

  def start_cassandra_client(self, username, password, hosts, default_keyspace, model):
    print(f'Cassandra {cassandra.__version__} starting...')
    auth_provider = PlainTextAuthProvider(
      username=username,
      password=password
    )

    cassandra.cqlengine.connection.setup(
      hosts=hosts,
      default_keyspace=default_keyspace,
      auth_provider=auth_provider
    )

    cassandra.cqlengine.management.create_keyspace_simple(
      name=default_keyspace,
      replication_factor=3
      )

    cassandra.cqlengine.management.sync_table(
      model=model
    )


  def cas_sys_query(self, username, password, hosts, deleted_keyspace):
      auth_provider = PlainTextAuthProvider(
        username=username,
        password=password
      )

      cluster = Cluster(hosts, auth_provider=auth_provider)
      session = cluster.connect()

      print(f'Cassandra release_version: { session.execute("SELECT release_version FROM system.local").one() }')

      session.execute(f"DROP KEYSPACE IF EXISTS {deleted_keyspace}")

      #Get table keyspaces
      keyspaces = session.execute("SELECT * FROM system_schema.keyspaces")
      keyspace_list = [keyspace.keyspace_name for keyspace in keyspaces]
      print(f'Cassandra get all keyspace: ')
      print('-'*34)
      print('| %-30s |' % 'Keyspace')
      print('='*34)
      for keyspace_name in keyspace_list:
        print('| %-30s |' % keyspace_name)
        print('-'*34)

      #Get table tables
      tables = session.execute("SELECT * FROM system_schema.tables")
      print(f'Cassandra get all tables: ')
      print('-'*67)
      print('| %-30s | %-30s |' % ('Keyspace Name', 'Table Name'))
      print('='*67)
      for table in tables:
        print('| %-30s | %-30s |' % (table.keyspace_name, table.table_name))
        print('-'*67)
      

