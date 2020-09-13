import uuid
from datetime import datetime
from cassandra.cqlengine import columns
from cassandra.cqlengine.models import Model

#first, define a model
class ExampleModel(Model):
    #__key_space__   = 'example_keyspace'  # Not Required
    #__table_name__ = 'example_table'  # Not Required

    #"id": request.id,
    #"name":request.name,
    #"age":request.age,
    #"address":request.address

    id              = columns.UUID(primary_key=True, default=uuid.uuid4)
    created_at      = columns.DateTime()
    name            = columns.Text(required=True)
    age             = columns.Decimal(required=True)
    address         = columns.Text(required=False)


    def __str__(self):
        return f"name: {self.name }, age: {self.age}" + f"age: {self.address}" if self.address else ""

    def to_dict(self):
        return {
            'id': str(self.id),
            'created_at': str(self.created_at),
            'name': self.name,
            'age': int(self.age),
            'address': self.address,
        }