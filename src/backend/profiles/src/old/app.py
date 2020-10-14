#!/usr/bin/env python
# -*- coding: utf-8 -*-
from flask import Flask, request, Response

from sessions import db_session
from model import Users

app = Flask(__name__)

@app.route('/')
def index():

    resp = Response()

    with db_session() as session:
        users = session.query(Users)
        print(f"Users id:", flush=True)
        for user in users:  
            print(user.id, flush=True)

    return resp

@app.route('/<nickname>')
def view_profile(nickname):

    with db_session() as session:
        user = session.query( Users ).filter_by( nickname=nickname ).first()

    return user.to_dict() if user else ''

@app.route('/<nickname>/add')
def add_profile(nickname):

    email = "yury.krasilnikov@gmail.com"

    with db_session() as session:
        if not session.query(Users).filter_by(nickname=nickname).first():
            session.add(
                Users(
                    email=email,
                    nickname=nickname
                )
            )
            session.commit()

    return 'add'

@app.route('/<nickname>/remove')
def remove_profile(nickname):

    with db_session() as session:
        session.query( Users ).filter_by( nickname=nickname ).delete()
        session.commit()

    return 'remove'


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=80)