import os
import grpc

import proto.record.record_pb2 as record_pb2
import proto.record.record_pb2_grpc as record_pb2_grpc

from google.protobuf import field_mask_pb2

record_address=os.environ['record-address']
record_port=os.environ['record-port']

channel_string = f"{record_address}:{record_port}"

class RecordClient:
  
  def __RecordData(datas):
    return [ record_pb2.RecordData( **data ) for data in datas if data ]

  def __init__(self):
    # instantiate a channel
    self.channel  = grpc.insecure_channel(channel_string)
    # bind the client and the server
    self.stub = record_pb2_grpc.RecordStub(self.channel)

  def insert_record(self, datas, paths):

    records = RecordClient.__RecordData(datas=datas)

    response = self.stub.Insert(
              profile_pb2.EditRecordsRequest(
                recordList=profile_pb2.RecordDataList(
                    records=records
                  ),
                fields=field_mask_pb2.FieldMask( 
                  paths=paths 
                )
              )
            )


    return response

  def get_pagination(self, filters, orders, cursor, limit):
    
    g_filters = [
      record_pb2.Filter( **f ) for f in filters
    ]

    g_orders = [
      record_pb2.Ordering( **o ) for o in orders
    ]


    return self.stub.GetWithPagination(
              record_pb2.RecordsPaginationRequest(
                cursor=cursor,
                filters=g_filters,
                orders=g_orders,
                limit=limit
              )
            )