import functools
import uuid
from sqlalchemy.exc import SQLAlchemyError

from database.sessions import db_session
from database.model import Users

def debug(func):
    @functools.wraps(func)
    def wrapper_debug(*args, **kwargs):
        try:
          value = func(*args, **kwargs)
          return 'done', 'close'
        except SQLAlchemyError as e:
          return str(e.__dict__['orig']), 'error'
        except Exception as e:
          return str(e), 'error'
    return wrapper_debug

#---
@debug
def insert( profile ):
  print(f'--- start insert', flush=True)
  with db_session() as session:
    user = Users( **profile )
    session.add( user )
    session.commit()
  print(f'--- end insert', flush=True)

#---
@debug
def update( profile ):
  print(f'--- start update', flush=True)
  with db_session() as session:
    uuid_id = uuid.UUID(profile.pop('id', None))
    #session.query( Users ).filter_by( id=uuid_id ).update( profile, synchronize_session='fetch')
    session.query( Users ).filter_by( id=uuid_id ).update( profile )
    session.commit()
  print(f'--- end update', flush=True)

#---
@debug
def remove( profile ):
  print(f'--- start remove', flush=True)
  with db_session() as session:
    uuid_id = uuid.UUID(profile.pop('id', None))
    session.query( Users ).filter_by( id=uuid_id ).delete( synchronize_session='fetch' )
    session.commit()
  print(f'--- end remove', flush=True)

commands = {
  'insert': insert,
  'update': update,
  'remove': remove
}