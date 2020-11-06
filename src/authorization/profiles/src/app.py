#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import uuid
import json
import http.client
from flask import Flask, request, Response
import psycopg2
import psycopg2.extras
from kafka import KafkaConsumer, KafkaProducer, OffsetAndMetadata, TopicPartition

app = Flask(__name__)

oauth2_address          = os.environ['oauth2-address']
oauth2_port             = os.environ['oauth2-port']
oauth2_path_auth        = os.environ['oauth2-path-auth']
oauth2_path_userinfo    = os.environ['oauth2-path-userinfo']

profiledb_address        = os.environ['profiledb-address']
profiledb_db             = os.environ['profiledb-db']
profiledb_port           = os.environ['profiledb-port']
profiledb_user           = os.environ['profiledb-user']
profiledb_password       = os.environ['profiledb-password']

kafka_consumer_address   =os.environ['kafka-consumer-address']
kafka_consumer_port      =os.environ['kafka-consumer-port']
kafka_producer_address   =os.environ['kafka-producer-address']
kafka_producer_port      =os.environ['kafka-producer-port']

Producer = KafkaProducer(
  bootstrap_servers=[
    f'{kafka_producer_address}:{kafka_producer_port}'
  ],
  acks='all'
)

email_registration = []

def _on_send_success(record_metadata):
  print(f'record_metadata.topic:{record_metadata.topic}', flush=True)
  print(f'record_metadata.partition:{record_metadata.partition}', flush=True)
  print(f'record_metadata.offset:{record_metadata.offset}', flush=True)

def _on_send_error(excp):
  print(f'I am an errback {excp}', flush=True)
  # log.error('I am an errback', exc_info=excp)
  # handle exception
 
@app.route('/')
def index():
  resp = Response()
  resp.headers["x-user-authorization"] = "false"

  cookie = request.headers.get('Cookie')
  if not cookie:
      return resp

  # auth

  conn = http.client.HTTPConnection(host=oauth2_address, port=oauth2_port)
  auth_status, _ = get_request(conn=conn, url=oauth2_path_auth, body=None, headers={'Cookie': cookie} )
  if str(auth_status) != "202":
      return resp
  resp.headers["x-user-authorization"] = "true"
  userinfo_status, userinfo_data = get_request(conn=conn, url=oauth2_path_userinfo, body=None, headers={'Cookie': cookie} )
  userinfo_json = json.loads( userinfo_data )
  for d in userinfo_json:
      resp.headers["x-user-authorization-"+d] = userinfo_json[d]
      if d == "email":
          user_email = userinfo_json[d]
  conn.close()

  # registered
  resp.headers["x-user-authorization-registered"] = "false"
  if user_email:
      data={ "email":user_email }
      user_profile = get_profile( 
          data = data
      )
      if not user_profile and not ( user_email in email_registration):
        email_registration.append( user_email )
        for msg in sign_up( data ):
          if msg:
            user_profile = msg
            email_registration.remove( user_email )


  filters = ['id', 'nickname', 'email']

  registred_list = ['id', 'nickname', 'email']

  registration_key_number = len(registred_list)

  if user_profile:
      for d in user_profile:
          if d in filters:
            resp.headers["x-user-authorization-"+d] = str(user_profile[d]).encode('utf-8')
            resp.response.append( f"{d}: {user_profile[d]} <br/>" )
          if d in registred_list:
            registration_key_number -= 1
  
  if registration_key_number <= 0: 
    resp.headers["x-user-authorization-registered"] = "true"
    resp.response.append( "registered: True <br/>" )

  return resp

def get_request(conn, url, body=None, headers=None):
  conn.request(method="GET", url=url, body=body, headers=headers)
  conn_response = conn.getresponse()
  status = conn_response.status
  data = conn_response.read()
  return status, data

def get_profile(data):
  conn = psycopg2.connect(f"host={profiledb_address} port={profiledb_port} dbname={profiledb_db} user={profiledb_user} password={profiledb_password}")
  cur = conn.cursor( cursor_factory = psycopg2.extras.DictCursor )

  query_tmp = "SELECT * FROM users %s;"
  query="WHERE"
  for d in data:
      query=query+f" {d}='{data[d]}'"
  query = query_tmp % (query, )

  cur.execute( query )

  profile = cur.fetchone()

  cur.close()
  conn.close()

  profile_dict = { key:value for key, value in ( dict(profile) if profile else {} ).items() if value }

  print( f"profile_dict: {profile_dict}", flush=True )

  return profile_dict

def sign_up(data):
  print( f"sign_up", flush=True )
  consumer_timeout_ms = 1000

  command = 'registered'
  dialog_id = str( uuid.uuid4() )

  response_topic = 'sign_up'
  #response_group = 'answer-group-'+dialog_id
  response_group = 'answer-group'

  registration = eventrequest(
        data = json.dumps( data ).encode('utf-8'),
        command = command,
        dialog_id = dialog_id,
        response_topic = response_topic,
        response_group = response_group,
        consumer_timeout_ms=consumer_timeout_ms
      )

  for msg in registration:
    if msg:
      yield get_profile( data = data )
    else:
      yield False
      

def eventrequest(data, command, dialog_id, response_topic, response_group, consumer_timeout_ms=1000):

  print( f"eventrequest {command}", flush=True )

  consumer = KafkaConsumer(
    response_topic,
    group_id=response_group,
    bootstrap_servers=[
      f'{kafka_consumer_address}:{kafka_consumer_port}'
    ],
    auto_offset_reset='earliest',
    consumer_timeout_ms=consumer_timeout_ms,
    enable_auto_commit=False
  )

  Producer.send(
    topic='saga',
    value=data,
    headers=[
      ('command', command.encode('utf-8')),
      ('dialog-id', dialog_id.encode('utf-8')),
      ('response-topic', response_topic.encode('utf-8'))
    ],
  ).add_callback(_on_send_success).add_errback(_on_send_error)

  for message in consumer:
      print (f"{message.topic}:{message.partition}:{message.offset}: key={message.key} headers={message.headers} value={message.value.decode('utf-8')}", flush=True)

      consumer.commit(
          offsets={ 
            TopicPartition( topic=message.topic, partition=message.partition ): OffsetAndMetadata( message.offset+1, '' ) 
          }
       )

      headers_dict = dict(message.headers)

      if headers_dict['dialog-id'].decode('utf-8') == dialog_id:
        consumer.commit(
          offsets={ 
            TopicPartition( topic=message.topic, partition=message.partition ): OffsetAndMetadata( message.offset+1, '' ) 
          }
        )

        value = message.value.decode('utf-8')

        if headers_dict['command'].decode('utf-8') == 'close':
          yield True
          consumer.close()


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)