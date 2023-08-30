from flask import Flask

app = Flask(__name__)

@app.route('/')
def saludo():
    return "Hola Mundo - 201404278"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)