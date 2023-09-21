// Info de los modulos
#include <linux/module.h>
// Info del kernel en tiempo real
#include <linux/kernel.h>
#include <linux/sched.h>

// Headers para modulos
#include <linux/init.h>
// Header necesario para proc_fs
#include <linux/proc_fs.h>
// Para dar acceso al usuario
#include <asm/uaccess.h>
// Para manejar el directorio /proc
#include <linux/seq_file.h>
// Para get_mm_rss
#include <linux/mm.h>

const long megabyte = 1024 * 1024;

struct sysinfo si;

static void init_meminfo(void){
    si_meminfo(&si);
}

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de RAM, Lab de Sopes 1");
MODULE_AUTHOR("Gudiel");

static int escribir_archivo(struct seq_file *archivo, void *v) {
    
    init_meminfo();

    unsigned long total_ram = si.totalram * (unsigned long long)si.mem_unit / megabyte;
    unsigned long ram_usada = (si.totalram - si.freeram) * (unsigned long long)si.mem_unit / megabyte;
    unsigned long ram_libre = si.freeram * (unsigned long long)si.mem_unit / megabyte;
    unsigned long porc_uso = ram_usada * 100;
    unsigned long porcentaje_uso = porc_uso / total_ram;

    seq_printf(archivo, "%lu", total_ram);
    seq_printf(archivo, ",");
    seq_printf(archivo, "%lu", ram_usada);
    seq_printf(archivo, ",");
    seq_printf(archivo, "%lu", ram_libre);
    seq_printf(archivo, ",");
    seq_printf(archivo, "%lu", porcentaje_uso);

    return 0;
}

//Funcion que se ejecutara cada vez que se lea el archivo con el comando CAT
static int al_abrir(struct inode *inode, struct file *file)
{
    return single_open(file, escribir_archivo, NULL);
}

//Si el kernel es 5.6 o mayor se usa la estructura proc_ops
static struct proc_ops operaciones =
{
    .proc_open = al_abrir,
    .proc_read = seq_read
};

//Funcion a ejecuta al insertar el modulo en el kernel con insmod
static int _insert(void)
{
    proc_create("ram_201404278", 0, NULL, &operaciones);
    printk(KERN_INFO "201404278\n");
    return 0;
}

//Funcion a ejecuta al remover el modulo del kernel con rmmod
static void _remove(void)
{
    remove_proc_entry("ram_201404278", NULL);
    printk(KERN_INFO "Christopher Alexander Acajabon Gudiel\n");
}

module_init(_insert);
module_exit(_remove);
