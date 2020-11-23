import os

from server import Server

if __name__ == '__main__':
  Server(
    topic='saga',
    group='saga'
  )
