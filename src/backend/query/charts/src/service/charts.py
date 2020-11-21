import uuid

import proto.query.charts.query_charts_pb2 as query_charts_pb2
import proto.query.charts.query_charts_pb2_grpc as query_charts_pb2_grpc

from google.protobuf import field_mask_pb2

from google.protobuf.json_format import MessageToDict, ParseDict

from database.sessions import db

collections = {
  'charts': db['charts'],
  'nodes': db['nodes'],
  'edges': db['edges']
}

class ChartsService(query_charts_pb2_grpc.ChartsServicer):

    def _chartsResponse(charts, paths):
      #print(f'start _chartsResponse', flush=True)
      response = query_charts_pb2.ChartDataList()
      for chart in charts:
        chart = ChartsService._fields_mask(
          cls=query_charts_pb2.ChartData,
          data=chart,
          paths=paths
        )
        response.charts.append( chart )

      print(f'response {response}', flush=True)

      return response

    def _fields_mask(cls, data, paths):
      #print(f'start _fields_mask', flush=True)
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

    def _idMongoToGRPC(datas):
      #print(f'start _idMongoToGRPC', flush=True)
      result=[]
      for data in datas:
        data['id'] = str( data.pop('_id') )
        result.append(data)

      #print(f'end _idMongoToGRPC: {result} ', flush=True)
      return result


    #--- rpc Get ( ChartsRequest ) returns ( ChartDataList );
    def Get(self, request, context):
      print(f'--- start Get', flush=True)
      print(f'Get charts: {request.chartsData}', flush=True)
      print(f'Get fields: {request.fields} ', flush=True)

      paths=request.fields.paths
   
      request_dict = MessageToDict( request.chartsData )

      profile = collections['charts'].find_one( request_dict['charts'][0] )

      print(f'Get response profile: {profile} ', flush=True)

      response = ChartsService._chartsResponse( 
        charts= ChartsService._idMongoToGRPC( [ profile ] ), paths=paths
      )
      
      print(f'--- end Get', flush=True)
      return response

    def GetChartData(self, request, context):
      print(f'--- start GetChartData', flush=True)
      print(f'GetChartData profileid: {request.profileid}', flush=True)
   
      profileid = MessageToDict( request )['profileid']

      #print(f'profileid: { profileid }', flush=True)

      #profile = collections['charts'].find_one( request_dict['charts'][0] )

      chartsid = collections['charts'].find_one( { 'profileid': profileid } )['_id']

      print(f'chartsid: { chartsid }', flush=True)

      nodes = collections['nodes'].find( filter={'boardsid': chartsid}, projection={'boardsid': False} )
      edges = collections['edges'].find( filter={'boardsid': chartsid}, projection={'boardsid': False} )


      response_dict = {
        'nodesData':{
          'nodes':[
            {'id': node.pop('_id'), **node} for node in nodes 
          ]
        },
        'edgesData':{
          'edges':[
            {'id': edge.pop('_id'), **edge} for edge in edges 
          ]
        }
      }

      print(f'response_dict: { response_dict }', flush=True)

      response = query_charts_pb2.ChartDataResponse()

      ParseDict(
        response_dict, 
        response
      )

      print(f'--- end GetChartData', flush=True)
      return response
      
      