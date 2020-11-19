import os
from contextlib import contextmanager
from pymongo import MongoClient

db_address=os.environ['db-address']
db_name=os.environ['db-name']
db_port=os.environ['db-port']
db_user=os.environ['db-user']
db_password=os.environ['db-password']

client = MongoClient(
          db_address,
          int(db_port),
          username=db_user,
          password=db_password,
          authSource=db_name,
          connect=False
        )
db = client[ db_name ]