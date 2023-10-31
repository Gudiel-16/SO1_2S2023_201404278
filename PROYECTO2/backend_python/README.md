# Python

### Instalaciones globales en PC

```bash
sudo apt update
sudo apt install python3-pip
sudo pip3 install virtualenv
```

### Entorno virtual

* Crear entorno virtual, activar entorno virtual y salir del entorno virtual.
    * Estar posicionado en la carpeta donde se trabajara el proyecto.

```bash
# create
virtualenv venv
# activate
source venv/bin/activate
# salir
deactivate
```

### Instalaciones en entorno virtual

```bash
pip3 install flask
pip3 install flask-cors
pip3 install python-dotenv
pip3 install mysql-connector-python
pip3 install redis
```

### Prueba Docker-Local

* Creando imagen:

```
sudo docker build -t gudiel/so1-py2-python:1.0.0 .
```

* Run:
    * Las credenciales son de dbs local.
    * 172.17.0.2 es la IP del contenedor de MySQL y 172.17.0.3 es la IP del contenedor de redis.

```
sudo docker run --rm -it -p 5001:5001 -d \
-e HOST_SERVER_PYTHON=0.0.0.0 \
-e PORT_SERVER_PYTHON=5001 \
-e HOST_REDIS=172.17.0.3 \
-e PORT_REDIS=6379 \
-e HOST_MYSQL=172.17.0.2 \
-e NAMEDB_MYSQL=db_record_of_notes \
-e USER_MYSQL=root \
-e PASS_MYSQL=secret \
-e PORT_MYSQL=3306 \
gudiel/so1-py2-python:1.0.0
```