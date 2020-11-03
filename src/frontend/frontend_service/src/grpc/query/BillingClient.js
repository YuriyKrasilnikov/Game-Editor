import * as grpcWeb from 'grpc-web';
import { FieldMask } from 'google-protobuf/google/protobuf/field_mask_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

import {
  BillingClient, 

  BillingData,
  BillingDataList,
  BillingsRequest
} from '../../proto/query_webclient_grpc_web_pb';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const BillingService = new BillingClient(
                          'https://' + window.location.hostname + ':443',
                          null, null);

//rpc Get(BillingsRequest) returns (BillingDataList);
const GetBilling = ( {data, result, error=null, paths=[], metadata={}} ) => {

  const billing = new BillingData()
  Object.entries(data).forEach( ([key, value]) => {
    billing["set"+key.capitalize()](value)
  })

  const fields = new FieldMask();
  fields.setPathsList( paths );

  const billings = new BillingDataList()
  billings.setBillingsList(
    [ billing ]
  )

  const request = new BillingsRequest();
  request.setBillingsdata( billings );
  request.setFields( fields );

  const call = BillingService.get(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for GetBilling: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error({
            msg: err.message,
            type: 'ErrorMessage'
          })
        }
        result()
      } else {
        console.log("GetBilling", response.toObject().billingsList );
        if (error){
          error()
        }
        result(
          response.toObject().billingsList
        )
      }
  });
}

export { 
  GetBilling
};