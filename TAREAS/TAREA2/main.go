package main

import (
	"fmt"
	"net/http"

	"github.com/Gudiel-16/so1-tarea2/routes"
	"github.com/gorilla/mux"
)

func main() {
	r := mux.NewRouter()
	r.HandleFunc("/", routes.HomeHandler)
	r.HandleFunc("/data", routes.GetData).Methods("GET")

	fmt.Println("Server Running on port 3000...")
	http.ListenAndServe(":3000", r)
}
