from database.sessions import db_session
from database.model import Records

import proto.record.record_pb2 as record_pb2
import proto.record.record_pb2_grpc as record_pb2_grpc

from google.protobuf import field_mask_pb2
from google.protobuf import json_format

class RecordService(record_pb2_grpc.RecordServicer):

    def _recordsResponse(records):
      response = record_pb2.RecordsResponse()

      for record in records:
        record_dict = record.to_dict()
        response.records.append(
          record_pb2.RecordData(
              **record_dict
          )
        )
      
      return response

    #---
    # rpc Get (RecordsRequest) returns (RecordDataList);

    # rpc Insert (RecordData) returns (RecordData);
    def Insert(self, request, context):

      print(f'Insert profileId: {request.record.profileId} ', flush=True)
      print(f'Insert record: {request.record.record} ', flush=True)

      profileId = request.record.profileId
      record = request.record.record

      add_obj = Records(
            profileId=profileId,
            record=record
          )

      with db_session() as session:
        session.add( add_obj )
        session.commit()
        session.refresh( add_obj )
      
      print(f'Insert add_obj: {add_obj} ', flush=True)

      return RecordService._recordsResponse( records=[ add_obj ] )
    # rpc Update (UpdateRecordRequest) returns (RecordData);
    # rpc Remove (RecordsRequest) returns (RecordDataList);