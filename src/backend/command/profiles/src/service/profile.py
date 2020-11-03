import uuid
from sqlalchemy.exc import SQLAlchemyError

from database.sessions import db_session
from database.model import Users

def insert( profile ):
  print(f'--- start insert', flush=True)
  try:
    with db_session() as session:
      user = Users( **profile )
      session.add( user )
      session.commit()
    print(f'--- end insert', flush=True)
    return 'done'
  except SQLAlchemyError as e:
    error = str(e.__dict__['orig'])
    return error
  except:
    print("Unexpected error")
    return 'unexpected error'

def update( profile ):
  print(f'--- start update', flush=True)
  try:
    with db_session() as session:
      uuid_id = uuid.UUID(profile.pop('id', None))
      #session.query( Users ).filter_by( id=uuid_id ).update( profile, synchronize_session='fetch')
      session.query( Users ).filter_by( id=uuid_id ).update( profile )
      session.commit()
    print(f'--- end update', flush=True)
    return 'done'
  except SQLAlchemyError as e:
    error = str(e.__dict__['orig'])
    return error
  except:
    print("Unexpected error")
    return 'unexpected error'

def remove( profile ):
  print(f'--- start remove', flush=True)
  try:
    with db_session() as session:
      uuid_id = uuid.UUID(profile.pop('id', None))
      session.query( Users ).filter_by( **profile ).delete( synchronize_session='fetch' )
      session.commit()
    print(f'--- end remove', flush=True)
    return 'done'
  except SQLAlchemyError as e:
    error = str(e.__dict__['orig'])
    return error
  except:
    print("Unexpected error")
    return 'unexpected error'

commands = {
  'insert': insert,
  'update': update,
  'remove': remove
}