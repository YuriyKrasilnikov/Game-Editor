import os
import grpc

import proto.query.profile.query_profile_pb2 as query_profile_pb2
import proto.query.profile.query_profile_pb2_grpc as query_profile_pb2_grpc

from google.protobuf import field_mask_pb2

profile_address=os.environ['profile-address']
profile_port=os.environ['profile-port']

channel_string = f"{profile_address}:{profile_port}"

class ProfileClient:

  def __ProfileData(datas):
    print(f'__ProfileData datas:{datas}', flush=True)
    return [ query_profile_pb2.ProfileData( **data ) for data in datas if data ]
  
  def __init__(self):
    # instantiate a channel
    self.channel  = grpc.insecure_channel(channel_string)
    # bind the client and the server
    self.stub = query_profile_pb2_grpc.ProfileStub(self.channel)

  def get_profile_by_id(self, id, paths):
    datas=[{'id': id}]
    return self.get_profile( datas=datas, paths=paths )

  def get_profile(self, datas, paths):
    #print(f'get_profile 1', flush=True)
    profiles = ProfileClient.__ProfileData(datas=datas)

    #print(f'get_profile 2', flush=True)
    response = self.stub.Get(
              query_profile_pb2.ProfilesRequest(
                profilesData=query_profile_pb2.ProfileDataList(
                    profiles=profiles
                  ),
                fields=field_mask_pb2.FieldMask( 
                  paths=paths 
                )
              )
            )
    #print(f'get_profile 3', flush=True)
    return response

