import * as grpcWeb from 'grpc-web';
import { FieldMask } from 'google-protobuf/google/protobuf/field_mask_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

import {
  ProfileClient, 
  ProfileData,
} from '../../proto/command_webclient_grpc_web_pb';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const ProfileService = new ProfileClient(
                          'https://' + window.location.hostname + ':443',
                          null, null);              

const CreateProfile = ( {data, result, callback=null, paths=[], metadata={}}  ) => {

  const request = new ProfileData();
  Object.entries(data).forEach( ([key, value]) => {
    request["set"+key.capitalize()](value)
  })

  const stream = ProfileService.insert( request, metadata )

  stream.on('data', (response) => {
    console.log("CreateProfile", response.toObject() );
    result({
      msg: response.getMessage(),
      type: 'Message'
    })
  });

  stream.on('error', (err) => {
    console.log(`Unexpected error for CreateProfile: code = ${err.code}, message = "${err.message}"`);
    result({
      msg: err.message,
      type: 'ErrorMessage'
    })
    stream.cancel();
  });

  stream.on('end', () => {
    console.log("CreateProfile end");
    if(callback){
      callback()
    }
    stream.cancel();
  });

}

const UpdateProfile = ( {data, result, callback=null, paths=[], metadata={}}  ) => {

  const request = new ProfileData();
  Object.entries(data).forEach( ([key, value]) => {
    request["set"+key.capitalize()](value)
  })

  const stream = ProfileService.update( request, metadata )

  stream.on('data', (response) => {
    console.log("UpdateProfile", response.toObject() );
    result({
      msg: response.getMessage(),
      type: 'Message'
    })
  });

  stream.on('error', (err) => {
    console.log(`Unexpected error for UpdateProfile: code = ${err.code}, message = "${err.message}"`);
    result({
      msg: err.message,
      type: 'ErrorMessage'
    })
    stream.cancel();
  });

  stream.on('end', () => {
    console.log("UpdateProfile end");
    if(callback){
      callback()
    }
    stream.cancel();
  });

}

const RemoveProfile = ( {data, result, callback=null, paths=[], metadata={}}  ) => {

  const request = new ProfileData();
  Object.entries(data).forEach( ([key, value]) => {
    request["set"+key.capitalize()](value)
  })

  const stream = ProfileService.remove( request, metadata )

  stream.on('data', (response) => {
    console.log("RemoveProfile", response.toObject() );
    result({
      msg: response.getMessage(),
      type: 'Message'
    })
  });

  stream.on('error', (err) => {
    console.log(`Unexpected error for RemoveProfile: code = ${err.code}, message = "${err.message}"`);
    result({
      msg: err.message,
      type: 'ErrorMessage'
    })
    stream.cancel();
  });

  stream.on('end', () => {
    console.log("RemoveProfile end");
    if(callback){
      callback()
    }
    stream.cancel();
  });

}

export { 
  CreateProfile,
  UpdateProfile,
  RemoveProfile
};