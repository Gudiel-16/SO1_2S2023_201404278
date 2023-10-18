### instalacion

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