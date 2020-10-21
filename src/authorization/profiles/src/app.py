#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
import json
import http.client
from flask import Flask, request, Response
import psycopg2
import psycopg2.extras

app = Flask(__name__)

oauth2_address       = os.environ['oauth2-address']
oauth2_port          = os.environ['oauth2-port']
oauth2_path_auth     = os.environ['oauth2-path-auth']
oauth2_path_userinfo = os.environ['oauth2-path-userinfo']

profiledb_address    = os.environ['profiledb-address']
profiledb_db         = os.environ['profiledb-db']
profiledb_port       = os.environ['profiledb-port']
profiledb_user       = os.environ['profiledb-user']
profiledb_password   = os.environ['profiledb-password']
 
@app.route('/')
def index():
    resp = Response()
    resp.headers["x-user-authorization"] = "false"

    cookie = request.headers.get('Cookie')
    if not cookie:
        return resp

    conn = http.client.HTTPConnection(host=oauth2_address, port=oauth2_port)

    auth_status, _ = get_request(conn=conn, url=oauth2_path_auth, body=None, headers={'Cookie': cookie} )
   
    if str(auth_status) != "202":
        return resp

    resp.headers["x-user-authorization"] = "true"

    userinfo_status, userinfo_data = get_request(conn=conn, url=oauth2_path_userinfo, body=None, headers={'Cookie': cookie} )

    userinfo_json = json.loads( userinfo_data )

    print(f'0', flush=True)

    for d in userinfo_json:
        resp.headers["x-user-authorization-"+d] = userinfo_json[d]
        if d == "email":
            user_email = userinfo_json[d]
    
    conn.close()

    resp.headers["x-user-authorization-registered"] = "false"

    if user_email:
        user_profile = get_profile( 
            data={ "email":user_email }
        )

    filters = ['id', 'nickname', 'email']

    if user_profile:
        resp.headers["x-user-authorization-registered"] = "true"
        for d in user_profile:
            if d in filters:
                resp.headers["x-user-authorization-"+d] = str(user_profile[d]).encode('utf-8')
                resp.response.append( f"{d}: {user_profile[d]} <br/>" )

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

    return dict(profile) if profile else {}


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)