package main

import (
	"fmt"
	"log"
	"os/exec"
	"strings"
	"time"
)

func dataModulRam() {
	cmd := exec.Command("sh", "-c", "cat /proc/ram_201404278")
	output, err := cmd.CombinedOutput()

	if err != nil {
		log.Fatal(err)
	}

	out := string(output[:])

	values := strings.Split(out, ",")

	fmt.Println("Total Ram:        ", values[0], "MB")
	fmt.Println("Ram en Uso:       ", values[1], "MB")
	fmt.Println("Ram Libre:        ", values[2], "MB")
	fmt.Println("Porcentaje en Uso:", values[3], "%")
	fmt.Println("--------------------------------")

	// for _, value := range values {
	// 	fmt.Println(value)
	// }
}

func main() {
	for {
		dataModulRam()

		time.Sleep(5 * time.Second)
	}
}
