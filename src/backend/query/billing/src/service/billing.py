import uuid

from database.sessions import db_session
from database.model import Billing

import proto.query.billing.query_billing_pb2 as query_billing_pb2
import proto.query.billing.query_billing_pb2_grpc as query_billing_pb2_grpc

from google.protobuf import field_mask_pb2

from google.protobuf.json_format import MessageToDict

class BillingService(query_billing_pb2_grpc.BillingServicer):

    def _billingsResponse(billings, paths):

      response = query_billing_pb2.BillingDataList()

      for billing in billings:
        billing = BillingService._fields_mask(
          cls=query_billing_pb2.BillingData,
          data=billing.to_dict(),
          paths=paths
        )
        response.billings.append( billing )

      print(f'response {response}', flush=True)

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

    def _billings2filter(cls, datas):

      d = {}
      for data in datas:
        for key, value in data.items():
          if not (key in d):
              d[key]=[]
          d[key].append(value)

      result=[
        getattr( cls, key ).in_( value ) for key, value in d.items()
      ] 

      return result


    #---
    def Get(self, request, context):
      print(f'--- start Get', flush=True)
      print(f'Get billings: {request.billingsData}', flush=True)
      print(f'Get fields: {request.fields} ', flush=True)
    
      paths=request.fields.paths

      if request.billingsData.billings:
        print(f'1', flush=True)
        request_dict = MessageToDict(request.billingsData)
        print(f'2', flush=True)
        query_filter = BillingService._billings2filter( cls=Billing, datas=request_dict['billings'] )
      else:
        query_filter=[]

      print(f'Get query_filter: {query_filter} ', flush=True)
      with db_session() as session:
        billings = session.query( Billing ).filter( *query_filter ).all()

      response = BillingService._billingsResponse( billings=billings, paths=paths )
      print(f'--- end Get', flush=True)
      return response
      