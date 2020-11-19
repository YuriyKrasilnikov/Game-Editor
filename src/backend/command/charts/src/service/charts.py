import functools
import uuid
from datetime import datetime

from database.sessions import db

collections = {
  'charts': db['charts'],
  'nodes': db['nodes'],
  'edges': db['edges']
}


def debug(func):
    @functools.wraps(func)
    def wrapper_debug(*args, **kwargs):
        try:
          func(*args, **kwargs)
          return 'done', 'close'
        except Exception as e:
          print(f'--- error { str(e) }', flush=True)
          return str(e), 'error'
    return wrapper_debug

#---
@debug
def insert( data, collection ):
  print(f'--- start insert { data }', flush=True)

  db_collection = collections[ collection ]

  result = db_collection.insert_one( document=data )

  print(f'--- end insert', flush=True)

@debug
def remove( data, collection ):
  print(f'--- start remove { data }', flush=True)
  db_collection = collections[ collection ]

  db_collection.delete_one( data )
  print(f'--- end remove', flush=True)

commands = {
  'insert charts': functools.partial( insert, collection='charts' ),
  'remove charts': functools.partial( remove, collection='charts' )
}