/**
 * @fileoverview gRPC-Web generated client stub for api.query.webclient.v1
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
proto.api.query = {};
proto.api.query.webclient = {};
proto.api.query.webclient.v1 = require('./query_webclient_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.query.webclient.v1.ProfileClient =
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
proto.api.query.webclient.v1.ProfilePromiseClient =
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
 *   !proto.api.query.webclient.v1.ProfilesRequest,
 *   !proto.api.query.webclient.v1.ProfileDataList>}
 */
const methodDescriptor_Profile_Get = new grpc.web.MethodDescriptor(
  '/api.query.webclient.v1.Profile/Get',
  grpc.web.MethodType.UNARY,
  proto.api.query.webclient.v1.ProfilesRequest,
  proto.api.query.webclient.v1.ProfileDataList,
  /**
   * @param {!proto.api.query.webclient.v1.ProfilesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.query.webclient.v1.ProfileDataList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.query.webclient.v1.ProfilesRequest,
 *   !proto.api.query.webclient.v1.ProfileDataList>}
 */
const methodInfo_Profile_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.query.webclient.v1.ProfileDataList,
  /**
   * @param {!proto.api.query.webclient.v1.ProfilesRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.query.webclient.v1.ProfileDataList.deserializeBinary
);


/**
 * @param {!proto.api.query.webclient.v1.ProfilesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.query.webclient.v1.ProfileDataList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.query.webclient.v1.ProfileDataList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.query.webclient.v1.ProfileClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.query.webclient.v1.Profile/Get',
      request,
      metadata || {},
      methodDescriptor_Profile_Get,
      callback);
};


/**
 * @param {!proto.api.query.webclient.v1.ProfilesRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.query.webclient.v1.ProfileDataList>}
 *     Promise that resolves to the response
 */
proto.api.query.webclient.v1.ProfilePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.query.webclient.v1.Profile/Get',
      request,
      metadata || {},
      methodDescriptor_Profile_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.google.protobuf.Empty,
 *   !proto.api.query.webclient.v1.ProfileData>}
 */
const methodDescriptor_Profile_Identification = new grpc.web.MethodDescriptor(
  '/api.query.webclient.v1.Profile/Identification',
  grpc.web.MethodType.UNARY,
  google_protobuf_empty_pb.Empty,
  proto.api.query.webclient.v1.ProfileData,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.query.webclient.v1.ProfileData.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.google.protobuf.Empty,
 *   !proto.api.query.webclient.v1.ProfileData>}
 */
const methodInfo_Profile_Identification = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.query.webclient.v1.ProfileData,
  /**
   * @param {!proto.google.protobuf.Empty} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.query.webclient.v1.ProfileData.deserializeBinary
);


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.query.webclient.v1.ProfileData)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.query.webclient.v1.ProfileData>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.query.webclient.v1.ProfileClient.prototype.identification =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.query.webclient.v1.Profile/Identification',
      request,
      metadata || {},
      methodDescriptor_Profile_Identification,
      callback);
};


/**
 * @param {!proto.google.protobuf.Empty} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.query.webclient.v1.ProfileData>}
 *     Promise that resolves to the response
 */
proto.api.query.webclient.v1.ProfilePromiseClient.prototype.identification =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.query.webclient.v1.Profile/Identification',
      request,
      metadata || {},
      methodDescriptor_Profile_Identification);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.query.webclient.v1.BillingClient =
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
proto.api.query.webclient.v1.BillingPromiseClient =
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
 *   !proto.api.query.webclient.v1.BillingsRequest,
 *   !proto.api.query.webclient.v1.BillingDataList>}
 */
const methodDescriptor_Billing_Get = new grpc.web.MethodDescriptor(
  '/api.query.webclient.v1.Billing/Get',
  grpc.web.MethodType.UNARY,
  proto.api.query.webclient.v1.BillingsRequest,
  proto.api.query.webclient.v1.BillingDataList,
  /**
   * @param {!proto.api.query.webclient.v1.BillingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.query.webclient.v1.BillingDataList.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.query.webclient.v1.BillingsRequest,
 *   !proto.api.query.webclient.v1.BillingDataList>}
 */
const methodInfo_Billing_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.query.webclient.v1.BillingDataList,
  /**
   * @param {!proto.api.query.webclient.v1.BillingsRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.query.webclient.v1.BillingDataList.deserializeBinary
);


/**
 * @param {!proto.api.query.webclient.v1.BillingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.query.webclient.v1.BillingDataList)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.query.webclient.v1.BillingDataList>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.query.webclient.v1.BillingClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.query.webclient.v1.Billing/Get',
      request,
      metadata || {},
      methodDescriptor_Billing_Get,
      callback);
};


/**
 * @param {!proto.api.query.webclient.v1.BillingsRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.query.webclient.v1.BillingDataList>}
 *     Promise that resolves to the response
 */
proto.api.query.webclient.v1.BillingPromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.query.webclient.v1.Billing/Get',
      request,
      metadata || {},
      methodDescriptor_Billing_Get);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.query.webclient.v1.BillingHistoryClient =
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
proto.api.query.webclient.v1.BillingHistoryPromiseClient =
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
 *   !proto.api.query.webclient.v1.BillingsPaginationRequest,
 *   !proto.api.query.webclient.v1.BillingsCursorResponse>}
 */
const methodDescriptor_BillingHistory_Get = new grpc.web.MethodDescriptor(
  '/api.query.webclient.v1.BillingHistory/Get',
  grpc.web.MethodType.UNARY,
  proto.api.query.webclient.v1.BillingsPaginationRequest,
  proto.api.query.webclient.v1.BillingsCursorResponse,
  /**
   * @param {!proto.api.query.webclient.v1.BillingsPaginationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.query.webclient.v1.BillingsCursorResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.query.webclient.v1.BillingsPaginationRequest,
 *   !proto.api.query.webclient.v1.BillingsCursorResponse>}
 */
const methodInfo_BillingHistory_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.query.webclient.v1.BillingsCursorResponse,
  /**
   * @param {!proto.api.query.webclient.v1.BillingsPaginationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.query.webclient.v1.BillingsCursorResponse.deserializeBinary
);


/**
 * @param {!proto.api.query.webclient.v1.BillingsPaginationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.query.webclient.v1.BillingsCursorResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.query.webclient.v1.BillingsCursorResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.query.webclient.v1.BillingHistoryClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.query.webclient.v1.BillingHistory/Get',
      request,
      metadata || {},
      methodDescriptor_BillingHistory_Get,
      callback);
};


/**
 * @param {!proto.api.query.webclient.v1.BillingsPaginationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.query.webclient.v1.BillingsCursorResponse>}
 *     Promise that resolves to the response
 */
proto.api.query.webclient.v1.BillingHistoryPromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.query.webclient.v1.BillingHistory/Get',
      request,
      metadata || {},
      methodDescriptor_BillingHistory_Get);
};


module.exports = proto.api.query.webclient.v1;

