import os
import json

from flask import Flask, Response, stream_with_context, request

from flask_sqlalchemy import SQLAlchemy

config = {
    'DATABASE_URI': os.environ.get('DATABASE_URI', ''),
    'HOSTNAME': os.environ['HOSTNAME'],
    'GREETING': os.environ.get('GREETING', 'Hello'),
}

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = config['DATABASE_URI']
app.config['SQLALCHEMY_ECHO'] = False
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy()

class Users(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(256), unique=True)
    firstname = db.Column(db.Text)
    lastname = db.Column(db.Text)
    email = db.Column(db.Text, unique=True)
    phone = db.Column(db.Text, unique=True)
    
    def __repr__(self):
        return json.dumps({
            'id':self.id,
            'username':self.username,
            'firstname':self.firstname,
            'lastname':self.lastname,
            'email':self.email,
            'phone':self.phone
        })


@app.route("/health")
def health():
    return '{"status": "ok"}'

@app.route("/")
def hello():
    return config['GREETING'] + ' from ' + config['HOSTNAME'] + '!'

@app.route("/config")
def configuration():
    return json.dumps(config)

@app.route('/db')
def getdb():
    users = Users.query.all()
    def generate():
        for user in users:
            yield str(user)+'\n'
    return Response(stream_with_context(generate()))

@app.route('/user', methods=['POST'])
def add_user():
    print(f'request:{request}')
    user = Users(
        username=request.form['username'],
        firstname=request.form['firstname'],
        lastname=request.form['lastname'],
        email=request.form['email'],
        phone=request.form['phone'])
    db.session.add(user)
    db.session.commit()
    return json.dumps({'id':str(user.id)}), 200

@app.route('/user/<int:userid>', methods=['GET'])
def get_user(userid):
    user = Users.query.get(userid)
    if user:
        return str(user), 200
    return 'There is no user with id:'+str(userid)+'\n', 404

@app.route('/user/<int:userid>', methods=['PUT'])
def update_user(userid):
    user = Users.query.get(userid)
    for name in request.form:
        setattr(user, name, request.form[name])
    db.session.commit()
    return str(user), 200

@app.route('/user/<int:userid>', methods=['DELETE'])
def delete_user(userid):
    user = Users.query.get(userid)
    db.session.delete(user)
    db.session.commit()
    return 'id:'+str(user.id)+' deleted\n', 201



if __name__ == '__main__':
    db.init_app(app)
    db.create_all(
        app.run(host='0.0.0.0', port='8000', debug=True)
    )
    
