/**
 * @fileoverview gRPC-Web generated client stub for api.web_client
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');


var google_protobuf_field_mask_pb = require('google-protobuf/google/protobuf/field_mask_pb.js')
const proto = {};
proto.api = {};
proto.api.web_client = require('./web_client_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.web_client.ProfileClient =
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
proto.api.web_client.ProfilePromiseClient =
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
 *   !proto.api.web_client.ProfileRequest,
 *   !proto.api.web_client.ProfileResponse>}
 */
const methodDescriptor_Profile_Get = new grpc.web.MethodDescriptor(
  '/api.web_client.Profile/Get',
  grpc.web.MethodType.UNARY,
  proto.api.web_client.ProfileRequest,
  proto.api.web_client.ProfileResponse,
  /**
   * @param {!proto.api.web_client.ProfileRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.web_client.ProfileResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.web_client.ProfileRequest,
 *   !proto.api.web_client.ProfileResponse>}
 */
const methodInfo_Profile_Get = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.web_client.ProfileResponse,
  /**
   * @param {!proto.api.web_client.ProfileRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.web_client.ProfileResponse.deserializeBinary
);


/**
 * @param {!proto.api.web_client.ProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.web_client.ProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.web_client.ProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.web_client.ProfileClient.prototype.get =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.web_client.Profile/Get',
      request,
      metadata || {},
      methodDescriptor_Profile_Get,
      callback);
};


/**
 * @param {!proto.api.web_client.ProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.web_client.ProfileResponse>}
 *     Promise that resolves to the response
 */
proto.api.web_client.ProfilePromiseClient.prototype.get =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.web_client.Profile/Get',
      request,
      metadata || {},
      methodDescriptor_Profile_Get);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.web_client.UpdateProfileRequest,
 *   !proto.api.web_client.ProfileResponse>}
 */
const methodDescriptor_Profile_Insert = new grpc.web.MethodDescriptor(
  '/api.web_client.Profile/Insert',
  grpc.web.MethodType.UNARY,
  proto.api.web_client.UpdateProfileRequest,
  proto.api.web_client.ProfileResponse,
  /**
   * @param {!proto.api.web_client.UpdateProfileRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.web_client.ProfileResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.web_client.UpdateProfileRequest,
 *   !proto.api.web_client.ProfileResponse>}
 */
const methodInfo_Profile_Insert = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.web_client.ProfileResponse,
  /**
   * @param {!proto.api.web_client.UpdateProfileRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.web_client.ProfileResponse.deserializeBinary
);


/**
 * @param {!proto.api.web_client.UpdateProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.web_client.ProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.web_client.ProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.web_client.ProfileClient.prototype.insert =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.web_client.Profile/Insert',
      request,
      metadata || {},
      methodDescriptor_Profile_Insert,
      callback);
};


/**
 * @param {!proto.api.web_client.UpdateProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.web_client.ProfileResponse>}
 *     Promise that resolves to the response
 */
proto.api.web_client.ProfilePromiseClient.prototype.insert =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.web_client.Profile/Insert',
      request,
      metadata || {},
      methodDescriptor_Profile_Insert);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.web_client.UpdateProfileRequest,
 *   !proto.api.web_client.ProfileResponse>}
 */
const methodDescriptor_Profile_Update = new grpc.web.MethodDescriptor(
  '/api.web_client.Profile/Update',
  grpc.web.MethodType.UNARY,
  proto.api.web_client.UpdateProfileRequest,
  proto.api.web_client.ProfileResponse,
  /**
   * @param {!proto.api.web_client.UpdateProfileRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.web_client.ProfileResponse.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.web_client.UpdateProfileRequest,
 *   !proto.api.web_client.ProfileResponse>}
 */
const methodInfo_Profile_Update = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.web_client.ProfileResponse,
  /**
   * @param {!proto.api.web_client.UpdateProfileRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.web_client.ProfileResponse.deserializeBinary
);


/**
 * @param {!proto.api.web_client.UpdateProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.web_client.ProfileResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.web_client.ProfileResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.web_client.ProfileClient.prototype.update =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.web_client.Profile/Update',
      request,
      metadata || {},
      methodDescriptor_Profile_Update,
      callback);
};


/**
 * @param {!proto.api.web_client.UpdateProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.web_client.ProfileResponse>}
 *     Promise that resolves to the response
 */
proto.api.web_client.ProfilePromiseClient.prototype.update =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.web_client.Profile/Update',
      request,
      metadata || {},
      methodDescriptor_Profile_Update);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.web_client.ProfileRequest,
 *   !proto.api.web_client.Empty>}
 */
const methodDescriptor_Profile_Remove = new grpc.web.MethodDescriptor(
  '/api.web_client.Profile/Remove',
  grpc.web.MethodType.UNARY,
  proto.api.web_client.ProfileRequest,
  proto.api.web_client.Empty,
  /**
   * @param {!proto.api.web_client.ProfileRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.web_client.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.web_client.ProfileRequest,
 *   !proto.api.web_client.Empty>}
 */
const methodInfo_Profile_Remove = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.web_client.Empty,
  /**
   * @param {!proto.api.web_client.ProfileRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.web_client.Empty.deserializeBinary
);


/**
 * @param {!proto.api.web_client.ProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.web_client.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.web_client.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.web_client.ProfileClient.prototype.remove =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.web_client.Profile/Remove',
      request,
      metadata || {},
      methodDescriptor_Profile_Remove,
      callback);
};


/**
 * @param {!proto.api.web_client.ProfileRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.web_client.Empty>}
 *     Promise that resolves to the response
 */
proto.api.web_client.ProfilePromiseClient.prototype.remove =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.web_client.Profile/Remove',
      request,
      metadata || {},
      methodDescriptor_Profile_Remove);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.web_client.RegistrationRequest,
 *   !proto.api.web_client.Empty>}
 */
const methodDescriptor_Profile_Registration = new grpc.web.MethodDescriptor(
  '/api.web_client.Profile/Registration',
  grpc.web.MethodType.UNARY,
  proto.api.web_client.RegistrationRequest,
  proto.api.web_client.Empty,
  /**
   * @param {!proto.api.web_client.RegistrationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.web_client.Empty.deserializeBinary
);


/**
 * @const
 * @type {!grpc.web.AbstractClientBase.MethodInfo<
 *   !proto.api.web_client.RegistrationRequest,
 *   !proto.api.web_client.Empty>}
 */
const methodInfo_Profile_Registration = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.web_client.Empty,
  /**
   * @param {!proto.api.web_client.RegistrationRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.web_client.Empty.deserializeBinary
);


/**
 * @param {!proto.api.web_client.RegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.Error, ?proto.api.web_client.Empty)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.api.web_client.Empty>|undefined}
 *     The XHR Node Readable Stream
 */
proto.api.web_client.ProfileClient.prototype.registration =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/api.web_client.Profile/Registration',
      request,
      metadata || {},
      methodDescriptor_Profile_Registration,
      callback);
};


/**
 * @param {!proto.api.web_client.RegistrationRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.api.web_client.Empty>}
 *     Promise that resolves to the response
 */
proto.api.web_client.ProfilePromiseClient.prototype.registration =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/api.web_client.Profile/Registration',
      request,
      metadata || {},
      methodDescriptor_Profile_Registration);
};


module.exports = proto.api.web_client;

