# Golang

## Levantar servidor local:

* Tener corriendo el contenedor de MySQL.
    * docker start id_container
* Poner en el .env:
    * HOST_DB="localhost:33061"
* Correr servidor:
    * go run main.go

Nota: No es recomendable subir los .env, este caso como no contiene datos sensibles ya que todo es local se subio.