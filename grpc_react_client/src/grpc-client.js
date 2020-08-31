import * as grpcWeb from 'grpc-web';

import {
  HelloRequest,
  RepeatHelloRequest
} from './proto/api_demo_pb';
import {
  GreeterClient,
  CustomerServiceClient,
  Empty,
  Customer
} from './proto/api_demo_grpc_web_pb';

const greeterClient = new GreeterClient(
                          'http://' + window.location.hostname + ':8000/api/v1',
                          null, null);

const customerCRUDClient = new CustomerServiceClient(
                            'http://' + window.location.hostname + ':8000/api/v1',
                            null, null);

const helloRequest = () => {

  // simple unary call
  const requestHello = new HelloRequest(
    ["world"]
  );

  console.log('helloRequest...'); 

  //requestHello.setName('world');

  const call = greeterClient.sayHello(
    requestHello, {}, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for sayHello: code = ${err.code}` +
                `, message = "${err.message}"`);
      } else {
        console.log("helloRequest not error... Get response");
        console.log(response.toObject());
      }
  });
  /*
  call.on('status', (status) => {
    console.log(status.code);
    console.log(status.details);
    console.log(status.metadata);
  });
  */
}


const helloStream = () => {

  // server streaming call
  const streamRequest = new RepeatHelloRequest();
  streamRequest.setName('World');
  streamRequest.setCount(10);
  
  console.log('helloStream...'); 

  const stream = greeterClient.sayRepeatHello(streamRequest, {});

  stream.on('data', (response) => {
    console.log(response.toObject());
  });

  stream.on('error', (err) => {
    console.log(`Unexpected helloStream stream error: code = ${err.code}` +
            `, message = "${err.message}"`);
  });
  
}

// simple unary call
const getAll = ( { result } ) => {

  const call = customerCRUDClient.getAll(
    new Empty(), {}, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for getAll: code = ${err.code}, message = "${err.message}"`);
      } else {
        console.log("getAll not error... Get response");
        //console.log( response.toObject() );
        result( response.toObject() );
      }
  });

  /*
  call.on('status', (status) => {
    console.log(status.code);
    console.log(status.details);
    console.log(status.metadata);
  });
  */

}

const insert = ( {name, age, address} ) => {

  const customerInfo = new Customer.Info;
  customerInfo.setName(name);
  customerInfo.setAge(age);
  customerInfo.setAddress(address);

  const call = customerCRUDClient.insert(
    customerInfo, {}, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for getAll: code = ${err.code}, message = "${err.message}"`);
      } else {
        console.log("getAll not error... Get response");
        console.log("insert",response.toObject());
      }
  });
  /*
  call.on('status', (status) => {
    console.log(status.code);
    console.log(status.details);
    console.log(status.metadata);
  });
  */

}




export { helloRequest, helloStream, getAll, insert};