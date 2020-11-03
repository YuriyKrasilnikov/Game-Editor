import uuid
import datetime

from sqlalchemy.ext.declarative import declarative_base  
from sqlalchemy.dialects import postgresql

from sqlalchemy import MetaData, Column, String, Unicode, DateTime

from database.sessions import engine

Base = declarative_base()

class Records(Base):  
    __tablename__ = "records"

    id = Column(postgresql.UUID(as_uuid=True), default=uuid.uuid4, primary_key=True)
    createdAt = Column(DateTime(timezone=True), default=datetime.datetime.now, nullable=False)
    lastUpdate = Column(DateTime(timezone=True), default=datetime.datetime.now, nullable=False)
    profileId = Column(Unicode, nullable=False)
    record = Column(Unicode, nullable=False)

    def __repr__(self):
        return f"<Records (id={self.id}, created_at={self.createdAt}, last_update={self.lastUpdate}, profile_id={self.profileId}, record={self.record}) >"

    def to_dict(self):
        return {
            'id': str(self.id),
            'created_at': str(self.createdAt),
            'last_update': str(self.lastUpdate),
            'profile_id': str(self.profileId),
            'record': str(self.record)
        }

def drop_table(table_name):
   metadata = MetaData(engine, reflect=True)
   table = metadata.tables.get(table_name)
   if table is not None:
       print(f'Deleting {table_name} table', flush=True)
       Base.metadata.drop_all(engine, [table], checkfirst=True)

drop_table("records")

Base.metadata.create_all(bind=engine)



