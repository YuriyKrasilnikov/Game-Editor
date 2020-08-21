/**
 * @fileoverview gRPC-Web generated client stub for api.demo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.api = {};
proto.api.demo = require('./api_demo_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.demo.GreeterClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.demo.GreeterPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options['format'] = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname;

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.demo.HelloRequest,
 *   !proto.api.demo.HelloReply>}
 */
const methodDescriptor_Greeter_SayHello = new grpc.web.MethodDescriptor(
  '/api.demo.Greeter/SayHello',
  grpc.web.MethodType.UNARY,
  proto.api.demo.HelloRequest,
  proto.api.demo.HelloReply,
  /**
   * @param {!proto.api.demo.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.HelloReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.demo.HelloRequest,
 *   !proto.api.demo.HelloReply>}
 */
const methodInfo_Greeter_SayHello = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.demo.HelloReply,
  /**
   * @param {!proto.api.demo.HelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.HelloReply.deserializeBinary
);


/**
 * @param {!proto.api.demo.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.demo.HelloReply)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.demo.HelloReply>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.demo.GreeterClient.prototype.sayHello =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.demo.Greeter/SayHello',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHello,
      callback);
};


/**
 * @param {!proto.api.demo.HelloRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.demo.HelloReply>}
 *     A native promise that resolves to the response
 */
proto.api.demo.GreeterPromiseClient.prototype.sayHello =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.demo.Greeter/SayHello',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayHello);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.demo.RepeatHelloRequest,
 *   !proto.api.demo.HelloReply>}
 */
const methodDescriptor_Greeter_SayRepeatHello = new grpc.web.MethodDescriptor(
  '/api.demo.Greeter/SayRepeatHello',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.api.demo.RepeatHelloRequest,
  proto.api.demo.HelloReply,
  /**
   * @param {!proto.api.demo.RepeatHelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.HelloReply.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.demo.RepeatHelloRequest,
 *   !proto.api.demo.HelloReply>}
 */
const methodInfo_Greeter_SayRepeatHello = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.demo.HelloReply,
  /**
   * @param {!proto.api.demo.RepeatHelloRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.HelloReply.deserializeBinary
);


/**
 * @param {!proto.api.demo.RepeatHelloRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.demo.HelloReply>}
 *     The XHR Node Readable Stream
 */
proto.api.demo.GreeterClient.prototype.sayRepeatHello =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.demo.Greeter/SayRepeatHello',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayRepeatHello);
};


/**
 * @param {!proto.api.demo.RepeatHelloRequest} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.demo.HelloReply>}
 *     The XHR Node Readable Stream
 */
proto.api.demo.GreeterPromiseClient.prototype.sayRepeatHello =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.demo.Greeter/SayRepeatHello',
      request,
      metadata || {},
      methodDescriptor_Greeter_SayRepeatHello);
};


module.exports = proto.api.demo;

