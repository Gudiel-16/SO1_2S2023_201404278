# Manual Tecnico

## Mockaroo

#### Generar carnet y nombre de alumnos

* Se genero 100 registros tipo json, solo con carnet y nombre:
    * carnet
        * type: **Regular Expression**
        * options: **^(\d{6})$**
    * nombre: 
        * type: **Fist Name**

* Se utilizo el siguiente codigo poder usarlos luego en un "Custom List":

```js
// Data donde estan los 100 objetos, dentro de un array
const data = require("./data1");

let carnets = "";
let nombres = "";

data.forEach(o => {
    carnets += o.carnet + ",";
    nombres += o.nombre + ",";
});

console.log(carnets);
console.log("");
console.log(nombres);

/* Salida, algo parecido a lo siguiente, pero con mas datos:

85188,958188,493569,085375,802001,828447

Andrew,Keriann,Iolanthe,Gordy,Janeva,Harlie

*/
```

#### Generar registros a utilizar en el trafico:

* carnet
    * type: **Custom List**
    * options: **Datos generados anteriormete**
    * **secuencial**
* nombre
    * type: **Custom List**
    * options: **Datos generados anteriormete**
    * **secuencial**
* curso
    * type: **Custom List**
    * options: **SO1,BD1,LFP,SA,AYD1**
    * **random**
* nota:
    * type: **Custom List**
    * options: **50,60,70,80,90,100**
    * **random**
* semestre
    * type: **Custom List**
    * options: **1S,2S**
    * **random**
* year
    * type: **Custom List**
    * options: **2023** 
    * **random**

## Puertos apps

* Python: 5001
* gRPC-Client: 5002
* gRPC-Server: 50051
* Node: 5003
* React: 5173 - 80
* Python y Go para Ingress: 5016

## Variables de entorno

```
HOST_SERVER_PYTHON=
PORT_SERVER_PYTHON=

HOST_REDIS=
PORT_REDIS=

HOST_MYSQL=
NAMEDB_MYSQL=
USER_MYSQL=
PASS_MYSQL=
PORT_MYSQL=

HOST_GRPC_SERVER=
```

## k8s

#### Levantar Proyecto

```bash
#namespace
kubectl apply -f namespace/namespace.yaml

#secret
kubectl apply -f secret/secret.yaml

#redis
kubectl apply -f deployments/deploy-redis.yaml
kubectl apply -f services/service-redis.yaml

#python
kubectl apply -f deployments/deploy-backend-python.yaml
kubectl apply -f services/service-backend-python.yaml

#go
kubectl apply -f deployments/deploy-backend-go.yaml
kubectl apply -f services/service-backend-go.yaml

#node
kubectl apply -f deployments/deploy-backend-node.yaml
kubectl apply -f services/service-backend-node.yaml

#hpa
kubectl apply -f hpa/hpa.yaml

#Install
kubectl create ns nginx-ingress
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update
helm install nginx-ingress ingress-nginx/ingress-nginx -n nginx-ingress
kubectl get services -n nginx-ingress

#Ingress
#Poner IP ingress controller (nginx), la IP Externa que nos da la de tipo load balancer
kubectl apply -f ingress/ingress.yaml
```

#### Acceder a CLI de redis

```bash
kubectl exec -it NAMEPOD redis-cli
KEYS *
GET keyregistro
HGETALL cantidad_notas
```

#### Obtener namespace
- `kubectl get ns`

#### Crear namespace
- `kubectl create ns <nombre_namespace>`

#### Crear cualquier objeto de k8s
- `kubectl apply -f <ruta_archivo> -n <nombre_namespace>`

#### Eliminar cualquier objeto de k8s
- `kubectl delete -f <ruta_archivo> -n <nombre_namespace>`

#### Editar cualquier objeto de k8s
- `kubectl edit <tipo_objeto> <nombre_objeto> -n <nombre_namespace>`

#### Obtener cualquier objeto de k8s
- `kubectl get <tipo_objeto> -n <nombre_namespace>`

#### Obtener todos los objeto de k8s (Exceptuando Ingress)
- `kubectl get all -n <nombre_namespace>`

#### Nodeport
- `kubectl port-forward service/<service-name> <local-port>:<service-port> -n <nombre_namespace>`