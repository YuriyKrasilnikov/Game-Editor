# -*- coding: utf-8 -*-
# Generated by the protocol buffer compiler.  DO NOT EDIT!
# source: proto/query/charts/query_charts.proto
"""Generated protocol buffer code."""
from google.protobuf import descriptor as _descriptor
from google.protobuf import message as _message
from google.protobuf import reflection as _reflection
from google.protobuf import symbol_database as _symbol_database
# @@protoc_insertion_point(imports)

_sym_db = _symbol_database.Default()


from google.protobuf import field_mask_pb2 as google_dot_protobuf_dot_field__mask__pb2


DESCRIPTOR = _descriptor.FileDescriptor(
  name='proto/query/charts/query_charts.proto',
  package='api.query.charts.v1',
  syntax='proto3',
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_pb=b'\n%proto/query/charts/query_charts.proto\x12\x13\x61pi.query.charts.v1\x1a google/protobuf/field_mask.proto\"*\n\tChartData\x12\n\n\x02id\x18\x01 \x01(\t\x12\x11\n\tprofileid\x18\x02 \x01(\t\"?\n\rChartDataList\x12.\n\x06\x63harts\x18\x01 \x03(\x0b\x32\x1e.api.query.charts.v1.ChartData\"s\n\rChartsRequest\x12\x36\n\nchartsData\x18\x01 \x01(\x0b\x32\".api.query.charts.v1.ChartDataList\x12*\n\x06\x66ields\x18\x02 \x01(\x0b\x32\x1a.google.protobuf.FieldMask2\xa5\x01\n\x06\x43harts\x12M\n\x03Get\x12\".api.query.charts.v1.ChartsRequest\x1a\".api.query.charts.v1.ChartDataList\x12L\n\nGetChartId\x12\x1e.api.query.charts.v1.ChartData\x1a\x1e.api.query.charts.v1.ChartDatab\x06proto3'
  ,
  dependencies=[google_dot_protobuf_dot_field__mask__pb2.DESCRIPTOR,])




_CHARTDATA = _descriptor.Descriptor(
  name='ChartData',
  full_name='api.query.charts.v1.ChartData',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='api.query.charts.v1.ChartData.id', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='profileid', full_name='api.query.charts.v1.ChartData.profileid', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=96,
  serialized_end=138,
)


_CHARTDATALIST = _descriptor.Descriptor(
  name='ChartDataList',
  full_name='api.query.charts.v1.ChartDataList',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='charts', full_name='api.query.charts.v1.ChartDataList.charts', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=140,
  serialized_end=203,
)


_CHARTSREQUEST = _descriptor.Descriptor(
  name='ChartsRequest',
  full_name='api.query.charts.v1.ChartsRequest',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='chartsData', full_name='api.query.charts.v1.ChartsRequest.chartsData', index=0,
      number=1, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='fields', full_name='api.query.charts.v1.ChartsRequest.fields', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=205,
  serialized_end=320,
)

_CHARTDATALIST.fields_by_name['charts'].message_type = _CHARTDATA
_CHARTSREQUEST.fields_by_name['chartsData'].message_type = _CHARTDATALIST
_CHARTSREQUEST.fields_by_name['fields'].message_type = google_dot_protobuf_dot_field__mask__pb2._FIELDMASK
DESCRIPTOR.message_types_by_name['ChartData'] = _CHARTDATA
DESCRIPTOR.message_types_by_name['ChartDataList'] = _CHARTDATALIST
DESCRIPTOR.message_types_by_name['ChartsRequest'] = _CHARTSREQUEST
_sym_db.RegisterFileDescriptor(DESCRIPTOR)

ChartData = _reflection.GeneratedProtocolMessageType('ChartData', (_message.Message,), {
  'DESCRIPTOR' : _CHARTDATA,
  '__module__' : 'proto.query.charts.query_charts_pb2'
  # @@protoc_insertion_point(class_scope:api.query.charts.v1.ChartData)
  })
_sym_db.RegisterMessage(ChartData)

ChartDataList = _reflection.GeneratedProtocolMessageType('ChartDataList', (_message.Message,), {
  'DESCRIPTOR' : _CHARTDATALIST,
  '__module__' : 'proto.query.charts.query_charts_pb2'
  # @@protoc_insertion_point(class_scope:api.query.charts.v1.ChartDataList)
  })
_sym_db.RegisterMessage(ChartDataList)

ChartsRequest = _reflection.GeneratedProtocolMessageType('ChartsRequest', (_message.Message,), {
  'DESCRIPTOR' : _CHARTSREQUEST,
  '__module__' : 'proto.query.charts.query_charts_pb2'
  # @@protoc_insertion_point(class_scope:api.query.charts.v1.ChartsRequest)
  })
_sym_db.RegisterMessage(ChartsRequest)



_CHARTS = _descriptor.ServiceDescriptor(
  name='Charts',
  full_name='api.query.charts.v1.Charts',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_start=323,
  serialized_end=488,
  methods=[
  _descriptor.MethodDescriptor(
    name='Get',
    full_name='api.query.charts.v1.Charts.Get',
    index=0,
    containing_service=None,
    input_type=_CHARTSREQUEST,
    output_type=_CHARTDATALIST,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
  _descriptor.MethodDescriptor(
    name='GetChartId',
    full_name='api.query.charts.v1.Charts.GetChartId',
    index=1,
    containing_service=None,
    input_type=_CHARTDATA,
    output_type=_CHARTDATA,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
])
_sym_db.RegisterServiceDescriptor(_CHARTS)

DESCRIPTOR.services_by_name['Charts'] = _CHARTS

# @@protoc_insertion_point(module_scope)