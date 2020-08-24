from prometheus_client import Counter
from prometheus_client import Histogram

GRPC_SERVER_STARTED_TOTAL_COUNTER = Counter(
    name="grpc_server_started_total",
    documentation="Total number of RPCs started on the server.",
    labelnames=[
        "grpc_type",
        "grpc_service",
        "grpc_method"
    ])

GRPC_SERVER_HANDLED_TOTAL_COUNTER = Counter(
    name="grpc_server_handled_total",
    documentation="Total number of RPCs completed on the server, regardless of success or failure.",
    labelnames=[
        "grpc_type",
        "grpc_service",
        "grpc_method",
        "code"
    ])

GRPC_SERVER_HANDLED_LATENCY_SECONDS = Histogram(
    name="grpc_server_handled_latency_seconds",
    documentation="Histogram of response latency (seconds) of gRPC that had been application-level handled by the server",
    labelnames=[
        "grpc_type",
        "grpc_service",
        "grpc_method"
    ])

GRPC_SERVER_MSG_RECEIVED_TOTAL_COUNTER = Counter(
    name="grpc_server_msg_received_total",
    documentation="Total number of stream messages received on the server.",
    labelnames=[
        "grpc_type",
        "grpc_service",
        "grpc_method"
    ])

GRPC_SERVER_MSG_SENT_TOTAL_COUNTER = Counter(
    name="grpc_server_msg_sent_total",
    documentation="Total number of stream messages sent by the server.",
    labelnames=[
        "grpc_type",
        "grpc_service",
        "grpc_method"
    ])