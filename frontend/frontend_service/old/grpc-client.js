import * as grpcWeb from 'grpc-web';
import { FieldMask } from 'google-protobuf/google/protobuf/field_mask_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

import {
  ProfileClient,
  ProfileData,
  ProfileRequest,
  UpdateProfileRequest,

  RecordClient,
  RecordData,
  EditRecordRequest,

  Filter,
  Ordering,
  RecordsPaginationRequest,
  
} from '../proto/web_client_grpc_web_pb';

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

const GetProfile = ( {data, result=null, error=null, paths=[], metadata={}} ) => {

  const profile = new ProfileData()
  Object.entries(data).forEach( ([key, value]) => {
    profile["set"+key.capitalize()](value)
  })

  const fields = new FieldMask();
  fields.setPathsList(paths);

  const request = new ProfileRequest();
  request.setProfile(profile);
  request.setFields(fields);

  const call = ProfileService.get(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for GetProfile: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error(err.message)
        }
        if (result){
          result()
        }
      } else {
        console.log("GetProfile not error... Get response");
        console.log("GetProfile", response.toObject().profilesList );
        if (error){
          error()
        }
        if (result){
          result(
            response.toObject().profilesList
          )
        }
      }
  });
}

const InsertProfile = ( {data, result=null, error=null, paths=[], metadata={}} ) => {

  const profile = new ProfileData();

  Object.entries(data).forEach( ([key, value]) => {
    profile["set"+key.capitalize()](value)
  })

  const fields = new FieldMask();
  fields.setPathsList(paths);

  const request = new ProfileRequest();
  request.setProfile(profile);
  request.setFields(fields);

  const call = ProfileService.insert(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for Insert: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error(err.message)
        }
        if (result){
          result()
        }
      } else {
        console.log("Insert not error... Get response");
        console.log("Insert", response.toObject() );
        if (error){
          error()
        }
        if (result){
          result(
            response.toObject().profilesList
          )
        }
      }
  });
}

const UpdateProfile = ( {data, result=null, error=null, paths=[], metadata={}} ) => {

  const profile = new ProfileData();

  Object.entries(data).forEach( ([key, value]) => {
    profile["set"+key.capitalize()](value)
  })

  const fields = new FieldMask();
  fields.setPathsList(paths);

  const modified = new FieldMask();
  modified.setPathsList( Object.keys(data) );

  const request = new UpdateProfileRequest();
  request.setProfile(profile);
  request.setModified(modified);
  request.setFields(fields);

  const call = ProfileService.update(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for Update: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error(err.message)
        }
        if (result){
          result()
        }
      } else {
        console.log("Update not error... Get response");
        console.log("Update", response.toObject() );
        if (error){
          error()
        }
        if (result){
          result(
            response.toObject().profilesList
          )
        }
      }
  });
}

const RemoveProfile = ( {data, result=null, error=null, metadata={}} ) => {
  
  const profile = new ProfileData();
  Object.entries(data).forEach( ([key, value]) => {
    profile["set"+key.capitalize()](value)
  })

  const request = new ProfileRequest();
  request.setProfile(profile);

  const call = ProfileService.remove(
    request, metadata,
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for Remove: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error(err.message)
        }
        if (result){
          result()
        }
      } else {
        console.log("Remove not error... Get response");
        console.log("Remove", response.toObject() );
        if (error){
          error()
        }
        if (result){
          result(
            response.toObject().profilesList
          )
        }
      }
  });
}

const RegistrationProfile = ( {data, error=null, metadata={}} ) => {

  const profile = new ProfileData();
  Object.entries(data).forEach( ([key, value]) => {
    profile["set"+key.capitalize()](value)
  })

  const request = new ProfileRequest();
  request.setProfile(profile);

  const call = ProfileService.registration(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for Registration: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error(err.message)
        }
      } else {
        console.log("Registration not error... Get response");
        console.log("Registration", response.toObject() );
        if (error){
          error()
        }
      }
  });
}

const InsertRecord = ( {record, result=null, error=null, paths=[], metadata={}} ) => {

  const recordData = new RecordData();
  recordData.setRecord(record);

  const request = new EditRecordRequest();
  request.setRecord(recordData);

  const call = RecordService.insert(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for Insert Record: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error(err.message)
        }
      } else {
        console.log("Insert Record not error... Get response");
        console.log("Insert Record", response.toObject() );
        if (error){
          error()
        }
      }
  });
}

const GetRecord = ( {filters, orders, cursor, limit=10, result=null, error=null, metadata={}} ) => {

  //filters [{key, operand, values=[]}]
  const gFilters = filters.map( filter => {
      let f = new Filter();
      f.setKey( filter['key'] );
      f.setOperand( filter['operand'] );
      f.setValuesList( filter['values'] );
      return f
    }
  )

  //orders [{key, direction}]
  const gOrders = orders.map( order => {
      let o = new Ordering();
      o.setKey(order['key']);
      o.setDirection(order['direction']);
      return o
    }
  )

  const request = new RecordsPaginationRequest();
  request.setCursor(cursor); //string cursor
  request.setFiltersList(gFilters); //repeated Filter filters
  request.setOrdersList(gOrders); //repeated Ordering orders
  request.setLimit(limit); //int32 limit

  const call = RecordService.get(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for GetRecord: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error(err.message)
        }
      } else {
        console.log("GetRecord not error... Get response");
        console.log("GetRecord", response.toObject() );
        if (error){
          error()
        }
      }
  });
}

export { 
  IdentificationProfile,
  GetProfile,
  InsertProfile,
  UpdateProfile,
  RemoveProfile,
  RegistrationProfile,

  InsertRecord,
  GetRecord
};