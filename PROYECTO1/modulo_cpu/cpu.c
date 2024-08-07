// Info de los modulos
#include <linux/module.h>
// Info del kernel en tiempo real
#include <linux/kernel.h>
#include <linux/sched.h>
#include <linux/sched/signal.h>

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
#include <linux/jiffies.h>

struct task_struct *cpu; // Estructura que almacena info del cpu
struct task_struct *current_cpu;

// Almacena los procesos
struct list_head *lstProcess;
// Estructura que almacena info de los procesos hijos
struct task_struct *child;
unsigned long rss;

// const long megabyte = 1024 * 1024;

// unsigned long long total_time = 0;
// unsigned long long total_usage = 0;
// unsigned long long porc_usage = 0;
// unsigned long long aux = 0;
// unsigned long long aux2 = 0;
// unsigned long long prev_total_time = 0;

MODULE_LICENSE("GPL");
MODULE_DESCRIPTION("Modulo de CPU para proyecto1");
MODULE_AUTHOR("Gudiel 16");

static int escribir_archivo(struct seq_file *archivo, void *v) {

    // total_time = 0;
    // total_usage = 0;

    for_each_process(cpu) {
        seq_printf(archivo, "PID%d", cpu->pid); // Identificador del proceso: PID1
        seq_printf(archivo, ",");
        seq_printf(archivo, "%d", cpu->pid); // Identificador del proceso (solo numero): 1
        seq_printf(archivo, ",");
        seq_printf(archivo, "%s", cpu->comm); // Nombre del proceso
        seq_printf(archivo, ",");
        seq_printf(archivo, "%lu", cpu->__state); // Estado del proceso
        seq_printf(archivo, ",");

        if (cpu->mm) {
            rss = get_mm_rss(cpu->mm) << PAGE_SHIFT; // RAM en bytes que el proceso ocupa
            //rss = rss / megabyte;
            seq_printf(archivo, "%lu", rss);
        } else {
            seq_printf(archivo, "%s", "");
        }
        seq_printf(archivo, ",");

        seq_printf(archivo, "%d", cpu->cred->user->uid);
        seq_printf(archivo, ",");

        list_for_each(lstProcess, &(cpu->children)) {
            child = list_entry(lstProcess, struct task_struct, sibling);
            seq_printf(archivo, "CHILD%d", child->pid); // Identificador del proceso hijo: CHILD1
            seq_printf(archivo, ".");
            seq_printf(archivo, "%d", child->pid); // Identificador del proceso hijo (solo numero): 1
            seq_printf(archivo, ".");
            seq_printf(archivo, "%s", child->comm); // Nombre del proceso hijo
            seq_printf(archivo, ".");
            seq_printf(archivo, "%d", child->__state); // Estado del proceso hijo
            seq_printf(archivo, ".");

             if (child->mm) {
                rss = get_mm_rss(child->mm) << PAGE_SHIFT; // RAM en bytes que el proceso hijo ocupa
                seq_printf(archivo, "%lu", rss);
            } else {
                seq_printf(archivo, "%s", "");
            }
            seq_printf(archivo, ".");

            seq_printf(archivo, "%d", child->cred->user->uid);
            seq_printf(archivo, ".");
        }

        seq_printf(archivo, ";"); // Fin de cada proceso

        // total_time += cpu->utime + cpu->stime;

    }

    // seq_printf(archivo, ";;siuuu;;");
    // if(prev_total_time != 0){
    //     total_usage = total_time - prev_total_time;
    //     aux = total_usage * 100;
    //     aux2 = jiffies_to_msecs(1) * HZ;
    //     total_usage = aux / aux2;

    //     // porc_usage = total_usage * 100;
    //     // porc_usage = porc_usage / HZ;
    //     seq_printf(archivo, "%llu", total_time);
    //     seq_printf(archivo, ",");
    //     seq_printf(archivo, "%llu", prev_total_time);
    //     seq_printf(archivo, ",");
    //     seq_printf(archivo, "%llu", total_usage);
    // }

    // seq_printf(archivo, ";;siuuu;;");

    // prev_total_time = total_time;

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
    proc_create("cpu_201404278", 0, NULL, &operaciones);
    printk(KERN_INFO "201404278\n");
    return 0;
}

//Funcion a ejecuta al remover el modulo del kernel con rmmod
static void _remove(void)
{
    remove_proc_entry("cpu_201404278", NULL);
    printk(KERN_INFO "Christopher Alexander Acajabon Gudiel\n");
}

module_init(_insert);
module_exit(_remove);