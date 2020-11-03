import grpc

import proto.web_client.web_client_pb2 as web_client_pb2
import proto.web_client.web_client_pb2_grpc as web_client_pb2_grpc

from google.protobuf import field_mask_pb2
from google.protobuf import json_format

import proto.record.record_pb2 as record_pb2

import security.access as access

import service.record_client as record_client
import service.profile_client as profile_client


class RecordService(web_client_pb2_grpc.RecordServicer):
  
  def _recordsResponse( records, filters, extended={} ):

    response = web_client_pb2.RecordsResponse()

    for record in records:
      record_filtered = { key:value for key, value in record.items() if key in filters }
      #print(f'Get record_filtered: {record_filtered} ', flush=True)
      response.records.append(
        web_client_pb2.RecordData(
            **record_filtered
        )
      )
    
    return response

  def _extended( data, key, extended ):

    new_data = []

    for d in data:
      for e in extended:
        if d[key] == e[key]:
          d.update(e)
      new_data.append(d)

    return new_data

  #rpc Insert (EditRecordRequest) returns (RecordsResponse);
  def Insert(self, request, context):

    print(f'Insert record: {request.record} ', flush=True)
    print(f'Insert fields: {request.fields} ', flush=True)

    fields = [
      "id",
      "createdAt",
      "lastUpdate",
      "nickname",
      "record"
    ]

    metadata = dict(context.invocation_metadata())
    nickname=metadata["x-user-authorization-nickname"]
    profile_id=metadata["x-user-authorization-id"]

    authorization, access_key = access.get_access(
      data=metadata,
      access={}
    )

    if not (access_key and authorization):
      context.set_code(grpc.StatusCode.PERMISSION_DENIED)
      context.set_details("Insert Record access denied")
      return None

    request_dict = json_format.MessageToDict(request.record)

    client = record_client.RecordClient()
    responce = client.insert_record(
      datas={
        request_dict
      },
      paths = []
    )

    responce_dict = json_format.MessageToDict( responce )

    responce_dict = RecordService._extended(
      data=responce_dict['records'],
      key='profileId',
      extended=[{
        'profileId': profile_id,
        'nickname': nickname
      }]
    )

    return RecordService._recordsResponse( responce_dict, filters=fields)
  
  #rpc Get(RecordsPaginationRequest) returns (RecordsCursorResponse);
  def Get(self, request, context):
    
    print(f'Get record: {request.cursor} ', flush=True)
    print(f'Get filters: {request.filters} ', flush=True)
    print(f'Get orders: {request.orders} ', flush=True)
    print(f'Get limit: {request.limit} ', flush=True)

    fields = [
      "id",
      "createdAt",
      "lastUpdate",
      "nickname",
      "record"
    ]

    request_dict = json_format.MessageToDict(request)

    p_client = profile_client.ProfileClient()

    print(f'Get request_dict: {request_dict} ', flush=True)

    for i in range( len( request_dict['filters'] ) ):
      if request_dict['filters'][i]['key'] == 'NICKNAME':
        if request_dict['filters'][i]['operand'] == 'IN':
          profiles = p_client.get_profile(
                          datas=[
                            {
                              'nickname': value 
                            } for value in request_dict['filters'][i]['values']
                          ],
                          paths=['id']
                        )
          profiles_dict = json_format.MessageToDict( profiles )              
          print(f"profiles_dict: {profiles_dict}", flush=True)
        request_dict['filters'][i]['key']='PROFILEID'

    response = web_client_pb2.RecordsCursorResponse(
      records = [
        web_client_pb2.RecordData(
          **{
            "id":"test id",
            "createdAt":"test createdAt",
            "lastUpdate":"test lastUpdate",
            "nickname":"test nickname",
            "record":"test record"
          }
        )
      ],
      cursor='cursor test'
    )

    return response
