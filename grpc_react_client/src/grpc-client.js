import * as grpcWeb from 'grpc-web';
import { FieldMask } from 'google-protobuf/google/protobuf/field_mask_pb';

import {
  HelloRequest,
  RepeatHelloRequest
} from './proto/api_demo_pb';
import {
  GreeterClient,
  CustomerServiceClient,
  Customer,
  Empty,
  CustomerList,
  IdCustomerRequest,
  CustomerResponse,
  UpdateCustomerRequest,
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

  const customer = new Customer();
  customer.setName(name);
  customer.setAge(age);
  customer.setAddress(address);

  const newCustomerRequest = new UpdateCustomerRequest();
  newCustomerRequest.setCustomer(customer);

  const call = customerCRUDClient.insert(
    newCustomerRequest, {}, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for Insert: code = ${err.code}, message = "${err.message}"`);
      } else {
        console.log("Insert not error... Get response");
        console.log("Insert", response.toObject() );
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

const get = ( {id, fields} ) => {

  const mask = new FieldMask();
  mask.setPathsList(fields)
  
  const customer = new IdCustomerRequest();
  customer.setId(id);
  customer.setFields(mask);

  const call = customerCRUDClient.get(
    customer, {}, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for get: code = ${err.code}, message = "${err.message}"`);
      } else {
        console.log("get not error... Get response");
        console.log("get", response.toObject() );
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



export { helloRequest, helloStream, getAll, insert, get};