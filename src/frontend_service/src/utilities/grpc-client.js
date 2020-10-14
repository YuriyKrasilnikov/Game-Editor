import * as grpcWeb from 'grpc-web';
import { FieldMask } from 'google-protobuf/google/protobuf/field_mask_pb';

import {
  ProfileClient,
  ProfileData,
  ProfileRequest,
  UpdateProfileRequest,
  RegistrationRequest
} from '../proto/web_client_grpc_web_pb';

const ProfileService = new ProfileClient(
                          'https://' + window.location.hostname + ':443/api/v1',
                          null, null);

const GetProfile = ( {nickname, fields, result, metadata={}} ) => {

  const mask = new FieldMask();
  mask.setPathsList(fields)
  
  const request = new ProfileRequest();
  request.setNickname(nickname);
  request.setFields(mask);

  const call = ProfileService.get(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for GetProfile: code = ${err.code}, message = "${err.message}"`);
        result()
      } else {
        console.log("GetProfile not error... Get response");
        console.log("GetProfile", response.toObject() );
        result(
          response.toObject().profile
        )
      }
  });
}

const InsertProfile = ( {nickname, email, fields, result, metadata={}} ) => {

  const profile = new ProfileData();
  profile.setNickname(nickname);
  profile.setEmail(email);

  const request = new UpdateProfileRequest();
  request.setProfile(profile);

  const call = ProfileService.insert(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for Insert: code = ${err.code}, message = "${err.message}"`);
      } else {
        console.log("Insert not error... Get response");
        console.log("Insert", response.toObject() );
      }
  });
}

const UpdateProfile = ( {nickname, email, fields, result, metadata={}} ) => {

  const profile = new ProfileData();
  profile.setNickname(nickname);
  profile.setEmail(email);

  const request = new UpdateProfileRequest();
  request.profile(profile);

  const call = ProfileService.update(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for Update: code = ${err.code}, message = "${err.message}"`);
      } else {
        console.log("Update not error... Get response");
        console.log("Update", response.toObject() );
      }
  });
}

const RemoveProfile = ( {nickname, fields, result, metadata={}} ) => {

  const mask = new FieldMask();
  mask.setPathsList(fields)
  
  const request = new ProfileRequest();
  request.setNickname(nickname);
  request.setFields(mask);

  const call = ProfileService.remove(
    request, metadata,
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for Remove: code = ${err.code}, message = "${err.message}"`);
      } else {
        console.log("Remove not error... Get response");
        console.log("Remove", response.toObject() );
      }
  });
}

const RegistrationProfile = ( {nickname, metadata={}} ) => {

  const request = new RegistrationRequest();
  request.setNickname(nickname);

  const call = ProfileService.registration(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for Registration: code = ${err.code}, message = "${err.message}"`);
      } else {
        console.log("Registration not error... Get response");
        console.log("Registration", response.toObject() );
      }
  });
}

export { GetProfile, InsertProfile, UpdateProfile,  RemoveProfile, RegistrationProfile };