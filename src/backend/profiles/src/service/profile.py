import uuid

from database.sessions import db_session
from database.model import Users

import proto.profile.profile_pb2 as profile_pb2
import proto.profile.profile_pb2_grpc as profile_pb2_grpc

from google.protobuf import field_mask_pb2

from google.protobuf.json_format import MessageToDict

class ProfileService(profile_pb2_grpc.ProfileServicer):

    def _profilesResponse(users, paths):

      response = profile_pb2.ProfileDataList()

      for user in users:
        profile = ProfileService._fields_mask(
          cls=profile_pb2.ProfileData,
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
      print(f'Get profiles: {request.profileList}', flush=True)
      print(f'Get fields: {request.fields} ', flush=True)
    
      paths=request.fields.paths

      if request.profileList.profiles:
        print(f'1', flush=True)
        request_dict = MessageToDict(request.profileList)
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
      

    #---
    #rpc GetFiltered (ProfilesFilterRequest) returns (ProfileDataList);

    #---
    def Insert(self, request, context):
      print(f'--- start Insert', flush=True)
      print(f'Insert profiles: {request.profileList}', flush=True)
      print(f'Insert fields: {request.fields} ', flush=True)

      request_dict = MessageToDict(request.profileList)
      paths=request.fields.paths

      users = []

      with db_session() as session:
        for profile in request_dict['profiles']:
          user = Users( **profile )
          session.add( user )
          session.commit()
          session.refresh( user )
          users.append( user )
        
      print(f'insert done', flush=True)
      response = ProfileService._profilesResponse( users=users, paths=paths )
      print(f'--- end Insert', flush=True)
      return response

    #---
    #rpc Update (ProfilesRequest) returns (ProfileDataList);
    def Update(self, request, context):
      print(f'--- start Update', flush=True)
      print(f'Update profiles: {request.profileList}', flush=True)
      print(f'Update fields: {request.fields} ', flush=True)

      request_dict = MessageToDict(request.profileList)
      paths=request.fields.paths

      users = []

      with db_session() as session:
        for profile in request_dict['profiles']:
          uuid_id = uuid.UUID(profile['id'])
          updatable_cell = {}
          for key in paths:
            updatable_cell[key] = profile.get( key )
          session.query( Users ).filter_by( id=uuid_id ).update( updatable_cell, synchronize_session='fetch')
          session.commit()
          user = session.query( Users ).filter_by( id=uuid_id ).first()
          users.append( user )

      print(f'insert Update', flush=True)
      response = ProfileService._profilesResponse( users=users, paths=paths )
      print(f'--- end Update', flush=True)
      return response

    #---
    def Remove(self, request, context):
      print(f'--- start Remove', flush=True)

      print(f'Remove profiles: {request.profileList}', flush=True)
      print(f'Remove fields: {request.fields} ', flush=True)

      request_dict = MessageToDict(request.profileList)

      query_filter = ProfileService._profiles2filter( cls=Users, datas=request_dict['profiles'] )

      print(f'Remove query_filter: {query_filter} ', flush=True)

      with db_session() as session:
        session.query( Users ).filter( *query_filter ).delete( synchronize_session='fetch' )
        session.commit()
      
      print(f'--- end Remove', flush=True)
      return profile_pb2.StatusResponse(message="Profile deleted")