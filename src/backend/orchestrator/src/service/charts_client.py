import os
import grpc

import proto.query.charts.query_charts_pb2 as query_charts_pb2
import proto.query.charts.query_charts_pb2_grpc as query_charts_pb2_grpc


from google.protobuf import field_mask_pb2

charts_address=os.environ['charts-address']
charts_port=os.environ['charts-port']

channel_string = f"{charts_address}:{charts_port}"

class ChartsClient:

  def __ChartsData(datas):
    print(f'__ChartsData datas:{datas}', flush=True)
    return [ query_charts_pb2.ChartData( **data ) for data in datas if data ]
  
  def __init__(self):
    # instantiate a channel
    self.channel  = grpc.insecure_channel(channel_string)
    # bind the client and the server
    self.stub = query_charts_pb2_grpc.ChartsStub(self.channel)
  

  def get_charts(self, datas, paths):
    print(f'get_charts 1', flush=True)
    charts = ChartsClient.__ChartsData(datas=datas)

    print(f'get_charts  2', flush=True)
    response = self.stub.Get(
              query_charts_pb2.ChartsRequest(
                chartsData=query_charts_pb2.ChartDataList(
                    charts=charts
                  ),
                fields=field_mask_pb2.FieldMask( 
                  paths=paths 
                )
              )
            )
            
    print(f'get_charts 3', flush=True)
    return response

