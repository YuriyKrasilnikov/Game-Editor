import uuid

from database.sessions import db_session
from database.model import Users

import proto.query.profile.query_profile_pb2 as query_profile_pb2
import proto.query.profile.query_profile_pb2_grpc as query_profile_pb2_grpc

from google.protobuf import field_mask_pb2

from google.protobuf.json_format import MessageToDict

class ProfileService(query_profile_pb2_grpc.ProfileServicer):

    def _profilesResponse(users, paths):

      response = query_profile_pb2.ProfileDataList()

      for user in users:
        profile = ProfileService._fields_mask(
          cls=query_profile_pb2.ProfileData,
          data=user.to_dict(),
          paths=paths
        )
        response.profiles.append( profile )

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

    def _profiles2filter(cls, datas):

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
      print(f'Get profiles: {request.profilesData}', flush=True)
      print(f'Get fields: {request.fields} ', flush=True)
    
      paths=request.fields.paths

      if request.profilesData.profiles:
        print(f'1', flush=True)
        request_dict = MessageToDict(request.profilesData)
        print(f'2', flush=True)
        query_filter = ProfileService._profiles2filter( cls=Users, datas=request_dict['profiles'] )
      else:
        query_filter=[]

      print(f'Get query_filter: {query_filter} ', flush=True)
      with db_session() as session:
        users = session.query(Users).filter( *query_filter ).all()

      response = ProfileService._profilesResponse( users=users, paths=paths )
      print(f'--- end Get', flush=True)
      return response
      