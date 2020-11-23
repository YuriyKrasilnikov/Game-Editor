import functools
import uuid
from datetime import datetime

from sqlalchemy.exc import SQLAlchemyError

from database.sessions import db_session
from database.model import Billing

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
    profile['profileid'] = uuid.UUID( profile['profileid'] )
    billing = Billing( **profile )
    session.add( billing )
    session.commit()
  print(f'--- end insert', flush=True)

#---
@debug
def update( profile ):
  print(f'--- start update', flush=True)
  with db_session() as session:
    uuid_profileid = uuid.UUID( profile.pop('profileid', None) )
    #session.query( Billing ).filter_by( id=uuid_id ).update( profile, synchronize_session='fetch')
    session.query( Billing ).filter_by( profileid=uuid_profileid ).update( profile )
    session.commit()
  print(f'--- end update', flush=True)

#---
@debug
def remove( profile ):
  print(f'--- start remove', flush=True)
  with db_session() as session:
    uuid_profileid = uuid.UUID( profile.pop('profileid', None) )
    session.query( Billing ).filter_by( profileid=uuid_profileid ).delete( synchronize_session='fetch' )
    session.commit()
  print(f'--- end remove', flush=True)

#---
@debug
def paid( profile ):
  print(f'--- start paid', flush=True)
  with db_session() as session:
    uuid_profileid = uuid.UUID( profile.pop('profileid', None) )
    #session.query( Billing ).filter_by( id=uuid_id ).update( profile, synchronize_session='fetch')
    session.query( Billing ).filter_by( profileid=uuid_profileid ).update(
      {
        'value': Billing.value + int( profile['value'] )
      } 
    )
    session.commit()
  print(f'--- end paid', flush=True)

@debug
def buy( profile ):
  print(f'--- start buy', flush=True)
  with db_session() as session:
    uuid_profileid = uuid.UUID( profile.pop('profileid', None) )
    #session.query( Billing ).filter_by( id=uuid_id ).update( profile, synchronize_session='fetch')
    billing = session.query( Billing ).filter_by( profileid=uuid_profileid ).first()
    value = billing.value - int( profile['value'] )
    if value >= 0:
      billing.value = value
    else:
      raise Exception('There are not enough funds on the account')
    session.commit()
  print(f'--- end buy', flush=True)

commands = {
  'insert': insert,
  'update': update,
  'remove': remove,
  'paid': paid,
  'buy':buy
}