import os
import grpc

import proto.query.billing.query_billing_pb2 as query_billing_pb2
import proto.query.billing.query_billing_pb2_grpc as query_billing_pb2_grpc


from google.protobuf import field_mask_pb2

billing_address=os.environ['billing-address']
billing_port=os.environ['billing-port']

channel_string = f"{billing_address}:{billing_port}"

class BillingClient:

  def __BillingData(datas):
    print(f'__BillingData datas:{datas}', flush=True)
    return [ query_billing_pb2.BillingData( **data ) for data in datas if data ]
  
  def __init__(self):
    # instantiate a channel
    self.channel  = grpc.insecure_channel(channel_string)
    # bind the client and the server
    self.stub = query_billing_pb2_grpc.BillingStub(self.channel)

  def get_billing(self, datas, paths):
    print(f'get_billing 1', flush=True)
    billings = BillingClient.__BillingData(datas=datas)

    print(f'get_billing  2', flush=True)
    response = self.stub.Get(
              query_billing_pb2.BillingsRequest(
                billingsData=query_billing_pb2.BillingDataList(
                    billings=billings
                  ),
                fields=field_mask_pb2.FieldMask( 
                  paths=paths 
                )
              )
            )
    print(f'get_billing 3', flush=True)
    return response

