import grpc

import proto.query.web_client.query_webclient_pb2 as query_webclient_pb2
import proto.query.web_client.query_webclient_pb2_grpc as query_webclient_pb2_grpc

from google.protobuf import field_mask_pb2
from google.protobuf import json_format

import security.access as access

#from service.billing_client import BillingClient

class BillingService(query_webclient_pb2_grpc.BillingServicer):

  #rpc Get(BillingsRequest) returns (BillingDataList);
  def Get(self, request, context):
    print(f'--- start Billing Get', flush=True)
    print(f'Get billing: {request.billingsData} ', flush=True)
    print(f'Get fields: {request.fields} ', flush=True)

    responce = query_webclient_pb2.BillingDataList(
      billings = [ query_webclient_pb2.BillingData(
          createdAt = 'createdAt 1',
          nickname = 'nickname 1',
          value = 'value 1',
          status = 'status 1',
      ) ]
    )
    print(f'--- end Billing Get', flush=True)
    return responce