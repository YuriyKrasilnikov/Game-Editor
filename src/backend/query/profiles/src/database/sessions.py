import os

from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker

db_address=os.environ['db-address']
db_name=os.environ['db-name']
db_port=os.environ['db-port']
db_user=os.environ['db-user']
db_password=os.environ['db-password']

db_string = f"postgresql://{db_user}:{db_password}@{db_address}:{db_port}/{db_name}"
engine = create_engine(db_string)  
connection = engine.connect()

@contextmanager
def transaction(connection):
    if not connection.in_transaction():
        with connection.begin():
            yield connection
    else:
        yield connection

@contextmanager
def db_session():
    with transaction(connection):
        db_session = scoped_session(
            sessionmaker(
                autocommit=False,
                autoflush=True,
                bind=engine
            )
        )
        yield db_session
        db_session.close()