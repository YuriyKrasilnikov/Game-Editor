import grpc

import proto.query.web_client.query_webclient_pb2 as query_webclient_pb2
import proto.query.web_client.query_webclient_pb2_grpc as query_webclient_pb2_grpc

from google.protobuf import field_mask_pb2
from google.protobuf import json_format

import security.access as access

from service.profile_client import ProfileClient

class ProfileService(query_webclient_pb2_grpc.ProfileServicer):
 
  def _profilesResponse( profiles, paths ):
    
    print(f'Get profiles: {profiles} ', flush=True)

    response = query_webclient_pb2.ProfileDataList()

    for profile in profiles:
      #profile_filtered = { key:value for key, value in profile.items() if key in filters }
      #print(f'Get profile_filtered: {profile} ', flush=True)
      profile = ProfileService._fields_mask(
        cls=query_webclient_pb2.ProfileData,
        data=profile,
        paths=paths
      )
      response.profiles.append( profile )
    
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


  #rpc Get (ProfilesRequest) returns (ProfileDataList);
  def Get(self, request, context):
    print(f'--- start Get', flush=True)
    print(f'Get profile: {request.profilesData} ', flush=True)
    print(f'Get fields: {request.fields} ', flush=True)

    metadata = dict(context.invocation_metadata())
    profilesData = json_format.MessageToDict( request.profilesData )
    query_path = ['createdAt', 'nickname', 'email', 'description']
    paths = request.fields.paths

    print(f'Get ProfileClient request... ', flush=True)
    client = ProfileClient()
    client_response = client.get_profile(
      datas = profilesData['profiles'],
      paths = query_path
    )

    print(f'Get ProfileClient response... ', flush=True)

    response_dict = json_format.MessageToDict( client_response )

    print(f'Get response_dict: {response_dict} ', flush=True)

    if response_dict.get( 'profiles' ):
      response = ProfileService._profilesResponse( response_dict['profiles'], paths=paths)
    else:
      context.set_code(grpc.StatusCode.NOT_FOUND)
      context.set_details(f'Requested profiles not found')
      response = query_webclient_pb2.ProfileDataList()
    print(f'--- end Get', flush=True)
    return response

  #rpc Get (ProfileRequest) returns (ProfileResponse);
  def Identification(self, request, context):
    print(f'--- start Identification', flush=True)

    metadata = dict(context.invocation_metadata())
    nickname = metadata.get('x-user-authorization-nickname')

    if nickname:
      response = query_webclient_pb2.ProfileData(
        nickname = nickname
      )
    else:
      response = query_webclient_pb2.ProfileData()

    print(f'--- end Identification', flush=True)
    return response