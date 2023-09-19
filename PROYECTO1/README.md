# PROYECTO 1

## Ambiento Modulo - Go

### Instalaciones:

* GCC

```
sudo apt update
sudo apt install build-essential
```

* Docker

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

# To install the latest version, run:
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin

# Verify that the Docker Engine installation is successful by running the hello-world image:
sudo docker run hello-world

# To create the docker group and add your user
sudo groupadd docker
sudo usermod -aG docker $USER
newgrp docker
```

* Instalar modulo CPU.
* Instalar modulo RAM.
* Instalar stress

```
apt-get install -y stress
```

### Levantar contenedor a manita:

* Docker build, run

```
sudo docker build -t so1gomuduls .
sudo docker run  -it -p 5000:5000 --privileged --pid=host -d so1gomuduls
```

* Stress dentro del contenedor (se modifico el Docker file, ya no es necesario este paso)

```
docker exec -it id_contenedor /bin/sh
apt-get update
apt-get install -y stress
```

### Levantar contenedor con docker compose:

```
docker compose up -d
docker compose down
```

### Prueba de kill con python

```bash
sudo apt update
sudo apt install python3-pip
pip3 install Flask
mkdir pruebap
cd pruebap
nano app.py (poner el codigo)
python3 app.py & (compilar app)
```

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def saludo():
    return "Hola Mundo - 201404278"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000)
```


## Ver usuarios con su UID

```
cat /etc/passwd | awk -F ':' '{print $1, $3}'
```