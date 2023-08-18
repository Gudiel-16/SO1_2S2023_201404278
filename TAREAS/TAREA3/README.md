# Tarea 3

## Video

* https://youtu.be/OrcllKnAk4Y

## Docker Golang

* Comandos:
  * sudo docker build -t so1tarea3back .
  * sudo docker run --rm -it -p 5000:5000 -d so1tarea3back

## Docker React

* Configurar archivo **vite.config.js,** agregando **host** y **port**.:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5001,
  },
  plugins: [react()],
})
```

* Comandos:
  * sudo docker build -t so1tarea3front .
  * sudo docker run --rm -it -p 5001:5001 -d so1tarea3front

## Database

Comandos:

* docker pull mysql
* docker run -d -p 33061:3306 --name DBMYSQL -e MYSQL_ROOT_PASSWORD=secret -v mysql-data:/var/lib/mysql mysql
* docker stop id_container
* docker start id_container

## Docker Compose

* Comandos:
  * docker compose up

## Errores

* Error 1:
  * Solucion:
    * En el backend, en el archivo .env poner: **HOST_DB="database_container"**, donde database_container es el nombre del contenedor que le damos a la base de datos en el **docker-compose.yml**

```
panic: dial tcp 127.0.0.1:3306: connect: connection refused
```

* Error 2:
  * Solucion:
    * No encuentra la base de datos que se pone en el backend, conectarse a la base de datos y crearla con el mismo nombre, este caso "db_biblioteca_musical" y volver a compilar el **docker-compose.yml**.

```
backend_container   | 2023/08/18 06:11:15 /back_container/Config/Conn.go:31
backend_container   | [error] failed to initialize database, got error Error 1049 (42000): Unknown database 'db_biblioteca_musical'
backend_container   | panic: Error 1049 (42000): Unknown database 'db_biblioteca_musical'
backend_container   | 
backend_container   | goroutine 1 [running]:
backend_container   | github.com/Gudiel-16/backend/Config.Connect()
backend_container   | 	/back_container/Config/Conn.go:37 +0x359
backend_container   | main.main()
backend_container   | 	/back_container/main.go:39 +0x30
backend_container   | 
backend_container   | exit status 2
backend_container exited with code 1

```