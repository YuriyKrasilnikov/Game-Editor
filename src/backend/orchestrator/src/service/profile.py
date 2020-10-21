import grpc

import proto.web_client.web_client_pb2 as web_client_pb2
import proto.web_client.web_client_pb2_grpc as web_client_pb2_grpc

from google.protobuf import field_mask_pb2
from google.protobuf import json_format

import security.access as access

import service.profile_client as profile_client


class ProfileService(web_client_pb2_grpc.ProfileServicer):

  def _profilesResponse( profiles, paths ):
    
    print(f'Get profiles: {profiles} ', flush=True)

    response = web_client_pb2.ProfileDataList()

    for profile in profiles:
      #profile_filtered = { key:value for key, value in profile.items() if key in filters }
      #print(f'Get profile_filtered: {profile} ', flush=True)
      profile = ProfileService._fields_mask(
        cls=web_client_pb2.ProfileData,
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


  #rpc Get (ProfileRequest) returns (ProfileResponse);
  def Get(self, request, context):
    print(f'--- start Get', flush=True)
    print(f'Get profile: {request.profile} ', flush=True)
    print(f'Get fields: {request.fields} ', flush=True)

    metadata = dict(context.invocation_metadata())
    request_dict = json_format.MessageToDict( request )
    query_path = ['createdAt', 'nickname', 'email', 'description']
    paths = request.fields.paths
    access_key = False

    print(f"Get request_dict[profile]: {request_dict['profile']}", flush=True)

    nickname = request_dict['profile'].get('nickname')

    authorization, access_key = access.get_access(
      data=dict(context.invocation_metadata()),
      access={'nickname': nickname}
    )

    if not access_key:
      context.set_code(grpc.StatusCode.PERMISSION_DENIED)
      context.set_details("Get access denied")
      return None

    client = profile_client.ProfileClient()
    client_responce = client.get_profile(
      datas = [ request_dict['profile'] ],
      paths = query_path
    )

    responce_dict = json_format.MessageToDict( client_responce )

    print(f'Get responce_dict: {responce_dict} ', flush=True)

    responce = ProfileService._profilesResponse( responce_dict['profiles'], paths=paths)
    print(f'--- end Get', flush=True)
    return responce

  #rpc Insert (UpdateProfileRequest) returns (ProfileResponse);
  def Insert(self, request, context):
    print(f'--- start Insert', flush=True)
    print(f'Insert profile: {request.profile} ', flush=True)
    print(f'Insert fields: {request.fields} ', flush=True)

    query_path = ['createdAt', 'nickname', 'email', 'description']
    paths = request.fields.paths

    authorization, access_key = access.get_access(
      data=dict(context.invocation_metadata()),
      access={'email': request.profile.email}
    )

    if not access_key:
      context.set_code(grpc.StatusCode.PERMISSION_DENIED)
      context.set_details("Insert access denied")
      return None

    request_dict = json_format.MessageToDict(request.profile)

    client = profile_client.ProfileClient()
    client_responce = client.insert_profile(
      datas = [ request_dict ],
      paths = query_path
    )

    responce_dict = json_format.MessageToDict( client_responce )
    responce = ProfileService._profilesResponse( responce_dict['profiles'], paths=paths)
    print(f'--- end Insert', flush=True)
    return responce

  # rpc Update (ProfileRequest) returns (ProfileDataList);
  def Update(self, request, context):
    print(f'--- start Update', flush=True)
    print(f'Update profile: {request.profile} ', flush=True)
    print(f'Update fields: {request.fields} ', flush=True)
    print(f'Update modified: {request.modified} ', flush=True)

    metadata = dict(context.invocation_metadata())
    user_id=metadata["x-user-authorization-id"]

    query_modified = request.modified.paths
    paths = request.fields.paths

    authorization, access_key = access.get_access(
      data=metadata,
      access={'registered': 'true'}
    )

    if not access_key:
      context.set_code(grpc.StatusCode.PERMISSION_DENIED)
      context.set_details("Insert access denied")
      return None
    
    request_dict = json_format.MessageToDict(request.profile)
    request_dict["id"] = user_id

    client = profile_client.ProfileClient()
    client_responce = client.update_profile(
      datas = [ request_dict ],
      paths = query_modified
    )

    responce_dict = json_format.MessageToDict( client_responce )
    responce = ProfileService._profilesResponse( responce_dict['profiles'], paths=paths)
    print(f'--- end Update', flush=True)
    return responce


  # rpc Remove (ProfileRequest) returns (Empty);
  def Remove(self, request, context):
    print(f'--- start Remove', flush=True)
    print(f'Remove profile: {request.profile} ', flush=True)

    profile = request.profile
    nickname = profile.nickname

    authorization, access_key = access.get_access(
      data=dict(context.invocation_metadata()),
      access={'nickname': nickname}
    )

    if not access_key:
      context.set_code(grpc.StatusCode.PERMISSION_DENIED)
      context.set_details("Access denied")
      return None

    client = profile_client.ProfileClient()
    client_responce = client.delete_profile(
      datas = [{
        'nickname': nickname
      }],
      paths = []
    )

    response = web_client_pb2.StatusResponse(
      message=client_responce.message
    )
    print(f'--- end Remove', flush=True)
    return response

  # rpc Insert (UpdateProfileRequest) returns (ProfileResponse);
  def Registration(self, request, context):
    print(f'--- start Registration', flush=True)
    print(f'Registration profile: {request.profile} ', flush=True)

    query_path = ['nickname', 'email']

    metadata = dict(context.invocation_metadata())
    email=metadata["x-user-authorization-email"]

    print(f'Registration email: {email} ', flush=True)

    authorization, access_key = access.get_access(
      data=metadata,
      access={}
    )

    if not authorization:
      context.set_code(grpc.StatusCode.PERMISSION_DENIED)
      context.set_details("Registration access denied")
      return None

    request_dict = json_format.MessageToDict(request.profile)

    request_dict["email"] = email

    client = profile_client.ProfileClient()
    client_responce = client.insert_profile(
      datas = [ request_dict ],
      paths = query_path
    )

    response = web_client_pb2.StatusResponse(
      message=f"Registration {client_responce.profiles[0].email} successful"
    )

    print(f'--- end Registration', flush=True)
    return response

  #rpc Get (ProfileRequest) returns (ProfileResponse);
  def Identification(self, request, context):
    print(f'--- start Identification', flush=True)
    metadata = dict(context.invocation_metadata())
    query_path = [ 'nickname', 'email' ]
    fields = [ 'nickname' ]

    access_key = False

    if metadata["x-user-authorization-nickname"]:
      nickname = metadata["x-user-authorization-nickname"]
      access_key = True

    if not access_key:
      context.set_code(grpc.StatusCode.PERMISSION_DENIED)
      context.set_details("Identification access denied")
      return None

    client = profile_client.ProfileClient()
    client_responce = client.get_profile(
      datas = [{
        'nickname': nickname
      }],
      paths = query_path
    )

    responce_dict = json_format.MessageToDict( client_responce )

    response = ProfileService._fields_mask(
      cls=web_client_pb2.ProfileData,
      data=responce_dict['profiles'][0],
      paths=fields
    )
    print(f'--- end Identification', flush=True)
    return response