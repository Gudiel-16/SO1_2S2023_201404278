import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from routes.note_route import route_note

load_dotenv()

HOST = os.getenv('HOST_SERVER_PYTHON')
PORT = os.getenv('PORT_SERVER_PYTHON')

app = Flask(__name__)
CORS(app)

prefix = "/api"

app.register_blueprint(route_note, url_prefix=prefix)

@app.route('/')
def index():
    return 'Hello world from backend python :)'

app.run(host=HOST, port=PORT)