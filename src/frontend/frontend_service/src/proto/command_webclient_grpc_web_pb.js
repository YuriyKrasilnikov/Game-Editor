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
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.api.command.webclient.v1.ProfileData,
 *   !proto.api.command.webclient.v1.StatusResponse>}
 */
const methodDescriptor_Profile_Registration = new grpc.web.MethodDescriptor(
  '/api.command.webclient.v1.Profile/Registration',
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
const methodInfo_Profile_Registration = new grpc.web.AbstractClientBase.MethodInfo(
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
proto.api.command.webclient.v1.ProfileClient.prototype.registration =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Profile/Registration',
      request,
      metadata || {},
      methodDescriptor_Profile_Registration);
};


/**
 * @param {!proto.api.command.webclient.v1.ProfileData} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.command.webclient.v1.StatusResponse>}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.ProfilePromiseClient.prototype.registration =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Profile/Registration',
      request,
      metadata || {},
      methodDescriptor_Profile_Registration);
};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?Object} options
 * @constructor
 * @struct
 * @final
 */
proto.api.command.webclient.v1.RecordClient =
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
proto.api.command.webclient.v1.RecordPromiseClient =
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
 *   !proto.api.command.webclient.v1.RecordData,
 *   !proto.api.command.webclient.v1.StatusResponse>}
 */
const methodDescriptor_Record_Insert = new grpc.web.MethodDescriptor(
  '/api.command.webclient.v1.Record/Insert',
  grpc.web.MethodType.SERVER_STREAMING,
  proto.api.command.webclient.v1.RecordData,
  proto.api.command.webclient.v1.StatusResponse,
  /**
   * @param {!proto.api.command.webclient.v1.RecordData} request
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
 *   !proto.api.command.webclient.v1.RecordData,
 *   !proto.api.command.webclient.v1.StatusResponse>}
 */
const methodInfo_Record_Insert = new grpc.web.AbstractClientBase.MethodInfo(
  proto.api.command.webclient.v1.StatusResponse,
  /**
   * @param {!proto.api.command.webclient.v1.RecordData} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.api.command.webclient.v1.StatusResponse.deserializeBinary
);


/**
 * @param {!proto.api.command.webclient.v1.RecordData} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.command.webclient.v1.StatusResponse>}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.RecordClient.prototype.insert =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Record/Insert',
      request,
      metadata || {},
      methodDescriptor_Record_Insert);
};


/**
 * @param {!proto.api.command.webclient.v1.RecordData} request The request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @return {!grpc.web.ClientReadableStream<!proto.api.command.webclient.v1.StatusResponse>}
 *     The XHR Node Readable Stream
 */
proto.api.command.webclient.v1.RecordPromiseClient.prototype.insert =
    function(request, metadata) {
  return this.client_.serverStreaming(this.hostname_ +
      '/api.command.webclient.v1.Record/Insert',
      request,
      metadata || {},
      methodDescriptor_Record_Insert);
};


module.exports = proto.api.command.webclient.v1;

