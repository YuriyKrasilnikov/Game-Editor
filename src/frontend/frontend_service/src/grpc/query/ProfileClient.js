import * as grpcWeb from 'grpc-web';
import { FieldMask } from 'google-protobuf/google/protobuf/field_mask_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

import {
  ProfileClient, 

  ProfileData,
  ProfileDataList,
  ProfilesRequest
} from '../../proto/query_webclient_grpc_web_pb';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const ProfileService = new ProfileClient(
                          'https://' + window.location.hostname + ':443',
                          null, null);              

const IdentificationProfile = ( { result, error=null, metadata={} } ) => {

  const request = new Empty();

  const call = ProfileService.identification(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for IdentificationProfile: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error(err.message)
        }
        result()
      } else {
        console.log("IdentificationProfile not error... Get response");
        console.log("IdentificationProfile", response.toObject() );
        result(
          response.toObject()
        )
      }
  });
}

//rpc Get (ProfilesRequest) returns (ProfileDataList);
const GetProfile = ( {data, result, error=null, paths=[], metadata={}} ) => {

  const profile = new ProfileData()
  Object.entries(data).forEach( ([key, value]) => {
    profile["set"+key.capitalize()](value)
  })

  const fields = new FieldMask();
  fields.setPathsList( paths );

  const profiles = new ProfileDataList()
  profiles.setProfilesList(
    [ profile ]
  )

  const request = new ProfilesRequest();
  request.setProfilesdata( profiles );
  request.setFields( fields );

  const call = ProfileService.get(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for GetProfile: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error({
            msg: err.message,
            type: 'ErrorMessage'
          })
        }
        result()
      } else {
        console.log("GetProfile", response.toObject().profilesList );
        if (error){
          error()
        }
        result(
          response.toObject().profilesList
        )
      }
  });
}

export { 
  GetProfile,
  IdentificationProfile,
};