import os
import grpc

import proto.profile.profile_pb2 as profile_pb2
import proto.profile.profile_pb2_grpc as profile_pb2_grpc

from google.protobuf import field_mask_pb2

profile_address=os.environ['profile-address']
profile_port=os.environ['profile-port']

channel_string = f"{profile_address}:{profile_port}"

class ProfileClient:
  def __init__(self):
    # instantiate a channel
    self.channel  = grpc.insecure_channel(channel_string)

    # bind the client and the server
    self.stub = profile_pb2_grpc.ProfileStub(self.channel)

  def get_profile(self, nickname, fields):
    return self.stub.Get(
              profile_pb2.ProfileRequest(
                nickname=nickname,
                fields=field_mask_pb2.FieldMask( 
                  paths=fields 
                )
              )
            )

  def insert_profile(self, data, fields):
    return self.stub.Insert(
              profile_pb2.UpdateProfileRequest(
                profile=profile_pb2.ProfileData(
                  **data
                ),
                fields=field_mask_pb2.FieldMask( 
                  paths=fields 
                )
              )
            )

  def delete_profile(self, nickname, fields):
    return self.stub.Remove(
              profile_pb2.ProfileRequest(
                nickname=nickname,
                fields=field_mask_pb2.FieldMask( 
                  paths=fields 
                )
              )
            )