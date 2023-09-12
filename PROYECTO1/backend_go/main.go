package main

import (
	"fmt"
	"log"
	"os/exec"
	"strings"
	"time"

	"github.com/shirou/gopsutil/cpu"

	"github.com/Gudiel-16/backend_go/models"
	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// INFORMACION DE PROCESOS DE CPU
func dataModulCPU() []models.Cpu_model {

	// Obtener informacion de proc
	cmd := exec.Command("sh", "-c", "cat /proc/cpu_201404278")
	output, err := cmd.CombinedOutput()

	if err != nil {
		log.Fatal(err)
	}

	out := string(output[:])

	// Obtenemos cada proceso con sus hijos
	procesos_cpu := strings.Split(out, ";")

	mis_procesos := []models.Cpu_model{}

	// recorremos procesos
	for _, proceso := range procesos_cpu {

		model_proceso := models.Cpu_model{}
		model_proceso_hijo := models.Hijoscpu{}

		// Obtenemos valores de cada proceso, validamos que no este vacio
		if proceso != "" {
			valores_procesos := strings.Split(proceso, ",")
			model_proceso.Pid_nombre = valores_procesos[0]
			model_proceso.Pid = valores_procesos[1]
			model_proceso.Nombre = valores_procesos[2]
			model_proceso.Estado = valores_procesos[3]
			model_proceso.Porcentaje_ram = valores_procesos[4]
			model_proceso.Usuario = valores_procesos[5]

			// Obtenemos procesos hijos, pero validamos que tenga hijos
			if valores_procesos[6] != "" {
				hijo_procesos_cpu := strings.Split(valores_procesos[6], ".")
				// fmt.Println(valores_procesos[6])

				// recorremos procesos hijos
				contador := 0
				for _, hijo_proceso := range hijo_procesos_cpu {

					if contador == 0 {
						model_proceso_hijo.Pid_nombre = hijo_proceso
					} else if contador == 1 {
						model_proceso_hijo.Pid = hijo_proceso
					} else if contador == 2 {
						model_proceso_hijo.Nombre = hijo_proceso
					} else if contador == 3 {
						model_proceso_hijo.Estado = hijo_proceso
					} else if contador == 4 {
						model_proceso_hijo.Porcentaje_ram = hijo_proceso
					} else if contador == 5 {
						model_proceso_hijo.Usuario = hijo_proceso
						model_proceso.Hijos = append(model_proceso.Hijos, model_proceso_hijo)
						contador = -1
					}

					contador++
				}
			}

			mis_procesos = append(mis_procesos, model_proceso)
		}

	}

	return mis_procesos
}

// INFORMACION DE RAM
func dataModulRAM() models.Ram_model {

	// Obtener informacion de proc
	cmd := exec.Command("sh", "-c", "cat /proc/ram_201404278")
	output, err := cmd.CombinedOutput()

	if err != nil {
		log.Fatal(err)
	}

	out := string(output[:])

	// Obtenemos valores de la RAM
	values := strings.Split(out, ",")

	// Creamos modelo y asignamos valores
	model_ram := models.Ram_model{}

	model_ram.Total = values[0]
	model_ram.En_uso = values[1]
	model_ram.Libre = values[2]
	model_ram.Porcentaje_uso = values[3]

	return model_ram
}

// USO DE CPU

func useCPU() int {

	percent, _ := cpu.Percent(time.Second, true)

	// usando linuxproc "github.com/c9s/goprocinfo/linux"
	// stat, err := linuxproc.ReadStat("/proc/stat")
	// if err != nil {
	// 	log.Fatal("stat read fail")
	// }

	// aja := stat.CPUStatAll.User + stat.CPUStatAll.Nice + stat.CPUStatAll.System + stat.CPUStatAll.Idle + stat.CPUStatAll.IOWait + stat.CPUStatAll.IRQ + stat.CPUStatAll.SoftIRQ + stat.CPUStatAll.Steal + stat.CPUStatAll.Guest + stat.CPUStatAll.GuestNice
	// aja2 := stat.CPUStatAll.Idle * 100
	// aja3 := aja2 / aja
	// aja4 := 100 - aja3
	// fmt.Println(aja4)

	return int(percent[0])
}

// CONTROLADOR OBTENER MODULOS
func modulsController(c *fiber.Ctx) error {

	model_data := models.Moduls_model{}

	dataCpu := dataModulCPU()
	dataRam := dataModulRAM()
	usoCpu := useCPU()

	model_data.Cpu_data = dataCpu
	model_data.Ram_data = dataRam
	model_data.Porcentaje_uso_cpu = usoCpu

	return c.Status(200).JSON(model_data)
}

// CONTROLADOR KILL PROCESS
func killProcessController(c *fiber.Ctx) error {

	return c.Status(200).JSON("kill process")
}

// CONTROLADOR STRESS
func stressController(c *fiber.Ctx) error {

	return c.Status(200).JSON("stress")
}

func main() {
	app := fiber.New()

	app.Use(cors.New())

	userGroup := app.Group("/api/go")
	userGroup.Get("/moduls", modulsController)
	userGroup.Get("/process", killProcessController)
	userGroup.Get("/stress", stressController)

	err := app.Listen(":5000")

	if err != nil {
		log.Fatal("Error", err)
	}

	fmt.Println("Server running on port 5000...")

}
