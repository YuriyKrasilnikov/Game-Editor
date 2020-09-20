"""The Python implementation of the GRPC helloworld.Greeter server."""
import os
import _thread
import autoreloader
from grpc_server import Server

import sys, os, time, logging

_thread.start_new_thread(autoreloader.reloader_thread, (__name__,))

if __name__ == '__main__':
  Server(server_port=9000, cassandra_key=os.environ['cassandra-key'])