import os

from flask import Flask
app = Flask(__name__)

@app.route("/health")
def health():
    return '{"status": "ok"}'

@app.route("/")
def hello():
    return 'Hello otus arch from ' + os.environ['HOSTNAME'] + '!'

if __name__ == "__main__":
    app.run(host='0.0.0.0',port='8000')


