```bash
pip3 install flask
pip3 install flask-cors
pip3 install python-dotenv
pip3 install mysql-connector-python
```

```bash
docker pull redis
docker pull rediscommander/redis-commander
```

```bash
# ip (172.17.0.3) es del contenedor de redis (run)
docker run --rm --name redis-commander -d --env REDIS_HOSTS=local:172.17.0.3:6379 -p 8081:8081 rediscommander/redis-commander:latest
```