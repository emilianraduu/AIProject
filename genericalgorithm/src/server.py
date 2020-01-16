from flask import Flask, jsonify, request
from flask_cors import CORS
import requests
import json
import driver

url = 'https://nlp.wordgames.gr/api/analyze'

app = Flask(__name__)
CORS(app)

queryElements={
    "keywords": [],
    "location": [],
    "organization": [],
    "person": []
}


@app.route('/', methods=['GET','POST'])
def index():
    if (request.method == 'POST'):
        data = str(request.data.decode('utf-8'))
        driver.run(data)
        return jsonify(json.loads(data)), 201
    else:
        print("test")
        return jsonify({"about":"Hello World"})


if __name__ == '__main__':
    app.run(host='localhost', port=5000 ,debug=True)