import uuid
import datetime

from sqlalchemy.ext.declarative import declarative_base  
from sqlalchemy.dialects import postgresql

from sqlalchemy import MetaData, Column, Integer, String, Unicode, DateTime

from sqlalchemy.ext.hybrid import hybrid_property

from database.sessions import engine

Base = declarative_base()

class Billing(Base):  
    __tablename__ = "billing"

    id = Column(postgresql.UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    updateAt = Column(DateTime(timezone=True), default=datetime.datetime.now, onupdate=datetime.datetime.now, nullable=False)
    profileid = Column(postgresql.UUID(as_uuid=True), unique=True, nullable=False)
    value = Column(Integer, unique=False, nullable=False)
    status = Column(Unicode, unique=False, nullable=True)

    def __repr__(self):
        return f"<Billing (id={self.id}, updateAt={self.updateAt}, profileid={self.profileid}, value={self.value}), status={self.status})>"

    def to_dict(self):
        return {
            'id': str(self.id),
            'updateAt': str(self.updateAt),
            'profileid': str(self.profileid),
            'value': str(self.value),
            'status':str(self.status)
        }

def drop_table(table_name):
   metadata = MetaData(engine, reflect=True)
   table = metadata.tables.get(table_name)
   if table is not None:
       print(f'Deleting {table_name} table', flush=True)
       Base.metadata.drop_all(engine, [table], checkfirst=True)

#drop_table("billing")

Base.metadata.create_all(bind=engine)



