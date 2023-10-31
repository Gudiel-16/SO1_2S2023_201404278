# gRPC Client y gRPC Server

### Instalacion

```
sudo apt install protobuf-compiler
```

### Dependencias

* gRPC

```
go get -u google.golang.org/grpc
```

* .proto

```
go install google.golang.org/protobuf/cmd/protoc-gen-go@v1.28
go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@v1.2
export PATH="$PATH:$(go env GOPATH)/bin"
```

* db

```
go get -u gorm.io/gorm 
go get gorm.io/driver/mysql
```

* otras

```
go get github.com/gofiber/fiber/v2
go get github.com/joho/godotenv
```

### Compilar .proto

* Estar en la carpeta raiz (cliente o server):

```
protoc --go_out=. --go_opt=paths=source_relative --go-grpc_out=. --go-grpc_opt=paths=source_relative proto/pcalificacion.proto
```

### Compilar Server y CLient

```
go run gRPC-Server.go
go run gRPC-Client.go
```

### Prueba Docker-Local

* gRPC-Server:

```
sudo docker build -t gudiel/so1-py2-grpc-server:1.0.0 .
```

* gRPC-Client:

```
sudo docker build -t gudiel/so1-py2-grpc-client:1.0.0 .
```

* Run gRPC-Server:
    * Las credenciales son de una db local.

```
sudo docker run --rm -it -p 50051:50051 -d \
-e HOST_MYSQL=172.17.0.2 \
-e NAMEDB_MYSQL=db_record_of_notes \
-e USER_MYSQL=root \
-e PASS_MYSQL=secret \
gudiel/so1-py2-grpc-server:1.0.0
```

* Inspect:
    * Copiar la IP de contenedor.

```
docker inspect gudiel/so1-py2-grpc-server:1.0.0
```

* Run gRPC-Client:
    * 172.17.0.3 es la IP del contenedor de gRPC-Server.

```
sudo docker run --rm -it -p 5002:5002 -d \
-e HOST_GRPC_SERVER=172.17.0.3 \
gudiel/so1-py2-grpc-client:1.0.0
```