import os

from contextlib import contextmanager

from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session
from sqlalchemy.orm import sessionmaker

profiledb_address=os.environ['profiledb-address']
profiledb_db=os.environ['profiledb-db']
profiledb_port=os.environ['profiledb-port']
profiledb_user=os.environ['profiledb-user']
profiledb_password=os.environ['profiledb-password']

db_string = f"postgresql://{profiledb_user}:{profiledb_password}@{profiledb_address}:{profiledb_port}/{profiledb_db}"
engine = create_engine(db_string)  

@contextmanager
def db_session():
    connection = engine.connect()
    db_session = scoped_session(
        sessionmaker(
            autocommit=False,
            autoflush=True,
            bind=engine
        )
    )
    yield db_session
    db_session.close()
    connection.close()