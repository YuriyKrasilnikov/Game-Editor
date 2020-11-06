import grpc

import proto.query.web_client.query_webclient_pb2 as query_webclient_pb2
import proto.query.web_client.query_webclient_pb2_grpc as query_webclient_pb2_grpc

from google.protobuf import field_mask_pb2
from google.protobuf import json_format

import security.access as access

from service.billing_client import BillingClient
from service.profile_client import ProfileClient

class BillingService(query_webclient_pb2_grpc.BillingServicer):

  def _BillingsResponse( billings, paths ):
    
    print(f'Get billing: {billings} ', flush=True)

    response = query_webclient_pb2.BillingDataList()

    for billing in billings:
      #print(f'Get billing_filtered: {billing} ', flush=True)
      billing = BillingService._fields_mask(
        cls=query_webclient_pb2.BillingData,
        data=billing,
        paths=paths
      )
      response.billings.append( billing )
    
    print(f'Get response: {response} ', flush=True)

    return response


  def _fields_mask(cls, data, paths):
    source = cls( **data )
    if paths:
      result = cls( )
      mask = field_mask_pb2.FieldMask(
        paths = paths
      )
      mask.MergeMessage(source, result)
      return result

    else:
      return source

  def profilesConvert(self, billings, replaced, replaced_to, source, source_to ):
    replacedSet=set()
    for billing in billings:
      if billing.get(replaced):
        replacedSet.add( billing[replaced] )

    replacedDict=[ {source:rep} for rep in replacedSet ]

    profileClient = ProfileClient()
    response = profileClient.get_profile(datas=replacedDict, paths = [source, source_to])
    response_dict = json_format.MessageToDict( response )['profiles']

    sourceToDict = { d.get(source):d.get(source_to) for d in response_dict if d.get(source_to) }

    for i in range( len( billings ) ):
      r = billings[i].pop( replaced, None )
      if r:
        billings[i][ replaced_to ]=sourceToDict[ r ]

    return billings

  #rpc Get(BillingsRequest) returns (BillingDataList);
  def Get(self, request, context):
    print(f'--- start Billing Get', flush=True)
    print(f'Get billing: {request.billingsData} ', flush=True)
    print(f'Get fields: {request.fields} ', flush=True)

    metadata = dict(context.invocation_metadata())
    request_billings = response_billings = self.profilesConvert(
        billings = json_format.MessageToDict( request.billingsData )['billings'],
        replaced = 'nickname',
        replaced_to = 'profileid',
        source = 'nickname',
        source_to = 'id'
      )
    query_path = ['updateAt', 'profileid', 'value', 'status']
    request_paths = request.fields.paths


    print(f'Get BillingClient request... ', flush=True)
    client = BillingClient()
    client_response = client.get_billing(
      datas = request_billings,
      paths = query_path
    )

    response_dict = json_format.MessageToDict( client_response )

    print(f'Get response_dict: {response_dict} ', flush=True)

    if response_dict.get( 'billings' ):
      response_billings = self.profilesConvert(
        billings = response_dict['billings'],
        replaced = 'profileid',
        replaced_to = 'nickname',
        source = 'id',
        source_to = 'nickname'
      )
      response = BillingService._BillingsResponse( response_billings, paths=request_paths)
    else:
      context.set_code(grpc.StatusCode.NOT_FOUND)
      context.set_details(f'Requested billings not found')
      response = query_webclient_pb2.BillingDataList()
    print(f'--- end Billing Get', flush=True)
    return response