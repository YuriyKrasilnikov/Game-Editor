import uuid
from sqlalchemy.exc import SQLAlchemyError

from database.sessions import db_session
from database.model import Billing

def insert( paid ):
  print(f'--- start insert', flush=True)
  try:
    with db_session() as session:
      billing = Billing( **paid )
      session.add( billing )
      session.commit()
    print(f'--- end insert', flush=True)
    return 'done'
  except SQLAlchemyError as e:
    error = str(e.__dict__['orig'])
    return error
  except:
    print("Unexpected error")
    return 'unexpected error'

commands = {
  'insert': insert
}