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


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.demo.CustomerServiceClient =
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
proto.api.demo.CustomerServicePromiseClient =
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
 *   !proto.api.demo.Empty,
 *   !proto.api.demo.CustomerList>}
 */
const methodDescriptor_CustomerService_GetAll = new grpc.web.MethodDescriptor(
  '/api.demo.CustomerService/GetAll',
  grpc.web.MethodType.UNARY,
  proto.api.demo.Empty,
  proto.api.demo.CustomerList,
  /**
   * @param {!proto.api.demo.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.CustomerList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.demo.Empty,
 *   !proto.api.demo.CustomerList>}
 */
const methodInfo_CustomerService_GetAll = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.demo.CustomerList,
  /**
   * @param {!proto.api.demo.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.CustomerList.deserializeBinary
);


/**
 * @param {!proto.api.demo.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.demo.CustomerList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.demo.CustomerList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.demo.CustomerServiceClient.prototype.getAll =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.demo.CustomerService/GetAll',
      request,
      metadata || {},
      methodDescriptor_CustomerService_GetAll,
      callback);
};


/**
 * @param {!proto.api.demo.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.demo.CustomerList>}
 *     A native promise that resolves to the response
 */
proto.api.demo.CustomerServicePromiseClient.prototype.getAll =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.demo.CustomerService/GetAll',
      request,
      metadata || {},
      methodDescriptor_CustomerService_GetAll);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.demo.Customer.ID,
 *   !proto.api.demo.Customer>}
 */
const methodDescriptor_CustomerService_Get = new grpc.web.MethodDescriptor(
  '/api.demo.CustomerService/Get',
  grpc.web.MethodType.UNARY,
  proto.api.demo.Customer.ID,
  proto.api.demo.Customer,
  /**
   * @param {!proto.api.demo.Customer.ID} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.Customer.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.demo.Customer.ID,
 *   !proto.api.demo.Customer>}
 */
const methodInfo_CustomerService_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.demo.Customer,
  /**
   * @param {!proto.api.demo.Customer.ID} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.Customer.deserializeBinary
);


/**
 * @param {!proto.api.demo.Customer.ID} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.demo.Customer)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.demo.Customer>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.demo.CustomerServiceClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.demo.CustomerService/Get',
      request,
      metadata || {},
      methodDescriptor_CustomerService_Get,
      callback);
};


/**
 * @param {!proto.api.demo.Customer.ID} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.demo.Customer>}
 *     A native promise that resolves to the response
 */
proto.api.demo.CustomerServicePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.demo.CustomerService/Get',
      request,
      metadata || {},
      methodDescriptor_CustomerService_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.demo.Customer.Info,
 *   !proto.api.demo.Customer>}
 */
const methodDescriptor_CustomerService_Insert = new grpc.web.MethodDescriptor(
  '/api.demo.CustomerService/Insert',
  grpc.web.MethodType.UNARY,
  proto.api.demo.Customer.Info,
  proto.api.demo.Customer,
  /**
   * @param {!proto.api.demo.Customer.Info} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.Customer.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.demo.Customer.Info,
 *   !proto.api.demo.Customer>}
 */
const methodInfo_CustomerService_Insert = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.demo.Customer,
  /**
   * @param {!proto.api.demo.Customer.Info} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.Customer.deserializeBinary
);


/**
 * @param {!proto.api.demo.Customer.Info} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.demo.Customer)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.demo.Customer>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.demo.CustomerServiceClient.prototype.insert =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.demo.CustomerService/Insert',
      request,
      metadata || {},
      methodDescriptor_CustomerService_Insert,
      callback);
};


/**
 * @param {!proto.api.demo.Customer.Info} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.demo.Customer>}
 *     A native promise that resolves to the response
 */
proto.api.demo.CustomerServicePromiseClient.prototype.insert =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.demo.CustomerService/Insert',
      request,
      metadata || {},
      methodDescriptor_CustomerService_Insert);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.demo.Customer,
 *   !proto.api.demo.Customer>}
 */
const methodDescriptor_CustomerService_Update = new grpc.web.MethodDescriptor(
  '/api.demo.CustomerService/Update',
  grpc.web.MethodType.UNARY,
  proto.api.demo.Customer,
  proto.api.demo.Customer,
  /**
   * @param {!proto.api.demo.Customer} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.Customer.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.demo.Customer,
 *   !proto.api.demo.Customer>}
 */
const methodInfo_CustomerService_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.demo.Customer,
  /**
   * @param {!proto.api.demo.Customer} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.Customer.deserializeBinary
);


/**
 * @param {!proto.api.demo.Customer} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.demo.Customer)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.demo.Customer>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.demo.CustomerServiceClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.demo.CustomerService/Update',
      request,
      metadata || {},
      methodDescriptor_CustomerService_Update,
      callback);
};


/**
 * @param {!proto.api.demo.Customer} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.demo.Customer>}
 *     A native promise that resolves to the response
 */
proto.api.demo.CustomerServicePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.demo.CustomerService/Update',
      request,
      metadata || {},
      methodDescriptor_CustomerService_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.demo.Customer.ID,
 *   !proto.api.demo.Empty>}
 */
const methodDescriptor_CustomerService_Remove = new grpc.web.MethodDescriptor(
  '/api.demo.CustomerService/Remove',
  grpc.web.MethodType.UNARY,
  proto.api.demo.Customer.ID,
  proto.api.demo.Empty,
  /**
   * @param {!proto.api.demo.Customer.ID} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.demo.Customer.ID,
 *   !proto.api.demo.Empty>}
 */
const methodInfo_CustomerService_Remove = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.demo.Empty,
  /**
   * @param {!proto.api.demo.Customer.ID} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.demo.Empty.deserializeBinary
);


/**
 * @param {!proto.api.demo.Customer.ID} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.demo.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.demo.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.demo.CustomerServiceClient.prototype.remove =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.demo.CustomerService/Remove',
      request,
      metadata || {},
      methodDescriptor_CustomerService_Remove,
      callback);
};


/**
 * @param {!proto.api.demo.Customer.ID} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.demo.Empty>}
 *     A native promise that resolves to the response
 */
proto.api.demo.CustomerServicePromiseClient.prototype.remove =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.demo.CustomerService/Remove',
      request,
      metadata || {},
      methodDescriptor_CustomerService_Remove);
};


module.exports = proto.api.demo;

