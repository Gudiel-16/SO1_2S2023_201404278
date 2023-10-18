package main

import (
	"context"
	"flag"
	"fmt"
	"log"
	"net"

	"github.com/Gudiel-16/backend_go/grpc_server/Config"
	pb "github.com/Gudiel-16/backend_go/grpc_server/proto"
	"google.golang.org/grpc"
)

var (
	port = flag.Int("port", 50051, "The server port")
)

// server is used to implement helloworld.GreeterServer.
type server struct {
	pb.UnimplementedCalificacionServer
}

// SayHello implements helloworld.GreeterServer
func (s *server) InsertarCalificacion(ctx context.Context, in *pb.CalificacionRequest) (*pb.CalificacionReply, error) {

	fmt.Println(in.GetCarnet())
	fmt.Println(in.GetNombre())
	fmt.Println(in.GetCurso())
	fmt.Println(in.GetNota())
	fmt.Println(in.GetSemestre())
	fmt.Println(in.GetYear())

	Config.Database.Exec("CALL InsertarNota(?,?,?,?,?,?)", in.GetCarnet(), in.GetNombre(), in.GetCurso(), in.GetNota(), in.GetSemestre(), in.GetYear())
	// Config.Database.Exec("INSERT IGNORE INTO Alumno(carnet, nombre, year) VALUES(?, ?, ?)", in.GetCarnet(), in.GetNombre(), in.GetYear())
	// Config.Database.Create(&newData)

	//log.Printf("Received: %v", in.GetName())
	return &pb.CalificacionReply{Message: "Saved " + in.GetCarnet()}, nil
}

func main() {

	Config.Connect()
	// Config.Database.Exec("INSERT IGNORE INTO Alumno(carnet, nombre, year) VALUES(?, ?, ?)", "aaaa", "bbbb", "cccc")
	// log.Print(Config.Database)

	// errDot := godotenv.Load()
	// if errDot != nil {
	// 	log.Fatalln("Error loading .env file ", errDot)
	// }
	// log.Println(os.Getenv("USER_DB"))

	flag.Parse()
	lis, err := net.Listen("tcp", fmt.Sprintf(":%d", *port))
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	s := grpc.NewServer()
	pb.RegisterCalificacionServer(s, &server{})
	log.Printf("server listening at %v", lis.Addr())
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
