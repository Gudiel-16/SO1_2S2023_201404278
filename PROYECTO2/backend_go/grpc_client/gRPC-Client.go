package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"time"

	"github.com/Gudiel-16/backend_go/grpc_client/Entities"
	pb "github.com/Gudiel-16/backend_go/grpc_client/proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

// const (
// 	defaultName = "world"
// )

var (
	addr = flag.String("addr", "localhost:50051", "the address to connect to")
	// name = flag.String("name", defaultName, "Name to greet")
)

func helloWorld(c *fiber.Ctx) error {

	return c.Status(200).JSON("Hola mundo - gRPC Client")

}

func logicaClient(cfi *fiber.Ctx) error {

	newNota := Entities.Nota{}
	errf := cfi.BodyParser(&newNota)

	if errf != nil {
		return cfi.Status(400).JSON("Ha ocurrido un problema al parcial los datos..")
	}

	flag.Parse()
	// Set up a connection to the server.
	conn, err := grpc.Dial(*addr, grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("did not connect: %v", err)
	}
	defer conn.Close()
	c := pb.NewCalificacionClient(conn)

	// Contact the server and print out its response.
	ctx, cancel := context.WithTimeout(context.Background(), time.Second)
	defer cancel()
	r, err := c.InsertarCalificacion(ctx, &pb.CalificacionRequest{
		Carnet:   newNota.Carnet,
		Nombre:   newNota.Nombre,
		Curso:    newNota.Curso,
		Nota:     newNota.Nota,
		Semestre: newNota.Semestre,
		Year:     newNota.Year,
	})
	if err != nil {
		log.Fatalf("could not greet: %v", err)
	}
	// log.Printf("Greeting: %s", r.GetMessage())
	res := r.GetMessage()
	return cfi.Status(200).JSON(res)
}

func main() {
	app := fiber.New()

	// err := Config.Connect()

	// if err != nil {
	// 	log.Fatalln("Error connect to database ", err)
	// }

	app.Use(cors.New())

	userGroup := app.Group("/api")
	userGroup.Get("/", helloWorld)
	userGroup.Post("/note", logicaClient)

	err := app.Listen(":5002")

	if err != nil {
		log.Fatal("Error", err)
	}

	fmt.Println("Server running on port 5002...")
}
