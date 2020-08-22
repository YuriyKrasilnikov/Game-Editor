import * as grpcWeb from 'grpc-web';

import {HelloRequest, RepeatHelloRequest, HelloReply} from './proto/api_demo_pb';
import {GreeterClient} from './proto/api_demo_grpc_web_pb';

const client = new GreeterClient(
                          'http://' + window.location.hostname + ':8000/api/v1',
                          null, null);

// simple unary call
const request = new HelloRequest();
request.setName('World');

const helloRequest = () => {
  client.sayHello(
    request, {}, 
    (err, response) => {
      if (err) {
        console.log(`Unexpected error for sayHello: code = ${err.code}` +
                `, message = "${err.message}"`);
      } else {
        console.log("Not error... Get response");
        console.log(response.getMessage());
      }
  });
}


// server streaming call
const streamRequest = new RepeatHelloRequest();
streamRequest.setName('World');
streamRequest.setCount(5);

const helloStream = () => {
  
  const stream = client.sayRepeatHello(streamRequest, {});

  stream.on('data', (response) => {
    console.log(response.getMessage());
  });

  stream.on('error', (err) => {
    console.log(`Unexpected stream error: code = ${err.code}` +
            `, message = "${err.message}"`);
  });
  
}

export { client, helloRequest, helloStream };