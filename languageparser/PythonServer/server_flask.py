from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

url = 'https://nlp.wordgames.gr/api/analyze'

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET','POST'])
def index():
    if (request.method == 'POST'):
        data = str(request.data.decode('utf-8'))
        print(data)
        res = requests.post(url, json={'text': data})
        print()
        return jsonify({"does this": res.json()}), 201
    else:
        print("test")
        return jsonify({"about":"Hello World"})
def hello():
    name = request.args.get("name", "World")
    return f'Hello, {escape(name)}!'

if __name__ == '__main__':
    app.run(host='localhost', port=5000 ,debug=True)