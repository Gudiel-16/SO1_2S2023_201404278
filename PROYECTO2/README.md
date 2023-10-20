
## Mockaroo

### Generar carnet y nombre de alumnos

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

### Generar registros a utilizar en el trafico:

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

### Puertos

* Python: 5001
* gRPC-Client: 5002
* gRPC-Server: 50051
* Node: 5003
* React: 5173 - 80

### Name .env

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