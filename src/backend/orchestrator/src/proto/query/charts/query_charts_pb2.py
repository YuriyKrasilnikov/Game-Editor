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
  serialized_pb=b'\n%proto/query/charts/query_charts.proto\x12\x13\x61pi.query.charts.v1\x1a google/protobuf/field_mask.proto\"*\n\tChartData\x12\n\n\x02id\x18\x01 \x01(\t\x12\x11\n\tprofileid\x18\x02 \x01(\t\"?\n\rChartDataList\x12.\n\x06\x63harts\x18\x01 \x03(\x0b\x32\x1e.api.query.charts.v1.ChartData\"s\n\rChartsRequest\x12\x36\n\nchartsData\x18\x01 \x01(\x0b\x32\".api.query.charts.v1.ChartDataList\x12*\n\x06\x66ields\x18\x02 \x01(\x0b\x32\x1a.google.protobuf.FieldMask\"\x1e\n\tProfileId\x12\x11\n\tprofileid\x18\x01 \x01(\t\"\xd2\x06\n\x11\x43hartDataResponse\x12\x46\n\tnodesData\x18\x01 \x01(\x0b\x32\x33.api.query.charts.v1.ChartDataResponse.NodeDataList\x12\x46\n\tedgesData\x18\x02 \x01(\x0b\x32\x33.api.query.charts.v1.ChartDataResponse.EdgeDataList\x1a\xf3\x02\n\x0cNodeDataList\x12K\n\x05nodes\x18\x01 \x03(\x0b\x32<.api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData\x1a\x95\x02\n\x08NodeData\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0c\n\x04type\x18\x02 \x01(\t\x12O\n\x04\x64\x61ta\x18\x03 \x01(\x0b\x32\x41.api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.Data\x12W\n\x08position\x18\x04 \x01(\x0b\x32\x45.api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.Position\x1a#\n\x04\x44\x61ta\x12\r\n\x05label\x18\x01 \x01(\t\x12\x0c\n\x04text\x18\x02 \x01(\t\x1a \n\x08Position\x12\t\n\x01x\x18\x01 \x01(\x05\x12\t\n\x01y\x18\x02 \x01(\x05\x1a\xb6\x02\n\x0c\x45\x64geDataList\x12K\n\x05\x65\x64ges\x18\x01 \x03(\x0b\x32<.api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData\x1a\xd8\x01\n\x08\x45\x64geData\x12\n\n\x02id\x18\x01 \x01(\t\x12\x0c\n\x04type\x18\x02 \x01(\t\x12\x0e\n\x06source\x18\x03 \x01(\t\x12\x14\n\x0csourceHandle\x18\x04 \x01(\t\x12\x0e\n\x06target\x18\x05 \x01(\t\x12\x14\n\x0ctargetHandle\x18\x06 \x01(\t\x12O\n\x04\x64\x61ta\x18\x07 \x01(\x0b\x32\x41.api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData.Data\x1a\x15\n\x04\x44\x61ta\x12\r\n\x05label\x18\x01 \x01(\t2\xaf\x01\n\x06\x43harts\x12M\n\x03Get\x12\".api.query.charts.v1.ChartsRequest\x1a\".api.query.charts.v1.ChartDataList\x12V\n\x0cGetChartData\x12\x1e.api.query.charts.v1.ProfileId\x1a&.api.query.charts.v1.ChartDataResponseb\x06proto3'
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


_PROFILEID = _descriptor.Descriptor(
  name='ProfileId',
  full_name='api.query.charts.v1.ProfileId',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='profileid', full_name='api.query.charts.v1.ProfileId.profileid', index=0,
      number=1, type=9, cpp_type=9, label=1,
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
  serialized_start=322,
  serialized_end=352,
)


_CHARTDATARESPONSE_NODEDATALIST_NODEDATA_DATA = _descriptor.Descriptor(
  name='Data',
  full_name='api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.Data',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='label', full_name='api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.Data.label', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='text', full_name='api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.Data.text', index=1,
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
  serialized_start=823,
  serialized_end=858,
)

