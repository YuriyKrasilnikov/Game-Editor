import os
import _thread
import threading
import autoreloader
from grpc_server import GRPC_Server
from kafka_server import Kafka_Server

#_thread.start_new_thread(autoreloader.reloader_thread, (__name__,))

if __name__ == '__main__':
  t1 = threading.Thread(target=Kafka_Server, args=('query_orchestrator', 'query_orchestrator'))
  t2 = threading.Thread(target=GRPC_Server, args=(9000,) )
  t1.start()
  t2.start()