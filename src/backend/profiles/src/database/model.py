import uuid
import datetime

from sqlalchemy.ext.declarative import declarative_base  
from sqlalchemy.dialects import postgresql

from sqlalchemy import MetaData, Column, String, DateTime

from database.sessions import engine

Base = declarative_base()

class Users(Base):  
    __tablename__ = "users"

    id = Column(postgresql.UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    createdAt = Column(DateTime(timezone=True), default=datetime.datetime.now(), nullable=False)
    email = Column(String, unique=True, nullable=False)
    nickname = Column(String, unique=True, nullable=True)

    def __repr__(self):
        return f"<User(id={self.id}, createdAt={self.createdAt}, email={self.email}, nickname={self.nickname})>"

    def to_dict(self):
        return {
            'id': self.id,
            'createdAt': self.createdAt,
            'email': self.email,
            'nickname': self.nickname
        }

def drop_table(table_name):
   metadata = MetaData(engine, reflect=True)
   table = metadata.tables.get(table_name)
   if table is not None:
       print(f'Deleting {table_name} table', flush=True)
       Base.metadata.drop_all(engine, [table], checkfirst=True)

Base.metadata.create_all(bind=engine)



