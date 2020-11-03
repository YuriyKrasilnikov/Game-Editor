# Generated by the gRPC Python protocol compiler plugin. DO NOT EDIT!
"""Client and server classes corresponding to protobuf-defined services."""
import grpc

from proto.record import record_pb2 as proto_dot_record_dot_record__pb2


class RecordStub(object):
    """Missing associated documentation comment in .proto file."""

    def __init__(self, channel):
        """Constructor.

        Args:
            channel: A grpc.Channel.
        """
        self.GetById = channel.unary_unary(
                '/api.record.Record/GetById',
                request_serializer=proto_dot_record_dot_record__pb2.RecordsByIdRequest.SerializeToString,
                response_deserializer=proto_dot_record_dot_record__pb2.RecordDataList.FromString,
                )
        self.GetWithPagination = channel.unary_unary(
                '/api.record.Record/GetWithPagination',
                request_serializer=proto_dot_record_dot_record__pb2.RecordsPaginationRequest.SerializeToString,
                response_deserializer=proto_dot_record_dot_record__pb2.RecordsCursorResponse.FromString,
                )
        self.Insert = channel.unary_unary(
                '/api.record.Record/Insert',
                request_serializer=proto_dot_record_dot_record__pb2.EditRecordRequest.SerializeToString,
                response_deserializer=proto_dot_record_dot_record__pb2.RecordDataList.FromString,
                )
        self.Update = channel.unary_unary(
                '/api.record.Record/Update',
                request_serializer=proto_dot_record_dot_record__pb2.EditRecordRequest.SerializeToString,
                response_deserializer=proto_dot_record_dot_record__pb2.StatusResponse.FromString,
                )
        self.RemoveById = channel.unary_unary(
                '/api.record.Record/RemoveById',
                request_serializer=proto_dot_record_dot_record__pb2.RecordsByIdRequest.SerializeToString,
                response_deserializer=proto_dot_record_dot_record__pb2.StatusResponse.FromString,
                )


class RecordServicer(object):
    """Missing associated documentation comment in .proto file."""

    def GetById(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def GetWithPagination(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def Insert(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def Update(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')

    def RemoveById(self, request, context):
        """Missing associated documentation comment in .proto file."""
        context.set_code(grpc.StatusCode.UNIMPLEMENTED)
        context.set_details('Method not implemented!')
        raise NotImplementedError('Method not implemented!')


def add_RecordServicer_to_server(servicer, server):
    rpc_method_handlers = {
            'GetById': grpc.unary_unary_rpc_method_handler(
                    servicer.GetById,
                    request_deserializer=proto_dot_record_dot_record__pb2.RecordsByIdRequest.FromString,
                    response_serializer=proto_dot_record_dot_record__pb2.RecordDataList.SerializeToString,
            ),
            'GetWithPagination': grpc.unary_unary_rpc_method_handler(
                    servicer.GetWithPagination,
                    request_deserializer=proto_dot_record_dot_record__pb2.RecordsPaginationRequest.FromString,
                    response_serializer=proto_dot_record_dot_record__pb2.RecordsCursorResponse.SerializeToString,
            ),
            'Insert': grpc.unary_unary_rpc_method_handler(
                    servicer.Insert,
                    request_deserializer=proto_dot_record_dot_record__pb2.EditRecordRequest.FromString,
                    response_serializer=proto_dot_record_dot_record__pb2.RecordDataList.SerializeToString,
            ),
            'Update': grpc.unary_unary_rpc_method_handler(
                    servicer.Update,
                    request_deserializer=proto_dot_record_dot_record__pb2.EditRecordRequest.FromString,
                    response_serializer=proto_dot_record_dot_record__pb2.StatusResponse.SerializeToString,
            ),
            'RemoveById': grpc.unary_unary_rpc_method_handler(
                    servicer.RemoveById,
                    request_deserializer=proto_dot_record_dot_record__pb2.RecordsByIdRequest.FromString,
                    response_serializer=proto_dot_record_dot_record__pb2.StatusResponse.SerializeToString,
            ),
    }
    generic_handler = grpc.method_handlers_generic_handler(
            'api.record.Record', rpc_method_handlers)
    server.add_generic_rpc_handlers((generic_handler,))


 # This class is part of an EXPERIMENTAL API.
class Record(object):
    """Missing associated documentation comment in .proto file."""

    @staticmethod
    def GetById(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/api.record.Record/GetById',
            proto_dot_record_dot_record__pb2.RecordsByIdRequest.SerializeToString,
            proto_dot_record_dot_record__pb2.RecordDataList.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def GetWithPagination(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/api.record.Record/GetWithPagination',
            proto_dot_record_dot_record__pb2.RecordsPaginationRequest.SerializeToString,
            proto_dot_record_dot_record__pb2.RecordsCursorResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def Insert(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/api.record.Record/Insert',
            proto_dot_record_dot_record__pb2.EditRecordRequest.SerializeToString,
            proto_dot_record_dot_record__pb2.RecordDataList.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def Update(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/api.record.Record/Update',
            proto_dot_record_dot_record__pb2.EditRecordRequest.SerializeToString,
            proto_dot_record_dot_record__pb2.StatusResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)

    @staticmethod
    def RemoveById(request,
            target,
            options=(),
            channel_credentials=None,
            call_credentials=None,
            insecure=False,
            compression=None,
            wait_for_ready=None,
            timeout=None,
            metadata=None):
        return grpc.experimental.unary_unary(request, target, '/api.record.Record/RemoveById',
            proto_dot_record_dot_record__pb2.RecordsByIdRequest.SerializeToString,
            proto_dot_record_dot_record__pb2.StatusResponse.FromString,
            options, channel_credentials,
            insecure, call_credentials, compression, wait_for_ready, timeout, metadata)