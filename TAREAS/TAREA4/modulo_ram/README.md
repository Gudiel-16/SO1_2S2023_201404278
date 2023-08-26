
* En la carpata donde tenemos el .c:
    * Generar archivos:
        * make all
    * Limpiar consola:
        * sudo dmesg -C
    * Instalar o pasar el modulo al kernel:
        * sudo insmod .ko
    * Ver o leer mensajes:
        * sudo dmesg
    * Eliminar el modulo:
        * sudo rmmod .ko
* Nos dirigimos a /proc para listar archivos y ver contenido del modulo:
    * cat nombre_archivo

## Docker Golang

* Comandos:
  * sudo docker build -t so1tarea4back .
  * sudo docker run --rm -it --mount type=bind,source="/proc",target="/back_container" -p 5000:5000 so1tarea4back
