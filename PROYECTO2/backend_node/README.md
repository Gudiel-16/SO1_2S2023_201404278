# Backend Node

```
npm install
npm run dev
```

### Prueba Docker-Local

* Creando imagen:

```
sudo docker build -t gudiel/so1-py2-node:1.0.0 .
```

* Run:
    * Las credenciales son de dbs local.
    * 172.17.0.2 es la IP del contenedor de MySQL y 172.17.0.3 es la IP del contenedor de redis.

```
sudo docker run --rm -it -p 5003:5003 -d \
-e HOST_REDIS=172.17.0.3 \
-e PORT_REDIS=6379 \
-e HOST_MYSQL=172.17.0.2 \
-e NAMEDB_MYSQL=db_record_of_notes \
-e USER_MYSQL=root \
-e PASS_MYSQL=secret \
gudiel/so1-py2-node:1.0.0
```