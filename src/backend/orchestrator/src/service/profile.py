import proto.web_client.web_client_pb2 as web_client_pb2
import proto.web_client.web_client_pb2_grpc as web_client_pb2_grpc

from google.protobuf import field_mask_pb2
from google.protobuf import json_format

import security.access as access

import service.profile_client as profile_client


class ProfileService(web_client_pb2_grpc.ProfileServicer):

  # rpc Get (ProfileRequest) returns (ProfileResponse);
  def Get(self, request, context):

    print(f'Get nickname: {request.nickname} ', flush=True)
    print(f'Get fields: {request.fields} ', flush=True)

    nickname = request.nickname
    fields = request.fields

    authorization, access_key = access.get_access(
      data=dict(context.invocation_metadata()),
      access={'nickname': nickname}
    )

    print(f"Authorization: {authorization}", flush=True)
    print(f"Access: {access_key}", flush=True)

    if not access_key:
      context.set_code(grpc.StatusCode.PERMISSION_DENIED)
      context.set_details("Access denied")
      return None

    client = profile_client.ProfileClient()
    profile_resp = client.get_profile(
      nickname = nickname,
      fields = fields.paths if fields else []
    )

    profile_dict = json_format.MessageToDict(profile_resp)

    response = web_client_pb2.ProfileResponse(
      profile=web_client_pb2.ProfileData(
        **profile_dict['profile']
      )
    )

    return response

  # rpc Insert (UpdateProfileRequest) returns (ProfileResponse);
  def Insert(self, request, context):

    print(f'Insert nickname: {request.profile.nickname} ', flush=True)
    print(f'Insert email: {request.profile.email} ', flush=True)

    authorization, access_key = access.get_access(
      data=dict(context.invocation_metadata()),
      access={'email': request.profile.email}
    )

    print(f"Authorization: {authorization}", flush=True)
    print(f"Access: {access_key}", flush=True)

    if not access_key:
      context.set_code(grpc.StatusCode.PERMISSION_DENIED)
      context.set_details("Access denied")
      return None

    request_dict = json_format.MessageToDict(request.profile)

    client = profile_client.ProfileClient()
    profile_resp = client.insert_profile(
      data = request_dict,
      fields = request.fields.paths if request.fields else []
    )

    profile_dict = json_format.MessageToDict(profile_resp)

    response = web_client_pb2.ProfileResponse(
      profile=web_client_pb2.ProfileData(
        **profile_dict['profile']
      )
    )

    return response
  # rpc Update (UpdateProfileRequest) returns (ProfileResponse);
  # rpc Remove (ProfileRequest) returns (Empty);
  def Remove(self, request, context):

    print(f'Remove nickname: {request.nickname} ', flush=True)
    print(f'Remove fields: {request.fields} ', flush=True)

    nickname = request.nickname
    fields = request.fields

    authorization, access_key = access.get_access(
      data=dict(context.invocation_metadata()),
      access={'nickname': nickname}
    )

    print(f"Authorization: {authorization}", flush=True)
    print(f"Access: {access_key}", flush=True)

    if not access_key:
      context.set_code(grpc.StatusCode.PERMISSION_DENIED)
      context.set_details("Access denied")
      return None

    client = profile_client.ProfileClient()
    profile_resp = client.delete_profile(
      nickname = nickname,
      fields = fields.paths if fields else []
    )

    response = web_client_pb2.Empty()

    return response

    # rpc Insert (UpdateProfileRequest) returns (ProfileResponse);
  def Registration(self, request, context):

    print(f'Registration nickname: {request.nickname} ', flush=True)

    metadata = dict(context.invocation_metadata())

    print(f'Registration email: {metadata["x-user-authorization-email"]} ', flush=True)

    authorization, access_key = access.get_access(
      data=metadata,
      access={}
    )

    print(f"Authorization: {authorization}", flush=True)
    print(f"Access: {access_key}", flush=True)

    if not access_key:
      context.set_code(grpc.StatusCode.PERMISSION_DENIED)
      context.set_details("Access denied")
      return None

    client = profile_client.ProfileClient()
    profile_resp = client.insert_profile(
      data = {
        "nickname": request.nickname,
        "email": metadata["x-user-authorization-email"]
      },
      fields = []
    )

    response = web_client_pb2.Empty()

    return response