## Comandos Modulo CPU

* En la carpata donde tenemos el .c:
    * Generar archivos:
        * make all
    * Limpiar consola:
        * sudo dmesg -C
    * Instalar o pasar el modulo al kernel:
        * sudo insmod cpu.ko
    * Ver o leer mensajes:
        * sudo dmesg
    * Eliminar el modulo:
        * sudo rmmod cpu.ko
* Nos dirigimos a /proc para listar archivos y ver contenido del modulo:
    * cat cpu_201404278