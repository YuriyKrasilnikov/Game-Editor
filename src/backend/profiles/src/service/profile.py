from database.sessions import db_session
from database.model import Users

import proto.profile.profile_pb2 as profile_pb2
import proto.profile.profile_pb2_grpc as profile_pb2_grpc

from google.protobuf import field_mask_pb2
from google.protobuf import json_format

class ProfileService(profile_pb2_grpc.ProfileServicer):

    #---
    # rpc Get (ProfileRequest) returns (ProfileResponse);
    def Get(self, request, context):

      print(f'Get nickname {request.nickname}', flush=True)
      print(f'Get fields: {request.fields} ', flush=True)

      nickname = request.nickname

      with db_session() as session:
        user = session.query(Users).filter_by(nickname=nickname).first()

      response = profile_pb2.ProfileResponse(
        profile=profile_pb2.ProfileData(
          **{
            "id": str(user.id),
            "createdAt": str(user.createdAt),
            "nickname": str(user.nickname),
            'email': str(user.email)
          }
        )
      )

      return response

    # rpc Insert (UpdateProfileRequest) returns (ProfileResponse);
    def Insert(self, request, context):

      print(f'Insert nickname: {request.profile.nickname} ', flush=True)
      print(f'Insert email: {request.profile.email} ', flush=True)

      nickname = request.profile.nickname
      email = request.profile.email

      with db_session() as session:
        if not session.query(Users).filter_by(nickname=nickname).first():
            session.add(
                Users(
                    email=email,
                    nickname=nickname
                )
            )
            session.commit()
        user = session.query(Users).filter_by(nickname=nickname).first()

      response = profile_pb2.ProfileResponse(
        profile=profile_pb2.ProfileData(
          **{
            "id": str(user.id),
            "createdAt": str(user.createdAt),
            "nickname": str(user.nickname),
            'email': str(user.email)
          }
        )
      )

      return response
    # rpc Update (UpdateProfileRequest) returns (ProfileResponse);
    # rpc Remove (ProfileRequest) returns (Empty);
    def Remove(self, request, context):

      print(f'Remove nickname: {request.nickname} ', flush=True)

      nickname = request.nickname

      with db_session() as session:
        session.query( Users ).filter_by( nickname=nickname ).delete()
        session.commit()

      response = profile_pb2.Empty()

      return response