from flask import Flask, jsonify, request, Response
from flask_cors import CORS
import requests
import json
import scheduler

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    if (request.method == 'POST'):
        server_data = str(request.data.decode('utf-8'))
        response = scheduler.main(server_data)
        return jsonify(response), 200, {'Content-Type': 'application/json'}


if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