_CHARTDATARESPONSE_NODEDATALIST_NODEDATA_POSITION = _descriptor.Descriptor(
  name='Position',
  full_name='api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.Position',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='x', full_name='api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.Position.x', index=0,
      number=1, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='y', full_name='api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.Position.y', index=1,
      number=2, type=5, cpp_type=1, label=1,
      has_default_value=False, default_value=0,
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
  serialized_start=860,
  serialized_end=892,
)

_CHARTDATARESPONSE_NODEDATALIST_NODEDATA = _descriptor.Descriptor(
  name='NodeData',
  full_name='api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.id', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='type', full_name='api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.type', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='data', full_name='api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.data', index=2,
      number=3, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='position', full_name='api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.position', index=3,
      number=4, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[_CHARTDATARESPONSE_NODEDATALIST_NODEDATA_DATA, _CHARTDATARESPONSE_NODEDATALIST_NODEDATA_POSITION, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=615,
  serialized_end=892,
)

_CHARTDATARESPONSE_NODEDATALIST = _descriptor.Descriptor(
  name='NodeDataList',
  full_name='api.query.charts.v1.ChartDataResponse.NodeDataList',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='nodes', full_name='api.query.charts.v1.ChartDataResponse.NodeDataList.nodes', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[_CHARTDATARESPONSE_NODEDATALIST_NODEDATA, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=521,
  serialized_end=892,
)

_CHARTDATARESPONSE_EDGEDATALIST_EDGEDATA_DATA = _descriptor.Descriptor(
  name='Data',
  full_name='api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData.Data',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='label', full_name='api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData.Data.label', index=0,
      number=1, type=9, cpp_type=9, label=1,
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
  serialized_start=823,
  serialized_end=844,
)

_CHARTDATARESPONSE_EDGEDATALIST_EDGEDATA = _descriptor.Descriptor(
  name='EdgeData',
  full_name='api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='id', full_name='api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData.id', index=0,
      number=1, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='type', full_name='api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData.type', index=1,
      number=2, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='source', full_name='api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData.source', index=2,
      number=3, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='sourceHandle', full_name='api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData.sourceHandle', index=3,
      number=4, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='target', full_name='api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData.target', index=4,
      number=5, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='targetHandle', full_name='api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData.targetHandle', index=5,
      number=6, type=9, cpp_type=9, label=1,
      has_default_value=False, default_value=b"".decode('utf-8'),
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='data', full_name='api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData.data', index=6,
      number=7, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[_CHARTDATARESPONSE_EDGEDATALIST_EDGEDATA_DATA, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=989,
  serialized_end=1205,
)

_CHARTDATARESPONSE_EDGEDATALIST = _descriptor.Descriptor(
  name='EdgeDataList',
  full_name='api.query.charts.v1.ChartDataResponse.EdgeDataList',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='edges', full_name='api.query.charts.v1.ChartDataResponse.EdgeDataList.edges', index=0,
      number=1, type=11, cpp_type=10, label=3,
      has_default_value=False, default_value=[],
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[_CHARTDATARESPONSE_EDGEDATALIST_EDGEDATA, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=895,
  serialized_end=1205,
)

_CHARTDATARESPONSE = _descriptor.Descriptor(
  name='ChartDataResponse',
  full_name='api.query.charts.v1.ChartDataResponse',
  filename=None,
  file=DESCRIPTOR,
  containing_type=None,
  create_key=_descriptor._internal_create_key,
  fields=[
    _descriptor.FieldDescriptor(
      name='nodesData', full_name='api.query.charts.v1.ChartDataResponse.nodesData', index=0,
      number=1, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
    _descriptor.FieldDescriptor(
      name='edgesData', full_name='api.query.charts.v1.ChartDataResponse.edgesData', index=1,
      number=2, type=11, cpp_type=10, label=1,
      has_default_value=False, default_value=None,
      message_type=None, enum_type=None, containing_type=None,
      is_extension=False, extension_scope=None,
      serialized_options=None, file=DESCRIPTOR,  create_key=_descriptor._internal_create_key),
  ],
  extensions=[
  ],
  nested_types=[_CHARTDATARESPONSE_NODEDATALIST, _CHARTDATARESPONSE_EDGEDATALIST, ],
  enum_types=[
  ],
  serialized_options=None,
  is_extendable=False,
  syntax='proto3',
  extension_ranges=[],
  oneofs=[
  ],
  serialized_start=355,
  serialized_end=1205,
)

_CHARTDATALIST.fields_by_name['charts'].message_type = _CHARTDATA
_CHARTSREQUEST.fields_by_name['chartsData'].message_type = _CHARTDATALIST
_CHARTSREQUEST.fields_by_name['fields'].message_type = google_dot_protobuf_dot_field__mask__pb2._FIELDMASK
_CHARTDATARESPONSE_NODEDATALIST_NODEDATA_DATA.containing_type = _CHARTDATARESPONSE_NODEDATALIST_NODEDATA
_CHARTDATARESPONSE_NODEDATALIST_NODEDATA_POSITION.containing_type = _CHARTDATARESPONSE_NODEDATALIST_NODEDATA
_CHARTDATARESPONSE_NODEDATALIST_NODEDATA.fields_by_name['data'].message_type = _CHARTDATARESPONSE_NODEDATALIST_NODEDATA_DATA
_CHARTDATARESPONSE_NODEDATALIST_NODEDATA.fields_by_name['position'].message_type = _CHARTDATARESPONSE_NODEDATALIST_NODEDATA_POSITION
_CHARTDATARESPONSE_NODEDATALIST_NODEDATA.containing_type = _CHARTDATARESPONSE_NODEDATALIST
_CHARTDATARESPONSE_NODEDATALIST.fields_by_name['nodes'].message_type = _CHARTDATARESPONSE_NODEDATALIST_NODEDATA
_CHARTDATARESPONSE_NODEDATALIST.containing_type = _CHARTDATARESPONSE
_CHARTDATARESPONSE_EDGEDATALIST_EDGEDATA_DATA.containing_type = _CHARTDATARESPONSE_EDGEDATALIST_EDGEDATA
_CHARTDATARESPONSE_EDGEDATALIST_EDGEDATA.fields_by_name['data'].message_type = _CHARTDATARESPONSE_EDGEDATALIST_EDGEDATA_DATA
_CHARTDATARESPONSE_EDGEDATALIST_EDGEDATA.containing_type = _CHARTDATARESPONSE_EDGEDATALIST
_CHARTDATARESPONSE_EDGEDATALIST.fields_by_name['edges'].message_type = _CHARTDATARESPONSE_EDGEDATALIST_EDGEDATA
_CHARTDATARESPONSE_EDGEDATALIST.containing_type = _CHARTDATARESPONSE
_CHARTDATARESPONSE.fields_by_name['nodesData'].message_type = _CHARTDATARESPONSE_NODEDATALIST
_CHARTDATARESPONSE.fields_by_name['edgesData'].message_type = _CHARTDATARESPONSE_EDGEDATALIST
DESCRIPTOR.message_types_by_name['ChartData'] = _CHARTDATA
DESCRIPTOR.message_types_by_name['ChartDataList'] = _CHARTDATALIST
DESCRIPTOR.message_types_by_name['ChartsRequest'] = _CHARTSREQUEST
DESCRIPTOR.message_types_by_name['ProfileId'] = _PROFILEID
DESCRIPTOR.message_types_by_name['ChartDataResponse'] = _CHARTDATARESPONSE
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

ProfileId = _reflection.GeneratedProtocolMessageType('ProfileId', (_message.Message,), {
  'DESCRIPTOR' : _PROFILEID,
  '__module__' : 'proto.query.charts.query_charts_pb2'
  # @@protoc_insertion_point(class_scope:api.query.charts.v1.ProfileId)
  })
_sym_db.RegisterMessage(ProfileId)

ChartDataResponse = _reflection.GeneratedProtocolMessageType('ChartDataResponse', (_message.Message,), {

  'NodeDataList' : _reflection.GeneratedProtocolMessageType('NodeDataList', (_message.Message,), {

    'NodeData' : _reflection.GeneratedProtocolMessageType('NodeData', (_message.Message,), {

      'Data' : _reflection.GeneratedProtocolMessageType('Data', (_message.Message,), {
        'DESCRIPTOR' : _CHARTDATARESPONSE_NODEDATALIST_NODEDATA_DATA,
        '__module__' : 'proto.query.charts.query_charts_pb2'
        # @@protoc_insertion_point(class_scope:api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.Data)
        })
      ,

      'Position' : _reflection.GeneratedProtocolMessageType('Position', (_message.Message,), {
        'DESCRIPTOR' : _CHARTDATARESPONSE_NODEDATALIST_NODEDATA_POSITION,
        '__module__' : 'proto.query.charts.query_charts_pb2'
        # @@protoc_insertion_point(class_scope:api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData.Position)
        })
      ,
      'DESCRIPTOR' : _CHARTDATARESPONSE_NODEDATALIST_NODEDATA,
      '__module__' : 'proto.query.charts.query_charts_pb2'
      # @@protoc_insertion_point(class_scope:api.query.charts.v1.ChartDataResponse.NodeDataList.NodeData)
      })
    ,
    'DESCRIPTOR' : _CHARTDATARESPONSE_NODEDATALIST,
    '__module__' : 'proto.query.charts.query_charts_pb2'
    # @@protoc_insertion_point(class_scope:api.query.charts.v1.ChartDataResponse.NodeDataList)
    })
  ,

  'EdgeDataList' : _reflection.GeneratedProtocolMessageType('EdgeDataList', (_message.Message,), {

    'EdgeData' : _reflection.GeneratedProtocolMessageType('EdgeData', (_message.Message,), {

      'Data' : _reflection.GeneratedProtocolMessageType('Data', (_message.Message,), {
        'DESCRIPTOR' : _CHARTDATARESPONSE_EDGEDATALIST_EDGEDATA_DATA,
        '__module__' : 'proto.query.charts.query_charts_pb2'
        # @@protoc_insertion_point(class_scope:api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData.Data)
        })
      ,
      'DESCRIPTOR' : _CHARTDATARESPONSE_EDGEDATALIST_EDGEDATA,
      '__module__' : 'proto.query.charts.query_charts_pb2'
      # @@protoc_insertion_point(class_scope:api.query.charts.v1.ChartDataResponse.EdgeDataList.EdgeData)
      })
    ,
    'DESCRIPTOR' : _CHARTDATARESPONSE_EDGEDATALIST,
    '__module__' : 'proto.query.charts.query_charts_pb2'
    # @@protoc_insertion_point(class_scope:api.query.charts.v1.ChartDataResponse.EdgeDataList)
    })
  ,
  'DESCRIPTOR' : _CHARTDATARESPONSE,
  '__module__' : 'proto.query.charts.query_charts_pb2'
  # @@protoc_insertion_point(class_scope:api.query.charts.v1.ChartDataResponse)
  })
_sym_db.RegisterMessage(ChartDataResponse)
_sym_db.RegisterMessage(ChartDataResponse.NodeDataList)
_sym_db.RegisterMessage(ChartDataResponse.NodeDataList.NodeData)
_sym_db.RegisterMessage(ChartDataResponse.NodeDataList.NodeData.Data)
_sym_db.RegisterMessage(ChartDataResponse.NodeDataList.NodeData.Position)
_sym_db.RegisterMessage(ChartDataResponse.EdgeDataList)
_sym_db.RegisterMessage(ChartDataResponse.EdgeDataList.EdgeData)
_sym_db.RegisterMessage(ChartDataResponse.EdgeDataList.EdgeData.Data)



_CHARTS = _descriptor.ServiceDescriptor(
  name='Charts',
  full_name='api.query.charts.v1.Charts',
  file=DESCRIPTOR,
  index=0,
  serialized_options=None,
  create_key=_descriptor._internal_create_key,
  serialized_start=1208,
  serialized_end=1383,
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
    name='GetChartData',
    full_name='api.query.charts.v1.Charts.GetChartData',
    index=1,
    containing_service=None,
    input_type=_PROFILEID,
    output_type=_CHARTDATARESPONSE,
    serialized_options=None,
    create_key=_descriptor._internal_create_key,
  ),
])
_sym_db.RegisterServiceDescriptor(_CHARTS)

DESCRIPTOR.services_by_name['Charts'] = _CHARTS

# @@protoc_insertion_point(module_scope)
