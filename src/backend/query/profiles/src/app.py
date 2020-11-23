import os
import _thread
import autoreloader
from grpc_server import Server

_thread.start_new_thread(autoreloader.reloader_thread, (__name__,))

if __name__ == '__main__':
  Server(
    server_port=9000
  )