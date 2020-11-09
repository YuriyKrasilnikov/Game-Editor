import * as grpcWeb from 'grpc-web';
import { FieldMask } from 'google-protobuf/google/protobuf/field_mask_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

import {
  BillingClient, 
  PaidData,
  BuyData,
} from '../../proto/command_webclient_grpc_web_pb';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const BillingService = new BillingClient(
                          'https://' + window.location.hostname + ':443',
                          null, null);          

const Paid = ( {data, result, callback=null, paths=[], metadata={}}  ) => {

  const request = new PaidData();
  Object.entries(data).forEach( ([key, value]) => {
    request["set"+key.capitalize()](value)
  })

  const stream = BillingService.paid( request, metadata )

  stream.on('data', (response) => {
    console.log("Billing CreatePaid", response.toObject() );
    result({
      msg: response.getMessage(),
      type: 'Message'
    })
  });

  stream.on('error', (err) => {
    console.log(`Unexpected error for Billing CreatePaid: code = ${err.code}, message = "${err.message}"`);
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

const Buy = ( {data, result, callback=null, paths=[], metadata={}}  ) => {

  const request = new BuyData();
  Object.entries(data).forEach( ([key, value]) => {
    request["set"+key.capitalize()](value)
  })

  const stream = BillingService.buy( request, metadata )

  stream.on('data', (response) => {
    console.log("Billing CreatePaid", response.toObject() );
    result({
      msg: response.getMessage(),
      type: 'Message'
    })
  });

  stream.on('error', (err) => {
    console.log(`Unexpected error for Billing CreatePaid: code = ${err.code}, message = "${err.message}"`);
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

export { 
  Paid,
  Buy
};