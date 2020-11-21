import grpc

import proto.query.web_client.query_webclient_pb2 as query_webclient_pb2
import proto.query.web_client.query_webclient_pb2_grpc as query_webclient_pb2_grpc

from google.protobuf import field_mask_pb2
from google.protobuf import json_format

import security.access as access

from service.charts_client import ChartsClient
from service.profile_client import ProfileClient

class ChartsService(query_webclient_pb2_grpc.ChartsServicer):

  def _ChartsResponse( charts, paths ):
    
    print(f'Get _ChartsResponse: {charts} ', flush=True)

    response = query_webclient_pb2.ChartDataList()

    for chart in charts:
      #print(f'Get charts_filtered: {chart} ', flush=True)
      chart = ChartsService._fields_mask(
        cls=query_webclient_pb2.ChartData,
        data=chart,
        paths=paths
      )
      response.charts.append( chart )
    
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

  def profilesConvert(self, datas, replaced, replaced_to, source, source_to ):
    replacedSet=set()
    for data in datas:
      if data.get(replaced):
        replacedSet.add( data[replaced] )

    replacedDict=[ {source:rep} for rep in replacedSet ]

    profileClient = ProfileClient()
    response = profileClient.get_profile(datas=replacedDict, paths = [source, source_to])
    response_dict = json_format.MessageToDict( response )['profiles']

    sourceToDict = { d.get(source):d.get(source_to) for d in response_dict if d.get(source_to) }

    for i in range( len( datas ) ):
      r = datas[i].pop( replaced, None )
      if r:
        datas[i][ replaced_to ]=sourceToDict[ r ]

    return datas

  #rpc GetChartId ( ChartData ) returns ( ChartData );
  def GetChartId(self, request, context):
    print(f'--- start Chart Get', flush=True)
    print(f'Get chart: { request } ', flush=True)

    metadata = dict(context.invocation_metadata())
    request_charts = self.profilesConvert(
      datas = [ json_format.MessageToDict( request ) ],
      replaced = 'nickname',
      replaced_to = 'profileid',
      source = 'nickname',
      source_to = 'id'
    )
    query_path = ['id', 'profileid']
    request_paths = ['id', 'nickname']


    print(f'Get ChartsClient request... ', flush=True)
    client = ChartsClient()
    client_response = client.get_charts(
      datas = request_charts,
      paths = query_path
    )

    response_dict = json_format.MessageToDict( client_response )

    print(f'Get response_dict: {response_dict} ', flush=True)

    if response_dict.get( 'charts' ):
      response_charts = self.profilesConvert(
        datas = response_dict['charts'],
        replaced = 'profileid',
        replaced_to = 'nickname',
        source = 'id',
        source_to = 'nickname'
      )
      print(f'Get response_charts: {response_charts} ', flush=True)
      #response = ChartsService._ChartsResponse( response_charts, paths=request_paths)
      response = query_webclient_pb2.ChartData(
        **response_charts[0]
      )
    else:
      context.set_code(grpc.StatusCode.NOT_FOUND)
      context.set_details(f'Requested chart not found')
      response = query_webclient_pb2.ChartData()

    print(f'--- end Chart Get', flush=True)
    return response

  #rpc GetChartId ( ChartData ) returns ( ChartData );
  def GetChartData(self, request, context):
    print(f'--- start Get Chart Data', flush=True)

    metadata = dict(context.invocation_metadata())

    client = ChartsClient()
    client_response = client.get_chart_data(
      profileid = metadata['x-user-authorization-id']
    )

    response_dict = json_format.MessageToDict( client_response )

    print(f'--- response_dict {response_dict}', flush=True)

    response = query_webclient_pb2.ChartDataResponse()
    
    json_format.ParseDict(response_dict, response)

    print(f'--- end Get Chart Data', flush=True)
    return response
