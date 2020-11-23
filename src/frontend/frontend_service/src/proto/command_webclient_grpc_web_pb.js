/**
 * @fileoverview gRPC-Web generated client stub for api.command.webclient.v1
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js')

var google_protobuf_field_mask_pb = require('google-protobuf/google/protobuf/field_mask_pb.js')
const proto = {};
proto.api = {};
proto.api.command = {};
proto.api.command.webclient = {};
proto.api.command.webclient.v1 = require('./command_webclient_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.command.webclient.v1.ProfileClient =
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
proto.api.command.webclient.v1.ProfilePromiseClient =
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
 *   !proto.api.command.webclient.v1.ProfileData,
 *   !proto.api.command.webclient.v1.StatusResponse>}
 */
const methodDescriptor_Profile_Insert = new grpc.web.MethodDescriptor(
  '/api.command.webclient.v1.Profile/Insert',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.api.command.webclient.v1.ProfileData,
  proto.api.command.webclient.v1.StatusResponse,
  /**
   * @param {!proto.api.command.webclient.v1.ProfileData} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.command.webclient.v1.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.command.webclient.v1.ProfileData,
 *   !proto.api.command.webclient.v1.StatusResponse>}
 */
const methodInfo_Profile_Insert = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.command.webclient.v1.StatusResponse,
  /**
   * @param {!proto.api.command.webclient.v1.ProfileData} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.command.webclient.v1.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.api.command.webclient.v1.ProfileData} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.command.webclient.v1.StatusResponse>}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.ProfileClient.prototype.insert =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Profile/Insert',
      request,
      metadata || {},
      methodDescriptor_Profile_Insert);
};


/**
 * @param {!proto.api.command.webclient.v1.ProfileData} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.command.webclient.v1.StatusResponse>}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.ProfilePromiseClient.prototype.insert =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Profile/Insert',
      request,
      metadata || {},
      methodDescriptor_Profile_Insert);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.command.webclient.v1.ProfileData,
 *   !proto.api.command.webclient.v1.StatusResponse>}
 */
const methodDescriptor_Profile_Update = new grpc.web.MethodDescriptor(
  '/api.command.webclient.v1.Profile/Update',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.api.command.webclient.v1.ProfileData,
  proto.api.command.webclient.v1.StatusResponse,
  /**
   * @param {!proto.api.command.webclient.v1.ProfileData} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.command.webclient.v1.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.command.webclient.v1.ProfileData,
 *   !proto.api.command.webclient.v1.StatusResponse>}
 */
const methodInfo_Profile_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.command.webclient.v1.StatusResponse,
  /**
   * @param {!proto.api.command.webclient.v1.ProfileData} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.command.webclient.v1.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.api.command.webclient.v1.ProfileData} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.command.webclient.v1.StatusResponse>}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.ProfileClient.prototype.update =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Profile/Update',
      request,
      metadata || {},
      methodDescriptor_Profile_Update);
};


/**
 * @param {!proto.api.command.webclient.v1.ProfileData} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.command.webclient.v1.StatusResponse>}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.ProfilePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Profile/Update',
      request,
      metadata || {},
      methodDescriptor_Profile_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.command.webclient.v1.ProfileData,
 *   !proto.api.command.webclient.v1.StatusResponse>}
 */
const methodDescriptor_Profile_Remove = new grpc.web.MethodDescriptor(
  '/api.command.webclient.v1.Profile/Remove',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.api.command.webclient.v1.ProfileData,
  proto.api.command.webclient.v1.StatusResponse,
  /**
   * @param {!proto.api.command.webclient.v1.ProfileData} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.command.webclient.v1.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.command.webclient.v1.ProfileData,
 *   !proto.api.command.webclient.v1.StatusResponse>}
 */
const methodInfo_Profile_Remove = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.command.webclient.v1.StatusResponse,
  /**
   * @param {!proto.api.command.webclient.v1.ProfileData} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.command.webclient.v1.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.api.command.webclient.v1.ProfileData} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.command.webclient.v1.StatusResponse>}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.ProfileClient.prototype.remove =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Profile/Remove',
      request,
      metadata || {},
      methodDescriptor_Profile_Remove);
};


/**
 * @param {!proto.api.command.webclient.v1.ProfileData} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.command.webclient.v1.StatusResponse>}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.ProfilePromiseClient.prototype.remove =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Profile/Remove',
      request,
      metadata || {},
      methodDescriptor_Profile_Remove);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.command.webclient.v1.BillingClient =
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
proto.api.command.webclient.v1.BillingPromiseClient =
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
 *   !proto.api.command.webclient.v1.PaidData,
 *   !proto.api.command.webclient.v1.StatusResponse>}
 */
const methodDescriptor_Billing_Paid = new grpc.web.MethodDescriptor(
  '/api.command.webclient.v1.Billing/Paid',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.api.command.webclient.v1.PaidData,
  proto.api.command.webclient.v1.StatusResponse,
  /**
   * @param {!proto.api.command.webclient.v1.PaidData} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.command.webclient.v1.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.command.webclient.v1.PaidData,
 *   !proto.api.command.webclient.v1.StatusResponse>}
 */
const methodInfo_Billing_Paid = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.command.webclient.v1.StatusResponse,
  /**
   * @param {!proto.api.command.webclient.v1.PaidData} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.command.webclient.v1.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.api.command.webclient.v1.PaidData} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.command.webclient.v1.StatusResponse>}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.BillingClient.prototype.paid =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Billing/Paid',
      request,
      metadata || {},
      methodDescriptor_Billing_Paid);
};


/**
 * @param {!proto.api.command.webclient.v1.PaidData} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.command.webclient.v1.StatusResponse>}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.BillingPromiseClient.prototype.paid =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Billing/Paid',
      request,
      metadata || {},
      methodDescriptor_Billing_Paid);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.command.webclient.v1.BuyData,
 *   !proto.api.command.webclient.v1.StatusResponse>}
 */
const methodDescriptor_Billing_Buy = new grpc.web.MethodDescriptor(
  '/api.command.webclient.v1.Billing/Buy',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.api.command.webclient.v1.BuyData,
  proto.api.command.webclient.v1.StatusResponse,
  /**
   * @param {!proto.api.command.webclient.v1.BuyData} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.command.webclient.v1.StatusResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.command.webclient.v1.BuyData,
 *   !proto.api.command.webclient.v1.StatusResponse>}
 */
const methodInfo_Billing_Buy = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.command.webclient.v1.StatusResponse,
  /**
   * @param {!proto.api.command.webclient.v1.BuyData} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.command.webclient.v1.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.api.command.webclient.v1.BuyData} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.command.webclient.v1.StatusResponse>}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.BillingClient.prototype.buy =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Billing/Buy',
      request,
      metadata || {},
      methodDescriptor_Billing_Buy);
};


/**
 * @param {!proto.api.command.webclient.v1.BuyData} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.command.webclient.v1.StatusResponse>}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.BillingPromiseClient.prototype.buy =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Billing/Buy',
      request,
      metadata || {},
      methodDescriptor_Billing_Buy);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.command.webclient.v1.ChartsClient =
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
proto.api.command.webclient.v1.ChartsPromiseClient =
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
 *   !proto.api.command.webclient.v1.NodesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Charts_InsertNodes = new grpc.web.MethodDescriptor(
  '/api.command.webclient.v1.Charts/InsertNodes',
  grpc.web.MethodType.UNARY,
  proto.api.command.webclient.v1.NodesRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.command.webclient.v1.NodesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.command.webclient.v1.NodesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Charts_InsertNodes = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.command.webclient.v1.NodesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.command.webclient.v1.NodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.ChartsClient.prototype.insertNodes =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.command.webclient.v1.Charts/InsertNodes',
      request,
      metadata || {},
      methodDescriptor_Charts_InsertNodes,
      callback);
};


/**
 * @param {!proto.api.command.webclient.v1.NodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.command.webclient.v1.ChartsPromiseClient.prototype.insertNodes =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.command.webclient.v1.Charts/InsertNodes',
      request,
      metadata || {},
      methodDescriptor_Charts_InsertNodes);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.command.webclient.v1.NodesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Charts_UpdateNodes = new grpc.web.MethodDescriptor(
  '/api.command.webclient.v1.Charts/UpdateNodes',
  grpc.web.MethodType.UNARY,
  proto.api.command.webclient.v1.NodesRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.command.webclient.v1.NodesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.command.webclient.v1.NodesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Charts_UpdateNodes = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.command.webclient.v1.NodesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.command.webclient.v1.NodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.ChartsClient.prototype.updateNodes =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.command.webclient.v1.Charts/UpdateNodes',
      request,
      metadata || {},
      methodDescriptor_Charts_UpdateNodes,
      callback);
};


/**
 * @param {!proto.api.command.webclient.v1.NodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.command.webclient.v1.ChartsPromiseClient.prototype.updateNodes =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.command.webclient.v1.Charts/UpdateNodes',
      request,
      metadata || {},
      methodDescriptor_Charts_UpdateNodes);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.command.webclient.v1.NodesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Charts_RemoveNodes = new grpc.web.MethodDescriptor(
  '/api.command.webclient.v1.Charts/RemoveNodes',
  grpc.web.MethodType.UNARY,
  proto.api.command.webclient.v1.NodesRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.command.webclient.v1.NodesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.command.webclient.v1.NodesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Charts_RemoveNodes = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.command.webclient.v1.NodesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.command.webclient.v1.NodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.ChartsClient.prototype.removeNodes =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.command.webclient.v1.Charts/RemoveNodes',
      request,
      metadata || {},
      methodDescriptor_Charts_RemoveNodes,
      callback);
};


/**
 * @param {!proto.api.command.webclient.v1.NodesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.command.webclient.v1.ChartsPromiseClient.prototype.removeNodes =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.command.webclient.v1.Charts/RemoveNodes',
      request,
      metadata || {},
      methodDescriptor_Charts_RemoveNodes);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.command.webclient.v1.EdgesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Charts_InsertEdges = new grpc.web.MethodDescriptor(
  '/api.command.webclient.v1.Charts/InsertEdges',
  grpc.web.MethodType.UNARY,
  proto.api.command.webclient.v1.EdgesRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.command.webclient.v1.EdgesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.command.webclient.v1.EdgesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Charts_InsertEdges = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.command.webclient.v1.EdgesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.command.webclient.v1.EdgesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.ChartsClient.prototype.insertEdges =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.command.webclient.v1.Charts/InsertEdges',
      request,
      metadata || {},
      methodDescriptor_Charts_InsertEdges,
      callback);
};


/**
 * @param {!proto.api.command.webclient.v1.EdgesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.command.webclient.v1.ChartsPromiseClient.prototype.insertEdges =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.command.webclient.v1.Charts/InsertEdges',
      request,
      metadata || {},
      methodDescriptor_Charts_InsertEdges);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.command.webclient.v1.EdgesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Charts_UpdateEdges = new grpc.web.MethodDescriptor(
  '/api.command.webclient.v1.Charts/UpdateEdges',
  grpc.web.MethodType.UNARY,
  proto.api.command.webclient.v1.EdgesRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.command.webclient.v1.EdgesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.command.webclient.v1.EdgesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Charts_UpdateEdges = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.command.webclient.v1.EdgesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.command.webclient.v1.EdgesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.ChartsClient.prototype.updateEdges =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.command.webclient.v1.Charts/UpdateEdges',
      request,
      metadata || {},
      methodDescriptor_Charts_UpdateEdges,
      callback);
};


/**
 * @param {!proto.api.command.webclient.v1.EdgesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.command.webclient.v1.ChartsPromiseClient.prototype.updateEdges =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.command.webclient.v1.Charts/UpdateEdges',
      request,
      metadata || {},
      methodDescriptor_Charts_UpdateEdges);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.command.webclient.v1.EdgesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodDescriptor_Charts_RemoveEdges = new grpc.web.MethodDescriptor(
  '/api.command.webclient.v1.Charts/RemoveEdges',
  grpc.web.MethodType.UNARY,
  proto.api.command.webclient.v1.EdgesRequest,
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.command.webclient.v1.EdgesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.command.webclient.v1.EdgesRequest,
 *   !proto.google.protobuf.Empty>}
 */
const methodInfo_Charts_RemoveEdges = new grpc.web.AbstractClientBase.MethodInfo(
  google_protobuf_empty_pb.Empty,
  /**
   * @param {!proto.api.command.webclient.v1.EdgesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  google_protobuf_empty_pb.Empty.deserializeBinary
);


/**
 * @param {!proto.api.command.webclient.v1.EdgesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.google.protobuf.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.google.protobuf.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.ChartsClient.prototype.removeEdges =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.command.webclient.v1.Charts/RemoveEdges',
      request,
      metadata || {},
      methodDescriptor_Charts_RemoveEdges,
      callback);
};


/**
 * @param {!proto.api.command.webclient.v1.EdgesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.google.protobuf.Empty>}
 *     Promise that resolves to the response
 */
proto.api.command.webclient.v1.ChartsPromiseClient.prototype.removeEdges =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.command.webclient.v1.Charts/RemoveEdges',
      request,
      metadata || {},
      methodDescriptor_Charts_RemoveEdges);
};


module.exports = proto.api.command.webclient.v1;

