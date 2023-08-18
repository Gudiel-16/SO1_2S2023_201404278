package main

import (
	"fmt"

	"github.com/Gudiel-16/backend/Config"
	"github.com/Gudiel-16/backend/Entities"

	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func createData(c *fiber.Ctx) error {

	newData := Entities.Biblioteca{}
	err := c.BodyParser(&newData)

	if err != nil {
		return err
	}

	Config.Database.Create(&newData)

	return c.Status(200).JSON("Success")

}

func getData(c *fiber.Ctx) error {
	var biblio []Entities.Biblioteca
	Config.Database.Find(&biblio)
	return c.Status(200).JSON(biblio)
}

func main() {
	app := fiber.New()

	err := Config.Connect()

	if err != nil {
		log.Fatalln("Error connect to database ", err)
	}

	app.Use(cors.New())

	userGroup := app.Group("/api/biblioteca")
	userGroup.Post("", createData)
	userGroup.Get("", getData)

	err = app.Listen(":5000")

	if err != nil {
		log.Fatal("Error", err)
	}

	fmt.Println("Server running on port 5000...")

}
