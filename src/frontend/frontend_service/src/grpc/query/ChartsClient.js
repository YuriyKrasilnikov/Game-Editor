import * as grpcWeb from 'grpc-web';
import { FieldMask } from 'google-protobuf/google/protobuf/field_mask_pb';
import { Empty } from 'google-protobuf/google/protobuf/empty_pb';

import {
  ChartsClient, 

  ChartData,
} from '../../proto/query_webclient_grpc_web_pb';

String.prototype.capitalize = function() {
  return this.charAt(0).toUpperCase() + this.slice(1);
}

const ChartsService = new ChartsClient(
                          'https://' + window.location.hostname + ':443',
                          null, null);              

//rpc GetChartId ( ChartData ) returns ( ChartData );
const GetChartId = ( {data, result, error=null, paths=[], metadata={}} ) => {

  const request = new ChartData()
  Object.entries(data).forEach( ([key, value]) => {
    request["set"+key.capitalize()](value)
  })

  const call = ChartsService.getChartId(
    request, metadata, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for GetChartId: code = ${err.code}, message = "${err.message}"`);
        if (error){
          error({
            msg: err.message,
            type: 'ErrorMessage'
          })
        }
        result()
      } else {
        console.log("GetChartId", response.toObject() );
        if (error){
          error()
        }
        result(
          response.toObject()
        )
      }
  });
}

export { 
  GetChartId,
};