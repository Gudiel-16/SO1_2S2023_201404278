## Comandos Modulo RAM

* En la carpata donde tenemos el .c:
    * Generar archivos:
        * make all
    * Limpiar consola:
        * sudo dmesg -C
    * Instalar o pasar el modulo al kernel:
        * sudo insmod ram.ko
    * Ver o leer mensajes:
        * sudo dmesg
    * Eliminar el modulo:
        * sudo rmmod ram.ko
* Nos dirigimos a /proc para listar archivos y ver contenido del modulo:
    * cat ram_201404278