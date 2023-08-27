# Tarea 4

## Video

* https://youtu.be/nsvC7ectALU

## Docker Golang

* Comandos:
  * sudo docker build -t so1tarea4back .
  * sudo docker run --rm -it --privileged -p 5000:5000 so1tarea4back

## Comandos Modulo Ram

* En la carpata donde tenemos el .c:
    * Generar archivos:
        * make all
    * Limpiar consola:
        * sudo dmesg -C
    * Instalar o pasar el modulo al kernel:
        * sudo insmod nombre.ko
    * Ver o leer mensajes:
        * sudo dmesg
    * Eliminar el modulo:
        * sudo rmmod nombre.ko
* Nos dirigimos a /proc para listar archivos y ver contenido del modulo:
    * cat nombre_archivo